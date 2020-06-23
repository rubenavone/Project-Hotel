import { Injectable, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { Repository } from 'typeorm';
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

  postCategory(CategoryDto: CategoryDto): Promise<Category> {
    return this.categoriesRepository.save(CategoryDto);
  }

  /**
   * La même méthode mais en version insert/asynchrone
   */
  async postCategoryAsync(CategoryDto: CategoryDto): Promise<Category> {
    const insertResult = await this.categoriesRepository.insert(CategoryDto);
    const insertedId = insertResult.identifiers[0].id;
    return this.categoriesRepository.findOne(insertedId);
  }

  async put(id: number, CategoryDto: CategoryDto): Promise<void> {
    const resultUpdate = await this.categoriesRepository.update(
      id,
      CategoryDto,
    );
    if (resultUpdate.affected === 0) {
      throw new HttpException('Customer not found', HttpStatus.NOT_FOUND);
    }
  }

  async delete(id: number): Promise<void> {
    const result = await this.categoriesRepository.delete(id);
    if (result.affected === 0) {
      throw new HttpException('Customer not found', HttpStatus.NOT_FOUND);
    }
  }
}
