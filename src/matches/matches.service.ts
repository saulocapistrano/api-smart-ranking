import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Match } from './interfaces/match.interface';
import { CreateMatchDto } from './dtos/create-match.dto';
import { UpdateMatchDto } from './dtos/update-match.dto';

@Injectable()
export class MatchesService {
  constructor(
    @InjectModel('Match') private readonly matchModel: Model<Match>,
  ) {}

  async create(createMatchDto: CreateMatchDto): Promise<Match> {
    const createdMatch = new this.matchModel(createMatchDto);
    return await createdMatch.save();
  }

  async findAll(): Promise<Match[]> {
    return await this.matchModel
      .find()
      .populate('category')
      .populate('players')
      .populate('winner')
      .populate('challenge')
      .exec();
  }

  async findById(id: string): Promise<Match> {
    const match = await this.matchModel.findById(id).exec();
    if (!match) {
      throw new NotFoundException(`Match with ID ${id} not found`);
    }
    return match;
  }

  async update(id: string, updateMatchDto: UpdateMatchDto): Promise<Match> {
    const updatedMatch = await this.matchModel
      .findByIdAndUpdate(id, updateMatchDto, { new: true })
      .exec();
    if (!updatedMatch) {
      throw new NotFoundException(`Match with ID ${id} not found`);
    }
    return updatedMatch;
  }

  async delete(id: string): Promise<void> {
    const deletedMatch = await this.matchModel.findByIdAndDelete(id).exec();
    if (!deletedMatch) {
      throw new NotFoundException(`Match with ID ${id} not found`);
    }
  }
}
