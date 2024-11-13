import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Injectable()
export class DatabaseInitService implements OnModuleInit {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}

  async onModuleInit() {
    await this.createTableIfNotExists();
  }

  private async createTableIfNotExists() {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    console.log('createTableIfNotExists');

    const tableExists = await queryRunner.hasTable('users');
    if (!tableExists) {
      await queryRunner.query(`
        CREATE TABLE users (
          id SERIAL PRIMARY KEY,
          email VARCHAR(100),
          created_at TIMESTAMP DEFAULT NOW(),
          updated_at TIMESTAMP DEFAULT NOW()
        );
      `);
    }

    await queryRunner.release();
  }
}
