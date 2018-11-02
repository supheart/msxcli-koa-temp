const config = {
	host: {
		// 设置是否启动https的服务，注意修改对应的端口号，这里端口号不会自动改为对应的默认ip
		https: false,
		port: 8022,
	},
	appKey: 'sup',
	sessionKey: 'milo:sess',
	jwtSecret: 'xxx',
	jwtExpires: 60 * 60,
	hmacSecretKey: 'mmm',
	mongodb: 'mongodb://localhost:27017/test',
	// @sql-on-begin
	db: {
		client: 'mysql',
		connection: {
			host     : '127.0.0.1',
			user     : 'root',
			password : 'root',
			database : 'test'
		}
	},
	// @sql-on-end
	unlessJwt: [
		// /^\//,
		'/favicon.ico', 
		'/', 
		'/index', 
		'/test', 
		'/sys/code', 
		'/api/verifyUser',
		'/upload',
		'/upload/action',
		/^\/login/, 
		/^\/api\/login/, 
		/^\/register/, 
		/^\/api\/register/, 
		/^\/js/, /^\/css/, 
		/^\/images/, 
		/^\/music/, 
		/^\/video/, 
		/^\/static/
	]
};

module.exports = config;