import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { TableContacts } from './TableContacts';

import { TableMessages } from './TableMessages';
import { TableProfileUser } from './TableProfileUser';
import { TableToken } from './TableToken';

@Entity('users')
export class TableUsers {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToOne(() => TableToken, (userLogon) => userLogon.user)
  userLogon: TableToken;

  @OneToOne(() => TableProfileUser, (userProfile) => userProfile.user)
  userProfile: TableProfileUser;

  @OneToMany(() => TableMessages, (message) => message.user)
  messages: Array<TableMessages>;

  @OneToMany(() => TableContacts, (contact) => contact.user)
  contacts: Array<TableContacts>;

  @BeforeInsert()
  beforeCreate() {
    this.id = uuid();
    this.updated_at = new Date();
    this.created_at = new Date();
  }
}
