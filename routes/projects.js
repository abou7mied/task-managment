const Router = require('@koa/router');
const {TYPES} = require('../src/common');
const {wrapResponseBody} = require('./helpers');
const validator = require('./validator');
const schema = require("./schema/projects");

function init(container) {
  const database = container.get(TYPES.Database);
  const router = new Router();

  router.get('/', validator(schema.getProjects, false), async (ctx) => {
    const {query} = ctx.request;
    const result = await database.findProjects(query);
    ctx.body = wrapResponseBody(result);
  });

  router.post('/', validator(schema.postProject, true), async (ctx) => {
    const {body} = ctx.request;
    const project = await database.createProject(body);
    ctx.body = wrapResponseBody({
      project: project.toJSON(),
    });
  });

  return router;
}

module.exports = init;
