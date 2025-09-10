import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Categoria } from "../../categoria/entities/categoria.entity";

@Entity({ name: "tb_jogos" })
export class Jogo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, nullable: false })
  nome: string;

  @Column("int")
  ano: number;

  @Column("decimal", { precision: 10, scale: 2 })
  valor: number;

  // Muitos jogos pertencem a uma categoria
  @ManyToOne(() => Categoria, (categoria) => categoria.jogos, { eager: true })
  categoria: Categoria;
}
