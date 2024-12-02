import { Body, Controller, Delete, Get, Param, Patch, Post, Query,UseGuards  } from '@nestjs/common';
import { ProgramaService } from '../service/programa.service';
import { Programa } from '../entity/programa.entity';
import { CreateProgramaDto, UpdateProgramaDto } from '../dto';
import { ApiBearerAuth,ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { UserRole } from 'src/common/enums/user-role.enum';
import { Paginate, PaginateQuery } from 'nestjs-paginate';

@ApiBearerAuth('access-token')
@ApiTags('Programa')
@UseGuards(RolesGuard)
@Controller('programas')
export class ProgramaController {
    constructor(private readonly programaService: ProgramaService) {}

    @Get()
    @Roles(UserRole.USUARIO_UNIDAD)
    getProgramas(@Query() filterQuery): Promise<Programa[]> {
        const { searchTerm, orderBy } = filterQuery;
        return this.programaService.getProgramas();
    }

    @Get('paginated')
    async getPaginatedProgramas(@Paginate() query: PaginateQuery) {
        return this.programaService.getPaginatedProgramas(query);
    }

    @Get(':pro_id')
    @Roles(UserRole.USUARIO_UNIDAD)
    getPrograma(@Param('pro_id') pro_id: string): Promise<Programa> {
        return this.programaService.getPrograma(Number(pro_id));
    }

    @Post()
    @Roles(UserRole.USUARIO_UNIDAD)
    createPrograma(@Body() createProgramaDto: CreateProgramaDto): Promise<Programa> {
        return this.programaService.createPrograma(createProgramaDto);
    }

    @Patch(':pro_id')
    @Roles(UserRole.USUARIO_UNIDAD)
    updatePrograma(@Param('pro_id') pro_id: string, @Body() updateProgramaDto: UpdateProgramaDto): Promise<Programa> {
        return this.programaService.updatePrograma(Number(pro_id), updateProgramaDto)
    }

    @Delete(':pro_id')
    @Roles(UserRole.USUARIO_UNIDAD)
    removePrograma(@Param('pro_id') pro_id: string): string {
        this.programaService.removePrograma(Number(pro_id));
        return 'Programa eliminada exitosamente';
    }
}
