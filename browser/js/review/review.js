app.config(function ($stateProvider) {
    $stateProvider.state('newReview', {
        url: '/review/new/:wineId',
        templateUrl: '/js/review/review.html',
        controller: 'ReviewController',
        resolve: {
        	wine: function(WineFactory, $stateParams) {
        		return WineFactory.getOneWine($stateParams.wineId)
        	},
        	currentUser: function(AuthService) {
        		return AuthService.getLoggedInUser()
        	}
        }
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

app.controller('ReviewController', function($scope, ReviewFactory, $state, wine, currentUser) {

	$scope.wine = wine
	$scope.currentUser = currentUser

	if(currentUser) {
		console.log(currentUser)

		$scope.review = {
			author: currentUser._id,
			wine: wine._id
		}
	}
	



	$scope.submitReview = function() {
		if(currentUser) {
			ReviewFactory.create($scope.review.author, $scope.review)
			.then(function() {
				// console.log('successfully posted')
				$state.go('wine', {wineId: $scope.review.wine})
			})
		}
		// console.log('submitted form', $scope.review)
	}

})