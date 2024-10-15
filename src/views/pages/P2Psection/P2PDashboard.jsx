import React, { useState } from "react";
import { Box, makeStyles, Typography, Grid, Button } from "@material-ui/core";
import AdvertiseTable from "./Advertisetable";
import TradeTable from "./Tradetable";
import CancelTrade from "./CancelTrade";
import AppealList from "./AppealList";

const useStyles = makeStyles((theme) => ({
  bannerBox: {
    padding: "10px 0 40px",
    position: "relative",
    overflow: "hidden",
    minHeight: "calc(100vh - 529px)",
    [theme.breakpoints.only("xs")]: {
      padding: "80px 0",
    },
    "& .subtextbox": {
      "& .TabBoxbank": {
        display: "flex",
        "& .buttonBox": {
          color: "white",
          borderRadius: "8px",
          padding: "5px 15px !important",
          margin: "5px",
          fontSize: "14px",
          background:
            "linear-gradient(180deg, #00ACEB 0%, #00B0ED 10.18%, #1069C2 70.35%, #1069C2 100%)",
          boxShadow: " 0px 13px 27px rgb(0 0 0 / 25%)",
        },
        "& .buttonBox1": {
          color: "#000",
          "& button": { color: "#000" },
          // color: theme.palette.text.primary,
          borderRadius: "8px",
          background: "#fff",
          padding: "5px 15px !important",
          margin: "5px",
          fontSize: "14px",
          border: "1px solid #1069C2",
          boxShadow: " 0px 13px 27px rgb(0 0 0 / 25%)",
        },
      },
    },
    "& h3": {
      fontSize: "22px",
    },
    "& h4": {
      fontSize: "17px",
      color: "#848484",
    },
  },
}));

export default function Dashboard(props) {
  var classes = useStyles();
  const [tabview, setTabView] = useState("Add");

  return (
    <Box className={classes.bannerBox}>
      <Box>
        <Typography variant="h3">Dashboard</Typography>
      </Box>
      <br />
      <Box>
        <Typography variant="h4">
          On this page you can view and manage your advertisements and trade.
        </Typography>
      </Box>
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} sm={12}>
          <Box className="subtextbox">
            <Box className="TabBoxbank">
              <Box
                onClick={() => setTabView("Add")}
                className={tabview === "Add" ? "buttonBox" : "buttonBox1"}
              >
                <Button> MY ADVERTISEMENT</Button>
              </Box>
              <Box
                onClick={() => setTabView("TRADES")}
                className={tabview === "TRADES" ? "buttonBox" : "buttonBox1"}
              >
                <Button> COMPLETED TRADES</Button>
              </Box>
              <Box
                onClick={() => setTabView("cancel")}
                className={tabview === "cancel" ? "buttonBox" : "buttonBox1"}
              >
                <Button> CANCELLED TRADES</Button>
              </Box>
              <Box
                onClick={() => setTabView("appeal")}
                className={tabview === "appeal" ? "buttonBox" : "buttonBox1"}
              >
                <Button>APPEAL LIST</Button>
              </Box>
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} sm={12}>
          <Box className="TabButtonsContant">
            {tabview === "Add" ? <AdvertiseTable /> : ""}
            {tabview === "TRADES" ? <TradeTable /> : ""}
            {tabview === "cancel" ? <CancelTrade /> : ""}
            {tabview === "appeal" ? <AppealList /> : ""}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
