import { Body, Controller, Get, Param, Post, Put, Delete } from '@nestjs/common';
import { ContentService } from './content.service';
import { Content } from './schemas/content.schema';
import { CreateContentDto } from './dtos/create-content.dto';
import { UpdateContentDto } from './dtos/update-content.dto';
import { DeleteContentDto } from './dtos/delete-content.dto';

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
        content: CreateContentDto
    ): Promise<Content>{
        return this.contentService.createContent(content)
    }
    
    @Put('/updateContent/:episodeId')
    async updateContent(
        @Param('episodeId')
        episodeId: number,
        @Body()
        content: UpdateContentDto
    ): Promise<Content>{
        return this.contentService.updateContent(episodeId, content)
    }
    @Delete('/deleteContent/:episodeId')
    async deleteContent(
        @Param('episodeId')
        episodeId: number,
    ): Promise<Content>{
        return this.contentService.deleteContent(episodeId)
    }
}
