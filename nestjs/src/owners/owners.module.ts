import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lodger_Entity } from '../lodgers/lodger.entity';
import { User } from '../user/user.entity';
import { UserModule } from '../user/user.module';
import { OwnerController } from './owners.controller';
import { Owner_Entity } from './owners.entity';
import { OwnersService } from './owners.service';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([User, Owner_Entity, Lodger_Entity]),
  ],
  controllers: [OwnerController],
  providers: [OwnersService],
  exports: [OwnersService]
})
export class OwnersModule {}