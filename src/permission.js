import router from './router/index.js';
import {getUserInfo} from './api/login.js';

router.beforeEach((to, from, next) => {
  // 首先先获取user值
  const user=localStorage.getItem('vipman-user');
  if(user){
	 //如果能获取到user值，说明用户没退出系统，直接让它跳转 next() 
	 next();
  }else{
	  const token=localStorage.getItem('vipman-token');
	  //如果没有获取到，但是能获取到token值
	  if(token){
		  //如果用户是跳转到login，直接让它跳转
		  if(to.path === '/login'){
			  next();
		  }else{
			  //如果不是跳转到login,则需要重新请求后台进行登录验证
			  var userid=JSON.parse(token).userid;
			  getUserInfo(userid).then((res)=>{
			  						  // console.log(res);
			  						  if(res.data['flag']==true){
			  							  console.log('登录成功');
			  								//获取用户信息
			  								console.log(res);
			  								var userdata=res.data;
			  								//localstore保存用户信息
			  								localStorage.setItem('vipman-user',JSON.stringify(userdata));
			  								// localStorage.setItem('vipman-token',JSON.stringify({userid:userdata['id']}));
			  								//前往首页
			  								next();
			  						  }else{
			  							 next({path:'/login'});
			  						  }
			  });
		  }
	  }else{
		  //如果既没有user也没有token，说明用户没有登陆过，则直接跳转到login页面
		  // console.log('调转路由');
		  
		  next({path:'/login'});
		  
	  }
  }
  
  
  
  
  
  
  
})