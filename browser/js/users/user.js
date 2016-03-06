app.config(function($stateProvider){
  $stateProvider.state('user', {
    url: '/users/:userId',
    templateUrl: '/js/users/user.html',
    controller: 'UserController',
    resolve: {
      user: function(UserFactory) {
        return UserFactory.getUser();
      }
    }
  })
})

app.factory('UserFactory', function($http){
  return {
    getUser: function($stateParams){
      var user;
      return $http.get('/api/users/' + $stateParams.userId)
        .then(function(res){
          user = res.data;
          return $http.get('/api/users/' + $stateParams.userId + "/reviews")
        })
        .then(function(res) {
          user.reviews = res.data;
          return user;
        });
    }
  }
});

app.controller('UserController', function($scope, user) {
  $scope.user = user;
})