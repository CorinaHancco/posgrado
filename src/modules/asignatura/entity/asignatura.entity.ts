import { Programa } from "src/modules/programa/entity/programa.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity()
export class Asignatura{

    @PrimaryGeneratedColumn('increment')
    asig_id: number;

    @Column()
    asig_codigo: string;

    @Column()
    asig_nombre: string;

    @Column()
    asig_creditos: number;

    @Column()
    asig_cant_horas_totales: number;
    
    @Column()
    asig_cant_horas_virtuales: number;

    @Column()
    asig_cant_horas_presenciales: number;

    @Column()
    asig_semestre: string;

    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;
  
    @DeleteDateColumn()
    deleted_at: Date;

    @ManyToOne(type => Programa, (programa) => programa.asignaturas,{ onDelete: 'CASCADE'})
    @JoinColumn({name: 'pro_id'})
    programa: Programa;
}