import { Equal, Repository } from 'typeorm';
import { DatabaseConnection } from '../../../../core/infra/database/connection/connection';
import { TableMessages } from '../../../../core/infra/database/models/TableMessages';
import { IMessage } from '../../domain/interfaces/IMessage';
import { IMessageUpdateRequest } from '../../domain/interfaces/IMessageUpdateRequest';

export class MessageRepository {
  private repository: Repository<TableMessages>;

  constructor() {
    this.repository = DatabaseConnection.dbConnection().getRepository(TableMessages);
  }

  async messageCreate({ description, details, user_id }: IMessage) {
    const message = this.repository.create({ description, details, user_id });

    return await this.repository.save(message);
  }

  async messagesFind() {
    const messages = await this.repository.find({
      relations: ['users'],
    });

    return messages;
  }

  async findOneMessage(data: any) {
    return await this.repository.findOne(data);
  }

  async messageFindById(user_id: string) {
    const messages = await this.repository.find({
      where: {
        user_id: Equal(user_id),
      },
      order: { created_at: 'ASC' },
      relations: ['user'],
    });

    return messages;
  }

  async messageUpdate(data: IMessageUpdateRequest) {
    const message = await this.repository.findOne(data.id);

    if (!message) {
      throw new Error(`message does not exists`);
    }

    message.description = data.description ? data.description : message.description;
    message.details = data.details ? data.details : message.details;
    message.created_at = message.created_at;
    message.updated_at = new Date();

    await this.repository.save(message);

    return message;
  }

  async messageDelete(id: string) {
    if (!(await this.repository.findOne(id))) {
      throw new Error('Message does not exists');
    }

    await this.repository.delete(id);
  }
}
