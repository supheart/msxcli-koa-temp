const { getRes, RES_CODE } = require('../utils/response');

module.exports = router => {
	// @template-on-begin
	router.get('/', async ctx => {
		await ctx.render('sql', { name: 'sql' });
	});
	// @template-on-end
  
	router.post('/list', async ctx => {
		const result = await global.knex.select('*').from('test').orderBy('id', 'asc');
		ctx.body = getRes(result);
	});
  
	router.post('/add', async ctx => {
		if (!ctx.request.body.key || !ctx.request.body.value) {
			ctx.body = getRes(RES_CODE.ERROR_PARAMS);
			return;
		}
		try{
			const result = await global.knex('test').insert({key: ctx.request.body.key, value: ctx.request.body.value});
			ctx.body = getRes(String(result[0]));
		} catch(err) {
			ctx.body = getRes(null, 0, err.message);
		}
	});
  
	router.delete('/', async ctx => {
		if(!ctx.request.query.id) {
			ctx.boyd = getRes(RES_CODE.ERROR_PARAMS);
			return;
		}
		try{
			const result = await global.knex('test').where('id', ctx.request.query.id).del();
			ctx.body = getRes(String(result));
		}catch(err) {
			ctx.body = getRes(null, 0, err.message);
		}
	});
  
	router.post('/update', async ctx => {
		const { id, key, value } = ctx.request.body;
		if(!id || !key || !value) {
			ctx.body = getRes(RES_CODE.ERROR_PARAMS);
			return;
		}
		try{
			const result = await global.knex('test').where('id', id).update({ key, value });
			if(result > 0) {
				ctx.body = getRes({ id, key, value });
			} else {
				ctx.body = getRes();
			}
		}catch(err) {
			ctx.body = getRes(null, 0, err.message);
		}
	});
  
  
	return router.routes();
};
