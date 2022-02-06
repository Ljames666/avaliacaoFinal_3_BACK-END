import { IService } from "../../../../core/domain/interface/IService";
import { CacheRepository } from "../../../../core/infra/repositories/cacheRedis";
import { MessageRepository } from "../../infra/repository/MessageRepository";
import { IMessage } from "../interfaces/IMessage";

export class CreateMessageService implements IService {
  constructor(private repository: MessageRepository, private cache: CacheRepository) {}
  async execute({ description, details, user_id }: IMessage) {
    try {
      const descFind = await this.repository.findOneMessage({ where: { description, user_id } });

      if (descFind) {
        throw new Error(`Message already exists`);
      }

      const message = await this.repository.messageCreate({ description, details, user_id });

      await this.cache.set(`message:${message.id}`, message);

      const cachedMessages = await this.cache.get(`messages:${message.user_id}`);

      if (cachedMessages) cachedMessages.push(message);

      await this.cache.set(`messages:${message.user_id}`, cachedMessages);

      return message;
    } catch (error) {
      if (error instanceof Error) return error.message;
    }
  }
}
