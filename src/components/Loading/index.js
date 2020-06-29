import React from "react";

import Skeleton from "@material-ui/lab/Skeleton";
import {
  makeStyles,
  Container,
  Grid,
  Card,
  CardHeader,
  CardContent,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  heroContent: {
    padding: theme.spacing(4, 0, 6),
  },
  card: {
    width: 600,
    margin: theme.spacing(2),
  },
  media: {
    height: 190,
  },
}));

export default function Loading() {
  const classes = useStyles();
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
          <Card className={classes.card}>
            <Skeleton
              animation="wave"
              variant="rect"
              className={classes.media}
            />
            <CardHeader
              avatar={
                <Skeleton
                  animation="wave"
                  variant="circle"
                  width={40}
                  height={40}
                />
              }
              title={
                <Skeleton
                  animation="wave"
                  height={10}
                  width="80%"
                  style={{ marginBottom: 6 }}
                />
              }
              subheader={<Skeleton animation="wave" height={10} width="40%" />}
            />

            <CardContent>
              <React.Fragment>
                <Skeleton
                  animation="wave"
                  height={10}
                  style={{ marginBottom: 6 }}
                />
                <Skeleton animation="wave" height={10} width="80%" />
              </React.Fragment>
            </CardContent>
          </Card>
        </Grid>
      </Container>
    </>
  );
}
