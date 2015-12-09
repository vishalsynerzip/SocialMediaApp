angular.module('SMT').directive('cloudOnedrive',
        ['CloudService','$sce',
            function (cloudService,$sce) {
                return {
                    restrict: 'AE',
                    replace: true,
                    scope:true,
                    templateUrl: 'app/cloud/cloudOnedrive.html',
                   compile: function(tElem, tAttrs){
 
        return function($scope, elem, attrs){
             $scope.ShowOnedriveFile=function(control)
    {
        window.open(control.currentTarget.id);
        //$scope.currentDropboxFileUrl = $sce.trustAsResourceUrl(dwnlink);
        //$scope.apply();
    }
        
         $scope.launchOneDrivePicker=function(){
    var pickerOptions = {
  success: function(files) {
    // Handle returned file object(s)
    //alert("You picked " + files.values[0].fileName);
     cloudService.addoneDriveFile(files.values[0]);
                  $scope.oneDriveFileList = cloudService.oneDriveFileList;
                  $scope.$apply();
  },

  cancel: function() {
      // handle when the user cancels picking a file
  },

  linkType: "webViewLink", // or "downloadLink",
  multiSelect: false // or true
}
    OneDrive.open(pickerOptions);
  }
             }
                    }
                }
            }
        ]);
