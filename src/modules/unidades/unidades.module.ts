import { Module } from '@nestjs/common';
import { UnidadesController } from './controller/unidades.controller';
import { UnidadesService } from './service/unidades.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Unidad } from './entity/unidad.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Unidad])],
    controllers:[UnidadesController],
    providers: [UnidadesService],
})
export class UnidadesModule {}
