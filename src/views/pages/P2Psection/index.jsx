import React, { useState } from "react";
import { Box, makeStyles, Grid, Button } from "@material-ui/core";
import FilterP2p from "@component/FilterP2p";
import P2PDashboard from "./P2PDashboard";
import { useHistory } from "react-router-dom";
import Page from "@component/Page";

const useStyles = makeStyles((theme) => ({
  bannerBox: {
    padding: "40px 0",
    paddingBottom: "10px",
    position: "relative",
    overflow: "hidden",
    minHeight: "calc(100vh - 529px)",
    [theme.breakpoints.only("xs")]: {
      padding: "40px 0",
    },
  },
  ButtonTab: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background:
      "linear-gradient(180deg, #00ACEB 0%, #00B0ED 10.18%, #1069C2 70.35%, #1069C2 100%)",

    padding: "6px 20px 6px 5px",
    borderRadius: "10px",
    flexWrap: "wrap",
    "@media(max-width:450px)": {
      display: "flex",
      justifyContent: "center",
    },
  },
  PostBox: {
    "@media(max-width:1117px)": {
      marginTop: "10px",
      marginBottom: "10px",
    },
    "@media(max-width:450px)": {
      display: "flex",
      // justifyContent: "center",
      flexDirection: "column",
    },
  },
  CloseButton: {
    color: "#848484",
    padding: "9px 30px !important",
    fontSize: "14px",
    border: "1px solid #fff",
    backgroundColor: "#fff",
    height: "40px",

    borderRadius: "8px",
    boxShadow: "0px 13px 27px rgb(0 0 0 / 25%)",

    // "& :hover": {
    //   color: "#fff",
    // },
  },
  BuyButton: {
    padding: "9px 30px !important",
    fontSize: "14px",
    color: "white",
    borderRadius: "8px",
    backgroundColor: "red",
    height: "40px",

    boxShadow: "0px 13px 27px rgb(0 0 0 / 25%)",

    "& :hover": {
      color: "#fff",
    },
  },
  SellButton: {
    padding: "9px 30px !important",
    fontSize: "14px",
    color: "white",
    borderRadius: "8px",
    height: "40px",
    backgroundColor: "#3ECB81",

    boxShadow: "0px 13px 27px rgb(0 0 0 / 25%)",
  },
  NotSelected: {
    padding: "9px 30px !important",
    fontSize: "14px",
    color: "#000",
    borderRadius: "8px",
    height: "40px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0px 13px 27px rgb(0 0 0 / 25%)",
  },
}));

export default function Dashboard(props) {
  var classes = useStyles();
  const history = useHistory();
  const [tabview, setTabView] = useState("BTC");
  const [orderType, setOrderType] = useState("BUY");

  return (
    <Page title="p2p">
      <Box className={classes.bannerBox}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} sm={12}>
            <Box className={classes.ButtonTab}>
              <Box className="TabButtonsBox">
                <Button
                  className={tabview === "All" ? "active" : " "}
                  onClick={() => setTabView("All")}
                >
                  ALL
                </Button>
                <Button
                  className={tabview === "VD" ? "active" : " "}
                  onClick={() => setTabView("VD")}
                >
                  VDT
                </Button>{" "}
                <Button
                  className={tabview === "BTC" ? "active" : " "}
                  onClick={() => setTabView("BTC")}
                >
                  BTC
                </Button>
                <Button
                  className={tabview === "USDT" ? "active" : " "}
                  onClick={() => setTabView("USDT")}
                >
                  USDT
                </Button>{" "}
                <Button
                  className={tabview === "USDC" ? "active" : " "}
                  onClick={() => setTabView("USDC")}
                >
                  USDC
                </Button>
                <Button
                  className={tabview === "BUSD" ? "active" : " "}
                  onClick={() => setTabView("BUSD")}
                >
                  BUSD
                </Button>
                <Button
                  className={tabview === "MATIC" ? "active" : " "}
                  onClick={() => setTabView("MATIC")}
                >
                  MATIC
                </Button>
                {/* <Button
                  className={tabview === "LTC" ? "active" : " "}
                  onClick={() => setTabView("LTC")}
                >
                  LTC
                </Button> */}
                <Button
                  className={tabview === "BNB" ? "active" : " "}
                  onClick={() => setTabView("BNB")}
                >
                  BNB
                </Button>{" "}
                <Button
                  className={tabview === "ETH" ? "active" : " "}
                  onClick={() => setTabView("ETH")}
                >
                  ETH
                </Button>{" "}
                <Button
                  className={tabview === "AVAX" ? "active" : " "}
                  onClick={() => setTabView("AVAX")}
                >
                  AVAX
                </Button>{" "}
                <Button
                  className={tabview === "p2pdashboard" ? "active" : " "}
                  onClick={() => setTabView("p2pdashboard")}
                >
                  P2P Dashboard
                </Button>
              </Box>
              <Box
                className={classes.PostBox}
                style={{ display: "flex", margin: "10px 0px" }}
              >
                {tabview !== "All" && (
                  <>
                    <Button
                      className={classes.CloseButton}
                      onClick={() =>
                        history.push({ pathname: "/Addpost", search: tabview })
                      }
                    >
                      Post Your Add
                    </Button>{" "}
                  </>
                )}
                &nbsp; &nbsp;
                <Button
                  className={classes.CloseButton}
                  onClick={() => history.push("/Allorderdata")}
                >
                  My Adds
                </Button>
                &nbsp; &nbsp;
                <Button
                  // className={tabview === "p2pdashboard" ? "active" : " "}
                  onClick={() => setOrderType("BUY")}
                  // style={tabview === "Buy" ? { textDecoration: "underline" } : ""}
                  className={
                    orderType == "BUY"
                      ? classes.SellButton
                      : classes.NotSelected
                  }
                >
                  Buy
                </Button>
                &nbsp; &nbsp;
                <Button
                  // className={tabview === "p2pdashboard" ? "active" : " "}
                  onClick={() => setOrderType("SELL")}
                  className={
                    orderType == "SELL"
                      ? classes.BuyButton
                      : classes.NotSelected
                  }
                  // style={
                  //   tabview === "Sell" ? { textDecoration: "underline" } : ""
                  // }
                >
                  Sell
                </Button>
              </Box>
            </Box>
          </Grid>{" "}
          <Grid item xs={12} sm={12}>
            <Box className="TabButtonsContant">
              {tabview !== "p2pdashboard" ? (
                <FilterP2p tabview={tabview} orderType={orderType} />
              ) : (
                ""
              )}

              {tabview === "p2pdashboard" ? (
                <P2PDashboard tabview={tabview} />
              ) : (
                ""
              )}
            </Box>
          </Grid>
        </Grid>
        {/* <Box mt={8}>
          <TradeAnyTime />
        </Box> */}
      </Box>
    </Page>
  );
}
