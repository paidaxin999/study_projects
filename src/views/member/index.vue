<template>
	<div>
		<!-- <el-form :inline="true">行内表单 -->
		<el-form :inline="true" :model="SearchMapper" ref="SearchMapper" class="demo-form-inline" style="margin-top: 20px;">
		  <el-form-item prop="cardId">
		    <el-input v-model="SearchMapper.cardId" placeholder="会员卡号"></el-input>
		  </el-form-item>
		  <el-form-item prop="name">
		    <el-input v-model="SearchMapper.name" placeholder="会员名称"></el-input>
		  </el-form-item>
		  <el-form-item prop="paytype">
		    <el-select v-model="SearchMapper.paytype" placeholder="支付类型">
		      <el-option v-for="(item,index) in paytypeList"
			  :key="item.id"
			  :label="item.value" 
			  :value="item.value">
			  </el-option>
		    </el-select>
		  </el-form-item>
		  <el-form-item prop="birthday">
		    <el-date-picker type="date" placeholder="出生日期" v-model="SearchMapper.birthday" style="width: 100%;">
			</el-date-picker>
		  </el-form-item>
		  <el-form-item>
		    <el-button type="primary" icon="el-icon-search" @click="onSubmit">查询</el-button>
			
			<el-button type="primary" icon="el-icon-edit" @click="dialogFormVisible = true">新增</el-button>
			<el-button icon="el-icon-refresh" @click="resetForm('SearchMapper')">重置</el-button>
		  </el-form-item>
		  
		</el-form>
		<!-- 新增信息对话框 -->
		<el-dialog title="新增会员" :visible.sync="dialogFormVisible" width="600px">
		  <el-form :model="pojo" label-position="right" :rules="rules" ref="pojo">
		    <el-form-item label="会员卡号" :label-width="'100px'" prop="cardId">
		      <el-input v-model="pojo.cardId"  style="width: 250px;"></el-input>
		    </el-form-item>
			<el-form-item label="会员姓名" :label-width="'100px'" prop="name">
			  <el-input v-model="pojo.name"  style="width: 250px;"></el-input>
			</el-form-item>
			<el-form-item label="会员生日" :label-width="'100px'" prop="birthday">
			  <el-date-picker type="date" placeholder="出生日期" value-format="yyyy-MM-dd" v-model="pojo.birthday"  style="width: 250px;">
			  </el-date-picker>
			</el-form-item>
			<el-form-item label="电话号码" :label-width="'100px'" prop="phone">
			  <el-input v-model="pojo.phone"  style="width: 250px;"></el-input>
			</el-form-item>
			<el-form-item label="开发金额" :label-width="'100px'" prop="money">
			  <el-input type="number" v-model="pojo.money"  style="width: 250px;"></el-input>
			</el-form-item>
			<el-form-item label="积分" :label-width="'100px'" prop="integral">
			  <el-input v-model="pojo.integral"  style="width: 250px;"></el-input>
			</el-form-item>
		    <el-form-item label="支付类型" :label-width="'100px'" prop="paytype">
		      <el-select v-model="pojo.paytype" placeholder="请选择支付类型" style="width: 250px;">
		        <el-option v-for="option in paytypeList"
				 :key="option.id"
				 :label="option.value"
				 :value="option.value"
				 ></el-option>
		      </el-select>
		    </el-form-item>
			<el-form-item label="住址" :label-width="'100px'" prop="address">
			  <el-input v-model="pojo.address"  style="width: 250px;"></el-input>
			</el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
			<el-button type="primary" @click="addData('pojo')">确 定</el-button>  
		    <el-button @click="canseladd('pojo')">取 消</el-button>
		  </div>
		</el-dialog>
		<!-- 新增信息对话框 -->
		<!-- height="450" -->
		<el-table
		    :data="tableData"
			border
		    style="width: 100%"
			height="400"
		    >
		    <el-table-column
		      fixed
		      type="index"
		      label="序号"
		      width="100">
		    </el-table-column>
		    <el-table-column
		      prop="cardId"
		      label="卡号"
		      >
		    </el-table-column>
		    <el-table-column
		      prop="name"
		      label="姓名"
		      >
		    </el-table-column>
			<el-table-column
			  prop="birthday"
			  label="出生日期"
			  >
			</el-table-column>
			<el-table-column
			  prop="phone"
			  label="电话号"
			 >
			</el-table-column>
			<el-table-column
			  prop="money"
			  label="充值余额"
			  >
			</el-table-column>
			<el-table-column
			  prop="integral"
			  label="积分"
			  >
			</el-table-column>
			<el-table-column
			  prop="paytype"
			  label="支付类型"
			  >
			</el-table-column>
			<el-table-column
			  prop="address"
			  label="地址"
			  >
			</el-table-column>
			<el-table-column label="操作" width="150">
			      <template slot-scope="scope">
			        <el-button
			          size="mini"
			          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
			        <el-button
			          size="mini"
			          type="danger"
			          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
			      </template>
			    </el-table-column>
		  </el-table>
		  <!-- 编辑对话框 -->
		  <el-dialog title="编辑会员" :visible.sync="editDialogVisible" width="600px">
		    <el-form :model="editForm" label-position="right" :rules="editrules" ref="editForm">
		      <el-form-item label="会员卡号" :label-width="'100px'" prop="cardId">
		        <el-input v-model="editForm.cardId"  style="width: 250px;" disabled></el-input>
		      </el-form-item>
		  	<el-form-item label="会员姓名" :label-width="'100px'" prop="name">
		  	  <el-input v-model="editForm.name"  style="width: 250px;"></el-input>
		  	</el-form-item>
		  	<el-form-item label="会员生日" :label-width="'100px'" prop="birthday">
		  	  <el-date-picker type="date" placeholder="出生日期" value-format="yyyy-MM-dd" v-model="editForm.birthday"  style="width: 250px;">
		  	  </el-date-picker>
		  	</el-form-item>
		  	<el-form-item label="电话号码" :label-width="'100px'" prop="phone">
		  	  <el-input v-model="editForm.phone"  style="width: 250px;"></el-input>
		  	</el-form-item>
		  	<el-form-item label="开发金额" :label-width="'100px'" prop="money">
		  	  <el-input type="number" v-model="editForm.money"  style="width: 250px;"></el-input>
		  	</el-form-item>
		  	<el-form-item label="积分" :label-width="'100px'" prop="integral">
		  	  <el-input v-model="editForm.integral"  style="width: 250px;"></el-input>
		  	</el-form-item>
		      <el-form-item label="支付类型" :label-width="'100px'" prop="paytype">
		        <el-select v-model="editForm.paytype" placeholder="请选择支付类型" style="width: 250px;">
		          <el-option v-for="option in paytypeList"
		  		 :key="option.id"
		  		 :label="option.value"
		  		 :value="option.value"
		  		 ></el-option>
		        </el-select>
		      </el-form-item>
		  	<el-form-item label="住址" :label-width="'100px'" prop="address">
		  	  <el-input v-model="editForm.address"  style="width: 250px;"></el-input>
		  	</el-form-item>
		    </el-form>
		    <div slot="footer" class="dialog-footer">
		      <el-button @click="editDialogVisible = false">取 消</el-button>
		      <el-button type="primary" @click="editdata('editForm')">确 定</el-button>
		    </div>
		  </el-dialog>
		  <!-- 编辑对话框 -->
		  <el-pagination
		        @size-change="handleSizeChange"
		        @current-change="handleCurrentChange"
		        :current-page="currentPage"
		        :page-sizes="PageMaper"
		        :page-size="pagesize"
		        layout="total, sizes, prev, pager, next, jumper"
		        :total="total">
		      </el-pagination>
	</div>
</template>

<script>
	import {getCount,searchMapper,addvip,editvip,delvip} from '../../api/member.js';
	export default {
		
		created() {
			this.getcount();
			this.Searchlist();
		},
	    data() {
	      return {
	        tableData: [],
			currentPage: 1,//当前页码
			total:30,//一共多少条数据
			PageMaper:[5,10,20,30],
			pagesize:5,//每页展示多少个
			SearchMapper:{
				cardId:'',
				name:'',
				paytype:'',
				birthday:'',
			},//查询条件
			paytypeList:[
				{id:1,value:'微信'},
				{id:2,value:'支付宝'},
				{id:3,value:'现金'},
				{id:4,value:'银行卡'},
			],
			dialogFormVisible:false,//控制新增对话框
			pojo:{
				cardId:'',
				name:'',
				birthday:'',
				phone:'',
				money:'',
				integral:'',
				paytype:'',
				address:''
			},
			rules: {
				cardId: [
					{ required: true, message: '卡号不能为空', trigger: 'blur' },
					{ min: 1,  message: '长度不能少于 3个字符', trigger: 'blur' }
				],
				name: [
					{ required: true, message: '姓名不能为空', trigger: 'blur' },
					{ min: 1, message: '长度不能少于 3个字符', trigger: 'blur' }
				],
				paytype:[
					{ required: true, message: '请选择支付类型', trigger: 'change' },
				]
			},
			editDialogVisible:false,
			editForm:{
				cardId:'',
				name:'',
				birthday:'',
				phone:'',
				money:'',
				integral:'',
				paytype:'',
				address:''
			},
			editrules:{
				name: [
					{ required: true, message: '姓名不能为空', trigger: 'blur' },
					{ min: 1, message: '长度不能少于 3个字符', trigger: 'blur' }
				],
				paytype:[
					{ required: true, message: '请选择支付类型', trigger: 'change' },
				]
			}
	      }
	    },
		methods: {
			resetForm(formName){
				this.$refs[formName].resetFields();
			},
			addData(formName){
				this.$refs[formName].validate((valid) => {
				          if (valid) {
							  // console.log(this.$refs[formName]['model']);
							  var model=this.$refs[formName]['model'];
							  var data={};
							  for(var key in model){
								  if(model[key]){
									  if(key === 'cardId'){
										  data[key]=parseInt(model[key]);
										  continue;
									  }
									  data[key]=model[key];
								  }
							  }
							  // console.log(data);
							  
				              addvip(data).then((res)=>{
								  //关闭对话框，清空数据
								  this.dialogFormVisible=false;
								  this.$refs[formName].resetFields();
								  if(res.data['flag']){
									  //添加成功
									  this.$message({
									            showClose: true,
									            message: '添加数据成功',
									            type: 'success'
									          });
										this.getcount();
										this.Searchlist();
								  }else{
									  
								  }
								  // console.log(res);
							  }).catch((err)=>{
								  this.$message({
								            showClose: true,
								            message: '很遗憾，添加失败。。',
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
			canseladd(formName){
				this.dialogFormVisible=false;
				this.$refs[formName].resetFields();
			},
			getcount(){
				getCount().then((res)=>{
					// console.log(res.data[0]);
					var count=res.data[0]['count'];
					this.total=count;
				}).catch((err)=>{
					console.log(err);
				})
			},
			Searchlist(searchmap){
				let condition='';
				if(!searchmap){
					condition={"currentPage":this.currentPage-1, "pagesize":this.pagesize};
				}else{
					condition={"currentPage":this.currentPage-1, "pagesize":this.pagesize,"SearchMaper":searchmap};
				}
				searchMapper(condition).then((res)=>{
					// console.log(res.data);
					if(res.data['flag']===false){
						this.tableData=[];
					}else{
						this.tableData=res.data;
					}
					
				}).catch((err)=>{
					console.log(err);
				})
			},
			onSubmit() {
				
					var maper={};
					var bool=false;
					for(let key in this.SearchMapper){
						if(this.SearchMapper[key]){
							bool=true;
							if(key == 'birthday'){
								maper[key]=this.formatTime(this.SearchMapper[key]);
								continue;
							}
							maper[key]=this.SearchMapper[key];
						}
					}
					if(bool){
						// console.log(maper);
						this.getcount();
						this.Searchlist(maper);
					}else{
						this.getcount();
						this.Searchlist();
					}
					
					
			},
			formatTime(date){
				if(!date){
					date=new Date();
				}
				let y=(date.getFullYear()).toString().padStart(2,'0');// getFullYear() 返回年
				let m=(date.getMonth()+1).toString().padStart(2,'0');// getMonth() 返回月份 (0 ~ 11)
				let d = (date.getDate()).toString().padStart(2,'0');// getDate() 返回日 (1 ~ 31)
				
				return `${y}-${m}-${d}`;
			},
			
		      handleEdit(index, row) {
		        // console.log(index, row);
				for(let key in row){
					this.editForm[key]=row[key];
				}
				this.editDialogVisible=true;
		      },
			  editdata(formName){
				  this.$refs[formName].validate((valid) => {
				            if (valid) {
				  			  // console.log(this.$refs[formName]['model']);
				  			  var model=this.$refs[formName]['model'];
							  var id=model.cardId;
				  			  var data={};
				  			  for(var key in model){
				  				  if(model[key]){
				  					  if(key === 'cardId'){
				  						  continue;
				  					  }
				  					  data[key]=model[key];
				  				  }
				  			  }
				  			  // console.log(data);
							  //关闭对话框，清空数据
							  
				                editvip(id,data).then((res)=>{
				  				 this.$refs[formName].resetFields();
				  				 this.editDialogVisible=false;
				  				  if(res.data['flag']){
				  					  //添加成功
				  					  this.$message({
				  					            showClose: true,
				  					            message: '修改数据成功',
				  					            type: 'success'
				  					          });
				  						this.getcount();
				  						this.Searchlist();
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
		      handleDelete(index, row) {
		        console.log('删除数据：----',index, row);
				var id=row.cardId;
				// console.log(id);
				delvip(id).then((res)=>{
					// console.log(res);
					if(res.data['flag']){
						//添加成功
						this.$message({
							showClose: true,
							message: '删除数据成功！',
							type: 'success'
						});
						this.getcount();
						this.Searchlist();
					}else{
									  					  
					}
				}).catch((err)=>{
					this.$message({
						showClose: true,
						message: '删除操作失败。。',
						type: 'error'
					});
					console.log(err);
				})
		      },
			 
			  handleSizeChange(val) {
			    // console.log(`每页 ${val} 条`);
				this.pagesize=parseInt(val);
				// this.getlist();
			  },
			  handleCurrentChange(val) {
			    // console.log(`当前页: ${val}`);
				this.currentPage=parseInt(val);
				// this.getlist();
			   }
		    },
			watch:{
				'pagesize':function(newVal,oldVal){
					this.Searchlist();
				},
				'currentPage':function(newVal,oldVal){
					this.Searchlist();
				}
			}
	  }
</script>

<style>
</style>
