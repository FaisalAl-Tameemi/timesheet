var RSK = RSK || {};
RSK.Filters = RSK.Filters || {};

var timesheetMoment = angular.module('timesheetMoment', []);

timesheetMoment.filter('moment', function() {
    return function(dateString, format) {
        return moment(dateString).format(format);
    };
});