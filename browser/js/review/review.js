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

app.controller('ReviewController', function($scope) {

	$scope.review = {
		author: '56d9f82ab405944e6edf76b2',
		wine: '56d9f82ab405944e6edf76b4'
	}

	$scope.submitReview = function() {
		ReviewFactory.create()
	}

})