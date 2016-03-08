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

	WinesFactory.getWines = function(queries) {
		var queryString = "?";
		console.log(queries);
		queryString += queries.map(function(obj) {
			return obj.key + "=" + obj.value
		}).join("&");
		return $http.get('/api/wines' + queryString)
		.then(function(response) {
			return response.data;
		})

	}

	return WinesFactory
})

// queries must be given in this format: {key: 'someKey', value: 'someValue'}

app.controller('WinesController', function($scope, wines, $location, WinesFactory) {

	// we need to grab list of all query key/val pairs from URL on load

	$scope.wines = wines;

	$scope.addFilter = function(key, value) {
		var newQuery = {key: key, value: value};
		console.log(newQuery);
		WinesFactory.getWines([newQuery])
		.then(function(wines) {
			$scope.wines = wines;
		})
	}

	// $scope.red = wines.query({type: 'red'});
	// console.log('red', red)

	var val = $location.search().booze
	console.log("this is val", val)
})