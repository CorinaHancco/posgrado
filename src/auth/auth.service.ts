// src/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '../modules/user/entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async validateUser(profile: any): Promise<User> {
    const email = profile.emails[0].value;

    // Verifica que el email termine en @unsa.edu.pe (correo institucional)
    if (!email.endsWith('@unsa.edu.pe')) {
      throw new UnauthorizedException('El correo no es institucional');
    }

    // Verifica si el email pertenece a un usuario de tipo unidad
    const user = await this.userRepository.findOne({
      where: { email },
      relations: ['roles'],
    });

    if (!user) {
      throw new UnauthorizedException('El usuario no está registrado como usuario_escuela');
    }

    return user;
  }
}
