import { Typography, Box, Grid, Divider, makeStyles } from "@material-ui/core";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import ErrorIcon from "@material-ui/icons/Error";
const useStyles = makeStyles((theme) => ({
  mainBox: {
    "& h3": {
      background:
        "linear-gradient(180deg, #00ACEB 0%, #00B0ED 10.18%, #1069C2 70.35%, #1069C2 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
      textFillColor: "transparent",
    },
    "& h5": {
      color: "#848484",
      fontSize: "18px",
    },
    "& h6": {
      color: "#848484",
      fontSize: "14px",
    },
  },
  otherButton: {
    "& .buyBtn": {
      color: "white",
      borderRadius: "8px",
      padding: "9px 30px !important",
      fontSize: "14px",
      background:
        "linear-gradient(180deg, #00ACEB 0%, #00B0ED 10.18%, #1069C2 70.35%, #1069C2 100%)",
      boxShadow: " 0px 13px 27px rgb(0 0 0 / 25%)",
    },
    "& .Btn": {
      color: "#000",
      background: "#fff",
      borderRadius: "8px",
      padding: "8px 40px",
      marginRight: "10px",
      maxWidth: "100px",
    },

    "& .sellBtn": {
      color: "white",
      borderRadius: "8px",
      padding: "9px 30px !important",
      fontSize: "14px",
      boxShadow: "0px 13px 27px rgb(0 0 0 / 25%)",
      backgroundColor: "#3ecb81",
    },
  },
  contentBox: {
    display: "flex",
    justifyContent: "space-between",
  },
  CloseButton: {
    color: "#fff",
    padding: "9px 30px !important",
    fontSize: "14px",
    background:
      "linear-gradient(180deg, #00ACEB 0%, #00B0ED 10.18%, #1069C2 70.35%, #1069C2 100%)",
    borderRadius: "4px",
    backgroundColor: "#fff",
    boxShadow: "0px 13px 27px rgb(0 0 0 / 25%)",

    "&:hover": {
      backgroundColor: "red",
    },
  },
}));
const OrderCancel = () => {
  const classes = useStyles();
  const history = useHistory();
  const [value, setValue] = React.useState("male");

  return (
    <Box style={{ marginTop: "20px" }}>
      <Grid container spacing={2}>
        <Grid item lg={6}>
          <Box className={classes.mainBox}>
            <Box style={{ display: "flex", alignItems: "center" }}>
              <Typography variant="h3">Cancel Order</Typography>&nbsp;&nbsp;
              <ErrorIcon style={{ fontSize: "30px" }} />
            </Box>
            <Typography variant="h5">You have cancelled the order.</Typography>
            <Box mt={1} mb={1}>
              <Divider className={classes.border} />
            </Box>

            <Box mt={4}>
              <Typography>Order Info</Typography>
            </Box>
            <Box className={classes.contentBox} mt={2}>
              <Box>
                <Typography variant="h5">Amount</Typography>
                <Typography variant="h4">₹ 200.00</Typography>
              </Box>
              <Box>
                <Typography variant="h5">Price</Typography>
                <Typography variant="h6">₹ 180.00</Typography>
              </Box>
              <Box>
                <Typography variant="h5">Quantity</Typography>
                <Typography variant="h6">1.5 USDT</Typography>
              </Box>
            </Box>
            <Box mt={3}>
              <Box>
                <Typography>Payment Method </Typography>
                <Typography style={{ color: "#848484", fontSize: "13px" }}>
                  Payment method can't be displayed for this order.
                </Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default OrderCancel;
