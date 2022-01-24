import { Equal, getRepository, Repository } from "typeorm";
import { TableToken } from "../../../../core/infra/database/models/TableToken";
import { IToken } from "../../domain/interface/IToken";

export class TokenRepository {
  private repository: Repository<TableToken>;

  constructor() {
    this.repository = getRepository(TableToken);
  }

  async tokenCreate({ userLogon, user_id }: IToken) {
    const logon = this.repository.create({ userLogon, user_id });

    return await this.repository.save(logon);
  }

  async tokenGet(id: string) {
    const token = await this.repository.find({
      where: {
        user_id: Equal(id),
      },
    });

    if (!token) {
      throw new Error(`Authorization is denied for ${id}`);
    }

    return token;
  }

  async tokenDelete(id: string) {
    if (!(await this.repository.findOne(id))) {
      return new Error("User logoff");
    }

    await this.repository.delete(id);
  }
}
