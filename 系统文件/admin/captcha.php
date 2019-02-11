<?php 
if (!isset($_SESSION))//session
	{
	session_start();//Session
	}
function captcha_create($count = 5){
	$code = '';
	$charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ23456789';//随机因子
	$len = strlen($charset) - 1;
	for ($i=0; $i < $count; $i++) { 
		$code .= $charset[rand(0,$len)];
	}
	return $code;

}
$code = captcha_create();
echo $code;
$_SESSION['crm']['captcha'] = $code;

 ?>
