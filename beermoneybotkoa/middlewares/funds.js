const Koa = require('koa');
const Router = require('@koa/router');
const koaBody = require('koa-body');
const koamysql = require('koa-mysql');
const cors = require('@koa/cors');
const proxy = require('koa-proxies')
const fundDao = require('../mysql/fundDao.js')
const jsonwebtoken = require('jsonwebtoken');

const funds = new Koa();
const fundsRouter = new Router();

fundsRouter
  .get('/:id',cors(), async (ctx) => {
    const { id } = ctx.params;
    let data = await fundDao.getFundById(id)
    ctx.body = {
        "code": 1,
        "data": data,
        "mesg": 'ok'
    }
  })

  funds.use(fundsRouter.routes());
  funds.use(fundsRouter.allowedMethods());

  module.exports = funds;
