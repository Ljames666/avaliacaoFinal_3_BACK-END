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

@Entity("userLogon")
export class TableToken {
  @PrimaryColumn()
  id: string;
  @Column()
  userLogon: string;

  @Column()
  user_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToOne(() => TableUsers, (user) => user.userLogon)
  @JoinColumn({ name: "user_id" })
  user: TableUsers;

  @BeforeInsert()
  beforeCreate() {
    this.id = uuid();
    this.updated_at = new Date();
    this.created_at = new Date();
  }
}
