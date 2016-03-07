app.config(function ($stateProvider) {
    $stateProvider.state('wine', {
        url: '/wines/:wineId',
        templateUrl: 'js/wines/wine.html',
        controller: 'WineController',
        resolve: {
        	wine: function(WineFactory, $stateParams) {
        		return WineFactory.getOneWine($stateParams.wineId)
        	},
        	reviews: function(WineFactory, $stateParams) {
        		return WineFactory.getReviews($stateParams.wineId)
        	},
        	rating: function(WineFactory, $stateParams) {
        		return WineFactory.getRating($stateParams.wineId)
        	}
        }
    });
});


//maybe use js-data
app.factory('WineFactory', function($http) {

	var WineFactory = {}

	WineFactory.getOneWine = function(id) {
		return $http.get('/api/wines/' + id)
		.then(function(response) {
			return response.data
		})
	}

	WineFactory.getReviews = function(id) {
		return $http.get('/api/wines/' + id + '/reviews')
		.then(function(response) {
			return response.data
		})
	}

	WineFactory.getRating = function(id) {
		return $http.get('api/wines/' + id + '/rating')
		.then(function(response) {
			return response.data
		})
	}

	return WineFactory
})


app.controller('WineController', function($scope, wine, reviews, rating) {
	$scope.wine = wine
	$scope.reviews = reviews
	$scope.rating = rating
})


app.filter('wineDisplayName', function() {

	return function(input) {
		var displayName;
		return input.name ? input.year + " " + input.winery + " " + input.name + " - " + input.variety : input.year + " " + input.winery + " - " + input.variety;
	}
})


app.directive('stars', function($compile) {
	return {
		restrict: 'A',
		scope: {
			star: "="
		},
		link: function(scope, element) {
			var starList = [];
			for (var i=1; i<6; i++) {
				if (i <= Number(scope.star) ) {
					starList.push('<span class="glyphicon glyphicon-star"></span>')
				}
				else {
					starList.push('<span class="glyphicon glyphicon-star-empty"></span>')
				}
			}
			element.html(starList.join(""))
			$compile(element.contents())(scope);
		}
	}
})








