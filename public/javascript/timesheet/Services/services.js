var RSK = RSK || {};
RSK.Services = RSK.Services || {};

var services = angular.module('timesheetServices', ['wrapper', 'ngResource']);

services.factory("authenticate", ["$http", "$cookies", RSK.Services.authenticate]);
services.factory("slipsService", ['$resource', RSK.Services.Entries.slipsService]);
