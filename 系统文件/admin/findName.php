
	
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


$id = $_POST['id'];
//$id="CC001";

$sql = "select name from emp where emp_id = '{$id}'";


	$result = $mysqli->query($sql);
	if($result){
		$name =  $result->fetch_row()[0];//将结果集的第一行输出;
		$name =trim($name);
		echo $name;

	}else{
		header("Refresh:0;url=../index.html");
		die ('账号不存在');
	}

 ?>

