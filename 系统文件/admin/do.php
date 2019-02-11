<?php 
//数据库操作工具函数类-------------------------------------------------------------------------------------------
session_start();
class mysql
{
  private $mysqli;
  private $result;
  /**
   * 数据库连接
   * @param $config 配置数组
   */
  public function connect($config)
  {
    $host = $config['host'];    //主机地址
    $username = $config['username'];//用户名
    $password = $config['password'];//密码
    $database = $config['database'];//数据库
    $port = $config['port'];    //端口号
    $this->mysqli = new mysqli($host, $username, $password, $database, $port);
  }
  /**
   * 数据查询
   * @param $table 数据表
   * @param null $field 字段
   * @param null $where 条件
   * @return mixed 查询结果数目
   */
   public function notice($table,$where){
   		
   }
  
  public function search($table,$where)
  {
  	GLOBAL $secName;
  	$len =count($secName[$table])-1;
  	$num = 0; 
  	$target = '';
  	foreach ($secName[$table] as $key => $value) {
  		if($num===$len){
  			$target .= "{$key} as {$value} ";
  		}
  		else{
  			$target .= " {$key} as {$value},";
  		}
  		$num++;
  	}
  	
    $sql = "SELECT {$target} FROM {$table} WHERE $where";
   // $GLOBALS['returnData'] = $sql;
  	$this->result = $this->mysqli->query($sql);
    return $this->result->num_rows;
  }


  public function select($table, $field = null, $where = null)
  {
  	GLOBAL $secName;
  	$len =count($secName[$table])-1;
  	$num = 0; 
  	$target = '';
  	foreach ($secName[$table] as $key => $value) {
  		if($num===$len){
  			$target .= "{$key} as {$value} ";
  		}
  		else{
  			$target .= " {$key} as {$value},";
  		}
  		$num++;
  	}


    $sql = "SELECT {$target} FROM {$table}";
      	//echo $sql;

    if (!empty($field)) {
      $field = '`' . implode('`,`', $field) . '`';
      $sql = str_replace('*', $field, $sql);
    }
    if (!empty($where)) {
      $sql = $sql . ' WHERE ' . $where;
    }
    $this->result = $this->mysqli->query($sql);
    return $this->result->num_rows;
  }
  /**
   * @return mixed 获取全部结果
   */
  public function fetchAll()
  {
    return $this->result->fetch_all(MYSQLI_ASSOC);
  }
  /**
   * 插入数据
   * @param $table 数据表
   * @param $data 数据数组
   * @return mixed 插入ID
   */
  public function insert($table, $data)
  {
    foreach ($data as $key => $value) {
      $data[$key] = $this->mysqli->real_escape_string($value);
    }
    $keys = '`' . implode('`,`', array_keys($data)) . '`';
    $values = '\'' . implode("','", array_values($data)) . '\'';
    //$sql = "INSERT INTO {$table}( {$keys} )VALUES( {$values} )";
    $sql = "INSERT INTO {$table} VALUES( {$values} )";

   // $GLOBALS['returnData']= $sql;
    // $this->mysqli->query($sql);
    // return $this->mysqli->insert_id;


    if (!$this->mysqli->query($sql))
	{
 		die('Error ');
	}
	else {
		return 1;
	}

  }
  /**
   * 更新数据
   * @param $table 数据表
   * @param $data 数据数组
   * @param $where 过滤条件
   * @return mixed 受影响记录
   */
  public function update($table, $data, $where)
  {
    foreach ($data as $key => $value) {
      $data[$key] = $this->mysqli->real_escape_string($value);
    }
    $sets = array();
    foreach ($data as $key => $value) {
      $kstr = '`' . $key . '`';
      $vstr = '\'' . $value . '\'';
      array_push($sets, $kstr . '=' . $vstr);
    }
    $kav = implode(',', $sets);
    $sql = "UPDATE {$table} SET {$kav} WHERE {$where}";

    //$GLOBALS['returnData']=$sql;

    $this->mysqli->query($sql);
    return $this->mysqli->affected_rows;
  }
  /**
   * 删除数据
   * @param $table 数据表
   * @param $where 过滤条件
   * @return mixed 受影响记录
   */
  
  public function delete($table, $where)
  {
    $sql = "DELETE FROM {$table} WHERE {$where}";

    //$GLOBALS['returnData'] = $sql;

    $this->mysqli->query($sql);
    return $this->mysqli->affected_rows;
  }

}



/* 配置连接参数 */
$config = array(
  'type' => 'mysql',
  'host' => 'localhost',
  'username' => 'root',
  'password' => '',
  'database' => 'jie',
  'port' => '3306'
);
/* 连接数据库 */
$mysql = new mysql();
$mysql->connect($config);

//数据表别名
$secName = array(
	'emp' => array('emp_id'=>'员工ID','name'=>'员工姓名','sex'=>'性别','tel'=>'电话','email'=>'邮箱','dept'=>'部门','job'=>'职位'),

	'notification' => array('notification_id' => '通知ID', 'publisher' => '发布者', 'title' => '标题', 'content' => '通知内容'),

	'customer' => array('customer_id' => '客户ID' , 'name' => '客户名称' ,'sex' => '性别' ,'tel' => '电话' ,'email' => '邮箱' ,'addr' => '住址' ,'status' => '客户状态' ,'level' => '等级' ),

	'relation' => array( 'relation_id' => '关系ID', 'customer_id' => '客户ID', 'name' => '客户名称', 'emp_id' => '负责人ID', 'degree' => '关系程度', 'last_time' => '上次跟进时间'),

	'feedback' => array( 'feedback_id' => '反馈ID', 'customer_id' => '反馈人ID', 'name' => '反馈人', 'type' => '反馈类型', 'content' => '反馈内容', 'tel' => '联系方式', 'time' => '反馈时间', 'emp_id' => '跟进人ID','product_name'=>'产品名称'),

	'sale' => array( 'sale_id' => '销售ID', 'customer_id' => '客户ID', 'name' => '客户姓名', 'status' => '销售状态', 'time' => '成交时间', 'total_price' => '总价', 'num' => '销售数量', 'salesman' => '销售员'),

	'purchas_plan' => array( 'plan_id' => '计划ID', 'plan_name' => '计划名称', 'degree' => '关系程度', 'operator' => '执行者', 'status' => '执行状态', 's_time' => '开始时间', 'deadline' => '截至时间', 'remarks' => '备注'),

	'account' => array( 'account_id' => '收支编号', 'name' => '客户名称', 'business' => '业务名称', 'num' => '数量', 'operator' => '收支人', 'amount' => '金额', 'status' => '收支状态','time' => '收支时间' ),

	'user' => array('user_id' => '账号', 'password' => '密码', 'user_right' => '权限等级' ,'emp_id' => '员工ID'),

	'product' => array('product_id' => '产品ID','name' => '产品名称','price' => '产品价格','num' => '库存量' )	
);

//表格id对应的数据库表名
$tableName = array(
	'tab_1' =>'emp' , 
	'tab_2' => 'notification' , 
	'tab_3' => 'customer',
	'tab_4' => 'relation',
	'tab_5' => 'feedback',
	'tab_6' => 'sale',
	'tab_7' => 'purchas_plan',
	'tab_8' => 'account',
	'tab_9' => 'user',
	'tab_10' => 'product'
);



$id = $_POST['id'];
$type = $_POST['type'];
$where = $_POST['where'];
$data =  $_POST['data'];

if($id=='tab_9'){
	if($_SESSION['crm']['isAdmin']==='false'){
		die("noRight");
	}
}
	


//定义函数--------------------------------------------
function handle($id,$type,$where,$data){

	if($data){
		$data = json_decode($data,true);
	}

	$GLOBALS['returnData'] = '';

		/* 查询数据 */
	function select($id){
		
		GLOBAL $tableName;
		GLOBAL $mysql;
		$table = $tableName[$id];//数据表
		$num = $mysql->select($table);//fanhui查询到的数据数量
		$data = $mysql->fetchAll();
		$GLOBALS['returnData'] = json_encode($data,JSON_UNESCAPED_UNICODE);
		//echo $table;
	};
	function insert($id,$data){	
		GLOBAL $tableName;
		GLOBAL $mysql;
		$table = $tableName[$id];//需要插入的数据表

		$num = $mysql->insert($table, $data);
		$GLOBALS['returnData'] =  '插入'. $num .'条记录';
     //$GLOBALS['returnData'] =  $mysql;
	}

	function delete($id,$where){

		GLOBAL $tableName;
		GLOBAL $mysql;
		GLOBAL $secName;
		$table = $tableName[$id];//需要插入的数据表

        
		
		foreach($secName[$table] as $key=>$val)
		{
    		$firstKey = $key;
    		break;
		};

		$targetColumn = $firstKey;
		$where =$targetColumn ."='". $where."'";
		/* 删除数据 */
		// $table = '';
		// $where = 'go_id = 4';
		 $rows = $mysql->delete($table, $where);
		 $GLOBALS['returnData'] ='已删除' . $rows . '条数据';		
	}

	function idSearch($id,$where){

		GLOBAL $tableName;
		GLOBAL $mysql;
		GLOBAL $secName;
		$table = $tableName[$id];//需要插入的数据表
		
		foreach($secName[$table] as $key=>$val)
		{
    		$firstKey = $key;
    		break;
		};

		$targetColumn = $firstKey;
		$where =$targetColumn ."='". $where."'";

		$data = $mysql->search($table, $where);
		$data = $mysql->fetchAll();
		$GLOBALS['returnData'] = json_encode($data,JSON_UNESCAPED_UNICODE);	

	}
	function search($id,$where){

		GLOBAL $tableName;
		GLOBAL $mysql;
		GLOBAL $secName;
		$table = $tableName[$id];//需要数据表
		$data = $mysql->search($table, $where);
		$data = $mysql->fetchAll();
		$GLOBALS['returnData'] = json_encode($data,JSON_UNESCAPED_UNICODE);	

	}
	function update($id,$data){
		GLOBAL $tableName;
		GLOBAL $mysql;
		GLOBAL $secName;
		$table = $tableName[$id];//需要插入的数据表
		//$secName[$table]
		$dataArr = array();
		$where = '';
		$mynum = 0;
		foreach ($secName[$table] as $key => $value) {
	
			if($mynum == 0){
				$where = " {$key} = '{$data[$mynum]}' ";
				//$GLOBALS['returnData'] = $where;
			}else{
				$dataArr[$key] = $data[$mynum];
			}
			
			$mynum++;
		}

		 if(!$mysql->update($table, $dataArr, $where))
		 {
		 	die('修改失败或数据没有改变');
		 }
		$GLOBALS['returnData']='修改成功';
		//$GLOBALS['returnData']=var_dump($dataArr);
		
	}
	switch ($type) {
		case 'select':
			select($id);
			break;
		case 'search':
			search($id,$where);
			break;
		case 'idSearch':
			idSearch($id,$where);
			break;
		case 'insert':
			insert($id,$data);
			break;
		case 'delete':
			delete($id,$where);
			break;
		case 'update':
			update($id,$data);
			break;
		case 'update':
			notice($id);
			break;
		
		default:
			# code...
			break;
	}
	return $GLOBALS['returnData'];
}

echo handle($id,$type,$where,$data);


 ?>