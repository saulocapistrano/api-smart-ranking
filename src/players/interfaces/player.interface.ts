import { Document } from 'mongoose';

export interface IPlayer extends Document {
  readonly _id: string;
  phoneNumber: string;
  email: string;
  name: string;
  ranking: string;
  rankingPosition: number;
  urlImagePlayer: string;
}
