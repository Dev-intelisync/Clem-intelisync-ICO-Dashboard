import React, { useState } from "react";
import { Box, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";

import Bank from "@views/pages/Banking/RightTab/Bank";
import Upi from "@views/pages/Banking/RightTab/Upi";

// import UpiListing from "@views/pages/Banking/LeftTab/UpiList";

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
  maincontainer: {
    marginBottom: "40px",
    marginTop: "30px",
    "& h2": {
      color: "#EAB73B",
    },
    "& h6": {
      color: "#FFFFFF",
    },
  },
  maincontainerbox: {
    padding: "5px 40px",
    [theme.breakpoints.down("sm")]: {
      padding: "40px 30px",
    },
    [theme.breakpoints.down("sm")]: {
      padding: "0px ",
    },
    "& .subtextbox": {
      "& .TabBoxbank": {
        display: "flex",
      },
    },
    "& h4": {
      fontSize: "18px",
      fontWeight: "400",
    },
  },
}));
function RightTab({
  addUPIHAndler,
  isLoading,
  addBankHandler,
  roleBankStatus,
  setBankStatus,
  setupiStatus,
  roleupiStatus,
}) {
  const classes = useStyles();
  const [tabview, setTabView] = useState("Bank");

  return (
    <>
      <Box className={classes.maincontainerbox}>
        {/* <Box className={classes.withdrawbox} component={Paper}> */}
        <Typography variant="h4">Add New Account</Typography>
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
            <Bank
              addBankHandler={addBankHandler}
              isLoading={isLoading}
              roleBankStatus={roleBankStatus}
              setBankStatus={setBankStatus}
            />
          ) : (
            ""
          )}
        </Box>
        <Box>
          {tabview === "UPI" ? (
            <Upi
              addUPIHAndler={addUPIHAndler}
              isLoading={isLoading}
              setupiStatus={setupiStatus}
              roleupiStatus={roleupiStatus}
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

export default RightTab;
