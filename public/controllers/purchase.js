var purchase = angular.module('purchase', ['ngRoute','ui.bootstrap']);

purchase.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
		when('/purchases', {
        	templateUrl: 'views/purchase.html',
        	controller: 'PurchaseController'
      	}).
      	otherwise({
        	redirectTo: '/purchases'
		});
}]);

purchase.controller('PurchaseController', ['$scope', '$http', '$filter', function($scope, $http, $filter) {
	$scope.title = 'Lista de compras efetuadas';
	$scope.elementSelected = false;

	$scope.newPurchase = {
		date : $filter('date')(new Date(), 'dd/MM/yyyy'),
		description : $filter('date')(new Date(), 'yyyy') + $filter('date')(new Date(), 'MM') + $filter('date')(new Date(), 'dd'),
		supplier: ''
	};

	//start datepicker
	$('#sandbox-container input').datepicker({
		format: "dd/mm/yyyy",
		todayBtn: "linked",
		language: "pt"
	});

	//the bugs are real :(
	$scope.selectedSupplier = '';
	$scope.setSupplier = function($item) {
		if (angular.isDefined($item)) {
			$scope.selectedSupplier = $item;
			$scope.newPurchase.supplier = $item;
			if (angular.isDefined($item._id)) {
				$scope.selectedSupplier = $item.name;
				$scope.newPurchase.supplier = $item._id;
			}
			return true;
		} else {
			return $scope.selectedSupplier;
		}
	};

	//get all purchases
	$http.get('/api/purchases')
		.success(function (result) {
			var totalCashPurchases = 0;
			$.each(result, function (i,r) {
				var totalCash = 0;
				$.each(r.products, function (j,p) {
					totalCash += p.quantityPrice * p.quantity;
				});
				r.totalCash = totalCash;
				totalCashPurchases += totalCash;
			});
			result.totalCashPurchases = totalCashPurchases;
			$scope.purchases = result;
		})
		.error(function (result) {
			$scope.errorMsg = result;
		});

	//get suppliers
	$http.get('/api/suppliers')
		.success(function (result) {
			$scope.suppliers = result;
		})
		.error(function (result) {
			$scope.errorMsg = result;
		});
}]);