import React from "react";
import {
  Box,
  Typography,
  Container,
  makeStyles,
  Grid,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  mainbox: {
    padding: "100px 0px 100px",
    // backgroundColor: "#F8FBFF",
    backgroundColor: theme.palette.background.virtual,
    [theme.breakpoints.down("sm")]: {
      padding: "60px 0px 30px",
    },
    "& h1": {
      color: "#317acc",
      fontSize: "45px",
    },
  },
  gridflex: {
    display: "flex",
    justifyContent: "flex-end",
    position: "relative",
    "@media(max-width:959px)": {
      justifyContent: "left",
      display: "block",
    },
  },

  TypographyBox: {
    position: "relative",

    "& h3": {
      fontFamily: "'Inter'",
      fontStyle: "normal",
      fontWeight: "600",
      fontSize: "30px",
      lineHeight: "36px",
      marginBottom: "20px",
      background:
        "linear-gradient(180deg, #00ACEB 0%, #00B0ED 10.18%, #1069C2 70.35%, #1069C2 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
      textFillColor: "transparent",
      textDecoration: "underline",
      textDecorationColor: "#3483D2",
      textUnderlineOffset: "13px",
      [theme.breakpoints.down("xs")]: {
        fontSize: "26px",
      },
    },

    "& h5": {
      fontFamily: "'Inter'",
      fontStyle: "normal",
      fontWeight: "500",
      fontSize: "40px",
      lineHeight: "60px",
      // color: "#1D2D3F",
      color: theme.palette.text.primary,
      maxWidth: "600px",
      [theme.breakpoints.down("md")]: {
        fontSize: "25px",
        lineHeight: "42px",
      },
      [theme.breakpoints.down("sm")]: {
        fontSize: "29px",
        lineHeight: "42px",
      },
      [theme.breakpoints.down("xs")]: {
        fontSize: "22px",
        lineHeight: "36px",
      },
    },
    "& h4": {
      fontFamily: "'Inter'",
      fontStyle: "normal",
      fontWeight: "400",
      fontSize: "16px",
      lineHeight: "26px",
      color: "#848484",
      marginBottom: "10px",
    },
  },
  Earn: {
    "& h5": {
      fontSize: "32px",
      [theme.breakpoints.down("xs")]: {
        fontSize: "25px",
      },
    },
    "& h6": {
      fontSize: "20px",
      fontWeight: "400",
      fontFamily: "Inter",
      // color: "#000",
      color: theme.palette.text.secondary,
      lineHeight: "26px",
    },
    "& span ": {
      fontSize: "32px",
      lineHeight: "50px",
      fontFamily: "Inter",
      color: theme.palette.text.secondary,
      // color: "#1D2D3F",
      fontWeight: "700",
      [theme.breakpoints.down("xs")]: {
        fontSize: "25px",
      },
    },
  },
  circle1: {
    position: "absolute",
    top: "0px",
    left: "300px",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
    "@media(max-width:1250px)": {
      top: "0px",
      left: "400px",
    },
    "@media(max-width:978px)": {
      top: "0px",
      left: "276px",
    },
  },

  circle2: {
    position: "absolute",
    width: "50px",
    right: "0px",

    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
}));

function CryptoBank() {
  const classes = useStyles();
  return (
    <Box className={classes.mainbox}>
      <Container>
        <Grid container spacing={5}>
          <Grid item lg={7} md={6} sm={12} xs={12}>
            <Box mt={4} align="left">
              <Grid container>
                <Grid item xs={12}>
                  <Box className={classes.TypographyBox}>
                    <Box>
                      <Typography variant="h3">LAX</Typography>
                      <Typography variant="h5">Crypto Bank</Typography>
                    </Box>

                    <Box mt={1} style={{ maxWidth: "600px" }}>
                      {" "}
                      <Typography variant="h4">
                        Coin rewards for a fixed term - Staking is available via
                        LAX.The point of using Lorem Ipsum is that it
                        has a more-or-less normal distribution of letters, as
                        opposed to using 'Content here, content here', making it
                        look like readable English. There are many variations of
                        passages of Lorem Ipsum available, but the majority have
                        suffered alteration in some form. The reward is paid at
                        the end of the staking term with the benefit as under:
                      </Typography>
                    </Box>
                    <Box className={`${classes.circle2} starTwinkle `}>
                      <img src="images/star.png" alt="" width="70%" />
                    </Box>
                  </Box>

                  <Box mt={3}>
                    <Typography variant="h1">COMING SOON</Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item lg={5} md={6} sm={12} xs={12} className={classes.gridflex}>
            <Box className="imagebox">
              <img
                src="images/cryptobank.png"
                alt=""
                width="100%"
                className="moveTop"
              />
            </Box>
            <Box className={`${classes.circle1} starTwinkle`}>
              <img src="images/star.png" alt="" width="70%" />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default CryptoBank;
