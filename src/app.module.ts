import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlayersModule } from './players/player.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://saulo:Woch3WIrwB6543wQ@c-smart-ranking.913rb.mongodb.net/smartranking?retryWrites=true&w=majority&appName=c-smart-ranking',
    ),
    PlayersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
