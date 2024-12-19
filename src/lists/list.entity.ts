import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../users/user.entity';
import { Task } from '../tasks/task.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('lists')
export class List {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'My list name',
    description: "List's name",
  })
  @Column({ type: 'varchar', length: 255, unique: true })
  name: string;

  @ApiProperty({
    description: "List's owner",
    type: () => User,
  })
  @ManyToOne(() => User, (user) => user.lists, { onDelete: 'CASCADE' })
  user: User;

  @ApiProperty({
    description: "List's tasks",
    type: () => [Task],
  })
  @OneToMany(() => Task, (task) => task.list, { cascade: true })
  tasks: Task[];
}
