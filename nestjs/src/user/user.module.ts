import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from '../user/user.service';
import { UserController } from '../user/user.controller';
import { User } from '../user/user.entity';
import { UserBuisness } from './user.buisness';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [UserController],
  providers: [UsersService, UserBuisness],
  exports: [UsersService, UserBuisness]
})
export class userModule {}