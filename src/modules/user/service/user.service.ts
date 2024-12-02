import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { Role } from '../entity/role.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async getUsers(filterQuery: any): Promise<User[]> {
    return this.userRepository.find({ relations: ['roles'] });
  }

  async getUser(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['roles'],
    });
    if (!user) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }
    return user;
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { roles, ...userData } = createUserDto;

    // Busca las entidades Role correspondientes
    const roleEntities = await this.roleRepository.findByIds(roles);

    if (roleEntities.length !== roles.length) {
      throw new NotFoundException('Algunos roles no existen');
    }

    const newUser = this.userRepository.create({
      ...userData,
      roles: roleEntities,
    });

    return this.userRepository.save(newUser);
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const { roles, ...userData } = updateUserDto;

    const user = await this.getUser(id);

    if (roles) {
      const roleEntities = await this.roleRepository.findByIds(roles);
      if (roleEntities.length !== roles.length) {
        throw new NotFoundException('Algunos roles no existen');
      }
      user.roles = roleEntities;
    }

    Object.assign(user, userData);

    return this.userRepository.save(user);
  }

  async deleteUser(id: number): Promise<void> {
    const user = await this.getUser(id);
    await this.userRepository.remove(user);
  }
}
