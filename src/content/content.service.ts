import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Content } from './schemas/content.schema';
import * as mongoose from 'mongoose';
import { films } from '../types/films.types';
import { Role } from '../auth/dtos/signup.dto';

@Injectable()
export class ContentService {
  constructor(
    @InjectModel(Content.name)
    private contentModel: mongoose.Model<Content>,
  ) {}

  async loadDataSource(): Promise<any> {
    const toLoadData = films;
    return await this.contentModel.insertMany(toLoadData);
  }

  async findContents(role: Role): Promise<Content[]> {
    if (role === Role.ADMIN)
      throw new UnauthorizedException(
        'Unicamente los Usuarios Regulares pueden obtener contenidos',
      );
    const contents = await this.contentModel.find();
    return contents;
  }

  async findContentById(episodeId: number, role: Role): Promise<Content> {
    if (role === Role.ADMIN)
      throw new UnauthorizedException(
        'Unicamente los Usuarios Regulares pueden obtener contenidos',
      );
    const content = await this.contentModel.findOne({ episode_id: episodeId });
    if (!content)
      throw new NotFoundException(
        'La pelicula que queres encontrar no existe, probá con otra!',
      );
    return content;
  }

  async createContent(content: Content, role: Role): Promise<Content> {
    if (role === Role.USER)
      throw new UnauthorizedException(
        'Necesita ser Administrador para agregar un nuevo contenido',
      );
    const newContent = await this.contentModel.create(content);
    return newContent;
  }

  async updateContent(
    episodeId: number,
    content: Content,
    role: Role,
  ): Promise<Content> {
    if (role === Role.USER)
      throw new UnauthorizedException(
        'Necesita ser Administrador para editar un contenido',
      );
    const film = await this.contentModel.findOne({ episode_id: episodeId });
    if (!film)
      throw new NotFoundException(
        'La pelicula que queres actualizar no existe, probá con otra!',
      );
    const updatedContent = await this.contentModel.findByIdAndUpdate(
      film._id,
      content,
      {
        new: true,
        runValidator: true,
      },
    );
    return updatedContent;
  }
  async deleteContent(episodeId: number, role: Role): Promise<Content> {
    if (role === Role.USER)
      throw new UnauthorizedException(
        'Necesita ser Administrador para eliminar un contenido',
      );
    const film = await this.contentModel.findOne({ episode_id: episodeId });
    if (!film)
      throw new NotFoundException(
        'La pelicula que queres borrar no existe, probá con otra!',
      );
    const deletedContent = await this.contentModel.findByIdAndDelete(film._id);
    return deletedContent;
  }
}
