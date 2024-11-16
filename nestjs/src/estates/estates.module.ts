import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from 'src/user/user.service';
import { User } from '../user/user.entity';
import { EstatesController } from './estates.controller';

@Module({
  controllers: [EstatesController],
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService],
  exports: [UsersService]
})
export class EstatesModule {}