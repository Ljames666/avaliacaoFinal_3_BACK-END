import { IService } from "../../../../core/domain/interface/IService";
import { UserRepository } from "../../../users/infra/repository/UserRepository";
import { TokenRepository } from "../../infra/repository/TokenRepository";
import { ILoginRequest } from "../interface/ILoginRequest";

export class LoginService implements IService {
  async execute({ username, password }: ILoginRequest) {
    try {
      const repository = new TokenRepository();
      const userRepository = new UserRepository();
      const newLogin = await userRepository.bindUserToToken({ username, password });

      const validateLogin = await repository.tokenCreate(newLogin);

      return validateLogin;
    } catch (error) {
      console.log(error);

      return error;
    }
  }
}
