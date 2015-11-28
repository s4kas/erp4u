var main = angular.module('main',['ngRoute']);

main.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
		when('/', {
        	templateUrl: 'views/main.html',
        	controller: 'MainController'
      	}).
      	otherwise({
        	redirectTo: '/'
		});
}]);

main.controller('MainController', function() {
	this.title = "ERP4U";
});
