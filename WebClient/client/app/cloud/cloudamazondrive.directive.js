angular.module('SMT').directive('cloudAmazondrive',
        ['CloudService','$sce','$http',
            function (cloudService,$sce,$http) {
                return {
                    restrict: 'AE',
                    replace: true,
                    scope:true,
                    templateUrl: 'app/cloud/cloudamazondrive.html',
                   compile: function(tElem, tAttrs){
 
return function($scope, elem, attrs){
    $scope.amazondrivePicker=function(){
        var driveurl = encodeURI("https://www.amazon.com/ap/oa?client_id=amzn1.application-oa2-client.7d9f9ea3481d4603a1eec3a8e0696a6e&scope=clouddrive:read_all&response_type=token&redirect_uri=http://localhost:3000/cloud");
           $http({
                    method: 'GET',
                    url: driveurl,
                    headers:{'Access-Control-Allow-Origin': '*'}
                }).then(function successCallback(response) {
                }, function errorCallback(response) {
  });
    }
             }
                    }
                }
            }
        ]);
