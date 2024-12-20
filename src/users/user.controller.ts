import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from './user.entity';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: "Get user's data" })
  @ApiResponse({
    status: 200,
    description: 'Current authenticated user data',
    type: User,
  })
  @UseGuards(JwtAuthGuard)
  @Get('/me')
  async getMe(@Request() req): Promise<User> {
    const userId = req.user.id;
    return this.userService.findOne(userId);
  }
}
