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
    padding: "90px 0px 70px",
    backgroundColor: theme.palette.background.dark,
    // backgroundColor: "#fff",
    position: "relative",
    zIndex: "9",
    [theme.breakpoints.down("sm")]: {
      padding: "50px 0px 40px",
    },
    "& h1": {
      fontSize: "50px",
      fontWeight: "700",
      marginBottom: "15px",
      color: theme.palette.text.primary,
      [theme.breakpoints.down("sm")]: {
        fontSize: "40px",
        lineHeight: "48px",
      },
      [theme.breakpoints.down("xs")]: {
        fontSize: "28px",
        lineHeight: "40px",
      },
    },
    "& span": {
      fontWeight: "300",
    },
    "& h4": {
      fontSize: "14px",
      fontWeight: "300",
      margin: "0 auto",
      paddingBottom: "25px",
      width: "100%",
      maxWidth: "1123px",
      color: "#fffff",
      [theme.breakpoints.down("sm")]: {
        fontSize: "13px",
      },
    },
    "& .subbox": {
      marginTop: "40px",
      padding: "20px",
      // background: theme.palette.background.back,
      background: "#0047AB",
      boxShadow: "0px 1px 32px rgba(0, 0, 0, 0.13)",
      borderRadius: "15px",
      "@media(max-width:959px)": {
        marginTop: "20px",
      },
    },
    "& .leftside": {
      backgroundColor: "#E9C856",
      padding: "15px",
      borderRadius: "5px",
      "& figure": {
        "& img": {
          width: "100%",
          maxWidth: "309px",
        },
      },
      "& h3": {
        color: "#000",
        fontSize: "30px",
        fontWeight: "700",
        lineHeight: "42px",
        [theme.breakpoints.down("md")]: {
          fontSize: "23px",
        },
        [theme.breakpoints.down("sm")]: {
          fontSize: "23px",
        },
      },
    },
    "& h2": {
      fontStyle: "normal",
      fontWeight: "700",
      fontSize: "30px",
      lineHeight: "48px",
      color: "#FFFFFF",
      // color: "#1D2D3F",
      [theme.breakpoints.down("sm")]: {
        fontSize: "28px",
      },
    },
  },
  colorbox: {
    width: "25px",
    height: "22px",
    background: "#F95EAE",
  },
  colorbox1: {
    width: "25px",
    height: "22px",
    background: "#581792",
  },
  colorbox2: {
    width: "25px",
    height: "22px",
    background: "#F69133",
  },
  colorbox3: {
    width: "25px",
    height: "22px",
    background: "#1EBCBA",
  },
  colorbox4: {
    width: "25px",
    height: "22px",
    background: "#F69133",
  },
  gridbox: {
    display: "flex",
    justifyContent: "center",
    "@media(max-width:960px)": {
      display: "flex",
      justifyContent: "center",
    },
    "& figure": {
      display: "flex",
      justifyContent: "end ",
      "@media(max-width:960px)": {
        display: "flex",
        justifyContent: "center",
      },
    },
  },
}));

function AboutICO() {
  const classes = useStyles();
  return (
    <Box className={classes.mainbox}>
      <Container maxWidth="lg">
        <Box textAlign="center">
          <Typography variant="h1" className="downBorder">
            Tokenomics
          </Typography>
        </Box>
        <Box className="subbox">
          <Grid container spacing={4} alignItems="center">
            <Grid
              item
              lg={6}
              md={6}
              sm={12}
              xs={12}
              className={classes.gridbox}
            >
              <Box>
                <figure>
                  <img src="images/Tokenomic11.png" alt="" width="87%" />
                </figure>
              </Box>
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <Box>
                <Typography variant="h2">Token Distribution</Typography>
                <br />
                {/* <Typography variant="h4" style={{ color: "#FFFFFF" }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ac
                  cum facilisi cras eget sagittis, auctor nisi. Hac vulputate mi
                  aliquam.
                </Typography> */}
                <Grid container alignItems="center">
                  <Grid item lg={12} md={12} sm={12} xs={12}>
                    <Box display="flex">
                      <Box className={classes.colorbox}></Box>
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      <Typography
                        variant="h4"
                        style={{ paddingBottom: "10px" }}
                      >
                        Promotion & Rewards - 25%
                      </Typography>
                    </Box>
                    <Box display="flex">
                      <Box className={classes.colorbox1}></Box>
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      <Typography
                        variant="h4"
                        style={{ paddingBottom: "10px" }}
                      >
                        R & D – 25%
                      </Typography>
                    </Box>
                    <Box display="flex">
                      <Box className={classes.colorbox2}></Box>
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      <Typography
                        variant="h4"
                        style={{ paddingBottom: "10px" }}
                      >
                        Reserve – 50%
                      </Typography>
                    </Box>{" "}
                    <Box mt={1}>
                      <Typography>
                        Token Name - <span>LAX Token</span>
                      </Typography>
                      <Typography>
                        Token Symbol - <span>VDT </span>
                      </Typography>
                      <Typography>
                        Total tokens - <span>2 Billion</span>
                      </Typography>
                      <Typography>
                        Maximum supply in Circulation - <span>236M</span>
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}

export default AboutICO;
