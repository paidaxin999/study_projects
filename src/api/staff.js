import request from '../util/request.js';

//获取所有会员数据
export function getstafflist(){
	return request({
		url:'/stafflist',
		method:'get',
		// data:{
			
		// }
	});
}
//获取条目数
export function getCount(){
	return request({
		url:'/stafflist/count',
		method:'get',
		// data:{
			
		// }
	});
}
//按条件查询包括分页查询
export function searchMapper(Mapperlist){
	return request({
		url:'/stafflist/searchMap',
		method:'post',
		data:Mapperlist
	});
}
//提交数据
export function addstaff(data){
	return request({
		url:'/stafflist/add',
		method:'post',
		data:data
	});
}
//修改数据
export function editstaff(id,data){
	return request({
		url:'/stafflist/edit/'+id,
		method:'put',
		data:data
	});
}
//删除数据
export function delstaff(id){
	return request({
		url:'/stafflist/del/'+id,
		method:'delete',
		// data:data
	});
}

