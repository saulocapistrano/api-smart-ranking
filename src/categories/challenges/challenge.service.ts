import {
  Injectable,
  Logger,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Challenge } from './interfaces/challenge.interface';
import { CreateChallengeDto } from './dtos/create-challenge.dto';
import { UpdateChallengeStatusDto } from './dtos/update-challenge-status.dto';
import { AssignMatchDto } from './dtos/assign-match.dto';
import { ChallengeStatusEnum } from './enums/challenge-status.enum';

@Injectable()
export class ChallengeService {
  constructor(
    @InjectModel('Challenge') private readonly challengeModel: Model<Challenge>,
  ) {}

  private readonly logger = new Logger(ChallengeService.name);

  async createChallenge(
    createChallengeDto: CreateChallengeDto,
  ): Promise<Challenge> {
    const createdChallenge = new this.challengeModel({
      ...createChallengeDto,
      status: ChallengeStatusEnum.PENDING,
      dateTimeRequest: new Date(),
    });

    return await createdChallenge.save();
  }

  async findChallengeById(id: string): Promise<Challenge> {
    const challenge = await this.challengeModel.findById(id).exec();
    if (!challenge) {
      throw new NotFoundException(`Challenge with id ${id} not found`);
    }
    return challenge;
  }

  async findAllChallenges(): Promise<Challenge[]> {
    return await this.challengeModel
      .find()
      .populate('requester')
      .populate('players')
      .populate('category')
      .exec();
  }

  async updateChallenge(
    id: string,
    updateData: Partial<Challenge>,
  ): Promise<Challenge> {
    const updatedChallenge = await this.challengeModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();
    if (!updatedChallenge) {
      throw new NotFoundException(`Challenge with id ${id} not found`);
    }
    return updatedChallenge;
  }

  async deleteChallenge(id: string): Promise<void> {
    const deletedChallenge = await this.challengeModel
      .findByIdAndDelete(id)
      .exec();
    if (!deletedChallenge) {
      throw new NotFoundException(`Challenge with id ${id} not found`);
    }
  }

  async updateChallengeStatus(
    id: string,
    updateChallengeStatusDto: UpdateChallengeStatusDto,
  ): Promise<Challenge> {
    const challenge = await this.findChallengeById(id);

    challenge.status = updateChallengeStatusDto.status;
    challenge.dateTimeResponse = new Date();

    return await challenge.save();
  }

  async assignMatch(
    id: string,
    assignMatchDto: AssignMatchDto,
  ): Promise<Challenge> {
    const challenge = await this.findChallengeById(id);

    if (challenge.status !== ChallengeStatusEnum.ACCEPTED) {
      throw new BadRequestException(
        'Only accepted challenges can have a match assigned.',
      );
    }

    challenge.status = ChallengeStatusEnum.COMPLETED;
    challenge.match = assignMatchDto;
    challenge.dateTimeResponse = new Date();

    return await challenge.save();
  }
}
