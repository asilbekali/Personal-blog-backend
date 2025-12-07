import { ConflictException, Injectable } from '@nestjs/common';
import { CreateRegisterUserDto } from './dto/create-register-user.dto';
import { UpdateRegisterUserDto } from './dto/update-register-user.dto';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class RegisterUsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createRegisterUserDto: CreateRegisterUserDto) {
    if (!createRegisterUserDto) {
      throw new ConflictException('Invalid user data');
    }
    const existingUser = await this.prisma.user.findUnique({
      where: { email: createRegisterUserDto.email },
    });

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const newUser = await this.prisma.user.create({
      data: createRegisterUserDto,
    });

    return newUser;
  }

  async findAll() {
    return await this.prisma.user.findMany();
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new ConflictException('User not found');
    }
    return await this.prisma.user.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateRegisterUserDto: UpdateRegisterUserDto) {
    const updateUser = await this.prisma.user.update({
      where: { id },
      data: updateRegisterUserDto,
    });
    return updateUser;
  }

  async remove(id: number) {
    const deletedUser = await this.prisma.user.delete({
      where: { id },
    });
    return deletedUser;
  }
}
