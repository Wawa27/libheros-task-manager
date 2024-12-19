import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskService } from './task.service';
import { Task } from './task.entity';
import { List } from '../lists/list.entity';
import { TaskController } from './task.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Task]), TypeOrmModule.forFeature([List])],
  controllers: [TaskController],
  providers: [TaskService],
  exports: [TaskService],
})
export class TaskModule {}
