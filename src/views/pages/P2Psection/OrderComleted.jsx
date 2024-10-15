import { Typography, Box, Grid, Divider, makeStyles } from "@material-ui/core";
import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { BiCopy } from "react-icons/bi";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
// import ChatBox from "@component/ChatBox";
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
      color: theme.palette.text.primary,
      fontSize: "14px",
    },
    "& h1": {
      color: theme.palette.text.primary,

      fontSize: "16px",
    },
    "& h4": {
      fontSize: "16px",
      color: theme.palette.text.primary,
      // color: "#848484",
    },
    "& h6": {
      color: theme.palette.text.primary,
      // color: "#848484",
      fontSize: "14px",
    },
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
  tipsBox: {
    background:
      "linear-gradient(180deg, rgba(0, 172, 235, 0.1) 0%, rgba(0, 176, 237, 0.1) 10.18%, rgba(16, 105, 194, 0.1) 70.35%, rgba(16, 105, 194, 0.1) 100%)",
    borderRadius: "10px",
    border: "1px solid #6ECFF3",
    marginTop: "40px",
    padding: "40px",
  },
  mainCard: {
    padding: "7px 13px 16px 17px",
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
  },
  payment: {
    background: theme.palette.background.taf,
    border: "1px solid #CBCBCB",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    borderRadius: "4px",
  },
}));
const OrderCompleted = () => {
  const classes = useStyles();

  return (
    <Box mt={5}>
      <Grid container spacing={2}>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <Box className={classes.mainBox}>
            <Box></Box>
            <Box
              mt={3}
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <Box>
                <Typography variant="h3">Buy USDT</Typography>
              </Box>
              <Box>
                <Box style={{ display: "flex", alignItems: "center" }}>
                  <Typography variant="h5">Created time:</Typography>
                  &nbsp;&nbsp;
                  <Typography variant="h6">2021-01-20 10:50:21</Typography>
                </Box>
                <Box style={{ display: "flex", alignItems: "center" }}>
                  <Typography variant="h5">Order Number:</Typography>
                  &nbsp;&nbsp;
                  <Typography variant="h6">
                    201598745314563589
                    <CopyToClipboard text={"201598745314563589"}>
                      <BiCopy
                        style={{
                          color: "#848484",
                          fontSize: " 20px",
                          cursor: "pointer",
                          marginLeft: "5px",
                        }}
                        onClick={() => toast.success("Copied successfully")}
                      />
                    </CopyToClipboard>
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box mt={1} mb={1}>
              <Divider className={classes.border} />
            </Box>
            <Box
              mt={3}
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <Box>
                <Typography variant="h5">Amount</Typography>
                <Typography
                  variant="h6"
                  style={{ color: "#32BD48", fontSize: "18px" }}
                >
                  10000
                </Typography>
              </Box>
              <Box>
                <Typography variant="h5">Price</Typography>
                <Typography variant="h6">4,500.00 INR</Typography>
              </Box>
              <Box>
                <Typography variant="h5">Quantity</Typography>
                <Typography variant="h6">0.0025487548 BNB</Typography>
              </Box>
            </Box>
            <Box mt={4}>
              <Box className={classes.payment}>
                <Box
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    style={{ color: "#848484", padding: "10px 0px 7px 17px" }}
                  >
                    Paid to the account below :
                  </Typography>
                  <Typography
                    variant="h5"
                    style={{ padding: "10px 15px 7px 0px" }}
                  >
                    All Payments
                  </Typography>
                </Box>
                <Divider />
                <Box mt={1} className={classes.mainCard}>
                  <Typography variant="h4">Bank Transfer (India)</Typography>
                  <Typography variant="h4">IFSC code</Typography>
                  <Typography variant="h1">
                    9875546
                    <CopyToClipboard text={"9875546"}>
                      <BiCopy
                        style={{
                          color: "#848484",
                          fontSize: " 20px",
                          cursor: "pointer",
                          marginLeft: "5px",
                        }}
                        onClick={() => toast.success("Copied successfully")}
                      />
                    </CopyToClipboard>
                  </Typography>
                  <Typography variant="h4">Account holder name </Typography>
                  <Typography variant="h1">
                    SBIN0007488{" "}
                    <CopyToClipboard text={"SBIN0007488"}>
                      <BiCopy
                        style={{
                          color: "#848484",
                          fontSize: " 20px",
                          cursor: "pointer",
                          marginLeft: "5px",
                        }}
                        onClick={() => toast.success("Copied successfully")}
                      />
                    </CopyToClipboard>
                  </Typography>
                  <Typography variant="h4">Account number</Typography>
                  <Typography variant="h1">
                    8452125126125212615125214
                    <CopyToClipboard text={"8452125126125212615125214"}>
                      <BiCopy
                        style={{
                          color: "#848484",
                          fontSize: " 20px",
                          cursor: "pointer",
                          marginLeft: "5px",
                        }}
                        onClick={() => toast.success("Copied successfully")}
                      />
                    </CopyToClipboard>
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box mt={3}>
              <Box>
                <Typography>Order Completed</Typography>
                <Typography>
                  Assets is now in P2P account. &nbsp;&nbsp;&nbsp;
                  <span style={{ color: "#D78D64" }}>Check my account</span>
                </Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          {/* <ChatBox /> */}
        </Grid>
      </Grid>
    </Box>
  );
};

export default OrderCompleted;
