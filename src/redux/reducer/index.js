import { combineReducers } from 'redux';
import player from './user';
import token from './token';
import gravatar from './setImageGravatar';

const rootReducer = combineReducers({
  player,
  token,
  gravatar,
});

export default rootReducer;