/**
 * Created by nekedos on 12.03.2016.
 */
statisticApp
	.controller('StatisticCtrl', [
		'$scope',
		function($scope) {
			$scope.rates = {};
			$scope.rate = 'USD';

			$scope.setRates = function(rates) {
				$scope.rates = rates;
			};

			$scope.setRate = function(rate) {
				$scope.rate = rate;
			};
		}
	])
	.directive('statistic', function() {
		return {
			template: '' +
			'<div class="container" role="main">' +
				'<div class="row">' +
					'<div class="col-md-9">' +
						'<h1>Example 3. Statistic</h1>' +
					'</div>' +
				'</div>' +
			'</div>' +
			'<br>' +
			'<div class="container">' +
				'<div class="row" ng-controller="RateListCtrl">' +
					'<div class="col-md-9">' +
						'<div rate-list></div>' +
					'</div>' +
				'</div>' +
			'</div>' +
			'<br>' +
			'<div class="container">' +
				'<div class="row" ng-controller="StatisticListCtrl">' +
					'<div statistic-list></div>' +
				'</div>' +
			'</div>' +
			''
		};
	});