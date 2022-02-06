import { Equal, Repository } from "typeorm";
import { DatabaseConnection } from "../../../../core/infra/database/connection/connection";
import { TableToken } from "../../../../core/infra/database/models/TableToken";
import { IToken } from "../../domain/interface/IToken";

export class TokenRepository {
  private repository: Repository<TableToken>;

  constructor() {
    this.repository = DatabaseConnection.dbConnection().getRepository(TableToken);
  }

  async tokenCreate({ userLogon, user_id }: IToken) {
    const logon = this.repository.create({ userLogon, user_id });

    return await this.repository.save(logon);
  }

  async tokenGet(id: string) {
    const token = await this.repository.findOne({
      where: {
        user_id: Equal(id),
      },
    });

    return token;
  }

  async findOneToken(id: string) {
    return await this.repository.findOne(id);
  }

  async tokenDelete(id: string) {
    await this.repository.delete(id);
  }
}
