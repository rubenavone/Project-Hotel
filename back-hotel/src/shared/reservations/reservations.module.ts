import { Module } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { Reservation } from './reservation.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesModule } from '../categories/categories.module';
import { PeriodsModule } from '../periods/periods.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Reservation]),
    CategoriesModule,
    PeriodsModule,
  ],
  providers: [ReservationsService],
  exports: [ReservationsService],
})
export class ReservationsModule {}
