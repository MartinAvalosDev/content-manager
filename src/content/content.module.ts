import { Module } from '@nestjs/common';
import { ContentController } from './content.controller';
import { ContentService } from './content.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ContentSchema } from './schemas/content.schema';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: 'Content', schema: ContentSchema}])
  ],
  controllers: [ContentController],
  providers: [ContentService]
})
export class ContentModule {}
