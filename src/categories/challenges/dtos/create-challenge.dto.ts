import { IsDateString, IsString, IsArray, IsNotEmpty } from 'class-validator';

export class CreateChallengeDto {
  @IsDateString()
  dateTimeChallenge: Date;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsString()
  @IsNotEmpty()
  requester: string;

  @IsArray()
  @IsNotEmpty({ each: true })
  players: string[];

  @IsString()
  @IsNotEmpty()
  category: string;
}
