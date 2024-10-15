// import ChatBox from "@component/ChatBox";
import {
  Typography,
  Box,
  Grid,
  Button,
  IconButton,
  Divider,
  makeStyles,
  Dialog,
  DialogContent,
  DialogActions,
  Checkbox,
} from "@material-ui/core";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { BiCopy } from "react-icons/bi";
import { toast } from "react-toastify";
import Tips from "@component/Tips";

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
      fontSize: "18px",
    },
    "& h6": {
      fontFamily: "'Inter'",
      fontStyle: "normal",
      fontWeight: "400",
      fontSize: "14px",
      lineHeight: "17px",
      color: "#696969",
    },
    "& h1": {
      color: "#848484",
      fontSize: "14px",
    },
    "& h4": {
      fontSize: "16px",
      color: "#848484",
    },
    "& h6": {
      color: "#848484",
      fontSize: "14px",
    },
  },
  mainCard: {
    padding: "7px 13px 16px 17px",
    "& h4": {
      color: theme.palette.text.primary,
      marginTop: "8px",
    },
    "& h1": {
      color: theme.palette.text.primary,
      fontWeight: "400",
      fontSize: "14px",
    },
  },

  payment: {
    background: theme.palette.background.taf,
    border: "1px solid #CBCBCB",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    borderRadius: "4px",
    "& h5": {
      color: theme.palette.text.primary,
      paddingLeft: "82px",
      fontWeight: "500",
    },
  },
}));
const BuySection = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState("female");
  const [open, setOpen] = useState(false);
  const [block, setBlock] = useState(false);
  const [block1, setBlock1] = useState(false);

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const handleClose2 = () => {
    setBlock(false);
  };
  const handleClickOpen2 = () => {
    setBlock(true);
  };
  const handleChange1 = (event) => {
    setValue(event.target.value);
  };
  const handleClose3 = () => {
    setBlock1(false);
  };

  return (
    <Box mt={5}>
      <Grid container spacing={2}>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <Box className={classes.mainBox}>
            <Box>
              <Typography variant="h3">Sell BNB</Typography>
            </Box>
            <Box
              mt={3}
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <Box>
                <Typography variant="h5">Amount</Typography>
                <Typography
                  variant="h6"
                  style={{
                    color: "#D83636",
                    fontSize: "17px",
                    fontWeight: "500",
                  }}
                >
                  100.00
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
                <Box>
                  <Typography
                    variant="h5"
                    style={{ padding: "10px 0px 7px 17px" }}
                  >
                    Paid to the account below :
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
                <Typography>
                  Order Completed &nbsp;&nbsp;&nbsp;
                  <span style={{ color: "#D78D64" }}>Check my account</span>
                </Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          {/* <ChatBox /> */}
        </Grid>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Tips />
        </Grid>
      </Grid>
      <Dialog
        fullWidth="xs"
        maxWidth="xs"
        open={block}
        // TransitionComponent={Transition}
        keepMounted
        onClose={handleClose2}
      >
        <DialogContent>
          <Box>
            <Box align="center">
              <img src="/images/relese.png" alt="" width="20%" />
            </Box>
          </Box>
          <Typography align="center" variant="h5">
            Confirm release
          </Typography>
          <Typography align="center" style={{ fontSize: "12px" }}>
            Be sure to confirm receipt of the payment.
          </Typography>
          <Box mt={2}>
            <Box style={{ display: "flex", marginTop: "5px" }}>
              <Checkbox />
              <Typography style={{ marginTop: "3px", fontSize: "16px" }}>
                I have confirmed that the payment was correct
              </Typography>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          <Button
            // variant="contained"
            className={classes.CloseButton}
            onClick={handleClose2}
            color="primary"
          >
            Cancel
          </Button>
          <Button className={classes.CloseButton} color="primary">
            Appeal
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        fullWidth="xs"
        maxWidth="xs"
        open={block1}
        keepMounted
        onClose={handleClose2}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent>
          <Box>
            <Box align="center">
              <Typography align="" variant="h5">
                Tips
              </Typography>
            </Box>
          </Box>

          <Typography style={{ fontSize: "12px" }}>
            Before appealing2
          </Typography>
          <Box mt={2} style={{ display: "flex", alignItems: "center" }}>
            <Box>
              <IconButton>
                <LibraryBooksIcon style={{ fontSize: "30px", color: "#fff" }} />
              </IconButton>
            </Box>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Typography align="center" style={{ fontSize: "12px" }}>
              You can upload proof of payment and account info in the chatbox to
              help both sides to verify the payment.
            </Typography>
          </Box>
          <Box mt={2} style={{ display: "flex", alignItems: "center" }}>
            <Box>
              <IconButton>
                <LibraryBooksIcon style={{ fontSize: "30px", color: "#fff" }} />
              </IconButton>
            </Box>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Typography align="center" style={{ fontSize: "12px" }}>
              You can upload proof of payment and account info in the chatbox to
              help both sides to verify the payment.
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          <Button
            // variant="contained"
            className={classes.CloseButton}
            onClick={handleClose3}
            color="primary"
          >
            Cancel
          </Button>
          <Button
            className={classes.CloseButton}
            // onClick={handleClose4}
            color="primary"
          >
            Appeal
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default BuySection;
