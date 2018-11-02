const Koa = require('koa');
const path = require('path');
const session = require('koa-session');                         // session处理
const bodyparser = require('koa-bodyparser');                   // 解析参数报文配置
const runRouter = require('./router');                          // 路由配置
const config = require('./configs');                            // 配置文件
const jwt = require('./init/kwtVerify');                        // 处理请求token中间件
const kcors = require('kcors');                                 // 引入服务器支持跨域请求
// const mongoose = require('mongoose');                           // 数据库配置

// 设置mongo db 配置内容
// mongoose.Promise = Promise;
// mongoose.connect(config.mongodb, {useMongoClient:true});

const app = new Koa();
app.use(async (ctx, next) => {
	try {
		//开始进入到下一个中间件
		await next();
	} catch (error) {
		// 这里捕捉所有流程抛出的错误
		if (typeof(error) === 'string') {
			throw(new Error(error));
		}
		throw(error);
	}
});

// @log-on-begin
// 日志配置
const initLogs = require('./init/log');
initLogs(app);
// @log-on-end

// @base-on-begin
// 自动解析请求报文
app.use(bodyparser({enableTypes: ['json', 'form', 'text']}));
// 允许跨域访问
app.use(kcors());
// 解析jwt内容
app.use(jwt({secret: config.jwtSecret}).unless({path: config.unlessJwt}));
// 设置session
app.keys = [config.appKey];
const sessConfig = {key: config.sessionKey, maxAge: 86400000, overwrite: true, httpOnly: true, signed: true, rolling: false};
app.use(session(sessConfig, app));
// @base-on-end

// @template-on-begin
// 设置静态文件
const koaStatic = require('koa-static'); // 静态文件配置
app.use(koaStatic(__dirname + '/public')); // 静态文件路径设置
// 静态模板处理
const render = require('koa-ejs');                              // ejs静态模版配置
render(app, {root: path.join(__dirname, 'views'), layout: '', viewExt: 'html'});
// @template-on-end

// @upload-on-begin
const fs = require('fs');
const multer = require('koa-multer');
const uploadPath = path.join(__dirname, 'uploads');
if(!fs.existsSync(uploadPath)){
	fs.mkdirSync(uploadPath);
}
var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, uploadPath);
	},
	filename: function (req, file, cb) {
		let pre = file.mimetype.split('/')[1] || '';
		if(pre) pre = '.' + pre;
		cb(null, `${Date.now()} - ${file.originalname}${pre}`);
	}
});
global.upload = multer({ storage: storage });
// @upload-on-end

// @sql-on-begin
const knex = require('knex');
global.knex = knex(config.db);
global.knex.raw('set names utf8mb4').asCallback(function () {
	global.knex.raw('show variables like \'character_set_%\'').asCallback(function (err, data) {
		console.info(JSON.stringify(data));
	});
});
// @sql-on-end

// router & filter
runRouter(app);

module.exports = app;