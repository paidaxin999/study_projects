<template>
	<div class="AppHeader">
		<a href="/" class="headerLink">
			<h3>会员管理系统</h3>
		</a>
		
		<el-dropdown @command="handleCommand" trigger="click">
		  <span class="el-dropdown-link">
		    {{username}}<i class="el-icon-arrow-down el-icon--right"></i>
		  </span>
		  <el-dropdown-menu slot="dropdown">
		    <el-dropdown-item icon="el-icon-edit" command="a">修改密码</el-dropdown-item>
		    <el-dropdown-item icon="el-icon-s-fold" command="b">退出系统</el-dropdown-item>
		  </el-dropdown-menu>
		</el-dropdown>
		<!-- 弹出修改密码 对话框 -->
		<el-dialog title="修改密码" :visible.sync="dialogFormVisible" width="450px" >
		  <el-form :model="editForm" :rules="rules" ref="editForm">
			
		    <el-form-item label="原始密码" :label-width="formLabelWidth" prop="oldpw">
		      <el-input v-model="editForm.oldpw" autocomplete="off" disabled></el-input>
		    </el-form-item>
		    <el-form-item label="新密码" :label-width="formLabelWidth" prop="newpw">
		      <el-input v-model="editForm.newpw" autocomplete="off"></el-input>
		    </el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="cansel('editForm')">取 消</el-button>
		    <el-button type="primary" @click="edit('editForm')">确 定</el-button>
		  </div>
		</el-dialog>
		<!-- 弹出修改密码 对话框 -->
	</div>
</template>

<script>
	import {logOut,editpw,getUserInfo} from '../../api/login.js';
	export default {
		created() {
			
			var user=JSON.parse(localStorage.getItem('vipman-user'));
			this.username=user['username'];
			this.userid=user['id'];
			
			getUserInfo(user['id']).then((res)=>{
				// console.log(res.data);
				this.editForm['oldpw']=res.data['password'];
			}).catch((err)=>{
				console.log(err);
			})
			// console.log(user);
			
			
		},
		data(){
			return {
				username:'管理员',
				dialogFormVisible:false,
				formLabelWidth:'80px',
				editForm:{
					oldpw:'',
					newpw:''
				},
				userid:'',
				rules:{
					newpw:[
						{ required: true, message: '密码不能为空', trigger: 'blur' },
						{ min: 1, message: '长度不能少于 3个字符', trigger: 'blur' }
					]
				}
			}
		},
	    methods: {
	      handleCommand(command) {
	        switch (command){
	        	case 'a':
				getUserInfo(this.userid).then((res)=>{
					// console.log(res.data);
					this.editForm['oldpw']=res.data['password'];
				}).catch((err)=>{
					console.log(err);
				})
				//显示对话框
				this.dialogFormVisible=true;
	        		break;
					case 'b':
					// this.$message('点击了退出系统');
					var islogOut=logOut();
					if(islogOut){
						this.$router.push('/login');
						console.log('成功退出系统！');
					}else{
						this.$message({
						          showClose: true,
						          message: '退出系统失败。。',
						          type: 'warning'
						        });
					}
						break;
	        	default:
	        		break;
	        }
	      },
		  edit(formName){
			  this.$refs[formName].validate((valid) => {
			            if (valid) {
			  			  console.log(this.$refs[formName]['model']);
			  			  var model=this.$refs[formName]['model'];
			  			  
			  			  // console.log(data);
			  				//关闭对话框，清空数据		  
			                editpw(this.userid,model['newpw']).then((res)=>{
			  				 this.editForm['newpw']='';
			  				 this.dialogFormVisible=false;
			  				  if(res.data['flag']){
			  					  //添加成功
								  this.editForm['oldpw']=res.data['password'];
			  					  this.$message({
			  					            showClose: true,
			  					            message: '修改密码成功',
			  					            type: 'success'
			  					          });
			  						
			  				  }else{
			  					  
			  				  }
			  				  // console.log(res);
			  			  }).catch((err)=>{
			  				  this.$message({
			  				            showClose: true,
			  				            message: '很遗憾，修改失败。。',
			  				            type: 'error'
			  				          });
			  				  console.log(err);
			  			  })
			  			  
			            } else {
			              console.log('error submit!!');
			              return false;
			            }
			          });
		  },
		  cansel(formName){
			  this.dialogFormVisible=false;
			  this.editForm['newpw']='';
		  }
	    }
	  }
</script>

<style>
	.AppHeader{
		
	}
	a.headerLink{
		text-decoration: none;
		text-underline: unset;
		color: floralwhite;
		text-align: left;
		display: inline-block;
	}
	.el-dropdown{
		float: right;
		margin-right: 50px;
		border: none;
	}
	.el-dropdown-link {
	    cursor: pointer;
	    color: floralwhite;
		border: none;
		text-decoration: none;
		font-size: 14px;
	  }
	  .el-icon-arrow-down {
	    font-size: 12px;
	  }
</style>
