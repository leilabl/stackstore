app.config(function ($stateProvider) {
	$stateProvider.state('wines', {
		url: '/wines',
		templateUrl: 'js/wines/wines.html',
		controller: 'WinesController',
		resolve: {
			wines: function(WinesFactory, $q) {
				return WinesFactory.getAllWines()
			}
	}
})


app.factory('WinesFactory', function($http, $q, WineFactory) {

	var WinesFactory = {}

	WinesFactory.getAllWines = function() {
		return $http.get('/api/wines')
		.then(function(response) {
			return response.data
		})
		.then(function(wines) {

			// AW: This is not good promise composition 
			return $q.all(wines.map(function(wine){
			    return WineFactory.getRating(wine._id)
			    // this `then` is not good - we don't want to "then-chain"
			    .then(function(rating) {
			        wine.rating = rating;
			        return wine;
			    })
			}))
		})
	}
	return WinesFactory;
})


app.controller('WinesController', function($scope, wines, $location, WinesFactory) {

	$scope.wines = wines;

})

app.filter('selectedWines', function($location){
	return function(wines) {
		if (Object.keys($location.search()).length) {
			return wines.filter(function(wine) {
				if ( $location.search()['type'] && $location.search()['type'] !== encodeURI(wine.type)) return false;
				if ( $location.search()['region'] && $location.search()['region'] !== encodeURI(wine.region.toLowerCase()) ) return false;
				if ( $location.search()['variety'] && $location.search()['variety'] !== encodeURI(wine.variety.toLowerCase()) ) return false;
				return true;
			})
		} else return wines;
	}
})
