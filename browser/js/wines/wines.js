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
})


app.factory('WinesFactory', function($http, $q, WineFactory) {

	var WinesFactory = {}

	WinesFactory.getAllWines = function() {
		return $http.get('/api/wines')
		.then(function(response) {
			return response.data
		})
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
	return WinesFactory;
})


app.controller('WinesController', function($scope, wines, $location, WinesFactory) {

	$scope.wines = wines;
	
	$scope.isSelected = function(category, value) {
		return $location.search(category) === value;
	}

	$scope.toggleFilter = function(key, value) {
		if ( $location.search(key) === value ) $location.search(key, null);
		else $location.search(key, value);
	}

	$scope.types = ["Red", "White"];

	$scope.regions = [
		"California",
		"Spain",
		"France",
		"Italy"
	]

	$scope.varieties = [
		"Cabernet Sauvignon",
		 "Zinfandel",
		 "Pinot Noir",
		 "Chardonnay",
		 "Malbec",
		 "Pinot Grigio",
		 "Moscato",
		 "Sauvignon Blanc",
		 "Syrah",
		 "Carignan",
		 "Merlot",
		 "Red Blend",
		 "Grenache",
		 "Riesling",
		 "Sangiovese",
		 "Barbera",
		 "Vermentino",
		 "Pinot Bianco",
		 "Tempranillo",
		 "Viura",
		 "Grenache Blanc",
		 "Mencia"
	]

})

app.filter('selectedWines', function($location){
	return function(wines) {
		if ($location.search().length) {
			return wines.filter(function(wine) {			
				if ( $location.search('type') !== wine.type) return false;
				if ( $location.search('region') !== wine.region) return false;
				if ( $location.search('variety') !== wine.variety) return false;
				return true;
			})
		} else return wines
	}
})
