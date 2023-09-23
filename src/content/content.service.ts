import { Injectable } from '@nestjs/common';
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

    async createContent(content: Content): Promise<Content>{
        const newContent = await this.contentModel.create(content)
        return newContent
    }
}
