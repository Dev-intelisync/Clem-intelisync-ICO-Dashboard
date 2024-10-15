import {
  Container,
  Box,
  Typography,
  makeStyles,
  Button,
  Grid,
  Hidden,
} from "@material-ui/core";
import CookieConsent from "react-cookie-consent";

import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { GrCircleInformation } from "react-icons/gr";
import InfoIcon from "@material-ui/icons/Info";

const useStyles = makeStyles((theme) => ({
  mainbox: {
    padding: "150px 0px 90px",
    background: "#234231",
    backgroundRepeat: "round",

    "@media(max-width:991px)": {
      padding: "100px 0px 0px !important",
    },
    " & span": {
      fontWeight: "600",
    },
    "& .textleft": {
      "& h3": {
        fontFamily: "Inter",
        fontSize: "40.3166px",
        fontWeight: "400",
        marginBottom: "8px",
        lineHeight: "66px",
        color: "#000000",

        [theme.breakpoints.down("md")]: {
          fontSize: "40px",
          lineHeight: "60px",
        },
        [theme.breakpoints.down("sm")]: {
          fontSize: "35px",
          lineHeight: "45px",
        },
        [theme.breakpoints.down("xs")]: {
          fontSize: "30px",
          lineHeight: "37px",
        },
      },
      "& h4": {
        fontFamily: "Inter",
        fontSize: "18px",
        fontWeight: "300",
        marginBottom: "35px",
        width: "100%",
        textAlign: "justify",
        maxWidth: "648px",
        color: theme.palette.text.BannerText,
        // maxWidth: "500px",
        lineHeight: "27px",
        [theme.breakpoints.down("sm")]: {
          fontSize: "16px",
        },
      },
      "& h6": {
        fontFamily: "Inter",
        fontSize: "18px",
        fontWeight: "600",
        lineHeight: "40px",
        color: theme.palette.text.BannerText,
      },
      "& h2": {
        fontFamily: "Inter",
        fontSize: "20px",
        // background:"linear-gradient(180deg, #00ACEB 0%, #00B0ED 10.18%, #1069C2 70.35%, #1069C2 100%)",
        background: "#0047AB",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        textFillColor: "transparent",
      },
    },

    [theme.breakpoints.down("sm")]: {
      padding: "65px 0px 50px",
    },
    [theme.breakpoints.down("xs")]: {
      padding: "33px 0px 30px",
    },
  },

  bannerImage: {
    display: "flex",
    alignItems: "center",
  },
  flexbox: {
    position: "relative",
    display: "flex",
    justifyContent: "flex-end",
    "@media(max-width:959px)": {
      justifyContent: "left",
      display: "block",
    },
  },
  bannerSpan: {
    fontFamily: "Inter",
    color: "#FBCC5C",
  },

  iconBox: {
    position: "fixed",
    bottom: "66px",
    right: "3px",
    zIndex: "11111",
  },
  subtile: {
    alignItems: "center",
    color: "#060606",

    "& h5": {
      fontFamily: "Inter",
      fontStyle: "normal",
      fontWeight: "400",
      fontSize: "17.0486px",
      lineHeight: "31px",
      letterSpacing: "0.180486px",
      color: "#060606",
    },

    " & .subtile1": {
      paddingLeft: "40px",
      "@media(max-width:512px)": {
        paddingLeft: "0px",
      },
    },
  },
  inputEmail: {
    fontFamily: "Inter",
    background: "#FFFFFF",
    borderRadius: "13.5364px",
    width: "100%",
    maxWidth: "358.26px",
    height: "41.93px",
    border: "1px solid #6A36FF !important",
    paddingLeft: "10px",
  },
  joinButton: {
    fontFamily: "Inter",
    width: "100%",
    maxWidth: "121px",
    height: "47px",
    border: "none",
    background: "#56CA00",
    borderRadius: "10px",
    color: "white !important",
  },
}));

function Banner() {
  const classes = useStyles();
  const history = useHistory();
  const [ShowTopBtn, setShowTopBtn] = useState();
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 400) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    });
  }, []);
  const handleclick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <Box className={classes.mainbox}>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={6} lg={7}>
            <Box className="textleft" style={{ marginTop: "-37px" }}>
              <Box>
                <Typography variant="h3">
                  The First{" "}
                  <span className={classes.bannerSpan}>Blockchain</span>
                  <br /> <span className={classes.bannerSpan}>
                    Technology
                  </span>{" "}
                  based <br />
                  <span className={classes.bannerSpan}>
                    {" "}
                    Health & Charity
                  </span>{" "}
                  Token
                </Typography>
              </Box>
              <Box className={classes.subtile}>
                <Typography variant="h5">
                  A Token to create a user-focused electronic health <br />{" "}
                  record whilst maintaining a single true version of <br /> the
                  user’s data.
                </Typography>

                <Box className={classes.subtile} style={{ marginTop: "10px" }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={7}>
                      <input
                        id="borderColor"
                        placeholder="Your email address.."
                        maxLength={256}
                        className={classes.inputEmail}
                      />{" "}
                    </Grid>
                    <Grid item xs={12} md={4} className={classes.buttonDiv}>
                      <button className={classes.joinButton}>Join Us</button>
                    </Grid>
                  </Grid>
                </Box>
              </Box>

              <Box mt={2} mb={1}></Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={5} className={classes.flexbox}>
            <Box className={classes.bannerImage}>
              <img
                src="./images/banner2.png"
                alt="Token Banner Image"
                className="moveTop"
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
      <Box display="flex" justifyContent="flex-end">
        {ShowTopBtn && (
          <Box
            className={classes.iconBox}
            style={{
              width: "100%",
              maxWidth: "60px",
              borderRadius: "4px",
            }}
          >
            <Button onClick={handleclick}>
              <ExitToAppIcon
                style={{
                  color: "rgb(16, 105, 194)",
                  transform: "rotate(-90deg)",
                  fontSize: "50px",
                }}
              />
            </Button>
          </Box>
        )}
      </Box>
      <CookieConsent
        location="bottom"
        buttonText="Ok"
        buttonClasses="red"
        cookieName="myAwesomeCookieName2"
        style={{ background: "#2B373B" }}
        buttonStyle={{ color: "#4e503b", fontSize: "16px" }}
        expires={150}
      >
        This website uses cookies to enhance the user experience.{" "}
      </CookieConsent>
    </Box>
  );
}

export default Banner;
