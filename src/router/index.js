const path = require('path');
const fs = require('fs');
const Router = require('koa-router');
// const { getRes, RES_CODE } = require('../utils/response');



module.exports = app => {
	const router = new Router();

	// @template-on-begin
	router.get('/', async ctx => {
		await ctx.render('index', { name: 'index' });
	});

	router.get('/index', async ctx => {
		// let n = ctx.session.views || 0;
		// ctx.session.views = ++n;
		// logger.info(ctx, ctx.session);
		// ctx.cookies.set('bb', 'cccc', {path: '/index'});
		// logger.info(ctx.session.code, 'session');
		await ctx.render('index', { name: 'index' });
	});
	// @template-on-end

	// router.get('*', ctx => {
	// 	ctx.body = 'Hello world, page *, Milo';
	// });

	initRouter(app);
	app.use(router.routes());
	// 允许一个接口有不同的method进行请求，如get，post
	app.use(router.allowedMethods());
};

// 初始化路由，读取该文件夹下的所有路由文件进行引用
function initRouter(app) {
	const files = fs.readdirSync(__dirname);
	files.forEach((file) => {
		const filename = path.basename(file, '.js');
		if (filename === 'index') return;
		const router = new Router({
			prefix: `/${filename}`
		});
		const subRouter = require(`./${file}`);
		app.use(subRouter(router));
	});
}