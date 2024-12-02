import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    ManyToMany,
    JoinTable,
  } from 'typeorm';
  import { Role } from './role.entity';
  
  @Entity()
  export class User {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ length: 20 })
    nombre: string;
  
    @Column({ length: 20 })
    apellido_paterno: string;
  
    @Column({ length: 20 })
    apellido_materno: string;
  
    @Column('date')
    fecha_nacimiento: Date;
  
    @Column({ length: 10 })
    genero: string;
  
    @Column({ type: 'int', width: 9 })
    numero_contacto: number;
  
    @Column({ type: 'int', width: 8 })
    documento_identidad: number;
  
    @Column({ length: 30, unique: true })
    email: string;
  
    @Column({ length: 255 })
    password: string;
  
    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;
  
    @DeleteDateColumn()
    deleted_at: Date;
  
    @ManyToMany(() => Role, (role) => role.users)
    @JoinTable()
    roles: Role[];
  }
  