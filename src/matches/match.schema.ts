import { Schema } from 'mongoose';

export const MatchSchema = new Schema(
  {
    category: { type: Schema.Types.ObjectId, ref: 'Category' },
    players: [{ type: Schema.Types.ObjectId, ref: 'Player' }],
    winner: { type: Schema.Types.ObjectId, ref: 'Player' },
    result: { type: String },
    goals: [
      {
        player: { type: Schema.Types.ObjectId, ref: 'Player' },
        goals: { type: Number },
      },
    ],
    challenge: { type: Schema.Types.ObjectId, ref: 'Challenge' },
  },
  { timestamps: true, collection: 'matches' },
);
