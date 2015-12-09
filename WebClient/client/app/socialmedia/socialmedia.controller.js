angular.module('SMT').controller('socialmediaCtrl', ['$scope',
function ($scope,$http, $location, host, $analytics) {
  $scope.username = "SocialMedia";
 
  //$scope.driveFileList='';
  $scope.LoginWithLinkedIn = function() {
      $scope.username = "Clicked !"
  }
   $scope.authorize = function () {
      gapi.init(); 
    }

 //$scope.LoginWithGoogle = function() {
      //$scope.authorize = function () {
      //gapi.init(); 
    //}
      //$scope.username = "Vishal"
 // }
 
}]);
