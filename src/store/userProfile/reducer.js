import { USER_PROFILE_FETCHED } from "./actions";

const initialState = {
  searchHistories: [],
  favouriteWords: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_PROFILE_FETCHED:
      return action.payload;
    default:
      return state;
  }
};
