import { UserRepository } from '../../../../../src/features/users/infra/repository/UserRepository';
import { UpdateUserService } from '../../../../../src/features/users/domain/services/UpdateUserService';
import { DatabaseConnection } from '../../../../../src/core/infra/database/connection/connection';
import { v4 } from 'uuid';
describe('update user service test', () => {
  jest.mock('../../../../../src/features/users/infra/repository/UserRepository');

  const makeSut = () => {
    const repository = new UserRepository();
    const sut = new UpdateUserService(repository);
    return sut;
  };
  const makeUser = async () => {
    const user = {
      name: `${v4}`,
      username: 'joy',
      email: 'joy@teste.com',
      password: '123',
    };
    const repo = new UserRepository();

    const newUser = await repo.create(user);
    return newUser;
  };

  beforeAll(async () => await DatabaseConnection.serverConnection());

  afterAll(async () => await DatabaseConnection.closeConnection());

  beforeEach(() => jest.clearAllMocks());

  test('should return modified user if  matching id exists', async () => {
    const sut = makeSut();
    const user = {
      name: `teste-${v4()}`,
      username: `joy-${v4()}`,
      email: 'joy@teste.com',
      password: '123' + `${v4()}`,
    };

    const result = await sut.execute({
      id: `${(await makeUser()).id}`,
      name: user.name,
      username: user.username,
      email: user.email,
      password: user.password,
    });

    expect(result).toBeTruthy();
    expect(result.id).toBeDefined();
    expect(result.name).toEqual(user.name);
    expect(result.username).toEqual(user.username);
    expect(result.email).toEqual(user.email);
  });
});
