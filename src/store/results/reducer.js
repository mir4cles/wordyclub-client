import { FETCH_RESULTS_SUCCESS } from "./actions";

const initialState = {
  keyword: null,
  results: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "RESET": {
      return (state = initialState);
    }
    case FETCH_RESULTS_SUCCESS:
      return {
        keyword: action.keyword,
        results: action.results,
      };

    default:
      return state;
  }
};
