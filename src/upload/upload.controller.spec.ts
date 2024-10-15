import { Test, TestingModule } from '@nestjs/testing';
import { UploadController } from './upload.controller';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UploadedFile as UploadedFileEntity } from './uploaded-file.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';

describe('UploadController', () => {
  let controller: UploadController;
  let uploadedFileRepository: Repository<UploadedFileEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UploadController],
      providers: [
        {
          provide: getRepositoryToken(UploadedFileEntity),
          useClass: Repository,
        },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<UploadController>(UploadController);
    uploadedFileRepository = module.get<Repository<UploadedFileEntity>>(
      getRepositoryToken(UploadedFileEntity),
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('uploadPdf', () => {
    it('should upload a PDF file and save metadata', async () => {
      const mockFile = {
        originalname: 'test.pdf',
        filename: 'pdf-1234567890.pdf',
        path: './uploads/pdfs/pdf-1234567890.pdf',
        mimetype: 'application/pdf',
      } as Express.Multer.File;

      const mockUser = { id: 1 } as User;
      const mockRequest = { user: mockUser };

      const saveSpy = jest
        .spyOn(uploadedFileRepository, 'save')
        .mockResolvedValue({
          ...mockFile,
          id: 1,
          user: mockUser,
        } as UploadedFileEntity);

      const result = await controller.uploadPdf(mockFile, mockRequest);

      expect(saveSpy).toHaveBeenCalledWith({
        filename: mockFile.filename,
        path: mockFile.path,
        mimetype: mockFile.mimetype,
        user: mockUser,
      });
      expect(result).toEqual({
        message: 'File uploaded successfully',
        file: {
          filename: mockFile.filename,
          path: mockFile.path,
          mimetype: mockFile.mimetype,
        },
      });
    });
  });
});
