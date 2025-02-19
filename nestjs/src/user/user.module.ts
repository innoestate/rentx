import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lodger_Entity } from '../lodgers/lodger.entity';
import { Owner_Entity } from '../owners/owners.entity';
import { UserController } from '../user/user.controller';
import { User } from './data/user.entity';
import { UserDbService } from './data/user.db.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Owner_Entity, Lodger_Entity]),
  ],
  controllers: [UserController],
  providers: [UserDbService],
  exports: [UserDbService]
})
export class UserModule {}