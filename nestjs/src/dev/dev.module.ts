import { Module } from '@nestjs/common';
import { DevController } from './dev.controller';
import { DevDbService } from './dev-db.service';

@Module({
  providers: [DevDbService],
  exports: [],
  controllers: [DevController],
})
export class DevModule {}
