import React, { useState } from "react";
import {
  Box,
  Container,
  makeStyles,
  Typography,
  Grid,
  Button,
} from "@material-ui/core";
import AdvertiseTable from "./Advertisetable";
import TradeTable from "./Tradetable";
import P2PDashboard from "./P2PDashboard";
import CancelTrade from "./CancelTrade";
import MyAdds from "./MyAddsTable";
import AllorderTableData from "./AllorderTableData";

const useStyles = makeStyles((theme) => ({
  bannerBox: {
    padding: "40px 0",
    position: "relative",
    overflow: "hidden",
    minHeight: "calc(100vh - 529px)",
    [theme.breakpoints.only("xs")]: {
      padding: "80px 0",
    },
    "& .subtextbox": {
      "& .TabBoxbank": {
        display: "flex",
      },
    },
    "& h3": {
      fontSize: "27px",
      background:
        "linear-gradient(180deg, #00ACEB 0%, #00B0ED 10.18%, #1069C2 70.35%, #1069C2 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
      textFillColor: "transparent",
    },
    "& h4": {
      fontSize: "17px",
      color: "#848484",
    },
  },
}));

export default function Dashboard(props) {
  var classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [tabview, setTabView] = useState("Add");

  return (
    <Box className={classes.bannerBox}>
      <Box>
        <Typography variant="h3">My Advertisement</Typography>
      </Box>
      <br />

      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} sm={12}>
          <Box className="subtextbox">
            <Box className="TabBoxbank">
              <Box
                onClick={() => setTabView("TRADES")}
                className={
                  tabview === "TRADES" ? "containedButton" : "outlinedButton"
                }
              >
                <Button> ALL ORDERS</Button>
              </Box>
              <Box
                onClick={() => setTabView("Add")}
                className={
                  tabview === "Add" ? "containedButton" : "outlinedButton"
                }
              >
                <Button> MY ADDS</Button>
              </Box>
            </Box>
          </Box>
        </Grid>
        <Container maxWidth="lg" align="left">
          {" "}
          <Grid item xs={12} sm={12}>
            <Box className="TabButtonsContant">
              {tabview === "Add" ? <MyAdds /> : ""}
              {tabview === "TRADES" ? <AllorderTableData /> : ""}
            </Box>
          </Grid>
        </Container>
      </Grid>
    </Box>
  );
}
