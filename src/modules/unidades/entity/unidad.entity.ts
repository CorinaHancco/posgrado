import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Programa } from "../../programa/entity/programa.entity";

@Entity()
export class Unidad{

    @PrimaryGeneratedColumn('increment')
    uni_id: number;

    @Column()
    uni_nombre:string;

    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;
  
    @DeleteDateColumn()
    deleted_at: Date;

    @OneToMany(() => Programa, (programa) => programa.unidad, { onDelete: 'CASCADE' })
    programas: Programa[];  
    
}