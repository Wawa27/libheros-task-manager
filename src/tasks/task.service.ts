import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { List } from '../lists/list.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    @InjectRepository(List)
    private readonly listRepository: Repository<List>,
  ) {}

  async create(
    createTaskDto: CreateTaskDto,
    listId: string,
    userId: string,
  ): Promise<Task> {
    const list = await this.listRepository.findOne({
      where: { id: listId, user: { id: userId } },
    });

    if (!list) {
      throw new NotFoundException('List not found or not accessible');
    }

    const task = this.taskRepository.create({
      ...createTaskDto,
      list,
    });

    return this.taskRepository.save(task);
  }

  async delete(taskId: string, userId: string): Promise<void> {
    const task = await this.taskRepository.findOne({
      where: { id: taskId },
      relations: {
        list: {
          user: true,
        },
      },
    });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    if (task.list.user.id !== userId) {
      throw new ForbiddenException(
        'You do not have permission to delete this task',
      );
    }

    await this.taskRepository.delete(taskId);
  }
}
