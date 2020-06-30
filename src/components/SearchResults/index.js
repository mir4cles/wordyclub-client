import React from "react";
import { useSelector } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";

import WordCard from "../../components/WordCard";

import { selectResults } from "../../store/results/selectors";

const useStyles = makeStyles((theme) => ({}));

export default function SearchResults() {
  const classes = useStyles();
  const results = useSelector(selectResults);

  return (
    <>
      {results.map((result, index) => (
        <WordCard key={index} props={result} />
      ))}
    </>
  );
}
