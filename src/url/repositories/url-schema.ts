import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UrlDocument = Url & Document;

@Schema({ timestamps: true })
export class Url {
  @Prop({
    required: true,
    index: true,
    unique: true,
  })
  shortUrl: string;

  @Prop({
    required: true,
  })
  longUrl: string;

  @Prop({
    required: true,
    index: true,
    unique: true,
  })
  hash: string;

  createdAt: Date;
}

export const UrlSchema = SchemaFactory.createForClass(Url);
