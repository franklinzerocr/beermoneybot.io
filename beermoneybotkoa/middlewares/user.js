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
  .get('/:id', async (ctx) => {
    const { id } = ctx.params;
    console.log(`Get user with id ${id}`);
    let data = await mysql.getById(id)
    ctx.body = {
        "code": 1,
        "data": data,
        "mesg": 'ok'
    }
  })
  .post('/', koaBody(),async ctx => {
    const { email, password } = ctx.request.body;
    let data = await mysql.login(email, password)
    console.log("data login",data)
    if(data){
      ctx.status = 200;
      ctx.body = {
        code: 1,
        message: 'Succesfull',
        email:data[0]["Email"]
      }
    }else {
      ctx.status = 200;
      ctx.body = {
        code: 0,
        message: 'Failed',
        user: {
          email: data[0]["Email"]
        }
      }
    }
  })
  .put('/:id',koaBody(), async ctx => {
    const { id } = ctx.params;
    const { t_userid, username } = ctx.request.body;
    let data = await mysql.update(t_userid, username,id)
    console.log("update",data)
    if(data){
      ctx.status = 200;
      ctx.body = {
        code: 1,
        message: 'Succesfull'
      }
    }else {
      ctx.status = 200;
      ctx.body = {
        code: 0,
        message: 'Failed'
      }
    }
})


users.use(userRouter.routes());
users.use(userRouter.allowedMethods());

module.exports = users;
