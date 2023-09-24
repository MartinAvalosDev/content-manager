import { Body, Controller, Get, Param, Post, Put, Delete, UseGuards, Req } from '@nestjs/common';
import { ContentService } from './content.service';
import { Content } from './schemas/content.schema';
import { CreateContentDto } from './dtos/create-content.dto';
import { UpdateContentDto } from './dtos/update-content.dto';
import { AuthGuard } from '@nestjs/passport';
import { Role } from '../auth/dtos/signup.dto';

@Controller('contents')
export class ContentController {
    constructor(private contentService: ContentService){}

    @Get()
    @UseGuards(AuthGuard())
    async getAllFilms(
        @Req()
        req
    ): Promise<Content[]>{
        return this.contentService.findContents(req.user.role)
    }
    
    @Get(':episodeId')
    @UseGuards(AuthGuard())
    async getFilmById(
        @Param('episodeId')
        episodeId: number,
        @Req()
        req
    ): Promise<Content>{
        return this.contentService.findContentById(episodeId,req.user.role)
    }

    @Post('/coldStart')
    async loadDataSource(): Promise<Content>{
        return this.contentService.loadDataSource()
    }

    @Post('/newContent')
    @UseGuards(AuthGuard())
    async createNewContent(
        @Body()
        content: CreateContentDto,
        @Req()
        req
    ): Promise<Content>{        
        return this.contentService.createContent(content, req.user.role)
    }
    
    @Put('/updateContent/:episodeId')
    @UseGuards(AuthGuard())
    async updateContent(
        @Param('episodeId')
        episodeId: number,
        @Body()
        content: UpdateContentDto,
        @Req()
        req
    ): Promise<Content>{
        return this.contentService.updateContent(episodeId, content, req.user.role)
    }

    @Delete('/deleteContent/:episodeId')
    @UseGuards(AuthGuard())
    async deleteContent(
        @Param('episodeId')
        episodeId: number,
        @Req()
        req
    ): Promise<Content>{
        return this.contentService.deleteContent(episodeId, req.user.role)
    }
}
