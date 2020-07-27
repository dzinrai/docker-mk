const Router = require('@koa/router');


const router = new Router();

require('./me').register(router);
require('./logs').register(router);

module.exports = router.routes();