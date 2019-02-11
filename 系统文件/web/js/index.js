/**
 * js
 */

$(function(){
// 定义数据，变量区域
/*var nav_data = {
	'个人办公':['去向申请','我的消息','个人信息','我的任务','通知管理','记事本'],
	'客户管理':['客户信息管理'],
	'服务管理':['客户关系管理','客户反馈管理'],
	'营销管理':['营销信息管理','营销计划管理'],
	'财务管理':['收入管理','支出管理'],
	'系统管理':['用户信息管理','用户密码管理','登陆记录','注销登陆']
}*/


var nav_data = {
	'个人办公':['员工信息管理','通知管理'],
	'客户管理':['客户信息管理'],
	'服务管理':['客户关系管理','客户反馈管理'],
	'营销管理':['营销信息管理','采购计划管理'],
	'财务管理':['收支管理'],
	'系统管理':['用户信息管理'],
	'产品管理':['产品信息管理']
}
var mycaption = nav_data['服务管理'][1].replace(/管理/,'表');
var aNow_tab_data;

// var fistName = {
// 	tab_1:{
// 		'员工ID':'emp_id',
// 		'员工姓名':'name',
// 		'性别':'sex',
// 		'邮箱':'email',
// 		'部门':'dept',


// 	},


// };

//两者要随时同步位置一一对应
var top_tab_item = ['我的主页'];
var top_tab_id = ['tab_0'];

var noticeCon={};//储存前几条通知的内容‘3’;
var noticeTitle=[];

var last_tab_active = '';
var now_tab_active = 'tab_0';
var currentId='tab_0';
var sJson = '';
//var tableHtml='';
//
var iconHtml =`
					<td class="myreplace" style="width:45px ;text-align:center"><span class="btn btn-success btn-xs glyphicon  glyphicon-search" data-toggle="modal" data-target="#myModal"></span></td>
					<td style="width:45px ;text-align:center"><span class="btn btn-warning btn-xs glyphicon  glyphicon-pencil" data-toggle="modal" data-target="#myModal"></span></td>
					<td style="width:45px ;text-align:center"><span class="btn btn-danger btn-xs glyphicon  glyphicon-trash"></span></td>
				</tr>`;

//这两变量每次使用前清空并调用函数赋值
var aTable_title=[];
//var aTable_data =[];

var aTable_title_all = {};

function findIndex(obj,ele){
	var index;
	$.each(obj,function(i,el){
		if(ele==el) index = i;
	});
	return index;
}
//获取表格数据的函数========================================================
// function getNoticeTitle(){
// 	$.ajax({
// 		url: '../admin/do.php',
// 		type: 'post',
// 		data: {'id':'tab_2','type':'notice','where':'','data':''},
// 		success:function(data){

// 		}
// }

//获取name函数========================================================


//获取表格数据的函数========================================================
function getTabData(sId,where)
{
	var type = 'select';
	if(!where)
	{
		where='';
	}
	else{//有where参数，那么就是搜索类型的了
		if(where.indexOf('=')==-1)
		{
			type='idSearch';

		}else{
			type='search';
		}
		

		//alert('search')
	}
	//获取数据代码
	$.ajax({
		url: '../admin/do.php',
		type: 'post',
		data: {'id': sId,'type':type,'where':where,'data':''},
		success:function(data){
			if(data=='[]')
			{
				alert('返回结果为空,请检查输入的ID是否正确');
				return;
			}
			else if(data=='noRight')
			{
				$("#"+sId+" tbody").html('你无权访问本表');
				return;
			}
			console.log(data);
			var data  = JSON.parse(data);
			aNow_tab_data = data;
			//console.log(data);
			if(sId == 'tab_2')//把通知的标题+内容前三条（如果有的话）存起来
			{
				noticeCon = {};
				$.each(data,function(index, el) {
					if(index==3){ return false }
					noticeCon[data[index]['标题']] = data[index]['通知内容'];
				});
				showNotice();//用于xianshi通知内容

				//console.log(noticeCon)
			}
			var title_html='';
			var data_html = '';
			aTable_title =[];

			//获取表格标题
			
				$.each(data[0],function(i, el) {
					aTable_title.push(i);
					title_html += `<td>${i}</td>`;
				});
				aTable_title_all[sId]=aTable_title;
				console.log(aTable_title_all)

			
			title_html +='<td>详细</td><td>编辑</td><td>删除</td>';
			//获取表格内容data
			
			$.each(data,function(i, el) {
				data_html+='<tr>';
				$.each(el,function(j, el1) {
					data_html+=`<td>${el1}</td>`;
				});
				data_html+=iconHtml;
			});
			
			console.log(data.length);
			//console.log(data_html);
		$("#"+sId+" thead tr").html(title_html);
		$("#"+sId+" tbody").html(data_html);
		}
	})
}

//插入新数据的函数=========================================================
function insertData(sId,data){
	$.ajax({
		url: '../admin/do.php',
		type: 'post',
		data: {'id': sId,'type':'insert','where':'','data':data},
		success:function(data){

			alert(data);
			getTabData(currentId);//更新数据
			// if(){
			//    alert('插入成功！！')

			// }
		}
	});
}
//删除数据的函数=========================================================
function deleteData(sId,where){
	$.ajax({
		url: '../admin/do.php',
		type: 'post',
		data: {'id': sId,'type':'delete','where':where,'data':''},
		success:function(data){

			alert(data);
			getTabData(now_tab_active);//更新数据

			// if(){
			//    alert('插入成功！！')

			// }
		}
	});
}
//update数据的函数=========================================================
function updateData(sId,data){
	$.ajax({
		url: '../admin/do.php',
		type: 'post',
		data: {'id': sId,'type':'update','where':'','data':data},
		success:function(data){

			alert(data);
			getTabData(now_tab_active);//更新数据

			// if(){
			//    alert('插入成功！！')

			// }
		}
	});
}


function createTabCon(){
	var html_tabCon = '';
	
	var id_num = 1;
	$.each(nav_data,function(i,el){
		var html_li ='';
		$.each(this,function(j, el) {


			var caption = el.replace(/管理/,'表');


			// tab表格数据生成
			if(id_num==5){

				html_tabCon +=`
				<div class="container-fluid" id="tab_${id_num}" style = 'display:none'>
					<div class="   col-xs-12 ">
						<div class="panel panel-success">
							<div class="panel-heading">
						    	<h3 class="panel-title pull-left">
						    	${el}</h3>
								<input type="text" placeholder='请输入查找ID' class="pull-left searchInput" style = 'height:22px;margin-left:15px'/>
								<button class='btn btn-xs pull-left searchBtn' style = 'height:22px;margin-left:15px'>搜索</button>
								<p style="display:inline-block;background:#E0E0E0FF;margin-left:30px">
									<input type="text" placeholder='年份' class="pull-left filterY" style = 'height:22px;margin-left:15px;width:35px'/>
									<input type="text" placeholder='月份' class="pull-left filterM" style = 'height:22px;margin-left:15px;width:35px'/>
									<button class='btn btn-xs pull-left filterBtn' style = 'height:22px;margin-left:15px'>筛选</button>
								</p>
							    <button class="add btn btn-xs btn-success pull-right" data-toggle="modal" data-target="#myModal" id="tab_${id_num}_add">
							    		<span class="glyphicon glyphicon-plus"></span>
							    	新增
						    	</button>
						    	
						    	 <button class="refresh btn btn-xs btn-success pull-right">
							    		<span class="glyphicon glyphicon-repeat"></span>
							    	重新载入
						    	</button>
						    	<a class='btn btn-xs  btn-success  pull-right output' style = 'height:22px;margin-left:15px;margin-right:5px'>导出表格</a>

						  	</div>
							<div class="panel-body">

							    <table class="table table-bordered table-resposive table-hover">
							     <caption class="text-center">${caption}</caption>
							    	<thead>
							    		<tr>
							    			
							    		</tr>
							    	</thead>
							    	<tbody class="table-striped ">
							    							    
							    	</tbody>
							    </table>
							</div>
						</div>
					</div>
				</div>
			`;

			}else{

				html_tabCon +=`
				<div class="container-fluid" id="tab_${id_num}" style = 'display:none'>
					<div class="   col-xs-12 ">
						<div class="panel panel-success">
							<div class="panel-heading">
						    	<h3 class="panel-title pull-left">
						    	${el}</h3>
								<input type="text" placeholder='请输入查找ID' class="pull-left searchInput" style = 'height:22px;margin-left:15px'/>
								<button class='btn btn-xs pull-left searchBtn' style = 'height:22px;margin-left:15px'>搜索</button>

					

							    <button class="add btn btn-xs btn-success pull-right" data-toggle="modal" data-target="#myModal" id="tab_${id_num}_add">
							    		<span class="glyphicon glyphicon-plus"></span>
							    	新增
						    	</button>
						    	
						    	 <button class="refresh btn btn-xs btn-success pull-right">
							    		<span class="glyphicon glyphicon-repeat"></span>
							    	重新载入
						    	</button>
						    	<a class='btn btn-xs  btn-success  pull-right output' style = 'height:22px;margin-left:15px;margin-right:5px'>导出表格</a>

						  	</div>
							<div class="panel-body">

							    <table class="table table-bordered table-resposive table-hover">
							     <caption class="text-center">${caption}</caption>
							    	<thead>
							    		<tr>
							    			
							    		</tr>
							    	</thead>
							    	<tbody class="table-striped ">
							    							    
							    	</tbody>
							    </table>
							</div>
						</div>
					</div>
				</div>
			`;

			}
	


			id_num++;
		});	

	})
	var html_tabCon = $('.content .tab-content').html()+html_tabCon;
	$('.content .tab-content').html(html_tabCon);//生成TabCon并插入
}
function createNav(){//生成nav并插入
	var html_nav = '';
	var id_num = 1;
	$.each(nav_data,function(i,el){
		// console.log(el);
		html_nav += `
					<li class="list-group-item  text-center">
						${i}
						<span class="glyphicon glyphicon-triangle-right"></span> 
						<ul class="list-group">
							{i}
						</ul>
					</li>
				`;
		var html_li ='';
		$.each(this,function(j, el) {		
			html_li += `
             <li class="list-group-item  text-center">
             <a href="javascript:" data-id="tab_${id_num}" >${el}</a>
             </li>
			`;		
			id_num++;
		});	

		html_nav = html_nav.replace(/{i}/,html_li);
	})
	$('#main .nav .nav-first').html(html_nav);
}

function createTab(){
	console.log('createTab')
	var html = '';
	var target = $('.content .top');
	if(top_tab_item.length ===1){
		html = `<div class="tab active">
					<span class="glyphicon  glyphicon-home "></span>
					我的主页
				</div>`
	}
	else{

		$.each(top_tab_item,function(i, el) {
			if(i===0){
				html +=`<div class="tab" data-id="tab_0">
					<span class="glyphicon  glyphicon-home "></span>
					我的主页
				</div>`;
			}
			else{
				html +=`<div class="tab" data-text='${el}'  data-id="${top_tab_id[i]}">
				
					${el}
					<span class="glyphicon glyphicon-remove"></span>
				</div>`;
			}		
		});	
	}
	target.html(html);
	console.log(top_tab_id)

}
//定义显示主页通知函数-------------------------------------------
function showNotice(){
	noticeTitle=[];
	var html='';
	$.each(noticeCon,function(index, el){
		noticeTitle.unshift(index);
	});
	$.each(noticeTitle,function(index, el) {	
		html+=`<li><span class="glyphicon glyphicon-bullhorn">
		</span><a href='javascript:' data-toggle="modal" data-target="#myModal">${el}</a></li>`;

	});
	$('#noticeTitle').html(html);
	//alert(html)
}

function init(){
	createNav();//生成nav代码，以及tab对应的表div 并插入
	createTabCon();
	getTabData('tab_2')//用于获取通知内容
	createTab();//生成TAB代码  并插入
	//getTabData('tab_1');
}

init();







// 事件绑定区域///////////////////////////////////////////////////











////绑定点击输出表格=================================================
$('.tab-content .panel-heading a.output').on('click', function(event) {
	var oTable = $(this).parent().parent().find('.panel-body table.table').get(0);
	var outerHTML= oTable.outerHTML;
	outerHTML = outerHTML.replace(/<td>详细<\/td><td>编辑<\/td><td>删除<\/td>/,'');//去除多余的列
	var re =new RegExp(iconHtml,"gi");
	outerHTML = outerHTML.replace(re,'');
	outerHTML = outerHTML.replace(/class=".*"/gi,'');
	outerHTML = outerHTML.replace(/\s*/gi,'');
	//var myreplace = outerHTML.search(re);
	//alert(outerHTML);
	 var html = "<html><head><meta charset='utf-8' /></head><body>" +outerHTML + "</body></html>";

	 if(now_tab_active=='tab_5'){
			var caption = html.match(/<caption>(\S*)<\/caption>/)[1];
			//alert(caption)
		 	html="<table> <caption>"+caption+"</caption><thead>";
		 	$.each(aNow_tab_data,function(index, el) {

				$.ajax({
					url: '../admin/findName.php',
					type: 'post',
					async:false,
					data: {'id':aNow_tab_data[index]['跟进人ID']},
					success:function(data){
					      aNow_tab_data[index]['跟进人ID'] = data.replace(/(^\s*)|(\s*$)/g,"");
					}
				})		

		 	});


		 	//获取表格标题
			
				$.each(aNow_tab_data[0],function(i, el) {
					html += `<td>${i}</td>`;
				});
				html+="</thead><tbody>";
			//获取表格内容data		
			$.each(aNow_tab_data,function(i, el) {
				html+='<tr>';
				$.each(el,function(j, el1) {
					html+=`<td>${el1}</td>`;
				});
				html+='</tr>';
			});
			html+="</tbody></table>";
			html = html.replace(/跟进人ID/g,"跟进人");

			alert(html);


	 }

        // 实例化一个Blob对象，其构造函数的第一个参数是包含文件内容的数组，第二个参数是包含文件类型属性的对象
        var blob = new Blob([html], { type: "application/vnd.ms-excel" });
        //var a = document.getElementsByTagName("a")[0];
        // 利用URL.createObjectURL()方法为a元素生成blob URL
        $(this).get(0).href = URL.createObjectURL(blob);
        // 设置文件名
       $(this).get(0).download = "表格.xls";
})



////绑定点击查找ID事件查找对应Id记录=================================================
$('.tab-content .panel-heading button.searchBtn').on('click', function(event) {
	var searchId = $(this).parent().find('input.searchInput').get(0).value;
	//alert('huoqu')
	getTabData(now_tab_active,searchId);//更新表格内容，带有where条件参数,即是获取对应id的那条内容
});

///绑定点击filter事件查找对应记录=================================================
$('.tab-content .panel-heading button.filterBtn').on('click', function(event) {
	var filterY = $(this).parent().find('input.filterY').get(0).value;
	var filterM = $(this).parent().find('input.filterM').get(0).value;
	var where ="year(time)='"+filterY+"' and month(time)='"+filterM+"'";
	//alert(where)

	//alert(filterM)
	getTabData(now_tab_active,where);//更新表格内容，带有where条件参数,即是获取对应id的那条内容

	var caption = $("#"+now_tab_active).find('caption');
	caption.text(mycaption+" "+filterY+"年"+filterM+"月")																											
});
////绑定点击刷新=================================================

$('.tab-content .panel-heading button.refresh').on('click', function(event) {
	if(now_tab_active=='tab_5'){
		var caption = $("#"+now_tab_active).find('caption');
		caption.text(mycaption);
	}
	getTabData(now_tab_active)//更新表格内容
});



//绑定button.add点击事件增加记录=================================================
$('.tab-content .panel-heading button.add').on('click',function(){

	addSubmit();//绑定一次性的事件
	currentId = $(this).attr('id').replace(/_add/,'');
	var html='';
	var target = $('#myModal .modal-body');

	$('#myModalLabel').html('增加记录界面');
	submitBtn.show();//显示提交按钮

	target.html('') ;//清空原有的内容
	$.each(aTable_title_all[currentId],function(index, el) {
		if(el.indexOf('内容')!==-1 || el.indexOf('备注')!==-1)
		{
			html += `
				<div class="input-group">
				<span class="input-group-addon">${el}</span>
				<textarea type="text" class="form-control" rows="5"></textarea>
				</div>
				<br>
			`;		
		}
		else if(el.indexOf('时间')!==-1){
				html += `
			<div class="input-group">
				<span class="input-group-addon">${el}</span>
				<input type="text" class="form-control" placeholder='格式 如：20180101' >
			</div>
			<br>
		`;	
		}
		else if(el.indexOf('等级')!==-1){
			html += `
			<div class="input-group">
				<span class="input-group-addon">${el}</span>
				<select type='text' style='width:50px;height:30px;'>
					<option value='1'>1</option>
					<option value='2'>2</option>
					<option value='3'>3</option>
				</select>
			</div>
			<br>
		`;	
		}
		else if(el.indexOf('性别')!==-1){
			html += `
			<div class="input-group">
				<span class="input-group-addon">${el}</span>
				<select type='text' style='width:50px;height:30px;'>
					<option value='男'>男</option>
					<option value='女'>女</option>
				</select>
			</div>
			<br>
		`;	
		}
		else{
			html += `
			<div class="input-group">
				<span class="input-group-addon">${el}</span>
				<input type="text" class="form-control" >
			</div>
			<br>
		`;	
		}
			
	});
	target.html(html);
})

//绑定button.submit按钮点击事件增加记录====one()绑定一次性的事件========================================
var submitBtn = $('#myModal .modal-footer button.submit');
function addSubmit(){

	submitBtn.one('click',function(){	
	// var json = {};
		var json = [];
		$('#myModal .modal-body .input-group [type=text]').each(function(index, el) {
			json.push($(this).get(0).value);
			//json[ aTable_title_all[currentId][index] ]= $(this).get(0).value;
		});
		sJson = JSON.stringify(json);
		//sJson =  sJson.replace(/\//,'');
		//alert(sJson)
		insertData(currentId,sJson);
		$('#myModal .modal-footer button.myclose').click();
		//getTabData(currentId);//更新数据
		console.log('插入');
	});
}
function updateSubmit(){

	//alert('updateSubmit');
	var aSaveColumnCon = [];
	var target = $('#myModal .modal-body');
	
	
	//alert(aSaveColumnCon);
		
		submitBtn.one('click',function(){
			//alert(now_tab_active)
			target.find('[type = text]').each(function(index, el) {
				aSaveColumnCon.push($(this).get(0).value);
			});
			var sSaveColumnCon = JSON.stringify(aSaveColumnCon);
			
			updateData(now_tab_active,sSaveColumnCon)

		})
}


//绑定点击事件删除记录按钮=======事件委托=====================================
$('.tab-content').on('click','.panel-body span.glyphicon-trash',function(){
	//alert(now_tab_active)
	var columnId = $(this).parent().parent().find('td:first').text();
	//columnId = columnId.toString();
	deleteData(now_tab_active,columnId);
	//alert(now_tab_active)
	getTabData(now_tab_active);//更新数据
	//console.log(columnId);
})


//绑定点击查看记录=======事件委托=====================================
$('.tab-content').on('click','.panel-body span.glyphicon-search',function(){
	
	//currentId = $(this).attr('id').replace(/_add/,'');//表格的tab_0类ID;
	var html='';
	var target = $('#myModal .modal-body');
	target.html('') ;//清空原有的内容
	$.each(aTable_title_all[now_tab_active],function(index, el) {
		if(el.indexOf('内容')!==-1 || el.indexOf('备注')!==-1)
		{
			html += `

				<div class="input-group">
				<span class="input-group-addon">${el}</span>
				<textarea type="text" class="form-control" rows="5"></textarea>
				</div>
				<br>
			`;		
		}
		else{
			html += `
			<div class="input-group">
				<span class="input-group-addon">${el}</span>
				<input type="text" class="form-control" >
			</div>
			<br>
		`;	
		}
			
	});
	target.html(html);

	//获取该列的td内的数据存储在数组里
	var columnTd = $(this).parent().parent().find('td');
	var columnTdText = [];
	columnTd.each(function(index, el) {
		columnTdText.push($(el).text());
	});

	$('#myModalLabel').html('查看详情界面');
	submitBtn.hide();//隐藏提交按钮
	target.find('[type = text]').each(function(index, el) {
		//console.log(index);
		$(this).get(0).value=columnTdText[index];
	});
})

//绑定点击修改记录按钮=======事件委托=====================================
$('.tab-content').on('click','.panel-body span.glyphicon-pencil',function(){
	submitBtn.show();//show提交按钮
	$('#myModalLabel').html('修改数据界面');
	var html='';
	var target = $('#myModal .modal-body');
	target.html('') ;//清空原有的内容

	//生成内容格式
	$.each(aTable_title_all[now_tab_active],function(index, el) {
		if(el.indexOf('内容')!==-1 || el.indexOf('备注')!==-1)
		{
			html += `

				<div class="input-group">
				<span class="input-group-addon">${el}</span>
				<textarea type="text" class="form-control" rows="5"></textarea>
				</div>
				<br>
			`;		
		}
		else if(el.indexOf('等级')!==-1){
			html += `
			<div class="input-group">
				<span class="input-group-addon">${el}</span>
				<select type='text' style='width:50px;height:30px;'>
					<option value='1'>1</option>
					<option value='2'>2</option>
					<option value='3'>3</option>
				</select>
			</div>
			<br>
		`;	
		}
		else if(el.indexOf('性别')!==-1){
			html += `
			<div class="input-group">
				<span class="input-group-addon">${el}</span>
				<select type='text' style='width:50px;height:30px;'>
					<option value='男'>男</option>
					<option value='女'>女</option>
				</select>
			</div>
			<br>
		`;	
		}
		else{
			html += `
			<div class="input-group">
				<span class="input-group-addon">${el}</span>
				<input type="text" class="form-control" >
			</div>
			<br>
		`;	
		}
			
	});
	target.html(html);


	//获取该列的td内的数据存储在数组里
	var columnTd = $(this).parent().parent().find('td');
	var columnTdText = [];
	var aSaveColumnCon = [];
	columnTd.each(function(index, el) {
		columnTdText.push($(el).text());
	});

	//$('#myModalLabel').html('查看详情界面');
	submitBtn.show();//隐藏提交按钮

	//把数据显示在输入框
	target.find('[type = text]').each(function(index, el) {
		//console.log(index);
		$(this).get(0).value=columnTdText[index];
	});

	var firstInput = target.find('input[type=text]:first');//存储该行Id的输入框
	firstInput.attr('disabled','disabled');//禁止修改
	//var columnId  = firstInput.get(0).value;

	updateSubmit();//绑定一次性的更新提交按钮事件
})

//绑定nav点击事件
$('#main .nav-first li ul li').on('click',function(e){
	var text = $(this).find('a').text();
	var tab_id = $(this).find('a').data('id');
	var isExist = false;

	//判断是否该tab已经打开
	$.each(top_tab_item,function(i,el){
		if(text===el){ isExist=true;return false}
	});
	if(!isExist){
		top_tab_item.push(text);
		top_tab_id.push(tab_id);
		//console.log(top_tab_id)
		createTab();//更新数据之后生成Tab代码  并插入
	}
	else{
		
		//给该tab加上active类，并打开显示该内容？？？？？？？？？？
	}

	$(".content .top div[data-id="+now_tab_active+"]").removeClass('active');
	$('#'+now_tab_active+'').hide();
	 last_tab_active = now_tab_active;
	 $('.content .top div[data-id='+tab_id+']').addClass('active')
	 getTabData(tab_id)//先获取该表格的数据//没有判断数据是否获取到
	 $('#'+tab_id).show();//再显示该界面
	 now_tab_active = tab_id;
});


//要用事件委托方式绑定tab删除事件

$('.content .top').on('click','span',function(e){
	e.stopPropagation();
	var text = $(this).parent().text().trim();
	var isActive = false;
	if($(this).parent().hasClass('active')){
		isActive = true;
	}
	var index = findIndex(top_tab_item,text)
	top_tab_item.splice(index, 1);
	top_tab_id.splice(index, 1);
	createTab();//更新数据之后生成Tab代码  并插入
	// console.log(top_tab_item);
	// console.log(top_tab_id);

	var len = top_tab_id.length;
	if(top_tab_id.length!=1 && isActive){

		// console.log($(".content .top div[data-id="+top_tab_id[len-1]+"]"))
		last_tab_active = '';
		$('#'+now_tab_active).hide();
		$(".content .top div[data-id="+top_tab_id[len-1]+"]").addClass('active');
		now_tab_active = top_tab_id[len-1];
		//console.log(now_tab_active);
		$('#'+now_tab_active).show();
	}
	else if(top_tab_id.length!=1 && !isActive){
		//console.log(2222)
		$(".content .top div[data-id="+now_tab_active+"]").addClass('active');

	}
	else{
		last_tab_active = '';
		$('#'+now_tab_active).hide();
		$('#tab_0').show();
		now_tab_active = 'tab_0';
        //console.log(333)
	}
})
//绑定点击通知记录=======事件委托=====================================
$('#noticeTitle').on('click', 'li', function(event) {
	var con =  noticeCon[noticeTitle[$(this).index()]] ;
	var target = $('#myModal .modal-body');
	submitBtn.hide();//show提交按钮
	target.html('');
	$('#myModalLabel').html('查看通知详情');
	var html=`
		<h4 class='text-center text-info' style =''>${noticeTitle[$(this).index()]}</h4>
		<div style = 'border:1px solid #1BE394FF;min-height:300px;text-indent:2em'>${con}</div>		
	`;
	
	target.html(html);

});

// 侧边导航点击显示隐藏
$('.nav .nav-first li').click(function(event) {
	var targetUl = $(this).find('ul');
	var targetSpan = $(this).find('span');
	if (targetSpan.hasClass('glyphicon-triangle-bottom')) {
		targetSpan.removeClass('glyphicon-triangle-bottom').addClass('glyphicon-triangle-right');
	}
	else {
		targetSpan.removeClass('glyphicon-triangle-right').addClass('glyphicon-triangle-bottom');
	}
	targetUl.find('li').click(function(event) {//阻止冒泡防止点击下拉选项时弹起菜单
		event.stopPropagation();
	});
	targetUl.toggle();
});

//绑定tab点击事件
$('.content .top ').on('click','div',function(){

	 if($(this).hasClass('active')){return;};
	 $('.content .top div[data-id='+now_tab_active+']').removeClass('active');
	 $("#"+now_tab_active).hide();
	 last_tab_active = now_tab_active;
	 $(this).addClass('active');
	 now_tab_active = $(this).data('id');
	 $('#'+now_tab_active).show();
})







//其他功能实现=============================================================












function setMainH(){
	var mainH = $(window).height()-$('#header').outerHeight(true)-$('#footer').outerHeight(true)-2;
	$('#main').height(mainH)//设置MAIN的高度
}
setMainH();
$(window).resize(function(event) {
	setMainH();
});

//禁止页面文字被选中
document.body.onselectstart = document.body.ondrag = function(){
	return false;
}


//显示时间日期-------------------------------------------

var areaParent = $('#header .header-info');
var timeaArea = areaParent.find('.glyphicon-time');
var calendarArea =  areaParent.find('.glyphicon-calendar');
timeaArea.css({color:'#261EE0FF',fontSize:'16px'});
calendarArea.css({color:'#0AB11DFF',fontSize:'16px'});
setInterval(function(){
	var mydate = new Date();
	var mycalendar = mydate.toLocaleDateString(); 
	var mytime=mydate.toLocaleTimeString(); //获取当前时间	
	timeaArea.html(mytime);
	calendarArea.html(mycalendar);
},1000)

//注销登陆功能====伪====================

areaParent.find('.logout').on('click',function(){
	window.location.href='../index.html';
})





})