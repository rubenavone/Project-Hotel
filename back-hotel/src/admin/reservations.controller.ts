import { Controller, Get, Query } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
import { Reservation } from 'src/shared/reservations/reservation.entity';
import {
  ReservationsService,
  Stay,
} from 'src/shared/reservations/reservations.service';

@Controller('admin/reservations')
export class ReservationsController {
  constructor(private ReservationsServices: ReservationsService) {}

  @Get() //   /admin/reservation?category=3&start=2020-06-24&end=2020-07-02
  @ApiQuery({ name: 'category', required: false })
  @ApiQuery({ name: 'start', required: false })
  @ApiQuery({ name: 'end', required: false })
  searchAll(
    @Query('category') categoryID?: number,
    @Query('start') startDate?: string,
    @Query('end') endDate?: string,
  ): Promise<Reservation[]> {
    return this.ReservationsServices.searchAll({
      categoryID,
      startDate,
      endDate,
    });
  }
}
