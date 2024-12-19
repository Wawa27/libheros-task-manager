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
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { List } from './list.entity';

@Controller('lists')
@UseGuards(JwtAuthGuard)
export class ListController {
  constructor(private readonly listService: ListService) {}

  @ApiOperation({ summary: "Get all user's lists" })
  @ApiResponse({
    status: 200,
    description: "List of all user's list",
    type: [List],
  })
  @Get()
  async findAll(@CurrentUser() user: User) {
    return this.listService.findAllByUser(user);
  }

  @ApiOperation({ summary: "Find user's list" })
  @ApiResponse({
    status: 200,
    description: 'The list found',
    type: List,
  })
  @Get(':id')
  async findOne(@Param('id') id: string, @CurrentUser() user: User) {
    return this.listService.findOneByUser(id, user);
  }

  @ApiOperation({ summary: 'Create a new list' })
  @ApiResponse({
    status: 200,
    description: 'The newly created list',
    type: List,
  })
  @Post()
  async create(
    @Body() createListDto: CreateListDto,
    @CurrentUser() user: User,
  ) {
    return this.listService.create(createListDto, user);
  }

  @ApiOperation({ summary: 'Remove an existing list' })
  @ApiResponse({
    status: 200,
  })
  @Delete(':id')
  async remove(@Param('id') id: string, @CurrentUser() user: User) {
    return this.listService.remove(id, user);
  }
}
