import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UrlShortenerController } from './controllers/url-shortener.controller';
import { UrlRepo } from './repositories/url-repo';
import { Url, UrlSchema } from './repositories/url-schema';
import { UrlService } from './services/url-service/url-service.service';
import { ConfigModule } from '../core/config/config.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Url.name, schema: UrlSchema }]),
    ConfigModule.forRoot(),
  ],
  controllers: [UrlShortenerController],
  providers: [UrlRepo, UrlService],
})
export class UrlModule {}
