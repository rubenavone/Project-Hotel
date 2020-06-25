import {
  Controller,
  Get,
  Query,
  ParseIntPipe,
  Post,
  Body,
  Delete,
  Param,
} from '@nestjs/common';
import {
  ReservationsService,
  Stay,
} from 'src/shared/reservations/reservations.service';
import { AvailabilityResultDto } from 'src/shared/reservations/availabilityResult.dto';
import { Reservation } from 'src/shared/reservations/reservation.entity';
import { ReservationDto } from 'src/shared/reservations/reservation.dto';

@Controller('booking')
export class BookingController {
  constructor(private reservationsServices: ReservationsService) {}
  @Get('available') // /booking/available?start=2020/07/12&end=2020/07/12&persons=2
  searchAvailable(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
    @Query('persons', ParseIntPipe) persons: number,
  ): Promise<AvailabilityResultDto> {
    const stay: Stay = { startDate, endDate };
    return this.reservationsServices.searchAvailable2(stay, persons);
  }

  @Post('try-booking') // /booking/available?start=2020/07/12&end=2020/07/12&persons=2
  tryBooking(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
    @Query('persons', ParseIntPipe) persons: number,
    @Query('category') categoryId: number,
    @Body() reservationDto: ReservationDto,
  ): Promise<Reservation> {
    const stay: Stay = { startDate, endDate };
    return this.reservationsServices.tryBooking(
      stay,
      persons,
      categoryId,
      reservationDto,
    );
  }
  @Delete(':code')
  delete(@Param('code') code: string): Promise<Reservation> {
    return this.reservationsServices.delete(code);
  }
}
