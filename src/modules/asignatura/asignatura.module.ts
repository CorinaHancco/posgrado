import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Asignatura } from './entity/asignatura.entity';
import { AsignaturaController } from './controller/asignatura.controller';
import { AsignaturaService } from './service/asignatura.service';

@Module({
    imports: [TypeOrmModule.forFeature([Asignatura])],
    controllers: [AsignaturaController],
    providers: [AsignaturaService]
})
export class AsignaturaModule {
    
}
