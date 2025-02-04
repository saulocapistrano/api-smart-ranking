import {
  Injectable,
  Logger,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreatePlayerDTO } from './dtos/create-player.dto';
import { IPlayer } from './interfaces/player.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class PlayersService {
  constructor(
    @InjectModel('Player') private readonly playerModel: Model<IPlayer>,
  ) {}

  private readonly logger = new Logger(PlayersService.name);

  async createUpdatePlayer(createPlayerDTO: CreatePlayerDTO): Promise<void> {
    const { email } = createPlayerDTO;

    if (!email) {
      throw new BadRequestException('Email is required');
    }

    const playerFound = await this.playerModel.findOne({ email }).exec();

    if (playerFound) {
      await this.update(createPlayerDTO);
    } else {
      await this.create(createPlayerDTO);
    }
  }

  async findAllPlayers(): Promise<IPlayer[]> {
    this.logger.log('Retrieving all players');
    return await this.playerModel.find().exec();
  }

  async findPlayerById(id: string): Promise<IPlayer> {
    this.logger.log(`Searching for player with ID: ${id}`);
    const player = await this.playerModel.findById(id).exec();

    if (!player) {
      throw new NotFoundException(`Player with ID ${id} not found`);
    }

    return player;
  }

  async findPlayerByName(name: string): Promise<IPlayer[]> {
    if (!name) {
      throw new BadRequestException('Name is required');
    }

    this.logger.log(`Searching for players with name: ${name}`);
    const players = await this.playerModel
      .find({ name: new RegExp(name, 'i') })
      .exec();

    if (!players.length) {
      throw new NotFoundException(`No players found with name ${name}`);
    }

    return players;
  }

  async findPlayerByEmail(email: string): Promise<IPlayer> {
    if (!email) {
      throw new BadRequestException('Email is required');
    }

    this.logger.log(`Searching for player with email: ${email}`);
    const player = await this.playerModel.findOne({ email: email }).exec();

    if (!player) {
      throw new NotFoundException(`Player with email ${email} not found`);
    }

    return player;
  }

  async deletePlayer(id: string): Promise<void> {
    this.logger.log(`Deleting player with ID: ${id}`);

    const result = await this.playerModel.findByIdAndDelete(id).exec();

    if (!result) {
      throw new NotFoundException(`Player with ID ${id} not found`);
    }

    this.logger.log(`Player with ID ${id} deleted successfully`);
  }

  private async create(createPlayerDTO: CreatePlayerDTO): Promise<IPlayer> {
    const playerCreated = new this.playerModel(createPlayerDTO);
    this.logger.log(`Creating player: ${JSON.stringify(createPlayerDTO)}`);
    return await playerCreated.save();
  }

  private async update(createPlayerDTO: CreatePlayerDTO): Promise<IPlayer> {
    const updatedPlayer = await this.playerModel
      .findOneAndUpdate(
        { email: createPlayerDTO.email },
        { $set: createPlayerDTO },
        { new: true },
      )
      .exec();

    if (!updatedPlayer) {
      throw new NotFoundException(
        `Player with email ${createPlayerDTO.email} not found`,
      );
    }

    this.logger.log(`Updated player: ${JSON.stringify(updatedPlayer)}`);
    return updatedPlayer;
  }
}
