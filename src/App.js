import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { useDispatch } from "react-redux";

import Navigation from "./components/Navigation";
import MessageBox from "./components/MessageBox";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import UserProfile from "./pages/UserProfile";
import NotFound from "./pages/NotFound";

import { getUserWithStoredToken } from "./store/user/actions";
import SearchResults from "./components/SearchResults";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserWithStoredToken());
  }, [dispatch]);

  return (
    <>
      <Navigation />
      <MessageBox />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/search/:keyword" component={SearchResults} />
        <Route path="/profile/:userId" component={UserProfile} />
        <Route path="/signup" component={SignUp} />
        <Route path="/" component={NotFound} />
        <Route path="/404" component={NotFound} />
      </Switch>
    </>
  );
}

export default App;
