// app.config(function ($stateProvider) {
// 	$stateProvider.state('category', {
// 		url: '/wines/:selectedType',
// 		templateUrl: 'js/category/category.html',
// 		controller: 'CategoryController',
// 		resolve: {
// 			selectedType: function(CategoryFactory, $stateParams) {
// 				return CategoryFactory.getSelectedType($stateParams.selectedType)
// 			}
// 		}
// 	})
// })

// app.factory('CategoryFactory', function($http) {

// 	var CategoryFactory = {}

// 	CategoryFactory.getSelectedType = function(selectedType) {
// 		return $http.get('/api/wines/filter/' + selectedType)
// 		.then(function(response) {
// 			return response.data
// 		})
// 	}

// 	return CategoryFactory
// })

// app.controller('CategoryController', function($scope, selectedType) {

// 	console.log($scope.booze)

// 	$scope.runfunc = function() {
// 		console.log($scope.booze)
// 	}

// 	// $scope.booze = booze

// 	// $scope.submitFilter = function() {
// 	// 	CategoryFactory.getSelectedType($scope.type)
// 	// 	.then(function(wines) {
// 	// 		console.log(wines)
// 	// 		// $state.go('wine', {wineId: $scope.review.wine})
// 	// 	})
// 	// }


// })