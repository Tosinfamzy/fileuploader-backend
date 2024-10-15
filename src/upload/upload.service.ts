import { Injectable } from '@nestjs/common';

@Injectable()
export class UploadService {
  handlePdfUpload(files: Express.Multer.File[]) {
    if (!files || files.length === 0) {
      return { message: 'No files uploaded' };
    }

    const fileDetails = files.map((file) => ({
      originalName: file.originalname,
      fileName: file.filename,
      path: file.path,
      size: file.size,
    }));

    return {
      message: 'PDFs uploaded successfully',
      files: fileDetails,
    };
  }
}
