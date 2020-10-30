const express = require('express');
const service = require('./service.js');
const router = express.Router();
/*
    get     http://localhost:3000/viplist
    get     http://localhost:3000/viplist/:id
    post    http://localhost:3000/viplist/vipitem
    put     http://localhost:3000/viplist/vipitem
    delete  http://localhost:3000/viplist/:id
*/
//登录验证
router.post('/user/login',service.login);
//通过id获取用户信息
router.get('/user/getinfo/:id',service.getuserinfo);
//修改登录密码
router.put('/user/editpw/:id',service.editpw);

// //查询所有会员信息
router.get('/viplist',service.getviplist);

//查询vip表数据的总条数
router.get('/viplist/count',service.getvipcount);
//按条件查询search返回数据
router.post('/viplist/searchMap',service.searchvipMap);

// //查询某个会员信息
router.get('/viplist/findone/:item',service.findvip);
// //添加会员信息
router.post('/viplist/add',service.addvip);
// //修改会员信息
router.put('/viplist/edit/:id',service.editvip);
// //删除会员信息
router.delete('/viplist/del/:id',service.delvip);

//查询所有员工信息
router.get('/stafflist',service.getstafflist);

//查询vip表数据的总条数
router.get('/stafflist/count',service.getstaffcount);
//按条件查询search返回数据
router.post('/stafflist/searchMap',service.searchstaffMap);

// //查询某个会员信息
router.get('/stafflist/findone/:item',service.findstaff);
// //添加会员信息
router.post('/stafflist/add',service.addstaff);
// //修改会员信息
router.put('/stafflist/edit/:id',service.editstaff);
// //删除会员信息
router.delete('/stafflist/del/:id',service.delstaff);

// //查询所有供应商信息
router.get('/supplierlist',service.getsupplierlist);

//查询vip表数据的总条数
router.get('/supplierlist/count',service.getsuppliercount);
//按条件查询search返回数据
router.post('/supplierlist/searchMap',service.searchsupplierMap);

// //查询某个供应商信息
router.get('/supplierlist/findone/:item',service.findsupplier);
// //添加供应商信息
router.post('/supplierlist/add',service.addsupplier);
// //修改供应商信息
router.put('/supplierlist/edit/:id',service.editsupplier);
// //删除供应商信息
router.delete('/supplierlist/del/:id',service.delsupplier);

// //查询所有商品信息
router.get('/goodslist',service.getgoodslist);

//查询vip表数据的总条数
router.get('/goodslist/count',service.getgoodscount);
//按条件查询search返回数据
router.post('/goodslist/searchMap',service.searchgoodsMap);

// //查询某个供应商信息
router.get('/goodslist/findone/:item',service.findgoods);
// //添加供应商信息
router.post('/goodslist/add',service.addgoods);
// //修改供应商信息
router.put('/goodslist/edit/:id',service.editgoodslist);
// //删除供应商信息
router.delete('/goodslist/del/:id',service.delgoods);



module.exports = router;