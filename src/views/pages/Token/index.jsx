import React, { useState, useEffect } from "react";
import { Button, Grid, Box, Typography } from "@material-ui/core";
import Page from "@component/Page";
import { makeStyles } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import "./style.css";
import TransactionMain from "../Dashboard/TransactionMain";
import CheckoutForm from "../PaymentGateWay/index";
import Crypto from "./Crypto";
import PayandCryptoTable from "@component/PayandCryptoTable";
import TokenTable from "./TokenTable";

const useStyles = makeStyles((theme) => ({
  TabBox: {
    "& .subtextbox": {
      "& .TabBoxbank": {
        display: "flex",
        "& .buttonBox": {
          color: "#fffff",
          fontFamily: "Inter",
          fontStyle: "normal",
          fontWeight: "600",
          fontSize: "20px",
          padding: "5px 15px !important",
          margin: "5px",
          height: "28px",

          borderBottom: "6px solid #FBCC5C",
        },
        "& .buttonBox1": {
          color: "#fffff",
          fontFamily: "Inter",
          fontStyle: "normal",
          fontWeight: "600",
          fontSize: "20px",

          padding: "5px 15px !important",
          margin: "5px",
          height: "28px",
          border: "none",
        },
      },
    },
  },
  texthead: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: "2rem",
    "@media(max-width:508px)": {
      display: "block",
    },

    "& h4": {
      fontFamily: "Inter",
      fontStyle: "normal",
      fontWeight: "700",
      fontSize: "36px",
      lineHeight: "54px",
      color: "#FFFFFF",
      "@media(max-width:508px)": {
        paddingBottom: "1rem",
      },
    },
  },
  mainboxes: {
    // border: "1px solid rgba(128, 128, 128, 0.22)",
    borderRadius: "8px",
    // padding: "0px 20px 0px 20px",
    // maxWidth: "600px",
    marginTop: "95px",
    [theme.breakpoints.down("sm")]: {
      padding: "0px 10px 0px 10px",
    },
  },
  boxstyle: {
    background:
      "linear-gradient(180deg, rgba(0, 172, 235, 0.1) 0%, rgba(0, 176, 237, 0.1) 10.18%, rgba(16, 105, 194, 0.1) 70.35%, rgba(16, 105, 194, 0.1) 100%)",
    borderRadius: "10px",
    border: "1px solid #6ECFF3",
    padding: "25px",
  },
}));

export default function Token({ size }) {
  const history = useHistory();
  const [tabview, setTabView] = useState("CheckoutForm");

  const classes = useStyles();

  return (
    <>
      <Page title="CLEMENTINE ICO Dashboard">
        <Box mb={3} className="bankbox" align="center">
          <Box className={classes.mainboxes}>
            <Crypto />
          </Box>
        </Box>
      </Page>
    </>
  );
}
