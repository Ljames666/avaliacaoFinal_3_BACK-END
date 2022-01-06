import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { TableUsers } from "./TableUsers";

@Entity("userLogon")
export class TableToken {
  @PrimaryColumn()
  token: string;

  @Column()
  userLogon: string;

  @Column()
  user_id: string;

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  updated_at: Date;

  @OneToOne(() => TableUsers, (user) => user.userLogon)
  @JoinColumn({ name: "user_id" })
  user: TableUsers;

  constructor() {
    if (!this.token) {
      this.token = uuid();
    }
  }
}
