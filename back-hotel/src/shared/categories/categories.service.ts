import { Injectable, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { Repository, DeleteResult, UpdateResult } from 'typeorm';
import { CategoryDto } from './category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    /**
     * Cette partie permet d'ajouter l'entité categorie a la classe
     */
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  getAll(): Promise<Category[]> {
    return this.categoriesRepository.find();
  }

  /**
   * Méthode pour récuperer une chambre avec un ID en argument
   * @param {number} id
   */
  async getOne(id: number): Promise<Category> {
    const categoryResult: Category = await this.categoriesRepository.findOne(
      id,
    );
    if (!categoryResult) {
      throw new HttpException('Customer not found', HttpStatus.I_AM_A_TEAPOT);
    }
    return categoryResult;
  }

  postCategory(categoryDto: CategoryDto): Promise<Category> {
    //Création d'une verification pour qu'il n'y ai pas de doublons de chambre
    this.checkIfExist(categoryDto.rooms);
    return this.categoriesRepository.save(categoryDto);
  }

  /**
   * La même méthode mais en version insert/asynchrone
   */
  async postCategoryAsync(categoryDto: CategoryDto): Promise<Category> {
    console.log(categoryDto);
    await this.checkIfExist(categoryDto.rooms);
    const insertResult = await this.categoriesRepository.insert(categoryDto);
    const insertedId = insertResult.identifiers[0].id;
    return this.categoriesRepository.findOne(insertedId);
  }

  /**
   *
   * @param id
   * @param categoryDto
   */
  async put(id: number, categoryDto: CategoryDto): Promise<void> {
    await this.checkIfExist(categoryDto.rooms, id);
    const resultUpdate: UpdateResult = await this.categoriesRepository.update(
      id,
      categoryDto,
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
    const result: DeleteResult = await this.categoriesRepository.delete(id);
    if (result.affected === 0) {
      throw new HttpException('Customer not found', HttpStatus.I_AM_A_TEAPOT);
    }
  }

  async checkIfExist(
    newRooms: string[],
    ignodeCurrentId?: number,
  ): Promise<void> {
    const existingCategories: Category[] = await this.categoriesRepository.find();

    const otherCategories: Category[] = existingCategories.filter(
      cat => cat.id !== ignodeCurrentId,
    );

    const allRooms = [
      newRooms,
      ...otherCategories.map(cat => cat.rooms),
    ].flat();

    //Out: allRooms ['101', '102', '201', '102']
    const occurence: number[] = allRooms.map(
      room => allRooms.filter(r => r === room).length,
    );

    //Out: occurence = [1, 2, 1, 2]
    const hasDuplicated: boolean = occurence.some(occ => occ > 1);

    if (hasDuplicated) {
      throw new HttpException(
        'Duplicated room number',
        HttpStatus.I_AM_A_TEAPOT,
      );
    }
  }
}
