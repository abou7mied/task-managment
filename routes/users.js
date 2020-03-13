const Router = require('@koa/router');
const {TYPES} = require('../src/common');
const {wrapResponseBody} = require('./helpers');
const validator = require('./validator');
const schema = require("./schema/users");

function init(container) {
  const database = container.get(TYPES.Database);
  const router = new Router();

  router.get('/', validator(schema.getUsers, false), async (ctx) => {
    const {query} = ctx.request;
    const result = await database.findUsers(query);
    ctx.body = wrapResponseBody(result);
  });

  router.post('/', validator(schema.postUser, true), async (ctx) => {
    const {body} = ctx.request;
    const user = await database.createUser(body);
    ctx.body = wrapResponseBody({
      user: user.toJSON(),
    });
  });

  return router;
}

module.exports = init;
