const log4js = require('log4js');
const logConfig = require('../configs/log');

//加载配置文件
log4js.configure(logConfig);

const logUtil = {};
const errorLogger = log4js.getLogger('error');
const resLogger = log4js.getLogger('log');
global.logger = log4js.getLogger();

//封装错误日志
logUtil.logError = function (ctx, error, resTime) {
	if (ctx && error) {
		errorLogger.error(formatError(ctx, error, resTime));
	}
};

//封装响应日志
logUtil.logResponse = function (ctx, resTime) {
	if (ctx) {
		resLogger.info(formatRes(ctx, resTime));
	}
};

//格式化响应日志
const formatRes = function (ctx, resTime) {
	let logText = new String();
	logText += ''; // 响应日志开始
	logText += 'res status: ' + ctx.status + ', '; // 响应状态码
	logText += formatReqLog(ctx.request, ctx.response, resTime); // 添加请求日志=
	if (ctx.response.header['content-length'] < 1000 || (ctx.response.header['content-type'] && ctx.response.header['content-type'].indexOf('image') < 0)) {
		logText += 'res body: ' + ' ' + JSON.stringify(ctx.body) + ''; // 响应内容
	} else {
		logText += 'res header: ' + ' ' + JSON.stringify(ctx.response.header) + ''; // 响应内容
	}
	return logText;
};

//格式化错误日志
const formatError = function (ctx, err, resTime) {
	let logText = new String();
	logText += '\n' + '*************** error log start ***************' + '\n'; //错误信息开始
	logText += formatReqLog(ctx.request, ctx.response, resTime); // 添加请求日志
	logText += 'err name: ' + err.name + '\n'; // 错误名称
	logText += 'err message: ' + err.message + '\n'; // 错误信息
	logText += 'err stack: ' + err.stack + '\n'; // 错误详情
	logText += '*************** error log end ***************' + '\n'; // 错误信息结束
	return logText;
};

//格式化请求日志
const formatReqLog = function (req, res, resTime) {
	let logText = new String();
	const method = req.method;
	logText += 'method: ' + method + ', '; // 访问方法
	logText += 'originalUrl: ' + req.originalUrl + ', '; // 请求原始地址
	// let startTime; // 开始时间
	if (method === 'GET') {
		logText += 'query: ' + JSON.stringify(req.query) + ', '; // 请求参数
		// startTime = req.query.requestStartTime;
	} else {
		if (parseInt(res.header['content-length']) < 1000) {
			logText += 'body: ' + JSON.stringify(req.body) + ', ';
		}
	}
	logText += 'time: ' + resTime + ', '; // 服务器响应时间
	logText += 'client ip: ' + req.ip + ', '; // 客户端ip
	return logText;
};

module.exports = logUtil;