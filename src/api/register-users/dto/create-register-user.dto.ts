import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateRegisterUserDto {
  @ApiProperty({
    description: 'Foydalanuvchi email manzili',
    example: 'user@gmail.com',
  })
  @IsEmail({}, { message: 'Email noto‘g‘ri formatda' })
  email: string;

  @ApiProperty({
    description: 'Foydalanuvchi ismi',
    example: 'Asilbek',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Ism matn bo‘lishi kerak' })
  name?: string;
}
