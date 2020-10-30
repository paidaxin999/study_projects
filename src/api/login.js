import request from '../util/request.js';
//所有的api请求都封装在这里
// const baseUrl='/api';

//登录验证
export function login(username,password){
	return request({
		url:'/user/login',
		method:'post',
		data:{
			"username":username,
			"password":password
		}
	});
}
//修改登录密码
// router.put('/user/editpw/:id',service.editpw);
export function editpw(id,password){
	return request({
		url:'/user/editpw/'+id,
		method:'put',
		data:{
			"password":password
		}
	});
}
//获取用户信息
export function getUserInfo(id){
	return request({
		url:`/user/getinfo/${id}`,
		method:'get',
		data:{
			
		}
	});
}
//退出系统
export function logOut(){
	//先判断是否保存了用户信息
	if(localStorage.getItem('vipman-user')){
		//清除数据
		localStorage.removeItem('vipman-user');
	}
	
	return true;
}