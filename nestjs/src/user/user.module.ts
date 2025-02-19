import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './services/user.service';
import { UserController } from '../user/user.controller';
import { User } from '../user/user.entity';
import { Owner_Entity } from '../owners/owners.entity';
import { Lodger_Entity } from '../lodgers/lodger.entity';
import { UserDbService } from './services/user.db.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Owner_Entity, Lodger_Entity]),
  ],
  controllers: [UserController],
  providers: [UsersService, UserDbService],
  exports: [UsersService, UserDbService]
})
export class UserModule {}