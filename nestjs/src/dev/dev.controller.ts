import { BadRequestException, Controller, Get } from '@nestjs/common';
import { DevDbService } from './dev-db.service';

@Controller('api/dev')
export class DevController {
  constructor(private readonly devDbService: DevDbService) {}

  @Get('resetDb')
  async resetDatabase(): Promise<string> {
    if (process.env.NODE_ENV !== 'development') {
      throw new BadRequestException('This operation is only allowed in development mode.');
    }
    await this.devDbService.resetDatabase();
    return 'Database reset successfully';
  }
}
