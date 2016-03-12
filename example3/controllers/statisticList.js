/**
 * Created by nekedos on 12.03.2016.
 */

statisticApp
	.controller('StatisticListCtrl', [
		'$scope',
		'$filter',
		'$http',
		function($scope, $filter, $http) {
			$scope.response = [];
			$scope.statistic = [];

			/* Сортируем данные */
			$scope.order = function(predicate) {
				$scope.predicate = predicate;
				$scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
				$scope.statistic = $filter('orderBy')($scope.statistic, predicate, $scope.reverse);
			};

			$scope.order('name', true);


			/* Обрабатываем данные от сервера */
			$scope.prepare = function() {
				var field,
					income,
					spent;

				$scope.statistic = [];

				/* Считаем income и spent с учетом валюты */
				angular.forEach($scope.response, function(value) {
					income = value.statistics.income[$scope.$parent.rate]
						? value.statistics.income[$scope.$parent.rate]
						: value.statistics.income.USD * $scope.$parent.rates.USD / $scope.$parent.rates[$scope.$parent.rate];

					spent = value.statistics.spent[$scope.$parent.rate]
						? value.statistics.spent[$scope.$parent.rate]
						: value.statistics.spent.USD * $scope.$parent.rates.USD / $scope.$parent.rates[$scope.$parent.rate];

					field = {
						name: value.name,
						income: income,
						spent: spent,
						difference: spent - income,
						roi: (income - spent) / spent * 100
					};

					$scope.statistic.push(field);
				});
			};

			/* Следим за изменением валюты */
			$scope.$watch('$parent.rate', function() {
				$scope.prepare();
			});

			/* Запрашиваем данные с сервера */
			$http.get('data/data.json').success(function(data) {
				$scope.response = data;
				$scope.prepare();
			});
		}
	])
	.directive('statisticList', function() {
		return {
			template: '' +
			'<div class="col-md-9">' +
				'<div class="bs-example">' +
					'<table class="table table-striped">' +
						'<thead>' +
							'<tr>' +
								'<th ng-click="order(\'name\')">Country</th>' +
								'<th ng-click="order(\'income\')">Income</th>' +
								'<th ng-click="order(\'spent\')">Spent</th>' +
								'<th ng-click="order(\'difference\')">Difference</th>' +
								'<th ng-click="order(\'roi\')">Roi</th>' +
							'</tr>' +
						'</thead>' +
						'<tbody>' +
							'<tr ng-repeat="field in statistic">' +
								'<td>{{field.name}}</td>' +
								'<td>{{field.income}}</td>' +
								'<td>{{field.spent}}</td>' +
								'<td ng-class="{\'danger\' : field.difference < 0}">{{field.difference}}</td>' +
								'<td ng-class="{\'danger\' : field.roi < 0}">{{field.roi}}</td>' +
							'</tr>' +
						'</tbody>' +
					'</table>' +
				'</div>' +
			'</div>' +
			''
		};
	});