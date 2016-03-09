app.config(function($stateProvider) {
  $stateProvider.state('cart', {
    url: '/cart',
    templateUrl: 'js/cart/cart.html',
    controller: 'CartCtrl',
    resolve: {
      contents: function(CartFactory) {
            return CartFactory.getCart();   
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

  CartFactory.getCart = function () {
    return AuthService.getLoggedInUser()
    .then(function (user) {
      if (!user) {
        return currCart;
      } else {
        return $http.get('/api/cart')
          .then(function(res) {
            return res.data;
          });
      }
    })
  }

  CartFactory.addToCart = function(item) {
    var newItem = {wine: item, quantity: 1}
    return AuthService.getLoggedInUser()
      .then(function (user) {
        if(!user) {
          var exg = false;
          for (var i = 0; i<currCart.items.length; i++) {
            if(currCart.items[i].wine._id == item._id) {
              currCart.items[i].quantity++;
              exg = true;
            }
          }
          if (!exg) {
            currCart.items.push(newItem);
          }
          
          localStorageService.set('cart', currCart);
        
          return currCart; 

        } else {
          return $http.put('/api/cart', item)
            .then(function(res) {
              return res.data;
            });
        }
      })
  }

  return CartFactory;

})

app.controller('CartCtrl', function($scope, localStorageService, user, contents, $state, $rootScope) {

  $scope.user = 'Guest'
  if (user) $scope.user = user.username;

  $scope.contents = contents.items;

  $rootScope.preOrder;

  $scope.checkout = function () {
    $rootScope.preOrder = $scope.contents;
    $state.go('checkout')
  }

  // $scope.increase = function (item) {
  //   $scope.contents
  // }

  // we need to make sure to run localStorageService.$reset() after checkout

});