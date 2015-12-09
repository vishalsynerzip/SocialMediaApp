/*angular.module('SMT').directive('cloudDropbox',
        ['$rootScope', '$interval',
            function ($rootScope, $interval) {
                return {
                    restrict: 'AE',
                    replace: true,
                    scope:true,
                    templateUrl: 'app/cloud/cloudDropbox.html'
                }
            },
        ]);*/
        
angular.module('SMT').directive('cloudDropbox',
        ['CloudService','$sce',
            function (cloudService,$sce) {
                return {
                    restrict: 'AE',
                    replace: true,
                    scope:true,
                    templateUrl: 'app/cloud/cloudDropbox.html',
                   compile: function(tElem, tAttrs){
 
        return function($scope, elem, attrs){
                $scope.ShowDropboxFile=function(control)
    {
        window.open(control.currentTarget.id);
    }
    $scope.DownloadFile=function(control)
    {
        var dwnlink = control.currentTarget.name.substr(0, control.currentTarget.name.length - 1) + "1";
        $scope.currentDropboxFileUrl = $sce.trustAsResourceUrl(dwnlink);
    }
        
        $scope.LoginWithDropbox=function()
           {
               
              var options = {

    // Required. Called when a user selects an item in the Chooser.
    success: function(files) {
        cloudService.addDropboxFile(files[0]);
        $scope.dropboxFileList = cloudService.dropboxFileList;
        $scope.$apply();
        //alert("Here's the file link: " + files[0].link)
    },

    // Optional. Called when the user closes the dialog without selecting a file
    // and does not include any parameters.
    cancel: function() {

    },

    // Optional. "preview" (default) is a preview link to the document for sharing,
    // "direct" is an expiring link to download the contents of the file. For more
    // information about link types, see Link types below.
    linkType: "preview", // or "direct"

    // Optional. A value of false (default) limits selection to a single file, while
    // true enables multiple file selection.
    multiselect: false, // or true

    // Optional. This is a list of file extensions. If specified, the user will
    // only be able to select files with these extensions. You may also specify
    // file types, such as "video" or "images" in the list. For more information,
    // see File types below. By default, all extensions are allowed.
    //extensions: ['.pdf', '.doc', '.docx'],
};
                  Dropbox.choose(options);
                  
                  
        }
                
                 }
                    }
                }
            }
        ]);