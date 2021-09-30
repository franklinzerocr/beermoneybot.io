'use strict';

const Koa = require('koa');
var config = require('./mysql/config.js')
const koaBody = require('koa-body');
const mount = require('koa-mount');
const { resolve } = require('path');

const app = new Koa();

app.use(async(ctx,next) => {
  console.log("first action")
  await next()
  console.log("second action")
})

const users = require(resolve(__dirname, 'middlewares', 'user'));
app.use(mount('/users', users));

app.listen(config.port);
