import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocsDbService } from '../docs/docs.db.service';
import { Docs_Entity } from '../docs/docs.entity';
import { Estate } from '../estates/estate.entity';
import { EstatesService } from '../estates/estates.service';
import { Lodger_Entity } from '../lodgers/lodger.entity';
import { LodgersService } from '../lodgers/lodgers.service';
import { Owner_Entity } from '../owners/owners.entity';
import { OwnersService } from '../owners/owners.service';
import { User } from '../user/data/user.entity';
import { UserModule } from '../user/user.module';
import { RentsController } from './rents.controller';
import { Rent_Entity } from './rents.entity';
import { RentsDbService } from './services/rents.db.service';
import { RentsService } from './services/rents.service';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([User, Estate, Owner_Entity, Lodger_Entity, Rent_Entity, Docs_Entity]),
  ],
  controllers: [RentsController],
  providers: [EstatesService, OwnersService, LodgersService, RentsDbService, RentsService, DocsDbService],
  exports: [EstatesService, OwnersService, LodgersService, RentsDbService, RentsService, DocsDbService]
})
export class RentsModule {}