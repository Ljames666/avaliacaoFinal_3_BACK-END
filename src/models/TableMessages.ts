import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { TableUsers } from "./TableUsers";

@Entity("messages")
export class TableMessages {
  @PrimaryColumn()
  id: string;

  @Column()
  description: string;

  @Column()
  details: string;

  @Column()
  user_id: string;

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  updated_at: Date;

  @ManyToOne(() => TableUsers)
  @JoinColumn({ name: "user_id" })
  users: TableUsers;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
