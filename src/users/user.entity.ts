import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { List } from '../lists/list.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'Oualid',
    description: "User's firstname",
  })
  @Column({ type: 'varchar', length: 255 })
  firstName: string;

  @ApiProperty({
    example: 'Hassan',
    description: "User's lastname",
  })
  @Column({ type: 'varchar', length: 255 })
  lastName: string;

  @ApiProperty({
    example: 'libheros@gmail.com',
    description: "User's email",
  })
  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @ApiProperty({
    example: '123456password',
    description: "User's password",
  })
  @Column({ type: 'varchar', select: false })
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty({
    description: "User's lists",
    type: () => [List],
  })
  @OneToMany(() => List, (list) => list.user, { cascade: true })
  lists: List[];
}
