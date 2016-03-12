/**
 * Created by nekedos on 12.03.2016.
 */
statisticApp
	.controller('RateListCtrl', [
		'$scope',
		'$http',
		function($scope, $http) {
			$scope.rates = {};

			$http.get('data/rates.json').success(function(data) {
				$scope.$parent.setRates(data);
				$scope.rates = data;
			});
		}
	])
	.directive('rateList', function() {
		return {
			template: '' +
			'<button ng-repeat="(key, value) in rates" ng-class="{\'active\' : key == $parent.rate}" ng-click="$parent.setRate(key)" type="button" class="btn btn-primary">{{key}}</button>'
		};
	});