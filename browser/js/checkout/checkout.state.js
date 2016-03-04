app.config(function ($stateProvider) {

  $stateProvider.state('checkout', {
    url: '/checkout',
    templateUrl: 'js/checkout/templates/checkout-form.html',
    controller: 'checkoutCtrl'
  })
})