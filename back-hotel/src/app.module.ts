import { Module } from '@nestjs/common';
import { CategoriesModule } from './categories/categories.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './categories/category.entity';
import { Period } from './periods/period.entity';
import { PeriodsModule } from './periods/periods.module';

@Module({
  imports: [
    CategoriesModule,
    PeriodsModule,
    TypeOrmModule.forRoot({
      type: 'postgres', //type de bases de données
      host: 'localhost',
      port: 5432,
      username: 'hotel',
      password: 'azerty',
      database: 'hoteldb',
      schema: 'hotel', //Choose a scheme default: public
      entities: [Category, Period],
      synchronize: true, //Permet de synchroniser les entité
    }),
  ],
})
export class AppModule {}
