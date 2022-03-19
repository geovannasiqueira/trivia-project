import { FETCH_GAME_SUCCESS } from '../action';

const INITIAL_STATE = '';

const tokenReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case FETCH_GAME_SUCCESS:
    return (action.payload.token);
  default:
    return state;
  }
};
export default tokenReducer;
