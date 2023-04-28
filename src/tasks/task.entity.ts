import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { TaskStatus } from "./task.mode";

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: TaskStatus;
}
