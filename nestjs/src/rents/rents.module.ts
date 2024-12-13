import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocsDbService } from '../docs/docs.db.service';
import { Estate } from '../estates/estate.entity';
import { EstatesService } from '../estates/estates.service';
import { Lodger_Entity } from '../lodgers/lodger.entity';
import { LodgersService } from '../lodgers/lodgers.service';
import { Owner_Entity } from '../owners/owners.entity';
import { OwnersService } from '../owners/owners.service';
import { User } from '../user/user.entity';
import { UsersService } from '../user/user.service';
import { RentsController } from './rents.controller';
import { RentsDbService } from './rents.db.service';
import { Rent_Entity } from './rents.entity';
import { RentsService } from './rents.service';
import { Docs_Entity } from '../docs/docs.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Estate, Owner_Entity, Lodger_Entity, Rent_Entity, Docs_Entity]),
  ],
  controllers: [RentsController],
  providers: [UsersService, EstatesService, OwnersService, LodgersService, RentsDbService, RentsService, DocsDbService],
  exports: [UsersService, EstatesService, OwnersService, LodgersService, RentsDbService, RentsService, DocsDbService]
})
export class RentsModule {}