import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor(private prismaService: PrismaService) {}
  create(createPostDto: CreatePostDto) {
    const { title, subTitle, body, userId, coverImg } = createPostDto;

    return this.prismaService.post.create({
      data: {
        title,
        subTitle,
        body,
        coverImg,
        author: { connect: { id: userId } },
      },
    });
  }

  findAll() {
    return this.prismaService.post.findMany({
      include: {
        categories: {
          select: {
            name: true,
          },
        },
        author: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  findOne(id: string) {
    return this.prismaService.post.findUnique({ 
      where: { id },
      include: {
        categories: {
          select: {
            name: true,
          },
        },
        author: {
          select: {
            name: true,
            userImg: true
          },
        },
      },
     });
  }

  async update(id: string, updatePostDto: UpdatePostDto) {
    const categories = updatePostDto.categories.map((category) => ({
      id: category.id,
    }));

    return this.prismaService.post.update({
      data: {
        title: updatePostDto.title,
        body: updatePostDto.body,
        categories: {
          set: categories,
        },
      },
      where: {
        id,
      },
    });
  }

  remove(id: string) {
    return this.prismaService.post.delete({ where: { id } });
  }
}
