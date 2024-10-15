import { Box, Typography, makeStyles } from "@material-ui/core";
import { mergeClasses } from "@material-ui/styles";
import React from "react";
import Page from "@component/Page";
const useStyles = makeStyles((theme) => ({
  mainBox: {
    background: theme.palette.background.dark,
    color: theme.palette.text.primary,
    height: "100vh",
  },
}));
export default function NotFound(props) {
  const classes = useStyles();
  return (
    <Page title="page not found!">
      <Box pt={20} className={classes.mainBox}>
        <Typography variant="h1" align="center">
          Oops!
        </Typography>
        <Typography variant="h1" align="center" paragraph>
          404 Not Found
        </Typography>
        <Typography variant="h4" align="center">
          Sorry, an error has occured, Requested page not found!
        </Typography>
      </Box>
    </Page>
  );
}
