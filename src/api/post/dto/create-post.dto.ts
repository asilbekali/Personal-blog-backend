import {
  IsString,
  IsOptional,
  IsNotEmpty,
  MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty({
    example: 'Yangi texnologiyalar haqida maqola',
    description: 'Post sarlavhasi',
  })
  @IsString()
  @IsNotEmpty({ message: 'Sarlavha kiritilishi shart' })
  @MaxLength(255, { message: 'Sarlavha 255 belgidan oshmasligi kerak' })
  title: string;

  @ApiProperty({
    example: 'Bu postda zamonaviy texnologiyalar tahlil qilinadi...',
    description: 'Post matni',
    required: false,
  })
  @IsString()
  @IsOptional()
  content?: string;

  @ApiProperty({
    example: 'https://example.com/images/post.jpg',
    description: 'Post rasmining URL manzili',
    required: false,
  })
  @IsString()
  @IsOptional()
  image?: string;

  @ApiProperty({
    example: 'https://example.com/videos/post.mp4',
    description: 'Post videosining URL manzili',
    required: false,
  })
  @IsString()
  @IsOptional()
  video?: string;
}
