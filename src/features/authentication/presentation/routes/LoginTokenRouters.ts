import { Request, Response, Router } from 'express';
import { requestProprietary } from '../../../../core/infra/Middlewares/middlewares';
import { RouterContract } from '../../../../core/presentation/contracts/routeContract';
import { validateLogin } from '../../infra/middlewares/validateLogin';
import { UserRepository } from '../../../users/infra/repository/UserRepository';
import { TokenRepository } from '../../infra/repository/TokenRepository';
import { GetTokenController } from '../../presentation/controllers/GetTokenController';
import { LoginController } from '../../presentation/controllers/LoginController';
import { LogoffController } from '../../presentation/controllers/logoffController';
import { LoginService } from '../../domain/services/LoginService';
import { GetTokenService } from '../../domain/services/GetTokenService';
import { LogoffService } from '../../domain/services/LogoffService';

export class AuthRoutes implements RouterContract {
  static getRoutes() {
    const userRepository = new UserRepository();
    const tokenRepository = new TokenRepository();

    const loginService = new LoginService(tokenRepository, userRepository);
    const loginController = new LoginController(loginService);

    const getTokenService = new GetTokenService(tokenRepository, userRepository);
    const getTokenController = new GetTokenController(getTokenService);

    const logoffService = new LogoffService(tokenRepository);
    const logoffController = new LogoffController(logoffService);

    const router = Router();
    router.use(requestProprietary);

    router.post('/', validateLogin, (req: Request, res: Response) => {
      loginController.handle(req, res);
    });

    router.get('/:id', (req: Request, res: Response) => {
      getTokenController.handle(req, res);
    });

    router.delete('/:id', (req: Request, res: Response) => {
      logoffController.handle(req, res);
    });
    return router;
  }
}
