import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CategoriaModule } from "../categoria/categoria.module";
import { CategoriaService } from "../categoria/services/categoria.service";
import { Jogo } from "./entities/jogo.entity";
import { JogoService } from "./services/jogo.service";
import { JogoController } from "./controllers/jogo.controller";

@Module({
    imports: [TypeOrmModule.forFeature([Jogo]), CategoriaModule],
    providers: [JogoService, CategoriaService],
    controllers: [JogoController],
    exports: [TypeOrmModule]
})

export class ProdutoModule { }