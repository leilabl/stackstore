app.config(function ($stateProvider) {

  $stateProvider.state('checkout', {
    url: '/checkout',
    templateUrl: 'js/checkout/templates/checkout-form.html',
    controller: 'checkoutCtrl'
  })

  $stateProvider.state('thankyou', {
    url: '/thankyou',
    templateUrl: 'js/checkout/templates/thankyou.html'
  })

})