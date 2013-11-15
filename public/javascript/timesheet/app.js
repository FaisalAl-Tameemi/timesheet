var RSK = RSK || {};

RSK.timesheet = function () {

    var init = function (appName, data) {
        var module = app(appName, data);

        angular.element(document).ready(function () {
            angular.bootstrap(document, [appName]);
        });
        return module;
    }

    var app = function (appName, data) {
        var module = angular.module(appName, ['timesheetDirectives', 'timesheetFilters', 'timesheetServices', 'localization', 'ngCookies', 'ui.bootstrap']);

        module.config(['$routeProvider', '$locationProvider', '$httpProvider', function ($routeProvider, $locationProvider, $httpProvider) {
            $locationProvider.html5Mode(true);
            $routeProvider.
                when('/', {
                    templateUrl: 'partials/index.html',
                    controller: 'IndexCtrl',
                    authenticate: true
                }).
                when('/login', {
                    templateUrl: 'partials/login.html',
                    authenticate: false
                }).
                when('/logout', {
                    templateUrl: 'partials/login.html',
                    controller: 'LogoutCtrl',
                    authenticate: false
                }).
                when('/readPost:id', {
                    templateUrl: 'partials/readpost.html',
                    controller: 'ReadPostCtrl'
                }).
                otherwise({
                    redirectTo: '/'
                });

            var interceptor = ['$location', '$q', function ($location, $q) {
                function success(response) {
                    return response;
                }

                function error(response) {

                    if (response.status === 401) {
                        $location.path('/login');
                        return $q.reject(response);
                    }
                    else {
                        return $q.reject(response);
                    }
                }

                return function (promise) {
                    return promise.then(success, error);
                }
            }];

            $httpProvider.responseInterceptors.push(interceptor);

        }]);

        module.run(['$rootScope', '$location', 'authenticate', function ($rootScope, $location, authenticate) {
            $rootScope.$on("$routeChangeStart", function (event, next, current) {
                if ((typeof(next.authenticate) === "undefined" || next.authenticate)
                    && !authenticate.isAuthenticated()) {
                    $location.path("/login");
                }
            })
        }]);

        module.controller("IndexCtrl", ["$scope", "$timeout", "slipsService", RSK.Timesheet.Controllers.IndexCtrl])
            .controller("LogoutCtrl", ["$scope", "authenticate", RSK.Timesheet.Controllers.LogoutCtrl]);

        return module;
    }

    return {
        start: init
    };
}();

