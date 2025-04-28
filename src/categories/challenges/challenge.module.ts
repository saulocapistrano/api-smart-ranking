import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChallengeSchema } from './challenge.schema';
import { ChallengeController } from './challenge.controller';
import { ChallengeService } from './challenge.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Challenge', schema: ChallengeSchema }]),
  ],
  controllers: [ChallengeController],
  providers: [ChallengeService],
})
export class ChallengesModule {}
