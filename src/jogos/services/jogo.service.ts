import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Jogo } from '../entities/jogo.entity';

@Injectable()
export class JogoService {
  constructor(
    @InjectRepository(Jogo)
    private jogoRepository: Repository<Jogo>,
  ) {}

  async findAll(): Promise<Jogo[]> {
    return await this.jogoRepository.find();
  }

  async findById(id: number): Promise<Jogo> {
    const jogo = await this.jogoRepository.findOne({ where: { id } });
    if (!jogo) {
      throw new HttpException('Jogo não encontrado!', HttpStatus.NOT_FOUND);
    }
    return jogo;
  }

  async create(jogo: Jogo): Promise<Jogo> {
    return await this.jogoRepository.save(jogo);
  }

  async update(jogo: Jogo): Promise<Jogo> {
    const busca = await this.findById(jogo.id);
    if (!busca) {
      throw new HttpException('Jogo não encontrado!', HttpStatus.NOT_FOUND);
    }
    return await this.jogoRepository.save(jogo);
  }

  async delete(id: number) {
    const busca = await this.findById(id);
    if (!busca) {
      throw new HttpException('Jogo não encontrado!', HttpStatus.NOT_FOUND);
    }
    return await this.jogoRepository.delete(id);
  }
}
