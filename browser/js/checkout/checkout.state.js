app.config(function ($stateProvider) {

  $stateProvider.state('checkout', {
    url: '/checkout',
    templateUrl: 'js/checkout/templates/checkout-form.html',
    controller: 'checkoutCtrl'
  })

  $stateProvider.state('confirm', {
    url: '/confirm',
    templateUrl: 'js/checkout/templates/confirm.html',
    controller: 'checkoutCtrl'
  })
  
})