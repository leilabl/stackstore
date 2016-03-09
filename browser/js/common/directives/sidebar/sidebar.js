app.directive('sidebar', function(WinesFactory){
	return {
		restrict: 'E',
		templateUrl: 'js/common/directives/sidebar/sidebar.html',
    scope: {},
    link: function(scope, $location){
      
      scope.isSelected = function(category, value) {
        return $location.search()[category] === encodeURI(value.toLowerCase());
      }

      scope.toggleFilter = function(key, value) {
        if ($location.search()[key] === encodeURI(value.toLowerCase()) ) {
          $location.search(key, null);
        } else {
          $location.search(key, encodeURI(value.toLowerCase()) );
        }
      }

      scope.types = ["Red", "White"];

      scope.regions = [
        "California",
        "Spain",
        "France",
        "Italy"
      ]

      scope.varieties = [
        "Cabernet Sauvignon",
         "Zinfandel",
         "Pinot Noir",
         "Chardonnay",
         "Malbec",
         "Pinot Grigio",
         "Moscato",
         "Sauvignon Blanc",
         "Syrah",
         "Carignan",
         "Merlot",
         "Red Blend",
         "Grenache",
         "Riesling",
         "Sangiovese",
         "Barbera",
         "Vermentino",
         "Pinot Bianco",
         "Tempranillo",
         "Viura",
         "Grenache Blanc",
         "Mencia"
      ]
    }
  }
})