angular.module('SMT').directive('cloudEvernote',
        ['$rootScope', '$interval',
            function ($rootScope, $interval) {
                return {
                    restrict: 'AE',
                    replace: true,
                    scope:true,
                    templateUrl: 'app/cloud/cloudEvernote.html'
                }
            },
        ]);