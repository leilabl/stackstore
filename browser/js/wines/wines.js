app.config(function ($stateProvider) {
	$stateProvider.state('wines', {
		url: '/wines',
		templateUrl: 'js/wines/wines.html',
		controller: 'WinesController',
		resolve: {
			wines: function(WinesFactory, WineFactory, $q) {
				return WinesFactory.getAllWines()
					.then(function(wines) {
						return $q.all(wines.map(function(wine){
						    return WineFactory.getRating(wine._id)
						    .then(function(rating) {
						        wine.rating = rating;
						        return wine;
						    })
						}))
					})
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

app.controller('WinesController', function($scope, wines) {
	$scope.wines = wines;
})