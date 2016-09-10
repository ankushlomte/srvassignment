<?php
include('cfg.php');
$data = file_get_contents("php://input");
$data = json_decode ($data);

$student_res = mysql_query("INSERT INTO student ( name, birthdate,percentage) VALUES ( '$data->name', '$data->birthdate','$data->percentage')") or die();
$insertedid = mysql_insert_id();
$student_info_qry = mysql_query("SELECT name, percentage FROM student WHERE percentage = (SELECT MIN(percentage) FROM student) UNION SELECT name, percentage FROM student WHERE percentage = (SELECT MAX(percentage) FROM student)") or die();
$student_info_min = mysql_fetch_array($student_info_qry) or die();
$student_info_max = mysql_fetch_array($student_info_qry) or die();

$student_avg_qry = mysql_query("SELECT AVG(percentage) as average FROM student ") or die();
$student_info_avg = mysql_fetch_array($student_avg_qry) or die();
$response =array( );
if($student_res)
	{
		array_push($response, $insertedid);
		array_push($response, $student_info_min);
		array_push($response, $student_info_max);
		array_push($response, $student_info_avg);
		// array_push($response, $student_res);
		echo json_encode($response);
	}