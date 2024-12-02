import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  nombre: string;

  @ManyToMany(() => User, (user) => user.roles)
  users: User[]; // Relación inversa a la propiedad `roles` en User
}
