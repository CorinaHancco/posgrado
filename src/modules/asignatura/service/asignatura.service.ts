import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Asignatura } from '../entity/asignatura.entity';
import { Repository } from 'typeorm';
import { CreateAsignaturaDto, UpdateAsignaturaDto } from '../dto';
import { FilterOperator, paginate, Paginated, PaginateQuery } from 'nestjs-paginate';

@Injectable()
export class AsignaturaService {
    constructor(
        @InjectRepository(Asignatura)
        private readonly asignaturaRepository: Repository<Asignatura>
    ){}

    async getAsignaturas(): Promise <Asignatura[]>{
        return await this.asignaturaRepository.find();
    }

    async getPaginatedAsignaturas(query: PaginateQuery): Promise<Paginated<Asignatura>> {
        return paginate(query, this.asignaturaRepository, {
          sortableColumns: ['asig_nombre', 'created_at'],
          searchableColumns: ['asig_nombre'],
          filterableColumns: {
            asig_nombre: true,
            created_at: [FilterOperator.GTE, FilterOperator.LTE],
          },
          defaultSortBy: [['asig_id', 'DESC']],
          defaultLimit: 10,
        });
    }

    async getAsignatura(asig_id: number): Promise <Asignatura>{
        const asignatura = await this.asignaturaRepository.findOneBy({asig_id});
        if (!asignatura){
            throw new NotFoundException("No valido");
        }
        return asignatura;
    }

    async createAsignatura (createAsignaturaDto: CreateAsignaturaDto): Promise <Asignatura>{
        const newAsignatura = this.asignaturaRepository.create(createAsignaturaDto);
        return await this.asignaturaRepository.save(newAsignatura);
    }

    async updateAsignatura(asig_id: number, updateAsignaturaDto: UpdateAsignaturaDto): Promise <Asignatura>{
        const asignatura = await this.asignaturaRepository.preload({
            asig_id,
            ...updateAsignaturaDto,
        });

        if(!asignatura){
            throw new NotFoundException("Resource not found"); 
        }

        return await this.asignaturaRepository.save(asignatura);
    }

    async removeAsignatura(asig_id: number): Promise<{ message: string }> {
        const asignatura = await this.asignaturaRepository.findOne({
            where: { asig_id },
        })

        if(!asignatura){
            return { message: `Asignatura con ID ${asig_id} no encontrada. No se realizó ninguna acción.` };
        }
        await this.asignaturaRepository.remove(asignatura);
        return { message: `Asignatura con ID ${asig_id} eliminada exitosamente.` };
    }
}
