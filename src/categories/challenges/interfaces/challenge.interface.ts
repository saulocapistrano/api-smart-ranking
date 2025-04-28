import { Document } from 'mongoose';

export interface Challenge extends Document {
  dateTimeChallenge: Date;
  location: string;
  status: string;
  dateTimeRequest: Date;
  dateTimeResponse?: Date;
  requester: string;
  players: string[];
  category: string;
  match?: {
    winner: string;
    goals: Array<{
      player: string;
      goals: number;
    }>;
    result: 'VICTORY_A' | 'VICTORY_B' | 'DRAW';
  };
}
