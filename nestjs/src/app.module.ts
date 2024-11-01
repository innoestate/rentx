import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

console.log(join(__dirname, '../angular/dist/angular'));

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../angular/dist/angular'),
      exclude: ['/api*'],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
