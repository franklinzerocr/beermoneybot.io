const Koa = require('koa');
const Router = require('@koa/router');
const koaBody = require('koa-body');
const koamysql = require('koa-mysql');
const cors = require('@koa/cors');
const proxy = require('koa-proxies')
const mysql = require('../mysql/index.js')
const jsonwebtoken = require('jsonwebtoken');

const operation = new Koa();
const operationRouter = new Router();

operationRouter
  .get('/idUser/:id',cors(), async (ctx) => {
    const { id } = ctx.params;
    let data = await mysql.getOperationByIdUser(id)
    ctx.body = {
        "code": 1,
        "data": data,
        "mesg": 'ok'
    }
  })

  operation.use(operationRouter.routes());
  operation.use(operationRouter.allowedMethods());

  module.exports = operation;
