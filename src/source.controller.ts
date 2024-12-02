import { Controller, Get, UseGuards } from '@nestjs/common';
import { Roles } from './auth/roles.decorator';
import { RolesGuard } from './auth/roles.guard';
import { UserRole } from './common/enums/user-role.enum';

@Controller('recurso')
@UseGuards(RolesGuard)
export class RecursoController {
  @Get()
  @Roles(UserRole.USUARIO_ESCUELA)
  obtenerRecurso() {
    return 'Este recurso está disponible para usuarios de tipo "usuario_escuela".';
  }

  @Get('admin')
  @Roles(UserRole.USUARIO_UNIDAD)
  obtenerRecursoAdmin() {
    return 'Este recurso está disponible para usuarios de tipo "usuario_unidad".';
  }
}
