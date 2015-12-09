angular.module('SMT').directive('cloudEvernote',
        ['CloudService','$sce','$http','$q',
            function (cloudService,$sce,$http,$q) {
                return {
                    restrict: 'AE',
                    replace: true,
                    scope:true,
                    templateUrl: 'app/cloud/cloudEvernote.html',
                   compile: function(tElem, tAttrs){
 
        return function(scope, elem, attrs){
          var initialized=false;
          var authorizationResult=false;
                  scope.loginWithEvernote=function() {
                       if (! scope.initialized ) 
                       {
                            scope.initialize();
                        }
                      scope.connectEvernote();
                                                    };
                       //scope.connectEvernote();
                  
                   scope.initialize = function() {
          //initialize OAuth.io with public key of the application//apkkMDFboB1y8YK0vDfqZ8zZmY8
          OAuth.initialize('PnCZJrVrhrRJ5cZgzEgOVaJQDR8', {cache:true});
          //try to create an authorization result when the page loads, this means a returning user won't have to click the twitter button again
          //authorizationResult = OAuth.create('evernote_sandbox');
          initialized = true;
        };

 scope.connectEvernote = function() {
          var deferred = $q.defer();
          OAuth.popup('evernote_sandbox', {cache:true}, function(error, result) { //cache means to execute the callback if the tokens are already present
            if (!error) {
              authorizationResult = result;
              console.log(authorizationResult);
              //deferred.resolve();
              scope.getNotebook();
              deferred.resolve();
            } else {
              //do something if thereng-click="refreshTimeline(tweets[tweets.length-1].id)'s an error

            }
          });
          return deferred.promise;
        };
       
scope.getNotebook = function () {
          //create a deferred object using Angular's $q service
          var deferred = $q.defer();
          var url='/getNote?oauth_token='+authorizationResult.oauth_token;
          var promise = authorizationResult.get(url).done(function(data) { //https://dev.twitter.com/docs/api/1.1/get/statuses/home_timeline
            //when the data is retrieved resolve the deferred object
            deferred.resolve(data);
          }).fail(function(err) {
            //in case of any error we reject the promise with the error object
            deferred.reject(err);
          });
          //return the promise of the deferred object
          return deferred.promise;
        };

            }
         }
      }
    }
        ]);  
   
