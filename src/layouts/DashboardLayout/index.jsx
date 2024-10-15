import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core";
import NavBar from "./NavBar";
import TopBar from "./TopBar";
import { useHistory, useLocation } from "react-router-dom";
import SettingsContext from "../../context/SettingsContext";

const useStyles = makeStyles((theme) => ({
  root: {
    background: "#fff",
    display: "flex",
    height: "100%",
    overflow: "hidden",
    width: "100%",
    minHeight: "100vh",
  },
  wrapper: {
    display: "flex",
    flex: "1 1 auto",
    overflow: "hidden",
    // paddingTop: 56,
    [theme.breakpoints.up("lg")]: {
      paddingLeft: 256,
    },
  },
  contentContainer: {
    display: "flex",
    flex: "1 1 auto",
    overflow: "hidden",
    backgroundColor: "transparent",
    // background: "#F8FBFF",
    color: theme.palette.text.primary,
    // color: "#1D2D3F",
  },
  content: {
    paddingTop:"40px",
    flex: "1 1 auto",
    height: "100%",
    overflow: "hidden",
    position: "relative",
    WebkitOverflowScrolling: "touch",
    padding: "60px 30px 10px ",
    // [theme.breakpoints.down("sm")]: {
    //   padding: "10px 20px 1 10px ",
    // },
    [theme.breakpoints.down("xs")]: {
      padding: "50px 16px 10px ",
    },
  },
}));

const DashboardLayout = ({ children }) => {
  const themeSeeting = React.useContext(SettingsContext);

  const changeTheme = (type) => {
    themeSeeting.saveSettings({
      theme: type,
    });
  };
  const history = useHistory();
  const classes = useStyles();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const [isMobileNavOpen, setMobileNavOpen] = useState(false);
  const [themeChange, seThemeChange] = useState("");
  useEffect(() => {
    const activeTheme = themeSeeting?.themekey?.theme;
    seThemeChange(activeTheme);
  }, []);
  return (
    <div className={classes.root}>
      <TopBar onMobileNavOpen={() => setMobileNavOpen(true)} />
      <NavBar
        onMobileClose={() => setMobileNavOpen(false)}
        openMobile={isMobileNavOpen}
      />
      <div className={classes.wrapper}>
        <div className={classes.contentContainer}>
          <div className={classes.content} id="main-scroll">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

DashboardLayout.propTypes = {
  children: PropTypes.node,
};

export default DashboardLayout;
