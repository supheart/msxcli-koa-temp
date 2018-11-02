const RES_CODE = {
	SUCCESS: 0,
	VERIFY_FAILD: -1,
	NOT_LOGIN: 1,
	ERROR_PARAMS: 2,
	USERNAME_OR_PASSWORD_ERROR: 3,
	SQL_ERROR: 4,
};

const errorCode = {
	[RES_CODE.SUCCESS]: 'ok',
	[RES_CODE.VERIFY_FAILD]: '验证失败',
	[RES_CODE.NOT_LOGIN]: '未登录',
	[RES_CODE.ERROR_PARAMS]: '参数错误',
	[RES_CODE.USERNAME_OR_PASSWORD_ERROR]: '用户名或密码错误',
	[RES_CODE.SQL_ERROR]: '操作失败',
};

exports.RES_CODE = RES_CODE;

exports.getRes = function(data, code = 0, mes) {
	if (typeof data === 'number') {
		code = data;
		data = undefined;
	}
	const message = mes || errorCode[code];
	return { code, message, data };
};