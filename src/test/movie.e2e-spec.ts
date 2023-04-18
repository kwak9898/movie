import { HttpCode, HttpStatus, INestApplication } from '@nestjs/common';
import { MovieService } from '../movie/movie.service';
import { RequestHelper } from '../utils/test.util';
import { MovieFactory } from './factory/movie.factory';
import { DataSource } from 'typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../app.module';
import { DatabaseModule } from '../database/database.module';
import { MovieRepository } from '../movie/movie.repository';
import { MOVIE_EXCEPTION } from '../exception/error-code';
import { Movie } from '../movie/entities/movie.entity';

describe('영화 조회/생성/수정/삭제 테스트', () => {
  let app: INestApplication;
  let movieService: MovieService;

  let requestHelper: RequestHelper;
  let movieFactory: MovieFactory;
  let dataSource: DataSource;

  let movie: Movie;
  let movieId: number | null;

  const movieDomain = '/movie';

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [MovieService, DatabaseModule, MovieFactory, MovieRepository],
    }).compile();

    app = moduleFixture.createNestApplication();

    movieService = moduleFixture.get(MovieService);
    movieFactory = moduleFixture.get(MovieFactory);

    dataSource = moduleFixture.get(DataSource);

    movie = await movieFactory.createBaseMovie();
    await dataSource.synchronize(true);

    requestHelper = new RequestHelper(app);
    await app.init();
  });

  describe('영화 전체 조회', () => {
    it('성공', async () => {
      // Given
      await movieFactory.createMovieList();

      // When
      const response = await requestHelper.get(
        `${movieDomain}?page=1&limit=10`,
      );

      // Then
      const meta = response.body.meta;

      expect(response.statusCode).toBe(HttpStatus.OK);
      expect(meta.totalItems).toBe(21);
      expect(meta.itemCount).toBe(10);
      expect(meta.totalPages).toBe(3);
      expect(meta.itemsPerPage).toBe(10);

      await movieFactory.clearMovieData();
    });

    it('존재하는 데이터가 없을 경우 조회 실패', async () => {
      // Given
      await movieFactory.clearMovieData();

      // When
      const response = await requestHelper.get(
        `${movieDomain}?page=1&limit=10`,
      );

      // Then
      const body = response.body;

      expect(response.statusCode).toBe(HttpStatus.NOT_FOUND);
      expect(body.code).toBe(MOVIE_EXCEPTION.MOVIES_NOT_FOUND.code);
      expect(body.status).toBe(MOVIE_EXCEPTION.MOVIES_NOT_FOUND.status);
      expect(body.message).toBe(MOVIE_EXCEPTION.MOVIES_NOT_FOUND.message);
    });
  });

  describe('특정 영화 조회', () => {
    it('성공', async () => {
      // Given
      movie = await movieFactory.createBaseMovie();
      movieId = movie.movieId;

      // When
      const response = await requestHelper.get(`${movieDomain}/${movieId}`);

      // Then
      const body = response.body;

      expect(body.movieId).toBe(movieId);
      expect(body.movieName).toBe(movie.movieName);
      expect(body.releaseData).toBe(movie.releaseData);
      expect(body.movieTitle).toBe(movie.movieTitle);
      expect(body.preview).toBe(movie.preview);
      expect(body.actors).toBe(movie.actors);
      expect(body.synopsis).toBe(movie.synopsis);
      expect(body.movieGenre).toBe(movie.movieGenre);
      expect(body.rating).toBe(movie.rating);
      expect(body.playingTime).toBe(movie.playingTime);
      expect(body.director).toBe(movie.director);

      await movieFactory.clearMovieData();
    });

    it('userId가 없을 경우 실패', async () => {
      // When
      const response = await requestHelper.get(`${movieDomain}/${movieId}`);

      // Then
      const body = response.body;

      expect(response.statusCode).toBe(HttpStatus.NOT_FOUND);
      expect(body.code).toBe(MOVIE_EXCEPTION.MOVIE_NOT_FOUND.code);
      expect(body.status).toBe(MOVIE_EXCEPTION.MOVIE_NOT_FOUND.status);
      expect(body.message).toBe(MOVIE_EXCEPTION.MOVIE_NOT_FOUND.message);
    });
  });
});
