/* eslint-disable no-use-before-define */
import React, { useState, useEffect, useContext } from "react";
import { matchPath } from "react-router-dom";
import PerfectScrollbar from "react-perfect-scrollbar";
import PropTypes from "prop-types";
import {
  Box,
  List,
  makeStyles,
  Avatar,
  Typography,
  Button,
  Grid,
} from "@material-ui/core";
import { Dialog } from "@material-ui/core";
import NavItem from "@layouts/DashboardLayout/NavBar/NavItem";
import { useHistory } from "react-router-dom";
import ConfirmationDialog from "../../component/ConfirmationDialog";
import { AuthContext } from "./../../context/Auth";

import {
  FaWallet,
  FaSignOutAlt,
  FaUserEdit,
  FaSignInAlt,
} from "react-icons/fa";

const sections = [
  {
    title: "Edit Profile",
    href: "/edit-profile",
    icon: FaUserEdit,
  },

  {
    title: "Logout",
    href: "/dashboard",
    icon: FaSignOutAlt,
  },
];

function renderNavItems({ items, pathname, depth = 0 }) {
  return (
    <List disablePadding>
      {items.reduce(
        (acc, item) => reduceChildRoutes({ acc, item, pathname, depth }),
        []
      )}
    </List>
  );
}

function reduceChildRoutes({ acc, pathname, item, depth }) {
  const key = item.title + depth;

  if (item.items) {
    const open = matchPath(pathname, {
      path: item.href,
      exact: false,
    });

    acc.push(
      <NavItem
        depth={depth}
        icon={item.icon}
        info={item.info}
        key={key}
        open={Boolean(open)}
        title={item.title}
      >
        {renderNavItems({
          depth: depth + 1,
          pathname,
          items: item.items,
        })}
      </NavItem>
    );
  } else {
    acc.push(
      <NavItem
        depth={depth}
        href={item.href}
        icon={item.icon}
        info={item.info}
        key={key}
        title={item.title}
      />
    );
  }

  return acc;
}

const useStyles = makeStyles((theme) => ({
  mobileDrawer: {
    width: 256,
  },
  desktopDrawer: {
    padding: "14px",
    position: "absolute",
    right: 0,
    top: 30,
    width: 314,
    height: 140,
    overflow: "unset",
    background: "#fff",
    border: "1px solid rgba(0, 0, 0, 0.5)",
    borderRadius: "25px",
  },
  avatar: {
    cursor: "pointer",
    position: "absolute",
    right: "122px",
    zIndex: "1",
    width: 50,
    height: 53,
    // "@media (max-width: 767px)": {
    //   width: "30px",
    //   height: "30px",
    // },
  },
  avatarBig: {
    cursor: "pointer",
    width: 70,
    height: 70,
  },
  socialIcon: {
    cursor: "pointer",
    marginRight: 5,
  },
  name: {
    fontFamily: "Inter",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "16px",
    lineHeight: "24px",
    letterSpacing: "0.02em",
    textAlign: "end",

    color: "#000000",
  },
  email: {
    fontFamily: "Inter",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "12px",
    lineHeight: "18px",
    letterSpacing: "0.02em",
    color: "#000000",
    textAlign: "end",
  },
  editButton: {
    width: "96px",
    height: "29px",
    left: "34px",
    background: "#0EAD",
    borderRadius: "16px",
    fontFamily: "Inter",
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: "12px",
    letterSpacing: "0.02em",
    color: "#FFFFFF",
  },
  userButton: {
    display: "flex",
    justifyContent: "space-around",
  },
}));

const NavBar = () => {
  const auth = useContext(AuthContext);
  const classes = useStyles();
  const [rightBar, setRightBar] = useState(false);
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  useEffect(() => {


    console.log(auth?.userData)
    if (auth?.userData) {
      setData({
        firstName: auth?.userData?.firstName ? auth?.userData?.firstName : "",
        lastName: auth?.userData?.lastName ? auth?.userData?.lastName : "",
        email: auth?.userData?.email ? auth?.userData?.email : "",
      });
    }
  }, [auth?.userData]);
  const [isLoading, setLoader] = useState(false);

  // const logoutHandler = () => {
  //   history.push("/login");
  //   window.localStorage.removeItem("token");
  // };

  const confirmationHandler = () => {
    history.push("/");
    window.localStorage.removeItem("token");
  };

  const content = (
    <Box height="100%" display="flex" flexDirection="column">
      {open && (
        <ConfirmationDialog
          open={open}
          handleClose={() => setOpen(false)}
          title={"Logout"}
          desc={"Do you want to logout ?"}
          confirmationHandler={confirmationHandler}
          style={{ color: "#022E37" }}
        />
      )}

      <Grid container spacing={3}>
        <Grid item xs={3}>
          <Avatar
            src={
              auth?.userData?.profilePic
                ? auth?.userData?.profilePic
                : "/images/dummy.png"
            }
            className={classes.avatarBig}
            onClick={() => {
              setRightBar(!rightBar);
            }}
          />
        </Grid>

        <Grid item xs={9}>
          <Box pr={3} p={2}>
            <Typography className={classes.name}>
              {data?.firstName.length === 10
                ? data?.firstName
                : data?.firstName.substring(0, 15) + "..."}

              {/* {"sachin Beniwal"} */}
            </Typography>
            <Typography className={classes.email}>
              {data?.email.length === 25
                ? data?.email
                : data?.email.substring(0, 25) + "..."}
              {/* {"sachinbeniwal97@gmail.com"} */}
            </Typography>
          </Box>
        </Grid>
        {sections.map((section, i) => {
          const Icon = section.icon;
          return (
            <Grid item xs={6}>
              <Box pt={1}>
                <Button
               
                  className={classes.editButton}
                  fullWidth
                  key={i}
                  onClick={() => {
                    section.title === "Logout"
                      ? setOpen(true)
                      : history.push(section.href);
                  }}
                >
                  {section.title}{" "}
                </Button>
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
  const res = auth?.userData?.firstName
    ? auth?.userData?.firstName.length > 7
      ? auth?.userData?.firstName.substring(0, 7) + "..."
      : auth?.userData?.firstName
    : "User";
  return (
    <>
      {/* <Button
        onClick={() => {
          setRightBar(!rightBar);
        }}
        className={classes.userButton}
      >
        <span>{res}</span>{" "}
        <span className="downArrow">
          <img src="images/downArrow.svg" />
        </span>
      </Button> */}
      <Avatar
        src={
          auth?.userData?.profilePic
            ? auth?.userData?.profilePic
            : "/images/dummy.png"
        }
        className={classes.userButton}
        onClick={() => {
          setRightBar(!rightBar);
        }}
      />
      <Dialog
        classes={{ paper: classes.desktopDrawer }}
        open={rightBar}
        onClose={() => {
          setRightBar(false);
        }}
      >
        {content}
      </Dialog>
    </>
  );
};

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool,
};

export default NavBar;
