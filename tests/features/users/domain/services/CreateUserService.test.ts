import { UserRepository } from '../../../../../src/features/users/infra/repository/UserRepository';
import { CreateUserService } from '../../../../../src/features/users/domain/services/CreateUserService';
import { DatabaseConnection } from '../../../../../src/core/infra/database/connection/connection';
import { v4 } from 'uuid';
describe('create user service test', () => {
  jest.mock('../../../../../src/features/users/infra/repository/UserRepository');

  const makeSut = () => {
    const repository = new UserRepository();
    const sut = new CreateUserService(repository);
    return sut;
  };

  beforeAll(async () => await DatabaseConnection.serverConnection());

  afterAll(async () => await DatabaseConnection.closeConnection());

  beforeEach(() => jest.clearAllMocks());

  test('should return user if user is created', async () => {
    const sut = makeSut();

    const user = {
      name: `${v4()}`,
      username: 'joy32',
      email: 'joy32@teste.com',
      password: '234',
      reppeatPassword: '234',
    };

    const result = await sut.execute(user);
    expect(result).toBeTruthy();
    expect(result.id).toBeDefined();
    expect(result.name).toEqual(user.name);
    expect(result.username).toEqual(user.username);
    expect(result.email).toEqual(user.email);
  });
});
