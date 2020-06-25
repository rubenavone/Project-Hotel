import {
  Controller,
  Delete,
  Post,
  Get,
  Put,
  Param,
  ParseIntPipe,
  Body,
  Query,
  HttpCode,
  HttpStatus,
  ValidationPipe,
  UsePipes,
  HttpException,
} from '@nestjs/common';
import { PeriodsService } from '../shared/periods/periods.service';
import { Period } from '../shared/periods/period.entity';
import { PeriodDto } from '../shared/periods/period.dto';
import { ApiQuery } from '@nestjs/swagger';

@Controller('admin/periods')
@UsePipes(
  new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }),
)
export class PeriodsController {
  constructor(private PeriodsServices: PeriodsService) {}

  @Get() //admin/periods?categorie=3&start=2020/06/24&end=2020/07/02
  @ApiQuery({ name: 'categoryId', required: false })
  @ApiQuery({ name: 'startDate', required: false })
  @ApiQuery({ name: 'endDate', required: false })
  searchAll(
    @Query('categoryId') categoryId?: number,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ): Promise<Period[]> {
    return this.PeriodsServices.searchAll();
  }

  @Get(':id')
  readOne(@Param('id', ParseIntPipe) id: number): Promise<Period> {
    return this.PeriodsServices.readOne(id);
  }

  @Post()
  create(@Body() periodDto: PeriodDto): Promise<Period> {
    if (periodDto.startDate > periodDto.endDate) {
      throw new HttpException(
        'Error date is not correct (end date must be before start date)',
        HttpStatus.I_AM_A_TEAPOT,
      );
    }
    return this.PeriodsServices.postPeriodAsync(periodDto);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() periodDto: PeriodDto,
  ): Promise<void> {
    return this.PeriodsServices.put(id, periodDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.PeriodsServices.delete(id);
  }
}
