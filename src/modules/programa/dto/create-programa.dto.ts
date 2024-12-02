import { IsInt, IsString, Min } from "class-validator";

export class CreateProgramaDto {

    @IsString()
    pro_codigo: string;

    @IsString()
    readonly pro_nombre:string;

    @IsInt()
    @Min(1800)
    pro_plan_e_anio: number;

    @IsString()
    pro_tipo: string;

    @IsInt()
    uni_id: number;

}
