import request from '../util/request.js';

//获取所有会员数据
export function getviplist(){
	return request({
		url:'/viplist',
		method:'get',
		// data:{
			
		// }
	});
}
//获取条目数
export function getCount(){
	return request({
		url:'/viplist/count',
		method:'get',
		// data:{
			
		// }
	});
}
//按条件查询包括分页查询
export function searchMapper(Mapperlist){
	return request({
		url:'/viplist/searchMap',
		method:'post',
		data:Mapperlist
	});
}
//提交数据
export function addvip(data){
	return request({
		url:'/viplist/add',
		method:'post',
		data:data
	});
}
//修改数据
export function editvip(id,data){
	return request({
		url:'/viplist/edit/'+id,
		method:'put',
		data:data
	});
}
//删除数据
export function delvip(id){
	return request({
		url:'/viplist/del/'+id,
		method:'delete',
		// data:data
	});
}

