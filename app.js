const Koa = require('koa');
const koaBody = require('koa-body');
const cors = require('@koa/cors');
const routerFactory = require('./routes');

function init(container) {
  const app = new Koa();
  const router = routerFactory(container);

  app.use(koaBody());
  app.use(cors());
  app.use(router.routes());
  app.use(router.allowedMethods());

  return app;
}

module.exports = init;
