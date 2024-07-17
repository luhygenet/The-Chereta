import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


export type UserDocument = User & Document;

@Schema()
export class User extends Document {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, enum: ['preparer', 'participant'] })
  role: string;

  @Prop()
  license?: string;

  @Prop()
  preference?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);