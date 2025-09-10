import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriaModule } from './categoria/categoria.module';
import { JogoModule } from './jogos/jogo.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root', // ajuste se necessário
      password: 'F8!terra@6voo', // ajuste se necessário
      database: 'lojagames',
      autoLoadEntities: true,
      synchronize: true,
    }),
    CategoriaModule,
    JogoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
