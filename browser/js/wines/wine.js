app.config(function ($stateProvider) {
    $stateProvider.state('wine', {
        url: '/wines/:wineId',
        templateUrl: 'js/wines/wine.html',
        controller: 'WineController',
        resolve: {
        	//move to wineFactory
        	//maybe use js-data
        	wine: function(WineFactory, $stateParams) {
        		return WineFactory.getWine($stateParams.wineId)
        	}
        }
    });
});


app.factory('WineFactory', function($http) {

	var WineFactory = {}

	WineFactory.getWine = function(id) {
		return $http.get('/api/wines/' + id)
		.then(function(response) {
			return response.data
		})
	}

	return WineFactory
})


app.controller('WineController', function($scope, wine) {
	$scope.wine = wine
})


app.filter('wineDisplayName', function() {

	return function(input) {
		var displayName;
		return input.name ? input.year + " " + input.winery + " " + input.name + " - " + input.variety : input.year + " " + input.winery + " - " + input.variety;
	}
})