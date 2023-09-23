import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ContentService } from './content.service';
import { Content } from './schemas/content.schema';
import { CreateContentDto } from './dtos/create-content.dto';

@Controller('contents')
export class ContentController {
    constructor(private contentService: ContentService){}

    @Get()
    async getAllFilms(): Promise<Content[]>{
        return this.contentService.findContents()
    }
    
    @Get(':episodeId')
    async getFilmById(
        @Param('episodeId')
        episodeId: number
    ): Promise<Content>{
        return this.contentService.findContentById(episodeId)
    }

    @Post('/newContent')
    async createNewContent(
        @Body()
        body: CreateContentDto
    ): Promise<Content>{
        return this.contentService.createContent(body)
    }
}
