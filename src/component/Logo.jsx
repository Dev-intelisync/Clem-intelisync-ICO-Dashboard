import { Box, makeStyles } from "@material-ui/core";
import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import SettingsContext from "../context/SettingsContext";
import { UserContext } from "../context/User";

const useStyles = makeStyles((theme) => ({
  imgSection: {
    paddingBottom: "15px",
    "& img": {
      maxWidth: "200px",
      width: "100%",
      innerHeight: "90px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      margin: "0 auto",
    },

    "@media(max-width:991px)": {
      display: "flex",
      justifyContent: "start",
      alignItems: "center",
      // margin: "0 auto",
    },
  },
  celohead: {
    font: "normal 400 17px/30px Inter",
    color: "#fff",
  },
}));
const Logo = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const themeSeeting = useContext(SettingsContext);

  return (
    <Box className={classes.imgSection}>
      {themeSeeting.settings.theme === "DARK" && (
        <>
          <img
            height={100}
            width={250}
            onClick={() => history.push("/")}
            src="/images/celoLogo.svg"
            alt="Logo"
            style={{ cursor: "pointer", width: "500px" }}
            {...props}
          />
        </>
      )}
      {themeSeeting.settings.theme === "LIGHT" && (
        <>
          <img
            height={100}
            width={150}
            onClick={() => history.push("/")}
            src="/images/CLEMENTINESITEBARLOGO.svg"
            alt="Logo"
            style={{ cursor: "pointer", paddingTop: "60px" }}
            {...props}
          />
        </>
      )}
    </Box>
  );
};

export default Logo;
