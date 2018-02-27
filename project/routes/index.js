var express = require('express');
var router = express.Router();
var UserModel = require("../model/User");
var GoodsModel = require("../model/Goods");
var multiparty = require("multiparty");

/* GET home page. */
router.get('/login', function(req, res, next) {
  res.render('login', { title: '欢迎进入后台管理' });
});

router.post('/login4ajax', function(req, res, next) {
	var username = req.body.username;
	var psw = req.body.psw;
	var result = {
		code: 1,
		message: "登录成功"
	};
	UserModel.find({username: username, psw: psw}, (err, docs)=>{
		if(docs.length == 0) {
			result.code = -101;
			result.message = "您的账号或密码错误。请重新登录。"
		} else {
			// 登录成功的时候，生成session
			req.session.username = username;
		}
		res.json(result);
	})
})

router.get('/store', function(req, res, next) {
  res.render('store', { title: '您已进入后台管理系统' });
});

router.get('/product', function(req, res, next) {
  res.render('product', {});
});

router.get('/addgood', function(req, res, next) {
  res.render('addgood', {});
});

module.exports = router;
