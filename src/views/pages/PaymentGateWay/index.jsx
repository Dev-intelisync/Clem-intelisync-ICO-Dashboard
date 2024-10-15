import React, { useEffect, useState, useContext } from "react";
import {
  TextField,
  Box,
  Grid,
  makeStyles,
  Button,
  Dialog,
  DialogContent,
  Typography,
} from "@material-ui/core";
// import ApiConfig from "../../../config/APIConfig";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { AuthContext } from "@context/Auth";
import axios from "axios";
import ButtonCircularProgress from "@component/ButtonCircularProgress";
const CARD_OPTIONS = {
  iconStyle: "solid",
  style: {
    base: {
      iconColor: "#fff",
      color: "#fff",
      fontWeight: 500,
      fontFamily: "'Inter', sans-serif",
      fontSize: "16px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": {
        color: "#fff",
      },
      "::placeholder": {
        color: "#fff",
      },
    },
    invalid: {
      iconColor: "#ffc7ee",
      color: "#fff",
    },
  },
};
const useStyles = makeStyles((theme) => ({
  formGroups: {
    "& .ElementsApp, .ElementsApp .InputElement": {
      color: "#222",
    },
    color: "#fff",
    // background: "#52565c",
    "& ..FormRowLabel": {
      color: "#fff",
    },
    "& .FormRowInput": {
      "& :-webkit-autofill": {
        color: "black",
      },
    },
  },
  SubmitButton: {
    color: "#fff",
    background:
      "linear-gradient(180deg, #00ACEB 0%, #00B0ED 10.18%, #1069C2 70.35%, #1069C2 100%)",
    borderRadius: "8px",
    padding: "10px 60px !important",
  },

  Title: {
    // background: "#eaf1ef",
    background: theme.palette.background.notification,
    paddingTop: "30px !important",
    paddingBottom: "30px !important",

    "& h5": {
      color: theme.palette.text.primary,
    },
  },
  formBox: {
    [theme.breakpoints.down("xs")]: {
      flexWrap: "wrap",
    },
  },
  TextBox: {
    borderRadius: "10px",

    // background: theme.palette.background.taf,
  },
  forminput: {
    // maxWidth: "300px",
    "& input": {
      paddingTop: "10.5px",
      color: theme.palette.text.primary,
      // border: "1px solid #6ECFF3",

      paddingBottom: "10.5px",
    },
  },
}));
export default function ({ planId, madePayment, planPrice }) {
  const classes = useStyles();
  const history = useHistory();
  const auth = useContext(AuthContext);
  const [error, setError] = useState(null);
  const [StatusData, setStatusData] = useState("");
  const [processing, setProcessing] = useState(false);
  const [ethToken, setEthToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [coinName, setCoinName] = useState("");
  const [btcToken, setBtcToken] = useState("");
  const [filterData, setFilterData] = useState();
  const [amountName, setAmountName] = useState("");
  const [convertinr, setconvertinr] = useState();
  const [quantity, setQuantity] = useState("");
  const [cardDetailsPop, setcloseCarddetail] = useState(false);
  const [currencyInr, setCurrencyInr] = useState("USD");
  const [AVTpriceUSD, setAVTpriceUSD] = useState("");
  const [userBalanceData, setUserBalanceData] = useState([]);
  const [mainData, setmainData] = useState("");
  const [allToken, setallToken] = useState();
  const [closedata, setclosedata] = useState(true);
  const [isSubmits, setIsSubmits] = useState(false);
  const [feeData, setfeeData] = useState();
  const userdataId = auth?.userData?.userId;
  const [formData, setFormData] = useState({
    cardNumber: "",
    expireMonth: "",
    expireYear: "",
    cvc: "",
  });
  const _onInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const temp = { ...formData, [name]: value };
    setFormData(temp);
  };
  useEffect(() => {
    if (userdataId) {
      getWalletHandler();
    }
  }, [userdataId]);
  const getWalletHandler = async () => {
    // setIsLoading(true);
    try {
      const res = await axios.get(ApiConfig.myWallet, {
        headers: {
          token: window.localStorage.getItem("token"),
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
        // setIsLoading(false);
      } else {
        // setIsLoading(false);
      }
    } catch (error) {}
  };
  useEffect(() => {
    if (userBalanceData) {
      const maindata = userBalanceData?.map((data, i) => {
        setmainData(data);
      });
    }
  }, [userBalanceData]);

  const [billingDetails, setBillingDetails] = useState({
    email: "",
    phone: "",
    name: "",
  });
  const [finalbaydata, setfinalbaydata] = useState();

  const carDigit = finalbaydata?.card?.last4;

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

  // const setfeeadmin = async () => {
  //   try {
  //     const res = await axios.get(ApiConfig.getCoinList, {});
  //     if (res.data.status === 200) {
  //       setfeeData(res.data.data);
  //     }
  //   } catch (error) {}
  // };

  // useEffect(() => {
  //   setfeeadmin();
  // }, []);

  const handleValidationCheck = () => {
    // setIsSubmits(true);
    setcloseCarddetail(true);
    // if (ethToken !== "" && filterData !== "") {
    //   // kycstatushandle();
    //   setIsSubmits(false);
    // }
  };
  // const kycstatushandle = () => {
  //   if (
  //     // StatusData.kycIsCheck === "YES" &&
  //     auth?.userData?.kyc?.kycStatus === "ACCEPTED"
  //   ) {
  //     setcloseCarddetail(true);
  //   } else if (StatusData.kycIsCheck === "NO") {
  //     setcloseCarddetail(true);
  //   } else {
  //     toast.error("Please upload your KYC and approved it.");
  //   }
  // };
  const handleFormSubmit = async () => {
    setIsLoading(true);
    setcloseCarddetail(true);

    try {
      const res = await axios({
        method: "POST",
        url: ApiConfig.payment,
        headers: {
          token: window.localStorage.getItem("token"),
        },

        data: {
          cardNumber: formData?.cardNumber,
          currency: "USD",
          expireMonth: formData?.expireMonth,
          expireYear: formData?.expireYear,
          cvc: formData?.cvc,
          amount: filterData.toFixed(8),
          tokenAmount: ethToken,
        },
      });
      if (res.data.responseCode === 200) {
        setIsLoading(false);
        toast.success(res.data.responseMessage);
        setcloseCarddetail(false);

        // ........
        // auth.handleTransactions();

        history.push("/my-wallet");
      } else {
        toast.warn(res.data.responseMessage);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      if (error.response) {
        // toast.error(error.data.responseMessage);
      } else {
        // toast.error(error.responseMessage);
      }
    }
  };

  const getVirtualDineroValue = async () => {
    setIsLoading(true);

    try {
      const res = await axios({
        method: "GET",
        url: ApiConfig.getVirtualDinero,
        headers: {
          token: window.localStorage.getItem("token"),
        },
      });
      if (res.data.responseCode === 200) {
        setallToken(res?.data?.result?.amountInUSD);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      if (error.response) {
      } else {
        toast.error(error.message);
      }
    }
  };

  useEffect(() => {
    if (auth?.userData?._id) {
      getVirtualDineroValue();
    }
  }, [auth?.userData?._id]);

  useEffect(() => {
    if (userBalanceData) {
      const maindata = userBalanceData?.map((data, i) => {
        if (data?.coinData?.coinShortName === "VD") {
          setallToken(data?.coinData?.marketPriceInUsd);
        }
      });
    }
  }, [userBalanceData]);
  const totalprice = (e) => {
    setEthToken(e.target.value);
    setBtcToken(allToken * e.target.value);
  };

  useEffect(() => {
    if (btcToken) {
      setFilterData(btcToken);
    }
  }, [btcToken]);

  // useEffect(() => {
  //   setFilterData("");
  // }, [ethToken === ""]);
  const [isValidValue, setIsValidValue] = useState(false);
  return (
    <Box
      style={{
        display: "flex !important",
        justifyContent: "center !important",
      }}
    >
      <iframe
        src="https://widget.onramper.com?color=266677&apiKey=pk_prod_N6cyiUNBld0Cd0jHsf170PBrKfOtS0b3CQNH6cpDg040"
        height="695px"
        width="440px"
        title="Onramper widget"
        frameBorder="0"
        fraeBorderRadius="10px"
        allow="accelerometer;
      autoplay; camera; gyroscope; payment"
        style={{ boxShadow: "1px 1px 1px 1px rgba(0,0,0,0.1)", width: "100%" }}
      >
        <a href="https://widget.onramper.com" target="_blank">
          Buy crypto
        </a>
      </iframe>
      {/* <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <FormControl
            variant="outlined"
            fullWidth
            className={classes.formBox}
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-end",
            }}
          >
            <Box mt={-1}>
              <label>Currency</label>
              <TextField
                className={`${classes.forminput}textFeilds`}
                type="number"
                variant="outlined"
                step="any"
                value="USD"
                placeholder="USD"
                name="tokenQuantity"
                InputProps={{
                  className: classes.TextBox,
                  readOnly: true,
                }}
              />
            </Box>
            &nbsp;&nbsp; &nbsp;&nbsp;
            <Box style={{ width: "100%" }}>
              <label>Enter VDB Coin amount to buy</label>
              <TextField
                className={`${classes.forminput}textFeilds`}
                type="number"
                fullWidth
                variant="outlined"
                step="any"
                placeholder="Please enter VDB Coin quantity"
                name="tokenQuantity"
                InputProps={{
                  className: classes.TextBox,
                }}
                value={ethToken}
                style={{ color: "#000" }}
                onChange={(e) => {
                  totalprice(e);
                  if (e.target.value < "0") {
                    setIsValidValue(true);
                  } else {
                    setIsValidValue(false);
                  }
                }}
                onKeyPress={(event) => {
                  if (event?.key === "-" || event?.key === "+") {
                    event.preventDefault();
                  }
                }}
                // helperText={isLoading && ethToken == "" && "please enter quantity"}
              />
              {isValidValue && ethToken !== "" && (
                <FormHelperText error>
                  You can not enter negative value.
                </FormHelperText>
              )}
              <FormHelperText style={{ fontSize: "12px", color: "#f44336" }}>
                {isSubmits && ethToken == "" ? "Please enter quantity" : ""}
              </FormHelperText>
            </Box>
          </FormControl>
        </Grid>

        <Grid item xs={12} style={{ marginTop: "-15px" }}>
          <label className="labelbox">USD Amount you have to pay</label>
          <TextField
            className={`${classes.forminput}textFeilds`}
            type="number"
            fullWidth
            variant="outlined"
            step="any"
            InputProps={{
              className: classes.TextBox,
            }}
            placeholder=" VDB Coin price"
            name="tokenPrice"
            value={parseFloat(filterData).toFixed(8)}
            onChange={(e) => {
              setAmountName(e.target.value);
            }}
            style={{ color: "#000" }}
            disabled
          />
        </Grid>
      </Grid>
      <Box align="center" style={{ marginTop: "23px", marginBottom: "20px" }}>
        <Button
          onClick={handleValidationCheck}
          disabled={filterData == ""}
        
          className={classes.SubmitButton}
        >
          Pay
          {filterData ? <>{`$ ${parseFloat(filterData).toFixed(8)} `}</> : ""}
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
              </Box> */}

      <Dialog
        open={cardDetailsPop}
        onClose={() => setcloseCarddetail(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent className={classes.Title}>
          <Grid container spacing={2}>
            <Grid xs={12}>
              <Box>
                <Typography variant="h5">
                  Please Enter your card details
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={5}>
              <TextField
                variant="outlined"
                type="number"
                name="cardNumber"
                value={formData?.cardNumber}
                fullWidth
                placeholder="Enter your card number"
                onChange={_onInputChange}
                onInput={(e) => {
                  e.target.value = Math.max(0, parseInt(e.target.value))
                    .toString()
                    .slice(0, 16);
                }}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                variant="outlined"
                type="number"
                name="cvc"
                value={formData?.cvc}
                fullWidth
                placeholder="CVC"
                onChange={_onInputChange}
                onInput={(e) => {
                  e.target.value = Math.max(0, parseInt(e.target.value))
                    .toString()
                    .slice(0, 3);
                }}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                variant="outlined"
                name="expireMonth"
                type="number"
                value={formData?.expireMonth}
                fullWidth
                placeholder="MM"
                onChange={_onInputChange}
                onInput={(e) => {
                  e.target.value = Math.max(0, parseInt(e.target.value))
                    .toString()
                    .slice(0, 2);
                }}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                variant="outlined"
                name="expireYear"
                type="number"
                value={formData?.expireYear}
                fullWidth
                placeholder="YYYY"
                onChange={_onInputChange}
                onInput={(e) => {
                  e.target.value = Math.max(0, parseInt(e.target.value))
                    .toString()
                    .slice(0, 4);
                }}
              />
            </Grid>

            <Grid xs={12}>
              <Box mt={3} mb={1} align="center">
                <Button
                  fullWidth
                  variant="contained"
                  onClick={handleFormSubmit}
                  disabled={isLoading}
                  error={error}
                  className={classes.SubmitButton}
                  style={{ background: "#e09f27" }}
                >
                  Pay ${filterData?.toFixed(8)}{" "}
                  {isLoading && <ButtonCircularProgress />}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </Box>
  );
}
