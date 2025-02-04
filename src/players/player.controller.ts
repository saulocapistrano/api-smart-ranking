import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Delete,
  Query,
  BadRequestException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiParam,
} from '@nestjs/swagger';
import { CreatePlayerDTO } from './dtos/create-player.dto';
import { PlayersService } from './player.service';
import { IPlayer } from './interfaces/player.interface';

@ApiTags('Players')
@Controller('api/v1/players')
export class PlayersController {
  constructor(private readonly playersServices: PlayersService) {}

  @Post()
  @ApiOperation({ summary: 'Create or update a player' })
  @ApiResponse({
    status: 201,
    description: 'Player created or updated successfully',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async createUpdatePlayer(
    @Body() createPlayerDTO: CreatePlayerDTO,
  ): Promise<void> {
    if (!createPlayerDTO.email) {
      throw new BadRequestException('Email is required');
    }

    await this.playersServices.createUpdatePlayer(createPlayerDTO);
  }

  @Get()
  @ApiOperation({ summary: 'Get all players' })
  @ApiResponse({
    status: 200,
    description: 'List of players retrieved successfully',
  })
  async findPlayers(): Promise<IPlayer[]> {
    return this.playersServices.findAllPlayers();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a player by ID' })
  @ApiParam({ name: 'id', description: 'Player ID', type: Number })
  @ApiResponse({ status: 200, description: 'Player retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Player not found' })
  async findPlayerById(id: string): Promise<IPlayer> {
    const player = await this.playerModel.findById(id).exec();
    if (!player) {
      throw new NotFoundException(`Player with ID ${id} not found`);
    }
    return player;
  }

  @Get('search')
  @ApiOperation({ summary: 'Search players by name or email' })
  @ApiQuery({ name: 'name', required: false, description: 'Player name' })
  @ApiQuery({ name: 'email', required: false, description: 'Player email' })
  @ApiResponse({ status: 200, description: 'Players retrieved successfully' })
  @ApiResponse({ status: 400, description: 'Invalid query parameters' })
  async searchPlayers(
    @Query('name') name?: string,
    @Query('email') email?: string,
  ): Promise<IPlayer | IPlayer[]> {
    if (!name && !email) {
      throw new BadRequestException(
        'At least one search parameter (name or email) is required',
      );
    }

    if (name) {
      return this.playersServices.findPlayerByName(name);
    }

    if (email) {
      return this.playersServices.findPlayerByEmail(email);
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a player by ID' })
  @ApiParam({ name: 'id', description: 'Player ID', type: Number })
  @ApiResponse({ status: 200, description: 'Player deleted successfully' })
  @ApiResponse({ status: 404, description: 'Player not found' })
  async deletePlayer(@Param('id') id: number): Promise<void> {
    await this.playersServices.deletePlayer(id.toString());
  }
}
