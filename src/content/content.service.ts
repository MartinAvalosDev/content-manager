import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Content } from './schemas/content.schema';
import * as mongoose from 'mongoose';

@Injectable()
export class ContentService {
    constructor(
        @InjectModel(Content.name)
        private contentModel: mongoose.Model<Content>
    ) {}

    async findContents(): Promise<Content[]>{
        const contents = await this.contentModel.find()
        return contents
    }
   
    async findContentById(episodeId: number): Promise<Content>{
        const content = await this.contentModel.findOne({episode_id: episodeId })
        if(!content) 
        throw new NotFoundException('Content not found, try another one :)')
        return content
    }

    async createContent(content: Content): Promise<Content>{
        const newContent = await this.contentModel.create(content)
        return newContent
    }
}
