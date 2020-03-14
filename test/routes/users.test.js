const {database, request, app} = require('../common');

beforeAll(async () => {
  await database.connect();
  const models = Object.values(database.models);
  await Promise.all(models.map((model) => model.truncate({cascade: true})));
});

afterAll(async () => {
  app.close();
  await database.close();
});

describe('create user with missing fields', () => {
  it('should responds with fields is missing', async () => {
    const response = await request.post('/api/users');
    expect(response.status).toEqual(400);
    expect(response.body.status).toEqual('error');
    expect(response.body.error).toMatch(/required|missing/);
  });

  it('should not accept empty fields', async () => {
    const response = await request.post('/api/users').send({name: '', email: '', surname: ''});
    expect(response.status).toEqual(400);
    expect(response.body.status).toEqual('error');
    expect(response.body.error).toMatch(/empty/);
  });

  it('should not accept invalid email', async () => {
    const response = await request.post('/api/users').send({
      name: 'username',
      email: 'not-valid-email',
      surname: 'surname'
    });
    expect(response.status).toEqual(400);
    expect(response.body.status).toEqual('error');
    expect(response.body.error).toMatch(/email/);
  });
});

it('should create new user', async () => {
  const newUserInfo = {
    name: 'username',
    email: 'email@example.com',
    surname: 'surname'
  };
  const createUserResponse = await request.post('/api/users').send(newUserInfo);

  expect(createUserResponse.status).toEqual(200);
  expect(createUserResponse.body.status).toMatch(/ok|success/);
  expect(createUserResponse.body.error).toEqual(undefined);
  expect(createUserResponse.body.user).toMatchObject(newUserInfo);

  const listUsersResponse = await request.get('/api/users');
  expect(listUsersResponse.status).toEqual(200);
  expect(listUsersResponse.body.status).toMatch(/ok|success/);
  expect(listUsersResponse.body.rows).toEqual(expect.arrayContaining([expect.objectContaining(newUserInfo)]));

});

describe('list users', () => {
  const newUsers = [
    {
      name: 'user1',
      email: 'email@example.com',
      surname: 'surname1'
    },
    {
      name: 'user2',
      email: 'email@example.com',
      surname: 'surname2'
    },
    {
      name: 'user3',
      email: 'email@example.com',
      surname: 'surname3'
    },
  ];

  beforeAll(async () => {
    await database.models.user.truncate({cascade: true});
    await Promise.all(newUsers.map((user) => {
      return request.post('/api/users').send(user);
    }));
  });

  it('should list all users', async () => {
    const response = await request.get('/api/users');
    const {body} = response;
    expect(body.rows.length).toEqual(newUsers.length);
  });

  it('should filter by name', async () => {
    const queryName = 'user1';
    const response = await request.get('/api/users?name=' + queryName);
    const {body} = response;
    expect(body.rows.length).toBeGreaterThan(0);
    body.rows.forEach(row => {
      expect(row).toMatchObject({
        name: expect.stringMatching(queryName),
      });
    })
  });

  it('should filter by surname', async () => {
    const querySurname = 'surname1';
    const response = await request.get('/api/users?surname=' + querySurname);
    const {body} = response;
    expect(body.rows.length).toBeGreaterThan(0);
    body.rows.forEach(row => {
      expect(row).toMatchObject({
        surname: expect.stringMatching(querySurname),
      });
    })
  });
});
