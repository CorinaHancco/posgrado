import { Asignatura } from "src/modules/asignatura/entity/asignatura.entity";
import { Unidad } from "src/modules/unidades/entity/unidad.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Programa{

    @PrimaryGeneratedColumn('increment')
    pro_id: number;

    @Column({nullable:false})
    pro_codigo: string;

    @Column({nullable:false})
    pro_nombre: string;

    @Column({nullable:false})
    pro_plan_e_anio: number;

    @Column({nullable:false})
    pro_tipo: string;

    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;
  
    @DeleteDateColumn()
    deleted_at: Date;

    @ManyToOne(type => Unidad, unidad => unidad.programas,{onDelete: 'CASCADE'})
    @JoinColumn({name:'uni_id'})
    unidad: Unidad;

    @OneToMany(() => Asignatura, (asignatura) => asignatura.programa, { onDelete: 'CASCADE',})
    asignaturas: Asignatura[];
}