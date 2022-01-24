import { IService } from "../../../../core/domain/interface/IService";
import { TokenRepository } from "../../infra/repository/TokenRepository";

export class GetTokenService implements IService {
  async execute(id: string) {
    try {
      const repository = new TokenRepository();
      const activeToken = await repository.tokenGet(id);

      return activeToken;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }
}
