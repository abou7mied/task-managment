require('dotenv').config();

const {container} = require('./inversify.config');
const {TYPES} = require('./src/common');
const appFactory = require('./app');

const database = container.get(TYPES.Database);

(async () => {
  await database.connect();
  const {HTTP_PORT = 3000} = process.env;
  const app = appFactory(container);
  app.listen(HTTP_PORT, () => {
    console.log(`Server started on port ${HTTP_PORT}`);
  });
})();
