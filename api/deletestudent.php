<?php
include('cfg.php');
$data = file_get_contents("php://input");
$data = json_decode ($data);
// print_r($data);


// var_dump($db);
$delete_res = mysql_query("DELETE FROM student WHERE id = '$data->id'") or die();

if($delete_res)
	{
		echo json_encode($delete_res);
	}