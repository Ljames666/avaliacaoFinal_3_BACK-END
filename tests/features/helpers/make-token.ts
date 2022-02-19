import { v4 } from 'uuid';
import { TokenRepository } from '../../../src/features/authentication/infra/repository/TokenRepository';
import { makeUser } from './make-user';

export const makeToken = async () => {
  const user = await makeUser().then((user) => user.newUser);

  const token = {
    userLogon: `${user.username}`,
    user_id: `${user.id}`,
  };
  const repo = new TokenRepository();

  const newToken = await repo.tokenCreate(token);
  return { newToken };
};
