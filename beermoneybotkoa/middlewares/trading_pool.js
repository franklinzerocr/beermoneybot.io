const Koa = require('koa');
const Router = require('@koa/router');
const koaBody = require('koa-body');
const koamysql = require('koa-mysql');
const cors = require('@koa/cors');
const proxy = require('koa-proxies')
const tradingDao = require('../mysql/tradingDao.js')
const jsonwebtoken = require('jsonwebtoken');

const trading = new Koa();
const tradingRouter = new Router();

tradingRouter
  .get('/:id',cors(), async (ctx) => {
    const { id } = ctx.params;
    let data = await tradingDao.getTradingPoolById(id)
    ctx.body = {
        "code": 1,
        "data": data,
        "mesg": 'ok'
    }
  })

  trading.use(tradingRouter.routes());
  trading.use(tradingRouter.allowedMethods());

  module.exports = trading;
