import request from 'supertest';
import { v4 } from 'uuid';
import { DatabaseConnection } from '../../../../../src/core/infra/database/connection/connection';
import { RedisConnection } from '../../../../../src/core/infra/database/connection/redis-connection';
import { createServer } from '../../../../../src/core/presentation/init-server';
import { makeUser } from '../../../helpers/make-user';

describe('user routes, middleware and controllers tests', () => {
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
  const user = makeUser()
    .then((result) => result.newUser.id)
    .catch((err) => console.log(err));
  test('should return error (418) if fields are not informed', async () => {
    await request(app)
      .post('/cadastro')
      .send({})
      .expect(418)
      .expect((response) => {
        expect(response.body).not.toBeFalsy();
        expect(response.body.message).toEqual('There is no way to return a null request');
      });
  });
  test('should return error (400) if you already have the same username registered', async () => {
    await request(app)
      .post('/cadastro')
      .send({
        name: `joy ${v4()}`,
        username: 'joy32',
        email: 'joy32@teste.com',
        password: '234',
        reppeatPassword: '234',
      })
      .expect(400)
      .expect((response) => {
        expect(response.body).not.toBeFalsy();
        expect(response.body.message).toEqual('username already registered, try another!');
      });
  });

  test('should return status (200) if user is successfully registered', async () => {
    await request(app)
      .post('/cadastro')
      .send({
        name: `joy ${v4()}`,
        username: `joy32 - ${v4()}`,
        email: `joy ${v4()}@teste.com`,
        password: '234',
        reppeatPassword: '234',
      })
      .expect((response) => {
        expect(response.status).toEqual(200);
        expect(response.body).not.toBeFalsy();

        expect(response.body.error).toBeFalsy();
      });
  });

  test('should return status (200) if it finds all registered users', async () => {
    await request(app)
      .get('/cadastro')
      .expect((response) => {
        expect(response.status).toEqual(200);
        expect(response.body).not.toBeFalsy();
        expect(response.body.error).toBeFalsy();
      });
  });

  test('should return status (200) if it find registered user by id', async () => {
    await request(app)
      .get(`/cadastro/${user}`)
      .expect((response) => {
        expect(response.status).toEqual(200);
        expect(response.body).not.toBeFalsy();
        expect(response.body.error).toBeFalsy();
      });
  });
  test('should return status (200) if it modified registered user by id', async () => {
    await request(app)
      .put(`/cadastro/${user}`)
      .send({
        name: `joy ${v4()}`,
        username: `joy32 - ${v4()}`,
        email: `joy ${v4()}@teste.com`,
        password: `${v4()}`,
      })
      .expect((response) => {
        expect(response.status).toEqual(200);
        expect(response.body).not.toBeFalsy();
        expect(response.body.error).toBeFalsy();
      });
  });
  test('should return status (200) if it delete registered user', async () => {
    await request(app)
      .delete(`/cadastro/${user}`)
      .expect((response) => {
        expect(response.status).toEqual(200);
        expect(response.body).not.toBeFalsy();
        expect(response.body.error).toBeFalsy();
      });
  });
});
