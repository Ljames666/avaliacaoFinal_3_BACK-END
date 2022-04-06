import { IService } from '../../../../core/domain/interface/IService';
import { UserRepository } from '../../../users/infra/repository/UserRepository';
import { TokenRepository } from '../../infra/repository/TokenRepository';

export class GetTokenService implements IService {
  constructor(private repository: TokenRepository, private userRepository: UserRepository) {}
  async execute(id: string) {
    try {
      const activeToken = await this.repository.findOneToken(id);
      const user = await this.userRepository.findOne(activeToken.user_id);
      if (!activeToken) {
        throw new Error(`Authorization is denied for ${id}`);
      }
      const userToToken = {
        role: 'user',
        access_token: activeToken.id,
        data: {
          displayName: user.name,
          photoURL: `https://avatars.dicebear.com/api/croodles-neutral/${user.username}.svg`,
          email: user.email,
          shortcuts: ['calendar', 'mail', 'contacts', 'todo'],
        },
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          created_at: user.created_at,
        },
      };
      return userToToken;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }
}
