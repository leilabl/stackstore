app.controller('checkoutCtrl', function ($scope, $state, CheckoutFactory, $rootScope) {
  
  $scope.states = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DC", "DE", "FL", "GA", 
          "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", 
          "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", 
          "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", 
          "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"]

  $scope.checkoutInfo = {
    owner: '56d9f82ab405944e6edf76b2',
    items: [{
      wine: '56d9f82ab405944e6edf76b4',
      price: 20,
      quantity: 1
    }],
    shippingAddress: {}
  }


  $scope.submitOrder = function () {
    console.log($scope.checkoutInfo)
    CheckoutFactory
    .create($scope.checkoutInfo)
    .then(function () {
      $state.go('thankyou')
    })
  }

  $scope.total = 0;

  $rootScope.preOrder.forEach(function (el) {
    $scope.total += el.wine.price * el.quantity;
  console.log($scope.total)
  })

})