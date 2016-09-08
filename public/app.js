'use strict';
var ApplicationModuleName = 'studentApp';


// Create the main application
var SampleApplicationModule = angular.module('studentApp', []);



angular.module('studentApp').controller('studentController', [
    '$scope',
    '$rootScope',
    '$http',
    function($scope,  $rootScope, $http) {
    	console.log("in studentController");
    	$scope.studentlist = {};
		$scope.getStudentList = function(){

        $http.post("./../api/studentlist.php", {}).success(function(resp, err) {
        	console.log(err, resp);
        	$scope.studentlist = resp;
            }).error(function() {});
		}
	}
]);
