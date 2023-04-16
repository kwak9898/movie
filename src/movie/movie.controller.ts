import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { MyPagination } from 'src/base/pagination-resoponse';
import { MyPaginationQuery } from 'src/base/pagination-query';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Movie } from './entities/movie.entity';
import { MovieDto } from './dto/movie.dto';

@Controller('movie')
export class MovieController {
  constructor(private movieService: MovieService) {}

  @Get('')
  async getAllByMovie(
    @Query() query: MyPaginationQuery,
  ): Promise<Pagination<Movie>> {
    return await this.movieService.getAllMovie(query);
  }

  @Get(':movieId')
  async findOneByMovie(@Param('movieId') movieId: number): Promise<Movie> {
    return await this.findOneByMovie(movieId);
  }

  @Post('')
  async createMovie(@Body() createMovie: MovieDto): Promise<Movie> {
    return await this.createMovie(createMovie);
  }

  @Put(':movieId')
  async updateMovie(
    @Param(':movieId') movieId: number,
    changeMovieDto: MovieDto,
  ) {
    return await this.updateMovie(movieId, changeMovieDto);
  }

  @Delete('movieId')
  async deleteMovie(@Param(':movieId') movieId: number) {
    return await this.deleteMovie(movieId);
  }
}
