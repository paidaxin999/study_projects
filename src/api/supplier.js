import request from '../util/request.js';

//获取所有会员数据
export function getsupplierlist(){
	return request({
		url:'/supplierlist',
		method:'get',
		// data:{
			
		// }
	});
}
//获取条目数
export function getCount(){
	return request({
		url:'/supplierlist/count',
		method:'get',
		// data:{
			
		// }
	});
}
//按条件查询包括分页查询
export function searchMapper(Mapperlist){
	return request({
		url:'/supplierlist/searchMap',
		method:'post',
		data:Mapperlist
	});
}
//提交数据
export function addsupplier(data){
	return request({
		url:'/supplierlist/add',
		method:'post',
		data:data
	});
}
//修改数据
export function editsupplier(id,data){
	return request({
		url:'/supplierlist/edit/'+id,
		method:'put',
		data:data
	});
}
//删除数据
export function delsupplier(id){
	return request({
		url:'/supplierlist/del/'+id,
		method:'delete',
		// data:data
	});
}