import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IPlayer } from '../players/interfaces/player.interface';

@Injectable()
export class RankingService {
  constructor(
    @InjectModel('Player') private readonly playerModel: Model<IPlayer>,
  ) {}

  private readonly logger = new Logger(RankingService.name);

  async updateRanking(
    winnerId: string,
    loserId: string,
    result: 'VICTORY_A' | 'VICTORY_B' | 'DRAW',
  ): Promise<void> {
    const winner = await this.playerModel.findById(winnerId).exec();
    const loser = await this.playerModel.findById(loserId).exec();

    if (!winner || !loser) {
      throw new NotFoundException('Winner or loser not found!');
    }

    // Atualiza partidas jogadas
    winner.matches += 1;
    loser.matches += 1;

    // Atualiza pontuação
    if (result === 'VICTORY_A' || result === 'VICTORY_B') {
      winner.totalPoints += 3; // vitória
    } else if (result === 'DRAW') {
      winner.totalPoints += 1; // empate
      loser.totalPoints += 1; // empate
    }

    await winner.save();
    await loser.save();

    await this.updateRankingPositions();
  }

  async updateRankingPositions(): Promise<void> {
    const players = await this.playerModel
      .find()
      .sort({ totalPoints: -1 })
      .exec();

    let position = 1;
    for (const player of players) {
      player.rankingPosition = position++;
      await player.save();
    }
  }

  async getRankedPlayers(category?: string): Promise<IPlayer[]> {
    const filter = category ? { ranking: category } : {};

    return await this.playerModel.find(filter).sort({ totalPoints: -1 }).exec();
  }
}
