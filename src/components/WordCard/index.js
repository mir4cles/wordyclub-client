import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import List from "@material-ui/core/List";
import IconButton from "@material-ui/core/IconButton";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import FavoriteIcon from "@material-ui/icons/Favorite";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function WordCard(props) {
  const classes = useStyles();
  const [favoriteWord, setFavoriteWord] = useState(true);
  let results = props.results;
  console.log("props.results:", results);

  function toggleFavorite() {
    setFavoriteWord(!favoriteWord);
    console.log("favorite is set to:", favoriteWord);
  }

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5" component="h2">
          {results.keyword}
        </Typography>
        <List dense={false}>
          {results.results.map((result, index) => {
            return (
              <ListItem>
                <ListItemText
                  primary={`${index + 1}. ${result.definition}`}
                  secondary={result.partOfSpeech}
                />
              </ListItem>
            );
          })}
        </List>
      </CardContent>
      <CardActions>
        {props.showLink ? (
          <IconButton aria-label="add to favorites" onClick={toggleFavorite}>
            <FavoriteIcon color={favoriteWord ? "default" : "secondary"} />
          </IconButton>
        ) : null}
      </CardActions>
    </Card>
  );
}
