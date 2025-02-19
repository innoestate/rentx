import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Owner_Entity } from '../owners/owners.entity';
import { User } from '../user/data/user.entity';
import { UserModule } from '../user/user.module';
import { Lodger_Entity } from './lodger.entity';
import { LodgersController } from './lodgers.controller';
import { LodgersService } from './lodgers.service';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([User, Lodger_Entity, Owner_Entity]),
  ],
  controllers: [LodgersController],
  providers: [LodgersService],
  exports: [LodgersService]
})
export class LodgersModule {}