import { Schema } from 'mongoose';

export const PlayerSchema = new Schema(
  {
    phoneNumber: { type: String },
    email: { type: String, unique: true },
    name: String,
    ranking: { type: String, default: 'N/A' },
    rankingPosition: { type: Number, default: 0 },
    totalPoints: { type: Number, default: 0 },
    matches: { type: Number, default: 0 },
    urlImagePlayer: { type: String },
  },
  { timestamps: true, collection: 'players' },
);
