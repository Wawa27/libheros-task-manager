import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { List } from '../lists/list.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('tasks')
export class Task {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'Add swagger to the project',
    description: 'A short task description',
  })
  @Column({ type: 'varchar', length: 255 })
  shortDescription: string;

  @ApiProperty({
    example:
      'We need to add swagger to the project so that the project is better documented and new developers can contribute to the project more easily',
    description: 'A long task description',
  })
  @Column({ type: 'text', nullable: true })
  longDescription: string;

  @ApiProperty({
    description: 'A due date',
  })
  @Column({ type: 'date' })
  dueDate: Date;

  @ApiProperty({
    description: 'Whether the task is currently completed or not',
  })
  @Column({ type: 'boolean', default: false })
  isCompleted: boolean;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty({
    type: () => [List],
  })
  @ManyToOne(() => List, (list) => list.tasks, { onDelete: 'CASCADE' })
  list: List;
}
