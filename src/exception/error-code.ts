export const MOVIE_EXCEPTION = {
  MOVIES_NOT_FOUND: {
    code: 'MOVIES_NOT_FOUND',
    status: 404,
    message: '존재하는 영화 정보들을 불러올 수 없습니다.',
  },
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

  MOVIE_NOT_CREATE: {
    code: 'MOVIE_NOT_CREATE',
    status: 400,
    message: '생성할 영화 정보들을 적어주세요.',
  },
};
