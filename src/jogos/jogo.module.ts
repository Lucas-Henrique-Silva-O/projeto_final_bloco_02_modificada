import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Jogo } from './entities/jogo.entity';
import { JogoService } from './services/jogo.service';
import { JogoController } from './controllers/jogo.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Jogo])],
  controllers: [JogoController],
  providers: [JogoService],
  exports: [TypeOrmModule],
})
export class JogoModule {}
