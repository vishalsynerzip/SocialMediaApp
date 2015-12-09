/*angular.module('SMT').directive('cloudBoxdrive',
        ['$rootScope', '$interval',
            function ($rootScope, $interval) {
                return {
                    restrict: 'AE',
                    replace: true,
                    scope:true,
                    templateUrl: 'app/cloud/cloudBoxdrive.html'
                }
            },
        ]);*/
        
angular.module('SMT').directive('cloudBoxdrive',
        ['CloudService','$sce',
            function (cloudService,$sce) {
                return {
                    restrict: 'AE',
                    replace: true,
                    scope:true,
                    templateUrl: 'app/cloud/cloudBoxdrive.html',
                   compile: function(tElem, tAttrs){
 
        return function($scope, elem, attrs){
                   $scope.ShowBoxdriveFile=function(control)
     {
         window.open(control.currentTarget.id);
     }
    
        
        
        $scope.boxdrivePicker= function()
        {
           
        var options = {
    clientId: "67s3chcyyak7hl7jpgjkfepm4bol7arp",
    linkType: "shared",
    multiselect: "false"
                        };
var boxSelect = new BoxSelect(options);
 boxSelect.success(function(response) {
     cloudService.addboxDriveFile(response[0]);
                  $scope.boxDriveFileList = cloudService.boxDriveFileList;
                  $scope.$apply();
    console.log(response);
});
// Register a cancel callback handler
boxSelect.cancel(function() {
    console.log("The user clicked cancel or closed the popup");
});
boxSelect.launchPopup();
        }
                   }
                    }
                }
            }
        ]);