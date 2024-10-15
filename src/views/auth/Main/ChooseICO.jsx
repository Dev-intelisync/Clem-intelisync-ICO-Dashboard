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
    padding: "80px 0px 0px",
    backgroundColor: "#000",
    [theme.breakpoints.down("sm")]: {
      padding: "60px 0px 30px",
    },
    "& h1": {
      fontSize: "60px",
      fontWeight: "700",
      marginBottom: "100px",
      [theme.breakpoints.down("sm")]: {
        fontSize: "40px",
        marginBottom: "40px",
        lineHeight: "50px",
      },
      [theme.breakpoints.down("xs")]: {
        fontSize: "28px",
        lineHeight: "40px",
      },
    },
    "& h3": {
      fontSize: "30px",
      fontWeight: "700",
      marginBottom: "8px",
      [theme.breakpoints.down("sm")]: {
        fontSize: "20px",
      },
    },
    "& h4": {
      fontSize: "16px",
      fontWeight: "300",
      lineHeight: "24px",
    },
    "& figure": {
      "& img": {
        width: "100%",
        maxWidth: "25px",
      },
    },
    "& .imagebox": {
      "& img": {
        width: "100%",
        maxWidth: "491px",
        "@media(max-width:959px)": {
          width: "100%",
          maxWidth: "70%",
          margin: "0 auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        },
      },
    },
  },
  gridflex: {
    display: "flex",
    justifyContent: "flex-end",
    "@media(max-width:959px)": {
      justifyContent: "left",
      display: "block",
    },
  },
}));

function AboutICO() {
  const classes = useStyles();
  return (
    <Box className={classes.mainbox}>
      <Container>
        <Box textAlign="center">
          <Typography variant="h1">Why Choose ICO Crypto?</Typography>
        </Box>
        <Grid container>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <Grid container>
              <Grid item xs={12}>
                <Box>
                  <Box style={{ display: "flex" }}>
                    <Box>
                      <img
                        src="images/lock.png"
                        alt=""
                        width="100%"
                        style={{ width: "100%", maxWidth: "40px" }}
                      />
                    </Box>
                    <Typography
                      variant="h3"
                      style={{ paddingLeft: "20px", marginTop: "-6px" }}
                    >
                      Securely and Reliably
                    </Typography>
                  </Box>
                  <Box style={{ paddingLeft: "45px" }}>
                    {" "}
                    <Typography variant="h4">
                      They allow users to securely and reliably communicate
                      information across bitcoin networks.the advantages
                      provided by infrastructure and protocols are assisting in
                      the segment's expansion.
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
            <Box mt={4}>
              <Grid container>
                <Grid item xs={12}>
                  <Box>
                    <Box style={{ display: "flex" }}>
                      <Box>
                        <img
                          src="images/lock.png"
                          alt=""
                          width="100%"
                          style={{ width: "100%", maxWidth: "40px" }}
                        />
                      </Box>
                      <Typography
                        variant="h3"
                        style={{ paddingLeft: "20px", marginTop: "-6px" }}
                      >
                        Secure and Efficient Transactions
                      </Typography>
                    </Box>
                    <Box style={{ paddingLeft: "45px" }}>
                      {" "}
                      <Typography variant="h4">
                        The need for blockchain technology in financial services
                        is being driven by the technology's ability to deliver
                        secure and efficient transactions.. Over the forecast
                        timespan,expected to increase at the quickest CAGR.
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>

            <Box mt={4}>
              <Grid container>
                <Grid item xs={12}>
                  <Box>
                    <Box style={{ display: "flex" }}>
                      <Box>
                        <img
                          src="images/lock.png"
                          alt=""
                          width="100%"
                          style={{ width: "100%", maxWidth: "40px" }}
                        />
                      </Box>
                      <Typography
                        variant="h3"
                        style={{ paddingLeft: "20px", marginTop: "-6px" }}
                      >
                        Security and Transparency
                      </Typography>
                    </Box>
                    <Box style={{ paddingLeft: "45px" }}>
                      {" "}
                      <Typography variant="h4">
                        This technology can securely store and transmit identity
                        information in a "follow the money" approach to fraud
                        and security breaches, similar to what is used in online
                        banking and cryptocurrency transactions.
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12} className={classes.gridflex}>
            <Box className="imagebox">
              <img src="images/toga.gif" alt="" width="100%" />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default AboutICO;
