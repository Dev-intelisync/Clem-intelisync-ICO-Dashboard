import React, { useState, useEffect, useContext } from "react";
import {
  Button,
  Grid,
  Box,
  InputAdornment,
  FormControl,
  OutlinedInput,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  TextField,
  Typography,
  Container,
  FormHelperText,
  CircularProgress,
} from "@material-ui/core";
import { FaPlus, FaSearch } from "react-icons/fa";
import { makeStyles } from "@material-ui/core";
import TokenCard from "@component/TokenCard";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Axios from "axios";
import ApiConfig from "../../../config/APIConfig";
import { toast } from "react-toastify";
import NoDataFound from "../../../component/DataNotFound";
import ButtonCircularProgress from "@component/ButtonCircularProgress";
import TokenBuy from "@component/TokenBuy";
import { Link, useHistory } from "react-router-dom";
import * as yep from "yup";
import { Form, Formik } from "formik";
import axios from "axios";

import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import "./style.css";
import { AuthContext } from "@context/Auth";
import FilterTransction from "@component/FilterTransction";
import { BiNews } from "react-icons/bi";

const useStyles = makeStyles((theme) => ({
  forminput: {
    [theme.breakpoints.down("xs")]: {
      flexWrap: "wrap",
    },

    "& input": {
      paddingTop: "10.5px",
      paddingBottom: "10.5px",
      color: theme.palette.text.primary,
      border: "1px solid #6ECFF3 !important",
    },
    "& input:disabled": {
      color: "#CCCCCC",

      border: "1px solid #312e2e",
    },
  },

  Bins: {
    display: "flex",
    alignItems: "center",
  },
  boxBorder: {
    display: "flex",
    justifyContent: "center",
  },
  formSection: {
    "@media(max-width: 991px)": {
      padding: "10px 10px 10px 10px",
    },
  },
  TitleBox: {
    fontFamily: "'Inter'",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "24px",
    lineHeight: "29px",
    color: theme.palette.text.token,
  },
}));
const SubmitButton = ({ processing, error, children, disabled }) => (
  <button
    className={`SubmitButton ${error ? "SubmitButton--error" : ""}`}
    type="submit"
    disabled={processing || disabled}
    style={{
      display: "flex !important",
      justifyContent: "center !important",
      alignItems: "center  !important",
    }}
  >
    {processing ? "Processing..." : children}
  </button>
);
function Crypto(size) {
  const address = "0x12E700EceBD1af4217540Ab6CC1655AD39cC2555";
  const classes = useStyles();
  const [isSubmit, setIsSubmit] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [userBalanceData, setUserBalanceData] = useState([]);
  const history = useHistory();
  const auth = useContext(AuthContext);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [quantity, setQuantity] = useState([]);
  const [coinName, setCoinName] = useState("btc");
  const [coinNameIco, setCoinNameIco] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [ethToken, setEthToken] = useState([]);
  const [btcToken, setBtcToken] = useState();
  const [tabview, setTabView] = useState("CheckoutForm");
  const [icoToken, setIcoToken] = useState(0);
  const userdata = auth?.userData ? auth?.userData : "";
  const [StatusData, setStatusData] = useState();
  const [Amountvalue, setAmountvalue] = useState();
  const [totalbalanceeth, settotalbalanceeth] = useState("");
  const [totalbalancebtc, settotalbalancebtc] = useState("");
  const [totalbalanceusdterc, settotalbalanceusdterc] = useState("");
  const [totalbalanceusdttrx, settotalbalanceusdttrx] = useState("");
  const [totalbalancebnb, settotalbalancebnb] = useState("");
  const [allToken, setallToken] = useState();
  const [balanceloading, setbalanceloading] = useState(false);
  const [formData, setFormData] = React.useState({
    contractAddress: "",
    tokenName: "",
    tokenSymbol: "",
  });

  const Stakehandler = async (values) => {};
  const formInitialSchema = {
    cardNubmer: "",
    currency: "",
    cvc: "",
    exp_month: "",
    exp_year: "",
    paymentMethod: "",
    token: coinNameIco ? coinNameIco : "",
    tokenPrice: btcToken,
    tokenQuantity: ethToken,
    amount: btcToken,
  };
  // useEffect(() => {
  //   if (coinName && userBalanceData === 0) {
  //     setbalanceloading(true);
  //   } else {
  //     setbalanceloading(false);
  //   }
  // }, [coinName]);

  // const tokenQuantityHandler = async () => {
  //   try {
  //     const res = await axios.get(
  //       "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=1000000&page=1&sparkline=false&price_change_percentage=1h%2C%2024h"
  //     );
  //     if (res.status === 200) {
  //       setQuantity(res.data);
  //     }
  //   } catch (error) {
  //     setIsLoading(false);
  //     if (error.response) {
  //       toast.error(error.response.data.message);
  //     } else {
  //       toast.error(error.message);
  //     }
  //   }
  // };

  // useEffect(() => {
  //   tokenQuantityHandler();
  // }, []);

  useEffect(() => {
    const filterdata = quantity.map((data, i) => {
      if (data?.symbol === "eth") {
        settotalbalanceeth(data.current_price);
      }
    });
    const filterdata1 = quantity.map((data, i) => {
      if (data?.symbol === "btc") {
        settotalbalancebtc(data.current_price);
      }
    });
    const filterdata2 = quantity.map((data, i) => {
      if (data?.symbol === "usdt") {
        settotalbalanceusdterc(data.current_price);
      }
    });
    const filterdata4 = quantity.map((data, i) => {
      if (data?.symbol === "usdt") {
        settotalbalanceusdttrx(data.current_price);
      }
    });
    const filterdata3 = quantity.map((data, i) => {
      if (data?.symbol === "bnb") {
        settotalbalancebnb(data.current_price);
      }
    });
  }, [quantity]);
  useEffect(() => {
    if (userBalanceData) {
      const maindata = userBalanceData?.map((data, i) => {
        if (data?.coinData?.coinShortName === "AVT") {
          setallToken(data?.coinData?.marketPriceInUsd);
        }
      });
    }
  }, [userBalanceData]);

  const totalprice = (e) => {
    setEthToken(e.target.value);
    if (coinName == "eth") {
      setBtcToken((e.target.value * allToken) / totalbalanceeth);
    }
    if (coinName == "btc") {
      setBtcToken((e.target.value * allToken) / totalbalancebtc);
    }
    if (coinName == "bnb") {
      setBtcToken((e.target.value * allToken) / totalbalancebnb);
    }
    if (coinName == "usdterc") {
      setBtcToken((e.target.value * allToken) / totalbalanceusdterc);
    }
    if (coinName == "usdttrx") {
      setBtcToken((e.target.value * allToken) / totalbalanceusdttrx);
    }
  };
  const adinkycstatus = async () => {
    try {
      const res = await axios.get(ApiConfig.adminstatusforkyc, {});
      if (res.data.status === 200) {
        setStatusData(res.data.data[0]);
      }
    } catch (error) {}
  };
  useEffect(() => {
    adinkycstatus();
  }, []);
  const kycstatushandle = (values) => {
    if (
      StatusData.kycIsCheck === "YES" &&
      auth?.kycData?.documentStatus === "ACCEPTED"
    ) {
      handleFormSubmitCrypto(values);
    } else if (StatusData.kycIsCheck === "NO") {
      handleFormSubmitCrypto(values);
    } else {
      toast.error("Please upload your KYC and approved it.");
    }
  };

  const handleFormSubmitCrypto = async (values) => {
    setIsLoading(true);
    try {
      const res = await axios({
        method: "POST",
        url: ApiConfig.buyTokenBtc,

        headers: {
          token: window.localStorage.getItem("token"),
        },
        params: {
          coinName: coinName,
          tokenName: "AVT",
          togaId: "1",
        },
        data: {
          coinQuantity: btcToken,
          icoAmount: ethToken,
        },
      });
      if (res.data.status === 200) {
        toast.success(res.data.message);
        setIsLoading(false);
        history.push("/my-wallet");
      } else if (res.data.status === 205) {
        toast.warn(res.data.message);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  const getWalletHandler = async () => {
    try {
      const res = await Axios.get(ApiConfig.myWallet, {
        headers: {
          token: window.localStorage.getItem("token"),
          userId: userdata?.userId,
        },
      });
      if (res.data.status === 200) {
        window.localStorage.getItem("coinName");

        let arr = [];
        for (let i = 0; i < res.data.data.coinList.length; i++) {
          const obj = {
            coinData: res.data.data.coinList[i],
            coinBalance: res.data.data.userBalance[i],
          };

          arr.push(obj);
        }
        setUserBalanceData(arr);
      } else {
      }
    } catch (error) {
      console.log("ERROR", error);
    }
  };
  useEffect(() => {
    getWalletHandler();
  }, []);
  const formInitialSchemaCrypoto = {
    coinName: ethToken,
    coinQuantity: btcToken,
    icoAmount: ethToken,
  };
  useEffect(() => {
    setBtcToken("");
    setAmountvalue("");
  }, [coinName]);
  return (
    <>
      <Box>
        <Typography className={classes.TitleBox}>Choose LAX Coin</Typography>
        <Formik
          onSubmit={(values) => Stakehandler(values)}
          initialValues={{
            amount: "",
          }}
          initialStatus={{
            success: false,
            successMsg: "",
          }}
          validationSchema={yep.object().shape({
            amount: yep.string().required(" Amount is required."),
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
            <Form className={classes.formSection}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={12} lg={12} sm={12}>
                  <Box
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <label>
                      <>
                        {" "}
                        {userBalanceData.map((data, i) => {
                          return <></>;
                        })}
                      </>
                    </label>
                  </Box>
                  <FormControl
                    variant="outlined"
                    fullWidth
                    className={classes.forminput}
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "flex-end",
                    }}
                  >
                    <Box>
                      <Box mb={1}>
                        <label>Select coin to buy LAX</label>
                      </Box>
                      <Select
                        style={{
                          width: "200px",
                        }}
                        margin="dense"
                        // label="Select token "
                        name="token"
                        value={coinName}
                        error={Boolean(touched.token && errors.token)}
                        inputProps={{
                          className: classes.Bins,
                        }}
                        onBlur={handleBlur}
                        onChange={(e) => {
                          setCoinName(e.target.value);
                        }}
                      >
                        <MenuItem
                          value="btc"
                          className={classes.MenuItemFiled}
                          style={{ fontSize: "12px" }}
                        >
                          <img
                            src="images/btc.png"
                            alt="usdt"
                            style={{ width: "20px", height: "20px" }}
                          />
                          &nbsp;&nbsp; BTC
                        </MenuItem>

                        <MenuItem
                          value={"bnb"}
                          className={classes.MenuItemFiled}
                          style={{
                            fontSize: "12px",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <img
                            src="images/bnb.png"
                            alt="usdt"
                            style={{ width: "20px", height: "20px" }}
                          />
                          &nbsp;&nbsp; BNB
                        </MenuItem>
                        <MenuItem
                          value={"eth"}
                          className={classes.MenuItemFiled}
                          style={{ fontSize: "12px" }}
                        >
                          <img
                            src="images/eth.png"
                            alt="usdt"
                            style={{ width: "20px", height: "20px" }}
                          />
                          &nbsp;&nbsp; ETH
                        </MenuItem>
                      </Select>
                    </Box>
                    &nbsp; &nbsp; &nbsp; &nbsp;
                    <Box style={{ width: "100%" }}>
                      <label className="labelbox">Equivalent amount*</label>
                      <TextField
                        className={classes.forminput}
                        type="number"
                        fullWidth
                        variant="outlined"
                        placeholder=" Amount"
                        step="any"
                        name="amount"
                        value={values.amount}
                        error={Boolean(touched.amount && errors.amount)}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        style={{ color: "#000" }}
                      />
                    </Box>
                    <FormHelperText error>
                      {touched.amount && errors.amount}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Grid
                  item
                  xs={12}
                  lg={12}
                  style={{ marginTop: "-12px" }}
                ></Grid>
                <Grid
                  item
                  xs={12}
                  md={12}
                  lg={12}
                  sm={12}
                  style={{ marginTop: "-30px" }}
                >
                  <label className="labelbox">LAX Coin quantity*</label>
                  <TextField
                    className={classes.forminput}
                    type="number"
                    fullWidth
                    variant="outlined"
                    placeholder="Please enter LAX Coin quantity you want to buy"
                    name="icoAmount"
                    step="any"
                    value={Amountvalue}
                    style={{ color: "#000" }}
                    onChange={(e) => {
                      setEthToken(e.target.value);
                      totalprice(e);
                      setAmountvalue(e.target.value);
                    }}
                    onKeyPress={(event) => {
                      if (event?.key === "-" || event?.key === "+") {
                        event.preventDefault();
                      }
                    }}
                  />
                </Grid>
              </Grid>

              <Box mb={3} align="center" style={{ marginTop: "30px" }}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={isLoading}
                  className={classes.SubmitButton}
                >
                  Pay
                  {isLoading && (
                    <Box>
                      <CircularProgress
                        style={{
                          color: "white",
                          height: "25px",
                          width: "25px",
                          marginLeft: "15px",
                        }}
                      />
                    </Box>
                  )}
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </>
  );
}

export default Crypto;
