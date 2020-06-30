import { wordsApiUrl, wordsApiKey } from "../../config/constants";
import axios from "axios";

import {
  appLoading,
  appDoneLoading,
  showMessageWithTimeout,
} from "../appState/actions";

import { selectUser } from "../user/selectors";

export const FETCH_RESULTS_SUCCESS = "FETCH_RESULTS_SUCCESS";
export const SET_KEYWORD = "SET_KEYWORD";

const fetchResultsSuccess = (results, keyword) => ({
  type: FETCH_RESULTS_SUCCESS,
  results,
  keyword,
});

const setKeyword = (keyword) => ({
  type: SET_KEYWORD,
  payload: keyword,
});

export const fetchResults = (searchInput) => {
  return async (dispatch, getState) => {
    const { id, token } = selectUser(getState());
    console.log("id", id, "toke", token);
    // if (!id || !token) {
    //   return ({ id, token } = 0);
    // }
    dispatch(appLoading());
    axios({
      method: "GET",
      url: `${wordsApiUrl}/${searchInput}`,
      headers: {
        "content-type": "application/octet-stream",
        "x-rapidapi-host": "wordsapiv1.p.rapidapi.com",
        "x-rapidapi-key": wordsApiKey,
        useQueryString: true,
      },
    })
      .then((response) => {
        console.log(response.data);
        // dispatch(setKeyword(searchInput));
        dispatch(fetchResultsSuccess(response.data.results, searchInput));
        dispatch(appDoneLoading());
      })
      .catch((error) => {
        console.log(error);
        dispatch(showMessageWithTimeout("warning", false, `${error}`));
      });
  };
};
