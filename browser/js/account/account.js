app.config(function($stateProvider){
  // should only be able to go to this state if logged in...
  $stateProvider.state('account', {
    url: '/account',
    templateUrl: 'js/account/account.html',
    controller: 'AccountController',
    resolve: {
      user: function(UserFactory) {
        return UserFactory.getUser('me');
      },
      orders: function(user){
        return UserFactory.getOrders('me');
      }
    }
  })
});

app.controller('AccountController', function($scope, user, orders) {
  
  $scope.user = user;
  $scope.orders = orders;

  // this is repetitive right now - any ideas for how to remove this duplication?
  var shippingRates = {
    "standard": 4.95,
    "express": 12.95,
    "overnight": 25.95
  }

  $scope.getShippingCost = function(order) {
    return shippingRates[order.shippingRate];
  }

  $scope.cancelOrder = function(order) {
    // we haven't implemented this on the backend
    // at least as far as both cancelling and refunding
  }

  $scope.editReview = function(review) {
    // bring up edit modal or redirect to edit page?
  }

  $scope.deleteReview = function(review) {
    // confirm that they want to delete the review
    // call ReviewFactory.delete with this review or its id
  }

})