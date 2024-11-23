import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { UsersService } from '../user/user.service';
import { Lodger_Entity } from './lodger.entity';
import { LodgersController } from './lodgers.controller';
import { Owner_Entity } from '../owners/owners.entity';
import { LodgersService } from './lodgers.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Lodger_Entity, Owner_Entity]),
  ],
  controllers: [LodgersController],
  providers: [UsersService, LodgersService],
  exports: [UsersService, LodgersService]
})
export class LodgersModule {}