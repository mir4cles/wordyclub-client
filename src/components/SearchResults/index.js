import React from "react";
import { useSelector } from "react-redux";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

import { makeStyles } from "@material-ui/core/styles";

import WordCard from "../../components/WordCard";

import { selectResults } from "../../store/results/selectors";
import { selectToken, selectUser } from "../../store/user/selectors";

const useStyles = makeStyles((theme) => ({}));

export default function SearchResults() {
  const classes = useStyles();
  const results = useSelector(selectResults);
  const user = useSelector(selectUser);
  const token = useSelector(selectToken);

  if (!results.keyword) {
    return <></>;
  }

  return (
    <>
      <Container maxWidth="md" component="main" className={classes.heroContent}>
        <Grid
          direction="column"
          justify="center"
          alignItems="center"
          container
          spacing={5}
        >
          <Grid item xs={11} sm={11} md={8}>
            <WordCard
              results={results}
              user={user}
              showLink={token ? true : false}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
