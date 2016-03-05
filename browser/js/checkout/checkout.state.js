app.config(function ($stateProvider) {

  $stateProvider.state('checkout', {
    url: '/checkout',
    templateUrl: 'js/checkout/templates/checkout-form.html',
    controller: 'checkoutCtrl'
  })

  $stateProvider.state('confirm', {
    url: '/confirm',
    templateUrl: 'js/checkout/templates/confirm.html',
    controller: 'confirmCtrl'
  })

  $stateProvider.state('thankYou', {
    url: '/thankyou',
    templateUrl: 'js/checkout/templates.html',
    controller: ''
  })

})