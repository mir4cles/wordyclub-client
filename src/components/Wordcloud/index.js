import React, { useEffect } from "react";
import ReactWordcloud from "react-wordcloud";

import words from "./words";
import { useDispatch } from "react-redux";
import { fetchWords } from "../../store/searchHistory/actions";

export default function Wordcloud() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchWords());
  }, [dispatch]);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <ReactWordcloud words={words} />
    </div>
  );
}
