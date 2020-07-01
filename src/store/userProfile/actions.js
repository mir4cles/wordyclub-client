import axios from "axios";
import { apiUrl } from "../../config/constants";
import {
  appLoading,
  appDoneLoading,
  showMessageWithTimeout,
} from "../appState/actions";

export const USER_PROFILE_FETCHED = "USER_PROFILE_FETCHED";

const userProfileFetched = (userProfile) => ({
  type: USER_PROFILE_FETCHED,
  payload: userProfile,
});

export const fetchUserProfile = (id) => {
  return async (dispatch) => {
    dispatch(appLoading());
    try {
      const response = await axios.get(`${apiUrl}/profiles/${id}`);
      dispatch(userProfileFetched(response.data.userProfile));
    } catch (error) {
      dispatch(showMessageWithTimeout("warning", false, `${error}`));
    }
    dispatch(appDoneLoading());
  };
};
