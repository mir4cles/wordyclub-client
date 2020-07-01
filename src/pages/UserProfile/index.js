import React, { useEffect } from "react";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
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
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { makeStyles } from "@material-ui/core/styles";

import PersonIcon from "@material-ui/icons/Person";
import AlternateEmailIcon from "@material-ui/icons/AlternateEmail";

import { selectUserProfile } from "../../store/userProfile/selectors";
import { fetchUserProfile } from "../../store/userProfile/actions";

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
  const { userId } = useParams();
  const userProfile = useSelector(selectUserProfile);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserProfile(userId));
  }, [dispatch, userId]);

  if (!userProfile.public) {
    return (
      <Container maxWidth="sm" component="main" className={classes.heroContent}>
        <Typography
          variant="h5"
          align="center"
          color="textSecondary"
          component="p"
        >
          {userProfile.name}'s profile is set to private.
        </Typography>
      </Container>
    );
  }

  return (
    <>
      <Container maxWidth="sm" component="main" className={classes.heroContent}>
        <Typography
          variant="h5"
          align="center"
          color="textSecondary"
          component="p"
        >
          {userProfile.name}'s profile page
        </Typography>
      </Container>

      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardHeader
                title="User information"
                subheader="this should be private"
                titleTypographyProps={{ align: "center" }}
                subheaderTypographyProps={{ align: "center" }}
                className={classes.cardHeader}
              />
              <CardContent>
                <List dense>
                  <ListItem>
                    <ListItemIcon>
                      <PersonIcon />
                    </ListItemIcon>
                    <ListItemText primary={userProfile.name} />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <AlternateEmailIcon />
                    </ListItemIcon>
                    <ListItemText primary={userProfile.email} />
                  </ListItem>
                </List>
              </CardContent>
              <CardActions>
                <Button fullWidth variant="contained" color="primary">
                  Edit profile
                </Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
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
                      <TableHead>
                        <TableRow>
                          <TableCell>Keyword</TableCell>
                        </TableRow>
                      </TableHead>
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
                ) : null}
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardHeader
                title="Favorite words"
                titleTypographyProps={{ align: "center" }}
                subheaderTypographyProps={{ align: "center" }}
                className={classes.cardHeader}
              />
              <CardContent>
                {userProfile.favouriteWords.length ? (
                  <TableContainer>
                    <Table size="small" aria-label="a dense table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Keyword</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {userProfile.favouriteWords.map(
                          (favouriteWord, index) => {
                            return (
                              <TableRow key={index}>
                                <TableCell component="th" scope="row">
                                  {favouriteWord.favouriteWord}
                                </TableCell>
                              </TableRow>
                            );
                          }
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                ) : null}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
