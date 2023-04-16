import { Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { MovieRepository } from './movie.repository';

@Module({
  providers: [MovieService, MovieRepository],
  controllers: [MovieController],
  exports: [MovieService, MovieRepository],
})
export class MovieModule {}
