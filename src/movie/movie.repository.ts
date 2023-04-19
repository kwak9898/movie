import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Movie } from './entities/movie.entity';
import { MovieDto } from './dto/movie.dto';
import { CreateMovieDto } from './dto/create-movie.dto';

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

    return this.save(movie);
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
  async updateMovie(movieId: number, changeMovieDto: MovieDto) {
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

    return await this.update(movieId, {
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
