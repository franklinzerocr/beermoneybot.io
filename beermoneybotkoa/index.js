'use strict';

const Koa = require('koa');
var config = require('./mysql/config.js')
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

app.listen(config.port);
