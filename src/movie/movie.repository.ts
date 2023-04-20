import { BadRequestException, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Movie } from './entities/movie.entity';
import { ChangeMovieDto } from './dto/change-movie.dto';
import { CreateMovieDto } from './dto/create-movie.dto';
import { MOVIE_EXCEPTION } from '../exception/error-code';

@Injectable()
export class MovieRepository extends Repository<Movie> {
  constructor(private readonly dataSource: DataSource) {
    super(Movie, dataSource.createEntityManager());
  }

  /**
   * 영화 생성
   *
   * @param createMovieDto  생성 관련 dto
   * @returns
   */
  async createMovie(createMovieDto: CreateMovieDto): Promise<Movie> {
    try {
      const {
        movieName,
        releaseData,
        movieTitle,
        preview,
        actors,
        synopsis,
        movieGenre,
        rating,
        playingTime,
        director,
      } = createMovieDto;

      const movie = await this.create({
        movieName,
        releaseData,
        movieTitle,
        preview,
        actors,
        synopsis,
        movieGenre,
        rating,
        playingTime,
        director,
      });

      return await this.save(movie);
    } catch (err) {
      if (err.code === '23502') {
        throw new BadRequestException(MOVIE_EXCEPTION.MOVIE_NOT_CREATE);
      }
    }
  }

  /**
   * 특정 영화 정보 조회
   *
   * @param movieId  특정 영화 정보를 불러올 고유값
   * @returns
   */
  async findOneBymovieId(movieId: number): Promise<Movie> {
    return await this.findOne({ where: { movieId } });
  }

  /**
   *
   * @param movieId         수정할 특정 영화 고유값
   * @param changeMovieDto  수정할 특정 영화 Coulmn DTO
   * @returns
   */
  async updateMovie(
    movieId: number,
    changeMovieDto: ChangeMovieDto,
  ): Promise<Movie> {
    const {
      movieName,
      releaseData,
      movieTitle,
      preview,
      actors,
      synopsis,
      movieGenre,
      rating,
      playingTime,
      director,
    } = changeMovieDto;

    const movie = await this.findOneBymovieId(movieId);
    movie.movieName = movieName;
    movie.releaseData = releaseData;
    movie.movieTitle = movieTitle;
    movie.preview = preview;
    movie.actors = actors;
    movie.synopsis = synopsis;
    movie.movieGenre = movieGenre;
    movie.rating = rating;
    movie.playingTime = playingTime;
    movie.director = director;

    return await this.save(movie);
  }

  /**
   * 특정 영화 삭제
   *
   * @param movieId 삭제할 특정 영화 고유값
   * @returns
   */
  async deleteMovie(movieId: number) {
    return await this.delete(movieId);
  }
}
