import { IService } from "../../../../core/domain/interface/IService";
import { TokenRepository } from "../../infra/repository/TokenRepository";

export class LogoffService implements IService {
  async execute(id: string) {
    try {
      const repository = new TokenRepository();
      const deleteTokenNow = await repository.tokenDelete(id);

      return deleteTokenNow;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }
}
