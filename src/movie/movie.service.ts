import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MovieRepository } from './movie.repository';
import { MyPaginationQuery } from 'src/base/pagination-query';
import { Movie } from './entities/movie.entity';
import { Pagination, paginate } from 'nestjs-typeorm-paginate';
import { MOVIE_EXCEPTION } from 'src/exception/error-code';
import { MovieDto } from './dto/movie.dto';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(MovieRepository)
    private readonly movieRepository: MovieRepository,
  ) {}

  /**
   * 영화 전체 조회
   *
   * @param options query string parameter
   * @returns
   */
  async getAllMovie(options: MyPaginationQuery): Promise<Pagination<Movie>> {
    if (paginate(await this.movieRepository, options) === null) {
      throw new NotFoundException(MOVIE_EXCEPTION.MOVIE_NOT_FOUND);
    }
    return paginate(await this.movieRepository, options);
  }

  /**
   * 영화 생성
   *
   * @param createMovieDto 영화 생성 DTO
   * @returns
   */
  async createMovie(createMovieDto: MovieDto): Promise<Movie> {
    const movie = await this.movieRepository.findOneBymovieId(
      createMovieDto.movieId,
    );

    if (movie !== null) {
      throw new BadRequestException(MOVIE_EXCEPTION.MOVIE_EXIST);
    }

    return this.movieRepository.createMovie(createMovieDto);
  }

  /**
   * 특정 영화 수정
   *
   * @param movieId 수정할 영화의 고유값
   * @param changeMovieDto 수정할 영화의 데이터 DTO
   * @returns
   */
  async updateMovie(movieId: number, changeMovieDto: MovieDto) {
    const movie = await this.movieRepository.findOneBymovieId(movieId);

    if (!movie) {
      throw new NotFoundException(MOVIE_EXCEPTION.MOVIE_NOT_FOUND);
    }

    return await this.movieRepository.updateMovie(
      movie.movieId,
      changeMovieDto,
    );
  }
}
