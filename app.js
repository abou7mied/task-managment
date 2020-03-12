require('dotenv').config();

const Koa = require('koa');
const koaBody = require('koa-body');
const {TYPES} = require('./src/common');
const {container} = require('./inversify.config');
const routerFactory = require('./routes');

const app = new Koa();
const router = routerFactory(container);
const database = container.get(TYPES.Database);

app.use(koaBody());
app.use(router.routes());
app.use(router.allowedMethods());

(async () => {
  await database.connect();
  const {HTTP_PORT} = process.env;
  app.listen(HTTP_PORT, () => {
    console.log(`Server started on port ${HTTP_PORT}`);
  });
})();
