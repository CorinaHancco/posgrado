// unidades.controller.ts
import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { UnidadesService } from '../service/unidades.service';
import { Unidad } from '../entity/unidad.entity';
import { CreateUnidadDto, UpdateUnidadDto } from '../dto';
import { ApiBearerAuth,ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { UserRole } from 'src/common/enums/user-role.enum';
import { Paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
@ApiBearerAuth('access-token')
@ApiTags('Unidad')
@UseGuards(RolesGuard)
@Controller('unidades')
export class UnidadesController {
    constructor(private readonly unidadService: UnidadesService) {}

    @Get()
    @Roles(UserRole.USUARIO_ESCUELA)
    getUnidades(@Query() filterQuery): Promise<Unidad[]> {
        const { searchTerm, orderBy } = filterQuery;
        return this.unidadService.getUnidades();
    }

    @Get('paginated')
    getPaginatedUnidades(@Paginate() query: PaginateQuery): Promise<Paginated<Unidad>> {
        return this.unidadService.getPaginatedUnidades(query);
    }

    @Get(':uni_id')
    @Roles(UserRole.USUARIO_ESCUELA)
    getUnidad(@Param('uni_id') uni_id: string): Promise<Unidad> {
        return this.unidadService.getUnidad(Number(uni_id));
    }

    @Post()
    @Roles(UserRole.USUARIO_ESCUELA)
    createUnidad(@Body() createUnidadDto: CreateUnidadDto): Promise<Unidad> {
        return this.unidadService.createUnidad(createUnidadDto);
    }

    @Patch(':uni_id')
    @Roles(UserRole.USUARIO_ESCUELA)
    updateUnidad(@Param('uni_id') id: string, @Body() updateUnidadDto: UpdateUnidadDto): Promise<Unidad> {
        return this.unidadService.updateUnidad(Number(id), updateUnidadDto);
    }

    @Delete(':uni_id')
    @Roles(UserRole.USUARIO_ESCUELA)
    removeUnidad(@Param('uni_id') uni_id: string): string {
        this.unidadService.removeUnidad(Number(uni_id));
        return 'Unidad eliminada exitosamente';
    }
}
