const Router = require('@koa/router');
const {TYPES} = require('../src/common');
const {wrapResponseBody} = require('./helpers');

function init(container) {
  const database = container.get(TYPES.Database);
  const router = new Router();

  router.get('/', async (ctx) => {
    // TODO: validate params
    const {query} = ctx.request;
    const result = await database.findTasks(query);
    ctx.body = wrapResponseBody(result);
  });

  router.post('/', async (ctx) => {
    // TODO: validate params
    const {body} = ctx.request;
    const result = await database.createTask(body);
    ctx.body = wrapResponseBody(result);
  });

  return router;
}

module.exports = init;
