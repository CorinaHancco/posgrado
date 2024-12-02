import { IsString } from "class-validator";

export class CreateUnidadDto {
    @IsString()
    readonly uni_nombre:string;
}
