import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Jogo } from "../../jogos/entities/jogo.entity";

@Entity({ name: "tb_categorias" })
export class Categoria {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, nullable: false })
  nome: string;

  // Uma categoria pode ter vários jogos
  @OneToMany(() => Jogo, (jogo) => jogo.categoria)
  jogos: Jogo[];
}
