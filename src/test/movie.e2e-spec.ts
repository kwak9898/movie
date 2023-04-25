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
import { CreateMovieDto } from '../movie/dto/create-movie.dto';
import { ChangeMovieDto } from '../movie/dto/change-movie.dto';

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

      // When
      const response = await requestHelper.get(
        `${movieDomain}?page=1&limit=10`,
      );

      // Then
      const meta = response.body.meta;

      console.log('body : ', response.body);

      expect(response.statusCode).toBe(HttpStatus.OK);
      expect(meta.totalItems).toBe(10);
      expect(meta.itemCount).toBe(10);
      expect(meta.totalPages).toBe(3);
      expect(meta.itemsPerPage).toBe(10);
    });

    it(`영화 이름 검색`, async () => {
      // Given
      const movies = await movieFactory.createMovieList();

      const movieName = movies.movieName;

      console.log(movies);

      // When
      const response = await requestHelper.get(
        `${movieDomain}?page=1&limit=10&movie_name=${movieName}`,
      );

      // Then

      const item = response.body.item;

      console.log('movie name : ', movieName);
      console.log(response.body);

      await movieFactory.clearMovieData();
    });
  });

  // describe('특정 영화 조회', () => {
  //   it('성공', async () => {
  //     // Given
  //     movie = await movieFactory.createBaseMovie();
  //     movieId = movie.movieId;

  //     // When
  //     const response = await requestHelper.get(`${movieDomain}/${movieId}`);

  //     // Then
  //     const body = response.body;

  //     expect(body.movieId).toBe(movieId);
  //     expect(body.movieName).toBe(movie.movieName);
  //     expect(body.releaseData).toBe(movie.releaseData);
  //     expect(body.movieTitle).toBe(movie.movieTitle);
  //     expect(body.preview).toBe(movie.preview);
  //     expect(body.actors).toBe(movie.actors);
  //     expect(body.synopsis).toBe(movie.synopsis);
  //     expect(body.movieGenre).toBe(movie.movieGenre);
  //     expect(body.rating).toBe(movie.rating);
  //     expect(body.playingTime).toBe(movie.playingTime);
  //     expect(body.director).toBe(movie.director);

  //     await movieFactory.clearMovieData();
  //   });

  //   it('movieId가 없을 경우 실패', async () => {
  //     // When
  //     const response = await requestHelper.get(`${movieDomain}/${movieId}`);

  //     // Then
  //     const body = response.body;

  //     expect(response.statusCode).toBe(HttpStatus.NOT_FOUND);
  //     expect(body.code).toBe(MOVIE_EXCEPTION.MOVIE_NOT_FOUND.code);
  //     expect(body.status).toBe(MOVIE_EXCEPTION.MOVIE_NOT_FOUND.status);
  //     expect(body.message).toBe(MOVIE_EXCEPTION.MOVIE_NOT_FOUND.message);
  //   });
  // });

  // describe('영화 생성 테스트', () => {
  //   it('성공', async () => {
  //     // Given
  //     const dto = new CreateMovieDto();

  //     dto.movieName = '스파이더멘 홈 커밍';
  //     dto.releaseData = 2022;
  //     dto.movieTitle = '홈커밍';
  //     dto.preview = 'www.youtube.com';
  //     dto.actors = '톰 홀랜드';
  //     dto.synopsis = '집이다.';
  //     dto.movieGenre = '액션, 판타지';
  //     dto.rating = '8.2';
  //     dto.playingTime = '3시간 안됨';
  //     dto.director = '나';

  //     // When
  //     const response = await requestHelper.post(`${movieDomain}`, dto);

  //     // Then
  //     const body = response.body;

  //     expect(response.statusCode).toBe(HttpStatus.CREATED);
  //     expect(body.movieName).toBe(dto.movieName);
  //     expect(body.releaseData).toBe(dto.releaseData);
  //     expect(body.movieTitle).toBe(dto.movieTitle);
  //     expect(body.preview).toBe(dto.preview);
  //     expect(body.actors).toBe(dto.actors);
  //     expect(body.synopsis).toBe(dto.synopsis);
  //     expect(body.movieGenre).toBe(dto.movieGenre);
  //     expect(body.rating).toBe(dto.rating);
  //     expect(body.playingTime).toBe(dto.playingTime);
  //     expect(body.director).toBe(dto.director);

  //     await movieFactory.clearMovieData();
  //   });

  //   it('정보들이 없을 시 실패', async () => {
  //     // When
  //     const response = await requestHelper.post(`${movieDomain}`);

  //     // Then
  //     const body = response.body;

  //     expect(response.statusCode).toBe(HttpStatus.BAD_REQUEST);
  //     expect(body.code).toBe(MOVIE_EXCEPTION.MOVIE_NOT_CREATE.code);
  //     expect(body.status).toBe(MOVIE_EXCEPTION.MOVIE_NOT_CREATE.status);
  //     expect(body.message).toBe(MOVIE_EXCEPTION.MOVIE_NOT_CREATE.message);
  //   });
  // });

  // describe('특정 영화 정보 수정', () => {
  //   it('성공', async () => {
  //     // Given
  //     movie = await movieFactory.createBaseMovie();
  //     movieId = movie.movieId;
  //     const dto = new ChangeMovieDto();
  //     dto.movieName = '범죄도시2';
  //     dto.actors = '마동석, 손석구';
  //     dto.director = '감독';

  //     // When
  //     const response = await requestHelper.put(
  //       `${movieDomain}/${movieId}`,
  //       dto,
  //     );

  //     // Then
  //     const body = response.body;

  //     expect(body.movieId).toBe(movie.movieId);
  //     expect(body.movieId).toBe(movieId);
  //     expect(body.movieName).toBe(dto.movieName);
  //     expect(body.actors).toBe(dto.actors);
  //     expect(body.director).toBe(dto.director);

  //     await movieFactory.clearMovieData();
  //   });

  //   it('movieId가 없을 경우 특정 영화 정보 수정 실패', async () => {
  //     // When
  //     const response = await requestHelper.put(`${movieDomain}/${movieId}`);

  //     // Then
  //     const body = response.body;

  //     expect(body.code).toBe(MOVIE_EXCEPTION.MOVIE_NOT_FOUND.code);
  //     expect(body.status).toBe(MOVIE_EXCEPTION.MOVIE_NOT_FOUND.status);
  //     expect(body.message).toBe(MOVIE_EXCEPTION.MOVIE_NOT_FOUND.message);
  //   });
  // });

  // describe('특정 영화 삭제', () => {
  //   it('성공', async () => {
  //     // Given
  //     movie = await movieFactory.createBaseMovie();
  //     movieId = movie.movieId;

  //     // When
  //     const response = await requestHelper.delete(`${movieDomain}/${movieId}`);

  //     // Then
  //     expect(response.statusCode).toBe(HttpStatus.OK);
  //   });

  //   it('movieId가 없을 시 삭제 실패', async () => {
  //     // When
  //     const response = await requestHelper.delete(`${movieDomain}/${movieId}`);

  //     // Then
  //     const body = response.body;

  //     expect(response.statusCode).toBe(HttpStatus.NOT_FOUND);
  //     expect(body.code).toBe(MOVIE_EXCEPTION.MOVIE_NOT_FOUND.code);
  //     expect(body.status).toBe(MOVIE_EXCEPTION.MOVIE_NOT_FOUND.status);
  //     expect(body.message).toBe(MOVIE_EXCEPTION.MOVIE_NOT_FOUND.message);
  //   });
  // });
});
