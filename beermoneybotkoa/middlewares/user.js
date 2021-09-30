const Koa = require('koa');
const Router = require('@koa/router');
const koaBody = require('koa-body');
const koamysql = require('koa-mysql');
const mysql = require('../mysql/index.js')

const users = new Koa();
const userRouter = new Router();

userRouter
  .get('/', async (ctx) => {
    let data = await mysql.allUsers()
    ctx.body = {
        "code": 1,
        "data": data,
        "mesg": 'ok'
    }
  })

users.use(userRouter.routes());
users.use(userRouter.allowedMethods());

module.exports = users;
