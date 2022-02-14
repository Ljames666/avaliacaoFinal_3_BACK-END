import { UserRepository } from '../../../../../src/features/users/infra/repository/UserRepository';
import { DeleteUserService } from '../../../../../src/features/users/domain/services/DeleteUserService';
import { DatabaseConnection } from '../../../../../src/core/infra/database/connection/connection';
describe('delete user service test', () => {
  jest.mock('../../../../../src/features/users/infra/repository/UserRepository');

  const makeSut = () => {
    const repository = new UserRepository();
    const sut = new DeleteUserService(repository);
    return sut;
  };

  beforeAll(async () => await DatabaseConnection.serverConnection());

  afterAll(async () => await DatabaseConnection.closeConnection());

  beforeEach(() => jest.clearAllMocks());

  test('should return error if no matching id exists', async () => {
    jest.spyOn(UserRepository.prototype, 'findOne').mockResolvedValue(undefined);
    const sut = makeSut();
    expect.assertions(2);

    try {
      await sut.execute('any');
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      const err = error as Error;
      expect(err.message).toEqual(`User does not exist`);
    }
  });
});
