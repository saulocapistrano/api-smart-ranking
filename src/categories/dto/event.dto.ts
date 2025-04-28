import { IsString, IsNumber } from 'class-validator';

export class EventDTO {
  @IsString()
  name: string;

  @IsString()
  operation: string;

  @IsNumber()
  value: number;
}
