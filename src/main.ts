import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuration CORS
  const corsOptions: CorsOptions = {
   origin: [
      'http://localhost:3001', 
      'http://localhost:3000', 
      'http://localhost:3002'
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'X-Requested-With',
      'Accept',
    ],
    preflightContinue: false,
    optionsSuccessStatus: 204,
  };

  app.enableCors(corsOptions);

 const port = process.env.PORT || 3002;
  await app.listen(port);
}

bootstrap().catch(error => {
  console.error('Erreur lors du démarrage de l\'application:', error);
  process.exit(1);
});
