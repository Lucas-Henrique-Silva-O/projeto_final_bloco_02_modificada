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

        
        if (!jogo)
            throw new HttpException('Jogo não encontrada!', HttpStatus.NOT_FOUND);

        
        return jogo;

        
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

        
    }

    async create(jogo: Jogo): Promise<Jogo>{

        
        if (jogo.categoria){

            let categoria = await this.categoriaService.findById(jogo.categoria.id)

            if(!categoria)
                throw new HttpException('Categoria não foi encontrado!', HttpStatus.NOT_FOUND)

            return await this.jogoRepository.save(jogo);
        }

        
        return await this.jogoRepository.save(jogo);

         
    }

    async update(jogo: Jogo): Promise<Jogo>{
        
        let buscaJogo: Jogo = await this.findById(jogo.id);
        
        
        if (!buscaJogo || !jogo.id)
            throw new HttpException('Jogo não foi encontrado!', HttpStatus.NOT_FOUND)

        
        if (jogo.categoria){

            let categoria = await this.categoriaService.findById(jogo.categoria.id)

            if(!categoria)
                throw new HttpException('Categoria não foi encontrado!', HttpStatus.NOT_FOUND)

            return await this.jogoRepository.save(jogo);
        }

        return await this.jogoRepository.save(jogo);

         

    }

    async delete(id: number): Promise<DeleteResult>{
        
        let buscaJogo: Jogo = await this.findById(id);
        
        if (!buscaJogo)
            throw new HttpException('Jogo não foi encontrado!', HttpStatus.NOT_FOUND)

        return await this.jogoRepository.delete(id);
        
    }

}