import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateListDto } from './dto/create-list.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { User } from '../users/user.entity';
import { ListService } from './list.service';
import { CreateTaskDto } from '../tasks/dto/create-task.dto';
import { TaskService } from '../tasks/task.service';

@Controller('lists')
@UseGuards(JwtAuthGuard)
export class ListController {
  constructor(
    private readonly listService: ListService,
    private readonly taskService: TaskService,
  ) {}

  @Get()
  async findAll(@CurrentUser() user: User) {
    return this.listService.findAllByUser(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string, @CurrentUser() user: User) {
    return this.listService.findOneByUser(id, user);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() createListDto: CreateListDto,
    @CurrentUser() user: User,
  ) {
    return this.listService.create(createListDto, user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string, @CurrentUser() user: User) {
    return this.listService.remove(id, user);
  }
}
