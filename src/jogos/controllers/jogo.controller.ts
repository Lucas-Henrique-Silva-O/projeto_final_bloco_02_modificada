import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { JogoService } from '../services/jogo.service';
import { Jogo } from '../entities/jogo.entity';

@Controller('/jogos')
export class JogoController {
  constructor(private readonly jogoService: JogoService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Jogo[]> {
    return this.jogoService.findAll();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id', ParseIntPipe) id: number): Promise<Jogo> {
    return this.jogoService.findById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() jogo: Jogo): Promise<Jogo> {
    return this.jogoService.create(jogo);
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  update(@Body() jogo: Jogo): Promise<Jogo> {
    return this.jogoService.update(jogo);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.jogoService.delete(id);
  }
}
