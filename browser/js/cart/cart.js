app.config(function($stateProvider) {
  $stateProvider.state('cart', {
    url: '/cart',
    templateUrl: 'js/cart/cart.html',
    controller: 'CartCtrl',
    resolve: {
      contents: function(AuthService, CartFactory) {
        return CartFactory.getCart(AuthService.getLoggedInUser());
      }
    }
  })
})

app.factory('CartFactory', function(localStorageService) {
  var CartFactory = {};

  CartFactory.getCart = function (user) {
    if (!user) {
      return localStorageService.get('cart');
    } else {
      return $http.get('/api/users/' + user._id + 'cart')
        .then(function(res) {
          return res.data;
        });
    }
  }

})

myApp.controller('CartCtrl', function($scope, localStorageService) {

  $scope.addToCart(item) {
    if (!localStorageService.get('cart') ) localStorageService.set('cart', [item]);
    else {
      var oldCart = localStorageService.get('cart');
      oldCart.push(item);
      localStorageService.set('cart', item);
    }  
  }

  // we need to make sure to run localStorageService.$reset() after checkout

});