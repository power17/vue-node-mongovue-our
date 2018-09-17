var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var util = require('util');
var fs = require("fs");
var sd = require("silly-datetime");
var path = require("path");
var unzip = require('unzip');



/* 上传*/
router.post('/uploading', function(req, res, next){
  var form = new formidable.IncomingForm();
  //设置文件上传存放地址
  form.uploadDir = "./uploads";

  //执行里面的回调函数的时候，表单已经全部接收完毕了。
  form.parse(req, function(err, fields, files) {
    //改名字
    //使用第三方模块silly-datetime
    var t = sd.format(new Date(),'YYYYMMDDHHmmss');

    //生成随机数
    var ran = parseInt(Math.random() * 8999 +10000);
    var extname = path.extname(files.fileDetail.name);
    var oldpath = path.resolve(__dirname, '../../') +'/' + files.fileDetail.path;
    var newpath = path.resolve(__dirname, '../../')+ '/uploads/'+t+ran+extname;
    // var newpath = path.resolve(__dirname, '../../')+ '/uploads/'+'1'+extname;
    console.log(oldpath);
    console.log(newpath);

    //改名
    fs.rename(oldpath,newpath,function (err) {
      if(err){
        throw  Error("改名失败");
      }
      //解压缩
      fs.createReadStream(newpath).pipe(unzip.Extract({ path: path.resolve(__dirname, '../../')+ '/uploads/' }));
      //删除文件
      fs.unlink(newpath,function () {

      });
      //回应
      res.json({
        status:'0',
        files:files
      });


    });
    // res.writeHead(200, {'content-type': 'text/plain'});
    //
    // res.end("success");

  });


  });


module.exports = router;
