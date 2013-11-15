var RSK = RSK || {};
RSK.Directives = RSK.Directives || {};
RSK.Directives.Authenticate = RSK.Directives.Authenticate || {};

var timesheetdatePicker = angular.module('timesheetDatepicker', ['localization']);


timesheetdatePicker.directive('jqdatepicker', function () {
    var datepicker;
    var visible = false;
    var getMondayDate = function (dateFrom) {
        var day = dateFrom.getDay();
        var monday = dateFrom.getDate() - day + 1;
        var mondayDate = new Date(dateFrom.getFullYear(), dateFrom.getMonth(), monday);
        return mondayDate;
    };
    return {
        restrict: 'E',
        template: '<input type="text"/><button ng-click="showDate()"><i class="glyphicon glyphicon-calendar"></i></button>',
        controller: function ($scope) {
            $scope.showDate = function () {
                if (visible) {
                    datepicker.datepicker('destroy');
                    visible = false;
                } else {
                    datepicker.datepicker('show');
                    visible = true;
                }
            }
        },
        require: 'ngModel',
        link: function (scope, element, attrs, ngModelCtrl) {
            var button = element.find('button');
            datepicker = element.find('input').datepicker({
                dateFormat: 'DD, d  MM, yy',
                beforeShow: function () {
                    visible = true;
                },
                onSelect: function (date, evt) {
                    var selectedDate = new Date(evt.selectedYear, evt.selectedMonth, evt.selectedDay);
                    var mondayDate = getMondayDate(selectedDate);
                    scope.date = datepicker.datepicker("setDate", mondayDate).val();
                    scope.$apply();
                    visible = false;
                },
                onClose: function(){
                    visible = false;
                }
            });
            var mondayDate = getMondayDate(new Date());
            var val = datepicker.datepicker("setDate", mondayDate).val();
            scope.date = val;
        }
    }
});