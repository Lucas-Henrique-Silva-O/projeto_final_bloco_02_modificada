import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, ILike, Repository } from "typeorm";
import { CategoriaService } from "../../categoria/services/categoria.service";
import { Jogo } from "../entities/jogo.entity";

@Injectable()
export class JogoService{
    constructor(
        @InjectRepository(Jogo)
        private jogoRepository: Repository<Jogo>,
        private categoriaService: CategoriaService
    ){}

    async findAll(): Promise<Jogo[]>{
        return await this.jogoRepository.find({
            relations: {
                categoria: true,
            }
        });

        // SELECT * FROM tb_postagens;
    }

    async findById(id: number): Promise<Jogo> {

        let jogo = await this.jogoRepository.findOne({
            where:{
                id
            },
            relations: {
                categoria: true,
            }
        });

        // Checar se o jogo não foi encontrado
        if (!jogo)
            throw new HttpException('Jogo não encontrada!', HttpStatus.NOT_FOUND);

        // Retornar o jogo, caso ele exista
        return jogo;

        // SELECT * FROM tb_postagens WHERE id = ?;
    }

    async findByNome(nome: string): Promise<Jogo[]>{
        return await this.jogoRepository.find({
            where:{
                nome: ILike(`%${nome}%`)
            },
            relations: {
                categoria: true,
            }
        })

        // SELECT * FROM tb_postagens WHERE nome LIKE '%nome%';
    }

    async create(jogo: Jogo): Promise<Jogo>{

        // Caso o categoria tenha sido preenchido
        if (jogo.categoria){

            let categoria = await this.categoriaService.findById(jogo.categoria.id)

            if(!categoria)
                throw new HttpException('Categoria não foi encontrado!', HttpStatus.NOT_FOUND)

            return await this.jogoRepository.save(jogo);
        }

        // Caso o categoria não tenha sido preenchido
        return await this.jogoRepository.save(jogo);

         // INSERT INTO tb_postagens (nome, texto, data) VALUES (?, ?, server);
    }

    async update(jogo: Jogo): Promise<Jogo>{
        
        let buscaJogo: Jogo = await this.findById(jogo.id);
        
        // Verifica se o jogo existe
        if (!buscaJogo || !jogo.id)
            throw new HttpException('Jogo não foi encontrado!', HttpStatus.NOT_FOUND)

         // Caso a categoria tenha sido preenchida
        if (jogo.categoria){

            let categoria = await this.categoriaService.findById(jogo.categoria.id)

            if(!categoria)
                throw new HttpException('Categoria não foi encontrado!', HttpStatus.NOT_FOUND)

            return await this.jogoRepository.save(jogo);
        }

        return await this.jogoRepository.save(jogo);

         // UPDATE tb_postagens SET nome = ?, texto = ?, data = server WHERE id = ?;

    }

    async delete(id: number): Promise<DeleteResult>{
        
        let buscaJogo: Jogo = await this.findById(id);
        
        if (!buscaJogo)
            throw new HttpException('Jogo não foi encontrado!', HttpStatus.NOT_FOUND)

        return await this.jogoRepository.delete(id);
        
    }

}