app.directive('sidebar', function(WinesFactory, $location){
	return {
		restrict: 'E',
		templateUrl: 'js/common/directives/sidebar/sidebar.html',
    scope: {},
    link: function(scope){
      
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

      var types = [
        "Red",
        "White"
      ]

      var regions = [
        "California",
        "Spain",
        "France",
        "Italy"
      ]

      var varieties = [
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

      scope.categories = [
        {
          name: "type",
          options: types
        },
        {
          name: "region",
          options: regions
        },
        {
          name: "variety",
          options: varieties
        }
      ]
      
    }
  }
})