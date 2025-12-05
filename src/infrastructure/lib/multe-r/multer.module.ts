// multer.module.ts
import { Module } from '@nestjs/common';
import { MulterService } from './multer.service';
import { MulterController } from './multer.controller';

@Module({
  providers: [MulterService],
  controllers: [MulterController],
  exports: [MulterService], 
})
export class MulterModule {}
