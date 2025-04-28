import { Schema } from 'mongoose';

export const UserSchema = new Schema(
  {
    email: { type: String, unique: true },
    password: { type: String },
    name: { type: String },
    role: {
      type: String,
      enum: ['ADMIN', 'PLAYER', 'ESPECTADOR'],
      default: 'ESPECTADOR',
    },
    isActive: { type: Boolean, default: false }, // precisa ser aprovado pelo Admin
  },
  { timestamps: true, collection: 'users' },
);
