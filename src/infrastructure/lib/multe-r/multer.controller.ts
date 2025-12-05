import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Get,
  Param,
  Delete,
  Res,
  Query,
  HttpStatus,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterService } from './multer.service';
import {
  ApiTags,
  ApiOperation,
  ApiConsumes,
  ApiBody,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { Response } from 'express';
import * as path from 'path';
import * as fs from 'fs';

@ApiTags('Multer')
@Controller('multer')
export class MulterController {
  constructor(private readonly multerService: MulterService) {}

  // Image upload
  @Post('upload/image')
  @ApiOperation({ summary: 'Rasm yuklash' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
          description: 'Yuklanadigan rasm fayli',
        },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('file', new MulterService().getMulterConfig('image')),
  )
  uploadImage(@UploadedFile() file: Express.Multer.File) {
    return this.multerService.create(file, 'image');
  }

  // Video upload
  @Post('upload/video')
  @ApiOperation({ summary: 'Video yuklash' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
          description: 'Yuklanadigan video fayli',
        },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('file', new MulterService().getMulterConfig('video')),
  )
  uploadVideo(@UploadedFile() file: Express.Multer.File) {
    return this.multerService.create(file, 'video');
  }

  // File get (image or video)
  @Get(':filename')
  @ApiOperation({ summary: 'Faylni olish' })
  @ApiParam({ name: 'filename', description: 'Olinadigan fayl nomi' })
  @ApiQuery({
    name: 'type',
    required: false,
    enum: ['image', 'video'],
    description: 'Fayl turi',
  })
  async getFile(
    @Param('filename') filename: string,
    @Query('type') type: 'image' | 'video' = 'image',
    @Res() res: Response,
  ) {
    const fileInfo = this.multerService.findOne(filename, type);
    const filePath = fileInfo.path;

    if (!fs.existsSync(filePath)) {
      return res.status(HttpStatus.NOT_FOUND).json({
        message: 'Fayl topilmadi',
      });
    }

    res.sendFile(filePath, { root: '.' });
  }

  // File info
  @Get('info/:filename')
  @ApiOperation({ summary: "Fayl ma'lumotlarini olish" })
  @ApiParam({ name: 'filename', description: 'Fayl nomi' })
  @ApiQuery({
    name: 'type',
    required: false,
    enum: ['image', 'video'],
    description: 'Fayl turi',
  })
  getFileInfo(
    @Param('filename') filename: string,
    @Query('type') type: 'image' | 'video' = 'image',
  ) {
    return this.multerService.findOne(filename, type);
  }

  // List all files
  @Get()
  @ApiOperation({ summary: "Barcha fayllarni ko'rish" })
  @ApiQuery({
    name: 'type',
    required: false,
    enum: ['image', 'video'],
    description: 'Fayl turi',
  })
  getAllFiles(@Query('type') type: 'image' | 'video' = 'image') {
    return this.multerService.findAll(type);
  }

  // Delete file
  @Delete(':filename')
  @ApiOperation({ summary: "Faylni o'chirish" })
  @ApiParam({ name: 'filename', description: "O'chiriladigan fayl nomi" })
  @ApiQuery({
    name: 'type',
    required: false,
    enum: ['image', 'video'],
    description: 'Fayl turi',
  })
  deleteFile(
    @Param('filename') filename: string,
    @Query('type') type: 'image' | 'video' = 'image',
  ) {
    return this.multerService.remove(filename, type);
  }
}
