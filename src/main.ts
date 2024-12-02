import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ValidationPipe } from '@nestjs/common';
import { AuthMiddleware } from './auth/authMiddleware';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform:true,
    }),
  )

  const config = new DocumentBuilder()
  .setTitle('Documentación Posgrado')
  .setDescription('Testeo de APIs del proyecto Posgrado')
  .setVersion('1.0')
  .addBearerAuth(
    {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    },
    'access-token',
  )
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  app.use((req, res, next) => {
    if (req.url.startsWith('/auth/google')) {
      return next();
    }
    AuthMiddleware(req, res, next);
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

