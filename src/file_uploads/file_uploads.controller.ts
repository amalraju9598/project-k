import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileUploadsService } from './file_uploads.service';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { DeleteFileDto } from './dto/delete-file.dto';

@Controller('file-uploads')
export class FileUploadsController {
  constructor(private readonly fileUploadsService: FileUploadsService) {}

  @Post('')
  @UseGuards(AccessTokenGuard)
  @UseInterceptors(FileInterceptor('file'))
  async uploadPublicFile(@UploadedFile() file: Express.Multer.File) {
    return this.fileUploadsService.uploadPublicFile(
      file.buffer,
      file.originalname,
    );
  }

  @Post('delete')
  @UseGuards(AccessTokenGuard)
  async deletePublicFile(@Body() deleteFileDto: DeleteFileDto) {
    return this.fileUploadsService.deletePublicFile(deleteFileDto);
  }
}
