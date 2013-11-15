var RSK = RSK || {};
RSK.Directives = RSK.Directives || {};
RSK.Directives.Authenticate = RSK.Directives.Authenticate || {};

var timesheetAuthenticate = angular.module('timesheetAuthenticateDirective', ['localization']);


RSK.Directives.Authenticate.AuthenticateCtrl = function ($scope, $location, authenticate, localize) {

    var isSignedIn = false;
    var errorMessage = localize.getLocalizedString("UserAlreadyExists");

    $scope.isError = false;
    $scope.isRegistering = false;
    $scope.ErrorMessage = "LogonError";

    $scope.isSignedIn = function () {
        return authenticate.isAuthenticated();
    };
    $scope.showRegisterUI = function (show) {
        $scope.isRegistering = show;
    };
    $scope.signout = function () {
        var promise = authenticate.signOut();
        promise
            .success(function () {
                console.log("signOut success");
            }).error(function () {
                console.log("error");
            });

    };
    $scope.signin = function (user) {
        var promise = authenticate.signIn(user);
        promise
            .success(function (data, status, header) {
                $location.path("/");
            }).error(function () {
                $scope.isError = true;
                $scope.ErrorMessage = "LogonError";
                console.log("error");
            });
    };
    $scope.register = function (user) {
        var promise = authenticate.register(user);
        promise
            .success(function (data, status, header) {
                $location.path("/");
            }).error(function (message, errorCode) {
                $scope.isError = true;
                if (errorCode == 409) {
                    errorMessage = localize.getLocalizedString("UserAlreadyExists");
                    $.growl.error({ message: errorMessage });
                } else {
                    errorMessage = localize.getLocalizedString("LogonError");
                }
            });
    };

    $scope.getErrorMessage = function () {
        return errorMessage;
    };

};

angular.module("timesheetAuthenticateDirective")
    .directive("authenticate", function () {
        return {
            restrict: 'E',
            scope: {
                mainclass: "@"
            },
            replace: true,
            controller: ['$scope', '$location', 'authenticate', 'localize', RSK.Directives.Authenticate.AuthenticateCtrl],
            template: '<div>' +
                '    <div class="{{mainclass}}" ng-show="!isRegistering">' +
                '        <div id="manageUserUi" class="userManager">' +
                '            <span class="close" ng-click="showManageUserUi()"></span>' +
                '            <form name="authenticateSignInForm" id="authenticateSignInForm" novalidate>' +
                '                <div ng-hide="isSignedIn()">' +
                '                    <div>' +
                '                        <input id="authn_userName" type="text" placeholder="email" ng-model="user.email" required />' +
                '                    </div>' +
                '                    <div>' +
                '                        <input id="authn_userPassword" type="password" placeholder="password" ng-model="user.password" required />' +
                '                    </div>' +
                '                    <div>' +
                '                        <button class="btn" ng-click="signin(user)" ng-disabled="authenticateSignInForm.$invalid || user.isSignedIn" >Sign In</button>' +
                '                    </div>' +
                '                     <div class="registerHolder">' +
                '                         <a href="javascript:void(0)" ng-click="showRegisterUI(true)">Register</a>' +
                '                     </div>' +
                '                    <div class="alert alert-error" ng-show="isError" data-i18n="{{ ErrorMessage }}"></div>' +
                '                </div>' +
                '                <div ng-show="isSignedIn()">' +
                '                    <button class="btn" ng-click="signout()">Sign out</button>' +
                '                </div>' +
                '            </form>' +
                '        </div>' +
                '    </div>' +
                '    <div class="{{mainclass}}" ng-show="isRegistering">' +
                '        <div id="manageUserUi" class="userManager">' +
                '            <span class="close" ng-click="showManageUserUi()"></span>' +
                '            <form name="authenticateRegisterForm" id="authenticateRegisterForm" novalidate>' +
                '                <div ng-hide="isSignedIn()">' +
                '                    <div>' +
                '                        <input id="authn_userName" type="text" placeholder="email" ng-model="user.email" required />' +
                '                     </div>' +
                '                     <div>' +
                '                         <input id="authn_name" type="text" placeholder="name" ng-model="user.name" required />' +
                '                     </div>' +
                '                     <div>' +
                '                         <input id="authn_userPassword" type="password" placeholder="password" ng-model="user.password" required />' +
                '                     </div>' +
                '                     <div>' +
                '                         <input id="authn_repeatPassword" type="password" placeholder="repeat password" ng-model="user.repeatpassword" required />' +
                '                     </div>' +
                '                     <div>' +
                '                         <button id="authn_register" ng-click="register(user)" ng-disabled="authenticateRegisterForm.$invalid" class="btn">Register</button>' +
                '                     </div>' +
                '                     <div class="registerHolder">' +
                '                         <a href="javascript:void(0)" ng-click="showRegisterUI(false)">Sign In</a>' +
                '                     </div>' +
                '                     <div class="alert alert-error" ng-show="isError" ng-bind="getErrorMessage()"></div>' +
                '                </div>' +
                '            </form>' +
                '        </div>' +
                '    </div>' +
                '</div>'
        };
    });
