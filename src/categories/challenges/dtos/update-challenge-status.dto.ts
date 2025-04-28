import { IsEnum, IsNotEmpty } from 'class-validator';
import { ChallengeStatusEnum } from '../enums/challenge-status.enum';

export class UpdateChallengeStatusDto {
  @IsEnum(ChallengeStatusEnum)
  @IsNotEmpty()
  status: ChallengeStatusEnum;
}
