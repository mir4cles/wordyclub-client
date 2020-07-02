import { apiUrl, DEFAULT_PAGINATION_LIMIT } from "../../config/constants";

import axios from "axios";
import { appLoading, appDoneLoading } from "../appState/actions";

const fetchWordsSuccess = (searchHistory) => ({
  type: "FETCH_WORDS_SUCCESS",
  payload: searchHistory,
});

export const fetchWords = () => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    const response = await axios.get(
      `${apiUrl}/searchhistory?limit=${DEFAULT_PAGINATION_LIMIT}`
    );
    dispatch(fetchWordsSuccess(response.data));
    dispatch(appDoneLoading());
  };
};
