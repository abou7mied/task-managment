const Router = require('@koa/router');
const {TYPES} = require('../src/common');
const {wrapResponseBody} = require('./helpers');
const validator = require('./validator');
const schema = require("./schema/tasks");

function init(container) {
  const database = container.get(TYPES.Database);
  const router = new Router();

  router.get('/', validator(schema.getTasks, false), async (ctx) => {
    const {query} = ctx.request;
    const result = await database.findTasks(query);
    ctx.body = wrapResponseBody(result);
  });

  router.post('/', validator(schema.postTask, true), async (ctx) => {
    const {body} = ctx.request;
    const task = await database.createTask(body);
    ctx.body = wrapResponseBody({
      task: task.toJSON(),
    });
  });

  return router;
}

module.exports = init;
