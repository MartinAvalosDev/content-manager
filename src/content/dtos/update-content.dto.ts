import { IsString, IsNumber, IsEmpty } from "class-validator";
import { User } from "../../auth/schemas/user.schema";

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

    @IsEmpty({message: "You cannot pass the user role"})
    readonly user: User
    
}