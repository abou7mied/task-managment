const Router = require('@koa/router');
const {TYPES} = require('../src/common');

function init(container) {
  const database = container.get(TYPES.Database);
  const router = new Router();

  router.get('/', async (ctx) => {
    // TODO: validate params
    const {query} = ctx.request;
    ctx.body = await database.findUsers(query);
  });

  router.post('/', async (ctx) => {
    // TODO: validate params
    const {body} = ctx.request;
    ctx.body = await database.createUser(body);
  });

  return router;
}

module.exports = init;
