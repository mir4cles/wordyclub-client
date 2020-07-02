import React from "react";

import Wordcloud from "../../components/Wordcloud";
import SearchBar from "../../components/SearchBar";
import SearchResults from "../../components/SearchResults";

import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  heroContent: {
    padding: theme.spacing(4, 0, 6),
  },
}));

export default function Home() {
  const classes = useStyles();

  return (
    <Container maxWidth="sm" component="main" className={classes.heroContent}>
      <Typography
        component="h1"
        variant="h2"
        align="center"
        color="textPrimary"
        gutterBottom
      >
        Wordy Club
      </Typography>
      <Wordcloud />
      <Typography
        variant="h5"
        align="center"
        color="textSecondary"
        component="p"
      >
        As the name suggest, Wordy club helps you in finding the definition of
        words your looking for. It also helps you listen to the word you search
        and their meaning.
      </Typography>
      <SearchBar />
      <SearchResults />
    </Container>
  );
}
