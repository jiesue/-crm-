

<?php 
		if (!isset($_SESSION))//session
	{
	session_start();//Session
	}


 ?>

<!DOCTYPE html>
<html lang="en">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"> 
	<title>登陆中。。。。。</title>
</head>
<body>
	<?php 



	/* 配置连接参数 */
	$config = array(
	  'type' => 'mysql',
	  'host' => 'localhost',
	  'username' => 'root',
	  'password' => '',
	  'database' => 'jie',
	  'port' => '3306'
	);

	$host = $config['host'];    //主机地址
    $username = $config['username'];//用户名
    $password = $config['password'];//密码
    $database = $config['database'];//数据库
    $port = $config['port'];    //端口号
    if(!$mysqli = new mysqli($host, $username, $password, $database, $port))
    	/* 连接数据库*/ 
    {
    	die ('连接数据库失败！！');
    }

	$username = $_POST['username'];
	$password = $_POST['password'];
	$code = $_POST['captcha'];

	if(!checkCode($code)){
		header("Refresh:1;url=../index.html");
		die('验证码错误');
	}



	$sql = "select password from user where user_id = '{$username}'";
	$result = $mysqli->query($sql);
	if($result){
		$realPassword =  $result->fetch_row()[0];//将结果集的第一行输出;

	}else{
		header("Refresh:0;url=../index.html");
		die ('账号不存在');
	}
    //echo $realPassword;
	if($realPassword==$password && $username=='admin'){
		echo "管理员登陆成功！！正在跳转......";
		header("Refresh:0;url=../web/index.html");
		$_SESSION['crm']['isAdmin'] = 'true';
		//echo $_SEESION['crm']['isAdmin'];
	}
	else if($realPassword == $password ){
		echo "登陆成功！！正在跳转......";
		 header("Refresh:0;url=../web/index.html");
		 $_SESSION['crm']['isAdmin'] = 'false';
	}
	else{
		echo "密码错误，重新输入！！";
		header("Refresh:0;url=../index.html");
	}


	 
	function checkCode($code){
		$captcha = $_SESSION['crm']['captcha'];
		if(!empty($captcha)){
			unset($_SESSION['crm']['captcha']);
			return strtoupper($captcha) == strtoupper($code);
		}
		return false;
	}

	 ?>
</body>
</html>