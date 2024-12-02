import { IsString, IsEmail, IsInt, IsDate, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsString()
  nombre: string;

  @IsString()
  apellido_paterno: string;

  @IsString()
  apellido_materno: string;

  @IsDate()
  fecha_nacimiento: Date;

  @IsString()
  genero: string;

  @IsInt()
  numero_contacto: number;

  @IsInt()
  documento_identidad: number;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsOptional()
  roles: string[];
}
