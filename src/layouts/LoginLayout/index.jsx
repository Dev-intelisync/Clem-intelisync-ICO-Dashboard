import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  makeStyles,
  Grid,
  Box,
  Typography,
  Container,
  IconButton,
  Hidden,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { FiSun } from "react-icons/fi";
import SettingsContext from "../../context/SettingsContext";
import { FaRegMoon } from "react-icons/fa";
const useStyles = makeStyles((theme) => ({
  content: {
    height: "649px",
    width: "100%",
    maxWidth: "654px",
    overflowY: "auto",
    background: "rgba(255, 255, 255, 0.5)",
    borderRadius: "33px",
    paddingTop: "17px",
    paddingBottom: "27px",
    color: theme.palette.text.primary,
    "&::-webkit-scrollbar": {
      width: "0.4em",
    },
    "&::-webkit-scrollbar-track": {
      margin: "40px 0 40px 0",
    },
    "&::-webkit-scrollbar-thumb": {
      background: "linear-gradient(135deg, #050A30, #56CA00, #fff);",
    },
  },
  left: {
    height: "100%",
    "@media(max-width:959px)": {
      display: "none",
    },
  },

  mainbox: {
    height: "100%",
    padding: "0rem",
    paddingBottom: "0px",
    marginTop: "25px",
  },
  logoImage: {
    position: "absolute",
    zIndex: "1",
    top: "20px",
    maxWidth: "225px",
    cursor: "pointer",
    "@media(max-width:1279px)": {
      display: "none",
    },
  },
  mainScreen: {
    maxWidth: "100%",
    /* background-repeat: no-repeat; */
    minHeight: "100vh",
    background:
      "linear-gradient(135deg, #050A30 20%, #56CA00 85%, #fff 1%);",
    padding: "90px",
    "@media (max-width: 916px)": {
      padding: "16px",
    },
  },
}));

const LoginLayout = ({ children }) => {
  const classes = useStyles();
  const history = useHistory();
  const themeSeeting = React.useContext(SettingsContext);

  const changeTheme = (type) => {
    themeSeeting.saveSettings({
      theme: type,
    });
  };
  const [themeChange, seThemeChange] = useState("");
  useEffect(() => {
    const activeTheme = themeSeeting?.themekey?.theme;
    seThemeChange(activeTheme);
  }, []);
  return (
    <Box>
      <Grid container className={classes.mainScreen}>
        <Grid item xs={12} md={6}>
          <Box className={classes.content}>{children}</Box>
        </Grid>
        <Grid item xs={12} md={6} className={classes.left}>
          <Box className={classes.mainbox}>
            <Box align="center">
              {window.location?.pathname === "/signup" ? (
                <img
                  style={{ marginTop: "30px" }}
                  src="images/register.svg"
                  alt=""
                  // className="Unoique"
                  // onClick={() => history.push("/")}
                />
              ) : window.location?.pathname === "/verify-otp" ||
                window.location?.pathname === "/reset-password" ||
                window.location?.pathname === "/verify-email-otp" ||
                window.location?.pathname === "/forget-password" ? (
                <img
                  src="images/reset.svg"
                  alt=""
                  // className="Unoique"
                  // onClick={() => history.push("/")}
                />
              ) : window.location?.pathname === "/login" ? (
                <img
                  src="images/login.svg"
                  alt=""
                  // className="Unoique"
                  // onClick={() => history.push("/")}
                />
              ) : (
                ""
              )}
            </Box>
          </Box>
        </Grid>
      </Grid>
      {/* <Box className="themeButton">
        <IconButton
          variant="contained"
          color="primary"
          style={
            themeChange === "LIGHT"
              ? { backgroundColor: "#3da0e43b" }
              : { backgroundColor: "transparent" }
          }
          onClick={() => {
            changeThemeMaiya Mainu Lyrics Translation — Jersey | Sachet Tandon("LIGHT");
            seThemeChange("LIGHT");
            history.push({
              // search: "Light",
            });
          }}
        >
          <FiSun />
        </IconButton>
        <IconButton
          variant="contained"
          color="primary"
          style={
            themeChange === "DARK"
              ? { backgroundColor: "#3da0e43b" }
              : { backgroundColor: "transparent" }
          }
          onClick={() => {
            changeTheme("DARK");
            seThemeChange("DARK");
            history.push({
              // search: "Dark",
            });
          }}
        >
          <FaRegMoon />
        </IconButton>
      </Box> */}
    </Box>
  );
};

LoginLayout.propTypes = {
  children: PropTypes.node,
};

export default LoginLayout;
