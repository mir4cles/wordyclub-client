import axios from "axios";
import { apiUrl } from "../../config/constants";
import {
  appLoading,
  appDoneLoading,
  showMessageWithTimeout,
} from "../appState/actions";

import { selectUser } from "../user/selectors";

export const USER_PROFILE_FETCHED = "USER_PROFILE_FETCHED";
export const USER_PROFILE_UPDATED = "USER_PROFILE_UPDATED";

const userProfileFetched = (userProfile) => ({
  type: USER_PROFILE_FETCHED,
  payload: userProfile,
});

const updateUserProfileSuccess = (updatedProfile) => ({
  type: USER_PROFILE_UPDATED,
  payload: updatedProfile,
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

export const updateProfile = (userId, name, email) => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    const { token } = selectUser(getState());
    await axios.patch(
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
    dispatch(appDoneLoading());
  };
};
