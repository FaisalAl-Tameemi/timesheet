'use strict';

var RSK = RSK || {};

RSK.Timesheet = RSK.Timesheet || {};

RSK.Timesheet.Controllers = RSK.Timesheet.Controllers || {};

RSK.Timesheet.Controllers.IndexCtrl = function ($scope, $timeout, slipsService) {

    $scope.date = new Date();

    $scope.$watch('date', function (newValue, oldValue) {
        if (oldValue != newValue) {
            var data = slipsService.getSlips(new Date($scope.date));
            $scope.slips = data;
        }
    });

};

RSK.Timesheet.Controllers.LogoutCtrl = function ($scope, authenticate) {
    authenticate.signOut();
};



