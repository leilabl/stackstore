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

app.factory('CartFactory', function(localStorageService, $http, AuthService) {
  var CartFactory = {};
  var currCart = localStorageService.get('cart') || {items: []};
  // console.log(currCart)

  CartFactory.getCart = function () {
    console.log('in get cart')
      return AuthService.getLoggedInUser()
      .then(function (user) {
        console.log(user)
          if (!user) {
            console.log('no user')
            return currCart;
          } else {
            return $http.get('/api/cart')
            console.log('has user')
              .then(function(res) {
                console.log('res', res)
                return res.json;
              });
          }
      })
      // console.log(localStorageService)
  }

  CartFactory.addToCart = function(item) {
    return AuthService.getLoggedInUser()
      .then(function (user) {
        if(!user) {
          console.log('here')
          currCart.items.push(item);
          localStorageService.set('cart', currCart);
          return currCart;  
        } else {
          return $http.put('/api/cart', item)
          console.log(item)
            .then(function(res) {
              return res.json;
            });
        }
      })
    // console.log(item)
  }

  return CartFactory;

})

app.controller('CartCtrl', function($scope, localStorageService, user, contents) {

  $scope.user = 'Guest'
  if (user) $scope.user = user.username;

  $scope.contents = contents.data.items;

  console.log(contents.data)


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