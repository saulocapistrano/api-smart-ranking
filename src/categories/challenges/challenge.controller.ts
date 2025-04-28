import {
  Body,
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { ChallengeService } from './challenge.service';
import { CreateChallengeDto } from './dtos/create-challenge.dto';
import { UpdateChallengeStatusDto } from './dtos/update-challenge-status.dto';
import { AssignMatchDto } from './dtos/assign-match.dto';
import { Challenge } from './interfaces/challenge.interface';

@ApiTags('Challenges')
@Controller('api/v1/challenges')
export class ChallengeController {
  constructor(private readonly challengeService: ChallengeService) {}

  @Post()
  @ApiOperation({ summary: 'Create a challenge' })
  @ApiResponse({ status: 201, description: 'Challenge created successfully' })
  async createChallenge(
    @Body() createChallengeDto: CreateChallengeDto,
  ): Promise<Challenge> {
    return await this.challengeService.createChallenge(createChallengeDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a challenge by ID' })
  @ApiParam({ name: 'id', description: 'Challenge ID' })
  async getChallengeById(@Param('id') id: string): Promise<Challenge> {
    return await this.challengeService.findChallengeById(id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all challenges' })
  async getAllChallenges(): Promise<Challenge[]> {
    return await this.challengeService.findAllChallenges();
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update challenge fields' })
  async updateChallenge(
    @Param('id') id: string,
    @Body() updateData: Partial<Challenge>,
  ): Promise<Challenge> {
    return await this.challengeService.updateChallenge(id, updateData);
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Update challenge status' })
  async updateChallengeStatus(
    @Param('id') id: string,
    @Body() updateChallengeStatusDto: UpdateChallengeStatusDto,
  ): Promise<Challenge> {
    return await this.challengeService.updateChallengeStatus(
      id,
      updateChallengeStatusDto,
    );
  }

  @Patch(':id/match')
  @ApiOperation({ summary: 'Assign match result to a challenge' })
  async assignMatch(
    @Param('id') id: string,
    @Body() assignMatchDto: AssignMatchDto,
  ): Promise<Challenge> {
    return await this.challengeService.assignMatch(id, assignMatchDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a challenge' })
  @ApiParam({ name: 'id', description: 'Challenge ID' })
  async deleteChallenge(@Param('id') id: string): Promise<void> {
    return await this.challengeService.deleteChallenge(id);
  }
}
