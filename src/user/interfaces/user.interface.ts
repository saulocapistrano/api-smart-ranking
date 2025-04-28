import { Document } from 'mongoose';

export interface IUser extends Document {
  readonly email: string;
  readonly password: string;
  readonly name: string;
  readonly role: 'ADMIN' | 'PLAYER' | 'ESPECTADOR';
  readonly isActive: boolean;
}
