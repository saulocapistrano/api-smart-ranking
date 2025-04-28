import {
  IsString,
  IsOptional,
  IsArray,
  ValidateNested,
  IsNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';
import { EventDTO } from './event.dto';
import { PlayerRefDTO } from './player-ref.dto';

export class CreateCategoryDTO {
  @IsString()
  @IsNotEmpty()
  category: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EventDTO)
  @IsOptional()
  events?: EventDTO[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PlayerRefDTO)
  @IsOptional()
  players?: PlayerRefDTO[];
}
