import { IService } from "../../../../core/domain/interface/IService";
import { TokenRepository } from "../../infra/repository/TokenRepository";

export class GetTokenService implements IService {
  constructor(private repository: TokenRepository) {}
  async execute(id: string) {
    try {
      const activeToken = await this.repository.tokenGet(id);

      if (!activeToken) {
        throw new Error(`Authorization is denied for ${id}`);
      }

      return activeToken;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }
}
