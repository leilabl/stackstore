app.config(function ($stateProvider) {
    $stateProvider.state('wine', {
        url: '/wines/:wineId',
        templateUrl: 'js/wines/wine.html',
        resolve: {
        	//move to wineFactory
        	//maybe use js-data
        	wine: function($http, $stateParams) {
        		return $http.get('/api/wines/' + $stateParams.wineId)
        	}
        }
    });
});

app.controller('WineController', function($scope, wine) {
	$scope.wine = wine
})