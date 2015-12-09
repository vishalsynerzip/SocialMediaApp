angular.module('SMT').controller('mainCtrl', function ($scope, $http, $location, host, $analytics) {
    var res = $http.post(host + '/timeline');
    res.success(function (data) {
      console.log(data);
      $scope.username = data.user;
      $scope.message = data.message;
    });

});
