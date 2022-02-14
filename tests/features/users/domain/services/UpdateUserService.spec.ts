import { UserRepository } from '../../../../../src/features/users/infra/repository/UserRepository';
import { UpdateUserService } from '../../../../../src/features/users/domain/services/UpdateUserService';
import { DatabaseConnection } from '../../../../../src/core/infra/database/connection/connection';
describe('update user service test', () => {
  jest.mock('../../../../../src/features/users/infra/repository/UserRepository');

  const makeSut = () => {
    const repository = new UserRepository();
    const sut = new UpdateUserService(repository);
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
      await sut.execute({
        id: 'any',
        name: 'teste',
        username: 'joy',
        email: 'joy@teste.com',
        password: '123',
      });
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      const err = error as Error;
      expect(err.message).toEqual(`user does not exist`);
    }
  });
});
