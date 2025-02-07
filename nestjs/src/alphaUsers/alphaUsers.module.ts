import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlphaUsersController } from './alphaUsers.controller';
import { AlphaUsersService } from './alphaUsers.service';
import { AlphaUser } from './alphaUser.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AlphaUser])],
  controllers: [AlphaUsersController],
  providers: [AlphaUsersService],
})
export class AlphaUsersModule {}
