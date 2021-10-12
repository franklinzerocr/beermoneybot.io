const koaJwt = require('koa-jwt');

module.exports = koaJwt({
  secret: 'JUST TEST', // Should not be hardcoded
});
