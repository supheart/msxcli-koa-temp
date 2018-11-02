const { getRes } = require('../utils/response');

module.exports = router => {
	// @template-on-begin
	router.get('/', async ctx => {
		await ctx.render('upload');
	});
	// @template-on-end
  
	router.post('/action', global.upload.single('file'), ctx => {
		const uploadFile = ctx.req.file;
		console.log(uploadFile);
		ctx.body = getRes(ctx.req.file.filename);
	});
  
	return router.routes();
};
