import { v4 } from 'uuid';
import { UserRepository } from '../../../src/features/users/infra/repository/UserRepository';

export const makeUser = async () => {
  const user = {
    name: `jam-${v4()}`,
    username: `joy${v4()}`,
    email: `joy${v4()}@teste.com`,
    password: '123',
  };
  const repo = new UserRepository();

  const newUser = await repo.create(user);
  return { newUser };
};
