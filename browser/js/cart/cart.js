app.config(function($stateProvider) {
  $stateProvider.state('cart', {
    url: '/cart',
    templateUrl: 'js/cart/cart.html',
    controller: 'CartCtrl'
  })
})

app.factory('CartFactory', function() {

})

//localStorageService

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