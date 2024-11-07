import { Module } from '@nestjs/common';
import { FileUploadsService } from './file_uploads.service';
import { FileUploadsController } from './file_uploads.controller';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports: [CommonModule],
  controllers: [FileUploadsController],
  providers: [FileUploadsService],
})
export class FileUploadsModule {}
