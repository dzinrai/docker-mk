let koa = require('koa');
const Router = require('@koa/router');
//const connection = "mongodb://localhost:27017";
//const db = require('@paralect/node-mongo').connect(connection);
const router = new Router();
const bodyParser = require('koa-bodyparser');
var app = new koa();

async function handler(ctx) {
  const data = ctx.request.body;
  console.log(data);
}

router
  .get('/', async (ctx, next) => {
    ctx.body = 'hihi';
    return next();
  })
  .post('/logs', async (ctx, next) => {
    console.log(ctx.request.body);
    ctx.body = 'hihi';
    return next();
  });

//app.use(bodyParser());
app.listen(3000); 