import { wordsApiUrl, wordsApiKey } from "../../config/constants";
import axios from "axios";

import {
  appLoading,
  appDoneLoading,
  showMessageWithTimeout,
} from "../appState/actions";

import { selectUser } from "../user/selectors";

export const FETCH_RESULTS_SUCCESS = "FETCH_RESULTS_SUCCESS";

const fetchResultsSuccess = (results) => ({
  type: FETCH_RESULTS_SUCCESS,
  payload: results,
});

export const fetchResults = (searchInput) => {
  return async (dispatch, getState) => {
    const { id, token } = selectUser(getState());
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
        dispatch(fetchResultsSuccess(response.data.results));
        dispatch(appDoneLoading());
      })
      .catch((error) => {
        console.log(error);
        dispatch(showMessageWithTimeout("warning", false, `${error}`));
      });
  };
};
