import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BidsController } from './bids.controller';
import { BidsService } from './bids.service';
import { Bid, BidSchema } from './schema/bid.schema'; // Adjust path based on your structure

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Bid.name, schema: BidSchema }]),
  ],
  controllers: [BidsController],
  providers: [BidsService],
})
export class BidsModule {}
