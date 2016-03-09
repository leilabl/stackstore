app.config(function($stateProvider){
  $stateProvider.state('user', {
    url: '/users/:username',
    templateUrl: 'js/users/user.html',
    controller: 'UserController',
    resolve: {
      user: function(UserFactory, $stateParams) {
        return UserFactory.getUser($stateParams.username)
      }
    }
  })
})

app.factory('UserFactory', function($http, $q){
  var UserFactory = {};

  // AW: you're using this static on the UserFactory 
  // to retrieve the `req.user`, which is the loggedInUser
  // so why not use `AuthService.getLoggedInUser()`....
  // no need to duplicate this functionality 
  UserFactory.getUser = function(username){
    var userUrl = '/api/users/' + username;
    var reviewsUrl = userUrl + '/reviews';
    // AW: good to see you folks using $q.all
    // isn't terrible that $q doesn't ship with a `spread` method ?!
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

  UserFactory.getOrders = function(username) {
    return $http.get('/api/users/' + username + '/orders')
      .then(function(res) {
        return res.data;
      })
  }

  return UserFactory;

  /*

    AW: want to make sure you folks know that you can just do 

      return {
  
        getUser: function(username){....}, 
        getOrders: function(username) {....}

      }


  */

});


app.controller('UserController', function($scope, user) {
  $scope.user = user;
});