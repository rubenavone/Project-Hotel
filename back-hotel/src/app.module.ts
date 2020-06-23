import { Module } from '@nestjs/common';
import { CategoriesModule } from './categories/categories.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './categories/category.entity';

@Module({
  imports: [
    CategoriesModule,
    TypeOrmModule.forRoot({
      type: 'postgres', //type de bases de données
      host: 'localhost',
      port: 5432,
      username: 'hotel',
      password: 'azerty',
      database: 'hoteldb',
      schema: 'hotel', //Choose a scheme default: public
      entities: [Category],
      synchronize: true, //Permet de synchroniser les entité
    }),
  ],
})
export class AppModule {}
