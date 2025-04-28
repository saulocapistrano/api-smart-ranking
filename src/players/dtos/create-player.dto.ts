import { IsEmail, IsString } from 'class-validator';

export class CreatePlayerDTO {
  @IsString()
  readonly phoneNumber: string;
  @IsEmail()
  readonly email: string;
  @IsString()
  name: string;
}
