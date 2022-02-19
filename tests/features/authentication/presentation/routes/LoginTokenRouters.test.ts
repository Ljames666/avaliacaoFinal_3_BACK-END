import request from 'supertest';
import { v4 } from 'uuid';

import { DatabaseConnection } from '../../../../../src/core/infra/database/connection/connection';
import { RedisConnection } from '../../../../../src/core/infra/database/connection/redis-connection';
import { createServer } from '../../../../../src/core/presentation/init-server';
import { makeToken } from '../../../helpers/make-token';
import { makeUser } from '../../../helpers/make-user';

describe('login routes, middleware and controllers tests', () => {
  let app: Express.Application | undefined = undefined;
  beforeAll(async () => {
    await DatabaseConnection.serverConnection();
    RedisConnection.initConnection();

    app = createServer();
  });

  afterAll(async () => {
    await DatabaseConnection.closeConnection();
    RedisConnection.closeConnection();
  });

  test('should return error (418) if fields are not informed', async () => {
    await request(app)
      .post('/login')
      .send({})
      .expect((response) => {
        expect(response.status).toEqual(418);
        expect(response.body).not.toBeFalsy();
        expect(response.body.message).toEqual('There is no way to return a null request');
      });
  });
  test('should return error (400) if password does not exist', async () => {
    const user = await makeUser().then((user) => user.newUser);
    await request(app)
      .post('/login')
      .send({
        username: `${user.username}`,

        password: 'hjhhihh',
      })
      .expect((response) => {
        expect(response.status).toEqual(400);
        expect(response.body).not.toBeFalsy();
        expect(response.body.message).toEqual('password does not exist, try again!');
      });
  });
  test('should return error (406) if username does not exist', async () => {
    const user = await makeUser().then((user) => user.newUser);
    await request(app)
      .post('/login')
      .send({
        username: '234',

        password: `${user.password}`,
      })
      .expect((response) => {
        expect(response.status).toEqual(406);
        expect(response.body).not.toBeFalsy();
        expect(response.body.message).toEqual('username does not exist, try again!');
      });
  });
  test('should return error (404) if username and password does not exists', async () => {
    await request(app)
      .post('/login')
      .send({
        username: 'llllllllllllll',
        password: `435`,
      })
      .expect((response) => {
        expect(response.status).toEqual(404);
        expect(response.body).not.toBeFalsy();
        expect(response.body.message).toEqual('username e password does not exists, try again!');
      });
  });

  test('should return status (200) if user is successfully registered', async () => {
    const user = await makeUser().then((user) => user.newUser);
    await request(app)
      .post('/login')
      .send({
        username: `${user.username}`,
        password: `${user.password}`,
      })

      .expect((response) => {
        expect(response.status).toEqual(200);
        expect(response.body).not.toBeFalsy();

        expect(response.body.error).toBeFalsy();
      });
  });
  test('should return error (404) if token does not exist', async () => {
    const id = v4();
    await request(app)
      .get(`/login/${id}`)
      .expect((response) => {
        expect(response.status).toEqual(404);
        expect(response.body).not.toBeFalsy();
        expect(response.body.message).toEqual(`Error: Authorization is denied for ${id}`);
      });
  });

  test('should return status (200) if it is find token', async () => {
    const newToken = await makeToken().then((token) => token.newToken);
    const thisToken = {
      id: newToken.id,
      userLogon: newToken.userLogon,
      user_id: newToken.user_id,
    };
    await request(app)
      .get(`/login/${newToken.id}`)
      .expect((response) => {
        expect(response.status).toEqual(200);
        expect(response.body).not.toBeFalsy();
        expect(response.body).toMatchObject(thisToken);
        expect(response.body.error).toBeFalsy();
      });
  });
  test('should return error (404) if user does not login', async () => {
    await request(app)
      .delete(`/login/123`)
      .expect((response) => {
        console.log('res_________--------!!!!!!!!', response.status, response.body);

        expect(response.status).toEqual(404);
        expect(response.body).not.toBeFalsy();
        expect(response.body.message).toEqual(`Error: User logoff`);
      });
  });

  test('should return status (200) if token is successfully deleted', async () => {
    const newToken = await makeToken().then((token) => token.newToken.id);
    await request(app)
      .delete(`/login/${newToken}`)
      .expect((response) => {
        expect(response.status).toEqual(200);
        expect(response.body).not.toBeFalsy();
        expect(response.body.error).toBeFalsy();
      });
  });
});
