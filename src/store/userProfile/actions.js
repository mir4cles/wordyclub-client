import axios from "axios";
import { apiUrl } from "../../config/constants";
import {
  appLoading,
  appDoneLoading,
  showMessageWithTimeout,
} from "../appState/actions";

import { selectUser } from "../user/selectors";

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
      dispatch(
        showMessageWithTimeout(
          "warning",
          false,
          `${error.response.data.message}`
        )
      );
    }
    dispatch(appDoneLoading());
  };
};

export const updateProfile = (userId, name, email) => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    const { token } = selectUser(getState());
    try {
      const response = await axios.patch(
        `${apiUrl}/profiles/${userId}`,
        {
          name,
          email,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(fetchUserProfile(userId));
      dispatch(
        showMessageWithTimeout("success", false, "Profile successfully updated")
      );
    } catch (error) {
      dispatch(
        showMessageWithTimeout(
          "warning",
          false,
          `${error.response.data.message}`
        )
      );
    }
    dispatch(appDoneLoading());
  };
};
