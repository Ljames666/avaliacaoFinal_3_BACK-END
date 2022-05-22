import { Equal, Repository } from 'typeorm';
import { DatabaseConnection } from '../../../../core/infra/database/connection/connection';
import { TableContacts } from '../../../../core/infra/database/models/TableContacts';
import { IContact } from '../../domain/interfaces/IContact';
import { IContactUpdateRequest } from '../../domain/interfaces/IContactUpdateRequest';

export class ContactRepository {
  private repository: Repository<TableContacts>;

  constructor() {
    this.repository = DatabaseConnection.dbConnection().getRepository(TableContacts);
  }

  async contactCreate(data: IContact) {
    const contact = this.repository.create(data);

    return await this.repository.save(contact);
  }

  async contactsFind() {
    const contacts = await this.repository.find({
      relations: ['users'],
    });

    return contacts;
  }

  async findOneContact(data: any) {
    return await this.repository.findOne(data);
  }

  async contactFindById(user_id: string) {
    const contacts = await this.repository.find({
      where: {
        user_id: Equal(user_id),
      },
      order: { created_at: 'ASC' },
      relations: ['user'],
    });

    return contacts;
  }

  async contactUpdate(data: IContactUpdateRequest) {
    const contact = await this.repository.findOne(data.id);

    if (!contact) {
      throw new Error(`contact does not exists`);
    }

    contact.avatarURL = data.avatarURL ? data.avatarURL : contact.avatarURL;
    contact.name = data.name ? data.name : contact.name;
    contact.email = data.email ? data.email : contact.email;
    contact.address = data.address ? data.address : contact.address;
    contact.phoneNumber = data.phoneNumber ? data.phoneNumber : contact.phoneNumber;
    contact.description = data.description ? data.description : contact.description;
    contact.created_at = contact.created_at;
    contact.updated_at = new Date();

    await this.repository.save(contact);

    return contact;
  }

  async contactDelete(id: string) {
    if (!(await this.repository.findOne(id))) {
      throw new Error('the contact does not exists');
    }

    await this.repository.delete(id);
  }
}
