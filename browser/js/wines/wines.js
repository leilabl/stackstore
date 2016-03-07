app.config(function ($stateProvider) {
	$stateProvider.state('wines', {
		url: '/wines',
		templateUrl: 'js/wines/wines.html',
		controller: 'WinesController',
		resolve: {
			wines: function(WinesFactory) {
				return WinesFactory.getAllWines()
			}
		}
	})
})

app.factory('WinesFactory', function($http) {
	var WinesFactory = {}

	WinesFactory.getAllWines = function() {
		return $http.get('/api/wines')
		.then(function(response) {
			return response.data
		})
	}

	return WinesFactory
})

app.controller('WinesController', function($scope, wines, WineFactory) {
	$scope.wines = wines

	//rating for each wine

})