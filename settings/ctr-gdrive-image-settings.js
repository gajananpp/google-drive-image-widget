angular.module("risevision.widget.google.drive.image.settings")
  .controller("googleDriveImageSettingsController", ["$scope",
    function ($scope) {
		/*When a Controller is attached to the DOM via the ng-controller directive, Angular will instantiate a new Controller object,
		 * using the specified Controller's constructor function (this function.) A new child scope will be available as an injectable parameter to the
		 * Controller's constructor function as $scope.

		 * Use controllers to:

		 * 	Set up the initial state of the $scope object.
		 *	Add behavior to the $scope object.*/
		//  window.setTimeout(function() {console.log($scope)},10000);
      $scope.getId = function() {
        getUrls();
        // $scope.$parent.settings.additionalParams.message = clientId;
      };

      $scope.transitionEffects = ["bars", "blocks", "concentric", "slide", "zip", "blinds3d", "tiles3d", "turn", "cube", "bars3d", "warp", "dissolve", "blocks2", "blinds"];
      $scope.selection = ["bars"];
      $scope.toggleSelection = function(effect) {
        var idx = $scope.selection.indexOf(effect);

        if (idx>-1) {
          $scope.selection.splice(idx,1);
          $scope.$parent.settings.additionalParams.selection = $scope.selection;
        }
        else {
          $scope.selection.push(effect);
          $scope.$parent.settings.additionalParams.selection = $scope.selection;
        }
      }
      $scope.checkAll = function() {
        $scope.selection = $scope.transitionEffects;
        $scope.$parent.settings.additionalParams.selection = $scope.selection;
      }
      $scope.uncheckAll = function() {
        $scope.selection = [];
        $scope.$parent.settings.additionalParams.selection = $scope.selection;
      }
	  

       window.setTimeout(function() {console.log($scope);},10000);
    }
  ])
  // This is where we set the default values for our Widget's settings. When you add new settings to the Widget model you can give them default values here.
  .value("defaultSettings", {
    "params": {},
    "additionalParams": {
      "arrayOfUrls": [],
      "delay": 4,
      "showControls": false
    }
  })
  .filter('capitalize', function() {
    return function(input) {
      return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    }
  })
  .filter('nspace',function() {
    return function(input) {
      var x = input.indexOf('3');
      if (x===-1) {
        x = input.indexOf('2');
      }
      if (x!==-1) {
        var y = input.slice(0,x);
        var z = input.slice(x).toUpperCase();
        return y+" "+z;
      }
      else {
        return input;
      }
    }
  });
