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
export const DELETE_FAVWORD_PROFILE = "DELETE_FAVWORD_PROFILE";

const fetchResultsSuccess = (results, keyword) => ({
  type: FETCH_RESULTS_SUCCESS,
  results,
  keyword,
});

const setKeyword = (keyword) => ({
  type: SET_KEYWORD,
  payload: keyword,
});

const updateFavInProfile = (favouriteWord) => ({
  type: DELETE_FAVWORD_PROFILE,
  payload: favouriteWord,
});

export const fetchResults = (searchInput) => {
  return async (dispatch, getState) => {
    const { id, token } = selectUser(getState());
    console.log("id", id, "toke", token);
    // if (!id || !token) {
    //   return ({ id, token } = 0);
    // }

    dispatch(appLoading());
    await axios({
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

    if (token !== null) {
      await axios.post(`${process.env.REACT_APP_API_URL}/searchhistory`, {
        searchWord: searchInput,
        token,
      });
    } else {
      await axios.post(`${process.env.REACT_APP_API_URL}/searchhistory`, {
        searchWord: searchInput,
      });
    }
  };
};

export const updateFavWord = (favouriteWord, status) => {
  return async (dispatch, getState) => {
    try {
      const { id, token } = selectUser(getState());

      dispatch(appLoading());

      if (status) {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/favouritewords/`,
          { favouriteWord },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        dispatch(
          showMessageWithTimeout(
            "success",
            false,
            `Saved "${favouriteWord}" to favourites`,
            4000
          )
        );
      } else {
        const response = await axios.delete(
          `${process.env.REACT_APP_API_URL}/favouritewords/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            data: {
              favouriteWord,
            },
          }
        );
        dispatch(updateFavInProfile(favouriteWord));
        dispatch(
          showMessageWithTimeout(
            "success",
            false,
            `Removed "${favouriteWord}" from favourites`,
            4000
          )
        );
      }
      dispatch(appDoneLoading());
    } catch (error) {
      console.log(error);
      dispatch(showMessageWithTimeout("warning", false, `${error}`));
    }
  };
};
