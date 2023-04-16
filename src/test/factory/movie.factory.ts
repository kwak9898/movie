import { Injectable } from '@nestjs/common';
import { Movie } from 'src/movie/entities/movie.entity';
import { MovieRepository } from 'src/movie/movie.repository';
import { faker } from '@faker-js/faker';

@Injectable()
export class MovieFactory {
  constructor(private readonly movieRepository: MovieRepository) {}

  async createBaseMovie(): Promise<Movie> {
    const movie = new Movie();

    movie.movieName = faker.music.songName();
    movie.releaseData = 2013;
    movie.movieTitle = faker.fake.name;
    movie.preview = faker.image.imageUrl();
    movie.actors = faker.name.fullName();
    movie.synopsis = faker.word.preposition();
    movie.movieGenre = faker.music.genre();
    movie.rating = '8.8';
    movie.playingTime = '2시간';
    movie.director = faker.name.fullName();

    return await this.movieRepository.save(movie);
  }
}