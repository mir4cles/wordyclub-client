import {
  APP_LOADING,
  APP_DONE_LOADING,
  SET_MESSAGE,
  CLEAR_MESSAGE,
} from "./actions";
import { SET_KEYWORD } from "../results/actions";

const initialState = {
  loading: false,
  message: null,
  keyword: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case APP_LOADING:
      return { ...state, loading: true };

    case APP_DONE_LOADING:
      return { ...state, loading: false };

    case SET_MESSAGE:
      return { ...state, message: action.payload };

    case CLEAR_MESSAGE:
      return { ...state, message: null };

    case SET_KEYWORD:
      return { ...state, keyword: action.payload };

    default:
      return state;
  }
};
