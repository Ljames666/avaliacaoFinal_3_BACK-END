import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { TableUsers } from './TableUsers';

@Entity('contacts')
export class TableContacts {
  @PrimaryColumn()
  id: string;

  @Column()
  avatarURL: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column('json')
  address: JSON;

  @Column('json')
  phoneNumber: JSON;

  @Column()
  description: string;

  @Column()
  user_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => TableUsers)
  @JoinColumn({ name: 'user_id' })
  user: TableUsers;
  @BeforeInsert()
  beforeCreate() {
    this.id = uuid();
    this.updated_at = new Date();
    this.created_at = new Date();
  }
}
