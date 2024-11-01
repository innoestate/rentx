import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserController } from './api/user/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './config/typeorm.config';

console.log(join(__dirname, '../angular/dist/angular'));

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../angular/dist/angular'),
      exclude: ['/api*'],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    AuthModule,
  ],
  controllers: [UserController, AppController],
  providers: [AppService],
})
export class AppModule {}
