import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from '../user/user.service';
import { User } from '../user/user.entity';
import { EstatesController } from './estates.controller';
import { Estate } from './estate.entity';
import { EstatesService } from './estates.service';

@Module({
  controllers: [EstatesController],
  imports: [TypeOrmModule.forFeature([User, Estate])],
  providers: [UsersService, EstatesService],
  exports: [UsersService]
})
export class EstatesModule {}