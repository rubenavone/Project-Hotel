import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './shared/categories/category.entity';
import { Period } from './shared/periods/period.entity';
import { AdminModule } from './admin/admin.module';
import { Reservation } from './shared/reservations/reservation.entity';
import { BookingModule } from './booking/booking.module';

@Module({
  imports: [
    AdminModule,
    BookingModule,
    TypeOrmModule.forRoot({
      type: 'postgres', //type de bases de données
      host: 'localhost',
      port: 5432,
      username: 'hotel',
      password: 'azerty',
      database: 'hoteldb',
      schema: 'hotel', //Choose a scheme default: public
      entities: [Category, Period, Reservation],
      synchronize: true, //Permet de synchroniser les entité
    }),
  ],
})
export class AppModule {}
