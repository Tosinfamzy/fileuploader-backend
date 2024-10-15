import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UploadedFile } from './uploaded-file.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UploadedFile])],
  providers: [UploadService],
  controllers: [UploadController],
})
export class UploadModule {}
