import { combineReducers } from "redux";
import appState from "./appState/reducer";
import user from "./user/reducer";
import results from "./results/reducer";

export default combineReducers({
  appState,
  user,
  results,
});
