import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Address } from '../users/interfaces/users.interface'

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  user_id: number;

  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  phone: string;

  @Prop()
  address: Address;

  @Prop()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);