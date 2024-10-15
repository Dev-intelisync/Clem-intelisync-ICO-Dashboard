import React, { useState, useEffect } from "react";
import {
  Grid,
  Box,
  Container,
  Typography,
  List,
  ListItem,
  makeStyles,
  TextField,
  Button,
  FormHelperText,
  Link,
} from "@material-ui/core";
import { Form, Formik } from "formik";
import * as yep from "yup";
import Scroll from "react-scroll";
import { Link as RouterLink } from "react-router-dom";
import Logo from "../../../component/Logo";
import { AiOutlineMail } from "react-icons/ai";
import { AiFillInstagram } from "react-icons/ai";
import { FiFacebook, FiTwitter } from "react-icons/fi";
import FacebookIcon from "@material-ui/icons/Facebook";
import { FaDiscord, FaFacebookF, FaBitcoin } from "react-icons/fa";
import { AiOutlineGooglePlus } from "react-icons/ai";
import { useHistory } from "react-router-dom";

import Axios from "axios";
import ApiConfig from "../../../config/APIConfig";
import Tooltip from "@material-ui/core/Tooltip";
import { toast } from "react-toastify";
import SettingsContext from "@context/SettingsContext";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import RedditIcon from "@material-ui/icons/Reddit";
import { FiInstagram } from "react-icons/fi";
import { AiOutlineTwitter } from "react-icons/ai";
import { BsMedium } from "react-icons/bs";
import { IoLogoSlack } from "react-icons/io";

const ScrollLink = Scroll.Link;
const useStyles = makeStyles((theme) => ({
  colorFFF: {
    color: "#fff",
  },
  footerSection: {
    borderTop: "1px solid #D8D8D8",
    backgroundColor: "#ffffff",
    // background: "#F3F5F6",
    paddingTop: theme.spacing(4),
    [theme.breakpoints.up("sm")]: {
      paddingTop: theme.spacing(4),
    },
    [theme.breakpoints.up("md")]: {
      paddingTop: theme.spacing(4),
    },
    "& h1": {
      fontFamily: "Inter",
      fontWeight: "600",
      fontSize: "31px",
      [theme.breakpoints.down("md")]: {
        fontSize: "33px",
      },

      [theme.breakpoints.down("sm")]: {
        fontSize: "23px",
      },
    },
    "& h6": {
      fontFamily: "Inter",
      fontWeight: "400",
      fontSize: "14px",

      color: "#B7B7B7",
    },
    "& h3": {
      fontFamily: "Inter",
      fontStyle: "normal",
      fontWeight: "800",
      fontSize: "18px",
      lineHeight: "28px",
      color: "#000000",
      [theme.breakpoints.down("xs")]: {
        fontSize: "17px",
      },
    },
    "& h4": {
      fontFamily: "Inter",
      fontWeight: "600",
      fontSize: "18px",
      color: theme.palette.text.primary,
      // color: "#2C4569",
      marginBottom: "15px",
      [theme.breakpoints.down("xs")]: {
        fontSize: "17px",
      },
    },
    "& .subpart": {
      borderBottom: "",

      padding: "60px 10px 24px 10px",
      "& h6": {
        fontFamily: "Inter",
        fontSize: "13px",
        color: "#848484",
        fontWeight: "400",
        lineHeight: "19px",
        width: "100%",
        maxWidth: "365px",
        "@media(max-width:730px)": {
          fontSize: "13px",
          maxWidth: "264px",
        },
        "@media(max-width:599px)": {
          fontSize: "13px",
          width: "100%",
          maxWidth: "100%",
          marginBottom: "10px",
        },
      },
      "@media(max-width:599px)": {
        padding: "20px 10px 24px 10px",
      },
    },
    "& p": {
      fontSize: "14px",
      fontWeight: "400",
    },
  },
  baseSection: {
    "& p": {
      fontFamily: "Inter",
      color: "#000000",
      fontSize: "12px",
      [theme.breakpoints.down("sm")]: {
        fontSize: "12px",
      },
    },
    "@media(max-width:565px)": {
      display: "flex",
      flexDirection: "column",
    },
  },
  textFeild: {
    fontFamily: "Inter",
    backgroundColor: "#fff",
    boxShadow: "0px 35px 55px -12px rgba(57, 49, 117, 0.1)",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "10px",
    lineHeight: "11px",
    borderRadius: "10px",
    "& input": {
      // color: `${theme.palette.text.primary} !important`,
      color: "#000 !important",
      paddingLeft: "10px",
    },
  },

  icon: {
    cursor: "pointer",
    color: "#fff",
    background: "#fff",
    marginRight: "10px",
    fontSize: "18px",
    padding: "6px",
    borderRadius: "25px",
    "& :hover": {
      color: "#3DA1E5",
    },
  },

  bin: {
    color: theme.palette.text.primary,
  },

  // socialIcons: {
  //   // background: "#3C3C3C",
  //   "& :hover": {
  //     color: "red",
  //   },
  // },
  textBtn: {
    fontFamily: "Inter",
    color: "#fff",
    width: "160px",
    fontSize: "15px",
    padding: "10px 10px !important",
    // background:"linear-gradient(180deg, #00ACEB 0%, #00B0ED 10.18%, #1069C2 70.35%, #1069C2 100%)",
    background: "#0047AB",
    borderRadius: "10px",
    fontWeight: "500",
  },
  listbox: {
    background: "none",
    border: "none",
    margin: "0px",
    "& a": {
      fontFamily: "Inter",
      // color: "#fff",
      display: "block",
      // fontSize: "14px",
      // fontWeight: "400 !important",
      paddingTop: "10px",
    },
  },

  // fixedborder: {
  //   borderRight: "1px solid #E9C856",
  //   [theme.breakpoints.down("sm")]: {
  //     borderRight: "none",
  //   },
  // },
  listName: {
    fontFamily: "Inter",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "12px",
    lineHeight: "17px",
    color: "#000000",
    paddingBottom: "0 !important",
  },
  socialDiv: {
    width: "100%",
    maxWidth: "225px",
    margin: "8px auto",
  },

  socialText: {
    fontFamily: "Inter !important",
    fontStyle: "normal !important",
    fontWeight: "600 !important",
    fontSize: "14px !important",
    lineHeight: "17px !important",
    color: "#000000 !important",
    paddingBottom: "0 !important",
  },
  socialImg: {
    display: "flex",
    justifyContent: "space-between",
  },
}));
const useStylesBootstrap = makeStyles((theme) => ({
  arrow: {
    color: theme.palette.common.white,
    // border: "1px solid ",
  },
  tooltip: {
    textTransform: "capitalize",
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
    // border: "1px solid #ee1d23",
  },
}));

function BootstrapTooltip(props) {
  const classes = useStylesBootstrap();

  return <Tooltip arrow classes={classes} {...props} />;
}
export default function Liquidity() {
  const handleFormSubmit = async (values) => {};
  const classes = useStyles();
  const history = useHistory();
  // const [isLoading, setIsLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const themeSeeting = React.useContext(SettingsContext);

  // GetAllCommunityForWebsite

  const [communityLinks, setcommunityLinks] = useState();
  const [scribe, setScribe] = useState();

  const listcommunityLinksHandler = async () => {
    // setisLoading(true);
    try {
      const res = await Axios({
        method: "GET",
        url: ApiConfig.GetAllCommunityForWebsite,
      });
      if (res.data.status === 200) {
        setcommunityLinks(res?.data?.data);
        // setisLoading(false);
      } else {
        // setisLoading(false);
      }
    } catch (error) {
      // setisLoading(false);
    }
  };
  useEffect(() => {
    listcommunityLinksHandler();
  }, []);

  const ScribeApiHander = async (values) => {
    setIsLoading(true);

    try {
      const res = await Axios({
        method: "POST",
        url: ApiConfig.subscribeToNewsLetter,
        headers: {
          token: window.localStorage.getItem("token"),
        },
        data: {
          email: values.email,
        },
      });
      if (res.data.responseCode === 200) {
        toast.success(res.data.responseMessage);
        setScribe(res.data.data);
        setIsLoading(false);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <>
      <Box className={classes.footerSection}>
        <Box>
          <Box className="subpart">
            <Container>
              <Grid container>
                <Grid item xs={12} md={4} lg={4}>
                  <Grid container>
                    <Grid item xs={12} sm={4} md={4} lg={3}>
                      <Box>
                        {themeSeeting.settings.theme === "DARK" ? (
                          <>
                            <img
                              src=""
                              alt=""
                              width="100%"
                              style={{ width: "90px", margin: "0 auto" }}
                            />
                          </>
                        ) : (
                          <>
                            <img
                              src="/images/CLEMENTINESITEBARLOGO.svg"
                              alt=""
                              width="100%"
                              style={{ width: "90px", margin: "0 auto" }}
                            />
                          </>
                        )}
                      </Box>{" "}
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={4}>
                      <Box className={classes.socialDiv}>
                        <p className={classes.socialText}>
                          Social media links:
                        </p>
                        <div className={classes.socialImg}>
                          <img src="images/facebook.svg" alt="facebook"></img>
                          <img src="images/instagram.svg" alt="instagram"></img>
                          <img src="images/twitter.svg" alt="twitter"></img>
                        </div>
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} md={4} lg={4}>
                  <Grid container spacing={3}>
                    <Grid item xs={6} sm={6} md={5}>
                      <Typography variant="h3">Company</Typography>
                      <List className={classes.listbox}>
                        <RouterLink
                          className="hovertext"
                          to="/terms"
                          style={{ textDecoration: "none", color: "#7B838F" }}
                        >
                          <ListItem className={classes.listName}>
                            Terms and Conditions
                          </ListItem>
                        </RouterLink>
                        <RouterLink
                          className="hovertext"
                          to="/privacy-policy"
                          style={{ textDecoration: "none", color: "#7B838F" }}
                        >
                          <ListItem className={classes.listName}>
                            Privacy Policy
                          </ListItem>
                        </RouterLink>

                        <ListItem className={classes.listName}>
                          <a
                            className={classes.listName}
                            href="images/Rehnance Whitepaper-Cecelia V1.1.docx"
                            download="Rehnance Whitepaper-Cecelia V1.1.docx"
                            target="_blank"
                            style={{
                              cursor: "pointer",
                            }}
                          >
                            Whitepaper
                          </a>
                        </ListItem>
                      </List>{" "}
                    </Grid>
                    <Grid
                      item
                      xs={6}
                      sm={6}
                      md={6}
                      className={classes.fixedborder}
                    >
                      <Typography variant="h3">Menu</Typography>
                      <List className={classes.listbox}>
                        {/* <RouterLink
                          className="hovertext"
                          // to="/faq"
                          style={{ textDecoration: "none", color: "#7B838F" }}
                        >
                          <ListItem>Home</ListItem>
                        </RouterLink> */}
                        {/* <ScrollLink
                          className=""
                          onClick={() => history.push("/")}
                          smooth={true}
                          duration={500}
                          to="home"
                          style={{ cursor: "pointer", color: "#7B838F" }}
                        >
                          <ListItem>Staking</ListItem>
                        </ScrollLink> */}
                        <ScrollLink
                          className="hovertext"
                          smooth={true}
                          duration={500}
                          to="home"
                          style={{
                            textDecoration: "none",
                            cursor: "pointer",
                          }}
                        >
                          <ListItem className={classes.listName}>Home</ListItem>
                        </ScrollLink>

                        {/* <a
                       className={classes.listName}
                          href="images/Virtual_Dinero_WhitePaper_N22.pdf"
                          download="Virtual_Dinero_WhitePaper_N22.pdf"
                          target="_blank"
                          style={{
                            cursor: "pointer",
                           
                          }}
                        >
                          Feature
                        </a> */}
                      </List>{" "}
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={4}>
                  <Grid container>
                    <Grid
                      item
                      xs={6}
                      sm={6}
                      md={6}
                      className={classes.fixedborder}
                    >
                      <Typography variant="h3">Application</Typography>
                      <List className={classes.listbox}>
                        <RouterLink
                          className="hovertext"
                          to="/About-Us"
                          style={{ textDecoration: "none", color: "#7B838F" }}
                        >
                          <ListItem className={classes.listName}>
                            {" "}
                            About Us
                          </ListItem>
                        </RouterLink>
                        <ScrollLink
                          onClick={() => history.push("/")}
                          className="hovertext"
                          smooth={true}
                          duration={500}
                          to="tokenomic"
                          style={{ cursor: "pointer", color: "#7B838F" }}
                        >
                          <ListItem className={classes.listName}>
                            {" "}
                            Roadmap
                          </ListItem>
                        </ScrollLink>
                      </List>{" "}
                    </Grid>
                    <Grid
                      item
                      xs={6}
                      sm={6}
                      md={6}
                      className={classes.fixedborder}
                    >
                      <Typography variant="h3">Customer Support</Typography>
                      <List className={classes.listbox}>
                        <RouterLink
                          className="hovertext"
                          to="/contactUsForm"
                          style={{ textDecoration: "none", color: "#7B838F" }}
                        >
                          <ListItem className={classes.listName}>
                            {" "}
                            Contact Us
                          </ListItem>
                        </RouterLink>
                        <RouterLink
                          // onClick={() => history.push("/")}
                          className="hovertext"
                          // smooth={true}
                          // duration={500}
                          to="/faqs"
                          style={{ cursor: "pointer", color: "#7B838F" }}
                        >
                          <ListItem className={classes.listName}>
                            FAQ's
                          </ListItem>
                        </RouterLink>
                      </List>{" "}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Container>
            <Box style={{ padding: "12px 156px 12px 134px" }}>
              <Box style={{ borderTop: "4px solid #000000" }}></Box>
            </Box>
            <Box className={classes.baseSection} textAlign="center">
              <Typography variant="body1">
                Copyright &copy; 2022-Present Rehnance -All Right Reserved.
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
