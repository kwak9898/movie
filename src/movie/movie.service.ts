import { Injectable, NotFoundException } from '@nestjs/common';
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
   * 전체 조회
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

  async createMovie(createMovieDto: MovieDto): Promise<Movie> {
    return this.movieRepository.createMovie(createMovieDto);
  }
}
