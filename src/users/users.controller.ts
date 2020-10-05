import { Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './interfaces/users.interface';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Post()
  create(): string {
    return 'This action adds a new cat';
  }

  @Get()
  async findAll(): Promise<User[]> {
    return await this.usersService.findAll()
  }
}