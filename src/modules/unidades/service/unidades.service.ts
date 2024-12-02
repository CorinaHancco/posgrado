// unidades.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { Unidad } from '../entity/unidad.entity';
import { CreateUnidadDto, UpdateUnidadDto } from '../dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FilterOperator, paginate, Paginated, PaginateQuery } from 'nestjs-paginate';

@Injectable()
export class UnidadesService {
    constructor(
        @InjectRepository(Unidad) 
        private readonly unidadRepository: Repository<Unidad>
    ) {}

    async getUnidades(): Promise<Unidad[]> {
        return await this.unidadRepository.find();
    }

    async getPaginatedUnidades(query: PaginateQuery): Promise<Paginated<Unidad>> {
        return paginate(query, this.unidadRepository, {
          sortableColumns: ['uni_nombre', 'created_at'],
          searchableColumns: ['uni_nombre'],
          //relations: ['programas'],
          filterableColumns: {
            uni_nombre: true,
            created_at: [FilterOperator.GTE, FilterOperator.LTE],
          },
          defaultSortBy: [['uni_id', 'ASC']],
          defaultLimit: 10,
        });
    }

    async getUnidad(uni_id: number): Promise<Unidad> {
        const unidad = await this.unidadRepository.findOneBy({ uni_id });
        if (!unidad) {
            throw new NotFoundException("Resource not found");
        }
        return unidad;
    }

    async createUnidad(createUnidadDto: CreateUnidadDto): Promise<Unidad> {
        const newUnidad = this.unidadRepository.create(createUnidadDto);
        return await this.unidadRepository.save(newUnidad);
    }

    async updateUnidad(uni_id: number, updateUnidadDto: UpdateUnidadDto): Promise<Unidad> {
        const unidad = await this.unidadRepository.preload({
            uni_id,
            ...updateUnidadDto, 
        });
        
        if (!unidad) {
            throw new NotFoundException("Resource not found");
        }

        return await this.unidadRepository.save(unidad);
    }

    async removeUnidad(uni_id: number): Promise<{message: string}> {
        const unidad = await this.unidadRepository.findOne({ 
            where: { uni_id },
            relations: ['programas'], 
        });
        if (!unidad) {
            return { message: `Unidad con ID ${uni_id} no encontrada. No se realizó ninguna acción.` };
        }

        await this.unidadRepository.remove(unidad);
    }

}
