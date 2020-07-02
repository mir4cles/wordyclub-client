import { combineReducers } from "redux";
import appState from "./appState/reducer";
import user from "./user/reducer";
import results from "./results/reducer";
import userProfile from "./userProfile/reducer";
import searchHistory from "./searchHistory/reducer";

export default combineReducers({
  appState,
  user,
  results,
  userProfile,
  searchHistory,
});
