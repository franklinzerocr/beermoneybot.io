'use strict';

const Koa = require('koa');
const Router = require('@koa/router');
const json = require('koa-json');
const koamysql = require('koa-mysql');
const mysql = require('./mysql')

const app = new Koa();
const router = new Router();

app.use(async(ctx,next) => {
  console.log("first action")
  await next()
  console.log("second action")
})

app.use(json())
//app.use(async ctx => (ctx.body ={msg: 'Hello karli'}))

router.get('/test', ctx => {
  ctx.body ={name:'Hello Test!!!'};
})

router.post('/px/:id', ctx => {
  ctx.body = ctx.request.req;
  return (ctx.status = 201)
})

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3001);
