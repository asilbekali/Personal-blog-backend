import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { diskStorage } from 'multer';
import { extname } from 'path';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class MulterService {
  private readonly uploadImagePath = './uploads/images';
  private readonly uploadVideoPath = './uploads/videos';

  constructor() {
    // Papkalarni yaratish
    this.ensureDirectoriesExist();
  }

  private ensureDirectoriesExist() {
    if (!fs.existsSync(this.uploadImagePath)) {
      fs.mkdirSync(this.uploadImagePath, { recursive: true });
    }
    if (!fs.existsSync(this.uploadVideoPath)) {
      fs.mkdirSync(this.uploadVideoPath, { recursive: true });
    }
  }

  getMulterConfig(type: 'image' | 'video' = 'image') {
    const uploadPath = type === 'video' ? this.uploadVideoPath : this.uploadImagePath;
    const fileSizeLimit = type === 'video' ? 100 * 1024 * 1024 : 5 * 1024 * 1024; // 100MB for video, 5MB for image

    return {
      storage: diskStorage({
        destination: uploadPath,
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const fileExtension = extname(file.originalname);
          const fileName = `${file.originalname.split('.')[0]}-${uniqueSuffix}${fileExtension}`;
          callback(null, fileName);
        },
      }),
      fileFilter: (req, file, callback) => {
        if (type === 'image') {
          if (!file.mimetype.match(/\/(jpg|jpeg|png|gif|webp)$/)) {
            return callback(new Error('Faqat rasm fayllari ruxsat etiladi!'), false);
          }
        } else if (type === 'video') {
          if (!file.mimetype.match(/\/(mp4|avi|mov|wmv|flv|webm|mkv)$/)) {
            return callback(new Error('Faqat video fayllari ruxsat etiladi!'), false);
          }
        }
        callback(null, true);
      },
      limits: {
        fileSize: fileSizeLimit,
      },
    };
  }

  create(file: Express.Multer.File, type: 'image' | 'video' = 'image') {
    if (!file) {
      throw new BadRequestException('Fayl talab qilinadi');
    }

    const filePath = `${file.filename}`;
    const fullPath = type === 'video' 
      ? `${this.uploadVideoPath}/${file.filename}`
      : `${this.uploadImagePath}/${file.filename}`;

    return { 
      message: 'Fayl muvaffaqiyatli yuklandi', 
      filename: file.filename,
      path: filePath,
      fullPath: fullPath,
      mimetype: file.mimetype,
      size: file.size,
      type: type
    };
  }

  findOne(filename: string, type: 'image' | 'video' = 'image') {
    const uploadPath = type === 'video' ? this.uploadVideoPath : this.uploadImagePath;
    const filePath = path.join(uploadPath, filename);

    if (!fs.existsSync(filePath)) {
      throw new NotFoundException('Fayl topilmadi');
    }

    const fileStats = fs.statSync(filePath);

    return { 
      message: 'Fayl topildi!', 
      filename: filename,
      path: filePath,
      size: fileStats.size,
      created: fileStats.birthtime,
      type: type
    };
  }

  remove(filename: string, type: 'image' | 'video' = 'image') {
    const uploadPath = type === 'video' ? this.uploadVideoPath : this.uploadImagePath;
    const filePath = path.join(uploadPath, filename);

    if (!fs.existsSync(filePath)) {
      throw new NotFoundException('Fayl topilmadi');
    }

    fs.unlinkSync(filePath);
    return { message: 'Fayl muvaffaqiyatli o\'chirildi', filename };
  }

  // Barcha fayllarni olish
  findAll(type: 'image' | 'video' = 'image') {
    const uploadPath = type === 'video' ? this.uploadVideoPath : this.uploadImagePath;
    
    if (!fs.existsSync(uploadPath)) {
      return [];
    }

    const files = fs.readdirSync(uploadPath);
    return files.map(file => {
      const filePath = path.join(uploadPath, file);
      const stats = fs.statSync(filePath);
      
      return {
        filename: file,
        path: filePath,
        size: stats.size,
        created: stats.birthtime,
        type: type
      };
    });
  }
}