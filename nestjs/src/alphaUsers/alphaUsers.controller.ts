import { Controller, Post, Body } from '@nestjs/common';
import { AlphaUsersService } from './alphaUsers.service';

@Controller('api/alpha')
export class AlphaUsersController {
  constructor(private readonly alphaUsersService: AlphaUsersService) {}

  @Post('addUser')
  async addUser(@Body('email') email: string) {
    return this.alphaUsersService.addUser(email);
  }
}
