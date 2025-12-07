import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class PostService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createPostDto: CreatePostDto) {
    const newPost = await this.prisma.post.create({
      data: createPostDto,
    });
    return newPost;
  }

  async findAll() {
    const posts = await this.prisma.post.findMany();
    return posts;
  }

  async findOne(id: number) {
    const post = await this.prisma.post.findUnique({
      where: { id },
    });
    return post;
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    const updatedPost = await this.prisma.post.update({
      where: { id },
      data: updatePostDto,
    });
    return updatedPost;
  }

  async remove(id: number) {
    await this.prisma.post.delete({
      where: { id },
    });
    return { message: "Post muvaffaqiyatli o'chirildi" };
  }
}
