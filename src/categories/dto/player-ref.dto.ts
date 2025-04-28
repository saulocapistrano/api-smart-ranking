import { IsString } from 'class-validator';

export class PlayerRefDTO {
  @IsString()
  _id: string;
}
