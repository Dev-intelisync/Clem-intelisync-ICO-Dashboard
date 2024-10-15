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
  DialogActions,
} from "@material-ui/core";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import React, { useState, useEffect } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { BiCopy } from "react-icons/bi";
import { toast } from "react-toastify";
import { useHistory, useLocation } from "react-router-dom";
import Tips from "@component/Tips";
// import ChatBox from "@component/ChatBox";
import { FiHeadphones } from "react-icons/fi";
import { MdLibraryBooks } from "react-icons/md";
import { FiUpload } from "react-icons/fi";
import axios from "axios";
import ApiConfig from "../../../config/APIConfig";
import { sortAddress } from "@utils";
import ButtonCircularProgress from "../../../component/ButtonCircularProgress";

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
    "& h2": {
      fontSize: "16px",
    },
    "& h1": {
      color: theme.palette.text.primary,
      // color: "#848484",
      fontSize: "14px",
      fontWeight: "300",
    },
    "& h4": {
      fontSize: "16px",
      color: theme.palette.text.primary,
      marginTop: "5px",
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
  CancelBtn: {
    color: "#848484",
    padding: "9px 30px !important",
    fontSize: "14px",
    border: "1px solid #1069C2",
    borderRadius: "4px",
    backgroundColor: "#fff",
    boxShadow: "0px 13px 27px rgb(0 0 0 / 25%)",
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
  const location = useLocation();
  const [value, setValue] = React.useState("female");
  const [open, setOpen] = useState(false);
  const [block, setBlock] = useState(false);
  const [block1, setBlock1] = useState(false);
  const [block4, setBlock4] = useState(false);
  const [block6, setBlock6] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [coin, setcoin] = useState("all");
  const [reasons, setReasons] = useState("NA");
  const [orderId, setOrderId] = useState("");
  const [receiverId, setReceiverId] = useState("");
  const [chatId, setChatId] = useState("");
  const [bankId, setBankId] = useState({});
  const [imgeUrl, setImgeUrl] = useState("");

  useEffect(() => {
    const userId = location.search.split("?")[1];
    const orderId = location.hash.split("#")[1];
    const chatIddd = location.state;
    if (location) {
      setReceiverId(userId);
      setOrderId(orderId);
      setChatId(chatIddd?.chatId ? chatIddd?.chatId : chatIddd);
      setBankId(chatIddd?.bankId);
    }
  }, [location]);

  const [formData, setFormData] = useState({
    p2pAdvertisementId: "",
    description: "",
    mobileNumber: "",
    image: "",
    reason: "",
    chatId: "",
  });
  const _onInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const temp = { ...formData, [name]: value };
    setFormData(temp);
  };
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
  const handleClickOpen3 = () => {
    setBlock1(true);
  };
  const handleClickOpen4 = () => {
    setBlock4(true);
  };

  const handleClose6 = () => {
    setBlock6(false);
  };
  const handleClickOpen6 = () => {
    setBlock6(true);
  };
  const history = useHistory();

  const tradeId = window.location.search.split("?")[1];
  const peerToPeerExchangeId = window.location.hash.split("#")[1];

  const appealHAnler = async () => {
    setIsLoading(true);

    const bodyFormData = new FormData();

    bodyFormData.append("p2pAdvertisementId", orderId);
    bodyFormData.append("description", formData.description);
    bodyFormData.append("mobileNumber", formData.mobileNumber);
    bodyFormData.append("reason", formData.reason);
    bodyFormData.append("image", imgeUrl);
    bodyFormData.append("chatId", chatId);
    try {
      const res = await axios({
        method: "POST",
        url: ApiConfig.appel,
        headers: {
          token: window.localStorage.getItem("token"),
        },
        data: bodyFormData,
      });
      if (res.data.responseCode === 200) {
        setIsLoading(false);
        toast.success(res.data.responseMessage);
        setBlock6(false);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
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
                {/* <Box style={{ display: "flex", alignItems: "center" }}>
                  <Typography variant="h2">Created time:</Typography>
                  &nbsp;&nbsp;
                  <Typography variant="h6">20-05-2022 10:50 am</Typography>
                </Box> */}
                <Box style={{ display: "flex", alignItems: "center" }}>
                  <Typography variant="h2">Order Number:</Typography>
                  &nbsp;&nbsp;
                  <Typography variant="h6">
                    {sortAddress(orderId)}
                    <CopyToClipboard text={orderId}>
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
              {/* <Box>
                <Typography variant="h5">Amount</Typography>
                <Typography
                  variant="h6"
                  style={{ color: "#32BD48", fontSize: "18px" }}
                >
                  10000
                </Typography>
              </Box> */}
              {/* <Box>
                <Typography variant="h5">Price</Typography>
                <Typography variant="h6">4,500.00 INR</Typography>
              </Box>
              <Box>
                <Typography variant="h5">Quantity</Typography>
                <Typography variant="h6">0.0025487548 BNB</Typography>
              </Box> */}
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
                  <Typography variant="h4">
                    {" "}
                    {bankId?.bankCode === "MICR" ? "MICR" : ""}{" "}
                    {bankId?.bankCode === "SHORTCODE" ? "SORT" : ""}{" "}
                    {bankId?.bankCode === "IFSC" ? "IFSC" : ""} Code
                  </Typography>
                  <Typography variant="h1">
                    {bankId?.ifscCode}
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
                    {bankId?.holderName}
                    {/* <CopyToClipboard text={bankId?.holderName}>
                      <BiCopy
                        style={{
                          color: "#848484",
                          fontSize: " 20px",
                          cursor: "pointer",
                          marginLeft: "5px",
                        }}
                        onClick={() => toast.success("Copied successfully")}
                      />
                    </CopyToClipboard> */}
                  </Typography>
                  <Typography variant="h4">Account Number</Typography>
                  <Typography variant="h1">
                    {bankId?.accountNumber}
                    <CopyToClipboard text={bankId?.accountNumber}>
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
                  To be released{" "}
                  <span style={{ color: "#D78D64" }}>00:22:44</span>
                </Typography>
                <Typography style={{ color: "#848484", fontSize: "13px" }}>
                  Expected to receive assets in 15 minutes.
                </Typography>
              </Box>
            </Box>
            <Box mt={4} mb={2} className={classes.otherButton}>
              <Button
                // variant="contained"
                className="buyBtn"
                onClick={() => {
                  handleClickOpen3();
                }}
              >
                Appeal
              </Button>
              &nbsp;&nbsp;&nbsp;
              <Button
                className="buyBtn"
                onClick={() => {
                  handleClickOpen2();
                }}
                // onClick={() => history.push("/orderCancel")}
              >
                Cancel Order
              </Button>
            </Box>
          </Box>
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          {/* <ChatBox orderId={orderId} receiverId={receiverId} chatId={chatId} /> */}
        </Grid>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Tips />
        </Grid>
      </Grid>
      <Dialog
        fullWidth="xs"
        maxWidth="xs"
        open={block}
        keepMounted
        onClose={handleClose2}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent>
          <Box>
            <Box align="center">
              <Typography align="" variant="h5">
                Cancel Order
              </Typography>
            </Box>
          </Box>

          <Box mt={2}>
            <Typography align="center" style={{ fontSize: "16px" }}>
              Are you sure you want to cancel this order ?
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
            onClick={() => history.push("/orderCancel")}
            color="primary"
          >
            Confirm
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
          </Box>

          <Typography style={{ fontSize: "12px" }}>Before appealing</Typography>
          <Box mt={2} style={{ display: "flex", alignItems: "center" }}>
            <Box>
              <MdLibraryBooks style={{ fontSize: "35px", color: "#2C69C0" }} />
            </Box>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Typography align="center" style={{ fontSize: "12px" }}>
              You can upload proof of payment and account info in the chatbox to
              help both sides to verify the payment.
            </Typography>
          </Box>
          <Box mt={2} style={{ display: "flex", alignItems: "center" }}>
            <Box>
              <FiHeadphones style={{ fontSize: "35px", color: "#2C69C0" }} />
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
            // onClick={() => {
            //   AfterPressDisputeButton();
            // }}
            onClick={() => {
              handleClickOpen6();
            }}
            disabled={isLoading}
          >
            Appeal {isLoading && <ButtonCircularProgress />}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        fullWidth="sm"
        maxWidth="sm"
        open={block6}
        keepMounted
        onClose={() => {
          if (!isLoading) {
            handleClose6();
          }
        }}
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
                {/* <InputLabel margin="dense">All</InputLabel> */}
                <Select
                  margin="dense"
                  style={{ padding: "5px" }}
                  // label="All "
                  name="reason"
                  className={classes.forminput}
                  onChange={_onInputChange}
                  value={formData.reason}
                >
                  <MenuItem value="all" style={{ fontSize: "12px" }}>
                    Please select
                  </MenuItem>
                  <MenuItem value="wallet" style={{ fontSize: "12px" }}>
                    Wallet issue
                  </MenuItem>
                  <MenuItem value="amount" style={{ fontSize: "12px" }}>
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
                {/* <InputLabel margin="dense">All</InputLabel> */}
                <TextField
                  placeholder="Enter description"
                  variant="outlined"
                  className="textFeilds"
                  name="description"
                  value={formData.description}
                  onChange={_onInputChange}
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

                <input
                  className={classes.inputF}
                  accept="image/*, application/pdf,doc,.docx,.xls,.xlsx"
                  multiple
                  type="file"
                  name="imageUrl"
                  onChange={(e) => {
                    setImgeUrl(e.target.files[0]);
                  }}
                />
              </Box>
            </Box>
            <Box>
              <label style={{ marginBottom: "-5px" }}>Phone(Mandatory)</label>
              <FormControl
                variant="outlined"
                fullWidth
                className={classes.forminput}
              >
                {/* <InputLabel margin="dense">All</InputLabel> */}
                <TextField
                  placeholder="Enter contact number"
                  variant="outlined"
                  className="textFeilds"
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={_onInputChange}
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
            // variant="contained"
            className={classes.CancelBtn}
            onClick={handleClose6}
            disabled={isLoading}
            color="primary"
          >
            Cancel
          </Button>
          <Button
            className={classes.CloseButton}
            onClick={() => appealHAnler()}
            color="primary"
            disabled={isLoading}
          >
            Appeal {isLoading && <ButtonCircularProgress />}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default BuySection;
