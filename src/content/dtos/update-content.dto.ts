import { IsString, IsNumber } from "class-validator";

export class UpdateContentDto{
    @IsString()
    readonly title: string;

    @IsNumber()
    readonly episode_id: number;

    @IsString()
    readonly opening_crawl: string;

    @IsString()
    readonly director: string;

    @IsString()
    readonly producer: string;

    @IsString()
    readonly release_date: string;

    //no aplica en arrays para updatear contents
    readonly characters: [string];
    readonly planets: [string];
    readonly starships: [string];
    readonly vehicles: [string];
    readonly species: [string];

    @IsString()
    readonly created: string;

    @IsString()
    readonly edited: string;

    @IsString()
    readonly url: string;
    
}