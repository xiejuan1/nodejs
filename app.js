var express = require("express");
var bodyParser = require("body-Parser");
var mongoose = require("mongoose");
var app = express();

app.use(express.static("statics"))//指定静态资源路径
app.use(express.static("uploadcache"));//指定静态资源路径
//连接数据库
mongoose.Promise = global.Promise;

mongoose.connect("mongodb://localhost:27017/react",{useMongoClient:true}).then(function(){ 
	console.log("连接成功")
})


//使用插件
app.use(bodyParser.json())//处理json
app.use(bodyParser.urlencoded({
	extended:true
}))


//导入模型
var User = require("./models/user");
var Comment = require("./models/comment");
var upload = require("./statics/js/upload");


//用户注册
app.post("/regist/index",function(req,res){
let {username,pwd,email} = req.body;
	//操作数据库，存储数据
	//判断这个用户名是否已经注册，存在提示用户存在请登录。提前先查询一下？
	User.find({username},function(err,doc){//doc查到的数据
		if(err){return};
	if(doc.length){
		res.json({
			code:1,
			msg:"用户名已存在"
		})
	}else{
		var user = new User({//创建User模型实例
			username,
			pwd,
			email
		});
		user.save(function(err,doc){//执行数据库存储操作
			if(err){return};
			res.json({
				code:0,
				msg:"注册成功"
			})
		})
	};
	})
})

//登录
app.post('/login/index',function(req,res){
    //获取post请求参数

    let {username,pwd} = req.body;

    User.find({username},(err,doc)=>{
         
         if (!doc.length) {
            res.json({
                code:1,
                msg:"用户名不存在"
            })
         }else{
              
            if (pwd == doc[0].pwd) {
                   
              res.json({
                  code:0,
                  msg:"登录成功"
               })

            }else{
               res.json({
                  code:1,
                  msg:"密码错误"
               })

            };
         };
    })
})

//查询comment

app.get("/comment/index",function(req,res){
	Comment.find({},function(err,doc){
		if(err){return};
		res.json({
			code:0,
			list:doc
		})
	})
})

//处理删除
app.post("/commentdelete/index",(req,res)=>{
	Comment.findOneAndRemove({_id:req.body._id},function(err,doc){
		if(err){return};
		res.json({
			code:0,
			msg:"删除成功！"
		})
	})
})

//处理文件上传
app.post("/upload",function(req,res){
	upload.upload(req,res)
})

//处理提交
app.post("/addcomment/index",function(req,res){
	var com = new Comment(req.body);
	com.save(function(err,doc){
		if(err){
			return;
		}
		res.json({
			code:0,
			list:[doc]
		});
	});
	
})

//修改内容
app.post("/commentupdate/index",function(req,res){
	//修改
	var {_id,img,position,company,expreience,type,site,salary} = req.body;
	
	Comment.findOneAndUpdate({_id},{img,position,company,expreience,type,site,salary},{new:true},function(err,doc){
		if(err){
			return;
		};
		res.json({
			code:0,
			list:[doc]
		})
	})
})

//分页布局

app.post("/page/index",function(req,res){
	var page = req.body.page;
	
	Comment.find({},null,{skip:(page-1)*5,limit:5},function(err,doc){
		console.log(doc);
		if(err){
			return;
		}
		res.json({
			code:0,
			list:doc
		})
	})
})

app.listen(9999,()=>{
	console.log("启动成功")
})
