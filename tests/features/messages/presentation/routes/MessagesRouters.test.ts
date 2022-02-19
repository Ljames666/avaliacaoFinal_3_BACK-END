import request from 'supertest';
import { v4 } from 'uuid';

import { DatabaseConnection } from '../../../../../src/core/infra/database/connection/connection';
import { RedisConnection } from '../../../../../src/core/infra/database/connection/redis-connection';
import { createServer } from '../../../../../src/core/presentation/init-server';
import { makeMessage } from '../../../helpers/make-message';
import { makeToken } from '../../../helpers/make-token';

describe('Messages routes, middleware and controllers tests', () => {
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

  test('should return error (404) if headers ["authorization"] is not informed', async () => {
    const token = await makeToken().then((token) => token.newToken);
    await request(app)
      .post(`/messages/${token.user_id}`)
      .expect((response) => {
        expect(response.status).toEqual(404);
        expect(response.body).not.toBeFalsy();
        expect(response.body.message).toEqual('No token provided.');
      });
  });

  test('should return error (401) if headers ["authorization"] is not authenticated.', async () => {
    const token = await makeToken().then((token) => token.newToken);
    await request(app)
      .post(`/messages/${token.user_id}`)
      .set('authorization', `${v4()}`)
      .expect((response) => {
        expect(response.status).toEqual(401);
        expect(response.body).not.toBeFalsy();
        expect(response.body.message).toEqual('Unauthenticated.');
      });
  });

  test('should return error (400) if description already exists.', async () => {
    const token = await makeToken().then((token) => token.newToken);
    const message = await makeMessage(token.user_id).then((message) => message.newMessage);
    await request(app)
      .post(`/messages/${message.user_id}`)
      .set('authorization', `${token.id}`)
      .send({ description: message.description, details: message.details })
      .expect((response) => {
        expect(response.status).toEqual(400);
        expect(response.body).not.toBeFalsy();
        expect(response.body.message).toEqual('Message already exists');
      });
  });

  test('should return (200) if the message is created successfully.', async () => {
    const token = await makeToken().then((token) => token.newToken);

    await request(app)
      .post(`/messages/${token.user_id}`)
      .set('authorization', `${token.id}`)
      .send({ description: `test----${v4()}`, details: `testDetails----${v4()}` })
      .expect((response) => {
        expect(response.status).toEqual(200);
        expect(response.body).not.toBeFalsy();
        expect(response.body.error).toBeFalsy();
      });
  });

  test('should return  (200) for GetMessageById.', async () => {
    const token = await makeToken().then((token) => token.newToken);
    const message = await makeMessage(token.user_id).then((message) => message.newMessage);
    await request(app)
      .get(`/messages/${message.user_id}`)
      .set('authorization', `${token.id}`)
      .expect((response) => {
        expect(response.status).toEqual(200);
        expect(response.body).not.toBeFalsy();
        expect(response.body.error).toBeFalsy();
      });

    await request(app)
      .get(`/messages/${message.user_id}`)
      .set('authorization', `${token.id}`)
      .expect((response) => {
        expect(response.status).toEqual(200);
        expect(response.body).not.toBeFalsy();
        expect(response.body.error).toBeFalsy();
      });
  });

  test('should return status (200) if it modified registered Message by id', async () => {
    const token = await makeToken().then((token) => token.newToken);
    const message = await makeMessage(token.user_id).then((message) => message.newMessage);
    await request(app)
      .put(`/messages/${message.id}`)
      .set('authorization', `${token.id}`)
      .send({
        description: `joy ${v4()}`,
        details: `joy32 - ${v4()}`,
      })
      .expect((response) => {
        expect(response.status).toEqual(200);
        expect(response.body).not.toBeFalsy();
        expect(response.body.error).toBeFalsy();
      });
  });

  test('should return status (200) if it delete registered message', async () => {
    const token = await makeToken().then((token) => token.newToken);
    const message = await makeMessage(token.user_id).then((message) => message.newMessage);
    await request(app)
      .delete(`/messages/${message.id}`)
      .set('authorization', `${token.id}`)
      .expect((response) => {
        expect(response.status).toEqual(200);
        expect(response.body).not.toBeFalsy();
        expect(response.body.error).toBeFalsy();
      });
  });
});
