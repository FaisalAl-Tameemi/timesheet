var RSK = RSK || {};
RSK.Directives = RSK.Directives || {};
RSK.Directives.Navbar = RSK.Directives.Navbar || {};

var timesheetNavbar = angular.module('timesheetNavbar', ['localization']);



angular.module("timesheetNavbar")
    .directive("navbar", function () {
        return {
            restrict: 'E',
            scope: {
                title: "@"
            },
            transclude: true,
            replace: true,
            template: '<div class="navbar navbar-fixed-top">' +
                '          <div class="navbar-inner">' +
                '              <a class="navbar-brand" href="/">' +
                '                  <span class="title">{{ title }}</span>' +
                '              </a>' +
                '              <div class="nav-collapse">' +
                '                  <ul class="nav" ng-transclude></ul>' +
                '              </div>' +
                '              <div class="nav pull-right">' +
                '                  <ul class="nav">' +
                '                      <li class="active"><a href="/logout">Sign out</a></li>' +
                '                  </ul>' +
                '              </div>' +
                '        </div>' +
                '    </div>'
        };
    });
