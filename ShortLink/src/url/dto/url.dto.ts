import {
  IsDefined,
  IsOptional,
  IsString,
  IsUrl,
  Length,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger'

export class UrlDto {
  @IsDefined()
  @IsUrl({
    allow_underscores: true,
  })
  @ApiProperty({ description: 'valid long url field' })
  longUrl: string;

  @IsString()
  @Length(7, 7)
  @IsOptional()
  @ApiProperty({ description: 'encoded short url field' })
  shortUrl: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'the hash code which is appended to the end of the base of short url' })
  hash: string;

}
