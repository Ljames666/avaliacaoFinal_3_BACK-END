import { UserRepository } from '../../../../../src/features/users/infra/repository/UserRepository';
import { TokenRepository } from '../../../../../src/features/authentication/infra/repository/TokenRepository';
import { LogoffService } from '../../../../../src/features/authentication/domain/services/LogoffService';
import { DatabaseConnection } from '../../../../../src/core/infra/database/connection/connection';
import { v4 } from 'uuid';

describe('logoff service tests', () => {
  jest.mock('../../../../../src/features/authentication/infra/repository/TokenRepository');

  const makeSut = () => {
    const tokenRepo = new TokenRepository();

    const sut = new LogoffService(tokenRepo);
    return sut;
  };

  beforeAll(async () => await DatabaseConnection.serverConnection());

  afterAll(async () => await DatabaseConnection.closeConnection());

  beforeEach(() => jest.clearAllMocks());

  test('should return Error if not find token', async () => {
    jest.spyOn(TokenRepository.prototype, 'findOneToken');
    const sut = makeSut();

    try {
      await sut.execute(`${v4()}`);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      const err = error as Error;
      expect(err.message).toEqual(`Error: User logoff`);
    }
  });
});
