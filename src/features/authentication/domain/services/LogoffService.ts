import { IService } from '../../../../core/domain/interface/IService';
import { TokenRepository } from '../../infra/repository/TokenRepository';

export class LogoffService implements IService {
  constructor(private repository: TokenRepository) {}
  async execute(id: string) {
    try {
      const token = await this.repository.findOneToken(id);
      if (!token) {
        throw new Error('User logoff');
      }

      const deleteTokenNow = await this.repository.tokenDelete(token.id);

      return deleteTokenNow;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }
}
