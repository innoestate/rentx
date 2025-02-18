import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class DevDbService {
  constructor(private dataSource: DataSource) {}

  async resetDatabase(): Promise<void> {
    const entities = this.dataSource.entityMetadatas;
    for (const entity of entities) {
      const repository = this.dataSource.getRepository(entity.name);
      await repository.delete({});
    }
  }
}
