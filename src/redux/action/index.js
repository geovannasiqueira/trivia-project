import getToken from '../../GetToken';
export const SET_USER = 'SET_USER';
export const FETCH_GAME_SUCCESS = 'FETCH_GAME_SUCCESS';
export const FETCH_GAME_ERROR = 'FETCH_GAME_ERROR';
export const SET_ARR_QUESTIONS = 'SET_ARR_QUESTIONS';
export const SET_STOP_TIMER = 'SET_STOP_TIMER';
export const SET_SCORE_BOARD = 'SET_SCORE_BOARD';
export const SET_ASSERTIONS = 'SET_ASSERTIONS';
export const CLEAR_SCORE = 'CLEAR_SCORE';
export const SET_URL_IMAGE = 'SET_URL_IMAGE';

export function setUser(payload) {
  return {
    type: SET_USER,
    payload,
  };
}
export function gameSuccess(payload) {
  return {
    type: FETCH_GAME_SUCCESS,
    payload,
  };
}
const gameError = (error) => ({
  type: FETCH_GAME_ERROR,
  errorMessage: error,
});
export const pageGameThunk = () => async (dispatch) => {
  try {
    const fetchSuccess = await getToken();
    localStorage.setItem('token', fetchSuccess.token);
    dispatch(gameSuccess(fetchSuccess));
  } catch (error) {
    dispatch(gameError(error.message));
  }
};
export function questions(payload) {
  return {
    type: SET_ARR_QUESTIONS,
    payload,
  };
}
export function scoreBoard(payload) {
  return {
    type: SET_STOP_TIMER,
    payload,
  };
}
export function SetScoreBoard(payload) {
  return {
    type: SET_SCORE_BOARD,
    payload,
  };
}

export function clearScore() {
  return {
    type: CLEAR_SCORE,
  };
}

export function setImage(payload) {
  return {
    type: SET_URL_IMAGE,
    payload,
  };
}
