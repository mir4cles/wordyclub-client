// import { apiUrl } from "../../config/constants";
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
    if (!id || !token) {
      return ({ id, token } = 0);
    }
    dispatch(appLoading());

    axios({
      method: "GET",
      url: `https://wordsapiv1.p.rapidapi.com/words/${searchInput}`,
      headers: {
        "content-type": "application/octet-stream",
        "x-rapidapi-host": "wordsapiv1.p.rapidapi.com",
        "x-rapidapi-key": "240ec11282mshf488493cf0c66fcp1f7184jsnfd5fe4a2b82c",
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
