require('dotenv').config();

const {container} = require('./inversify.config');
const {TYPES} = require('./src/common');
const appFactory = require('./app');

const database = container.get(TYPES.Database);

(async () => {
  await database.connect();
  const HTTP_PORT = process.env.HTTP_PORT || process.env.PORT || 3000;
  const app = appFactory(container);
  app.listen(HTTP_PORT, () => {
    console.log(`Server started on port ${HTTP_PORT}`);
  });
})();
