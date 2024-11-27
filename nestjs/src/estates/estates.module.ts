import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from '../user/user.service';
import { User } from '../user/user.entity';
import { EstatesController } from './estates.controller';
import { Estate } from './estate.entity';
import { EstatesService } from './estates.service';
import { Owner_Entity } from '../owners/owners.entity';
import { Lodger_Entity } from '../lodgers/lodger.entity';

@Module({
  controllers: [EstatesController],
  imports: [TypeOrmModule.forFeature([User, Owner_Entity, Lodger_Entity, Estate])],
  providers: [UsersService, EstatesService],
  exports: [UsersService]
})
export class EstatesModule {}