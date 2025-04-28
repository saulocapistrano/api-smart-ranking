import { Document } from 'mongoose';

export interface ICategory extends Document {
  readonly _id: string;
  category: string;
  description: string;
  events: Array<{
    name: string;
    operation: string;
    value: number;
  }>;
  players: Array<{
    _id: string; // or just string if you store the player ID directly
  }>;
}
