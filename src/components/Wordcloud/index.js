import React, { useEffect } from "react";
import "d3-transition";
import { select } from "d3-selection";
import ReactWordcloud from "react-wordcloud";
import { useDispatch, useSelector } from "react-redux";

import { fetchWords } from "../../store/searchHistory/actions";
import { selectSearchHistory } from "../../store/searchHistory/selector";

function getCallback(callback) {
  return function (word, event) {
    const isActive = callback !== "onWordMouseOut";
    const element = event.target;
    const text = select(element);
    text
      .on("click", () => {
        if (isActive) {
          window.open(`/search/${word.text}`, "_self");
        }
      })
      .transition()
      .attr("background", "white")
      .attr("font-size", isActive ? "300%" : "100%")
      .attr("text-decoration", isActive ? "underline" : "none");
  };
}

export default function Wordcloud() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchWords());
  }, [dispatch]);

  const searchHistory = useSelector(selectSearchHistory);

  const words = searchHistory.map((word) => ({
    text: word.searchWord,
    value: Math.floor(Math.random() * 71) + 10,
  }));

  const callbacks = {
    getWordTooltip: (word) =>
      `The word "${word.text}" appears ${word.value} times.`,
    onWordClick: getCallback("onWordClick"),
    onWordMouseOut: getCallback("onWordMouseOut"),
    onWordMouseOver: getCallback("onWordMouseOver"),
  };

  return (
    <div style={{ width: "100%", height: "200px" }}>
      <ReactWordcloud callbacks={callbacks} words={words} />
    </div>
  );
}
