import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";

import { TableUsers } from "./TableUsers";
@Entity("profiles")
export class TableProfileUser {
  @PrimaryColumn()
  id: string;

  @Column()
  avatarURL: string;

  @Column()
  address: string;

  @Column()
  state: string;

  @Column()
  country: string;

  @Column()
  phoneNumber: string;

  @Column()
  occupation: string;

  @Column()
  about: string;

  @Column()
  user_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToOne(() => TableUsers, (user) => user.userProfile)
  @JoinColumn({ name: "user_id" })
  user: TableUsers;
  @BeforeInsert()
  beforeCreate() {
    this.id = uuid();
    this.updated_at = new Date();
    this.created_at = new Date();
  }
}
