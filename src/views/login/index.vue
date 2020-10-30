<template>
	<div class="login-container">
		<div class="login-form">
		<el-form ref="ruleForm" :model="form" label-width="60px" label-position="left" :rules="rules">
			<h2 class="title">会员管理系统</h2>
		  <el-form-item label="账号" id="username" prop="username">
		    <el-input v-model="form.username"></el-input>
		  </el-form-item>
		  
		  <el-form-item label="密码" id="password" prop="password">
		    <el-input v-model="form.password"></el-input>
		  </el-form-item>
		  
		  <el-form-item id="loginbtn">
		    <el-button type="primary" :plain="true" @click="submitForm('ruleForm')">登录</el-button>
			<el-button @click="resetForm('ruleForm')">重置</el-button>
		  </el-form-item>
		</el-form>
	</div>
	</div>
	
</template>

<script>
	import {login} from '../../api/login.js';
	 export default {
	    data() {
	      return {
	        form: {
	          username: '',
	          password: '',
	          
	        },
			rules: {
			    username: [
			        { required: true, message: '账号不能为空', trigger: 'blur' },
			        { min: 3,  message: '长度不能少于 3个字符', trigger: 'blur' }
			    ],
				password: [
				    { required: true, message: '密码不能为空', trigger: 'blur' },
				    { min: 3, message: '长度不能少于 3个字符', trigger: 'blur' }
				],
	      }
	    }
		},
	    methods: {
	      submitForm(formName) {
			  //表单格式验证
	              this.$refs[formName].validate((valid) => {
	                if (valid) {
					  // console.log(this.$refs[formName].model);
					  var data=this.$refs[formName].model;
					  //格式验证后调用后台接口login
					  login(data.username,data.password).then((res)=>{
						  console.log(res);
						  if(res.data['flag']==true){
							  console.log('登录成功');
								//获取用户信息
								console.log(res);
								var userdata=res.data;
								//localstore保存用户信息
								localStorage.setItem('vipman-user',JSON.stringify(userdata));
								localStorage.setItem('vipman-token',JSON.stringify({userid:userdata['id']}));
								//前往首页
								this.$router.push('/');
						  }else{
							 this.$message({
							           showClose: true,
							           message: '登录失败，账号不存在或密码错误',
							           type: 'error'
							         });
						  }
					  }).catch((error)=> 
					  {console.log("error init." +error)
					  });
					  
	                  // console.log('submit!');
	                } else {
	                  // console.log('error submit!!');
					  this.$message({
					            showClose: true,
					            message: '登录失败，请先填好账号信息！',
					            type: 'warning'
					          });
	                  return false;
	                }
	              });
	       },
		   resetForm(formName){
			    this.$refs[formName].resetFields();
		   }
	    }
	  }
</script>

<style scoped="scoped">
	.title{
		color: rgba(255,255,255,0.8);
		text-align: center;
		margin-bottom: 20px;
	}
	.login-form{
		color: rgba(255,255,255,0.8);
		width: 350px;
		padding: 25px;
		border-radius: 20px;
		background-color: rgba(0,0,0,0.8);
		display: block;
		margin-top: 250px;
		margin-left: 50%;
		transform: translateX(-50%);
		box-shadow: 0 0 10px 6px rgba(255,255,255,0.8);
	}
	.login-container{
		position: absolute;
		width: 100%;
		height: 100%;
		background-image: url(../../assets/back.jpg);
		background-position: center;
		background-size: 100% 100%;
		margin: 0;
		padding: 0;
	}
</style>
