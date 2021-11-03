'use strict';
require('dotenv/config')
require('./index')
const Koa = require('koa');
const cors = require('@koa/cors');
const users = require('./Services/user.js')
const wallet = require('./Services/wallet.js')
const operation = require('./Services/operation.js')
const trading = require('./Services/trading_pool.js')
const funds = require('./Services/funds.js')
const koaBody = require('koa-body');
const mount = require('koa-mount');

const app = new Koa();

app.use(async(ctx,next) => {
  console.log("first action")
  await next()
  console.log("second action")
})

app.use(mount('/users', users));
app.use(mount('/wallet', wallet));
app.use(mount('/operation', operation));
app.use(mount('/trading', trading));
app.use(mount('/fund', funds));
app.use(cors({
    origin: '*'
}));
app.listen(process.env.PORT);
