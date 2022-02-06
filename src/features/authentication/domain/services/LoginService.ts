import { IService } from "../../../../core/domain/interface/IService";
import { UserRepository } from "../../../users/infra/repository/UserRepository";
import { TokenRepository } from "../../infra/repository/TokenRepository";
import { ILoginRequest } from "../interface/ILoginRequest";

export class LoginService implements IService {
  constructor(private repository: TokenRepository, private userRepository: UserRepository) {}
  async execute({ username, password }: ILoginRequest) {
    try {
      const newLogin = await this.userRepository.bindUserToToken({ username, password });

      if (!newLogin) throw new Error("not found!");

      const validateLogin = await this.repository.tokenCreate(newLogin);

      return validateLogin;
    } catch (error) {
      console.log(error);

      return error;
    }
  }
}
