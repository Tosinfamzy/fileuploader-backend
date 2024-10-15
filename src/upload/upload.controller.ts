import {
  Controller,
  Post,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Request,
  Get,
  Param,
  Res,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UploadedFile as UploadedFileEntity } from './uploaded-file.entity';
import { Response } from 'express';
import { User } from 'src/users/user.entity';

@Controller('upload')
export class UploadController {
  constructor(
    @InjectRepository(UploadedFileEntity)
    private uploadedFileRepository: Repository<UploadedFileEntity>,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('pdf')
  @UseInterceptors(
    FileInterceptor('pdf', {
      storage: diskStorage({
        destination: './uploads/pdfs',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = path.extname(file.originalname);
          const fileName = `${file.fieldname}-${uniqueSuffix}${ext}`;
          cb(null, fileName);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (file.mimetype === 'application/pdf') {
          cb(null, true);
        } else {
          cb(new Error('Only PDF files are allowed'), false);
        }
      },
    }),
  )
  async uploadPdf(@UploadedFile() file: Express.Multer.File, @Request() req) {
    const user = req.user as User;

    // Save file metadata in the database and link to the user
    const uploadedFile = this.uploadedFileRepository.create({
      filename: file.filename,
      path: file.path,
      mimetype: file.mimetype,
      user: user,
    });
    await this.uploadedFileRepository.save(uploadedFile);

    return {
      message: 'File uploaded successfully',
      file: {
        filename: uploadedFile.filename,
        path: uploadedFile.path,
        mimetype: uploadedFile.mimetype,
      },
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('my-files')
  async getMyFiles(@Request() req) {
    const user = req.user as User;
    const files = await this.uploadedFileRepository.find({
      where: { user: { id: user.id } },
    });
    return files;
  }

  @UseGuards(JwtAuthGuard)
  @Get(':filename')
  async serveFile(@Param('filename') filename: string, @Res() res: Response) {
    const filePath = path.join(__dirname, '../../uploads/pdfs', filename);
    res.sendFile(filePath);
  }
}
