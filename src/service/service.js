
var db=require('../util/db.js');
// const data = require('./data.json');
const path = require('path');
const fs = require('fs');

//1、user表的操作

//user登录验证
//post('/user/login')
exports.login = (req,res)=>{
	let info = req.body;
	
	let sql = 'select * from user where username=? and password=?';
	let data=[info.username,info.password];
	db.base(sql,data,(result)=>{
	    // console.log(result.affectedRows);
		if(result.length == 0){
			res.json({flag:false});
		}else{
			var obj=result[0];
			obj.flag=true;
			// res.json(message);
			res.json(obj);
		}
	});
}
//通过user的id获取用户信息
// router.get('/user/getinfo/:id',service.getuserinfo);
exports.getuserinfo = (req,res)=>{
	let id = req.params.id;
	
	let sql = 'select * from user where id='+id;
	db.base(sql,null,(result)=>{
	    // console.log(result.affectedRows);
		if(result.length == 0){
			res.json({flag:false});
		}else{
			var obj=result[0];
			obj.flag=true;
			res.json(obj);
		}
	});
}
//修改管理员密码
//put('/user/editpw/1')
exports.editpw = (req,res) => {
	let id = req.params.id;
	let info=req.body;
	
	let sql = 'update user set password=?  where id=?';
	let data = [info.password,id];
	    db.base(sql,data,(result)=>{
	        if(result.affectedRows == 1){
				// console.log(result);
	            res.json({flag:true});
	        }else{
				res.json({flag:false});
				// res.redirect('/');
			}
	    });
}

//2、vip表的操作
//查询所有的会员
exports.getviplist = (req,res) =>{
	// let info = req.body;
	
	let sql = 'select * from vip';
	// let data=[info.username,info.password];
	db.base(sql,null,(result)=>{
	    // console.log(result.affectedRows);
		if(result.length == 0){
			res.json({flag:false});
		}else{
			var message=result;
			res.json(message);
		}
	});
}

//查询vip表数据的总条数
// router.get('/viplist/count',service.getvipcount);
exports.getvipcount = (req,res) =>{
	// let info = req.body;
	
	let sql = "select COUNT(*) as 'count' from vip";
	// let data=[info.username,info.password];
	db.base(sql,null,(result)=>{
	    // console.log(result.affectedRows);
		if(result.length == 0){
			res.json({flag:false});
		}else{
			var message=result;
			res.json(message);
		}
	});
}
//按条件查询search返回数据
// router.post('/viplist/searchMap',service.searchvipMap);
//data：{currentpage，pagesize，searchMap：{查询条件}}
exports.searchvipMap = (req,res) =>{
	let info = req.body;
	// console.log(info);
	
	info.currentPage = info.currentPage || 0;
	info.pagesize = info.pagesize || 5;
	let start=parseInt(info.currentPage) * parseInt(info.pagesize);
	let pagesize=parseInt(info.pagesize);
	let searchvipMap = info.SearchMaper;
	
	if(!searchvipMap){
		//当查询条件为空时,不用对sql字符串进行拼接
		let sql = 'select * from vip LIMIT ' +start+ ',' +pagesize;
		db.base(sql,null,(result)=>{
		    // console.log(result.affectedRows);
			if(result.length == 0){
				res.json({flag:false});
			}else{
				var message=result;
				res.json(message);
			}
		});
	}else{
		//当查询条件不为空时
		let sql = 'select * from vip where ';
		let num=0,data =[];
		for(let key in searchvipMap){
			if(num==0){
			sql += key+'=?';	
			num++;
			}
			else{
			sql += ' and '+key+'=?';	
			}
				
			data.push(searchvipMap[key]);
		}
		sql += ' LIMIT ' +start+ ',' +pagesize;
		
		db.base(sql,data,(result)=>{
		    // console.log(result.affectedRows);
			if(result.length == 0){
				res.json({flag:false});
			}else{
				var message=result;
				res.json(message);
			}
		});
	}
	
}


//查询会员
//get---/viplist/findone/:one
exports.findvip = (req,res) =>{
	let info=req.params['item'];
	info=JSON.parse(info);
	
	let data=[];
	let sql = 'select * from vip where ';
	let num=0;
	for(let key in info){
		if(num==0){
		sql += key+'=?';	
		num++;
		}
		else{
		sql += 'and'+key+'=?';	
		}
			
		data.push(info[key]);
	}
	
	db.base(sql,data,(result)=>{
	    // console.log(result.affectedRows);
		if(result.length == 0){
			res.json({flag:false});
		}else{
			var message=result;
			res.json(message);
		}
	});
}
//添加会员
exports.addvip = (req,res) =>{
	let info = req.body;
	// console.log(info);
	let sql = 'insert into vip set ?';
	
	db.base(sql,info,(result)=>{
	    // console.log(result.affectedRows);
		if(result.affectedRows == 1){
			res.json({flag:true});
		}else{
			
			res.json({flag:false});
		}
	});
}
//更新会员数据	put('/viplist/edit/:id')
exports.editvip = (req,res)=>{
	let cardId=req.params['id'];
	let data=req.body;
	
	let sql='update vip set ? where cardId='+cardId;
	db.base(sql,data,(result)=>{
	    // console.log(result.affectedRows);
		if(result.affectedRows == 1){
			res.json({flag:true});
		}else{
			
			res.json({flag:false});
		}
	});
}
//删除会员   delete('/viplist/del/:id')
exports.delvip =(req,res)=>{
	let cardId=req.params['id'];
	
	let sql='delete from vip where cardId='+cardId;
	db.base(sql,null,(result)=>{
	    // console.log(result.affectedRows);
		if(result.affectedRows == 1){
			res.json({flag:true});
		}else{
			
			res.json({flag:false});
		}
	});
}

//3、staff表的操作
// 查询所有员工
// router.get('/stafflist',service.getstafflist);
exports.getstafflist = (req,res) =>{
	
	let sql = 'select * from staff';
	// let data=[info.username,info.password];
	db.base(sql,null,(result)=>{
	    // console.log(result.affectedRows);
		if(result.length == 0){
			res.json({flag:false});
		}else{
			var message=result;
			res.json(message);
		}
	});
}
//查询vip表数据的总条数
// router.get('/stafflist/count',service.getstaffcount);
exports.getstaffcount = (req,res) =>{
	// let info = req.body;
	
	let sql = "select COUNT(*) as 'count' from staff";
	// let data=[info.username,info.password];
	db.base(sql,null,(result)=>{
	    // console.log(result.affectedRows);
		if(result.length == 0){
			res.json({flag:false});
		}else{
			var message=result;
			res.json(message);
		}
	});
}
//按条件查询search返回数据
// router.post('/stafflist/searchMap',service.searchstaffMap);
exports.searchstaffMap = (req,res) =>{
	let info = req.body;
	// console.log(info);
	
	info.currentPage = info.currentPage || 0;
	info.pagesize = info.pagesize || 5;
	let start=parseInt(info.currentPage) * parseInt(info.pagesize);
	let pagesize=parseInt(info.pagesize);
	let searchvipMap = info.SearchMaper;
	
	if(!searchvipMap){
		//当查询条件为空时,不用对sql字符串进行拼接
		let sql = 'select * from staff LIMIT ' +start+ ',' +pagesize;
		db.base(sql,null,(result)=>{
		    // console.log(result.affectedRows);
			if(result.length == 0){
				res.json({flag:false});
			}else{
				var message=result;
				res.json(message);
			}
		});
	}else{
		//当查询条件不为空时
		let sql = 'select * from staff where ';
		let num=0,data =[];
		for(let key in searchvipMap){
			if(num==0){
			sql += key+'=?';	
			num++;
			}
			else{
			sql += ' and '+key+'=?';	
			}
				
			data.push(searchvipMap[key]);
		}
		sql += ' LIMIT ' +start+ ',' +pagesize;
		
		db.base(sql,data,(result)=>{
		    // console.log(result.affectedRows);
			if(result.length == 0){
				res.json({flag:false});
			}else{
				var message=result;
				res.json(message);
			}
		});
	}
	
}
//查询某个员工
// router.get('/stafflist/findone/:item',service.findstaff);
exports.findstaff = (req,res) =>{
	let info=req.params['item'];
	info=JSON.parse(info);
	
	let data=[];
	let sql = 'select * from staff where ';
	let num=0;
	for(let key in info){
		if(num==0){
		sql += key+'=?';	
		num++;
		}
		else{
		sql += 'and'+key+'=?';	
		}
		data.push(info[key]);
	}
	
	db.base(sql,data,(result)=>{
	    // console.log(result.affectedRows);
		if(result.length == 0){
			res.json({flag:false});
		}else{
			var message=result;
			res.json(message);
		}
	});
}
//添加员工
// router.post('/stafflist/add',service.addstaff);
exports.addstaff = (req,res) =>{
	let info = req.body;
	console.log(info);
	let sql = 'insert into staff set ?';
	
	db.base(sql,info,(result)=>{
	    // console.log(result.affectedRows);
		if(result.affectedRows == 1){
			res.json({flag:true});
		}else{
			
			res.json({flag:false});
		}
	});
}
//删除员工
// router.delete('/stafflist/del/:id',service.delstaff);
exports.delstaff =(req,res)=>{
	let id=req.params['id'];
	
	let sql='delete from staff where id='+id;
	db.base(sql,null,(result)=>{
	    // console.log(result.affectedRows);
		if(result.affectedRows == 1){
			res.json({flag:true});
		}else{
			
			res.json({flag:false});
		}
	});
}
//更新员工
// router.put('/stafflist/edit/:id',service.editstaff);
exports.editstaff = (req,res)=>{
	let id=req.params['id'];
	let data=req.body;
	
	let sql='update staff set ? where id='+id;
	db.base(sql,data,(result)=>{
	    // console.log(result.affectedRows);
		if(result.affectedRows == 1){
			res.json({flag:true});
		}else{
			
			res.json({flag:false});
		}
	});
}


//4、supplier表的操作
//查询所有的供应商
// router.get('/supplierlist',service.getsupplierlist);
exports.getsupplierlist = (req,res) =>{
	
	let sql = 'select * from supplier';
	// let data=[info.username,info.password];
	db.base(sql,null,(result)=>{
	    // console.log(result.affectedRows);
		if(result.length == 0){
			res.json({flag:false});
		}else{
			var message=result;
			res.json(message);
		}
	});
}

//查询vip表数据的总条数
// router.get('/supplierlist/count',service.getsuppliercount);
exports.getsuppliercount = (req,res) =>{
	// let info = req.body;
	
	let sql = "select COUNT(*) as 'count' from supplier";
	// let data=[info.username,info.password];
	db.base(sql,null,(result)=>{
	    // console.log(result.affectedRows);
		if(result.length == 0){
			res.json({flag:false});
		}else{
			var message=result;
			res.json(message);
		}
	});
}

//按条件查询search返回数据
// router.post('/supplierlist/searchMap',service.searchsupplierMap);
exports.searchsupplierMap = (req,res) =>{
	let info = req.body;
	// console.log(info);
	
	info.currentPage = info.currentPage || 0;
	info.pagesize = info.pagesize || 5;
	let start=parseInt(info.currentPage) * parseInt(info.pagesize);
	let pagesize=parseInt(info.pagesize);
	let searchvipMap = info.SearchMaper;
	
	if(!searchvipMap){
		//当查询条件为空时,不用对sql字符串进行拼接
		let sql = 'select * from supplier LIMIT ' +start+ ',' +pagesize;
		db.base(sql,null,(result)=>{
		    // console.log(result.affectedRows);
			if(result.length == 0){
				res.json({flag:false});
			}else{
				var message=result;
				res.json(message);
			}
		});
	}else{
		//当查询条件不为空时
		let sql = 'select * from supplier where ';
		let num=0,data =[];
		for(let key in searchvipMap){
			if(num==0){
			sql += key+'=?';	
			num++;
			}
			else{
			sql += ' and '+key+'=?';	
			}
				
			data.push(searchvipMap[key]);
		}
		sql += ' LIMIT ' +start+ ',' +pagesize;
		
		db.base(sql,data,(result)=>{
		    // console.log(result.affectedRows);
			if(result.length == 0){
				res.json({flag:false});
			}else{
				var message=result;
				res.json(message);
			}
		});
	}
	
}

//查询某个供应商
// router.get('/supplierlist/findone/:item',service.findsupplier);
exports.findsupplier = (req,res) =>{
	let info=req.params['item'];
	info=JSON.parse(info);
	
	let data=[];
	let sql = 'select * from supplier where ';
	let num=0;
	for(let key in info){
		if(num==0){
		sql += key+'=?';	
		num++;
		}
		else{
		sql += 'and'+key+'=?';	
		}
		data.push(info[key]);
	}
	
	db.base(sql,data,(result)=>{
	    // console.log(result.affectedRows);
		if(result.length == 0){
			res.json({flag:false});
		}else{
			var message=result;
			res.json(message);
		}
	});
}
//添加供应商
// router.post('/supplierlist/add',service.addsupplier);
exports.addsupplier = (req,res) =>{
	let info = req.body;
	console.log(info);
	let sql = 'insert into supplier set ?';
	
	db.base(sql,info,(result)=>{
	    // console.log(result.affectedRows);
		if(result.affectedRows == 1){
			res.json({flag:true});
		}else{
			
			res.json({flag:false});
		}
	});
}
//删除供应商
// router.delete('/supplierlist/del/:id',service.delsupplier);
exports.delsupplier =(req,res)=>{
	let id=req.params['id'];
	
	let sql='delete from supplier where id='+id;
	db.base(sql,null,(result)=>{
	    // console.log(result.affectedRows);
		if(result.affectedRows == 1){
			res.json({flag:true});
		}else{
			
			res.json({flag:false});
		}
	});
}
//更新供应商
// router.put('/supplierlist/edit/:id',service.editsupplier);
exports.editsupplier = (req,res)=>{
	let id=req.params['id'];
	let data=req.body;
	
	let sql='update supplier set ? where id='+id;
	db.base(sql,data,(result)=>{
	    // console.log(result.affectedRows);
		if(result.affectedRows == 1){
			res.json({flag:true});
		}else{
			
			res.json({flag:false});
		}
	});
}

//4、goods表的操作
//查询所有商品信息
// router.get('/goodslist',service.getgoodslist);
exports.getgoodslist = (req,res) =>{
	
	let sql = 'select * from goods';
	// let data=[info.username,info.password];
	db.base(sql,null,(result)=>{
	    // console.log(result.affectedRows);
		if(result.length == 0){
			res.json({flag:false});
		}else{
			var message=result;
			res.json(message);
		}
	});
}

//查询goods表数据的总条数
// router.get('/goodslist/count',service.getgoodscount);
exports.getgoodscount = (req,res) =>{
	// let info = req.body;
	
	let sql = "select COUNT(*) as 'count' from goods";
	// let data=[info.username,info.password];
	db.base(sql,null,(result)=>{
	    // console.log(result.affectedRows);
		if(result.length == 0){
			res.json({flag:false});
		}else{
			var message=result;
			res.json(message);
		}
	});
}
//按条件查询search返回数据
// router.post('/goodslist/searchMap',service.searchgoodsMap);
exports.searchgoodsMap = (req,res) =>{
	let info = req.body;
	// console.log(info);
	
	info.currentPage = info.currentPage || 0;
	info.pagesize = info.pagesize || 5;
	let start=parseInt(info.currentPage) * parseInt(info.pagesize);
	let pagesize=parseInt(info.pagesize);
	let searchvipMap = info.SearchMaper;
	
	if(!searchvipMap){
		//当查询条件为空时,不用对sql字符串进行拼接
		let sql = 'select * from goods LIMIT ' +start+ ',' +pagesize;
		db.base(sql,null,(result)=>{
		    // console.log(result.affectedRows);
			if(result.length == 0){
				res.json({flag:false});
			}else{
				var message=result;
				res.json(message);
			}
		});
	}else{
		//当查询条件不为空时
		let sql = 'select * from goods where ';
		let num=0,data =[];
		for(let key in searchvipMap){
			if(num==0){
			sql += key+'=?';	
			num++;
			}
			else{
			sql += ' and '+key+'=?';	
			}
				
			data.push(searchvipMap[key]);
		}
		sql += ' LIMIT ' +start+ ',' +pagesize;
		
		db.base(sql,data,(result)=>{
		    // console.log(result.affectedRows);
			if(result.length == 0){
				res.json({flag:false});
			}else{
				var message=result;
				res.json(message);
			}
		});
	}
	
}
//查询某个供应商信息
// router.get('/goodslist/findone/:item',service.findgoods);
exports.findgoods = (req,res) =>{
	let info=req.params['item'];
	info=JSON.parse(info);
	
	let data=[];
	let sql = 'select * from goods where ';
	let num=0;
	for(let key in info){
		if(num==0){
		sql += key+'=?';	
		num++;
		}
		else{
		sql += 'and'+key+'=?';	
		}
		data.push(info[key]);
	}
	
	db.base(sql,data,(result)=>{
	    // console.log(result.affectedRows);
		if(result.length == 0){
			res.json({flag:false});
		}else{
			var message=result;
			res.json(message);
		}
	});
}
//添加商品
// router.post('/goodslist/add',service.addgoods);
exports.addgoods = (req,res) =>{
	let info = req.body;
	console.log(info);
	let sql = 'insert into goods set ?';
	
	db.base(sql,info,(result)=>{
	    // console.log(result.affectedRows);
		if(result.affectedRows == 1){
			res.json({flag:true});
		}else{
			
			res.json({flag:false});
		}
	});
}
//删除商品
// router.delete('/goodslist/del/:id',service.delgoods);
exports.delgoods =(req,res)=>{
	let id=req.params['id'];
	
	let sql='delete from goods where id='+id;
	db.base(sql,null,(result)=>{
	    // console.log(result.affectedRows);
		if(result.affectedRows == 1){
			res.json({flag:true});
		}else{
			
			res.json({flag:false});
		}
	});
}
//更新商品
// router.put('/goodslist/edit/:id',service.editgoodslist);
exports.editgoodslist = (req,res)=>{
	let id=req.params['id'];
	let data=req.body;
	
	let sql='update goods set ? where id='+id;
	db.base(sql,data,(result)=>{
	    // console.log(result.affectedRows);
		if(result.affectedRows == 1){
			res.json({flag:true});
		}else{
			
			res.json({flag:false});
		}
	});
}


//读取json文件
// let ReadFiles=function(id){
// 	var str='';
// 	var data='';
// 	var content=fs.readFileSync(path.join(__dirname,'data.json'));
// 	str=content.toString();
// 	data=JSON.parse(str);
	
// 	return data[id];
// }

// ReadFiles();
//添加会员
// function addvip(){
// 	var data=ReadFiles('vipList');
// 	// console.log(data);
// 	// let info = req.body;
// 	let sql = 'insert into vip set ?';
// 	let info={};
// 	for(var i=0;i<data.length;i++){
// 		var item=data[i];
// 		info['cardId']=item['cardId'];
// 		info['name']=item['name'];
// 		info['birthday']=item['birthday'];
// 		info['phone']=item['phone'];
// 		info['money']=item['money']+'';
// 		info['integral']=item['integral']+'';
// 		info['paytype']=item['paytype'];
// 		info['address']=item['address'];
// 		// console.log(info);
		
// 		db.base(sql,info,(result)=>{
// 		    if(result.affectedRows == 1){
// 		        console.log('成功添加信息');
// 		    }else{
// 		        console.log('添加失败。。。');
// 		    }  
// 		});
// 	}
	
	
// }


//添加供应商
// function addsupplier(){
// 	var data=ReadFiles('supplier');
// 	// console.log(data);
// 	// let info = req.body;
// 	let sql = 'insert into supplier set ?';
// 	let info={};
// 	for(var i=0;i<data.length;i++){
// 		var item=data[i];
// 		info['company']=item['company'];
// 		info['name']=item['name'];
// 		info['phone']=item['phone'];
// 		info['remarks']=item['remarks'];
// 		// console.log(info);
		
// 		db.base(sql,info,(result)=>{
// 		    if(result.affectedRows == 1){
// 		        console.log('成功添加信息');
// 		    }else{
// 		        console.log('添加失败。。。');
// 		    }  
// 		});
// 	}
// }

//添加商品
// function addgoods(){
// 	var data=ReadFiles('goods');
// 	// console.log(data);
// 	// let info = req.body;
// 	let sql = 'insert into goods set ?';
// 	let info={};
// 	for(var i=0;i<data.length;i++){
// 		var item=data[i];
// 		info['name']=item['name'];
// 		info['code']=item['code'];
// 		info['specs']=item['specs'];
// 		info['retail_price']=item['retail_price']+'';
// 		info['buy_price']=item['buy_price']+'';
// 		info['num']=item['num'];
// 		info['company']=item['company']+'';
// 		// console.log(info);
		
// 		db.base(sql,info,(result)=>{
// 		    if(result.affectedRows == 1){
// 		        console.log('成功添加信息');
// 		    }else{
// 		        console.log('添加失败。。。');
// 		    }  
// 		});
// 	}
// }

//添加员工
// function addstaff(){
// 	var data=ReadFiles('staff');
// 	// console.log(data);
// 	// let info = req.body;
// 	let sql = 'insert into staff set ?';
// 	let info={};
// 	for(var i=0;i<data.length;i++){
// 		var item=data[i];
// 		info['username']=item['username'];
// 		info['name']=item['name'];
// 		info['age']=item['age'];
// 		info['phone']=item['phone'];
// 		info['salary']=item['salary']+'';
// 		info['createtime']=item['createtime'];
		
// 		// console.log(info);
		
// 		db.base(sql,info,(result)=>{
// 		    if(result.affectedRows == 1){
// 		        console.log('成功添加信息');
// 		    }else{
// 		        console.log('添加失败。。。');
// 		    }  
// 		});
// 	}
// }






