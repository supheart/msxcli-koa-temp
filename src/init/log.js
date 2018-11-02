// const fs = require('fs');
// const logConfig = require('../configs/log');
const logUtil = require('../utils/log');

// 确定目录是否存在，如果不存在则创建目录
// const confirmPath = function(pathStr) {
// 	if(!fs.existsSync(pathStr)){
// 		fs.mkdirSync(pathStr);
// 		console.log('createPath: ' + pathStr);
// 	}
// };

// 初始化log相关目录
// const initLogPath = function(){
// 	//创建log的根目录'logs'
// 	if(logConfig.baseLogPath){
// 		confirmPath(logConfig.baseLogPath);
// 		//根据不同的logType创建不同的文件目录
// 		for(let i = 0, len = logConfig.appenders.length; i < len; i++){
// 			if(logConfig.appenders[i].path){
// 				confirmPath(logConfig.baseLogPath + logConfig.appenders[i].path);
// 			}
// 		}
// 	}
// };

module.exports = function(app) {
	// initLogPath();

	// 初始化监听日志
	app.use(async (ctx, next) => {
		const start = new Date(); // 响应开始时间
		let ms; // 响应间隔时间
		try {
			//开始进入到下一个中间件
			await next();
			ms = new Date() - start;

			//记录响应日志
			logUtil.logResponse(ctx, ms);
		} catch (error) {
			ms = new Date() - start;
			//记录异常日志
			logUtil.logError(ctx, error, ms);
			let errMsg = error.stack ? error.stack.trim().split('\n') : error;
			let errLength = Math.min(errMsg.length, 1);
			let errText = '';
			for(let i = 0; i < errLength; i ++) {
				errText += errMsg[i];
			}
			if(typeof(errMsg) === 'string') {
				errText = errMsg;
			}
			error.errText = errText;
			throw(error);
			// if(ctx.request.method === 'GET') {
			//     // ctx.body = {code: 404, message: 'faild', error: errText};
			//     throw(error);
			// }
		}
	});
};
