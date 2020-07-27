let koa = require('koa');
const Router = require('@koa/router');
const connection = "mongodb://mk-mongo/docker";
const db = require('@paralect/node-mongo').connect(connection, function(err, db) {
  if (err) {
    throw err;
  }
  console.log('db connected');
  db.close();
});
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
    ctx.body = usersService.findOne({});
    return next();
  })
  .post('/logs', async (ctx, next) => {
    try {
      const value = await schema.validateAsync(ctx.request.body);
      console.log(value);
      ctx.body = value;
      logsService.create(value);
    } catch (e) {
      console.log(e);
    }
    return next();
  })
  .get('/logs', async (ctx, next) => {
    ctx.body = logsService.find({});
    return next();
  })
  .get('/', async (ctx, next) => {
    ctx.body = usersService.find({});
    return next();
  });

app
  .use(bodyParser())
  .use(router.routes())
app.listen(3071); 