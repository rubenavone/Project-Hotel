import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Period } from './period.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { PeriodDto } from './period.dto';

@Injectable()
export class PeriodsService {
  constructor(
    /**
     * Cette partie permet d'ajouter l'entité periods a la classe
     */
    @InjectRepository(Period)
    private periodRepository: Repository<Period>,
  ) {}

  async searchAll(options?: {
    startDate?: string;
    endDate?: string;
    categoryID?: number;
    ignorePeriodId?: number;
  }): Promise<Period[]> {
    let query = this.periodRepository.createQueryBuilder('period');
    if (options?.startDate) {
      query = query.andWhere('period.endDate >= :startDate', {
        startDate: options.startDate,
      });
    }
    if (options?.endDate) {
      query = query.andWhere('period.endDate <= :endDate', {
        endDate: options.startDate,
      });
    }
    if (options?.categoryID) {
      query = query.andWhere('period.endDate = :categoryID', {
        categoryID: options.startDate,
      });
    }
    const allPeriods = await query.getMany();
    // return allPeriods.filter(
    //   period =>
    //     !options?.ignorePeriodId || period.id !== options.ignorePeriodId);
    const mustIgnoredId = options?.ignorePeriodId;
    return mustIgnoredId
      ? allPeriods.filter(period => period.id !== options.ignorePeriodId)
      : allPeriods;
  }

  async readOne(id: number): Promise<Period> {
    const periodResult: Period = await this.periodRepository.findOne(id);
    if (!periodResult) {
      throw new HttpException('Customer not found', HttpStatus.I_AM_A_TEAPOT);
    }
    return periodResult;
  }

  async postPeriod(PeriodDto: PeriodDto): Promise<Period> {
    return this.periodRepository.save(PeriodDto);
  }

  /**
   * La même méthode mais en version insert/asynchrone
   */
  async postPeriodAsync(PeriodDto: PeriodDto): Promise<Period> {
    const existingPeriods: Period[] = await this.searchAll({
      startDate: PeriodDto.startDate,
      endDate: PeriodDto.endDate,
      categoryID: PeriodDto.categoryId,
    });

    if (existingPeriods.length > 0) {
      throw new HttpException('periods must not overlap.', HttpStatus.CONFLICT);
    }

    const insertResult = await this.periodRepository.insert(PeriodDto);
    const insertedId = insertResult.identifiers[0].id;
    return this.periodRepository.findOne(insertedId);
  }

  /**
   *
   * @param id
   * @param PeriodDto
   */
  async put(id: number, PeriodDto: PeriodDto): Promise<void> {
    const existingPeriods: Period[] = await this.searchAll({
      startDate: PeriodDto.startDate,
      endDate: PeriodDto.endDate,
      categoryID: PeriodDto.categoryId,
      ignorePeriodId: id,
    });

    if (existingPeriods.length > 0) {
      throw new HttpException('periods must not overlap.', HttpStatus.CONFLICT);
    }

    const resultUpdate: UpdateResult = await this.periodRepository.update(
      id,
      PeriodDto,
    );
    if (resultUpdate.affected === 0) {
      throw new HttpException('Customer not found', HttpStatus.I_AM_A_TEAPOT);
    }
  }
  /**
   *
   * @param id
   */
  async delete(id: number): Promise<void> {
    const result: DeleteResult = await this.periodRepository.delete(id);
    if (result.affected === 0) {
      throw new HttpException('Customer not found', HttpStatus.I_AM_A_TEAPOT);
    }
  }
}
