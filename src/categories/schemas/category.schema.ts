import { Schema } from 'mongoose';

export const CategorySchema = new Schema(
  {
    // "category" is unique so we can’t have duplicate categories like "A", "A" again
    category: { type: String, unique: true },
    description: { type: String },
    events: [
      {
        name: String,
        operation: String, // e.g., "+"
        value: Number, // e.g., 30
      },
    ],
    // This will store an array of Player IDs as strings
    players: [
      {
        _id: {
          type: String, // or 'type: Schema.Types.ObjectId' if you store ObjectIds
        },
      },
    ],
  },
  {
    timestamps: true,
    collection: 'categories',
  },
);
