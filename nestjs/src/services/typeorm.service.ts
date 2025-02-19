import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { User } from '../user/data/user.entity';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}


  createTypeOrmOptions(): TypeOrmModuleOptions {
    
    const config = {
      type: 'postgres',
      host: this.configService.get<string>('DB_HOST'),
      port: this.configService.get<number>('DB_PORT'),
      username: this.configService.get<string>('DB_USERNAME'),
      password: this.configService.get<string>('DB_PASSWORD'),
      database: this.configService.get<string>('DB_DATABASE'),
      entities: [User],
      synchronize: this.configService.get<string>('NODE_ENV') === 'test', // set to false in production
      drpopSchema: this.configService.get<string>('NODE_ENV') === 'test',
      autoLoadEntities: true,
    };
    return config as TypeOrmModuleOptions;
  }
}