import { IsNotEmpty } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Jogo } from "../../jogos/entities/jogo.entity";

@Entity({name: "tb_categorias"})
export class Categoria{

    @PrimaryGeneratedColumn()    
    id: number

    @IsNotEmpty()
    @Column({length: 255, nullable: false})
    tipo: string
    
    @OneToMany(() => Jogo, (jogo) => jogo.categoria)
    jogo: Jogo[];
}