angular.module('SMT').directive('cloudGdrive',
        ['CloudService','$sce',
            function (cloudService,$sce) {
                return {
                    restrict: 'AE',
                    replace: true,
                    scope:true,
                    templateUrl: 'app/cloud/cloudGdrive.html',
                   compile: function(tElem, tAttrs){
 
        return function($scope, elem, attrs){
                
     $scope.currentFileUrl='';
     $scope.Show=function(control)
     {
         $scope.currentFileUrl = $sce.trustAsResourceUrl(control.currentTarget.id);        // $scope.currentDropboxFileUrl = $sce.trustAsResourceUrl(control.currentTarget.id);
         $scope.$apply();
     }
    
     $scope.oauthToken='';
     $scope.pickerApiLoaded=false;
     $scope.LoginWithGoogle = function() {
            gapi.load('auth', { 'callback': onAuthApiLoad });
            gapi.load('picker', { 'callback': onPickerApiLoad });
        }

        function onAuthApiLoad() {
            window.gapi.auth.authorize(
                {
                    'client_id': '579050972948-ot1hm22tds2oor4m78n3ad9rho9fic0t.apps.googleusercontent.com',
                    'scope': 'https://www.googleapis.com/auth/drive',
                    'immediate': false
                },
                handleAuthResult);
        }

        function onPickerApiLoad() {
            $scope.pickerApiLoaded = true;
            createPicker();
        }

        function handleAuthResult(authResult) {
            if (authResult && !authResult.error) {
                $scope.oauthToken = authResult.access_token;
                createPicker();
            }
        }

        // Create and render a Picker object for picking user Photos.
        function createPicker() {
            if ($scope.pickerApiLoaded && $scope.oauthToken) {
                //var view = new google.picker.View(google.picker.ViewId.DOCS);
                //view.setMimeTypes("application/vnd.openxmlformats-officedocument.presentationml.presentation");
                var picker = new google.picker.PickerBuilder().
                    addView(google.picker.ViewId.DOCS).
                    //addView(view).
                    setOAuthToken($scope.oauthToken).
                    //setDeveloperKey(developerKey).
                    setCallback(pickerCallback).
                    build();
                picker.setVisible(true);
            }
        }

        // A simple callback implementation.
        function pickerCallback(data) {
            var url = 'nothing';
            if (data[google.picker.Response.ACTION] == google.picker.Action.PICKED) {
                var doc = data[google.picker.Response.DOCUMENTS][0];
                cloudService.addDriveFile(doc);
                  $scope.driveFileList = cloudService.driveFileList;
                  $scope.$apply();
            }
        }
         }
                    }
                }
            }
        ]);
