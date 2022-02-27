import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from './core/config/config.module';
import { UrlModule } from './url/url.module';
// import { UrlModule } from '@url-svcs/url/url.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot('mongodb://localhost/urls'),
    UrlModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
