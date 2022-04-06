import { IService } from '../../../../core/domain/interface/IService';
import { UserRepository } from '../../../users/infra/repository/UserRepository';
import { TokenRepository } from '../../infra/repository/TokenRepository';
import { ILoginRequest } from '../interface/ILoginRequest';

export class LoginService implements IService {
  constructor(private repository: TokenRepository, private userRepository: UserRepository) {}
  async execute({ username, password }: ILoginRequest) {
    try {
      const newLogin = await this.userRepository.bindUserToToken({ username, password });

      const validateLogin = await this.repository.tokenCreate({
        userLogon: newLogin.username,
        user_id: newLogin.id,
      });

      const userToToken = {
        role: 'user',
        data: {
          access_token: validateLogin.id,
          displayName: newLogin.name,
          photoURL: `https://avatars.dicebear.com/api/croodles-neutral/${newLogin.username}.svg`,
          email: newLogin.email,
          shortcuts: ['calendar', 'mail', 'contacts', 'todo'],
        },
        user: newLogin,
      };

      return userToToken;
    } catch (error) {
      console.log(error);

      return error;
    }
  }
}
