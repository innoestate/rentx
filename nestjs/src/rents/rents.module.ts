import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lodger_Entity } from '../lodgers/lodger.entity';
import { User } from '../user/user.entity';
import { UsersService } from '../user/user.service';
import { RentsController } from './rents.controller';
import { OwnersService } from '../owners/owners.service';
import { Estate } from '../estates/estate.entity';
import { Owner_Entity } from '../owners/owners.entity';
import { LodgersService } from '../lodgers/lodgers.service';
import { EstatesService } from '../estates/estates.service';
import { Rent_Entity } from './rents.entity';
import { RentsDbService } from './rents.db.service';
import { RentsService } from './rents.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Estate, Owner_Entity, Lodger_Entity, Rent_Entity]),
  ],
  controllers: [RentsController],
  providers: [UsersService, EstatesService, OwnersService, LodgersService, RentsDbService, RentsService],
  exports: [UsersService, EstatesService, OwnersService, LodgersService, RentsDbService, RentsService]
})
export class RentsModule {}