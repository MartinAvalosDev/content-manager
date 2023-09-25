import { IsString, IsNumber, IsNotEmpty, IsEmpty } from "class-validator";
import { User } from "../../auth/schemas/user.schema";

export class CreateContentDto {
    @IsNotEmpty()
    @IsString()
    readonly title: string;

    @IsNumber()
    readonly episode_id: number;

    @IsNotEmpty()
    @IsString()
    readonly opening_crawl: string;

    @IsNotEmpty()
    @IsString()
    readonly director: string;

    @IsNotEmpty()
    @IsString()
    readonly producer: string;

    @IsNotEmpty()
    @IsString()
    readonly release_date: string;

    @IsNotEmpty()
    readonly characters: [string];


    @IsNotEmpty()
    readonly planets: [string];


    @IsNotEmpty()
    readonly starships: [string];

    @IsNotEmpty()
    readonly vehicles: [string];

    @IsNotEmpty()
    readonly species: [string];

    @IsNotEmpty()
    @IsString()
    readonly created: string;

    @IsNotEmpty()
    @IsString()
    readonly edited: string;

    @IsNotEmpty()
    @IsString()
    readonly url: string;

    @IsEmpty({ message: "You cannot pass the user role" })
    readonly user: User
}