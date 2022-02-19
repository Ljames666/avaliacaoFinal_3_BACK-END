import { Repository } from 'typeorm';
import { DatabaseConnection } from '../../../../core/infra/database/connection/connection';
import { TableUsers } from '../../../../core/infra/database/models/TableUsers';
import { IUser } from '../../domain/interface/IUser';
import { UserToTokenRequest } from '../../domain/interface/UserToTokenRequest';

export class UserRepository {
  private readonly repository: Repository<TableUsers>;
  constructor() {
    this.repository = DatabaseConnection.dbConnection().getRepository(TableUsers);
  }

  async create(user: IUser) {
    const newUser = this.repository.create(user);

    return await this.repository.save(newUser);
  }

  async getAll() {
    return await this.repository.find();
  }

  async getById(id: string) {
    const thisUser = await this.repository.findOne({
      where: {
        id: id,
      },
      relations: ['messages', 'userLogon'],
    });

    return thisUser;
  }

  async upDate(user: any, data: IUser) {
    user.name = data.name ? data.name : user.name;
    user.username = data.username ? data.username : user.username;
    user.email = data.email ? data.email : user.email;
    user.password = data.password ? data.password : user.password;
    user.updated_at = new Date();

    return await this.repository.save(user);
  }

  async delete(id: string) {
    return await this.repository.delete(id);
  }

  async findOne(data: any) {
    return await this.repository.findOne(data);
  }
  async findUser(data: object) {
    return await this.repository.find(data);
  }

  async bindUserToToken(data: UserToTokenRequest) {
    const thisUser = await this.repository.findOne({
      where: {
        username: data.username,
        password: data.password,
      },
    });
    console.log(thisUser);

    const userToToken = { userLogon: thisUser.username, user_id: thisUser.id };

    return userToToken;
  }
}
