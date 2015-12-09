angular.module('SMT').config(function($stateProvider){
    $stateProvider.state('timeline',{
        url:"/timeline",
        templateUrl:"app/main/main.html",
        controller:"mainCtrl"
    });
});
