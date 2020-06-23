import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  UsePipes,
  ValidationPipe,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { Category } from './category.entity';
import { CategoriesService } from './categories.service';
import { CategoryDto } from './category.dto';

/**
 * Appel des service dans ce fichiers controller
 */

@Controller('admin/categories')
@UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
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
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() CategoryDto: CategoryDto,
  ): Promise<void> {
    return this.update(id, CategoryDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.categorieServices.delete(id);
  }
}
