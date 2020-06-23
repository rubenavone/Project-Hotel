import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { Category } from './category.entity';
import { CategoriesService } from './categories.service';
import { CategoryDto } from './category.dto';

/**
 * Appel des service dans ce fichiers controller
 */

@Controller('admin/categories')
export class CategoriesController {
  constructor(private categorieServices: CategoriesService) {}

  @Get()
  getAll(): Promise<Category[]> {
    // Promise<Category[]> verifie que le retour correspond bien
    return this.categorieServices.getAll();
  }

  @Get(':id') //definis la route a suivre
  //@Param attrape l'argument id entrée dans l'url et le restitue a getOne()
  getOne(@Param('id', ParseIntPipe) id: number): Promise<Category> {
    return this.categorieServices.getOne(id);
  }

  @Post()
  postCategory(@Body() CategoryDto: CategoryDto): Promise<Category> {
    //return this.categorieServices.postCategory(CategoryDto);
    return this.categorieServices.postCategoryAsync(CategoryDto);
  }

  @Put(':id')
  put(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.put(id);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.categorieServices.delete(id);
  }
}
