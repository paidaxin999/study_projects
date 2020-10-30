<template>
	<div>
		<!-- 查询表单 -->
				<el-form :inline="true" :model="SearchMapper" ref="SearchMapper" class="demo-form-inline" style="margin-top: 20px;">
				  <el-form-item prop="name">
				    <el-input v-model="SearchMapper.name" placeholder="商品名称"></el-input>
				  </el-form-item>
				  <el-form-item prop="code">
				    <el-input v-model="SearchMapper.code" placeholder="商品编号"></el-input>
				  </el-form-item>
				  <el-form-item prop="company">
				    <el-input v-model="SearchMapper.company" placeholder="供应商"></el-input>
				  </el-form-item>
				  <el-form-item>
				    <el-button type="primary" icon="el-icon-search" @click="Search">查询</el-button>
					
					<el-button type="primary" icon="el-icon-edit" @click="dialogFormVisible = true">新增</el-button>
					<el-button icon="el-icon-refresh" @click="resetForm('SearchMapper')">重置</el-button>
				  </el-form-item>
				  
				</el-form>
				<!-- 查询表单 -->
				
				<!-- 新增信息对话框 -->
				<el-dialog title="新增商品" :visible.sync="dialogFormVisible" width="600px">
				  <el-form :model="pojo" label-position="right" :rules="rules" ref="pojo">
				    <el-form-item label="商品名称" :label-width="'100px'" prop="name">
				      <el-input v-model="pojo.name"  style="width: 250px;"></el-input>
				    </el-form-item>
					<el-form-item label="商品编号" :label-width="'100px'" prop="code">
					  <el-input v-model="pojo.code"  style="width: 250px;"></el-input>
					</el-form-item>
					<el-form-item label="商品规格" :label-width="'100px'" prop="specs">
					  <el-input v-model="pojo.specs"  style="width: 250px;"></el-input>
					</el-form-item>
					
					<el-form-item label="零售价" :label-width="'100px'" prop="retail_price">
					  <el-input v-model="pojo.retail_price"  style="width: 250px;"></el-input>
					</el-form-item>
					<el-form-item label="进货价" :label-width="'100px'" prop="buy_price">
					  <el-input v-model="pojo.buy_price"  style="width: 250px;"></el-input>
					</el-form-item>
					<el-form-item label="数量" :label-width="'100px'" prop="num">
					  <el-input v-model="pojo.num"  style="width: 250px;" type="number"></el-input>
					</el-form-item>
					<el-form-item label="供应商名称" :label-width="'100px'" prop="company">
					  <el-input v-model="pojo.company"  style="width: 250px;"></el-input>
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
				      prop="name"
				      label="商品名称"
				      >
				    </el-table-column>
				    <el-table-column
				      prop="code"
				      label="商品编号"
				      >
				    </el-table-column>
					<el-table-column
					  prop="specs"
					  label="商品规格"
					  >
					</el-table-column>
					<el-table-column
					  prop="retail_price"
					  label="零售价"
					 >
					</el-table-column>
					<el-table-column
					  prop="buy_price"
					  label="进货价"
					 >
					</el-table-column>
					<el-table-column
					  prop="num"
					  label="数量"
					 >
					</el-table-column>
					<el-table-column
					  prop="company"
					  label="供应商名称"
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
				  <el-dialog title="编辑商品" :visible.sync="editDialogVisible" width="600px">
				    <el-form :model="editForm" label-position="right" :rules="editrules" ref="editForm">
				      <el-form-item label="商品名称" :label-width="'100px'" prop="name">
				        <el-input v-model="editForm.name"  style="width: 250px;"></el-input>
				      </el-form-item>
				      <el-form-item label="商品编号" :label-width="'100px'" prop="code">
				        <el-input v-model="editForm.code"  style="width: 250px;"></el-input>
				      </el-form-item>
				      <el-form-item label="商品规格" :label-width="'100px'" prop="specs">
				        <el-input v-model="editForm.specs"  style="width: 250px;"></el-input>
				      </el-form-item>
				      
				      <el-form-item label="零售价" :label-width="'100px'" prop="retail_price">
				        <el-input v-model="editForm.retail_price"  style="width: 250px;"></el-input>
				      </el-form-item>
				      <el-form-item label="进货价" :label-width="'100px'" prop="buy_price">
				        <el-input v-model="editForm.buy_price"  style="width: 250px;"></el-input>
				      </el-form-item>
				      <el-form-item label="数量" :label-width="'100px'" prop="num">
				        <el-input v-model="editForm.num"  style="width: 250px;" type="number"></el-input>
				      </el-form-item>
				      <el-form-item label="供应商名称" :label-width="'100px'" prop="company">
				        <el-input v-model="editForm.company"  style="width: 250px;"></el-input>
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
	//导入api后台接口
	import {getCount,getgoodslist,searchMapper,addgoods,editgoods,delgoods} from '../../api/goods.js';
	
	export default {
		created() {
			this.getcount();
			// this.getlist();
			this.Searchlist();
		},
		data(){
			return {
				dialogFormVisible:false,
				editDialogVisible:false,
				SearchMapper:{//查询表单信息
					name:'',
					code:'',
					company:''
				},
				pojo:{
					name:'',
					code:'',
					specs:'',
					retail_price:'',
					buy_price:'',
					num:'',
					company:''
				},
				editForm:{
					name:'',
					code:'',
					specs:'',
					retail_price:'',
					buy_price:'',
					num:'',
					company:''
				},
				rules:{
					name: [
						{ required: true, message: '商品名称不能为空', trigger: 'blur' },
					],
					code: [
						{ required: true, message: '商品编号不能为空', trigger: 'blur' },
					],
					
				},
				editrules:{
					
					code: [
						{ required: true, message: '商品编号不能为空', trigger: 'blur' },
					],
				},
				tableData:[
					// {username:'杨洋',name:'yy',age:19,phone:'1234235',salary:'1900',createtime:'1999-09-01'}
				],
				total:100,
				pagesize:5,
				PageMaper:[5,10,20],
				currentPage:1
			}
		},
		methods:{
			getcount(){//获取数据的总数目
				getCount().then((res)=>{
					// console.log(res.data);
					this.total=res.data[0]['count'];
				}).catch((err)=>{
					console.log(err);
				})
			},
			getlist(){
				getgoodslist().then((res)=>{
					console.log(res.data);
				}).catch((err)=>{
					console.log(err);
				});
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
			Search(){
				//按条件查询
				var maper={};
				var bool=false;
				for(let key in this.SearchMapper){
					if(this.SearchMapper[key]){
						bool=true;
						
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
			resetForm(formName){
				//重置按钮
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
									  
									  data[key]=model[key];
								  }
							  }
							  // console.log(model);
							  
				              addgoods(data).then((res)=>{
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
			editdata(formName){
				this.$refs[formName].validate((valid) => {
				          if (valid) {
							  console.log(this.$refs[formName]['model']);
							  var model=this.$refs[formName]['model'];
							  var id=model.id;
							  var data={};
							  for(var key in model){
								  if(model[key]){
									  if(key === 'id'){
										  continue;
									  }
									  
									  data[key]=model[key];
								  }
							  }
							  // console.log(data);
											  //关闭对话框，清空数据
											  
				              editgoods(id,data).then((res)=>{
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
			canseladd(formName){
				this.dialogFormVisible=false;
				this.$refs[formName].resetFields();
			},
			handleEdit(index, row){
				console.log('编辑===='+index,row);
				for(let key in row){
					this.editForm[key]=row[key];
				}
				this.editDialogVisible=true;
			},
		    handleDelete(index,row){
				console.log('删除===='+index,row);
				
				var id=row.id;
				// console.log(id);
				delgoods(id).then((res)=>{
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
			handleSizeChange(val){
				console.log(`每页 ${val} 条`);
				this.pagesize=parseInt(val);
			},
			handleCurrentChange(val){
				console.log(`当前第 ${val} 页`);
				this.currentPage=parseInt(val);
			}
		},
		watch:{
			'pagesize':function(){
				this.Searchlist();
			},
			'currentPage':function(){
				this.Searchlist();
			}
		}
	}
</script>

<style>
</style>
