import { ApiProperty } from "@nestjs/swagger";

export class  IUrlStatInterface {
    
    @ApiProperty()
    longUrlLength: number;

    @ApiProperty()
    urlBase: string;

    @ApiProperty()
    created: Date;
}