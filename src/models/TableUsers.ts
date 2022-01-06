import { Column, CreateDateColumn, Entity, OneToMany, OneToOne, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { TableMessages } from "./TableMessages";
import { TableToken } from "./TableToken";

@Entity("users")
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

  @CreateDateColumn()
  updated_at: Date;

  @OneToOne(() => TableToken, (userLogon) => userLogon.user)
  userLogon: TableToken;

  @OneToMany(() => TableMessages, (message) => message.users)
  messages: Array<TableMessages>;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
