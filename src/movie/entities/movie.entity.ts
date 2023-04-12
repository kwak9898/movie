import { BaseEntity } from 'src/base/base.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('movie', { schema: 'public' })
export class Movie extends BaseEntity {
  @PrimaryGeneratedColumn({
    name: 'movie_id',
    comment: '영화 고유값',
  })
  movieId: number;

  @Column('character varying', {
    name: 'movie_name',
    comment: '영화 이름',
  })
  movieName: string;

  @Column('integer', {
    name: 'release_data',
    comment: '영화 개봉일',
  })
  releaseData: number;

  @Column('character varying', {
    name: 'movie_title',
    comment: '영화 원제',
  })
  movieTitle: string;

  @Column('character varying', {
    name: 'preview',
    comment: '영화 예고편',
  })
  preview: string;

  @Column('character varying', {
    array: true,
    name: 'actors',
    comment: '영화 출연진',
    default: {},
  })
  actors: string[];

  @Column('character varying', {
    name: 'synopsis',
    comment: '시놉시스',
  })
  synopsis: string;

  @Column('character varying', {
    array: true,
    name: 'movie_genre',
    comment: '영화 장르',
    default: {},
  })
  movieGenre: string[];

  @Column('decimal', {
    name: 'rating',
    comment: '평점',
  })
  rating: string;

  @Column('character', {
    name: 'playing_time',
    comment: '재생 시간',
  })
  playingTime: string;

  @Column('character varying', {
    name: 'director',
    comment: '영화 감독',
  })
  director: string;
}
