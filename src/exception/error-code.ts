export const MOVIE_EXCEPTION = {
  MOVIE_NAME_NOT_FOUND: {
    code: 'MOVIE_NAME_NOT_FOUND',
    status: 404,
    message: '찾고자하는 영화를 가져올 수 없습니다.',
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
