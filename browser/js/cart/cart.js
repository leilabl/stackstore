app.config(function($stateProvider) {
  $stateProvider.state('cart', {
    url: '/cart',
    templateUrl: 'js/cart/cart.html',
    controller: 'CartCtrl',
    resolve: {
      contents: function(AuthService, CartFactory) {
        // console.log('hey')
        return AuthService.getLoggedInUser()
        .then(function(user) {
          // console.log(user)
          if(user){
              return CartFactory.getCart(user);          
          }
          else {
            // console.log('not logged in')
            return CartFactory.getCart();
          }
          
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
  var currCart = localStorageService.get('cart') || {items: []};
  console.log(currCart)

  CartFactory.getCart = function (user) {
      // console.log(localStorageService)
    if (!user) {
      // console.log('no user')
      return currCart;
    } else {
      return $http.get('/api/cart')
        .then(function(res) {
          return currCart;
        });
    }
  }

  CartFactory.addToCart = function(item) {
      currCart.items.push(item);
      localStorageService.set('cart', currCart);
      return currCart;
  }

  return CartFactory;

})

app.controller('CartCtrl', function($scope, localStorageService, user, contents) {

  $scope.user = 'Guest'
  if (user) $scope.user = user.username;

  $scope.contents = contents.items;

        console.log(contents.items)


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