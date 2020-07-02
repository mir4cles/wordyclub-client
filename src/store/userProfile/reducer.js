import { USER_PROFILE_FETCHED, USER_PROFILE_UPDATED } from "./actions";
import {
  DELETE_FAVWORD_PROFILE,
  UPDATE_PROFILE_HISTORY,
} from "../results/actions";

const initialState = {
  searchHistories: [],
  favouriteWords: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_PROFILE_FETCHED:
      return action.payload;

    case DELETE_FAVWORD_PROFILE:
      return {
        ...state,
        favouriteWords: [
          ...state.favouriteWords.filter(
            (favouriteWord) => favouriteWord.favouriteWord !== action.payload
          ),
        ],
      };

    case UPDATE_PROFILE_HISTORY:
      return {
        ...state,
        searchHistories: [],
      };

    default:
      return state;
  }
};
