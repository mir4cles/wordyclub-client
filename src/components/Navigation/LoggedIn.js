import React from "react";
import { useDispatch } from "react-redux";

import { Button } from "@material-ui/core";

import { logOut } from "../../store/user/actions";

export default function LoggedIn() {
  const dispatch = useDispatch();
  return (
    <Button
      color="inherit"
      variant="outlined"
      onClick={() => dispatch(logOut())}
    >
      LOGOUT
    </Button>
  );
}
