import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskService } from './task.service';
import { User } from '../users/user.entity';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Task } from './task.entity';

@Controller('lists/:id/tasks')
@UseGuards(JwtAuthGuard)
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @ApiOperation({ summary: 'Create a new task in a list' })
  @ApiResponse({
    status: 200,
    description: 'The newly created task',
    type: Task,
  })
  @Post()
  async create(
    @Param('id') listId: string,
    @Body() createTaskDto: CreateTaskDto,
    @CurrentUser() user: User,
  ) {
    return this.taskService.create(createTaskDto, listId, user.id);
  }

  @ApiOperation({ summary: 'Remove a task in a list' })
  @ApiResponse({
    status: 200,
    description: 'Task deleted successfully',
  })
  @Delete('/:id')
  async delete(@Param('id') taskId: string, @CurrentUser() user: User) {
    await this.taskService.delete(taskId, user.id);
  }
}
