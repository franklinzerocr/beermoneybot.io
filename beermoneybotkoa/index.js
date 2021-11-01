'use strict';
require('dotenv/config')
require('./index')
const Koa = require('koa');
const cors = require('@koa/cors');
const users = require('./middlewares/user.js')
const wallet = require('./middlewares/wallet.js')
const koaBody = require('koa-body');
const mount = require('koa-mount');

const app = new Koa();

app.use(async(ctx,next) => {
  console.log("first action")
  await next()
  console.log("second action")
})

app.use(mount('/users', users));
app.use(mount('/wallet', wallet));
app.use(cors({
    origin: '*'
}));
app.listen(process.env.PORT);
