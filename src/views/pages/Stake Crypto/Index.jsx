import React, { useState, useEffect, useContext } from "react";
import Page from "@component/Page";
import {
  Box,
  Typography,
  makeStyles,
  Button,
  Grid,
  TextField,
  InputAdornment,
  MenuItem,
  Dialog,
  Select,
  DialogContent,
  FormHelperText,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import * as yep from "yup";
import { Form, Formik } from "formik";
import Axios from "axios";
import ApiConfig from "../../../config/APIConfig";
import StakeChild from "./StakeChild";
import { AuthContext } from "@context/Auth";
import { toast } from "react-toastify";
import moment from "moment";
import { InfoOutlined } from "@material-ui/icons";
import StakingData from "./StakingData";
import ButtonCircularProgress from "@component/ButtonCircularProgress";
import { UserContext } from "@context/User";

const useStyles = makeStyles((theme) => ({
  mainbox: {
    padding: "20px 0px 30px",
    background: theme.palette.background.dark,

    [theme.breakpoints.down("sm")]: {
      padding: "0px 0px 30px",
    },
    "& p": {
      fontSize: "14px !important",
      lineHeight: 2.6,
      "@media(max-width:600px)": {
        fontSize: "13px !important",
      },
    },
    "& .CardBox": {
      border: "1px solid #ECECEC",
      background: "#6647BF",
      position: "relative",
      borderRadius: "4px",
      padding: "11px 8px 10px 10px ",
      minHeight: "150px",
      borderTopLeftRadius: "10px",
      borderTopRightRadius: "10px",
      borderBottomRightRadius: "10px",
      borderBottomLeftRadius: "10px",

      "& h2": {
        fontFamily: "'Inter'",
        fontStyle: "normal",
        fontWeight: "500",
        fontSize: "16px",
        lineHeight: "19px",
        color: "#FFFFFF",
        paddingBottom: "10px",
      },
      "& h3": {
        fontSize: "15px",
        color: "#dedcdc",
        fontFamily: "Inter",
      },
      "& h1": {
        fontFamily: "'Inter'",
        fontStyle: "normal",
        fontWeight: "600",
        fontSize: "18px",
        lineHeight: "22px",
        color: "#FFFFFF",
      },

      "& h4": {
        fontFamily: "'Inter'",
        fontStyle: "normal",
        fontWeight: "700",
        fontSize: "35px",
        lineHeight: "22px",
        color: "#FFFFFF",
      },
    },
  },
  Percentage: {
    border: "1px solid #6ECFF3",
    borderRadius: "4px",
    textAlign: "center",
  },
  Percentage1: {
    color: theme.palette.text.primary,
  },
  Bins: {
    fontSize: "16px",
    display: "flex",
    alignItems: "center",
    paddingLeft: "10px",
    paddingTop: "5px",
    color: "#fff !important",
  },
  sideBox: {
    position: "absolute",
    width: "105px",
    height: "80px",
    top: "0px",
    right: "0px",
    borderBottomLeftRadius: "100px",
    background: "#7B5FD0",
    borderTopRightRadius: "10px",
  },
  sideBox1: {
    position: "absolute",
    width: "40px",

    top: "15px",
    right: "20px",
  },
  Circledown: {
    top: "129px",
    left: "0px",
    width: "40px",
    height: "42px",
    position: "absolute",
    background: "#7B5FD0",
    borderBottomLeftRadius: "100px",
    transform: "rotate(180deg)",
  },
  gridflex: {
    display: "flex",
    justifyContent: "flex-end",
    position: "relative",
    "@media(max-width:959px)": {
      justifyContent: "left",
      display: "block",
    },
  },
  mainBox: {
    "& h2": {
      fontSize: "25px",
      fontWeight: "600",
    },
  },
  maincards: {
    background:
      "linear-gradient(180deg, rgba(0, 172, 235, 0.1) 0%, rgba(0, 176, 237, 0.1) 10.18%, rgba(16, 105, 194, 0.1) 70.35%, rgba(16, 105, 194, 0.1) 100%)",
    borderRadius: "10px",
    border: "1px solid #6ECFF3",
    marginTop: "40px",
    padding: "34px",
    [theme.breakpoints.down("sm")]: {
      marginTop: "-2px",
    },

    "& h3": {
      fontFamily: "'Inter'",
      fontStyle: "normal",
      fontWeight: "600",
      fontSize: "24px",
      lineHeight: "29px",
      // color: "#44484E",
      color: theme.palette.text.primary,
    },
  },
  maincards1: {
    background:
      "linear-gradient(180deg, rgba(0, 172, 235, 0.1) 0%, rgba(0, 176, 237, 0.1) 10.18%, rgba(16, 105, 194, 0.1) 70.35%, rgba(16, 105, 194, 0.1) 100%)",
    borderRadius: "10px",
    border: "1px solid #6ECFF3",
    marginTop: "40px",
    padding: "40px",
  },
  HeadingBox: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    border: "1px solid #6ECFF3",
    padding: "15px",
    borderRadius: "4px",
    "& h5": {
      fontSize: "14px ",
      fontFamily: "'Inter'",
      fontStyle: "normal",
      fontWeight: "500",
      lineHeight: "15px",
      color: theme.palette.text.primary,
    },
  },
  ButtonBoxStyle: {
    "@media(max-width:650px)": {
      marginTop: "10px",
    },
  },
  popupBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
  },

  IconBox: {
    position: "absolute",
    right: "5px",
    bottom: "5px",
  },
}));

const StakeCrypto = () => {
  const classes = useStyles();
  const auth = useContext(AuthContext);
  const user = useContext(UserContext);

  const Summary = auth?.view[0];

  const [coin, setCoin] = useState("VD");
  const [stateData, setStakeData] = useState([]);

  const history = useHistory();
  const [block, setBlock] = useState(false);
  const [interestAmount, setInterstAmount] = useState("");

  const [coinName, setCoinName] = useState("");

  const [interestData, setInterest] = useState();

  const [minimumBal, setMinimumBal] = useState("");

  const [availableBalance, setavailableBalance] = useState(0);
  const [stateDataFilter, setStateDataFilter] = useState(0);

  const [newsvalueAmount, setNewValueAmount] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [isSubmit, setsetisSubmit] = useState(false);
  const [stakeData, setStakeDataList] = useState({});

  const [totalStake, setTotalStake] = useState({});
  const [totalEarnStake, setTotalEarnStake] = useState({});
  const [cryptoOpen, setCryptoOpen] = useState(false);
  const [coinPrice, setCoinPrice] = useState("");
  const [allToken, setallToken] = useState({});

  const toCalInterst = () => {
    let setvalue = (interestAmount * interestData) / 100;
    setNewValueAmount(Number(setvalue) + Number(interestAmount));
  };

  useEffect(() => {
    toCalInterst();
  }, [interestAmount, interestData]);
  const handleClickOpen = () => {
    handlefalse();
    setBlock(true);
  };
  const handlefalse = () => {
    setTimeout(() => {
      setBlock(false);
      history.push("/viewstake");
    }, 3000);
  };

  const activeStakeHandler = async () => {
    try {
      const res = await Axios({
        method: "GET",
        url: ApiConfig.stakeInterestList,
        headers: {
          token: window.localStorage.getItem("token"),
        },
      });
      if (res.data.responseCode === 200) {
        setStakeData(res.data.result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    activeStakeHandler();
  }, []);

  const fixedDepositHandler = async () => {
    setIsLoading(true);
    // setsetisSubmit(true);

    try {
      const res = await Axios({
        method: "POST",
        url: ApiConfig.addStake,
        headers: {
          token: window.localStorage.getItem("token"),
        },
        data: {
          price: interestAmount,
          coinType: coinName,
          payoutAmount: Number(newsvalueAmount).toString(),
        },
      });
      if (res.data.responseCode === 200) {
        setIsLoading(false);
        setsetisSubmit(false);
        toast.success(res.data.message);
        setStakeDataList(res?.data?.data?.result);
        auth.ViewStakeHandler();
        handleClickOpen();
      }
      setIsLoading(false);
      setsetisSubmit(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setsetisSubmit(false);
    }
  };
  useEffect(() => {
    if (user?.userBalanceData.length > 0) {
      let balanceList = user?.userBalanceData;
      const balanceFilter = balanceList.filter((data) => {
        return data.coinName == coin;
      })[0];
      setavailableBalance(balanceFilter.balance);
    }
  }, [user?.userBalanceData, coin]);
  useEffect(() => {
    if (stateData.length > 0) {
      let balanceList = stateData;
      const balanceFilter = balanceList.filter((data) => {
        return data?.coinId?.coinName == coin;
      })[0];

      setStateDataFilter(balanceFilter);
    }
  }, [stateData, coin]);

  const earnstakeHandler = async () => {
    try {
      const res = await Axios({
        method: "GET",
        url: ApiConfig.stakeDashboard,
        headers: {
          token: window.localStorage.getItem("token"),
        },
      });

      if (res.data.responseCode === 200) {
        setTotalStake(res.data.result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    earnstakeHandler();
  }, []);

  const getVirtualDineroValue = async () => {
    try {
      const res = await Axios({
        method: "GET",
        url: ApiConfig.getVirtualDinero,
        headers: {
          token: window.localStorage.getItem("token"),
        },
      });
      if (res.data.responseCode === 200) {
        setallToken(res?.data?.result);
      }
    } catch (error) {
      if (error.response) {
      } else {
        toast.error(error.responseMessage);
      }
    }
  };

  useEffect(() => {
    if (auth?.userData?._id) {
      getVirtualDineroValue();
    }
  }, [auth?.userData?._id]);

  return (
    <Page title="Stake Crypto">
      <Box style={{ marginTop: "20px" }} className={classes.mainBox}>
        <Box>
          <Box>
            <Typography variant="h2">Coin Stake</Typography>
            {/* <Typography variant="body1">
              Lorem ipsum dolor sit amet, consectetur adipiscing
            </Typography> */}
          </Box>
          <Box align="right" className={classes.ButtonBoxStyle}>
            <Button
              variant="contained"
              color="secondary"
              style={{ borderRadius: "4px" }}
              onClick={() => history.push("/viewstake")}
            >
              View your stakes
            </Button>
          </Box>
          <Box className={classes.mainbox}>
            <Box mt={4}>
              <Grid container spacing={3}>
                <Grid item lg={4} md={4} sm={6} xs={12}>
                  <Box
                    className="CardBox"
                    style={{
                      backgroundColor: "#6647BF",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Box
                      className={classes.sideBox}
                      style={{ backgroundColor: "#7B5FD0" }}
                    ></Box>
                    {/* <Box
                      className={classes.Circledown}
                      style={{ backgroundColor: "#7B5FD0" }}
                    ></Box> */}

                    <Box>
                      <Box mt={2} mb={2} align="center">
                        <Typography variant="h4">
                          {/* {totalStake?.tolatStake
                            ? totalStake?.tolatStake
                            : "0"} */}
                          {parseFloat(
                            totalStake?.tolatStake
                              ? totalStake?.tolatStake
                              : "0"
                          ).toFixed(4)}
                        </Typography>
                      </Box>

                      <Box mt={1} align="center">
                        <Typography variant="h1">
                          Total amount in Stake
                        </Typography>
                      </Box>
                    </Box>
                    <Box align="end" className={classes.IconBox}>
                      <InfoOutlined
                        style={{ color: "#fff", cursor: "pointer" }}
                        onClick={() => setCryptoOpen(true)}
                      />
                    </Box>
                  </Box>
                </Grid>
                <Grid item lg={4} md={4} sm={6} xs={12}>
                  <Box
                    className="CardBox"
                    style={{
                      backgroundColor: "#2E7FCA",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Box
                      className={classes.sideBox}
                      style={{ backgroundColor: "#3F90DB" }}
                    ></Box>
                    {/* <Box
                      className={classes.Circledown}
                      style={{ backgroundColor: "#3F90DB" }}
                    ></Box> */}

                    <Box>
                      <Box mt={2} mb={2} align="center">
                        <Typography variant="h4">
                          {/* {parseFloat(
                            totalStake?.earning ? totalStake?.earning : "0"
                          ).toFixed(4)} */}
                          {parseFloat(
                            totalStake?.expectEarning
                              ? totalStake?.expectEarning
                              : "0"
                          ).toFixed(4)}
                        </Typography>
                      </Box>

                      <Box mt={1} align="center">
                        <Typography variant="h1">Expect Earnings</Typography>
                      </Box>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>

            <Grid container spacing={2}>
              <Grid item lg={7} md={7} sm={12} xs={12}>
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
                        I have {coinName === "VD" ? "VDT" : <>{coinName}</>}
                      </label>
                      <label>Balance {coinPrice}</label>
                    </Box>
                    <Box style={{ display: "flex" }}>
                      <Box style={{ width: "100%" }}>
                        <TextField
                          className={classes.forminput}
                          type="number"
                          fullWidth
                          variant="outlined"
                          step="any"
                          name="amount"
                          onChange={(e) => {
                            setInterstAmount(e.target.value);
                            setsetisSubmit(true);
                          }}
                          InputProps={{
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
                                      user?.userBalanceData?.map((data) => (
                                        <MenuItem
                                          value={data?.coinName}
                                          className={classes.MenuItemFiled}
                                          style={{ fontSize: "12px" }}
                                        >
                                          <img
                                            src={data?.coinImage}
                                            alt="usdt"
                                            style={{ width: "20px" }}
                                          />
                                          &nbsp;{" "}
                                          {data?.coinName === "VD" ? (
                                            "VDT"
                                          ) : (
                                            <>{data?.coinName}</>
                                          )}
                                        </MenuItem>
                                      ))}
                                  </Select>
                                </Box>
                              </InputAdornment>
                            ),
                          }}
                          style={{ color: "#000" }}
                        />
                        <FormHelperText error>
                          {(isSubmit &&
                            Number(interestAmount) > Number(availableBalance) &&
                            "low balance") ||
                            (isSubmit &&
                              Number(interestAmount) >
                                Number(stateDataFilter?.max) &&
                              `User can stake maximum ${stateDataFilter.max} ${coin}`) ||
                            (isSubmit &&
                              Number(interestAmount) <
                                Number(stateDataFilter?.min) &&
                              `User can stake minimum ${stateDataFilter.min} ${coin}`)}
                        </FormHelperText>
                      </Box>
                    </Box>

                    {stateDataFilter?.coinId?.coinName === "VD" && (
                      <StakeChild
                        stateData={stateData[3]}
                        classes={classes}
                        handleClickOpen={handleClickOpen}
                        user={user?.userBalanceData[3]}
                        setCoinName={setCoinName}
                        setInterest={setInterest}
                        setMinimumBal={setMinimumBal}
                        fixedDepositHandler={fixedDepositHandler}
                        newsvalueAmount={newsvalueAmount}
                        isLoading={isLoading}
                        interestAmount={interestAmount}
                        availableBalance={availableBalance}
                        setCoinPrice={setCoinPrice}
                      />
                    )}
                    {coin === "BTC" && (
                      <StakeChild
                        stateData={stateData[5]}
                        classes={classes}
                        handleClickOpen={handleClickOpen}
                        user={user?.userBalanceData[5]}
                        setCoinName={setCoinName}
                        setInterest={setInterest}
                        setMinimumBal={setMinimumBal}
                        fixedDepositHandler={fixedDepositHandler}
                        newsvalueAmount={newsvalueAmount}
                        isLoading={isLoading}
                        interestAmount={interestAmount}
                        availableBalance={availableBalance}
                        setCoinPrice={setCoinPrice}
                      />
                    )}
                    {coin === "MATIC" && (
                      <StakeChild
                        stateData={stateData[6]}
                        classes={classes}
                        handleClickOpen={handleClickOpen}
                        user={user?.userBalanceData[6]}
                        setCoinName={setCoinName}
                        setInterest={setInterest}
                        setMinimumBal={setMinimumBal}
                        fixedDepositHandler={fixedDepositHandler}
                        isLoading={isLoading}
                        newsvalueAmount={newsvalueAmount}
                        interestAmount={interestAmount}
                        availableBalance={availableBalance}
                        setCoinPrice={setCoinPrice}
                      />
                    )}

                    {coin === "ETH" && (
                      <StakeChild
                        stateData={stateData[8]}
                        classes={classes}
                        handleClickOpen={handleClickOpen}
                        user={user?.userBalanceData[8]}
                        setCoinName={setCoinName}
                        setInterest={setInterest}
                        setMinimumBal={setMinimumBal}
                        fixedDepositHandler={fixedDepositHandler}
                        isLoading={isLoading}
                        newsvalueAmount={newsvalueAmount}
                        interestAmount={interestAmount}
                        availableBalance={availableBalance}
                        setCoinPrice={setCoinPrice}
                      />
                    )}
                    {coin === "BNB" && (
                      <StakeChild
                        stateData={stateData[7]}
                        classes={classes}
                        handleClickOpen={handleClickOpen}
                        user={user?.userBalanceData[7]}
                        setCoinName={setCoinName}
                        setInterest={setInterest}
                        setMinimumBal={setMinimumBal}
                        fixedDepositHandler={fixedDepositHandler}
                        isLoading={isLoading}
                        newsvalueAmount={newsvalueAmount}
                        interestAmount={interestAmount}
                        availableBalance={availableBalance}
                        setCoinPrice={setCoinPrice}
                      />
                    )}
                    {/* {coin === "LTC" && (
                      <StakeChild
                        stateData={stateData[0]}
                        classes={classes}
                        handleClickOpen={handleClickOpen}
                        user={user?.userBalanceData[0]}
                        setCoinName={setCoinName}
                        setInterest={setInterest}
                        setMinimumBal={setMinimumBal}
                        fixedDepositHandler={fixedDepositHandler}
                        isLoading={isLoading}
                        newsvalueAmount={newsvalueAmount}
                        interestAmount={interestAmount}
                        availableBalance={availableBalance}
                        setCoinPrice={setCoinPrice}
                      />
                    )} */}
                    {coin === "AVAX" && (
                      <StakeChild
                        stateData={stateData[4]}
                        classes={classes}
                        handleClickOpen={handleClickOpen}
                        user={user?.userBalanceData[4]}
                        setCoinName={setCoinName}
                        setInterest={setInterest}
                        setMinimumBal={setMinimumBal}
                        fixedDepositHandler={fixedDepositHandler}
                        isLoading={isLoading}
                        newsvalueAmount={newsvalueAmount}
                        interestAmount={interestAmount}
                        availableBalance={availableBalance}
                        setCoinPrice={setCoinPrice}
                      />
                    )}
                    {coin === "USDC" && (
                      <StakeChild
                        stateData={stateData[1]}
                        classes={classes}
                        handleClickOpen={handleClickOpen}
                        user={user?.userBalanceData[1]}
                        setCoinName={setCoinName}
                        setInterest={setInterest}
                        setMinimumBal={setMinimumBal}
                        fixedDepositHandler={fixedDepositHandler}
                        isLoading={isLoading}
                        newsvalueAmount={newsvalueAmount}
                        interestAmount={interestAmount}
                        availableBalance={availableBalance}
                        setCoinPrice={setCoinPrice}
                      />
                    )}
                    {coin === "USDT" && (
                      <StakeChild
                        stateData={stateData[2]}
                        classes={classes}
                        handleClickOpen={handleClickOpen}
                        user={user?.userBalanceData[2]}
                        setCoinName={setCoinName}
                        setInterest={setInterest}
                        setMinimumBal={setMinimumBal}
                        fixedDepositHandler={fixedDepositHandler}
                        isLoading={isLoading}
                        newsvalueAmount={newsvalueAmount}
                        interestAmount={interestAmount}
                        availableBalance={availableBalance}
                        setCoinPrice={setCoinPrice}
                      />
                    )}
                    {coin === "BUSD" && (
                      <StakeChild
                        stateData={stateData[0]}
                        classes={classes}
                        handleClickOpen={handleClickOpen}
                        user={user?.userBalanceData[0]}
                        setCoinName={setCoinName}
                        setInterest={setInterest}
                        setMinimumBal={setMinimumBal}
                        fixedDepositHandler={fixedDepositHandler}
                        isLoading={isLoading}
                        newsvalueAmount={newsvalueAmount}
                        interestAmount={interestAmount}
                        availableBalance={availableBalance}
                        setCoinPrice={setCoinPrice}
                      />
                    )}
                  </Box>
                </Box>
              </Grid>
              <Grid item lg={5} md={5} sm={12} xs={12}>
                {auth.isLoading || auth?.view.length < 0 ? (
                  <ButtonCircularProgress />
                ) : (
                  <Box className={classes.maincards}>
                    <Box mb={2}>
                      <Typography variant="h3">Summary</Typography>
                    </Box>
                    <Box
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Box>
                        <Typography variant="body1">Stake Date</Typography>
                        <Typography variant="body1">Start Date</Typography>{" "}
                        <Typography variant="body1">Term</Typography>{" "}
                        <Typography variant="body1">Payout Amount</Typography>{" "}
                        <Typography variant="body1">Payout Date</Typography>{" "}
                      </Box>
                      <Box style={{ textAlign: "right" }}>
                        <Typography variant="body1">
                          {Summary?.createdAt ? (
                            <>{moment(Summary?.createdAt).format("lll")}</>
                          ) : (
                            "N/A"
                          )}
                        </Typography>
                        <Typography variant="body1">
                          {Summary?.createdAt ? (
                            <>{moment(Summary?.createdAt).format("lll")}</>
                          ) : (
                            "N/A"
                          )}
                        </Typography>{" "}
                        <Typography variant="body1">
                          {Summary?.terms && "1 Year"
                            ? Summary?.terms && "1 Year"
                            : "1 Year"}
                        </Typography>
                        <Typography variant="body1">
                          {Summary?.payoutAmount
                            ? Summary?.payoutAmount
                            : "N/A"}
                        </Typography>{" "}
                        <Typography variant="body1">
                          {Summary?.toDate ? (
                            <>{moment(Summary?.toDate).format("lll")}</>
                          ) : (
                            "N/A"
                          )}
                        </Typography>{" "}
                      </Box>
                    </Box>
                    {/* <Box mt={2} className={classes.HeadingBox}>
                    <Box>
                      <Typography variant="h5">Est.APY</Typography>
                    </Box>
                    <Box>
                      <Typography variant="h5">24.13%</Typography>
                    </Box>
                  </Box> */}
                    {/* <Box mt={2} className={classes.HeadingBox}>
                      <Box>
                        <Typography variant="h5">Est.Interest</Typography>
                      </Box>
                      <Box>
                        <Typography variant="h5">
                          {interestData?.interest}
                        </Typography>
                      </Box>
                    </Box> */}
                  </Box>
                )}
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
      <Dialog
        fullWidth="xs"
        maxWidth="xs"
        open={block}
        keepMounted
        onClose={handleClickOpen}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent>
          <Box>
            <Box align="center">
              <Typography align="" variant="h5">
                Staked Successfully
              </Typography>
            </Box>
          </Box>
          <Box align="center">
            <img src="images/checked.png" alt="" />
          </Box>

          <Box mt={2} mb={3} className={classes.popupBox}>
            <Box>
              <Typography>Staked Amount </Typography>
              <Typography>Staked Date</Typography>
              <Typography>Payout Date</Typography>
            </Box>
            <Box>
              <Typography>
                {interestAmount} {coinName}
              </Typography>
              <Typography>
                {moment(Summary?.createdAt).format("lll")}
              </Typography>
              <Typography>{moment(Summary?.toDate).format("lll")}</Typography>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>

      {cryptoOpen && (
        <Dialog
          open={cryptoOpen}
          onClose={() => setCryptoOpen(false)}
          maxWidth="md"
          fullWidth
        >
          <DialogContent>
            <StakingData classes={classes} />
          </DialogContent>
        </Dialog>
      )}
    </Page>
  );
};

export default StakeCrypto;
