const Koa = require('koa');
const Router = require('@koa/router');
const koaBody = require('koa-body');
const koamysql = require('koa-mysql');
const cors = require('@koa/cors');
const proxy = require('koa-proxies')
const walletDao = require('../mysql/walletDao.js')
const jsonwebtoken = require('jsonwebtoken');

const wallet = new Koa();
const walletRouter = new Router();

walletRouter
  .get('/:id',cors(), async (ctx) => {
    const { id } = ctx.params;
    let data = await walletDao.getWalletById(id)
    ctx.body = {
        "code": 1,
        "data": data,
        "mesg": 'ok'
    }
  })

  wallet.use(walletRouter.routes());
  wallet.use(walletRouter.allowedMethods());

  module.exports = wallet;
