import { UserRepository } from '../../../../../src/features/users/infra/repository/UserRepository';
import { GetUserByIdService } from '../../../../../src/features/users/domain/services/GetUserServices';
import { DatabaseConnection } from '../../../../../src/core/infra/database/connection/connection';
import { v4 } from 'uuid';
describe('create user service test', () => {
  jest.mock('../../../../../src/features/users/infra/repository/UserRepository');

  const makeSut = () => {
    const repository = new UserRepository();
    const sut = new GetUserByIdService(repository);
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

  test('should return user if user is exists', async () => {
    jest.disableAutomock();
    const sut = makeSut();

    const result = await sut.execute(`${(await makeUser()).id}`);
    expect(result).toBeTruthy();
    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('name');
    expect(result).toHaveProperty('username');
    expect(result).toHaveProperty('email');
    expect(result).toHaveProperty('password');
    expect(result).toHaveProperty('created_at');
    expect(result).toHaveProperty('updated_at');
    expect(result).toHaveProperty('messages', []);
  });
});
