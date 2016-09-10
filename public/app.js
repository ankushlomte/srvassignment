'use strict';
var ApplicationModuleName = 'studentApp';


// Create the main application
var SampleApplicationModule = angular.module('studentApp', []);



angular.module('studentApp').controller('studentController', [
    '$scope',
    '$rootScope',
    '$http',
    function($scope,  $rootScope, $http) {
    	
        // console.log("in studentController");
    	$scope.studentlist = {};
        $scope.showStudentForm = false;
        $scope.tobeDeletedStudent = {};
        $scope.studentInfo = {};
		$scope.getStudentList = function(){
            $http.post("./../api/studentlist.php", {}).success(function(resp, err) {
            	console.log(err, resp);
            	$scope.studentlist = resp;
                $scope.getStudentInfo();
            }).error(function() {});
		};

        $scope.propertyName = 'id';
        $scope.reverse = true;
        $scope.sortBy = function(propertyName) {
            $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
            $scope.propertyName = propertyName;
        };  

        $scope.showAddStudentForm = function () {
            $scope.showStudentForm = true;
        }

        $scope.hideStudentForm = function () {
            $scope.showStudentForm = false;
        }

        $scope.saveStudent = function(valid)  {
            var date = new Date($scope.student.birthdate);
            $scope.student.birthdate = date.getTime();            
            if(valid){
                $http.post("./../api/addstudent.php", $scope.student).success(function(resp, status) {
                    if(status ==200 || 201){
                        $scope.student.id = parseInt( resp[0]);      
                        var newstudent = JSON.parse(JSON.stringify($scope.student)); // deep copy to insert in list                        
                        $scope.sortBy('id');
                        $scope.studentlist.push(newstudent);
                        $scope.hideStudentForm();
                        $scope.getStudentInfo();

                    }
                    // $scope.studentlist = resp;
                }).error(function() {});
            } else{
                alert("All fileds are required");
            }
        };

        $scope.askDeleteStudent = function(studentObj){
            $scope.tobeDeletedStudent = studentObj;
        };
        $scope.confirmDeleteStudent = function() {
            $http.post("./../api/deletestudent.php", { 'id': $scope.tobeDeletedStudent.id }).success(function(resp, status) {
                    
                    if(status ==200 ||  status == 201){
                        $scope.getStudentInfo();
                        var index = $scope.studentlist.indexOf($scope.tobeDeletedStudent);
                        if(index!=-1){
                           $scope.studentlist.splice(index, 1);
                        }
                        
                    }
                   
                }).error(function() {});
        };

        $scope.getStudentInfo = function  () {
            

            $http.post("./../api/studentinfo.php", $scope.student).success(function(resp, status) {                
                if(status ==200 || 201){
                    $scope.studentInfo.minName = resp[0].name;
                    $scope.studentInfo.minPercentage = resp[0].percentage;

                    $scope.studentInfo.maxName = resp[1].name;
                    $scope.studentInfo.maxPercentage = resp[1].percentage;

                    $scope.studentInfo.avgPercentage = resp[2].average;
                }                
            }).error(function() {});
        }
	}
]);

// SampleApplicationModule.filter('num', function() {
//     return function(input) {
//        return parseInt(input, 10);
//     }
// });