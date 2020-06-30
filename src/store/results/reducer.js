import { FETCH_RESULTS_SUCCESS } from "./actions";

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_RESULTS_SUCCESS:
      return [...state, ...action.payload];

    default:
      return state;
  }
};
