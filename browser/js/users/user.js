app.config(function($stateProvider){
  $stateProvider.state('user', {
    url: '/users/:userId',
    templateUrl: 'js/users/user.html',
    controller: 'UserController',
    resolve: {
      user: function(UserFactory, $stateParams) {
        return UserFactory.getUser($stateParams.userId);
      }
    }
  })
})

app.factory('UserFactory', function($http, $q){
  var UserFactory = {};

  UserFactory.getUser = function(id){
    var userUrl = '/api/users/' + id;
    var reviewsUrl = userUrl + '/reviews';
    return $q.all([$http.get(userUrl), $http.get(reviewsUrl)])
      .then(function(responses){
        return responses.map(function(res) {
          return res.data;
        })
      })
      .then(function(results){
        var user = results[0];
        user.reviews = results[1];
        return user;
      })
    }

  return UserFactory;

});


app.controller('UserController', function($scope, user) {
  $scope.user = user;
});