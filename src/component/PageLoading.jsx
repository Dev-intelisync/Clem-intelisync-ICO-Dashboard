import React from "react";
import { makeStyles, Box, LinearProgress } from "@material-ui/core";
import SettingsContext from "../context/SettingsContext";

const useStyles = makeStyles((theme) => ({
  root: {
    alignItems: "center",
    backgroundColor: theme.palette.background.dark,
    display: "flex",
    flexDirection: "column",
    height: "100%",
    justifyContent: "center",
    left: 0,
    // padding: theme.spacing(3),
    position: "fixed",
    top: 0,
    width: "100%",
    zIndex: 2000,
    // backgroundColor: "#fff",
  },
  loader1: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  loader: {
    maxWidth: "500px",
    padding: "0px 30px",
  },
}));

export default function PageLoading() {
  const classes = useStyles();
  const themeSeeting = React.useContext(SettingsContext);

  return (
    <div className={classes.root}>
      <Box className={classes.loader1}>
        <Box className={classes.loader}>
          {/* <LinearProgress /> */}
          {themeSeeting.settings.theme === "DARK" ? (
            <>
              <img
                src="images/VD1.png"
                alt="loader"
                style={{ width: "100%" }}
              />
            </>
          ) : (
            <>
              <img
                src="/images/CLEMENTINESITEBARLOGO.svg"
                alt="loader"
                style={{ width: "100%" }}
              />
            </>
          )}
        </Box>
      </Box>
    </div>
  );
}
