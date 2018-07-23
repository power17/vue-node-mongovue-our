var express = require('express');
var router = express.Router();

var User = require('./../models/user')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//登陆
router.post("/login",function (req,res,next) {
  var param = {
    userName: req.body.userName,
    userPwd: req.body.userPwd
  }
  console.log(param);
  User.findOne(param,function (err,doc) {
    if(err){
      res.json({
        status:'1',
        msg: err.message
      })
    }else{
        if(doc){
          res.cookie('userId',doc.userId,{
            pat:'/',
            maxAge:1000*60*60
          });
          // req.session.user = doc;
          res.cookie('userName',doc.userName,{
            path:'/',
            maxAge:1000*60*60
          });
          res.json({
            status: '0',
            msg:'',
            result: {
              userName:doc.userName
            }

          })
        }
    }

  });

});

//登出
router.post("/logout", function (req,res,next) {
  res.cookie('userId',"",{
    path:'/',
    maxAge:-1
  });
  res.json({
    status:"0",
    msg:'',
    result:''
  })
});
//检验是否登录
router.get('/checkLogin',function (req,res,next) {
  if(req.cookies.userId) {
    res.json({
      status:'0',
      msg: '',
      result: req.cookies.userName || ''
    });

  }else{
    res.json({
      status:'1',
      msg:'未登录',
      result:''
    })
  }
});

//查询当前用户的购物车数据
router.get('/cartList',function (req,res,next) {
  var userId = req.cookies.userId;
  User.findOne({userId:userId},function (err,doc) {
    if(err){
      res.json({
        status:'1',
        msg: err.message,
        result:''
      });
    }else{
      if(doc){

        res.json({
          status:'0',
          msg:'',
          result:doc.cartList
        })
      }
    }
  })
});

//购物车删除功能
router.post('/cartDel',function (req,res,next) {
  var userId = req.cookies.userId,
       productId = req.body.productId;
  User.update({
    userId:userId
  },{
    $pull:{
      'cartList':{
        'productId':productId
      }
    }
  },function (err,doc) {
    if(err){
      res.json({
        status:'1',
        msg:err.message,
        resulte:''
      })
    }else{
      res.json({
        status:'0',
        msg:'',
        result:'suc'
      })
    }
  })

});

//添加购物车数量
router.post("/cartEdit",function (req,res,next) {
  var userId = req.cookies.userId,
      productId = req.body.productId,
      productNum = req.body.productNum,
      checked = req.body.checked;
  User.update({
    'userId':userId,
    'cartList.productId':productId
  },{
    'cartList.$.productNum':productNum,
    'cartList.$.checked':checked
  },function (err,doc) {
    if(err){
      res.json({
        status:'1',
        msg:err.message,
        result:''
      })
    }else{
      res.json({
        status:'0',
        msg:'',
        result:'suc'
      })
    }
  })
});

//全选和取消全选
router.post('/editCheckAll',function(req,res,next){
  var userId = req.cookies.userId,
    checkAll = req.body.checkAll?'1':'0';
  User.findOne({userId:userId},function(err,user){
    if(err){
      res.json({
        status:'1',
        msg:err.message,
        result:''
      });
    }else{
      if(user){
        user.cartList.forEach((item)=>{
          item.checked = checkAll;
        })
        user.save(function (err1,doc) {
          if(err1){
            res.json({
              status:'1',
              msg:err1,message,
              result:''
            });
          }else{
            res.json({
              status:'0',
              msg:'',
              result:'suc'
            });
          }
        })
      }
    }
  })
})
//查询用户地址借口
router.get('/addressList',function (req,res,next) {
  var userId = req.cookies.userId;
  User.findOne({userId:userId},function (err,doc) {
    if(err){
      res.json({
        status:'1',
        msg:err.message,
        result:''
      })
    }else{
      res.json({
        status:'0',
        msg:'',
        result:doc.addressList
      })
    }
  })
});
//设置默认地址
router.post('/setDefault',function (req,res,next) {
  var userId = req.cookies.userId,
    addressId = req.body.addressId;
    if(!addressId){
      res.json({
        status:'1003',
        msg:'addressId is null',
        result:''
      })
    }else {
      User.findOne({userId:userId},function (err,doc) {
        if(err){
          res.json({
            status:'1',
            msg:err.message,
            result:''
          })
        }else{
          var addressList = doc.addressList;
          addressList.forEach((item)=>{
            if(item.addressId ==addressId) {
              item.isDefault = true;
            }else{
              item.isDefault = false;
            }
          });
          doc.save(function (err1,doc1) {
            if(err){
              res.json({
                status:'1',
                msg:err.message,
                result:''
              });
            }else{
              res.json({
                status:'0',
                msg: '',
                result:'保存成功'
              })
            }
          })
        }
      })
    }

});
//删除地址
router.post('/delAddress',function (req,res,next) {
  var userId = req.cookies.userId,
    addressId = req.body.addressId;
  User.update({
    userId:userId
  },{
    $pull:{
      'addressList':{
        'addressId':addressId
      }
    }
  },function (err,doc) {
    if(err){
      res.json({
        status:'1',
        msg:err.message,
        result:''
      })
    }else {
      res.json({
        status:'0',
        msg:'',
        result:'删除成功'

      })
    }

  })

});
module.exports = router;


