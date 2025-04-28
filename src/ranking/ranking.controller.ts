import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { RankingService } from './ranking.service';
import { IPlayer } from '../players/interfaces/player.interface';

@ApiTags('Ranking')
@Controller('api/v1/rankings')
export class RankingController {
  constructor(private readonly rankingService: RankingService) {}

  @Get()
  @ApiOperation({
    summary: 'List players ordered by ranking, optionally filtered by category',
  })
  @ApiQuery({
    name: 'category',
    required: false,
    description: 'Category filter (e.g., A, B, C)',
  })
  async getRanking(@Query('category') category?: string): Promise<IPlayer[]> {
    return this.rankingService.getRankedPlayers(category);
  }

  @Get('top')
  @ApiOperation({ summary: 'List the top players' })
  async getTopPlayers(): Promise<IPlayer[]> {
    return this.rankingService.getTopPlayers(10);
  }
}
