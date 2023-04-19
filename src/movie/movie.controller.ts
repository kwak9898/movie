import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { MyPaginationQuery } from '..//base/pagination-query';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Movie } from './entities/movie.entity';
import { MovieDto } from './dto/movie.dto';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiPaginatedResponse } from '..//dacorators/paginate.dacorator';
import { CreateMovieDto } from './dto/create-movie.dto';

@Controller('movie')
@ApiTags('MOVIE')
export class MovieController {
  constructor(private movieService: MovieService) {}

  @Get('')
  @ApiPaginatedResponse(Movie)
  @ApiOperation({
    summary: '영화 전체 조회',
  })
  @HttpCode(200)
  async getAllByMovie(
    @Query() query: MyPaginationQuery,
  ): Promise<Pagination<Movie>> {
    return await this.movieService.getAllMovie(query);
  }

  @ApiOkResponse({ type: Movie })
  @ApiOperation({
    summary: '영화 상세 조회',
  })
  @HttpCode(200)
  @Get(':movieId')
  async findOneByMovie(@Param('movieId') movieId: number): Promise<Movie> {
    return await this.movieService.findOneByMovieId(movieId);
  }

  @ApiOkResponse({ type: Movie })
  @ApiOperation({
    summary: '영화 생성',
  })
  @HttpCode(201)
  @Post('')
  async createMovie(@Body() createMovie: CreateMovieDto): Promise<Movie> {
    return await this.createMovie(createMovie);
  }

  @Put(':movieId')
  @HttpCode(200)
  async updateMovie(
    @Param(':movieId') movieId: number,
    changeMovieDto: MovieDto,
  ) {
    return await this.updateMovie(movieId, changeMovieDto);
  }

  @Delete('movieId')
  @HttpCode(200)
  async deleteMovie(@Param(':movieId') movieId: number) {
    return await this.deleteMovie(movieId);
  }
}
