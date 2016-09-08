<?php
// print_r($_POST);
$con = mysql_connect('localhost','root', '') or die();
// var_dump($con);
$db	 = mysql_select_db('srvmedia') or die();
// var_dump($db);
$student_res = mysql_query("select * from student") or die();
$student_list = array( );
while ($row = mysql_fetch_assoc($student_res)) {
    array_push($student_list,$row);
}

// $student_list = mysql_fetch_array($student_query) or die();
// print_r($student_list);
echo json_encode($student_list);