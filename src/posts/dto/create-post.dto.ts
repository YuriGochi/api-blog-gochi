import { IsNotEmpty, IsString, Min, MinLength } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  title: string;

  subTitle: string;

  coverImg: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  body: string;

  @IsNotEmpty()
  @IsString()
  userId: string;
}
