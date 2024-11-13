import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { User } from './../user/user.entity';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {

    console.log('postgres config', this.configService.get('GOOGLE_CLIENT_ID'), this.configService.get('DB_HOST'));


    const config = {
      type: 'postgres',
      host: this.configService.get<string>('DB_HOST'),
      port: this.configService.get<number>('DB_PORT'),
      username: this.configService.get<string>('DB_USERNAME'),
      password: this.configService.get<string>('DB_PASSWORD'),
      database: this.configService.get<string>('DB_DATABASE'),
      entities: [User],// [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: false, // set to false in production
      autoLoadEntities: true,
    };
    console.log('config', config);
    return config as TypeOrmModuleOptions;
  }
}