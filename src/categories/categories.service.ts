import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ICategory } from './interfaces/categories.interface';
import { CreateCategoryDTO } from './dto/create-categories.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel('Category') private readonly categoryModel: Model<ICategory>,
  ) {}

  // CREATE or UPDATE a category (Upsert approach)
  async createOrUpdate(dto: CreateCategoryDTO): Promise<ICategory> {
    const { category } = dto;
    if (!category) {
      throw new BadRequestException('Category name is required');
    }

    const existingCategory = await this.categoryModel
      .findOne({ category })
      .exec();
    if (existingCategory) {
      // Update existing
      return this.updateCategory(existingCategory._id, dto);
    } else {
      // Create new
      return this.createCategory(dto);
    }
  }

  async createCategory(dto: CreateCategoryDTO): Promise<ICategory> {
    const categoryCreated = new this.categoryModel(dto);
    return await categoryCreated.save();
  }

  async updateCategory(id: string, dto: CreateCategoryDTO): Promise<ICategory> {
    const updated = await this.categoryModel
      .findByIdAndUpdate(id, { $set: dto }, { new: true })
      .exec();

    if (!updated) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return updated;
  }

  async findAllCategories(): Promise<ICategory[]> {
    return this.categoryModel.find().exec();
  }

  async findCategoryById(id: string): Promise<ICategory> {
    const category = await this.categoryModel.findById(id).exec();
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return category;
  }

  async deleteCategory(id: string): Promise<void> {
    const result = await this.categoryModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
  }
}
