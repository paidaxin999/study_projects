<template>
	<div class="AppMain">
		<app-link></app-link>
		<router-view></router-view>
		<!-- <div class="content">
			
			<el-form :inline="true" :model="formInline" class="demo-form-inline">
			  <el-form-item label="审批人">
			    <el-input v-model="formInline.user" placeholder="审批人"></el-input>
			  </el-form-item>
			  <el-form-item label="活动区域">
			    <el-select v-model="formInline.region" placeholder="活动区域">
			      <el-option label="区域一" value="shanghai"></el-option>
			      <el-option label="区域二" value="beijing"></el-option>
			    </el-select>
			  </el-form-item>
			  <el-form-item>
			    <el-button type="primary" @click="onSubmit">查询</el-button>
			  </el-form-item>
			</el-form>
		</div> -->
	</div>
</template>

<script>
	import AppLink from './applink.vue';
	export default {
	    data() {
	      return {
	        formInline: {
	          user: '',
	          region: ''
	        }
	      }
	    },
	    methods: {
	      onSubmit() {
	        console.log('submit!');
	      }
	    },
		components:{
			AppLink
		}
	  }
</script>

<style>
	.el-breadcrumb{
		display: block;
		height: 10px;
		padding: 20px;
		border-radius: 5px;
		box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);
	}
	.el-breadcrumb__item{
		border-left: 3px solid #31c17b;
		text-align: left;
		padding-left: 10px;
		font-size: 14px;
	}
	.content{
		margin-top: 18px;
	}
</style>

