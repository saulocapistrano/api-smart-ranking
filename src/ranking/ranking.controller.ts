import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { RankingService } from './ranking.service';
import { IPlayer } from '../players/interfaces/player.interface';

@ApiTags('Ranking')
@Controller('api/v1/rankings')
export class RankingController {
  constructor(private readonly rankingService: RankingService) {}

  @Get()
  @ApiOperation({ summary: 'List all players ordered by ranking' })
  async getRanking(): Promise<IPlayer[]> {
    return this.rankingService.getRankedPlayers();
  }
}
