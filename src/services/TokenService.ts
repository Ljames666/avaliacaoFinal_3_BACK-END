import { Equal, getRepository } from "typeorm";
import { TableToken } from "../models/TableToken";
import { TableUsers } from "../models/TableUsers";

type TokenRequest = {
  _username: string;
  _password: string;
};

export class CreateTokenService {
  async execute({ _username, _password }: TokenRequest): Promise<TableToken> {
    const repository = getRepository(TableToken);
    const repoUser = await getRepository(TableUsers).find({
      where: { username: Equal(_username), password: Equal(_password) },
    });
    console.log(repoUser);

    const user = repoUser.findIndex(
      (item) => item.username === _username && item.password === _password
    );
    let token = repository.create({
      userLogon: repoUser[user].username,
      user_id: repoUser[user].id,
    });
    console.log(token);

    await repository.save(token);
    return token;
  }
}

export class GetTokenService {
  async execute(uid: any) {
    const repository = getRepository(TableToken);
    console.log(repository);

    const token = await repository.find({
      where: {
        user_id: Equal(uid),
      },
    });
    console.log(token);

    if (!token) {
      return new Error(`Authorization is denied for ${uid}`);
    }

    return token;
  }
}

export class DeleteTokenService {
  async execute(token: string) {
    const repository = getRepository(TableToken);

    if (!(await repository.findOne(token))) {
      return new Error("User logoff");
    }

    await repository.delete(token);
  }
}
