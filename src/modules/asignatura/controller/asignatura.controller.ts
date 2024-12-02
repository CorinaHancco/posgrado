import { Body, Controller, Delete, Get, Param, Patch, Post, Query ,UseGuards} from '@nestjs/common';
import { ApiBearerAuth,ApiTags } from '@nestjs/swagger';
import { AsignaturaService } from '../service/asignatura.service';
import { Asignatura } from '../entity/asignatura.entity';
import { CreateAsignaturaDto, UpdateAsignaturaDto } from '../dto';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { UserRole } from 'src/common/enums/user-role.enum';
import { Paginate, Paginated, PaginateQuery } from 'nestjs-paginate';

@ApiBearerAuth('access-token')
@ApiTags('Asignatura')
@UseGuards(RolesGuard)
@Controller('asignatura')
export class AsignaturaController {
    constructor(private readonly asignaturaService: AsignaturaService){}

    @Get()
    @Roles(UserRole.USUARIO_UNIDAD)
    getAsignaturas(@Query() filterQuery): Promise<Asignatura[]>{
        return this.asignaturaService.getAsignaturas();
    }

    @Get('paginated')
    getPaginatedAsignaturas(@Paginate() query: PaginateQuery): Promise<Paginated<Asignatura>> {
        return this.asignaturaService.getPaginatedAsignaturas(query);
    }

    @Get(':asig_id')
    @Roles(UserRole.USUARIO_UNIDAD)
    getAsignatura(@Param('asig_id') asig_id: string): Promise<Asignatura>{
        return this.asignaturaService.getAsignatura(Number(asig_id));
    }

    @Post()
    @Roles(UserRole.USUARIO_UNIDAD)
    createAsignatura(@Body() createAsignaturaDto: CreateAsignaturaDto): Promise<Asignatura>{
        return this.asignaturaService.createAsignatura(createAsignaturaDto);
    }

    @Patch(':asig_id')
    @Roles(UserRole.USUARIO_UNIDAD)
    updateAsignatura(@Param('asig_id') asig_id: string, @Body() updateAsignaturaDto: UpdateAsignaturaDto): Promise<Asignatura>{
        return this.asignaturaService.updateAsignatura(Number(asig_id),updateAsignaturaDto)
    }

    @Delete(':asig_id')
    @Roles(UserRole.USUARIO_UNIDAD)
    removeAsignatura(@Param('asig_id') asig_id: string): string{
        this.asignaturaService.removeAsignatura(Number(asig_id));
        return 'Asignatura eliminada exitosamente';
    }
}
