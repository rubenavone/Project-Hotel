import {
  IsNotEmpty,
  IsString,
  MaxLength,
  IsNumber,
  IsPositive,
  IsInt,
} from 'class-validator';
import { CategoryData } from './category.entity';
/**
 * @param  {string} name //Doit etre remplis, etre une chaine de caractere
 * @param  {string} description
 * @param  {number} persons
 */
export class CategoryDto {
  @IsNotEmpty() //Ne peut pas etre vide
  @IsString() //Etre une chaine de caractere
  @MaxLength(15) //Contenir maximum 15 charactere
  name: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(150)
  description: string;

  @IsNotEmpty()
  @IsNumber() //Etre un nombre
  @IsPositive()
  @IsInt() //Empeche
  persons: number;

  @IsNotEmpty()
  data?: CategoryData;

  get rooms(): string[] {
    return this.data?.rooms || [];
  }
}
