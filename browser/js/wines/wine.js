app.config(function ($stateProvider) {
    $stateProvider.state('wine', {
        url: '/wines/:wineId',
        templateUrl: 'js/wines/wine.html',
        controller: 'WineController',
        resolve: {
        	wine: function(WineFactory, $stateParams) {
        		return WineFactory.getWine($stateParams.wineId)
        	},
        	reviews: function(WineFactory, $stateParams) {
        		return WineFactory.getReviews($stateParams.wineId)
        	}
        }
    });
});


//maybe use js-data
app.factory('WineFactory', function($http) {

	var WineFactory = {}

	WineFactory.getWine = function(id) {
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

	return WineFactory
})


app.controller('WineController', function($scope, wine, reviews) {
	$scope.wine = wine
	$scope.reviews = reviews
})


app.filter('wineDisplayName', function() {

	return function(input) {
		var displayName;
		return input.name ? input.year + " " + input.winery + " " + input.name + " - " + input.variety : input.year + " " + input.winery + " - " + input.variety;
	}
})


app.directive('stars', function() {

	return {
		restrict: 'E',
		scope: {
			rating: "="
		},
		link: function(scope) {
			var starList = [];
			for (var i=1; i<6; i++) {
				if (i <= Number(scope.rating)) {
					starList.push('<span class="glyphicon glyphicon-star"></span>')
				}
				else {
					starList.push('<span class="glyphicon glyphicon-star-empty"></span>')
				}
			}
			return starList.join("")
		}

	}

})








