app.config(function($stateProvider) {
  $stateProvider.state('cart', {
    url: '/cart',
    templateUrl: 'js/cart/cart.html',
    controller: 'CartCtrl',
    resolve: {
      contents: function(AuthService, CartFactory) {
        return AuthService.getLoggedInUser()
        .then(function (user) {
          return CartFactory.getCart(user);          
        })
      },
      user: function(AuthService) {
        return AuthService.getLoggedInUser();
      }
    }
  })
})

app.factory('CartFactory', function(localStorageService, $http) {
  var CartFactory = {};


  CartFactory.getCart = function (user) {
    if (!user) {
      return localStorageService.get('cart');
    } else {
      return $http.get('/api/cart')
        .then(function(res) {
          return res.data;
        });
    }
  }

  CartFactory.addToCart = function(item) {
    if ( !localStorageService.get('cart') ) {
      localStorageService.set('cart', [item]);
    } else {
      var oldCart = localStorageService.get('cart');
      oldCart.push(item);
      localStorageService.set('cart', item);
    }  
  }

  return CartFactory;

})

app.controller('CartCtrl', function($scope, localStorageService, user, contents) {

  $scope.user = 'Guest'
  if (user) $scope.user = user.username;

  $scope.contents = contents.items;

  // $scope.addToCart = function(item) {
  //   if ( !localStorageService.get('cart') ) {
  //     localStorageService.set('cart', [item]);
  //   } else {
  //     var oldCart = localStorageService.get('cart');
  //     oldCart.push(item);
  //     localStorageService.set('cart', item);
  //   }  
  // }

  // we need to make sure to run localStorageService.$reset() after checkout

});