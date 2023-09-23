export class CreateContentDto{
    readonly title: string;
    readonly episode_id: number;
    readonly opening_crawl: string;
    readonly director: string;
    readonly producer: string;
    readonly release_date: string;
    readonly characters: [string];
    readonly planets: [string];
    readonly starships: [string];
    readonly vehicles: [string];
    readonly species: [string];
    readonly created: string;
    readonly edited: string;
    readonly url: string;
    
}