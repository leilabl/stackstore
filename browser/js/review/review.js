app.config(function ($stateProvider) {
    $stateProvider.state('newReview', {
        url: '/review/new',
        templateUrl: '/js/review/review.html',
        controller: 'ReviewController'
    });
});

app.factory('ReviewFactory', function($http) {

	var ReviewFactory = {};

	ReviewFactory.create = function(id, data) {
		return $http.post('/api/users/' + id + '/reviews', data)
		.then(function(response){
			return response.data
		})
	}

	return ReviewFactory

})

app.controller('ReviewController', function($scope, ReviewFactory, $state) {

	$scope.review = {
		author: '56d9f852fd13169e0be32b9f',
		wine: '56d9f880889a54a30b876583'
	}

	$scope.submitReview = function() {
		console.log('submitted form', $scope.review)
		ReviewFactory.create('56d9f852fd13169e0be32b9f', $scope.review)
		.then(function() {
			console.log('successfully posted')
			$state.go('wine', {wineId: $scope.review.wine})
		})
	}

})