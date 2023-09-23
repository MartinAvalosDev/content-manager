import { Body, Controller, Get, Post } from '@nestjs/common';
import { ContentService } from './content.service';
import { Content } from './schemas/content.schema';

@Controller('contents')
export class ContentController {
    constructor(private contentService: ContentService){}

    @Get()
    async getAllFilms(): Promise<Content[]>{
        return this.contentService.findContents()
    }

    @Post('/newContent')
    async createNewContent(
        @Body()
        body
    ): Promise<Content>{
        return this.contentService.createContent(body)
    }
}
