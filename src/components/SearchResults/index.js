import React from "react";

import { makeStyles } from "@material-ui/core/styles";

import WordCard from "../../components/WordCard";

const useStyles = makeStyles((theme) => ({}));

export default function SearchResults() {
  const classes = useStyles();
  return (
    <WordCard
      title="test card"
      definition="check yourself"
      partOfSpeech="wreckage"
    />
  );
}
