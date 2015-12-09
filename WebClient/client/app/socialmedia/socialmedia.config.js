angular.module('SMT').config(function($stateProvider){
    $stateProvider.state('socialmedia',{
        url:"/socialmedia",
        templateUrl:"app/socialmedia/socialmedia.html",
        controller:"socialmediaCtrl"
    });
});
