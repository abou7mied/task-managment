const Router = require('@koa/router');
const usersRouterFactory = require('./users');
const projectsRouterFactory = require('./projects');
const tasksRouterFactory = require('./tasks');

function init(container) {
  const router = new Router();

  router.get('/', (ctx) => {
    ctx.body = 'Home Page';
  });

  const usersRouter = usersRouterFactory(container);
  const projectsRouter = projectsRouterFactory(container);
  const tasksRouter = tasksRouterFactory(container);

  router.use('/api/users', usersRouter.routes(), usersRouter.allowedMethods());
  router.use('/api/projects', projectsRouter.routes(), projectsRouter.allowedMethods());
  router.use('/api/tasks', tasksRouter.routes(), tasksRouter.allowedMethods());

  return router;
}

module.exports = init;
