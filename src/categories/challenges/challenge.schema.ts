import { Schema } from 'mongoose';

export const ChallengeSchema = new Schema(
  {
    dateTimeChallenge: { type: Date },
    local: { type: String },
    status: { type: String },
    dateTimeRequest: { type: Date, default: Date.now },
    dateTimeResponse: { type: Date },
    requester: { type: Schema.Types.ObjectId, ref: 'Player' },
    players: [{ type: Schema.Types.ObjectId, ref: 'Player' }],
    category: { type: Schema.Types.ObjectId, ref: 'Category' },
    match: {
      type: {
        winner: { type: Schema.Types.ObjectId, ref: 'Player' },
        goals: [
          {
            player: { type: Schema.Types.ObjectId, ref: 'Player' },
            goals: { type: Number },
          },
        ],
        result: { type: String }, // 'VICTORY_A', 'VICTORY_B', 'DRAW'
      },
      default: null,
    },
  },
  { timestamps: true, collection: 'challenges' },
);
