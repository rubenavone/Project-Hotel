import { IsNumber, IsISO8601, Allow } from 'class-validator';
import { PeriodData } from './period.entity';
/**
 * @param  {string} name //Doit etre remplis, etre une chaine de caractere
 * @param  {string} description
 * @param  {number} persons
 */
export class PeriodDto {
  @IsNumber()
  categoryId: number;

  @IsISO8601({ strict: true })
  startDate: string; //'2020-06-24'

  @IsISO8601({ strict: true })
  endDate: string; //'2020-06-24'

  @Allow()
  data: PeriodData;
}
