import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from 'src/common/enums/user-role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const roles = this.reflector.get<UserRole[]>('roles', context.getHandler()) || [];
    const user = request.user || { roles: [] };

    //console.log('Roles esperados:', roles);
    //console.log('Roles del usuario:', user.roles);
    if (!roles) return true;

    const hasRole =roles.some((role) => user.roles.includes(role));
    if (!hasRole) {
      throw new ForbiddenException('No tienes acceso a este recurso');
    }

    return hasRole;
  }
}

