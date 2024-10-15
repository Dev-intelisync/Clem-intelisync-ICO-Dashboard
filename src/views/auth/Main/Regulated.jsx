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
    padding: "20px 0px 30px",
    background: theme.palette.background.dark,

    [theme.breakpoints.down("sm")]: {
      padding: "0px 0px 30px",
    },
    "& .CardBox": {
      border: "1px solid #000",
      background: theme.palette.background.cardstyle,

      padding: "11px 8px 10px 10px ",
      minHeight: "150px",

      "& h6": {
        fontSize: "22px",
        color: "#fff",
        fontFamily: "Inter",
        fontWeight: "700",
      },

      "& h3": {
        fontSize: "15px",
        color: "#dedcdc",
        fontFamily: "Inter",
      },
      "& h5": {
        fontSize: "15px",
        color: "#dedcdc",
        fontFamily: "Inter",
        cursor: "pointer",
        textDecoration: "underline",
        textDecorationColor: "#fff",
        textUnderlineOffset: "5px",
        "@media(max-width:375px)": {
          fontSize: "14px",
        },
        "@media(max-width:1024px)": {
          fontSize: "13px",
        },
      },
      "& h4": {
        fontSize: "15px",
        color: "#dedcdc",
        fontFamily: "Inter",
      },
    },
    "& .Title": {
      "& h3": {
        fontSize: "40px",
        color: theme.palette.text.primary,

        fontFamily: "Inter",

        [theme.breakpoints.down("sm")]: {
          fontSize: "32px",
        },
        [theme.breakpoints.down("xs")]: {
          fontSize: "22px",
        },
      },
      "& h6": {
        fontSize: "16px",
        color: "#848484",
        fontFamily: "Inter",
      },
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
}));

function AboutICO() {
  const classes = useStyles();
  return (
    <Box className={classes.mainbox}>
      <Container>
        <Box className="Title">
          <Box align="center">
            <Typography variant="h3">Fully Licensed / Regulated</Typography>
            <Typography variant="h6">
              Discounts and usage over various sectors viz
            </Typography>
          </Box>
        </Box>
        <Box mt={4}>
          <Grid container spacing={3}>
            <Grid item lg={4} md={4} sm={6} xs={12}>
              <Box className="CardBox" style={{ textAlign: "left" }}>
                <Typography variant="h6">Crypto License</Typography>
                <Typography variant="h5">
                  Issuerance and exchange of cryptocurrencies
                </Typography>
                <Box
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Box mt={1}>
                    <Typography variant="h4">FIAT to Crypoto</Typography>
                    <Typography variant="h4">FIAT to Crypoto</Typography>
                    <Typography variant="h4">FIAT to Crypoto</Typography>
                  </Box>
                  <Box mt={1} pr={2}>
                    <Typography variant="h4"> - Trading Platform</Typography>
                    <Typography variant="h4"> - P2P Exchange</Typography>
                    <Typography variant="h4"> - Gateway</Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid item lg={4} md={4} sm={6} xs={12}>
              <Box className="CardBox" style={{ textAlign: "left" }}>
                <Typography variant="h6">Banking License</Typography>
                <Typography variant="h5">
                  Issuerance and exchange of cryptocurrencies
                </Typography>
                <Box
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Box mt={1}>
                    <Typography variant="h4">Lending</Typography>
                    <Typography variant="h4">Deposit</Typography>
                    <Typography variant="h4">Forex</Typography>
                  </Box>
                  <Box mt={1} pr={2}>
                    <Typography variant="h4"> - Trade Settlement</Typography>
                    <Typography variant="h4"> -Remittance</Typography>
                    <Typography variant="h4"> - Escrow Service</Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid item lg={4} md={4} sm={6} xs={12}>
              <Box className="CardBox" style={{ textAlign: "left" }}>
                <Typography variant="h6">Crypto License</Typography>
                <Typography variant="h3">
                  Fully collatera PolygonNetwork based LAX issued by
                  a license Crypto Assets Service Provider namely LAX
                  to ascertain or act as:
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}

export default AboutICO;
