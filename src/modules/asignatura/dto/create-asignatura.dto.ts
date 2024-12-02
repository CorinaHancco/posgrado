import { IsInt, IsString, Min } from "class-validator";

export class CreateAsignaturaDto{
    @IsString()
    readonly asig_codigo:string;

    @IsString()
    readonly asig_nombre:string;

    @IsInt()
    @Min(1)
    readonly asig_creditos: number;

    @IsInt()
    @Min(0)
    readonly asig_cant_horas_totales: number;
    
    @IsInt()
    @Min(0)
    readonly asig_cant_horas_virtuales: number;

    @IsInt()
    @Min(0)
    readonly asig_cant_horas_presenciales: number;
  
    @IsString()
    readonly asig_semestre:string;

    @IsInt()
    readonly pro_id: number;

}