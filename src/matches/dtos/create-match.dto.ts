import { IsString, IsArray, IsNotEmpty, IsEnum } from 'class-validator';

export class CreateMatchDto {
  @IsString()
  @IsNotEmpty()
  category: string;

  @IsArray()
  @IsNotEmpty({ each: true })
  players: string[];

  @IsString()
  @IsNotEmpty()
  winner: string;

  @IsEnum(['VICTORY_A', 'VICTORY_B', 'DRAW'])
  result: 'VICTORY_A' | 'VICTORY_B' | 'DRAW';

  @IsArray()
  @IsNotEmpty({ each: true })
  goals: Array<{
    player: string;
    goals: number;
  }>;

  @IsString()
  @IsNotEmpty()
  challenge: string;
}
