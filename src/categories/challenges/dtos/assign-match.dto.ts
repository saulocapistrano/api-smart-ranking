import { IsString, IsArray, IsNotEmpty, IsNumber } from 'class-validator';

export class AssignMatchDto {
  @IsString()
  @IsNotEmpty()
  winner: string;

  @IsString()
  @IsNotEmpty()
  result: 'VICTORY_A' | 'VICTORY_B' | 'DRAW';

  @IsArray()
  @IsNotEmpty({ each: true })
  goals: Array<{
    player: string;
    goals: number;
  }>;
}
