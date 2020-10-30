import request from '../util/request.js';

//获取所有会员数据
export function getgoodslist(){
	return request({
		url:'/goodslist',
		method:'get',
		// data:{
			
		// }
	});
}
//获取条目数
export function getCount(){
	return request({
		url:'/goodslist/count',
		method:'get',
		// data:{
			
		// }
	});
}
//按条件查询包括分页查询
export function searchMapper(Mapperlist){
	return request({
		url:'/goodslist/searchMap',
		method:'post',
		data:Mapperlist
	});
}
//提交数据
export function addgoods(data){
	return request({
		url:'/goodslist/add',
		method:'post',
		data:data
	});
}
//修改数据
export function editgoods(id,data){
	return request({
		url:'/goodslist/edit/'+id,
		method:'put',
		data:data
	});
}
//删除数据
export function delgoods(id){
	return request({
		url:'/goodslist/del/'+id,
		method:'delete',
		// data:data
	});
}