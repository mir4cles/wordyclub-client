import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
}));

export default function SearchBar() {
  const classes = useStyles();

  const [searchInput, setSearchInput] = useState("");

  function submitForm(event) {
    event.preventDefault();
    console.log("search input:", searchInput);
  }

  return (
    <div style={{ width: 300 }}>
      <form className={classes.form} noValidate>
        <TextField
          id="search-bar"
          variant="outlined"
          label="Search"
          value={searchInput}
          onChange={(event) => setSearchInput(event.target.value)}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={submitForm}
        >
          Go
        </Button>
      </form>
    </div>
  );
}
