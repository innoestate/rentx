import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';


async function bootstrap() {

  console.log('environment', process.env);
  console.log('jwt secret', process.env.JWT_SECRET);
  console.log('callback url', process.env.GOOGLE_CALLBACK_URL);
  
  const app = await NestFactory.create(AppModule);
  
  app.enableCors({
    origin: ['http://localhost','http://localhost:4200', 'https://rentx.fr', 'https://www.rentx.fr'], // Add your Angular dev server URL
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    credentials: true, // Important for authentication
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
  });
  
  
  await app.listen(process.env.PORT ?? 3000);
  console.log('Server is running on port', process.env.PORT ?? 3000);
  
}
bootstrap();
