const unless = require('koa-unless');
const jwt = require('jsonwebtoken');

module.exports = (opts = {}) => {

	const { debug, getToken, isRevoked, key = 'user', passthrough, tokenKey } = opts;
	const tokenResolvers = [resolveCookies, resolveAuthHeader];

	if (getToken && typeof getToken === 'function') {
		tokenResolvers.unshift(getToken);
	}

	const middleware = async (ctx, next) => {
		let token;
		tokenResolvers.find(resolver => token = resolver(ctx, opts));

		if (!token && !passthrough) {
			ctx.throw(401, debug ? 'Token not found' : 'Authentication Error');
		}

		let { state: { secret = opts.secret } } = ctx;

		try {
			if (typeof secret === 'function') {
				secret = await getSecret(secret, token);
			}

			if (!secret) {
				ctx.throw(401, 'Secret not provided');
			}

			const decodedToken = await verify(token, secret, opts);

			if (isRevoked) {
				const tokenRevoked = await isRevoked(ctx, decodedToken, token);
				if (tokenRevoked) {
					throw new Error('Token revoked');
				}
			}

			ctx.state[key] = decodedToken;
			if (tokenKey) {
				ctx.state[tokenKey] = token;
			}

		} catch (e) {
			if (!passthrough) {
				const msg = debug ? e.message : 'Authentication Error';
				ctx.throw(401, msg, { originalError: e });
			}
		}

		return next();
	};

	middleware.unless = unless;
	return middleware;
};

function resolveAuthHeader(ctx, opts) {
	if (!ctx.header || !ctx.header.authorization) {
		return;
	}

	const parts = ctx.header.authorization.split(' ');

	if (parts.length === 2) {
		const scheme = parts[0];
		const credentials = parts[1];

		if (/^Bearer$/i.test(scheme)) {
			return credentials;
		}
	}
	if (!opts.passthrough) {
		ctx.throw(401, 'Bad Authorization header format. Format is "Authorization: Bearer <token>"');
	}
}

function resolveCookies(ctx, opts) {
	return opts.cookie && ctx.cookies.get(opts.cookie);
}

async function getSecret(provider, token) {

	const decoded = jwt.decode(token, { complete: true });

	if (!decoded || !decoded.header) {
		throw new Error('Invalid token');
	}

	return provider(decoded.header, decoded.payload);
}

function verify(...args) {
	return new Promise((resolve, reject) => {
		jwt.verify(...args, (error, decoded) => {
			error ? reject(error) : resolve(decoded);
		});
	});
}
