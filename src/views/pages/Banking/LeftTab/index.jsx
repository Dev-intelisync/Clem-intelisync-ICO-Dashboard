import React, { useState } from "react";
import { Box, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import BankListing from "@views/pages/Banking/LeftTab/BankList";
import UpiListing from "@views/pages/Banking/LeftTab/UpiList";

const useStyles = makeStyles((theme) => ({
  withdrawbox: {
    padding: "20px",
    borderRadius: "5px",
    minHeight: "100vh",
    "& .subtextbox": {
      position: "relative",
      "& h4": {
        fontWeight: "500",
        color: theme.palette.background.yellow,
        position: "absolute",
        left: 0,
        top: 0,
        "@media(max-width:768px)": {
          position: "relative",
          textAlign: "center",
          marginBottom: "10px",
        },
      },
    },
  },
  accountdetails: {
    marginTop: "20px",
    "& h4": {
      fontWeight: "400",
      color: theme.palette.primary.main,
      fontSize: "18px",
    },
  },
  maincontainer: {
    marginBottom: "40px",
    marginTop: "30px",
    "& h2": {
      color: "#EAB73B",
    },
    "& h6": {
      color: theme.palette.background.main,
    },
  },
  contentbox: {
    padding: "30px 30px 30px 0px",
    [theme.breakpoints.down("sm")]: {
      padding: "0px",
    },
    "& .subtextbox": {
      "& .TabBoxbank": {
        display: "flex",
      },
    },
  },
}));
function Banking({ upiBankData, uPIAccountListDataUpi }) {
  const classes = useStyles();

  const [tabview, setTabView] = useState("Bank");

  return (
    <>
      <Box className={classes.contentbox}>
        {/* <Box className={classes.withdrawbox} component={Paper}> */}
        <Box className="subtextbox">
          <Box className="TabBoxbank">
            <Box
              onClick={() => setTabView("Bank")}
              className={
                tabview === "Bank" ? "containedButton" : "outlinedButton"
              }
            >
              <Button>Bank</Button>
            </Box>
            <Box
              onClick={() => setTabView("UPI")}
              className={
                tabview === "UPI" ? "containedButton" : "outlinedButton"
              }
            >
              <Button>E Wallet</Button>
            </Box>
          </Box>
        </Box>

        <Box>
          {tabview === "Bank" ? (
            <BankListing
              upiBankData={upiBankData}
              uPIAccountListDataUpi={uPIAccountListDataUpi}
            />
          ) : (
            ""
          )}
        </Box>
        <Box>
          {tabview === "UPI" ? (
            <UpiListing
              upiBankData={upiBankData}
              uPIAccountListDataUpi={uPIAccountListDataUpi}
            />
          ) : (
            ""
          )}
        </Box>
        {/* </Box> */}
      </Box>
    </>
  );
}

export default Banking;
