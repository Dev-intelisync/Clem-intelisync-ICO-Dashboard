import {
  Typography,
  Box,
  Grid,
  Button,
  Divider,
  Select,
  MenuItem,
  FormControl,
  TextField,
  makeStyles,
  Dialog,
  DialogContent,
  Checkbox,
  DialogActions,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { BiCopy } from "react-icons/bi";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { FiUpload } from "react-icons/fi";
// import ChatBox from "@component/ChatBox";
import Tips from "@component/Tips";
import { FiHeadphones } from "react-icons/fi";
import { MdLibraryBooks } from "react-icons/md";
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
    "& h4": {
      fontSize: "16px",
      color: "#848484",
    },
    "& h6": {
      fontFamily: "'Inter'",
      fontStyle: "normal",
      fontWeight: "400",
      fontSize: "14px",
      lineHeight: "17px",
      color: "#696969",
    },
  },
  CancelBtn: {
    color: "#848484",
    padding: "9px 30px !important",
    fontSize: "14px",
    border: "1px solid #1069C2",
    borderRadius: "4px",
    backgroundColor: "#fff",
    boxShadow: "0px 13px 27px rgb(0 0 0 / 25%)",
  },
  Titleuplaod: {
    "& h5": {
      fontSize: "15px",
    },
    "& p": {
      fontSize: "14px",
      color: theme.palette.text.primary,
    },
  },
  mainCard: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    paddingBottom: "8px",
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
      background:
        "linear-gradient(180deg, #00ACEB 0%, #00B0ED 10.18%, #1069C2 70.35%, #1069C2 100%)",
      boxShadow: " 0px 13px 27px rgb(0 0 0 / 25%)",
    },
  },
  TextBox: {
    borderRadius: "10px",
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
  mainBoxTitle: {
    "& h4": {
      color: theme.palette.text.primary,
      fontSize: "14px",
      lineHeight: "24px",
    },
  },
  payment: {
    background: theme.palette.background.CardP2P,
    border: "1px solid #CBCBCB",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    borderRadius: "4px",

    "& h5": {
      color: theme.palette.text.primary,
      paddingLeft: "82px",
      fontWeight: "500",
      textAlign: "center",
    },
  },
  DialogBox: {
    color: theme.palette.text.primary,
  },
  subtilevalue: {
    "& h6": {
      fontFamily: "'Inter'",
      fontStyle: "normal",
      fontWeight: "400",
      fontSize: "14px",
      lineHeight: "24px",
      color: "#696969",
    },
  },
  fileicon: {
    marginTop: "15px",
    marginBottom: "40px",

    width: "90px",
  },
  uploadicon1: {
    cursor: "pointer",
    padding: "20px",
    paddingTop: "25px",

    position: "relative",
    background: "#F3F2F9",
    boxSizing: "border-box",
    borderRadius: "10px",
    textAlign: "center",
  },
  inputF: {
    top: "0",
    left: "0",
    width: "100%",
    cursor: "pointer",
    height: "100%",
    opacity: "0",
    position: "absolute",
  },
}));
const BuySection = () => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [block, setBlock] = useState(false);
  const [block1, setBlock1] = useState(false);
  const [block4, setBlock4] = useState(false);
  const history = useHistory();
  const [coin, setcoin] = useState("all");
  const [tabview, setTabView] = useState("openticket");
  // const locationState = location.state;

  const [openticketdialog, setopenticketdialog] = useState(false);

  // useEffect(() => {
  //   // const locationState = location.state;
  //   // if (locationState) {
  //   //   if (locationState.tabview === "KycDetail") {
  //   //     setTabView("KycDetail");
  //   //   }
  //   // }
  // }, [location.state]);

  const handleClose2 = () => {
    setBlock(false);
  };
  const handleClickOpen2 = () => {
    setBlock(true);
  };

  const handleClose3 = () => {
    setBlock1(false);
  };
  const handleClickOpen3 = () => {
    setBlock1(true);
  };

  const handleClose4 = () => {
    setBlock4(false);
  };
  const handleClickOpen4 = () => {
    setBlock4(true);
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
                <Box
                  style={{
                    padding: "8px",
                  }}
                >
                  <Typography variant="h5">My Paymenthod</Typography>
                </Box>
                <Divider />
                <Box mt={1} className={classes.mainCard}>
                  <Box>
                    <img src="/images/IMPS.png" alt="" width="100%" />
                  </Box>
                  <Box className={classes.mainBoxTitle}>
                    <Typography variant="h4">UPI ID</Typography>
                    <Typography variant="h4">Name</Typography>
                  </Box>
                  <Box className={classes.subtilevalue}>
                    <Typography variant="h6">
                      1234@abc
                      <CopyToClipboard text={"1234@abc"}>
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

                    <Typography variant="h6">Danny</Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box mt={3}>
              <Box>
                <Typography>
                  Payment to be made by buyer{" "}
                  <span style={{ color: "#D78D64" }}>00:22:44</span>
                </Typography>
                <Typography style={{ color: "#848484", fontSize: "13px" }}>
                  Buyer has not paid, please wait patiently
                </Typography>
              </Box>
            </Box>
            <Box mt={4} mb={2} className={classes.otherButton}>
              <Button
                // variant="contained"
                className="buyBtn"
                onClick={() => {
                  handleClickOpen2();
                }}
              >
                Confirm Release
              </Button>
              &nbsp;&nbsp;&nbsp;
              <Button
                className="sellBtn"
                onClick={() => {
                  handleClickOpen3();
                }}
              >
                Appeal
              </Button>
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
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
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
          <Typography align="center" style={{ fontSize: "16px" }}>
            Be sure to confirm receipt of the payment.
          </Typography>
          <Box style={{ display: "flex", marginTop: "5px" }}>
            <Checkbox />
            <Typography style={{ marginTop: "3px" }}>
              I have confirmed that the payment was correct
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
            className={classes.CancelBtn}
            onClick={handleClose2}
            color="primary"
          >
            Cancel
          </Button>
          <Button
            className={classes.CloseButton}
            onClick={() => history.push("/sellbnb")}
            color="primary"
          >
            Appeal
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        fullWidth="xs"
        maxWidth="xs"
        open={block1}
        keepMounted
        onClose={handleClose3}
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
            <Divider />
          </Box>
          <Box mt={1}>
            <Typography style={{ fontSize: "14px" }}>
              Before appealing
            </Typography>
          </Box>

          <Box mt={2} style={{ display: "flex", alignItems: "center" }}>
            <Box>
              <MdLibraryBooks style={{ fontSize: "35px", color: "#2C69C0" }} />
            </Box>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Typography style={{ fontSize: "14px" }}>
              You can upload proof of payment and account info in the chatbox to
              help both sides to verify the payment.
            </Typography>
          </Box>
          <Box mt={2} style={{ display: "flex", alignItems: "center" }}>
            <Box>
              <FiHeadphones style={{ fontSize: "35px", color: "#2C69C0" }} />
            </Box>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Typography style={{ fontSize: "14px" }}>
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
            className={classes.CancelBtn}
            onClick={handleClose3}
            color="primary"
          >
            Cancel
          </Button>
          <Button
            className={classes.CloseButton}
            // onClick={handleClose4}
            color="primary"
            onClick={() => {
              handleClickOpen4();
            }}
          >
            Appeal
          </Button>
        </DialogActions>
      </Dialog>

      {/* Appeal Popup */}
      <Dialog
        fullWidth="sm"
        maxWidth="sm"
        open={block4}
        keepMounted
        onClose={handleClose4}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent>
          <Box className={classes.DialogBox}>
            <Box mb={1}>
              <Box align="center" mb={1}>
                <Typography align="" variant="h5">
                  Appeal
                </Typography>
              </Box>
              <Divider />
            </Box>

            <Typography style={{ fontSize: "14px" }}>
              1. &nbsp;Reason for appeal and proofs are visible to both parties
              and CS. Please avoid.
            </Typography>
            <Typography style={{ fontSize: "14px" }}>
              2. &nbsp; Baseless appeal request can result in banning of the
              account.
            </Typography>
            <Box>
              <label>Reason for Appeal (Mandatory)</label>
              <FormControl
                variant="outlined"
                fullWidth
                className={classes.forminput}
              >
                <Select
                  margin="dense"
                  style={{ padding: "5px" }}
                  // label="All "
                  name="token"
                  className={classes.forminput}
                  onChange={(e) => setcoin(e.target.value)}
                  value={coin}
                >
                  <MenuItem value="all" style={{ fontSize: "12px" }}>
                    Please select
                  </MenuItem>
                  <MenuItem value="btc" style={{ fontSize: "12px" }}>
                    Wallet issue
                  </MenuItem>
                  <MenuItem value="eth" style={{ fontSize: "12px" }}>
                    Amount
                  </MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box>
              <label style={{ marginBottom: "-5px" }}>Description</label>
              <FormControl
                variant="outlined"
                fullWidth
                className={classes.forminput}
              >
                <TextField
                  placeholder="Enter description"
                  variant="outlined"
                  className="textFeilds"
                  multiline
                  rows={4}
                  InputProps={{
                    className: classes.TextBox,
                  }}
                />
              </FormControl>
            </Box>
            <Box mt={2}>
              <Box className={classes.Titleuplaod}>
                <Typography variant="h5">Upload proof (Mandatory)</Typography>
                <Typography variant="body1">
                  Screenshots, recording, documents of payment and communication
                  log. Size 50MB
                </Typography>
              </Box>
            </Box>

            <Box className={classes.fileicon}>
              <Box className={classes.uploadicon1}>
                <FiUpload style={{ fontSize: "40px", color: "#8A8A8A" }} />

                <input type="file" className={classes.inputF} />
              </Box>
            </Box>

            <Box>
              <label style={{ marginBottom: "-5px" }}>Phone(Mandatory)</label>
              <FormControl
                variant="outlined"
                fullWidth
                className={classes.forminput}
              >
                <TextField
                  placeholder="Enter contact number"
                  variant="outlined"
                  className="textFeilds"
                  InputProps={{
                    className: classes.TextBox,
                  }}
                />
              </FormControl>
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
            className={classes.CancelBtn}
            onClick={handleClose4}
            color="primary"
          >
            Cancel
          </Button>
          <Button
            className={classes.CloseButton}
            onClick={() => history.push("/p2p")}
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
