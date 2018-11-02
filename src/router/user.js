module.exports = router => {
	// @template-on-begin
	router.get('/', async ctx => {
		await ctx.render('user', { name: 'user' });
	});
	// @template-on-end

	router.post('/add', async ctx => {
		if (!ctx.request.body.username || !ctx.request.body.password) {
			ctx.body = getRes(RES_CODE.USERNAME_OR_PASSWORD_ERROR);
			return;
		}
		ctx.body = getRes();
	});
  
	return router.routes();
};
