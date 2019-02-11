<?php
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
  public function select($table, $field = null, $where = null)
  {
    $sql = "SELECT * FROM {$table}";
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
    $sql = "INSERT INTO {$table}( {$keys} )VALUES( {$values} )";
    $this->mysqli->query($sql);
    return $this->mysqli->insert_id;
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
    $this->mysqli->query($sql);
    return $this->mysqli->affected_rows;
  }
}



// 使用方法：
// 
// 
// 
// 


<?php
require_once 'mysql.class.php';
/* 配置连接参数 */
$config = array(
  'type' => 'mysql',
  'host' => 'localhost',
  'username' => 'woider',
  'password' => '3243',
  'database' => 'php',
  'port' => '3306'
);
/* 连接数据库 */
$mysql = new mysql();
$mysql->connect($config);
/* 查询数据 */
//1、查询所有数据
$table = 'mysqli';//数据表
$num = $mysql->select($table);
echo '共查询到' . $num . '条数据';
print_r($mysql->fetchAll());
//2、查询部分数据
$field = array('username', 'password'); //过滤字段
$where = 'id % 2 =0';          //过滤条件
$mysql->select($table, $field, $where);
print_r($mysql->fetchAll());
/* 插入数据 */
$table = 'mysqli';//数据表
$data = array(  //数据数组
  'username' => 'admin',
  'password' => sha1('admin')
);
$id = $mysql->insert($table, $data);
echo '插入记录的ID为' . $id;
/* 修改数据 */
$table = 'mysqli';//数据表
$data = array(
  'password' => sha1('nimda')
);
$where = 'id = 44';
$rows = $mysql->update($table, $data, $where);
echo '受影响的记录数量为' . $rows . '条';
/* 删除数据 */
$table = 'mysqli';
$where = 'id = 45';
$rows = $mysql->delete($table, $where);
echo '已删除' . $rows . '条数据';
 
