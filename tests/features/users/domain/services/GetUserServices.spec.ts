import { UserRepository } from '../../../../../src/features/users/infra/repository/UserRepository';
import { GetUserByIdService } from '../../../../../src/features/users/domain/services/GetUserServices';
import { DatabaseConnection } from '../../../../../src/core/infra/database/connection/connection';
import { v4 } from 'uuid';

describe('Get user by id service test', () => {
  jest.mock('../../../../../src/features/users/infra/repository/UserRepository');

  const makeSut = () => {
    const repository = new UserRepository();
    const sut = new GetUserByIdService(repository);
    return sut;
  };

  beforeAll(async () => await DatabaseConnection.serverConnection());

  afterAll(async () => await DatabaseConnection.closeConnection());

  beforeEach(() => jest.clearAllMocks());

  test('should return error  if there is no user', async () => {
    jest.spyOn(UserRepository.prototype, 'getById').mockResolvedValue(undefined);
    const sut = makeSut();
    expect.assertions(2);

    try {
      await sut.execute(`${v4()}`);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      const err = error as Error;
      expect(err.message).toEqual(`No user`);
    }
  });
});
