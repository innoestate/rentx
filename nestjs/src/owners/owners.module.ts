import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OwnerController } from './owners.controller';
import { Owner_Entity } from './owners.entity';
import { OwnersService } from './owners.service';
import { User } from '../user/user.entity';
import { UsersService } from '../user/user.service';
import { Lodger_Entity } from '../lodgers/lodger.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Owner_Entity, Lodger_Entity]),
  ],
  controllers: [OwnerController],
  providers: [UsersService, OwnersService],
  exports: [UsersService, OwnersService]
})
export class OwnersModule {}