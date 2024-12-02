import { IsString } from "class-validator";

export class UpdateUnidadDto {
    @IsString()
    readonly uni_nombre:string;
}
