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

	function getQueryString (queriesList) {
		var queryString = "?";
		queryString += queriesList.map(function(obj) {
			return obj.key + "=" + obj.value
		}).join("&");
		return queryString;
	}

	WinesFactory.getWines = function(queries) {
		return $http.get('/api/wines' + getQueryString(queries))
		.then(function(response) {
			return response.data;
		})

	}

	return WinesFactory
})

// queries must be given in this format: {key: 'someKey', value: 'someValue'}

app.controller('WinesController', function($scope, wines, $location, WinesFactory) {

	// we need to grab list of all query key/val pairs from URL on load
	var queries = [];

	var queriesInUrl = $location.search();
	if (Object.keys(queriesInUrl).length) {
		for (var query in queriesInUrl) {
			queries.push({key: query, value: queriesInUrl[query]});
		}
		WinesFactory.getWines(queries)
		.then(function(wines) {
			$scope.wines = wines;
		})
	}

	console.log(queries)

	$scope.wines = wines;

	$scope.addFilter = function(key, value) {
		var newQuery = {key: key, value: value};
		queries.push(newQuery);
		queries.forEach(function(obj) {
			$location.search(obj.key, obj.value);
		})
		console.log(newQuery);
		WinesFactory.getWines(queries)
		.then(function(wines) {
			$scope.wines = wines;
		})
	}

	// $scope.red = wines.query({type: 'red'});
	// console.log('red', red)

	// var val = $location.search().booze
})