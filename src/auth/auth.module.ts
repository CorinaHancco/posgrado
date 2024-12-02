import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../modules/user/entity/user.entity';
import { Role } from '../modules/user/entity/role.entity';
import { GoogleStrategy } from './google.strategy';
//Módulo de autenticación `AuthModule`
//Gestiona la autenticación de usuarios y la integración con Google
@Module({
  imports: [TypeOrmModule.forFeature([User, Role]),],
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy],
})
export class AuthModule {}
