import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Content } from './schemas/content.schema';
import * as mongoose from 'mongoose';
import { films } from 'src/types/films.types';

@Injectable()
export class ContentService {
    constructor(
        @InjectModel(Content.name)
        private contentModel: mongoose.Model<Content>
    ) {}

    async loadDataSource(): Promise<Content>{
        const toLoadData = films
        const load = await this.contentModel.insertMany(toLoadData) 
        return 
    }

    async findContents(): Promise<Content[]>{
        const contents = await this.contentModel.find()
        return contents
    }
   
    async findContentById(episodeId: number): Promise<Content>{
        const content = await this.contentModel.findOne({episode_id: episodeId })
        if(!content) 
        throw new NotFoundException('La pelicula que queres encontrar no existe, probá con otra!')
        return content
    }

    async createContent(content: Content): Promise<Content>{
        const newContent = await this.contentModel.create(content)
        return newContent
    }
    
    async updateContent(episodeId:number, content: Content): Promise<Content>{
        const film = await this.contentModel.findOne({episode_id: episodeId })
        if (!film) throw new NotFoundException('La pelicula que queres actualizar no existe, probá con otra!')
        const updatedContent= await this.contentModel.findByIdAndUpdate(film._id, content,{
            new: true,
            runValidator: true
        })
        return updatedContent     
    }
    async deleteContent(episodeId:number): Promise<Content>{
        const film = await this.contentModel.findOne({episode_id: episodeId })
        if (!film) throw new NotFoundException('La pelicula que queres borrar no existe, probá con otra!')
        const deletedContent= await this.contentModel.findByIdAndDelete(film._id)
        return deletedContent     
    }
}
