import { SET_URL_IMAGE } from '../action';

const INITIAL_STATE = {
  urlImage: '',
};
const setImageGravatar = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_URL_IMAGE:
    return {
      urlImage: action.payload,
    };
  default:
    return state;
  }
};
export default setImageGravatar;
