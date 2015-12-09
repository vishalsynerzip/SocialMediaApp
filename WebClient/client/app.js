var app = angular.module('SMT', [
    'ui.router','ui.bootstrap','angulartics.google.analytics','angulartics','ngMaterial',
    'ngAnimate','gapi'
]).config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider,$analyticsProvider) {
    $urlRouterProvider
        .otherwise('/timeline');
        //.otherwise('/login');

    $locationProvider.html5Mode(true);
});
// app.constant('host',"http://52.89.158.236:3600");
app.constant('host',"http://localhost:3600");
//angular.module('SMT', ['gapi']);
app.value('GoogleApp', {
    apiKey: 'AIzaSyAJSn_cF4Txw3WJITGubDLz3OZ4dzgAUpk',
    clientId: '579050972948-ot1hm22tds2oor4m78n3ad9rho9fic0t.apps.googleusercontent.com',
    scopes: [
      // whatever scopes you need for your app, for example:
      'https://www.googleapis.com/auth/drive',
      'https://www.googleapis.com/auth/youtube',
      'https://www.googleapis.com/auth/userinfo.profile'
      // ...
    ]
  })