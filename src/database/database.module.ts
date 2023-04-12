import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Movie } from 'src/movie/entities/movie.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [Movie],
        synchronize: configService.get('NODE_ENV') !== 'production',
        dropSchema:
          configService.get('NODE_ENV') === 'test' ||
          configService.get('NODE_ENV') === 'ci',
      }),
    }),
  ],
})
export class DatabaseModule {}
