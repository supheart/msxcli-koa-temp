module.exports = router => {
	// @template-on-begin
	router.get('/', async ctx => {
		await ctx.render('user', { name: 'user' });
	});
	// @template-on-end
  
	return router.routes();
};
