import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from '../user/user.service';
import { UserController } from '../user/user.controller';
import { User } from '../user/user.entity';
import { Owner_Entity } from '../owners/owners.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Owner_Entity]),
  ],
  controllers: [UserController],
  providers: [UsersService],
  exports: [UsersService]
})
export class userModule {}