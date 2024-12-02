import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Programa } from '../entity/programa.entity';
import { Repository } from 'typeorm';
import { CreateProgramaDto, UpdateProgramaDto } from '../dto';
import { FilterOperator, paginate, Paginated, PaginateQuery } from 'nestjs-paginate';

@Injectable()
export class ProgramaService {
    constructor(
        @InjectRepository(Programa)
        private readonly programaRepository: Repository<Programa>
    ) {}

    async getProgramas(): Promise<Programa[]> {
        //return await this.programaRepository.find({relations:['planesEstudio']});
        return await this.programaRepository.find();
    }

    async getPaginatedProgramas(query: PaginateQuery): Promise<Paginated<Programa>> {
        return paginate(query, this.programaRepository, {
          sortableColumns: ['pro_nombre', 'created_at'],
          searchableColumns: ['pro_nombre'],
          filterableColumns: {
            pro_nombre: true,
            created_at: [FilterOperator.GTE, FilterOperator.LTE],
          },
          defaultSortBy: [['pro_id', 'DESC']],
          defaultLimit: 10,
        });
    }

    async getPrograma(pro_id: number): Promise<Programa> {
        const programa = await this.programaRepository.findOneBy({ pro_id });
        if (!programa) {
            throw new NotFoundException("Resource not found");
        }
        return programa;
    }

    async createPrograma(createProgramaDto: CreateProgramaDto): Promise<Programa> {
        const newPrograma = this.programaRepository.create(createProgramaDto);
        return await this.programaRepository.save(newPrograma);
    }

    async updatePrograma(pro_id: number, updateProgramaDto: UpdateProgramaDto): Promise<Programa> {
        const programa = await this.programaRepository.preload({
            pro_id,
            ...updateProgramaDto,
        });

        if (!programa) {
            throw new NotFoundException("Resource not found");
        }

        return await this.programaRepository.save(programa);

    }

    async removePrograma(pro_id: number): Promise<{ message: string }> {
        const programa = await this.programaRepository.findOne({ 
            where: { pro_id },
            relations: ['asignaturas'], 
        });

        if (!programa) {
            return { message: `Programa con ID ${pro_id} no encontrado. No se realizó ninguna acción.` };
        }

        await this.programaRepository.remove(programa);
        return { message: `Programa con ID ${pro_id} eliminado junto con sus asignaturas asociadas.` };
    }

}
