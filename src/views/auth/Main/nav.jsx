import {
  AppBar,
  Toolbar,
  makeStyles,
  Button,
  IconButton,
  Drawer,
  Grid,
  Box,
  Container,
  Typography,
} from "@material-ui/core";
import { FiSun } from "react-icons/fi";
import SettingsContext from "@context/SettingsContext";
import { FaRegMoon } from "react-icons/fa";
import MenuIcon from "@material-ui/icons/Menu";
import React, { useState, useEffect, useRef, useContext } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import Logo from "../../../component/Logo";
import Scroll from "react-scroll";
import { RiMenu5Fill } from "react-icons/ri";
import Axios from "axios";
import ApiConfig from "../../../config/APIConfig";
import { saveAs } from "file-saver";

const ScrollLink = Scroll.Link;
const useStyles = makeStyles((theme) => ({
  appBar: {
    color: "rgba(255,255,255,1)",
    // position: "fixed",
    // background: "#000",
    top: "0px",
    border: "none",
    left: "0",
  },
  menuButton2: {
    // background: "#EE1D23",

    fontSize: "15px",
    lineHeight: "15px",
    fontWeight: "500",
    alignItems: "center",
    backgroundColor: "transparent",
    borderColor: "rgba(255,255,255,1)",
    borderRadius: "9999px",
    borderWidth: "2px",
    color: "rgba(255,255,255,1)",

    justifyContent: "center",
    textAlign: "center",
    padding: "0px 7px",
    letterSpacing: "1px",
    marginLeft: "15px",
    width: "170px",
    height: "45px",
  },
  menuButton: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "15px",
    lineHeight: "19px",
    color: "#fff",

    "@media (max-width: 900px)": {
      fontStyle: "normal",
      letterSpacing: "-0.6px",
      lineHeight: "24px",
      color: "#FFF",
      padding: "15px !important",
      height: "51px",
      width: "100%",
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "flex-start",
    },
    "&:active": {
      color: "#1ed760",
    },
    "&:hover": {
      color: "#d00167",
    },
  },
  menuButton1: {
    width: "100%",
  },
  toolbar: {
    display: "flex",
    padding: "2px 0px 2px 0px",
    justifyContent: "space-between",
    height: "100%",
    "@media (max-width: 900px)": {
      paddingLeft: "75px",
      paddingRight: "20px",
      height: "100%",
    },
  },
  maindrawer: {
    height: "100%",
    background: "#0c0731",
    width: "260px",
  },
  logoDrawer: {
    paddingLeft: "10px",
    width: "140px",
    marginBottom: "30px",
  },
  drawerContainer: {
    padding: "20px 0px ",
    height: "100%",
    // background: "#F2F2F2",
    background: theme.palette.background.taf,
    width: "230px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    "@media(max-width:1219px)": {
      padding: "0px 0px",
    },
  },
  drawericon: {
    color: "#000",
    position: "absolute",
    top: "11px",
    right: "-10px",
    fontSize: "25px",
  },
  logoImg: {
    width: "75px",

    margin: " 14px 15px 11px 0px",
    objectFit: "contain",
    "@media (max-width: 500px)": {
      margin: " 11px 1px 3px 0px",
      width: "52px",
    },
  },
  menuMobile: {
    fontSize: "16px",
    fontWeight: "400",
    fontStyle: "normal",
    letterSpacing: "-0.6px",
    lineHeight: "1.75",
    color: "#fff",
    borderBottom: "1px solid #3e3e3e",
    padding: "16px",

    "@media (max-width: 500px)": {
      padding: "7px 0",
      width: "100%",
    },
  },
  paper1: {
    background: "black",
    color: "white",
  },
  containerHeight: {
    height: "100%",
    padding: "0px 8px !important",
  },
  mainHeader: {
    justifyContent: "space-between",
    padding: "10px 0px",
  },
  search: {
    height: "31px",
    position: "relative",
    color: "#ABABAB",
    borderRadius: "100px",
    backgroundColor: "#E6E6E6",
    border: "1px solid #fff",
    "&:hover": {
      backgroundColor: "#ececec",
      border: "1px solid #300760",
    },
    marginLeft: 20,
    width: "140px",
    maxWidth: "257px",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "180px",
    },
  },
  searchIcon: {
    fontSize: "16px",
    padding: theme.spacing(0, 2),
    color: "#000000",
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
    fontSize: "16px",
  },
  wallet: {
    fontSize: "14px",
    fontWeight: "400",
    fontStyle: "normal",
    lineHeight: "21px",
    color: "#fff",
    border: "1px solid #ec0066",
    padding: "0 15px",
    background: "#ec0066",
    borderRadius: "50px",
    height: "31px",
    "&:hover": {
      background: "#fff",
      color: "#ec0066",
    },
    "@media (max-width: 900px)": {
      marginLeft: "12px",
      marginTop: "12px",
    },
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    fontSize: "13px",
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100px",
    [theme.breakpoints.up("sm")]: {
      width: "100%",
      "&:focus": {
        width: "100%",
      },
    },
  },
  submenu: {
    borderTop: "3px solid #300760",
    top: "25px !important",
  },

  typosec: {
    fontFamily: "Inter",
    fontStyle: "normal",
    fontWeight: "500 !important",
    fontSize: "16px !important",
    lineHeight: "100%",
    color: "#1E1E1E",
    "&[tabIndex]:focus": {
      color: "#0fb2ee !important",
      borderBottom: "1px solid #0fb2ee !important",
    },
  },
  containerbox: {
    position: "fixed",
    top: "0",
    zIndex: "999",
    background: "#ffffff",

    width: "100%",
  },
  navContainer: {
    "@media (min-width: 1280px)": {
      maxWidth: "1356px !important",
    },
  },
}));

export default function Header({ buttonClick }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClose1 = () => {
    setAnchorEl(null);
  };
  const {
    menuButton2,
    appBar,
    menuMobile,
    menuButton,
    menuButton1,
    toolbar,
    drawerContainer,
    drawericon,
    logoDrawer,
    containerHeight,
    mainHeader,
    wallet,
    submenu,
  } = useStyles();
  const history = useHistory();
  const location = useLocation();

  const [state, setState] = useState({
    mobileView: false,
    drawerOpen: false,
  });

  const { mobileView, drawerOpen } = state;

  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 1220
        ? setState((prevState) => ({ ...prevState, mobileView: true }))
        : setState((prevState) => ({ ...prevState, mobileView: false }));
    };

    setResponsiveness();

    window.addEventListener("resize", () => setResponsiveness());
  }, []);

  const [open1, setOpen1] = useState({ community: false, user: false });
  const [open, setOpen] = useState(false);
  const anchorRef = { community: useRef(null), user: useRef(null) };

  const handleClose2 = (event, name) => {
    if (
      anchorRef[name].current &&
      anchorRef[name].current.contains(event.target)
    ) {
      return;
    }

    setOpen1({ ...open1, [name]: false });
  };

  function handleListKeyDown(event, name) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen1({ ...open1, [name]: false });
    }
  }
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location?.pathname]);

  const handlePopoverOpen = (event) => {
    // setAnchorEl(event.currentTarget);
    // setOpen(true);
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (event) => {
    setAnchorEl(null);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const [whitePaper, setWhitePaper] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  const listWhitePaperHandler = async () => {
    setisLoading(true);
    try {
      const res = await Axios({
        method: "GET",
        url: ApiConfig.whitePaperList,
      });
      if (res.data.status === 200) {
        setWhitePaper(res?.data?.data);
        setisLoading(false);
      } else {
        setisLoading(false);
      }
    } catch (error) {
      setisLoading(false);
    }
  };
  useEffect(() => {
    listWhitePaperHandler();
  }, []);

  const saveFile = (file) => {
    saveAs(file?.file, `${file?.language}_whitePaper.pdf`);
  };

  const themeSeeting = useContext(SettingsContext);
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

  const displayDesktop = () => {
    return (
      <Container
        className={`${classes.navContainer} p-0`}
        style={{ padding: "0px" }}
      >
        <Toolbar className={toolbar}>
          {femmecubatorLogo}
          <Grid
            container
            item
            direction="row"
            justify="flex-end"
            alignItems="center"
            style={{ paddingLeft: "0px" }}
            className="activeClass"
          >
            <nav>
              <input type="checkbox" id="check" />

              <ul className="navigation">
                <ScrollLink
                  onClick={() => history.push("/")}
                  className="hovertext"
                  smooth={true}
                  duration={500}
                  to="home"
                  style={{ cursor: "pointer", textDecoration: "none" }}
                >
                  <Typography
                    variant="h6"
                    paragraph
                    className={`${classes.typosec} hovertext`}
                    tabIndex="5"
                  >
                    HOME
                  </Typography>
                </ScrollLink>
                <ScrollLink
                  onClick={() => history.push("/")}
                  className="hovertext"
                  smooth={true}
                  duration={500}
                  to="about"
                  style={{ cursor: "pointer", textDecoration: "none" }}
                >
                  <Typography
                    variant="h6"
                    paragraph
                    className={`${classes.typosec} hovertext`}
                    tabIndex="5"
                  >
                    ABOUT US
                  </Typography>
                </ScrollLink>
                <ScrollLink
                  onClick={() => history.push("/")}
                  className="hovertext"
                  smooth={true}
                  duration={500}
                  to="features"
                  style={{ cursor: "pointer", textDecoration: "none" }}
                >
                  <Typography
                    variant="h6"
                    paragraph
                    className={`${classes.typosec} hovertext`}
                    tabIndex="5"
                  >
                    FEATURES
                  </Typography>
                </ScrollLink>
                <ScrollLink
                  onClick={() => history.push("/")}
                  className="hovertext"
                  smooth={true}
                  duration={500}
                  to="faq"
                  style={{ cursor: "pointer", textDecoration: "none" }}
                >
                  <Typography
                    variant="h6"
                    paragraph
                    className={`${classes.typosec} hovertext`}
                    tabIndex="5"
                  >
                    FAQ’s
                  </Typography>
                </ScrollLink>
                <ScrollLink
                  onClick={() => history.push("/")}
                  className="hovertext"
                  smooth={true}
                  duration={500}
                  to="roadmap"
                  style={{ cursor: "pointer", textDecoration: "none" }}
                >
                  <Typography
                    variant="h6"
                    paragraph
                    className={`${classes.typosec} hovertext`}
                    tabIndex="5"
                  >
                    ROADMAP
                  </Typography>
                </ScrollLink>
                <a
                  className={classes.listName}
                  href="images/Rehnance Whitepaper-Cecelia V1.1.docx"
                  download="Rehnance Whitepaper-Cecelia V1.1.docx"
                  target="_blank"
                  style={{
                    cursor: "pointer",
                  }}
                >
                  <Typography
                    variant="h6"
                    paragraph
                    className={`${classes.typosec} hovertext`}
                    tabIndex="5"
                  >
                    WHITEPAPER
                  </Typography>
                </a>
                {/* <a
                  href="images/Virtual_Dinero_WhitePaper_N22.pdf"
                  download="Virtual_Dinero_WhitePaper_N22.pdf"
                  target="_blank"
                  className="hovertext"
                  style={{ cursor: "pointer" }}
                >
                  <Typography
                    variant="h6"
                    paragraph
                    className={`${classes.typosec} hovertext`}
                    aria-owns={open ? "mouse-over-popover" : undefined}
                    aria-haspopup="true"
                    onClick={handlePopoverOpen}
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                    // onClick={handlePopoverOpen}
                    // onMouseLeave={handlePopoverClose}
                    tabIndex="5"
                  >
                    Whitepaper
                  </Typography>
                </a> */}
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <li
                // onClick={() => history.push("/dashboard")}
                >
                  {/* <Button
                    // onClick={() => history.push("/login")}

                    className="loginbutton"
                    style={{
                      height: "40px",
                      margin: "0 10px",

                      borderRadius: "10px",
                      fontWeight: "500",
                      fontSize: "12.6px",
                      fontFamily: "Inter",
                      padding: "5px 24px",
                      color: "#fff",
                      border: "none",
                      background:
                        "#56CA00",
                    }}
                  >
                    Buy REH
                  </Button> */}
                </li>
                {window.localStorage.getItem("token") ? (
                  <li onClick={() => history.push("/dashboard")}>
                    <Button
                      style={{
                        height: "40px",
                        margin: "0 10px",
                        border: "none",
                        borderRadius: "10px",
                        fontWeight: "500",
                        fontSize: "12.6px",
                        fontFamily: "Inter",
                        padding: "5px 24px",
                        color: "#fff",
                        background: "#56CA00",
                      }}
                      className="loginbutton"
                    >
                      Dashboard
                    </Button>
                  </li>
                ) : (
                  <Button
                    onClick={() => history.push("/login")}
                    className="loginbutton"
                    style={{
                      height: "40px",
                      margin: "0 10px",
                      border: "none",
                      borderRadius: "10px",
                      fontWeight: "500",
                      fontSize: "12.6px",
                      fontFamily: "Inter",
                      padding: "5px 24px",
                      color: "#fff",
                      background: "#56CA00",
                    }}
                  >
                    Login
                  </Button>
                )}
              </ul>
            </nav>
          </Grid>
        </Toolbar>
      </Container>
    );
  };

  const displayMobile = () => {
    const handleDrawerOpen = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: true }));
    const handleDrawerClose = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: false }));

    return (
      <Toolbar className={mainHeader}>
        <Drawer
          {...{
            anchor: "right",
            open: drawerOpen,
            onClose: handleDrawerClose,
          }}
        >
          <div className={drawerContainer}>{getDrawerChoices()}</div>
        </Drawer>

        <div>{femmecubatorLogo}</div>
        <Grid container>
          <Grid item xs={10}></Grid>
          <Grid item xs={2}>
            <IconButton
              className={drawericon}
              {...{
                edge: "start",
                color: "inherit",
                "aria-label": "menu",
                "aria-haspopup": "true",
                onClick: handleDrawerOpen,
              }}
            >
              <MenuIcon
                width="60px"
                height="60px"
                style={{ color: "#1069C2", fontSize: "30px" }}
              />
            </IconButton>
          </Grid>
        </Grid>
      </Toolbar>
    );
  };

  const getDrawerChoices = () => {
    return (
      <>
        <nav>
          <input type="checkbox" id="check" />

          <label for="check" className="checkbtn">
            <RiMenu5Fill size={22} color="black" />
          </label>
          <label clasnames="logo">
            {/* <a href="https://vdbcoin.com/" target="_blank"> */}
            <Logo style={{ margin: "10px 0 10px 16px", width: "150px" }} />
            {/* </a> */}
          </label>
          <ul className="navigation">
            {/* <ScrollLink
              onClick={() => history.push("/")}
              className={`${classes.typosec} hovertext`}
              smooth={true}
              duration={500}
              to="reward"
              style={{ cursor: "pointer" }}
            >
              <Typography variant="h6" paragraph className="hovertext">
                Rewards
              </Typography>
            </ScrollLink>

            <ScrollLink
              onClick={() => history.push("/")}
              className={`${classes.typosec} hovertext`}
              smooth={true}
              duration={500}
              to="tokenomic"
              style={{ cursor: "pointer" }}
            >
              <Typography variant="h6" paragraph className="hovertext">
                Tokenomics
              </Typography>
            </ScrollLink> */}
            <ScrollLink
              onClick={() => history.push("/")}
              className="hovertext"
              smooth={true}
              duration={500}
              to="tokenomic"
              style={{ cursor: "pointer" }}
            >
              <Typography
                variant="h6"
                paragraph
                className={`${classes.typosec} hovertext`}
                tabIndex="5"
              >
                HOME
              </Typography>
            </ScrollLink>
            <ScrollLink
              onClick={() => history.push("/")}
              className="hovertext"
              smooth={true}
              duration={500}
              to="tokenomic"
              style={{ cursor: "pointer" }}
            >
              <Typography
                variant="h6"
                paragraph
                className={`${classes.typosec} hovertext`}
                tabIndex="5"
              >
                ABOUT US
              </Typography>
            </ScrollLink>
            <ScrollLink
              onClick={() => history.push("/")}
              className="hovertext"
              smooth={true}
              duration={500}
              to="tokenomic"
              style={{ cursor: "pointer" }}
            >
              <Typography
                variant="h6"
                paragraph
                className={`${classes.typosec} hovertext`}
                tabIndex="5"
              >
                FEATURES
              </Typography>
            </ScrollLink>
            <ScrollLink
              onClick={() => history.push("/")}
              className="hovertext"
              smooth={true}
              duration={500}
              to="tokenomic"
              style={{ cursor: "pointer" }}
            >
              <Typography
                variant="h6"
                paragraph
                className={`${classes.typosec} hovertext`}
                tabIndex="5"
              >
                FAQ’s
              </Typography>
            </ScrollLink>
            <ScrollLink
              onClick={() => history.push("/")}
              className="hovertext"
              smooth={true}
              duration={500}
              to="tokenomic"
              style={{ cursor: "pointer" }}
            >
              <Typography
                variant="h6"
                paragraph
                className={`${classes.typosec} hovertext`}
                tabIndex="5"
              >
                ROADMAP
              </Typography>
            </ScrollLink>
            {/* <ScrollLink
              onClick={() => history.push("/")}
              className="hovertext"
              smooth={true}
              duration={500}
              to=""
              style={{ cursor: "pointer" }}
            > */}
            <a
              className={classes.listName}
              href="images/Rehnance Whitepaper-Cecelia V1.1.docx"
              download="Rehnance Whitepaper-Cecelia V1.1.docx"
              target="_blank"
              style={{
                cursor: "pointer",
              }}
            >
              <Typography
                variant="h6"
                paragraph
                className={`${classes.typosec} hovertext`}
                tabIndex="5"
              >
                WHITEPAPER
              </Typography>
            </a>
            {/* </ScrollLink> */}
            {/* <a
              // onClick={() => history.push("/")}
              className={`${classes.typosec} hovertext`}
              href="images/Virtual_Dinero_WhitePaper_N22.pdf"
              download="Virtual_Dinero_WhitePaper_N22.pdf"
              target="_blank"
              // to="roadmap"
              style={{ cursor: "pointer" }}
            >
              <Typography variant="h6" paragraph className="hovertext">
                Whitepaper
              </Typography>
            </a> */}

            {/* <ScrollLink
              onClick={() => history.push("/")}
              className="hovertext"
              smooth={true}
              duration={500}
              to="choose"
              style={{ cursor: "pointer" }}
            >
              <Typography variant="h6" paragraph className="hovertext">
                Contact Us
              </Typography>
            </ScrollLink> */}
            {whitePaper?.length == 0 ? (
              ""
            ) : (
              <>
                <ScrollLink
                  // onClick={() => history.push("/")}
                  className="hovertext"
                  // smooth={true}
                  // duration={500}
                  // to="about"
                  style={{ cursor: "pointer" }}
                >
                  <Typography
                    variant="h6"
                    paragraph
                    className={`${classes.typosec} hovertext`}
                    aria-owns={open ? "mouse-over-popover" : undefined}
                    aria-haspopup="true"
                    onClick={handlePopoverOpen}
                    style={{
                      display: "flex",
                      alignItem: "center",
                    }}
                    // onClick={handlePopoverOpen}
                    // onMouseLeave={handlePopoverClose}
                  >
                    Whitepaper{" "}
                    {/* {anchorEl ? (
                      <ExpandLess className={`${classes.typosec} hovertext`} />
                    ) : (
                      <ExpandMoreIcon
                        className={`${classes.typosec} hovertext`}
                      />
                    )} */}
                  </Typography>

                  {/* <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    // keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    {whitePaper?.map((data, i) => {
                      return (
                        <MenuItem onClick={() => saveFile(data)}>
                          {data?.language}
                        </MenuItem>
                      );
                    })}

                    {whitePaper?.length == 0 && (
                      <Typography
                        variant="h6"
                        style={{
                          textAlign: "left",
                          fontSize: "12px",
                          fontWeight: "100",
                        }}
                      >
                        No Data Found
                      </Typography>
                    )}
                  </Menu> */}
                </ScrollLink>
              </>
            )}

            <li>
              {!window.localStorage.getItem("token") ? (
                <li>
                  <Button
                    variant="contained"
                    color="secondary"
                    className="loginbutton"
                    style={{
                      height: "40px",
                      margin: "0 10px",

                      borderRadius: "10px",
                      fontWeight: "500",
                      fontSize: "18px",
                      border: "1px solid  #407BFF",

                      padding: "5px 24px",
                      color: "#fff",

                      // border: "none",
                      background: "#56CA00",
                    }}
                    onClick={() => history.push("/login")}
                  >
                    Login
                  </Button>
                </li>
              ) : (
                <li>
                  <Button
                    className="loginbutton"
                    style={{
                      height: "40px",
                      margin: "0 5px",
                      border: "none",
                      background: "#56CA00",
                    }}
                    onClick={() => history.push("/dashboard")}
                  >
                    Dashboard
                  </Button>
                </li>
              )}
            </li>
          </ul>
        </nav>
      </>
    );
  };

  const femmecubatorLogo = (
    <Box>
      {/* <a href="https://vdbcoin.com/" target="_blank"> */}
      <Logo className="logoImg" />
      {/* </a> */}
    </Box>
  );

  const getMenuButtons = () => {
    return (
      <>
        <Button
          {...{
            component: Link,
            className: menuButton,
          }}
        ></Button>
      </>
    );
  };

  return (
    <>
      <Box className={classes.containerbox}>
        <Container className={classes.navContainer}>
          <AppBar
            className={appBar}
            position={
              history.location?.pathname !== "/" ? "relative" : "relative"
            }
            elevation={0}
            style={{ background: "none" }}
          >
            {mobileView ? displayMobile() : displayDesktop()}
          </AppBar>
        </Container>
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
              changeTheme("LIGHT");
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
    </>
  );
}
