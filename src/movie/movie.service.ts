import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MovieRepository } from './movie.repository';
import { MyPaginationQuery } from '../base/pagination-query';
import { Movie } from './entities/movie.entity';
import {
  Pagination,
  paginate,
  paginateRawAndEntities,
} from 'nestjs-typeorm-paginate';
import { MOVIE_EXCEPTION } from '../exception/error-code';
import { ChangeMovieDto } from './dto/change-movie.dto';
import { CreateMovieDto } from './dto/create-movie.dto';

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
   * @param movieTitle 영화 이름 검색
   * @returns
   */
  async getAllMovie(
    options: MyPaginationQuery,
    movieName?: string,
  ): Promise<Pagination<Movie>> {
    const query = this.movieRepository.createQueryBuilder('movie');

    if (movieName) {
      query.where('movie.movieName = :movieName', { movieName: movieName });
    }

    query.getRawMany();

    const pagination = await paginate<Movie>(query, options);

    if (pagination.items.length === 0) {
      throw new NotFoundException(MOVIE_EXCEPTION.MOVIE_NAME_NOT_FOUND);
    }

    return pagination;
  }

  /**
   * 영화 상세 조회
   *
   * @param movieId 특정 영화 조회할 고유값
   * @returns
   */
  async findOneByMovieId(movieId: number): Promise<Movie> {
    const movie = await this.movieRepository.findOneBymovieId(movieId);

    if (!movie) {
      throw new NotFoundException(MOVIE_EXCEPTION.MOVIE_NOT_FOUND);
    }

    return movie;
  }

  /**
   * 영화 생성
   *
   * @param createMovieDto 영화 생성 DTO
   * @returns
   */
  async createMovie(createMovieDto: CreateMovieDto): Promise<Movie> {
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
  async updateMovie(
    movieId: number,
    changeMovieDto: ChangeMovieDto,
  ): Promise<Movie> {
    const movie = await this.findOneByMovieId(movieId);

    return await this.movieRepository.updateMovie(
      movie.movieId,
      changeMovieDto,
    );
  }

  /**
   * 특정 영화 삭제
   *
   * @param movieId 삭제할 영화의 고유값
   * @returns
   */
  async deleteMovie(movieId: number) {
    const movie = await this.findOneByMovieId(movieId);

    return await this.movieRepository.deleteMovie(movie.movieId);
  }
}
