import React, { useState, useContext, useEffect } from "react";
import {
  Typography,
  Box,
  Button,
  makeStyles,
  TextField,
  Grid,
  Dialog,
  FormHelperText,
  Select,
  FormControl,
  MenuItem,
} from "@material-ui/core";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Form, Formik } from "formik";
import { toast } from "react-toastify";
import axios from "axios";
import Web3 from "web3";
import ApiConfig from "../config/APIConfig";
import * as yep from "yup";
import { useHistory, Link } from "react-router-dom";
import ButtonCircularProgress from "./ButtonCircularProgress";
import { AuthContext } from "../context/Auth";
import { UserContext } from "../context/User";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 505,
    height: 522,
    borderRadius: "24px",
    background: "#fff",
    // borderRadius: "24px",
    // "& .MuiDialogContent-root": {
    //   flex: "none !important",
    // },
    // "& .MuiDialogActions-root": {
    //   marginRight: "0px !important",
    // },
  },
  dialogTitle: {
    paddingTop: "38px",
    "& .MuiTypography-h6": {
      fontFamily: "Inter !important",
      fontStyle: "normal !important",
      fontWeight: "700 !important",
      fontSize: "23.989px !important",
      lineHeight: "36px !important",
      color: "#FFFFFF !important",
    },
  },
  lablebox: {
    marginBottom: "-8px",
    fontFamily: "Inter",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "16px",
    lineHeight: "24px",
    color: "#FFFFFF",
  },
  TextBox: {
    borderRadius: "10px",
    background: theme.palette.background.taf,
  },
  CloseButton: {
    width: "100%",
    height: "42px",
    maxWidth: "169px",
    color: "#fff",
    padding: "9px 20px !important",
    fontSize: "14px",
    background: "#56CA00",
    borderRadius: "7px",

    "&:hover": {
      backgroundColor:
        "linear-gradient(180deg, #00ACEB 0%, #00B0ED 10.18%, #1069C2 70.35%, #1069C2 100%)",
    },
  },
  buttonBox: {
    display: "flex",
    justifyContent: "space-around",
  },
  fees: {
    fontFamily: "Inter",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "16px",
    lineHeight: "24px",
    color: "#FFFFFF",
    marginTop: "0px",
    marginBottom: "9px",
  },
}));

export default function SendMoneyDialog({
  open,
  handleClose,
  submitHandler,
  data,
  dataId,
  setOpen,
}) {
  const RPC_URL = "https://kovan.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161";
  const httpProvider = new Web3.providers.HttpProvider(RPC_URL);
  const web3 = new Web3(httpProvider);
  const [isUpdating, setIsUpdating] = useState(false);
  const [verify, setverify] = useState(false);
  const [resend, setresend] = useState(false);
  const [otpError, setOtpError] = useState(false);
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const classes = useStyles();
  const auth = useContext(AuthContext);
  const blockunblock = auth?.userData?.status;
  const FirstKyc = auth?.userData?.kycVerified;
  const user = useContext(UserContext);
  const [typeCoin, setTypeCoin] = useState("ERC");
  const StatusData = user?.StatusData;
  const [isSubmit, setIsSubmit] = useState(false);
  const [isLoading, setLoader] = useState(false);
  const history = useHistory();
  const [openPop, setOpenPop] = useState(false);
  const webUrl = window.location.href;
  const [values, setValues] = useState({});
  // const [StatusData, setStatusData] = useState();
  const maxlimitbalance = StatusData?.maxBalance;
  const minlimitbalance = StatusData?.minBalance;
  const [feeData, setfeeData] = useState([]);

  const [withdrawamount, setwithdrawamount] = useState([]);

  const [withdrawamount1, setwithdrawamount1] = useState([]);
  const [withdrawamount2, setwithdrawamount2] = useState([]);
  const [withdrawamount3, setwithdrawamount3] = useState([]);
  const [withdrawamount4, setwithdrawamount4] = useState([]);
  const [withdrawamount5, setwithdrawamount5] = useState([]);
  const [withdrawamount6, setwithdrawamount6] = useState([]);
  const [withdrawamount7, setwithdrawamount7] = useState([]);
  const [withdrawamount8, setwithdrawamount8] = useState([]);
  const [withdrawamount9, setwithdrawamount9] = useState([]);
  const setwithdrawamt = withdrawamount[0]?.withdrawalAmount;

  const setwithdrawamt1 = withdrawamount1[0]?.withdrawalAmount;
  const setwithdrawamt2 = withdrawamount2[0]?.withdrawalAmount;
  const setwithdrawamt3 = withdrawamount3[0]?.withdrawalAmount;
  const setwithdrawamt4 = withdrawamount4[0]?.withdrawalAmount;
  const setwithdrawamt5 = withdrawamount5[0]?.withdrawalAmount;
  const setwithdrawamt6 = withdrawamount6[0]?.withdrawalAmount;
  const setwithdrawamt7 = withdrawamount7[0]?.withdrawalAmount;
  const setwithdrawamt8 = withdrawamount8[0]?.withdrawalAmount;
  const setwithdrawamt9 = withdrawamount9[0]?.withdrawalAmount;

  const [formData, setFormData] = useState({
    amount: "",
    address: "",
    totalbalance: "",
  });

  // const adinkycstatus = async () => {
  //   try {
  //     const res = await axios.get(ApiConfig.adminstatusforkyc, {});
  //     if (res.data.status === 200) {
  //       setStatusData(res.data.data[0]);
  //     }
  //   } catch (error) {}
  // };

  // const getKycList = async () => {
  //   setLoader(true);
  //   try {
  //     const res = await axios.get(ApiConfig.getKycList, {
  //       headers: {
  //         token: window.localStorage.getItem("token"),
  //       },
  //     });
  //     if (res.data.responseCode === 200) {
  //       setStatusData(res.data.result);
  //       setLoader(false);
  //       auth.getProfileHandler();
  //     }
  //   } catch (error) {
  //     setLoader(false);
  //   }
  // };
  // useEffect(() => {
  //   getKycList();
  // }, []);

  // const setfeeadmin = async () => {
  //   try {
  //     const res = await axios.get(ApiConfig.getCoinList, {});
  //     if (res.data.status === 200) {
  //       setfeeData(res.data.data);
  //     }
  //   } catch (error) { }
  // };

  // useEffect(() => {
  //   adinkycstatus();
  //   setfeeadmin();
  // }, []);

  const validateAccountAddress = async (account) => {
    try {
      const accountCheck = web3.utils.toChecksumAddress(account);
      if (accountCheck !== "") {
        return true;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  };
  const userStatuscheck = (values) => {
    if (blockunblock === "ACTIVE") {
      kycstatushandle(values);
    } else {
      toast.error("Your account has been blocked due to suspicious activity");
    }
  };
  const kycstatushandle = (values) => {
    handleFormSubmit(values);
    // if (auth?.userData?.kycVerified === false) {
    //   toast.error("Kyc is not applied yet");
    // }
    // if (StatusData.approveStatus === "APPROVE") {
    //   handleFormSubmit(values);
    // }

    // if (StatusData.approveStatus === "PENDING") {
    //   toast.error("Please upload your KYC and approved it.");
    // }
  };

  const handleFormSubmit = async (values) => {
    console.log(values, "values");
    let fees;
    if (data?.coinName === "BTC") {
      fees = setwithdrawamt;
    } else if (data?.coinName === "REH") {
      fees = setwithdrawamt1;
    } else if (data?.coinName === "BNB") {
      fees = setwithdrawamt2;
    } else if (data?.coinName === "ETH") {
      fees = setwithdrawamt3;
    } else if (data?.coinName === "LTC") {
      fees = setwithdrawamt9;
    } else if (data?.coinName === "SOLANA") {
      fees = setwithdrawamt8;
    } else if (data?.coinName === "AVAX") {
      fees = setwithdrawamt7;
    } else if (data?.coinName === "USDC") {
      fees = setwithdrawamt4;
    } else if (data?.coinName === "USDT") {
      fees = setwithdrawamt5;
    } else if (data?.coinName === "MATIC") {
      fees = setwithdrawamt6;
    }

    try {
      setLoader(true);

      const res = await axios({
        method: "POST",
        url: ApiConfig.sendMoney,
        headers: {
          token: window.localStorage.getItem("token"),
        },
        data: {
          coinAmount: values.amount.toString(),
          walletAddress: values.address,
          coinType: dataId?.coinType,
          url: `${webUrl}/approve`,
        },
      });
      if (res.data.responseCode === 200) {
        toast.success(
          "Amount sent successfully, please check your email for approve"
        );
        setLoader(false);
        setIsSubmit(true);
        setOpenPop(true);
        handleClose();

        setOpen(false);
      } else {
        setLoader(false);
        toast.warn(res.data.responseMessage);
      }
    } catch (error) {
      setLoader(false);
    }
  };
  const handleOtp = (element, index) => {
    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);
    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };
  const _onBackSpace = (e) => {
    const keyCode = e.keyCode;
    const prev = e.target.previousSibling;
    if (keyCode === 8 && prev !== null) {
      setTimeout(() => {
        prev.focus();
      });
    }
  };

  useEffect(() => {
    if (feeData) {
      const filterdataamount = feeData?.filter((data, i) => {
        return data?.coinShortName === "BTC";
      });

      setwithdrawamount(filterdataamount);
    }
    if (feeData) {
      const filterdataamount1 = feeData?.filter((data, i) => {
        return data?.coinShortName === "REH";
      });

      setwithdrawamount1(filterdataamount1);
    }
    if (feeData) {
      const filterdataamount2 = feeData?.filter((data, i) => {
        return data?.coinShortName === "BNB";
      });
      setwithdrawamount2(filterdataamount2);
    }
    if (feeData) {
      const filterdataamount3 = feeData?.filter((data, i) => {
        return data?.coinShortName === "ETH";
      });
      setwithdrawamount3(filterdataamount3);
    }
    if (feeData) {
      const filterdataamount4 = feeData?.filter((data, i) => {
        return data?.coinShortName === "USDC";
      });
      setwithdrawamount4(filterdataamount4);
    }
    if (feeData) {
      const filterdataamount5 = feeData?.filter((data, i) => {
        return data?.coinShortName === "USDT";
      });
      setwithdrawamount5(filterdataamount5);
    }
    if (feeData) {
      const filterdataamount6 = feeData?.filter((data, i) => {
        return data?.coinShortName === "MATIC";
      });
      setwithdrawamount6(filterdataamount6);
    }
    if (feeData) {
      const filterdataamount7 = feeData?.filter((data, i) => {
        return data?.coinShortName === "AVAX";
      });
      setwithdrawamount7(filterdataamount7);
    }
    if (feeData) {
      const filterdataamount8 = feeData?.filter((data, i) => {
        return data?.coinShortName === "SOLANA";
      });
      setwithdrawamount8(filterdataamount8);
    }
    if (feeData) {
      const filterdataamount9 = feeData?.filter((data, i) => {
        return data?.coinShortName === "LTC";
      });
      setwithdrawamount9(filterdataamount9);
    }
  }, [feeData]);

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        maxWidth="xs"
        PaperProps={{
          classes: {
            root: classes.root,
          },
        }}
      >
        <DialogTitle id="form-dialog-title" className={classes.dialogTitle}>
          {data?.coinName === "BUSD" && <>Send BUSD</>}
          {data?.coinName === "BTC" && <>Send Bitcoin</>}
          {data?.coinName === "ETH" && <>Send ETH</>}
          {/* {data?.coinName === "AVT" && <>Send Toga</>} */}
          {data?.coinName === "BNB" && <>Send BNB</>}
          {data?.coinName === "USDT" && <>Send USDT</>}
          {data?.coinName === "USDC" && <>Send USDC</>}
          {data?.coinName === "MATIC" && <>Send MATIC</>}
          {data?.coinName === "SOLANA" && <>Send SOLANA</>}
          {data?.coinName === "LTC" && <>Send LTC</>}
          {data?.coinName === "REH" && <>Send REH</>}
          {data?.coinName === "AVAX" && <>Send AVAX</>}
        </DialogTitle>
        <Formik
          onSubmit={(values) => {
            userStatuscheck(values);
          }}
          initialValues={{
            amount: "",
            address: "",
            totalbalance: "",
          }}
          initialStatus={{
            success: false,
            successMsg: "",
          }}
          validationSchema={yep.object().shape({
            amount: yep.string().required("Amount is required"),
            address: yep.string().required("Address is required"),
            // .matches(/^[13][a-zA-Z0-9]{27,34}/, "Please enter valid address"),
          })}
        >
          {({
            errors,
            handleBlur,
            handleChange,
            handleSubmit,
            touched,
            values,
            setFieldValue,
          }) => (
            <Form>
              <DialogContent>
                <Grid container spacing={3} style={{ marginTop: "-33px" }}>
                  <Grid item xs={12}>
                    <label className={classes.lablebox}>Coin Amount*</label>
                    <TextField
                      fullWidth
                      variant="outlined"
                      placeholder="Coin Amount"
                      type="number"
                      size="small"
                      step="any"
                      className="textFeilds"
                      InputProps={{
                        className: classes.TextBox,
                      }}
                      name="amount"
                      value={values.amount}
                      onChange={handleChange}
                      error={Boolean(touched.amount && errors.amount)}
                      onBlur={handleBlur}
                    />
                    <FormHelperText error>
                      {touched.amount && errors.amount}
                    </FormHelperText>
                  </Grid>
                  <Grid item xs={12}>
                    <label className={classes.lablebox}>Wallet Address*</label>
                    <TextField
                      placeholder="Wallet Address"
                      size="small"
                      variant="outlined"
                      fullWidth
                      className="textFeilds"
                      InputProps={{
                        className: classes.TextBox,
                      }}
                      name="address"
                      value={values.address}
                      onChange={handleChange}
                      error={Boolean(touched.address && errors.address)}
                      onBlur={handleBlur}
                    />
                    <FormHelperText error>
                      {touched.address && errors.address}
                    </FormHelperText>
                  </Grid>
                  <Box mt={1} style={{ padding: "0px 10px" }}>
                    <Typography variant="subtitle2">
                      {data?.coinBalance?.instrument === "BTC" ? (
                        <>
                          {feeData.map((data, i) => {
                            return (
                              <>
                                {data.coinShortName === "BTC" ? (
                                  <>{`Fee : ${data.withdrawlFee} %`}</>
                                ) : (
                                  ""
                                )}
                              </>
                            );
                          })}
                        </>
                      ) : (
                        ""
                      )}
                      {data?.coinBalance?.instrument === "AVT" ? (
                        <>
                          {feeData.map((data, i) => {
                            return (
                              <>
                                {data.coinShortName === "AVT" ? (
                                  <>{`Fee : ${data.withdrawlFee} %`}</>
                                ) : (
                                  ""
                                )}
                              </>
                            );
                          })}
                        </>
                      ) : (
                        ""
                      )}
                      {data?.coinBalance?.instrument === "BNB" ? (
                        <>
                          {feeData.map((data, i) => {
                            return (
                              <>
                                {data.coinShortName === "BNB" ? (
                                  <>{`Fee : ${data.withdrawlFee} %`}</>
                                ) : (
                                  ""
                                )}
                              </>
                            );
                          })}
                        </>
                      ) : (
                        ""
                      )}
                      {data?.coinBalance?.instrument === "ETH" ? (
                        <>
                          {feeData.map((data, i) => {
                            return (
                              <>
                                {data.coinShortName === "ETH" ? (
                                  <>{`Fee : ${data.withdrawlFee} %`}</>
                                ) : (
                                  ""
                                )}
                              </>
                            );
                          })}
                        </>
                      ) : (
                        ""
                      )}
                      {data?.coinBalance?.instrument === "USDTERC" ? (
                        <>
                          {feeData.map((data, i) => {
                            return (
                              <>
                                {data.coinShortName === "USDTERC" ? (
                                  <>{`Fee : ${data.withdrawlFee} %`}</>
                                ) : (
                                  ""
                                )}
                              </>
                            );
                          })}
                        </>
                      ) : (
                        ""
                      )}
                      {data?.coinBalance?.instrument === "USDTTRX" ? (
                        <>
                          {feeData.map((data, i) => {
                            return (
                              <>
                                {data.coinShortName === "USDTTRX" ? (
                                  <>{`Fee : ${data.withdrawlFee} %`}</>
                                ) : (
                                  ""
                                )}
                              </>
                            );
                          })}
                        </>
                      ) : (
                        ""
                      )}
                    </Typography>
                    <Typography variant="subtitle2">
                      {data?.coinBalance?.instrument === "BTC" ? (
                        <>
                          {feeData.map((data, i) => {
                            return (
                              <>
                                {data.coinShortName === "BTC" ? (
                                  <>{`Send Amount : ${
                                    values.amount -
                                    (values.amount * data.withdrawlFee) / 100
                                  }`}</>
                                ) : (
                                  ""
                                )}
                              </>
                            );
                          })}
                        </>
                      ) : (
                        ""
                      )}
                      {data?.coinBalance?.instrument === "AVT" ? (
                        <>
                          {feeData.map((data, i) => {
                            return (
                              <>
                                {data.coinShortName === "AVT" ? (
                                  <>{`Send Amount : ${
                                    values.amount -
                                    (values.amount * data.withdrawlFee) / 100
                                  }`}</>
                                ) : (
                                  ""
                                )}
                              </>
                            );
                          })}
                        </>
                      ) : (
                        ""
                      )}
                      {data?.coinBalance?.instrument === "BNB" ? (
                        <>
                          {feeData.map((data, i) => {
                            return (
                              <>
                                {data.coinShortName === "BNB" ? (
                                  <>{`Send Amount : ${
                                    values.amount -
                                    (values.amount * data.withdrawlFee) / 100
                                  }`}</>
                                ) : (
                                  ""
                                )}
                              </>
                            );
                          })}
                        </>
                      ) : (
                        ""
                      )}
                      {data?.coinBalance?.instrument === "ETH" ? (
                        <>
                          {feeData.map((data, i) => {
                            return (
                              <>
                                {data.coinShortName === "ETH" ? (
                                  <>{`Send Amount : ${
                                    values.amount -
                                    (values.amount * data.withdrawlFee) / 100
                                  }`}</>
                                ) : (
                                  ""
                                )}
                              </>
                            );
                          })}
                        </>
                      ) : (
                        ""
                      )}
                      {data?.coinBalance?.instrument === "USDTERC" ? (
                        <>
                          {feeData.map((data, i) => {
                            return (
                              <>
                                {data.coinShortName === "USDTERC" ? (
                                  <>{`Send Amount : ${
                                    values.amount -
                                    (values.amount * data.withdrawlFee) / 100
                                  }`}</>
                                ) : (
                                  ""
                                )}
                              </>
                            );
                          })}
                        </>
                      ) : (
                        ""
                      )}
                      {data?.coinBalance?.instrument === "USDTTRX" ? (
                        <>
                          {feeData.map((data, i) => {
                            return (
                              <>
                                {data.coinShortName === "USDTTRX" ? (
                                  <>{`Send Amount : ${
                                    values.amount -
                                    (values.amount * data.withdrawlFee) / 100
                                  }`}</>
                                ) : (
                                  ""
                                )}
                              </>
                            );
                          })}
                        </>
                      ) : (
                        ""
                      )}
                    </Typography>
                    <Typography variant="subtitle2">
                      {data?.coinBalance?.instrument === "BTC" ? (
                        <>
                          {feeData.map((data, i) => {
                            return (
                              <>
                                {data?.coinShortName === "BTC" ? (
                                  <>{`Minimum Balance : ${data.withdrawalAmount}`}</>
                                ) : (
                                  ""
                                )}
                              </>
                            );
                          })}
                        </>
                      ) : (
                        ""
                      )}
                      {data?.coinShortName === "AVT" ? (
                        <>
                          {feeData.map((data, i) => {
                            return (
                              <>
                                {data.coinShortName === "AVT" ? (
                                  <>{`Minimum Balance : ${data.withdrawalAmount}`}</>
                                ) : (
                                  ""
                                )}
                              </>
                            );
                          })}
                        </>
                      ) : (
                        ""
                      )}
                      {data?.coinBalance?.instrument === "BNB" ? (
                        <>
                          {feeData.map((data, i) => {
                            return (
                              <>
                                {data.coinShortName === "BNB" ? (
                                  <>{`Minimum Balance : ${data.withdrawalAmount}`}</>
                                ) : (
                                  ""
                                )}
                              </>
                            );
                          })}
                        </>
                      ) : (
                        ""
                      )}
                      {data?.coinBalance?.instrument === "ETH" ? (
                        <>
                          {feeData.map((data, i) => {
                            return (
                              <>
                                {data.coinShortName === "ETH" ? (
                                  <>{`Minimum Balance : ${data.withdrawalAmount}`}</>
                                ) : (
                                  ""
                                )}
                              </>
                            );
                          })}
                        </>
                      ) : (
                        ""
                      )}
                      {data?.coinBalance?.instrument === "USDTERC" ? (
                        <>
                          {feeData.map((data, i) => {
                            return (
                              <>
                                {data.coinShortName === "USDTERC" ? (
                                  <>{`Minimum Balance : ${data.withdrawalAmount}`}</>
                                ) : (
                                  ""
                                )}
                              </>
                            );
                          })}
                        </>
                      ) : (
                        ""
                      )}
                      {data?.coinBalance?.instrument === "USDTTRX" ? (
                        <>
                          {feeData.map((data, i) => {
                            return (
                              <>
                                {data.coinShortName === "USDTTRX" ? (
                                  <>{`Minimum Balance : ${data.withdrawalAmount}`}</>
                                ) : (
                                  ""
                                )}
                              </>
                            );
                          })}
                        </>
                      ) : (
                        ""
                      )}
                    </Typography>

                    <p className={classes.fees}>Fee: 0.0%</p>
                    <p className={classes.fees}>Send Amount : 0</p>
                    <p className={classes.fees}>Minimum Balance : 0.00</p>
                    <p className={classes.fees}>
                      Available Balance : {data?.balance}{" "}
                      {/* {data?.coinBalance?.instrument === "AVT"
                        ? "Toga"
                        : data?.coinBalance?.instrument} */}
                      {data?.coinBalance?.instrument === "AVT"
                        ? "REH"
                        : data?.coinBalance?.instrument}
                    </p>
                  </Box>
                </Grid>
              </DialogContent>
              <DialogActions style={{ margin: "0px", display: "block" }}>
                <Box className={classes.buttonBox}>
                  <Button
                    className={classes.CloseButton}
                    onClick={handleClose}
                    disabled={isLoading}
                  >
                    Close
                  </Button>
                  <Button
                    className={classes.CloseButton}
                    type="submit"
                    disabled={isLoading}
                  >
                    Send
                    {isLoading && <ButtonCircularProgress />}
                  </Button>
                </Box>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </Dialog>
    </>
  );
}
