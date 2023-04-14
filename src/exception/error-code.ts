export const MOVIE_EXCEPTION = {
  MOVIE_NOT_FOUND: {
    code: 'MOVIE_NOT_FOUND',
    status: 404,
    message: '존재하는 영화가 없습니다.',
  },

  MOVIE_EXIST: {
    code: 'MOVIE_EXIST',
    status: 400,
    message: '이미 존재하는 영화입니다.',
  },
};
