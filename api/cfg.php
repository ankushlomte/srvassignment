<?php
$con = mysql_connect('localhost','root', '') or die();
// var_dump($con);
$db	 = mysql_select_db('srvmedia') or die();
// var_dump($db);
$student_query = mysql_query("select * from student") or die();
$student_list = mysql_fetch_array($student_query) or die();
echo json_encode($student_list);