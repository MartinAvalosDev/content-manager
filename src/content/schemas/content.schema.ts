import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({
    timestamps: true
})

export class Content {
    @Prop()
    title: string;

    @Prop()
    episode_id: number;

    @Prop()
    opening_crawl: string;

    @Prop()
    director: string;

    @Prop()
    producer: string;

    @Prop()
    release_date: string;

    @Prop()
    characters: [string];

    @Prop()
    planets: [string];

    @Prop()
    starships: [string];

    @Prop()
    vehicles: [string];

    @Prop()
    species: [string];

    @Prop()
    created: string;

    @Prop()
    edited: string;

    @Prop()
    url: string;    
}

export const ContentSchema = SchemaFactory.createForClass(Content)