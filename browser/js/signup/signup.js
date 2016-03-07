app.config(function ($stateProvider) {

    $stateProvider.state('signup', {
        url: '/signup',
        templateUrl: 'js/signup/signup.html',
        controller: 'SignupCtrl'
    });

});

app.controller('SignupCtrl', function ($scope, AuthService, $state, $http) {

    $scope.login = {};
    $scope.error = null;

    $scope.sendSignup = function () {
      console.log('the signup function totally ran')
        $scope.error = null;

        AuthService.signup( $scope.signup ).then(function () {
            $state.go('home');
        }).catch(function () {
            $scope.error = 'Invalid login credentials.';
        });

    };

    // $scope.signup = function(service) {
    //   console.log('type in SignupCtrl signup() is: ' + service)
    //   // AuthService.useOauth(service);
    //   $http.get('/auth/' + service);
    // }

});