import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsNotEmpty, MinLength } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({
    description: 'Izoh matni',
    example: 'Bu juda foydali post edi, rahmat!',
    minLength: 1,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  text: string;

  @ApiProperty({
    description: 'Post ID raqami',
    example: 1,
  })
  @IsInt()
  @IsNotEmpty()
  postId: number;

  @ApiProperty({
    description: 'Foydalanuvchi ID raqami',
    example: 5,
  })
  @IsInt()
  @IsNotEmpty()
  userId: number;
}