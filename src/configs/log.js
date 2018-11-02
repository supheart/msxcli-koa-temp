const path = require('path');

//日志根目录
const baseLogPath = path.resolve(__dirname, '../../logs');
//错误日志路径
const errorPath = '/error';
const errorFileNamePrefix = 'error';
const errorLogPath = baseLogPath + errorPath + '/' + errorFileNamePrefix;

//响应日志路径
const customPath = '/custom';
const customFileNamePrefix = 'log';
const responseLogPath = baseLogPath + customPath + '/' + customFileNamePrefix;

module.exports = {
	appenders: {
		ruleStdout: {
			type: 'stdout'
		},
		ruleSys: {
			type: 'stdout'
		},
		error: {
			type:  'dateFile',                   // 日志类型
			filename: errorLogPath,              // 日志输出位置
			alwaysIncludePattern: true,
			pattern: '-yyyy-MM-dd-hh.log',       // 后缀，每小时创建一个新的日志文件
			path: errorPath                      // 自定义属性，错误日志的根目录
		},
		log: {
			type: 'dateFile',
			filename: responseLogPath,
			alwaysIncludePattern: true,
			pattern: '-yyyy-MM-dd-hh.log',
			path: customPath  
		}
	},
	categories: {
		default: { appenders: [ 'ruleStdout', 'log' ], level: 'debug' },
		syserror: { appenders: [ 'ruleSys' ], level: 'error' }

	},
	baseLogPath: baseLogPath                  
};
