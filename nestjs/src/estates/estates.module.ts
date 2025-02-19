import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lodger_Entity } from '../lodgers/lodger.entity';
import { Owner_Entity } from '../owners/owners.entity';
import { User } from '../user/user.entity';
import { UserModule } from '../user/user.module';
import { Estate } from './estate.entity';
import { EstatesController } from './estates.controller';
import { EstatesService } from './estates.service';

@Module({
  controllers: [EstatesController],
  imports: [
    UserModule,
    TypeOrmModule.forFeature([User, Owner_Entity, Lodger_Entity, Estate])
  ],
  providers: [EstatesService],
  exports: []
})
export class EstatesModule {} 