import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TenderDocument = Tender & Document;

@Schema()
export class Tender {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  deadline: Date;

  @Prop({ required: true })
  category: string;

  @Prop({ required: true })
  document: string;

  @Prop({ default: false })
  isClosed: boolean;

  @Prop({ required: true })
  createdBy: string;
}

export const TenderSchema = SchemaFactory.createForClass(Tender);