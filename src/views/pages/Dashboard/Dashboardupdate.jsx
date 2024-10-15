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
      background: "#6647BF",
      position: "relative",

      padding: "11px 8px 10px 10px ",
      minHeight: "150px",

      "& h6": {
        fontFamily: "'Inter'",
        fontStyle: "normal",
        fontWeight: "600",
        fontSize: "12px",
        lineHeight: "15px",
        color: "#FFFFFF",
        marginTop: "10px",
      },
      "& h2": {
        fontFamily: "'Inter'",
        fontStyle: "normal",
        fontWeight: "500",
        fontSize: "16px",
        lineHeight: "19px",
        color: "#FFFFFF",
        paddingBottom: "10px",
      },
      "& h3": {
        fontSize: "15px",
        color: "#dedcdc",
        fontFamily: "Inter",
      },
      "& h1": {
        fontFamily: "'Inter'",
        fontStyle: "normal",
        fontWeight: "400",
        fontSize: "12px",
        lineHeight: "15px",
        color: "#6CEB80",
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
        fontFamily: "'Inter'",
        fontStyle: "normal",
        fontWeight: "700",
        fontSize: "18px",
        lineHeight: "22px",
        color: "#FFFFFF",
      },
    },
    "& .Title": {
      "& h3": {
        fontFamily: "'Inter'",
        fontStyle: "normal",
        fontWeight: "700",
        fontSize: "30px",
        lineHeight: "36px",
        color: "#383838",

        [theme.breakpoints.down("sm")]: {
          fontSize: "32px",
        },
        [theme.breakpoints.down("xs")]: {
          fontSize: "22px",
        },
      },
    },
  },
  sideBox: {
    position: "absolute",
    width: "105px",
    height: "80px",
    top: "0px",
    right: "0px",
    borderBottomLeftRadius: "100px",
    background: "#7B5FD0",
  },
  sideBox1: {
    position: "absolute",
    width: "40px",

    top: "15px",
    right: "20px",
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

const Data = [
  {
    title: "Total Balance",
    balance: "0.0000034 BTC",
    subblance: "$ 1.2521.00",
    childbalnace: "6,999.85  (+2.5%)",
    imgage: "images/usdt.png",
  },
  {
    title: "Total Balance",
    balance: "0.0000034 BTC",
    subblance: "$ 1.2521.00",
    childbalnace: "6,999.85  (+2.5%)",
    imgage: "images/usdt.png",
  },
  {
    title: "Total Balance",
    balance: "0.0000034 BTC",
    subblance: "$ 1.2521.00",
    childbalnace: "6,999.85  (+2.5%)",
    imgage: "images/usdt.png",
  },
  {
    title: "Total Balance",
    balance: "0.0000034 BTC",
    subblance: "$ 1.2521.00",
    childbalnace: "6,999.85  (+2.5%)",
    imgage: "images/usdt.png",
  },
];

function Dashboardupdate() {
  const classes = useStyles();

  return (
    <Box className={classes.mainbox}>
      <Container>
        <Box className="Title">
          <Box>
            <Typography variant="h3">Dashboard</Typography>
          </Box>
        </Box>
        <Box mt={4}>
          <Grid container spacing={1}>
            {Data.map((value) => {
              return (
                <>
                  <Grid item lg={3} md={4} sm={6} xs={12}>
                    <Box className="CardBox" style={{ textAlign: "left" }}>
                      <Box className={classes.sideBox}></Box>
                      <Box className={classes.sideBox1}>
                        <img src="/images/usdt.png" width="100%" alt="" />
                      </Box>

                      <Typography variant="h6">{value.title}</Typography>
                      <Box>
                        <Box mt={2} mb={2}>
                          <Typography variant="h4">{value.balance}</Typography>
                        </Box>

                        <Box mt={1} pr={2}>
                          <Typography variant="h2">
                            {value.subblance}
                          </Typography>
                          <Typography variant="h1">
                            {value.childbalnace}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Grid>
                </>
              );
            })}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}

export default Dashboardupdate;
