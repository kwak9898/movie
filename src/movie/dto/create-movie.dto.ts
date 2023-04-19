import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateMovieDto {
  movieId: number;

  @IsNotEmpty({ message: '영화 이름을 적어주세요.' })
  @IsString({ message: '문자로 적어주세요.' })
  movieName: string;

  @IsNotEmpty({ message: '영화 개봉 연도를 적어주세요.' })
  @IsNumber({}, { message: '숫자로 적어주세요.' })
  releaseData: number;

  @IsNotEmpty({ message: '' })
  @IsString({ message: '문자로 적어주세요.' })
  movieTitle: string;

  @IsNotEmpty({ message: '영화 예고편 주소를 적어주세요.' })
  preview: string;

  @IsNotEmpty({ message: '배우 이름을 적어주세요.' })
  @IsString({ message: '문자로 적어주세요.' })
  actors: string;

  @IsString({ message: '문자로 적어주세요.' })
  synopsis: string;

  @IsString({ message: '문자로 적어주세요.' })
  movieGenre: string;

  @IsNotEmpty({ message: '평점을 적어주세요.' })
  rating: string;

  playingTime: string;

  @IsNotEmpty({ message: '감독 이름을 적어주세요.' })
  @IsString({ message: '문자로 적어주세요.' })
  director: string;
}
