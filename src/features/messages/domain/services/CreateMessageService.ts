import { ItIsError } from '../../../../core/domain/errors/it-is-error';
import { IService } from '../../../../core/domain/interface/IService';
import { TableMessages } from '../../../../core/infra/database/models/TableMessages';
import { CacheRepository } from '../../../../core/infra/repositories/cacheRedis';
import { MessageRepository } from '../../infra/repository/MessageRepository';
import { IMessage } from '../interfaces/IMessage';

export class CreateMessageService implements IService {
  constructor(private repository: MessageRepository, private cache: CacheRepository) {}
  async execute({ description, details, user_id }: IMessage) {
    try {
      if (await this.repository.findOneMessage({ description, user_id })) {
        throw new ItIsError(`Message already exists`, 400);
      }

      const message = await this.repository.messageCreate({ description, details, user_id });

      await this.cache.set(`message:${message.id}`, message);

      const cachedMessages = await this.cache.get(`messages:${message.user_id}`);

      if (cachedMessages) cachedMessages.push(message);

      await this.cache.set(`messages:${message.user_id}`, cachedMessages);

      return message;
    } catch (error) {
      throw error;
    }
  }
}
