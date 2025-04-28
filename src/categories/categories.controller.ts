import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { CategoriesService } from './categories.service';
import { CreateCategoryDTO } from './dto/create-categories.dto';
import { ICategory } from './interfaces/categories.interface';

@ApiTags('Categories')
@Controller('api/v1/categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOperation({ summary: 'Create or update a category' })
  @ApiResponse({ status: 201, description: 'Category created or updated' })
  async createOrUpdateCategory(
    @Body() dto: CreateCategoryDTO,
  ): Promise<ICategory> {
    return this.categoriesService.createOrUpdate(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all categories' })
  @ApiResponse({ status: 200, description: 'List of categories' })
  async findAll(): Promise<ICategory[]> {
    return this.categoriesService.findAllCategories();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a single category by ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'Category retrieved successfully' })
  async findById(@Param('id') id: string): Promise<ICategory> {
    return this.categoriesService.findCategoryById(id);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOperation({ summary: 'Update an existing category by ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'Category updated successfully' })
  async updateCategory(
    @Param('id') id: string,
    @Body() dto: CreateCategoryDTO,
  ): Promise<ICategory> {
    return this.categoriesService.updateCategory(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a category by ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'Category deleted successfully' })
  async deleteById(@Param('id') id: string): Promise<void> {
    return this.categoriesService.deleteCategory(id);
  }
}
