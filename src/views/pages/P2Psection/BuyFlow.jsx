import {
  Typography,
  Box,
  Grid,
  Button,
  Divider,
  FormHelperText,
  FormControl,
  TextField,
  makeStyles,
  Dialog,
  DialogContent,
  FormControlLabel,
  RadioGroup,
  Radio,
  DialogActions,
} from "@material-ui/core";
import React, { useState, useEffect, useContext } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { BiCopy } from "react-icons/bi";
import { toast } from "react-toastify";
// import ChatBox from "@component/ChatBox";
import Tips from "@component/Tips";
import axios from "axios";
import ApiConfig from "../../../config/APIConfig";
import ButtonCircularProgress from "@component/ButtonCircularProgress";
import Axios from "axios";
import { AuthContext } from "@context/Auth";
import { calculateTimeLeft } from "@utils/index";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  mainBox: {
    "& h2": {
      fontSize: "20px",
    },
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
      fontSize: "14px",
    },
    "& h6": {
      color: "#848484",
      fontSize: "12px",
    },
  },
  contentBox: {
    "& h3": {
      fontSize: "18px",
    },
    "& h5": {
      color: "#848484",
      fontSize: "16px",
      marginTop: "5px",
    },
    "& h6": {
      color: theme.palette.text.primary,
      fontSize: "14px",
    },
  },
  mainCard: {
    "& h1": {
      fontSize: "15px",
      fontWeight: "400",
    },
    "& h4": {
      fontSize: "16px",
      marginTop: "5px",
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
  responsiveGroup: {
    "@media(max-width:600px)": {
      display: "flex",
      flexDirection: "row",
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
  girdClass: {
    paddingTop: "25px",
    "@media(max-width:600px)": {
      paddingTop: "0px",
    },
  },
}));

const BuySection = () => {
  const auth = useContext(AuthContext);

  const classes = useStyles();
  const history = useHistory();
  const [reason, setReason] = useState("");
  const [value, setValue] = useState("male");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading1, setIsLoading1] = useState(false);
  const [block, setBlock] = useState(false);
  const [block1, setBlock1] = useState(false);
  const [radioTab, setRadioTab] = useState("UPI");
  const [receiverId, setReceiverId] = useState("");
  const [orderId, setOrderId] = useState("");
  const [userId, setUserId] = useState("");
  const [chatId, setChatId] = useState("");
  const [bankId, setBankId] = useState({});
  const [timeOutChat, setTimeOutChat] = useState();
  const [timeOutChat1, setTimeOutChat1] = useState(0);
  const [isTimeOutChat, setIsTimeOutChat] = useState(false);
  const [approve, setApprove] = useState(false);

  const chattingHancler = async (id) => {
    try {
      if (!isTimeOutChat) {
        setIsTimeOutChat(false);
        const res = await Axios({
          method: "GET",
          url: ApiConfig.chat + id,
          headers: {
            token: localStorage.getItem("token"),
          },
        });
        if (res.data.responseCode === 200) {
          // toast.success("chat found");
          // let timex = res?.data?.result?.lockTime;
          // setTimeOutChat1(res?.data?.result?.lockTime);
          setIsTimeOutChat(true);
          // setTimeOutChat(res?.data?.result);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const location = useLocation();

  useEffect(() => {
    const userId = location.search.split("?")[1];
    const orderId = location.hash.split("#")[1];
    const chatIddd = location.state;

    if (location) {
      setReceiverId(userId);
      setOrderId(orderId);
      setChatId(chatIddd?.chatId ? chatIddd?.chatId : chatIddd);
      setUserId(chatIddd?.userId);
      // setChatId(chatIddd?.chatID ? chatIddd?.chatID : chatIddd);
      chattingHancler(chatIddd?.chatId ? chatIddd?.chatId : chatIddd);
      setBankId(chatIddd?.bankID);
      setTimeOutChat1(moment().add(Number(chatIddd?.timeOut), "m").unix());
      // moment().add(Number(timeOutChat1), "m").unix()
    }
  }, [location]);

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const handleClose2 = () => {
    setBlock(false);
  };
  const handleClickOpen2 = (iddd) => {
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

  const tradeId = window.location.search.split("?")[1];
  const peerToPeerExchangeId = window.location.hash.split("#")[1];
  // console.log(
  //   tradeId,
  //   "<<<<<<<-------tradeId-------peerToPeerExchangeId------>>>>>",
  //   peerToPeerExchangeId
  // );
  const CancleMessageAfterPaidButton = async () => {
    setIsLoading(true);
    try {
      const res = await axios({
        method: "POST",
        url: ApiConfig.sendMessageAfterCancelTradeButton,

        headers: {
          token: window.localStorage.getItem("token"),
        },
        params: {
          tradeId: tradeId,
          cancelReason: reason,
        },
      });
      if (res.data.status === 200) {
        toast.success(res.data.message);
        // auth.ViewStakeHandler();
        // handleClose3();orderCancel
        history.push("/orderCancel");
        setReason("");
        handleClose3();
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  const SendMessageAfterPaidButton = async () => {
    setIsLoading(true);
    try {
      const res = await axios({
        method: "POST",
        url: ApiConfig.sendMessageAfterPaidButton,
        headers: {
          token: window.localStorage.getItem("token"),
        },
        params: {
          tradeId: tradeId,
        },
      });
      if (res.data.status === 200) {
        toast.success(res.data.message);
        history.push({
          pathName: "/buyUSDT",
          search: tradeId,
          hash: peerToPeerExchangeId,
        });
        // auth.ViewStakeHandler();
        // handleClose3();
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  // bank detail

  const confirmP2PAdvertisementPaymentHandler = async () => {
    setIsLoading(true);
    try {
      const res = await Axios({
        method: "PATCH",
        url: ApiConfig.confirmP2PAdvertisementMoneyPaid,
        headers: {
          token: localStorage.getItem("token"),
        },
        data: {
          _id: orderId,
          chatId: chatId,
        },
      });
      if (res.data.responseCode === 200) {
        toast.success(res.data.responseMessage);
        history.push({
          pathname: "/buyUSDT",
          search: receiverId,
          hash: orderId,
          state: {
            chatId: chatId,
            bankId: bankId,
          },
        });
        setIsLoading(false);
        setBlock(false);
      }
      setIsLoading(false);
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.responseMessage);
      } else {
        toast.error(error.message);
      }
      setIsLoading(false);
    }
  };

  const approveTransaction = async () => {
    setIsLoading(true);
    try {
      const res = await Axios({
        method: "PATCH",
        url: ApiConfig.confirmP2PAdvertisementPayment,
        headers: {
          token: localStorage.getItem("token"),
        },
        data: {
          _id: orderId,
          chatId: chatId,
        },
      });
      if (res.data.responseCode === 200) {
        toast.success(res.data.responseMessage);
        history.push("/Allorderdata");
        setIsLoading(false);
        setApprove(false);
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };
  const rejectTransaction = async () => {
    setIsLoading1(true);
    try {
      const res = await Axios({
        method: "POST",
        url: "",
      });
      if (res) {
        setApprove(false);
      }
    } catch (error) {
      setIsLoading1(false);
      console.log(error);
    }
  };
  const [timeStartLeft, setTimeStartLeft] = useState(calculateTimeLeft());
  const [timeLimit, setTimeLimit] = useState();
  useEffect(() => {
    const timer = setTimeout(() => {
      if (timeLimit) {
        setTimeStartLeft(calculateTimeLeft(timeOutChat1));
        // setTimeStartLeft(
        // calculateTimeLeft(moment().add(Number(timeOutChat1), "m").unix())
        // );
      }
    }, 1000);
    return () => clearTimeout(timer);
  });

  return (
    <Box mt={5}>
      <Grid container spacing={3}>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <Box className={classes.mainBox}>
            <Box style={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="h3">Buy USDT</Typography>
              <Box>
                <Box style={{ display: "flex", alignItems: "center" }}>
                  <Typography variant="h5">Created time:</Typography>
                  &nbsp;&nbsp;
                  {timeOutChat && timeOutChat?.createdAt != undefined && (
                    <Typography variant="h6">
                      {/* {moment(timeOutChat.createdAt).format("lll")} */}
                    </Typography>
                  )}
                </Box>
                <Box style={{ display: "flex", alignItems: "center" }}>
                  <Typography variant="h5">Order Number:</Typography>
                  &nbsp;&nbsp;
                  <Typography variant="h6">
                    {timeOutChat?.lockedAmountP2PId}
                    <CopyToClipboard text={timeOutChat?.lockedAmountP2PId}>
                      <BiCopy
                        style={{
                          color: "#848484",
                          fontSize: " 20px",
                          cursor: "pointer",
                          marginLeft: "5px",
                        }}
                        onClick={() => toast.success("Copied successfully")}
                      />
                    </CopyToClipboard>{" "}
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box mt={1} mb={1}>
              <Divider className={classes.border} />
            </Box>

            <Box mt={4}>
              {auth?.userData?._id === userId ? (
                <Typography variant="h2">Bank Details</Typography>
              ) : (
                <Typography variant="h2">My Payment Method</Typography>
              )}

              {auth?.userData?._id != userId && (
                <Grid container spacing={1}>
                  <Grid item lg={6} md={6} sm={6} xs={12}>
                    <Box>
                      <FormControl component="fieldset">
                        <RadioGroup
                          aria-label="gender"
                          name="gender1"
                          value={value}
                          className={classes.responsiveGroup}
                          onChange={handleChange}
                        >
                          <Box>
                            {bankId?.upiId && (
                              <FormControlLabel
                                value="male"
                                control={<Radio />}
                                onClick={() => {
                                  setRadioTab("UPI");
                                }}
                                label="UPI ID"
                              />
                            )}
                          </Box>
                          {/* <Box>
                            <FormControlLabel
                              value="female"
                              control={<Radio />}
                              onClick={() => {
                                setRadioTab("Paytm");
                              }}
                              label="Paytm"
                            />
                          </Box> */}
                          <Box>
                            <FormControlLabel
                              value="other"
                              control={<Radio />}
                              onClick={() => {
                                setRadioTab("Bank");
                              }}
                              label="Bank"
                            />
                          </Box>
                        </RadioGroup>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid
                    item
                    lg={6}
                    md={6}
                    sm={6}
                    xs={12}
                    className={classes.girdClass}
                    style={{ paddingTop: "25px" }}
                  >
                    {radioTab === "UPI" ? <UPI bankId={bankId} /> : ""}
                    {/* {radioTab === "Paytm" ? <Paytm bankId={bankId} /> : ""} */}
                    {radioTab === "Bank" ? <Bank bankId={bankId} /> : ""}
                  </Grid>
                </Grid>
              )}
            </Box>
            <Box mt={3}>
              <Box mb={1}>
                <Typography>
                  Payment to be made{" "}
                  {timeStartLeft ? (
                    <span style={{ color: "#D78D64" }}>
                      {timeStartLeft.minutes} : {timeStartLeft.seconds}
                    </span>
                  ) : (
                    "Cancelled"
                  )}
                </Typography>
                <Typography style={{ color: "#848484", fontSize: "13px" }}>
                  Please make a payment within 30:00 mins , otherwise , the
                  order will be cancelled.
                </Typography>
              </Box>
            </Box>
            {auth?.userData?._id === userId ? (
              <Button
                variant="contained"
                color="primary"
                onClick={() => setApprove(true)}
              >
                Approve
              </Button>
            ) : (
              <Box mt={4} mb={2} className={classes.otherButton}>
                {radioTab === "UPI" && (
                  <>
                    {bankId.bankType === "UPI" && (
                      <Button
                        // variant="contained"
                        className="buyBtn"
                        onClick={() => {
                          handleClickOpen2(bankId);
                        }}
                      >
                        Transfered, Next
                      </Button>
                    )}
                  </>
                )}
                {radioTab === "Bank" && (
                  <>
                    {bankId.bankType === "BANK" && (
                      <Button
                        // variant="contained"
                        className="buyBtn"
                        onClick={() => {
                          handleClickOpen2(bankId);
                        }}
                      >
                        Transfered, Next
                      </Button>
                    )}
                  </>
                )}
                &nbsp;&nbsp;&nbsp;
                <Button
                  className="buyBtn"
                  onClick={() => {
                    handleClickOpen3();
                  }}
                  // onClick={() => history.push("/orderCancel")}
                >
                  Cancel Order
                </Button>
              </Box>
            )}
            {approve && (
              <Dialog
                open={approve}
                onClose={() => {
                  if (!isLoading) {
                    setApprove(false);
                  }
                }}
              >
                <DialogContent>
                  <Typography>Are you sure want to approve ?</Typography>
                  <Box mt={1} mb={1} style={{ textAlign: "end" }}>
                    {/* <Button
                      disabled={isLoading || isLoading1}
                      variant="contained"
                      color="primary"
                      onClick={() => rejectTransaction()}
                    >
                      Reject {isLoading1 && <ButtonCircularProgress />}
                    </Button>
                    &nbsp; */}
                    <Button
                      disabled={isLoading || isLoading1}
                      variant="contained"
                      color="primary"
                      onClick={() => approveTransaction()}
                    >
                      Accept {isLoading && <ButtonCircularProgress />}
                    </Button>
                  </Box>
                </DialogContent>
              </Dialog>
            )}
          </Box>
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <Box align="center">
            {/* <ChatBox
              orderId={orderId}
              receiverId={receiverId}
              chatId={chatId}
            /> */}
          </Box>
        </Grid>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Tips />
        </Grid>
      </Grid>
      <Dialog
        fullWidth="sm"
        maxWidth="sm"
        open={block}
        keepMounted
        onClose={() => {
          if (!isLoading) {
            handleClose2();
          }
        }}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent className={classes.contentBox}>
          <Box>
            <Typography align="center" variant="h4">
              Payment
            </Typography>
            <Typography align="center" style={{ fontSize: "12px" }}>
              Please confirm the payment has been made to the seller.Malicious
              clicks lead to account frozen.
            </Typography>
          </Box>
          <Divider />
          <Box mt={2}>
            {bankId?.bankType === "UPI" && (
              <>
                <img
                  src={`https://chart.googleapis.com/chart?chs=300x300&cht=qr&chl=${bankId?.upiId}&choe=UTF-8`}
                  alt=""
                  style={{ width: "100%", objectFit: "cover" }}
                />
                <Typography variant="h5">Wallet ID</Typography>
                <Typography variant="h6">{bankId?.upiId}</Typography>
                <Typography variant="h5">Account holder name </Typography>
                <Typography variant="h6">{bankId?.holderName}</Typography>
              </>
            )}
            {bankId?.bankType === "BANK" && (
              <>
                <Typography variant="h3">Bank Transfer (India)</Typography>
                <Box mt={1}>
                  <Typography variant="h5">
                    {" "}
                    {bankId?.bankCode === "MICR" ? "MICR" : ""}{" "}
                    {bankId?.bankCode === "SHORTCODE" ? "SORT" : ""}{" "}
                    {bankId?.bankCode === "IFSC" ? "IFSC" : ""} Code
                  </Typography>
                  <Typography variant="h6">{bankId?.ifscCode}</Typography>
                  <Typography variant="h5">Account holder name </Typography>
                  <Typography variant="h6">{bankId?.holderName}</Typography>
                  <Typography variant="h5">Account number</Typography>
                  <Typography variant="h6">{bankId?.accountNumber}</Typography>
                </Box>
              </>
            )}
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
            onClick={confirmP2PAdvertisementPaymentHandler}
            // onClick={() => history.push("/buyUSDT")} //sendMessageAfterPaidButton
            color="primary"
            disabled={isLoading}
          >
            Confirm {isLoading && <ButtonCircularProgress />}
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
                Cancel Order
              </Typography>
            </Box>
          </Box>
          <Box mt={2} align="left">
            <label>Reason</label>
            <TextField
              className={`${classes.inputvalue} textFeilds`}
              placeholder="Enter reason.."
              size="small"
              variant="outlined"
              fullWidth
              type="text"
              // onChange={(e) =>
              //   _onInputChange("totalAmount", e.target.value)
              // }
              onChange={(e) => {
                setReason(e.target.value);
              }}
              onKeyPress={(event) => {
                if (event?.key === "-" || event?.key === "+") {
                  event.preventDefault();
                }
              }}
              value={reason}
              // name="oldpassword"
              // InputProps={{
              //   className: classes.TextBox,
              //   endAdornment: (
              //     <InputAdornment position="end">
              //       <Box style={{ color: "#848484" }}>USDT</Box>
              //     </InputAdornment>
              //   ),
              // }}
            />
            <FormHelperText error style={{ paddingLeft: "0px" }}>
              {/* {isSubmit &&
                              formData?.totalAmount == "" &&
                              " Enter total trading amount"} */}
            </FormHelperText>
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
            onClick={handleClose3}
            color="primary"
          >
            Cancel
          </Button>
          <Button
            className={classes.CloseButton}
            onClick={() => history.push("/p2p")} //CancleMessageAfterPaidButton
            // onClick={CancleMessageAfterPaidButton} //CancleMessageAfterPaidButton
            color="primary"
            disabled={isLoading}
          >
            Confirm {isLoading && <ButtonCircularProgress />}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default BuySection;

const UPI = ({ bankId }) => {
  const classes = useStyles();
  return (
    <>
      <Box mt={1} className={classes.mainCard}>
        <Typography variant="h4">E Wallet Details</Typography>
        <Typography variant="h4">Wallet ID</Typography>
        <Typography variant="h1">
          {bankId?.upiId ? bankId?.upiId : "N/A"}
          <CopyToClipboard text={bankId?.upiId}>
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
    </>
  );
};
const Paytm = ({ bankId }) => {
  const classes = useStyles();
  return (
    <>
      <Box mt={1} className={classes.mainCard}>
        <Typography variant="h4">Paytm Details </Typography>
        <Typography variant="h4">Paytm ID</Typography>
        <Typography variant="h1">
          {bankId?.upiId ? bankId?.upiId : "N/A"}
          <CopyToClipboard text={bankId?.upiId}>
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
    </>
  );
};
const Bank = ({ bankId }) => {
  const classes = useStyles();
  return (
    <>
      <Box mt={1} className={classes.mainCard}>
        <Typography variant="h4">Bank Transfer (India)</Typography>
        <Typography variant="h4">
          {bankId?.ifscCode ? bankId?.ifscCode : "N/A"}
        </Typography>

        <Typography variant="h4">
          {bankId?.holderName ? bankId?.holderName : "N/A"}{" "}
        </Typography>
        <Typography variant="h1">
          {}
          {/* <CopyToClipboard text={"SBIN0007488"}>
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
        <Typography variant="h4">Account number</Typography>
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
        {/* <Typography variant="h1">
          {bankId?.accountNumber}
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
        </Typography> */}
      </Box>
    </>
  );
};
