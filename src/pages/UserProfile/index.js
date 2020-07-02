import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

import PersonIcon from "@material-ui/icons/Person";
import AlternateEmailIcon from "@material-ui/icons/AlternateEmail";
import DeleteIcon from "@material-ui/icons/Delete";

import { selectUserProfile } from "../../store/userProfile/selectors";
import {
  fetchUserProfile,
  updateProfile,
} from "../../store/userProfile/actions";
import { updateFavWord, clearUserHistory } from "../../store/results/actions";
import { selectUser } from "../../store/user/selectors";

const useStyles = makeStyles((theme) => ({
  heroContent: {
    padding: theme.spacing(4, 0, 6),
  },
  cardHeader: {
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[200]
        : theme.palette.grey[700],
  },
}));

export default function UserProfile() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { userId } = useParams();
  const userProfile = useSelector(selectUserProfile);
  const user = useSelector(selectUser);
  const currentUserIsOwner = userProfile.id === user.id;

  const [editMode, setEditMode] = useState(false);
  const [username, setUsername] = useState(userProfile.name);
  const [email, setEmail] = useState(userProfile.email);

  useEffect(() => {
    dispatch(fetchUserProfile(userId));
  }, [dispatch, userId]);

  function submitChanges(event) {
    event.preventDefault();
    dispatch(updateProfile(userId, username, email));
    setEditMode(false);
  }

  if (!userProfile.public && !currentUserIsOwner) {
    return (
      <Container maxWidth="md" component="main" className={classes.heroContent}>
        <Grid container spacing={5} alignItems="flex-start" justify="center">
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardHeader
                title="User information"
                titleTypographyProps={{ align: "center" }}
                subheaderTypographyProps={{ align: "center" }}
                className={classes.cardHeader}
              />
              <CardContent>This profile is set to private.</CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    );
  }

  return (
    <>
      <Container maxWidth="md" component="main" className={classes.heroContent}>
        <Grid container spacing={5} alignItems="flex-start" justify="center">
          <Grid item xs={11} sm={5} md={4}>
            <Card>
              <CardHeader
                title="User information"
                titleTypographyProps={{ align: "center" }}
                subheaderTypographyProps={{ align: "center" }}
                className={classes.cardHeader}
              />
              <CardContent>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <PersonIcon />
                    </ListItemIcon>
                    {!editMode ? (
                      <ListItemText primary={userProfile.name} />
                    ) : (
                      <TextField
                        id="username"
                        variant="outlined"
                        label="username"
                        value={username}
                        defaultValue={userProfile.name}
                        onChange={(event) => setUsername(event.target.value)}
                      />
                    )}
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <AlternateEmailIcon />
                    </ListItemIcon>
                    {!editMode ? (
                      <ListItemText primary={userProfile.email} />
                    ) : (
                      <TextField
                        id="email"
                        variant="outlined"
                        label="user-email"
                        value={email}
                        defaultValue={userProfile.email}
                        onChange={(event) => setEmail(event.target.value)}
                      />
                    )}
                  </ListItem>
                </List>
              </CardContent>
              {currentUserIsOwner ? (
                <CardActions>
                  {!editMode ? (
                    <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      onClick={() => setEditMode(!editMode)}
                    >
                      Edit profile
                    </Button>
                  ) : (
                    <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      onClick={submitChanges}
                    >
                      Save profile
                    </Button>
                  )}
                </CardActions>
              ) : null}
            </Card>
          </Grid>
          <Grid item xs={11} sm={5} md={4}>
            <Card>
              <CardHeader
                title="Favourite words"
                titleTypographyProps={{ align: "center" }}
                subheaderTypographyProps={{ align: "center" }}
                className={classes.cardHeader}
              />
              <CardContent>
                {userProfile.favouriteWords.length ? (
                  <List dense>
                    {userProfile.favouriteWords.map((favouriteWord, index) => {
                      return (
                        <ListItem key={index}>
                          <ListItemText primary={favouriteWord.favouriteWord} />
                          {currentUserIsOwner ? (
                            <ListItemSecondaryAction>
                              <IconButton
                                edge="end"
                                aria-label="delete"
                                fontSize="small"
                                onClick={() =>
                                  dispatch(updateFavWord(favouriteWord, false))
                                }
                              >
                                <DeleteIcon />
                              </IconButton>
                            </ListItemSecondaryAction>
                          ) : null}
                        </ListItem>
                      );
                    })}
                  </List>
                ) : (
                  "No favourite words, yet"
                )}
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={11} sm={5} md={4}>
            <Card>
              <CardHeader
                title="Search history"
                titleTypographyProps={{ align: "center" }}
                subheaderTypographyProps={{ align: "center" }}
                className={classes.cardHeader}
              />
              <CardContent>
                {userProfile.searchHistories.length ? (
                  <TableContainer>
                    <Table size="small" aria-label="a dense table">
                      <TableBody>
                        {userProfile.searchHistories.map(
                          (searchHistory, index) => {
                            return (
                              <TableRow key={index}>
                                <TableCell component="th" scope="row">
                                  {searchHistory.searchWord}
                                </TableCell>
                              </TableRow>
                            );
                          }
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                ) : (
                  "No history, yet"
                )}
              </CardContent>
              {currentUserIsOwner ? (
                <CardActions>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={() => dispatch(clearUserHistory(userId))}
                  >
                    Clear history
                  </Button>
                </CardActions>
              ) : null}
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
