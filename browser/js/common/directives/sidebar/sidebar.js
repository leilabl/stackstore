app.directive('sidebar', function(WinesFactory){
	return {
		restrict: 'E',
        scope: {},
		templateUrl: 'js/common/directives/sidebar/sidebar.html',
        link: function (scope) {

        	scope.runfunc = function() {
        		scope.type = Articles.query({user: 'user_id'});
        		console.log(scope.type)
        	}

            // scope.items = [
            //     { label: 'Home', state: 'home' },
            //     { label: 'About', state: 'about' },
            //     { label: 'Documentation', state: 'docs' },
            //     { label: 'Members Only', state: 'membersOnly', auth: true },
            //     { label: 'Wines', state: 'wines'}
            // ];
	}
}})