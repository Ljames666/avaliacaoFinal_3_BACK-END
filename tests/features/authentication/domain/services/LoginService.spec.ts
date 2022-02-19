import { UserRepository } from '../../../../../src/features/users/infra/repository/UserRepository';
import { TokenRepository } from '../../../../../src/features/authentication/infra/repository/TokenRepository';
import { LoginService } from '../../../../../src/features/authentication/domain/services/LoginService';
import { DatabaseConnection } from '../../../../../src/core/infra/database/connection/connection';
import { v4 } from 'uuid';

describe('login service tests', () => {
  jest.mock('../../../../../src/features/users/infra/repository/UserRepository');
  jest.mock('../../../../../src/features/authentication/infra/repository/TokenRepository');

  const makeSut = () => {
    const tokenRepo = new TokenRepository();
    const userRepo = new UserRepository();
    const sut = new LoginService(tokenRepo, userRepo);
    return sut;
  };
  beforeAll(async () => await DatabaseConnection.serverConnection());

  afterAll(async () => await DatabaseConnection.closeConnection());

  beforeEach(() => jest.clearAllMocks());

  test('should return Error if not find user', async () => {
    jest.spyOn(UserRepository.prototype, 'bindUserToToken');
    const sut = makeSut();

    try {
      await sut.execute({
        username: 'lalalala',
        password: '4321',
      });
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      const err = error as Error;
      expect(err.message).toEqual(`not found!`);
    }
  });
  test('should return Token if you find user', async () => {
    jest.spyOn(UserRepository.prototype, 'bindUserToToken').mockResolvedValue({
      userLogon: 'lalalala',
      user_id: `${v4()}`,
    });
    const sut = makeSut();
    expect.assertions(1);
    try {
      const result = await sut.execute({
        username: 'lalalala',
        password: '4321',
      });
      expect(result).not.toBeFalsy();
    } catch (error) {}
  });
});
