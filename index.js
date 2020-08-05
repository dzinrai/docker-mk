let koa = require('koa');
const Router = require('@koa/router');
const connection = "mongodb://mk-mongo/docker";
const db = require('@paralect/node-mongo').connect(connection);

const usersService = db.createService('users');
const logsService = db.createService('logs');

const router = new Router();
const Joi = require('@hapi/joi');
const schema = Joi.object({
  event: Joi.string().required(),
}).unknown();
const bodyParser = require('koa-bodyparser');
var app = new koa();

async function handler(ctx) {
  const data = ctx.request.body;
  console.log(data);
}

router
  .get('/me', async (ctx, next) => {
    ctx.body = await usersService.findOne({});
    return next();
  })
  .post('/logs', async (ctx, next) => {
    try {
      const value = await schema.validateAsync(ctx.request.body);
      console.log(value);
      const val = await logsService.create(value);
      console.log(val);
      ctx.body = value; 
    } catch (e) {
      console.log(e);
    }
    return next();
  })
  .get('/logs', async (ctx, next) => {
    ctx.body = await logsService.find({});
    return next();
  });

app
  .use(bodyParser())
  .use(router.routes())
app.listen(3071); 