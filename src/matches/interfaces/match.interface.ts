import { Document } from 'mongoose';

export interface Match extends Document {
  category: string; // ID da Categoria
  players: string[]; // IDs dos Jogadores
  winner: string; // ID do vencedor
  result: 'VICTORY_A' | 'VICTORY_B' | 'DRAW';
  goals: Array<{
    player: string;
    goals: number;
  }>;
  challenge: string; // ID do desafio relacionado
}
