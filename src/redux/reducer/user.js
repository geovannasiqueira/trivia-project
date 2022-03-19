import { SET_USER, SET_SCORE_BOARD, CLEAR_SCORE } from '../action';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_USER:
    return ({
      ...state,
      name: action.payload.name,
      gravatarEmail: action.payload.gravatarEmail,
    });
  case SET_SCORE_BOARD:
    return ({
      ...state,
      score: state.score + action.payload,
      assertions: state.assertions + 1,
    } );
  case CLEAR_SCORE:
    return ({
      ...state,
      score: 0,
      assertions: 0,
    });
  default:
    return state;
  }
};
export default player;
