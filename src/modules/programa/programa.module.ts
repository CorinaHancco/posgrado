import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Programa } from './entity/programa.entity';
import { ProgramaService } from './service/programa.service';
import { ProgramaController } from './controller/programa.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Programa])],
    controllers: [ProgramaController],
    providers: [ProgramaService]
})
export class ProgramaModule {}
