app.factory('CheckoutFactory', function ($http) {
  
    var CheckoutFactory = {};

    CheckoutFactory.create = function (data) {
    console.log(data)
    return $http.post('/api/orders', data)
    .then(function (response) {
        var order = response.data;
        return order;
    });
  };

  return CheckoutFactory;

});