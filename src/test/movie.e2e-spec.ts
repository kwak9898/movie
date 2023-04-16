import { INestApplication } from '@nestjs/common';
import { MovieService } from 'src/movie/movie.service';
import { RequestHelper } from 'src/utils/test.util';
import { MovieFactory } from './factory/movie.factory';
import { DataSource } from 'typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { DatabaseModule } from 'src/database/database.module';

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
      providers: [MovieService, DatabaseModule, MovieFactory],
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
});
