import { Module } from '@nestjs/common';
import { ContentController } from './content.controller';
import { ContentService } from './content.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ContentSchema } from './schemas/content.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Content', schema: ContentSchema}])],
  controllers: [ContentController],
  providers: [ContentService]
})
export class ContentModule {}
