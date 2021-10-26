const Koa = require('koa');
const Router = require('@koa/router');
const koaBody = require('koa-body');
const koamysql = require('koa-mysql');
const cors = require('@koa/cors');
const proxy = require('koa-proxies')
const mysql = require('../mysql/index.js')
const bcrypt = require('bcrypt');
const jwt = require('koa-jwt');
const jsonwebtoken = require('jsonwebtoken');

const users = new Koa();
const userRouter = new Router();
const secret = process.env.JWT_SECRET || 'jwt_secret';
const salt = 5;

userRouter
  .get('/', cors(), async (ctx) => {
    let data = await mysql.allUsers()
    ctx.body = {
        "code": 1,
        "data": data,
        "mesg": 'ok'
    }
  })
  .get('/:id',cors(), async (ctx) => {
    const { id } = ctx.params;
    console.log(`Get user with id ${id}`);
    let data = await mysql.getById(id)
    ctx.body = {
        "code": 1,
        "data": data,
        "mesg": 'ok'
    }
  })
  .post('/login', cors(), koaBody(),async ctx => {
    const { email, password } = ctx.request.body;
    const passwordHashed = await mysql.getPasswordByEmail(email);
    if(passwordHashed){
      const validPassword = await bcrypt.compare(password, passwordHashed.Password);
      if(validPassword){
        ctx.status = 200;
        ctx.body = {
          code: 1,
          token: jsonwebtoken.sign({
          data: email,
          //exp in seconds
          exp: Math.floor(Date.now() / 1000) - (60 * 60) // 60 seconds * 60 minutes = 1 hour
        }, secret),
        id:passwordHashed.ID
        }
      }
      else{
        ctx.status = 200;
        ctx.body = {
          code: 0,
          message: 'Wrong Password'
        }
      }
    }
    else{
      ctx.status = 200;
      ctx.body = {
        code: 0,
        message: 'Wrong Credentials'
      }
    }
  })
  .post('/public/register', cors(), koaBody(), async ctx => {
    const { username, email, password } = ctx.request.body;
    password2 = await bcrypt.hash(password, salt);
    const emailCheck = await mysql.getByEmail(email);
    if(emailCheck == null){
    let data = await mysql.register(username, email, password2)
    console.log("data register",data)
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
  }
  else {
    ctx.status = 200;
    ctx.body = {
      code: 0,
      message: 'Email exists'
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
// var options = {
//   origin: true,
//   methods: 'GET,HEAD,PUT,POST,DELETE'
// };
users.use(cors({
    origin: '*'
}));

users.use(jwt({
  secret: secret
}).unless({
  path: [/^\/public/]
}));

users.use(async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    await next();
});

module.exports = users;
