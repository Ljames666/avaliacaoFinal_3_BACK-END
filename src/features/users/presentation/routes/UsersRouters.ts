import { Request, Response, Router } from 'express';
import { requestProprietary } from '../../../../core/infra/Middlewares/middlewares';
import { RouterContract } from '../../../../core/presentation/contracts/routeContract';
import { validateUser } from '../../infra/middlewares/validateUser';

import { UserRepository } from '../../infra/repository/UserRepository';
import { CreateUserService } from '../../domain/services/CreateUserService';
import { CreateUserController } from '../controllers/CreateUserController';
import { GetUserByIdService, GetUsersService } from '../../domain/services/GetUserServices';
import { GetUserByIdController, GetUsersController } from '../controllers/GetUserControllers';
import { UpdateUserService } from '../../domain/services/UpdateUserService';
import { UpdateUserController } from '../controllers/UpdateUserController';
import { DeleteUserService } from '../../domain/services/DeleteUserService';
import { DeleteUserController } from '../controllers/DeleteUserController';

export class UserRoutes implements RouterContract {
  static getRoutes() {
    const repository = new UserRepository();

    const createUserService = new CreateUserService(repository);
    const createUserController = new CreateUserController(createUserService);

    const getUserService = new GetUsersService(repository);
    const getUserController = new GetUsersController(getUserService);

    const getUserByIdService = new GetUserByIdService(repository);
    const getUserByIdController = new GetUserByIdController(getUserByIdService);

    const updateUserService = new UpdateUserService(repository);
    const updateUserController = new UpdateUserController(updateUserService);

    const deleteUserService = new DeleteUserService(repository);
    const deleteUserController = new DeleteUserController(deleteUserService);

    const routerUsers = Router();

    routerUsers.use(requestProprietary);

    routerUsers.post('/', validateUser, (req: Request, res: Response) => {
      createUserController.handle(req, res);
    });

    routerUsers.get('/', (req: Request, res: Response) => {
      getUserController.handle(req, res);
    });

    routerUsers.get('/:id', (req: Request, res: Response) => {
      getUserByIdController.handle(req, res);
    });

    routerUsers.put('/:id', (req: Request, res: Response) => {
      updateUserController.handle(req, res);
    });

    routerUsers.delete('/:id', (req: Request, res: Response) => {
      deleteUserController.handle(req, res);
    });

    return routerUsers;
  }
}
