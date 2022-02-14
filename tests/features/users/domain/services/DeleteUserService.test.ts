import { UserRepository } from '../../../../../src/features/users/infra/repository/UserRepository';
import { DeleteUserService } from '../../../../../src/features/users/domain/services/DeleteUserService';
import { DatabaseConnection } from '../../../../../src/core/infra/database/connection/connection';
import { v4 } from 'uuid';
describe('delete user service test', () => {
  jest.mock('../../../../../src/features/users/infra/repository/UserRepository');

  const makeSut = () => {
    const repository = new UserRepository();
    const sut = new DeleteUserService(repository);
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

  test('should return underfined if  matching id exists and deleted user', async () => {
    const sut = makeSut();

    const result = await sut.execute(`${(await makeUser()).id}`);

    expect(result).toBeTruthy();
  });
});
