import React from "react";
import {
  Box,
  Typography,
  Container,
  makeStyles,
  Grid,
  Hidden,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  mainbox: {
    padding: "80px 0px 80px",
    background: theme.palette.background.dark,

    [theme.breakpoints.down("sm")]: {
      padding: "60px 0px 30px",
    },
    "& h1": {
      fontSize: "50px",
      fontWeight: "700",
      marginBottom: "20px",
      // color: "#1D2D3F",
      color: theme.palette.text.primary,
      lineHeight: "52px",

      [theme.breakpoints.down("sm")]: {
        fontSize: "30px",
        marginBottom: "10px",
        lineHeight: "50px",
      },
      [theme.breakpoints.down("xs")]: {
        fontSize: "18px",
        lineHeight: "40px",
      },
    },
    "& h2": {
      fontSize: "30px",
      fontWeight: "600",
      background:
        "linear-gradient(180deg, #00ACEB 0%, #00B0ED 10.18%, #1069C2 70.35%, #1069C2 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
      textDecoration: "underline",
      textDecorationColor: "#3483D2",
      marginBottom: "20px",
      textUnderlineOffset: "10px",
      textFillColor: "transparent",
      lineHeight: "40px !important",

      [theme.breakpoints.down("xs")]: {
        fontSize: "25px",
        lineHeight: "30px",
      },
    },
    "& h3": {
      fontSize: "22px",
      fontWeight: "700",
      marginBottom: "8px",
      color: theme.palette.text.secondary,
      [theme.breakpoints.down("sm")]: {
        fontSize: "18px",
      },
    },
    "& h4": {
      fontSize: "14px",
      fontWeight: "300",
      lineHeight: "24px",
      color: "#848484",
      paddingLeft: "15px",
    },
    "& figure": {
      "& img": {
        width: "100%",
        maxWidth: "25px",
      },
    },
    "& .imagebox": {
      width: "200px",
      "& img": {
        width: "100%",

        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        "@media(max-width:959px)": {
          //   width: "100%",
          //   maxWidth: "70%",
          //   margin: "0 auto",
          //   display: "flex",
          //   justifyContent: "center",
          //   alignItems: "center",
        },
      },
    },
  },
  gridflex: {
    position: "relative",
  },
  imgsextion: {
    width: "100%",
    marginTop: "22px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  circlebox: {
    position: "absolute",
    width: "16px",
    height: "16px",
    background:
      "linear-gradient(180deg, #00ACEB 0%, #00B0ED 10.18%, #1069C2 70.35%, #1069C2 100%)",
    opacity: "0.2",
    top: "33px",
    right: "103px",
    borderRadius: "50%",
  },
  circlebox1: {
    position: "absolute",
    width: "40px",
    height: "40px",

    background:
      "linear-gradient(180deg, #00ACEB 0%, #00B0ED 10.18%, #1069C2 70.35%, #1069C2 100%)",
    opacity: "0.2",
    borderRadius: "50%",
    marginTop: "-23px",
  },
}));

function AboutICO() {
  const classes = useStyles();
  return (
    <Box className={`${classes.mainbox} mainboxRoot`}>
      <Container>
        <Grid container spacing={4}>
          <Grid item lg={6} md={6} sm={12} xs={12} className={classes.gridflex}>
            <Box>
              <Typography variant="h2"> Why LAX ?</Typography>
              <Typography variant="h1">
                Profits Of Holding <br />
              LAX
              </Typography>
              <Hidden mdDown>
                <Box className="circleEffetc4">
                  <img src="images/Elips.png" alt="" width="70%" />
                </Box>
              </Hidden>
              {/* <Box className={classes.circlebox}></Box> */}
            </Box>
            <Box>
              {" "}
              <Typography variant="h4" style={{ paddingLeft: "0px" }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ac cum
                facilisi cras eget sagittis, auctor nisi. Hac vulputate mi
                aliquam vel, at sit mauris. Lorem augue eros odio cum arcu
                ultricies imperdiet volutpat. Euismod purus, semper ullamcorper
                congue.
              </Typography>
            </Box>
            <Box className={classes.imgsextion}>
              <Box className="imagebox">
                <img src="images/prohome.png" alt="" width="100%" />
              </Box>
            </Box>
            <Hidden mdDown>
              <Box className="circleEffetc5">
                <img src="images/Elips.png" alt="" width="70%" />
              </Box>
            </Hidden>
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <Grid container spacing={4}>
              <Grid item xs={12} lg={6} sm={6} md={12}>
                <Box>
                  <Box style={{ display: "flex" }}>
                    <Box>
                      <img
                        src="images/proimg1.png"
                        alt=""
                        width="100%"
                        style={{ width: "100%", maxWidth: "40px" }}
                      />
                    </Box>
                    <Typography
                      variant="h3"
                      style={{ paddingLeft: "20px", marginTop: "-2px" }}
                    >
                      Easy Transaction
                    </Typography>
                  </Box>
                  <Box style={{ paddingLeft: "45px" }}>
                    {" "}
                    <Typography variant="h4">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Lacus risus viverra bibendum.
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} lg={6} sm={6} md={12}>
                <Box>
                  <Box style={{ display: "flex" }}>
                    <Box>
                      <img
                        src="images/proimg2.png"
                        alt=""
                        width="100%"
                        style={{ width: "100%", maxWidth: "40px" }}
                      />
                    </Box>
                    <Typography
                      variant="h3"
                      style={{ paddingLeft: "20px", marginTop: "-2px" }}
                    >
                      Incredible Security
                    </Typography>
                  </Box>
                  <Box style={{ paddingLeft: "45px" }}>
                    {" "}
                    <Typography variant="h4">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Lacus risus viverra bibendum.
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} lg={6} sm={6} md={12}>
                <Box>
                  <Box style={{ display: "flex" }}>
                    <Box>
                      <img
                        src="images/proimg3.png"
                        alt=""
                        width="100%"
                        style={{ width: "100%", maxWidth: "40px" }}
                      />
                    </Box>
                    <Typography
                      variant="h3"
                      style={{ paddingLeft: "20px", marginTop: "-2px" }}
                    >
                      Outsized Returns
                    </Typography>
                  </Box>
                  <Box style={{ paddingLeft: "45px" }}>
                    {" "}
                    <Typography variant="h4">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Lacus risus viverra bibendum.
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} lg={6} sm={6} md={12}>
                <Box>
                  <Box style={{ display: "flex" }}>
                    <Box>
                      <img
                        src="images/proimg4.png"
                        alt=""
                        width="100%"
                        style={{ width: "100%", maxWidth: "40px" }}
                      />
                    </Box>
                    <Typography
                      variant="h3"
                      style={{ paddingLeft: "20px", marginTop: "-2px" }}
                    >
                      Private Transactions
                    </Typography>
                  </Box>
                  <Box style={{ paddingLeft: "45px" }}>
                    {" "}
                    <Typography variant="h4">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Lacus risus viverra bibendum.
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} lg={6} sm={6} md={12}>
                <Box>
                  <Box style={{ display: "flex" }}>
                    <Box>
                      <img
                        src="images/proimg5.png"
                        alt=""
                        width="100%"
                        style={{ width: "100%", maxWidth: "40px" }}
                      />
                    </Box>
                    <Typography
                      variant="h3"
                      style={{ paddingLeft: "20px", marginTop: "-2px" }}
                    >
                      Inflation Hedge
                    </Typography>
                  </Box>
                  <Box style={{ paddingLeft: "45px" }}>
                    {" "}
                    <Typography variant="h4">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Lacus risus viverra bibendum.
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} lg={6} sm={6} md={12}>
                <Box>
                  <Box style={{ display: "flex" }}>
                    <Box>
                      <img
                        src="images/proimg6.png"
                        alt=""
                        width="100%"
                        style={{ width: "100%", maxWidth: "40px" }}
                      />
                    </Box>
                    <Typography
                      variant="h3"
                      style={{ paddingLeft: "20px", marginTop: "-2px" }}
                    >
                      Customized Solutions
                    </Typography>
                  </Box>
                  <Box style={{ paddingLeft: "45px" }}>
                    {" "}
                    <Typography variant="h4">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Lacus risus viverra bibendum.
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default AboutICO;
