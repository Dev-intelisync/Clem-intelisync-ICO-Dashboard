import React, { useContext, useState, useEffect } from "react";
import Page from "@component/Page";
import {
  Box,
  Typography,
  makeStyles,
  Button,
  Grid,
  TextField,
  MenuItem,
  Select,
  InputAdornment,
  FormHelperText,
  Dialog,
  DialogContent,
} from "@material-ui/core";
import { CgArrowsExchangeAltV, CgArrowsExchangeAlt } from "react-icons/cg";
import * as yep from "yup";
import { Form, Formik } from "formik";
import { UserContext } from "@context/User";
import { AuthContext } from "@context/Auth";
// import {
//   getExchangeAmount,
//   createTransaction,
//   validateAddress,
//   getStatus,
//   getCurrency,
//   getCurrenciesFull,
//   getMinAmount,
// } from "src/changliy";
import ButtonCircularProgress from "@component/ButtonCircularProgress";
import { toast } from "react-toastify";
import ApiConfig from "../../../config/APIConfig";
import Axios from "axios";

const useStyles = makeStyles((theme) => ({
  fullBox: {
    background:
      "linear-gradient(180deg, rgba(0, 172, 235, 0.1) 0%, rgba(0, 176, 237, 0.1) 10.18%, rgba(16, 105, 194, 0.1) 70.35%, rgba(16, 105, 194, 0.1) 100%)",
    borderRadius: "10px",
    border: "1px solid #6ECFF3",
    marginTop: "60px",
    padding: "25px",
  },
  icons1: {
    display: "none",
    "@media(max-width:500px)": {
      display: "block",
      margin: "15px 0px",
    },
  },
  TextBox: {
    borderRadius: "10px",
    // background: theme.palette.background.taf,
  },
  mainBox: {
    "& h2": {
      fontSize: "25px",
      fontWeight: "600",
    },
  },
  Bins: {
    fontSize: "16px",
    display: "flex",
    alignItems: "center",
    paddingLeft: "10px",
    paddingTop: "5px",
    color: "#fff !important",
  },
  icons2: {
    display: "block",
    "@media(max-width:500px)": {
      display: "none",
    },
  },
  alignBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    "@media(max-width:500px)": {
      flexDirection: "column",
    },
  },
  imgBox: {
    maxWidth: "50px",
    marginTop: "25px",
  },
  exchangeBox: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    "& p": {
      fontSize: "14px",
    },
  },
  maincards1: {
    background:
      "linear-gradient(180deg, rgba(0, 172, 235, 0.1) 0%, rgba(0, 176, 237, 0.1) 10.18%, rgba(16, 105, 194, 0.1) 70.35%, rgba(16, 105, 194, 0.1) 100%)",
    borderRadius: "10px",
    border: "1px solid #6ECFF3",

    padding: "15px 40px 25px",
  },
  Percentage: {
    border: "1px solid #6ECFF3",
    borderRadius: "4px",
  },
  Percentage1: {
    color: theme.palette.text.primary,
    "@media(max-width:416px)": {
      minWidth: "40px",
    },
  },
  popupBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
  },
}));
const CryptoExchange = () => {
  const classes = useStyles();
  const user = useContext(UserContext);
  const auth = useContext(AuthContext);

  const [coin, setCoin] = useState("BTC");

  const [enterBalance, setEnterBalance] = useState("1");

  const [coin1, setCoin1] = useState("ETH");
  const [stakepop, setStakepop] = useState(false);
  const [myBalance, setMyBalance] = useState({});
  const [coinSelected, setCoinSelected] = useState({});

  const [currentPrice, setCurrentPrice] = useState({});
  const [solPrice, setSolPrice] = useState({});

  const [exchangeLodaer, setExchangeLodaer] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);
  const [priveValue, setPriveValue] = useState("");
  const [currentPriceLive, setCurrentPriceLive] = useState("");
  const [solPriceLive, setSolPriceLive] = useState("");
  const [priveValue1, setPriveValue1] = useState("");
  const [priveValue2, setPriveValue2] = useState("");

  useEffect(() => {
    if (coin === "SOLANA") {
      let setLiveValue = enterBalance * solPriceLive?.quote?.USD?.price;
      const finalPrice = Number(
        setLiveValue / currentPriceLive?.quote?.USD?.price
      );

      setPriveValue1(finalPrice);
    }
    if (coin1 === "SOLANA") {
      let setLiveValue1 = enterBalance * solPriceLive?.quote?.USD?.price;
      const finalPrice1 = Number(
        setLiveValue1 / currentPriceLive?.quote?.USD?.price
      );

      setPriveValue2(finalPrice1);
    }

    let setLiveValue = enterBalance * currentPriceLive?.quote?.USD?.price;
    const finalPrice = Number(setLiveValue / currentPrice?.quote?.USD?.price);

    setPriveValue(finalPrice);
  }, [
    enterBalance,
    currentPriceLive?.quote?.USD?.price,
    currentPrice?.quote?.USD?.price,
    solPriceLive?.quote?.USD?.price,
    coin1,
    coin,
  ]);

  const handleClickOpen = () => {
    handlefalse();
    setStakepop(true);
  };
  const handlefalse = () => {
    setTimeout(() => {
      setStakepop(false);
    }, 2000);
  };
  const exchangestake = async (values) => {};

  useEffect(() => {
    const myBalance =
      user?.userBalanceData &&
      user?.userBalanceData.filter((data) => {
        return data?.coinName === coin;
      });

    const currentPrice =
      auth?.cmcResults &&
      auth?.cmcResults.filter((data) => {
        return data?.symbol === coin;
      });

    const forSol =
      auth?.cmcResults &&
      auth?.cmcResults.filter((data) => {
        return data?.symbol === "BUSD";
      });

    setSolPriceLive(forSol[0]);
    setCurrentPriceLive(currentPrice[0]);
    setMyBalance(myBalance[0]);
  }, [user?.userBalanceData, coin, auth]);

  useEffect(() => {
    const myBalance =
      user?.userBalanceData &&
      user?.userBalanceData.filter((data) => {
        return data?.coinName === coin1;
      });
    const currentPrice =
      auth?.cmcResults &&
      auth?.cmcResults.filter((data) => {
        return data?.symbol === coin1;
      });
    const forSol =
      auth?.cmcResults &&
      auth?.cmcResults.filter((data) => {
        return data?.symbol === "BUSD";
      });

    setSolPrice(forSol[0]);
    setCurrentPrice(currentPrice[0]);
    setCoinSelected(myBalance[0]);
  }, [user?.userBalanceData, coin1, auth]);

  const getExchangeAmountHandler = async () => {
    if (myBalance?.balance === 0) {
      toast.warn("Your balance is too log");
    } else {
      if (enterBalance === "" || enterBalance === "0") {
        setErrorMsg(true);
        toast.warn("Please enter the price greater than 0");
      } else {
        try {
          setExchangeLodaer(true);

          const response = await Axios({
            method: "POST",
            url: ApiConfig.transferCoinChangely,
            headers: {
              totken: localStorage.getItem("token"),
            },
            data: {
              fromSymbol: coin,
              toSymbol: coin1,
              amount: enterBalance,
            },
          });
          if (response) {
            setExchangeLodaer(false);
            handleClickOpen();
            setErrorMsg(false);
            toast.success("Transfer successfully");
          }
        } catch (error) {
          setExchangeLodaer(false);
          setErrorMsg(false);
        }
      }
    }
  };

  // useEffect(() => {
  //   getExchangeAmountHandler()
  // }, [])

  return (
    <Page title="Crypto Exchange">
      <Box className={classes.mainBox}>
        <Box style={{ marginTop: "20px" }}>
          <Box>
            <Typography variant="h2">Exchange Crypto</Typography>
          </Box>
          <Formik
            onSubmit={(values) => exchangestake(values)}
            initialValues={{
              amount: "",
              ETHAmout: "",
            }}
            initialStatus={{
              success: false,
              successMsg: "",
            }}
            // validationSchema={yep.object().shape({
            //   amount: yep.string().required(" Amount is required."),
            //   ETHAmout: yep.string().required(" Amount is required."),
            // })}
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
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={7} lg={7}>
                    <Box className={classes.ContainerBox} mt={3}>
                      <Box className="textFeild-Box">
                        <Box className={classes.maincards1}>
                          <Box className="textFeild-Box">
                            <Box
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                              }}
                            >
                              <label>
                                I have{" "}
                                {myBalance?.coinName === "VD" ? (
                                  "VDT"
                                ) : (
                                  <>{myBalance?.coinName}</>
                                )}
                              </label>
                              <label>
                                Balance{" "}
                                {myBalance?.balance ? myBalance?.balance : "0"}
                              </label>
                            </Box>
                            <Box style={{ display: "flex" }}>
                              <Box style={{ width: "100%" }}>
                                <TextField
                                  type="number"
                                  fullWidth
                                  variant="outlined"
                                  value={enterBalance}
                                  step="any"
                                  onChange={(e) =>
                                    setEnterBalance(e.target.value)
                                  }
                                  error={Boolean(
                                    touched.amount && errors.amount
                                  )}
                                  onBlur={handleBlur}
                                  // onChange={handleChange}
                                  className={`${classes.forminput}textFeilds`}
                                  InputProps={{
                                    className: classes.TextBox,
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        <Box mt={1}>
                                          <Select
                                            style={{
                                              border: "1px solid #6ECFF3",
                                              width: "130px",
                                              height: "43px",
                                              background:
                                                "linear-gradient(180deg, #00ACEB 0%, #00B0ED 10.18%, #1069C2 70.35%, #1069C2 100%)",
                                              borderRadius: "9px",
                                              marginLeft: "-14px",
                                              marginTop: "-7px",
                                            }}
                                            margin="dense"
                                            name="token"
                                            inputProps={{
                                              className: classes.Bins,
                                            }}
                                            onChange={(e) => {
                                              setCoin(e.target.value);
                                            }}
                                            value={coin}
                                          >
                                            {user?.userBalanceData &&
                                              user?.userBalanceData?.map(
                                                (data) => {
                                                  if (data?.coinName === "VD") {
                                                    return;
                                                  }
                                                  return (
                                                    <MenuItem
                                                      value={data?.coinName}
                                                      className={
                                                        classes.MenuItemFiled
                                                      }
                                                      style={{
                                                        fontSize: "12px",
                                                      }}
                                                    >
                                                      <img
                                                        src={data?.coinImage}
                                                        alt="usdt"
                                                        style={{
                                                          width: "20px",
                                                        }}
                                                      />
                                                      &nbsp;&nbsp;{" "}
                                                      {data?.coinName ===
                                                      "VD" ? (
                                                        "VDT"
                                                      ) : (
                                                        <>{data?.coinName}</>
                                                      )}
                                                    </MenuItem>
                                                  );
                                                }
                                              )}
                                          </Select>
                                        </Box>
                                      </InputAdornment>
                                    ),
                                  }}
                                  style={{ color: "#000" }}
                                />
                              </Box>
                            </Box>
                            {errorMsg && (
                              <FormHelperText error>
                                <Typography>Please enter the value</Typography>
                              </FormHelperText>
                            )}

                            <Box
                              mt={2}
                              style={{
                                display: "flex",
                                justifyContent: "right",
                              }}
                            >
                              <Box className={classes.Percentage}>
                                <Button className={classes.Percentage1}>
                                  25%
                                </Button>
                              </Box>
                              &nbsp;&nbsp;
                              <Box className={classes.Percentage}>
                                <Button className={classes.Percentage1}>
                                  50%
                                </Button>
                              </Box>
                              &nbsp;&nbsp;
                              <Box className={classes.Percentage}>
                                <Button className={classes.Percentage1}>
                                  75%
                                </Button>
                              </Box>{" "}
                              &nbsp;&nbsp;
                              <Box className={classes.Percentage}>
                                <Button className={classes.Percentage1}>
                                  100%
                                </Button>
                              </Box>
                              &nbsp;
                            </Box>
                            <Box style={{ display: "flex" }}>
                              <Box style={{ width: "100%" }}>
                                <label>I want {coin1}</label>
                                <TextField
                                  type="number"
                                  fullWidth
                                  variant="outlined"
                                  value={
                                    priveValue || priveValue1 || priveValue2
                                  }
                                  step="any"
                                  error={Boolean(
                                    touched.ETHAmout && errors.ETHAmout
                                  )}
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  className={`${classes.forminput}textFeilds`}
                                  InputProps={{
                                    className: classes.TextBox,

                                    startAdornment: (
                                      <InputAdornment position="start">
                                        <Box mt={1}>
                                          <Select
                                            style={{
                                              border: "1px solid #6ECFF3",
                                              width: "130px",
                                              height: "43px",
                                              background:
                                                "linear-gradient(180deg, #00ACEB 0%, #00B0ED 10.18%, #1069C2 70.35%, #1069C2 100%)",
                                              borderRadius: "9px",
                                              marginLeft: "-14px",
                                              marginTop: "-7px",
                                            }}
                                            margin="dense"
                                            name="token"
                                            inputProps={{
                                              className: classes.Bins,
                                            }}
                                            onChange={(e) => {
                                              setCoin1(e.target.value);
                                            }}
                                            value={coin1}
                                          >
                                            {user?.userBalanceData &&
                                              user?.userBalanceData.map(
                                                (data) => {
                                                  if (coin == data.coinName) {
                                                    return;
                                                  }
                                                  return (
                                                    <MenuItem
                                                      value={data?.coinName}
                                                      className={
                                                        classes.MenuItemFiled
                                                      }
                                                      style={{
                                                        fontSize: "12px",
                                                      }}
                                                    >
                                                      <img
                                                        src={data?.coinImage}
                                                        alt="usdt"
                                                        style={{
                                                          width: "20px",
                                                        }}
                                                      />
                                                      &nbsp;&nbsp;{" "}
                                                      {data?.coinName ===
                                                      "VD" ? (
                                                        "VDT"
                                                      ) : (
                                                        <>{data?.coinName}</>
                                                      )}
                                                    </MenuItem>
                                                  );
                                                }
                                              )}
                                          </Select>
                                        </Box>
                                      </InputAdornment>
                                    ),
                                  }}
                                  style={{ color: "#000" }}
                                />
                              </Box>
                            </Box>
                            <FormHelperText error>
                              {touched.ETHAmout && errors.ETHAmout}
                            </FormHelperText>
                          </Box>
                          <Box mt={3} align="center">
                            <Typography style={{ fontSize: "14px" }}>
                              1 {coinSelected?.coinName} ={" "}
                              {coinSelected?.coinName === "SOLANA" ? (
                                <>{solPrice?.quote?.USD?.price}</>
                              ) : (
                                <>
                                  {currentPrice?.quote?.USD?.price
                                    ? currentPrice?.quote?.USD?.price
                                    : "1"}
                                </>
                              )}{" "}
                              USD
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                    <Box mt={3} align="center">
                      <Button
                        type="submit"
                        variant="contained"
                        color="secondary"
                        style={{
                          borderRadius: "8px",
                          padding: "10px 100px !important",
                        }}
                        onClick={() => getExchangeAmountHandler()}
                      >
                        Exchange {exchangeLodaer && <ButtonCircularProgress />}
                      </Button>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={12} md={5} lg={5}>
                    <Box className={classes.fullBox}>
                      <Box className={classes.alignBox}>
                        <Box className={classes.exchangeBox}>
                          <Typography variant="body1">
                            You are exchanging
                          </Typography>
                          <Box className={classes.imgBox}>
                            <img
                              src={myBalance.coinImage}
                              alt="BTC"
                              width="100%"
                            />
                          </Box>
                          <Typography
                            variant="body1"
                            style={{ fontSize: "19px" }}
                          >
                            {enterBalance ? enterBalance : "0"}{" "}
                            {myBalance?.coinName}
                          </Typography>
                        </Box>
                        <Box className={classes.iconBox}>
                          <Box className={classes.icons1}>
                            <CgArrowsExchangeAltV
                              style={{ fontSize: "30px" }}
                            />
                          </Box>
                          <Box className={classes.icons2}>
                            <CgArrowsExchangeAlt style={{ fontSize: "30px" }} />
                          </Box>
                        </Box>
                        <Box className={classes.exchangeBox}>
                          <Typography variant="body1">
                            You are exchanging
                          </Typography>
                          <Box className={classes.imgBox}>
                            <img
                              src={coinSelected.coinImage}
                              alt="ETH"
                              width="100%"
                              style={{ borderRadius: "50%" }}
                            />
                          </Box>
                          <Typography
                            variant="body1"
                            style={{ fontSize: "19px" }}
                          >
                            {parseFloat(
                              priveValue || priveValue1 || priveValue2
                            ).toFixed(4)}{" "}
                            {coin1}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </Box>
      </Box>

      <Dialog
        fullWidth="xs"
        maxWidth="xs"
        open={stakepop}
        keepMounted
        onClose={handleClickOpen}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent>
          <Box>
            <Box align="center">
              <Typography align="" variant="h5">
                Exchange Successfully
              </Typography>
            </Box>
          </Box>
          <Box align="center">
            <img src="images/checked.png" alt="" />
          </Box>

          <Box mt={2} mb={3} className={classes.popupBox}>
            <Box>
              <Typography>Exchange Amount</Typography>
              <Typography>Exchange Date</Typography>
              <Typography>Payout Date</Typography>
            </Box>
            <Box>
              <Typography>10.23 BTC</Typography>
              <Typography>22/09/2022 11:00 AM</Typography>
              <Typography>22/09/2022 11:00 AM</Typography>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </Page>
  );
};

export default CryptoExchange;
