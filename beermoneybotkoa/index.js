'use strict';
require('dotenv/config')
require('./index')
const Koa = require('koa');
const users = require('./middlewares/user.js')
const koaBody = require('koa-body');
const mount = require('koa-mount');

const app = new Koa();

app.use(async(ctx,next) => {
  console.log("first action")
  await next()
  console.log("second action")
})

app.use(mount('/users', users));
app.listen(process.env.PORT);
