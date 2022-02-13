import { UserRepository } from '../../../../../src/features/users/infra/repository/UserRepository';
import { CreateUserService } from '../../../../../src/features/users/domain/services/CreateUserService';
import { DatabaseConnection } from '../../../../../src/core/infra/database/connection/connection';
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

  test('should return error if password and repeated password do not match', async () => {
    const sut = makeSut();
    expect.assertions(2);

    try {
      await sut.execute({
        name: 'teste',
        username: 'joy',
        email: 'joy@teste.com',
        password: '123',
        reppeatPassword: '321',
      });
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      const err = error as Error;
      expect(err.message).toEqual(`Passwords don't match!`);
    }
  });

  const makeUser = async () => {
    const user = {
      name: 'teste',
      username: 'joy',
      email: 'joy@teste.com',
      password: '123',
    };

    const newUser = await new UserRepository().create(user);
    return newUser;
  };

  test('should return error if it has the same name', async () => {
    jest.spyOn(UserRepository.prototype, 'findOne').mockResolvedValue(makeUser());
    const sut = makeSut();
    expect.assertions(2);

    try {
      await sut.execute({
        name: 'teste',
        username: 'joy',
        email: 'joy@teste.com',
        password: '123',
        reppeatPassword: '123',
      });
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      const err = error as Error;
      expect(err.message).toEqual(`User already exists, please choose another one!`);
    }
  });
});
