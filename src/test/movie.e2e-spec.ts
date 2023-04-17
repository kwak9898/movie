import { HttpCode, HttpStatus, INestApplication } from '@nestjs/common';
import { MovieService } from '../movie/movie.service';
import { RequestHelper } from '../utils/test.util';
import { MovieFactory } from './factory/movie.factory';
import { DataSource } from 'typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../app.module';
import { DatabaseModule } from '../database/database.module';
import { MovieRepository } from '../movie/movie.repository';

describe('영화 조회/생성/수정/삭제 테스트', () => {
  let app: INestApplication;
  let movieService: MovieService;

  let requestHelper: RequestHelper;
  let movieFactory: MovieFactory;
  let dataSource: DataSource;

  let movie;
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

      await movieFactory.deleteMovie();
    });
  });
});
