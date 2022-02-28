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
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('')
@ApiTags('Url')
export class UrlRedirectController {
  constructor(private urlSvc: UrlService, private urlRepo: UrlRepo) {}
  
  @Get(':shortUrl')
  @ApiResponse({
    status: 200,
    description: 'Redirects to the long url web page when short code is appended as parameter.',
  })
  async redirectToLongUrl(
    @Param('shortUrl') shortUrl: string,
    @Res() response: Response,
  ): Promise<void> {
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
  @ApiResponse({
    status: 200,
    description: 'Get the basic stat of a url: Length of long url, base url and date url was encoded.',
    type: IUrlStatInterface,
  })
  async getUrlStatistic(@Param('shortUrl') shortUrl: string): Promise<IUrlStatInterface> {

    const existingShortenedUrl = await this.urlRepo.findLongUrl(shortUrl)

    if (existingShortenedUrl) {
      return {
        longUrlLength: existingShortenedUrl.longUrl.length,
        urlBase: existingShortenedUrl.longUrl.split("/")[2],
        created: existingShortenedUrl.createdAt,
      };
    } else {
      throw new NotFoundException({
        response: {
          message: 'No record found with the given short url',
        },
      });
    }
  }
}

