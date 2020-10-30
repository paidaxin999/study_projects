import Vue from "vue";
import VueRouter from "vue-router";
// import Home from "../views/Home.vue";
import Login from "../views/login/index.vue";
import Layout from '../views/Layout/index.vue';

import AppHome from '../views/home/index.vue';
import AppMember from '../views/member/index.vue';
import AppSupplier from '../views/supplier/index.vue';
import AppStaff from '../views/staff/index.vue';
import AppGoods from '../views/goods/index.vue';
Vue.use(VueRouter);

// import {getUserInfo} from '../api/login.js';

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

let router = new VueRouter({
  mode: "history",
  // base: process.env.BASE_URL,
  routes: [
    {
      path: "/login",
      name: "login",
      component: Login
    },
	{
	  path: "/",
	  name: "Layout",
	  component: Layout,
	  redirect:'/home',
	  children:[
		  {
			  path:'/home',
			  name:'home',
			  component:AppHome,
			  meta:{title:'首页'}
		  },
		  {
			  path:'/member',
			  name:'member',
			  component:AppMember,
			  meta:{title:'会员管理'}
		  },
		  {
		  			  path:'/staff',
		  			  name:'staff',
		  			  component:AppStaff,
		  			  meta:{title:'员工管理'}
		  },
		  {
		  			  path:'/supplier',
		  			  name:'supplier',
		  			  component:AppSupplier,
		  			  meta:{title:'供应商管理'}
		  },
		  {
		  			  path:'/goods',
		  			  name:'goods',
		  			  component:AppGoods,
		  			  meta:{title:'商品管理'}
		  },
	  ]
	},
    // {
    //   path: "/about",
    //   name: "About",
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () =>
    //     import(/* webpackChunkName: "about" */ "../views/About.vue")
    // }
  ],
});



export default router;
