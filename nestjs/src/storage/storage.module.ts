import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Prospection_Entity } from 'src/prospections/entities/prospection.entity';
import { ProspectionsDbService } from 'src/prospections/services/prospections.db.service';
import { User } from '../user/user.entity';
import { UsersService } from '../user/user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Prospection_Entity]),
  ],
  controllers: [],
  providers: [UsersService, ProspectionsDbService],
  exports: [UsersService, ProspectionsDbService]
})
export class StorageModule {}