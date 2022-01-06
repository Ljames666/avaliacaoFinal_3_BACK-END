import { getRepository } from "typeorm";
import { TableUsers } from "../models/TableUsers";

type UserRequest = {
  name: string;
  username: string;
  email: string;
  password: string;
};
type UpdateUserRequest = {
  id: string;
  name: string;
  username: string;
  email: string;
  password: string;
};

export class CreateUsersService {
  async execute({ name, username, email, password }: UserRequest): Promise<TableUsers | Error> {
    const repository = getRepository(TableUsers);

    if (await repository.findOne({ name })) {
      return new Error(`User already exists,, please choose another one!`);
    }

    const user = repository.create({ name, username, email, password });

    await repository.save(user);

    return user;
  }
}

export class GetUsersService {
  async execute() {
    const repository = getRepository(TableUsers);

    const users = await repository.find({});

    return users;
  }
}

export class GetByIdUsersService {
  async execute(uid: string) {
    const repository = getRepository(TableUsers);

    const user = await repository.find({
      where: {
        id: uid,
      },
      relations: ["messages", "userLogon"],
    });

    return user;
  }
}

export class UpdateUsersService {
  async execute({
    id,
    name,
    username,
    email,
    password,
  }: UpdateUserRequest): Promise<TableUsers | Error> {
    const repository = getRepository(TableUsers);

    const user = await repository.findOne(id);

    if (!user) {
      return new Error(`user does not exist`);
    }

    user.name = name ? name : user.name;
    user.username = username ? username : user.username;
    user.email = email ? email : user.email;
    user.password = password ? password : user.password;

    await repository.save(user);

    return user;
  }
}

export class DeleteUsersService {
  async execute(id: string) {
    const repository = getRepository(TableUsers);

    if (!(await repository.findOne(id))) {
      return new Error("User does not exist");
    }

    await repository.delete(id);
  }
}
