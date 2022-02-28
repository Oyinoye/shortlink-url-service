import { ApiResponseProperty } from "@nestjs/swagger";

export class IUrlResponse {

  @ApiResponseProperty()
  longUrl: string;

  @ApiResponseProperty()
  shortUrl: string;
}
