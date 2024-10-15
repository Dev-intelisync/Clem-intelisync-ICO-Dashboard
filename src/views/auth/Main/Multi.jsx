import React from "react";
import { Box, Typography, Container, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  bannerbox: {
    padding: "112px 0px 80px",
    backgroundImage: "url(images/platformbg.png)",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundColor: "#000",
    [theme.breakpoints.down("sm")]: {
      padding: "60px 0px 60px",
    },
    "& h1": {
      fontSize: "60px",
      fontWeight: "700",
      width: "100%",
      maxWidth: "968px",
      marginBottom: "100px",
      lineHeight: "70px",
      [theme.breakpoints.down("md")]: {
        fontSize: "40px",
        lineHeight: "50px",
      },
      [theme.breakpoints.down("sm")]: {
        marginBottom: "40px",
        lineHeight: "53px",
        fontSize: "40px",
      },
      [theme.breakpoints.down("xs")]: {
        fontSize: "28px",
        lineHeight: "40px",
      },
    },
    "& .imagebox": {
      background: "#C1B29B",
      border: " 4px solid #352611",
      borderRadius: "10px",
      padding: "20px",
      boxSizing: "border-box",
      width: "100%",
      maxWidth: "96%",
      marginBottom: "15px",
    },
    "& .circle": {
      width: "60px",
      height: "60px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: "100%",
    },
    "& h6": {
      fontSize: "24px",
      fontWeight: "700",
      color: "#000",
      marginTop: "15px",
      marginBottom: "15px",
    },
    "& h5": {
      fontSize: "12px",
      fontWeight: "400",
      color: "#000",
      textAlign: "left",
    },
    "& .mobile": {
      width: "100%",
      "@media(max-width:959px)": {
        width: "100%",
        maxWidth: "50%",
      },
      [theme.breakpoints.down("xs")]: {
        width: "100%",
        maxWidth: "60%",
      },
    },
  },
}));
function Banner() {
  const classes = useStyles();

  return (
    <Box className={classes.bannerbox}>
      <Container maxWidth="lg">
        <Box>
          <Typography variant="h1">
            Characteristic of Multi-Application Platform
          </Typography>
        </Box>
        <Grid container>
          <Grid item lg={9} md={9} sm={12} xs={12}>
            <Grid container>
              <Grid item lg={3} md={6} sm={6} xs={12}>
                <Box className="imagebox">
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Box className="circle" style={{ backgroundColor: "#fff" }}>
                      <Box>
                        <img
                          src="images/lock.png"
                          alt=""
                          width="100%"
                          style={{ width: "100%", maxWidth: "40px" }}
                        />
                      </Box>
                    </Box>
                  </Box>
                  <Box textAlign="center">
                    <Typography variant="h6">Features -1</Typography>
                    <Typography variant="h5">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Tortor velit, aliquet amet, sit potenti nisl convallis
                      felis, dignissim. Non laoreet lectus lorem nibh duis
                      pellentesque
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item lg={3} md={6} sm={6} xs={12}>
                <Box className="imagebox">
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Box className="circle" style={{ backgroundColor: "#fff" }}>
                      <Box>
                        <img
                          src="images/lock.png"
                          alt=""
                          width="100%"
                          style={{ width: "100%", maxWidth: "40px" }}
                        />
                      </Box>
                    </Box>
                  </Box>
                  <Box textAlign="center">
                    <Typography variant="h6">Features -1</Typography>
                    <Typography variant="h5">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Tortor velit, aliquet amet, sit potenti nisl convallis
                      felis, dignissim. Non laoreet lectus lorem nibh duis
                      pellentesque
                    </Typography>
                  </Box>
                </Box>
                {/* </Box> */}
              </Grid>
              {/* <Box className={classes.gridbox}> */}
              <Grid item lg={3} md={6} sm={6} xs={12}>
                <Box className="imagebox">
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Box className="circle" style={{ backgroundColor: "#fff" }}>
                      <Box>
                        <img
                          src="images/lock.png"
                          alt=""
                          width="100%"
                          style={{ width: "100%", maxWidth: "40px" }}
                        />
                      </Box>
                    </Box>
                  </Box>
                  <Box textAlign="center">
                    <Typography variant="h6">Features -1</Typography>
                    <Typography variant="h5">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Tortor velit, aliquet amet, sit potenti nisl convallis
                      felis, dignissim. Non laoreet lectus lorem nibh duis
                      pellentesque
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item lg={3} md={6} sm={6} xs={12}>
                <Box className="imagebox">
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Box className="circle" style={{ backgroundColor: "#fff" }}>
                      <Box>
                        <img
                          src="images/lock.png"
                          alt=""
                          width="100%"
                          style={{ width: "100%", maxWidth: "40px" }}
                        />
                      </Box>
                    </Box>
                  </Box>
                  <Box textAlign="center">
                    <Typography variant="h6">Features -1</Typography>
                    <Typography variant="h5">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Tortor velit, aliquet amet, sit potenti nisl convallis
                      felis, dignissim. Non laoreet lectus lorem nibh duis
                      pellentesque
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Grid item lg={3} md={3} sm={12} xs={12}>
            <Box className="mobile">
              <img src="images/mobile.png" alt="" width="100%" />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Banner;
