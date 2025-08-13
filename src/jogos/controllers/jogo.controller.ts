import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common";
import { JogoService } from "../services/jogo.service";
import { Jogo } from "../entities/jogo.entity";

@Controller("/produtos")
export class JogoController{

    constructor(private readonly jogoService: JogoService) {}

    @Get()
    @HttpCode(HttpStatus.OK) // HTTP Status 200
    findAll(): Promise<Jogo[]>{
        return this.jogoService.findAll();
    }

    @Get('/:id')
    @HttpCode(HttpStatus.OK) // HTTP Status 200
    findById(@Param('id', ParseIntPipe) id: number): Promise<Jogo>{
        return this.jogoService.findById(id);
    }

    @Get('/nome/:nome')
    @HttpCode(HttpStatus.OK) // HTTP Status 200
    findByTitulo(@Param('nome') nome: string): Promise<Jogo[]>{
        return this.jogoService.findByNome(nome);
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
    @HttpCode(HttpStatus.NO_CONTENT) // HTTP Status 204
    delete(@Param('id', ParseIntPipe) id: number){
        return this.jogoService.delete(id);
    }
    
}
