angular.module('SMT').config(function($stateProvider){
    $stateProvider.state('cloud',{
        url:"/cloud",
        templateUrl:"app/cloud/cloud.html",
        controller:"cloudCtrl"
    });
});
