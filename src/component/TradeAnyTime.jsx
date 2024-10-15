import React from "react";
import { Box, Grid, Typography, makeStyles, Link } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    // background: "linear-gradient(45deg, #7fb6e1, #75bdf5)",
    paddingTop: "36px",
    paddingLeft: "40px",
    backgroundRepeat: "no-reapeat",
    backgroundSize: "cover",
    backgroundImage: "url(images/download.png)",
    "@media(max-width:450px)": {
      paddingLeft: "25px",
    },

    "& h4": {
      color: "#fff",
      fontSize: "25px",
      fontWeight: "600",
    },
    "& h3": {
      color: "#fff",
      fontWeight: "600",
    },
    "& p": {
      color: "#fff",
      maxWidth: "500px",
      fontSize: "12px",
      "@media(max-width:959px)": {
        paddingRight: "17px",
      },
    },
    " & .ImageSection": {
      display: "flex",
      justifyContent: "space-evenly",
      alignItems: "center",
      flexWrap: "wrap",
      paddingLeft: "10px",
      "@media(max-width:959px)": {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingRight: "21px",
      },
    },
    " & .ImgBox": {
      "@media(max-width:959px)": {},
    },
  },
}));

const TradeAnyTime = () => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Grid container spacing={3}>
        <Grid lg={4} md={4} sm={6} xs={12}>
          <Box>
            <Box mb={1}>
              <Typography variant="h4">Trade Anytime, Anywhere</Typography>
            </Box>
            <Box>
              <Typography variant="body2">
                Download and enjoy BitBharat mobile APP specially tailored for
                you, enjoy real-time transactions anytime, anywhere, together
                with the latest market trends right in the palm of your hands.
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid lg={4} md={4} sm={6} xs={12}>
          <Box align="center">
            <Box align="center" mb={2}>
              <Typography variant="h3">DOWNLOAD NOW</Typography>
            </Box>
            <Box className="ImageSection">
              <Box align="center">
                <Link
                  href="https://play.google.com/store/games"
                  target="_blank"
                >
                  <img
                    ..="images/play-store.png"
                    alt=""
                    width="100%"
                    style={{ height: "45px" }}
                  />
                </Link>
              </Box>

              <Box align="center">
                <Link
                  href="https://www.apple.com/in/app-store/"
                  target="_blank"
                >
                  <img
                    ..="images/app-store.png"
                    alt=""
                    width="100%"
                    style={{ height: "45px", marginLeft: "10px" }}
                  />
                </Link>
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid lg={4} md={4} sm={6} xs={12}>
          <Box align="center">
            <img ..="images/img.svg" alt="" width="50%" />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TradeAnyTime;
