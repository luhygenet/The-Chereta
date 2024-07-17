import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema()
export class Bid extends Document {
  @Prop({ required: true })
  participantName: string;

  @Prop({ required: true })
  participantEmail: string;

  @Prop({ required: true })
  biddingDocument: string; // This could be a URL or file path

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Tender' }) // Reference to Tender model
  tender: MongooseSchema.Types.ObjectId;
}

export const BidSchema = SchemaFactory.createForClass(Bid);