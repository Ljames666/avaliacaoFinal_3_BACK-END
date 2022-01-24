import { Equal, getRepository, Repository } from "typeorm";
import { TableUsers } from "../../../../core/infra/database/models/TableUsers";
import { IUser } from "../../domain/interface/IUser";
import { UserToTokenRequest } from "../../domain/interface/UserToTokenRequest";

export class UserRepository {
  private repository: Repository<TableUsers>;
  constructor() {
    this.repository = getRepository(TableUsers);
  }

  async create(user: IUser) {
    const newUser = this.repository.create(user);

    return await this.repository.save(newUser);
  }

  async getAll() {
    return await this.repository.find();
  }

  async getById(id: string) {
    const thisUser = await this.repository.find({
      where: {
        id: id,
      },
      relations: ["messages", "userLogon"],
    });

    return thisUser;
  }

  async upDate(data: IUser) {
    const user = await this.repository.findOne(data.id);

    if (!user) {
      throw new Error(`user does not exist`);
    }

    user.name = data.name ? data.name : user.name;
    user.username = data.username ? data.username : user.username;
    user.email = data.email ? data.email : user.email;
    user.password = data.password ? data.password : user.password;
    user.updated_at = new Date();

    return await this.repository.save(user);
  }

  async delete(id: string) {
    const user = await this.repository.findOne(id);

    if (!user) throw new Error("User does not exist");

    return await this.repository.delete(id);
  }

  async findOne(data: any) {
    return await this.repository.findOne(data);
  }
  async findUser(data: object) {
    return await this.repository.find(data);
  }

  async bindUserToToken(data: UserToTokenRequest) {
    const thisUser = await this.repository.find({
      where: {
        username: data.username,
        password: data.password,
      },
    });

    if (!thisUser) throw new Error("not found!");

    let user = thisUser.findIndex(
      (item) => item.username == data.username && item.password == data.password
    );
    const userToToken = { userLogon: thisUser[user].username, user_id: thisUser[user].id };

    return userToToken;
  }
}
