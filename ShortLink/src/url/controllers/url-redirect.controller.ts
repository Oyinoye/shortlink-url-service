import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { UrlRepo } from '../../url/repositories/url-repo';
import { UrlDocument } from '../repositories/url-schema';
import { UrlService } from '../../url/services/url-service/url-service.service';
import { IUrlStatInterface } from '../interfaces/url.stat.interface';
import { AppConfigService } from 'src/core/config/config.service';

@Controller('')
export class UrlRedirectController {
  constructor(private urlSvc: UrlService, private urlRepo: UrlRepo, private config: AppConfigService) {}

  @Get(':shortUrl')
  async redirectToLongUrl(
    @Param('shortUrl') shortUrl: string,
    @Res() response: Response,
  ): Promise<void> {
    console.log(shortUrl);
    if (!this.urlSvc.isValidShortUrl(shortUrl)) {
      throw new BadRequestException({
        response: {
          message: 'Bad Request. Specify a valid short url',
        },
      });
    }

    const savedUrl: UrlDocument = await this.urlRepo.findLongUrl(shortUrl);
    if (savedUrl) {
      response.redirect(savedUrl.longUrl);
    }
  }

  @Get('statistic/:shortUrl')
  async getUrlStatistic(@Param('shortUrl') shortUrl: string): Promise<IUrlStatInterface> {

    const existingShortenedUrl = await this.urlRepo.findLongUrl(shortUrl)

    if (existingShortenedUrl) {
      return {
        longUrlLength: existingShortenedUrl.longUrl.length,
        urlBase: existingShortenedUrl.longUrl.split("/")[2],
        created: existingShortenedUrl.createdAt,
      };
    } else {
      console.log(existingShortenedUrl)
      throw new NotFoundException({
        response: {
          message: 'No record found with the given short url',
        },
      });
    }
  }
}

