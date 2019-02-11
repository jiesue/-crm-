-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: 2018-07-18 14:55:50
-- 服务器版本： 5.6.17
-- PHP Version: 5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `jie`
--

-- --------------------------------------------------------

--
-- 表的结构 `account`
--

CREATE TABLE IF NOT EXISTS `account` (
  `account_id` varchar(10) NOT NULL COMMENT '收支编号',
  `name` varchar(10) NOT NULL COMMENT '客户名称',
  `business` varchar(20) NOT NULL COMMENT '业务名称',
  `num` int(10) DEFAULT NULL COMMENT '数量',
  `operator` varchar(10) NOT NULL COMMENT '收支人',
  `amount` int(10) NOT NULL COMMENT '收支金额',
  `status` varchar(10) NOT NULL COMMENT '收支状态',
  `time` date DEFAULT NULL COMMENT '收支时间',
  PRIMARY KEY (`account_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 转存表中的数据 `account`
--

INSERT INTO `account` (`account_id`, `name`, `business`, `num`, `operator`, `amount`, `status`, `time`) VALUES
('1', '岭南师院', '信息系统', 1, '钟杰', 10000, '已收款', '2018-07-18');

-- --------------------------------------------------------

--
-- 表的结构 `customer`
--

CREATE TABLE IF NOT EXISTS `customer` (
  `customer_id` varchar(20) NOT NULL,
  `name` varchar(10) NOT NULL,
  `sex` varchar(4) NOT NULL,
  `tel` varchar(20) NOT NULL,
  `email` varchar(20) NOT NULL,
  `addr` varchar(50) NOT NULL,
  `status` varchar(10) NOT NULL,
  `level` tinyint(4) NOT NULL,
  PRIMARY KEY (`customer_id`),
  UNIQUE KEY `customer_id` (`customer_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 转存表中的数据 `customer`
--

INSERT INTO `customer` (`customer_id`, `name`, `sex`, `tel`, `email`, `addr`, `status`, `level`) VALUES
('KH001', '客户1', '男', '10086', '10086@qq.com', '广东湛江', '忠诚', 1),
('KH002', '客户2', '男', '10010', '10010@139.com', '广东', '一般', 2);

-- --------------------------------------------------------

--
-- 表的结构 `emp`
--

CREATE TABLE IF NOT EXISTS `emp` (
  `emp_id` varchar(20) NOT NULL,
  `name` varchar(10) NOT NULL,
  `sex` varchar(4) NOT NULL,
  `tel` varchar(20) NOT NULL,
  `email` varchar(20) NOT NULL,
  `dept` varchar(10) NOT NULL,
  `job` varchar(10) NOT NULL,
  PRIMARY KEY (`emp_id`),
  UNIQUE KEY `emp_id` (`emp_id`),
  KEY `emp_id_2` (`emp_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 转存表中的数据 `emp`
--

INSERT INTO `emp` (`emp_id`, `name`, `sex`, `tel`, `email`, `dept`, `job`) VALUES
('CC001', '钟桀桀', '男', '13800000000', '934164066@qq.com', '图书馆部', '偷书的'),
('CC002', '介个', '男', '10000', '1000@126.com', '仓储部', '职工'),
('CC003', '员工3', '女', '1380000', 'asdsdfsd@111', '仓储', '职工'),
('XS001', '钟某某', '男', '13900000000', '934164066@qq.com', '人事部', '扫地的'),
('ZYJ001', 'Jie', '男', '138000000', '9544444@qq.com', 'office', '1236');

-- --------------------------------------------------------

--
-- 表的结构 `feedback`
--

CREATE TABLE IF NOT EXISTS `feedback` (
  `feedback_id` varchar(10) NOT NULL,
  `customer_id` varchar(20) DEFAULT NULL,
  `name` varchar(10) DEFAULT NULL COMMENT '反馈人名',
  `type` varchar(10) NOT NULL,
  `content` text NOT NULL,
  `tel` varchar(20) DEFAULT NULL,
  `time` date NOT NULL,
  `emp_id` varchar(20) DEFAULT NULL COMMENT '跟进人ID',
  `product_name` varchar(10) NOT NULL,
  PRIMARY KEY (`feedback_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 转存表中的数据 `feedback`
--

INSERT INTO `feedback` (`feedback_id`, `customer_id`, `name`, `type`, `content`, `tel`, `time`, `emp_id`, `product_name`) VALUES
('1', 'KH002', '客户2', '售后', '问题2', '10000', '2018-01-01', 'CC002', '产品2'),
('2', 'KH001', '客户1', '售后', '问题1', '10089', '2018-01-02', 'CC001', '产品2'),
('3', 'KH001', '客户1', '服务', '服务问题', '', '2018-02-03', 'ZYJ001', '产品2'),
('4', 'KH002', '客户2', '售后', '问题1111', '111', '2018-02-05', 'CC003', '产品1');

-- --------------------------------------------------------

--
-- 表的结构 `go`
--

CREATE TABLE IF NOT EXISTS `go` (
  `go_id` int(12) NOT NULL AUTO_INCREMENT,
  `applicant` varchar(10) NOT NULL,
  `emp_id` varchar(20) NOT NULL,
  `dept` varchar(20) DEFAULT NULL,
  `type` varchar(10) DEFAULT NULL,
  `s_time` date NOT NULL,
  `e_time` date NOT NULL,
  `detail` text,
  PRIMARY KEY (`go_id`),
  UNIQUE KEY `ID` (`go_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8mb4 AUTO_INCREMENT=4 ;

--
-- 转存表中的数据 `go`
--

INSERT INTO `go` (`go_id`, `applicant`, `emp_id`, `dept`, `type`, `s_time`, `e_time`, `detail`) VALUES
(1, '钟永杰', '001', '办公室', '外出', '2018-07-11', '2018-07-25', '12333333333觉得覅文件覅绝地反击是'),
(2, 'jiejie', 'JL001', '办公室', '请假', '2018-07-19', '2018-07-31', '几级啊手动阀好卡还是的感觉卡萨丁韩国进口大概啥时的健康干撒帝国皇家卡森的韩国卡萨丁和公交卡是德国海军卡是德国就卡是德国和阿克苏降低功耗就卡是德国和卡死的工行卡是德国哈就卡是德国和就卡是德国哈就卡是德国和就卡是德国哈斯号都是高科技和安静看书ask的价格和ask的机会静安寺'),
(3, 'adminjie', '10026', '经理办公室', '恩爱出', '2018-06-01', '2018-07-06', '及金额上的封杀的看法啥的科技孵化');

-- --------------------------------------------------------

--
-- 表的结构 `message`
--

CREATE TABLE IF NOT EXISTS `message` (
  `message_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `sender` varchar(10) NOT NULL,
  `receiver` varchar(10) NOT NULL,
  `send_time` date NOT NULL,
  `content` text NOT NULL,
  PRIMARY KEY (`message_id`),
  UNIQUE KEY `message_id` (`message_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `my_task`
--

CREATE TABLE IF NOT EXISTS `my_task` (
  `task_id` int(10) NOT NULL,
  `title` varchar(20) NOT NULL,
  `deadline` date NOT NULL,
  `sender` varchar(10) NOT NULL,
  `reciever` varchar(10) NOT NULL,
  `status` varchar(10) NOT NULL,
  `send_date` date NOT NULL,
  PRIMARY KEY (`task_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- 表的结构 `note`
--

CREATE TABLE IF NOT EXISTS `note` (
  `note_id` int(10) NOT NULL AUTO_INCREMENT,
  `emp_id` varchar(20) DEFAULT NULL,
  `title` varchar(20) NOT NULL,
  `content` text NOT NULL,
  `add_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`note_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `notification`
--

CREATE TABLE IF NOT EXISTS `notification` (
  `notification_id` varchar(10) NOT NULL,
  `publisher` varchar(20) NOT NULL,
  `title` varchar(20) NOT NULL,
  `content` text NOT NULL,
  PRIMARY KEY (`notification_id`),
  UNIQUE KEY `notification_id` (`notification_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 转存表中的数据 `notification`
--

INSERT INTO `notification` (`notification_id`, `publisher`, `title`, `content`) VALUES
('1', 'ZYJ366666', '系统开通了', '系统开通了系统开通了系1'),
('2', 'ZYJ001', '2啊啊啊啊啊啊啊', '22222222222222222222222'),
('3', 'CC001', '有人偷书了', '各部门请注意！');

-- --------------------------------------------------------

--
-- 表的结构 `product`
--

CREATE TABLE IF NOT EXISTS `product` (
  `product_id` varchar(20) NOT NULL,
  `name` varchar(10) NOT NULL,
  `price` float NOT NULL,
  `num` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='产品信息';

--
-- 转存表中的数据 `product`
--

INSERT INTO `product` (`product_id`, `name`, `price`, `num`) VALUES
('CP001', '产品一', 10, 10),
('CP002', '产品二', 12, 32);

-- --------------------------------------------------------

--
-- 表的结构 `purchas_plan`
--

CREATE TABLE IF NOT EXISTS `purchas_plan` (
  `plan_id` varchar(10) NOT NULL COMMENT '计划编号',
  `plan_name` varchar(10) NOT NULL COMMENT '计划名称',
  `degree` varchar(10) NOT NULL COMMENT '关系程度',
  `operator` varchar(10) NOT NULL COMMENT '执行人',
  `status` varchar(10) NOT NULL COMMENT '执行状态',
  `s_time` date NOT NULL COMMENT '执行时间',
  `deadline` date NOT NULL COMMENT '截至时间',
  `remarks` text NOT NULL COMMENT '计划备注',
  PRIMARY KEY (`plan_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 转存表中的数据 `purchas_plan`
--

INSERT INTO `purchas_plan` (`plan_id`, `plan_name`, `degree`, `operator`, `status`, `s_time`, `deadline`, `remarks`) VALUES
('1', '系统', '紧急', '钟永杰1', '还没', '2018-07-01', '2018-07-10', '131415926'),
('456', '786', '746', '桀桀', '7', '2008-11-11', '2009-11-11', '1111111111111111111111111'),
('576', '跌丝袜', '好', 'ZYJ', '完成', '2008-10-10', '2008-11-11', '4');

-- --------------------------------------------------------

--
-- 表的结构 `relation`
--

CREATE TABLE IF NOT EXISTS `relation` (
  `relation_id` varchar(10) NOT NULL,
  `customer_id` varchar(20) NOT NULL,
  `name` varchar(10) NOT NULL,
  `emp_id` varchar(20) NOT NULL,
  `degree` varchar(10) NOT NULL,
  `last_time` date NOT NULL,
  PRIMARY KEY (`relation_id`),
  UNIQUE KEY `customer_id` (`customer_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 转存表中的数据 `relation`
--

INSERT INTO `relation` (`relation_id`, `customer_id`, `name`, `emp_id`, `degree`, `last_time`) VALUES
('1', 'KH001', '客户1', 'BG001', '一般', '2018-07-01'),
('2', 'KH002', '客户2', 'CC001', '一般', '2018-07-07');

-- --------------------------------------------------------

--
-- 表的结构 `sale`
--

CREATE TABLE IF NOT EXISTS `sale` (
  `sale_id` varchar(10) NOT NULL,
  `customer_id` varchar(10) NOT NULL,
  `name` varchar(10) NOT NULL COMMENT '客户名',
  `status` varchar(10) NOT NULL COMMENT '销售状太',
  `time` date NOT NULL COMMENT '销售时间',
  `total_price` float NOT NULL,
  `num` int(10) NOT NULL,
  `salesman` varchar(20) NOT NULL,
  PRIMARY KEY (`sale_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 转存表中的数据 `sale`
--

INSERT INTO `sale` (`sale_id`, `customer_id`, `name`, `status`, `time`, `total_price`, `num`, `salesman`) VALUES
('1', 'KH20081212', '钟打野', '卖不出去22', '2018-07-03', 18.5, 16, 'ZYJ123456');

-- --------------------------------------------------------

--
-- 表的结构 `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `user_id` varchar(20) NOT NULL,
  `password` varchar(20) NOT NULL,
  `user_right` tinyint(4) NOT NULL COMMENT '权限等级',
  `emp_id` varchar(20) NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 转存表中的数据 `user`
--

INSERT INTO `user` (`user_id`, `password`, `user_right`, `emp_id`) VALUES
('0001', '0001', 2, 'ZYJ001'),
('0002', '0002', 2, ''),
('admin', '0000', 1, '0');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
