import { Module } from '@nestjs/common';

import { UnidadesModule } from './modules/unidades/unidades.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProgramaModule } from './modules/programa/programa.module';
import { User } from './modules/user/entity/user.entity';
import { Role } from './modules/user/entity/role.entity';
import { AuthModule } from './auth/auth.module';
import { AsignaturaModule } from './modules/asignatura/asignatura.module';
import { Unidad } from './modules/unidades/entity/unidad.entity';
import { Programa } from './modules/programa/entity/programa.entity';
import { Asignatura } from './modules/asignatura/entity/asignatura.entity';
import { UserModule } from './modules/user/user.module';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    
    ConfigModule.forRoot({
      isGlobal:true,
    }),
    UnidadesModule,TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATBASE,
    autoLoadEntities: true,
    synchronize: true,
  }), 
  ProgramaModule,
  TypeOrmModule.forFeature([User, Role]),
  AuthModule,
  AsignaturaModule,
  UserModule,
  ],
  
})
export class AppModule {}
