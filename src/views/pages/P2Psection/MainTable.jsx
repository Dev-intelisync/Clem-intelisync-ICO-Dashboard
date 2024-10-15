import React, { useState, useContext, useEffect } from "react";
import {
  Typography,
  Box,
  Grid,
  Button,
  TableContainer,
  IconButton,
  Table,
  TableRow,
  TableCell,
  TableBody,
  InputAdornment,
  TextField,
  TableHead,
  makeStyles,
  Dialog,
  DialogContent,
  FormHelperText,
} from "@material-ui/core";
import { AuthContext } from "@context/Auth";
import { useHistory } from "react-router-dom";
import axios from "axios";
import ApiConfig from "../../../config/APIConfig";
import { Pagination } from "@material-ui/lab";
import { toast } from "react-toastify";
import DataNotFoundIMG from "@component/DataNotFoundIMG";
import { UserContext } from "@context/User";

const useStyles = makeStyles((theme) => ({
  headbox: {
    borderRadius: "20px",
    marginTop: "20px",
    "& h4": {
      fontFamily: "'Inter'",
      fontStyle: "normal",
      fontWeight: "600",
      fontSize: "30px",
      lineHeight: "29px",
      color: theme.palette.text.primary,
    },
    // overflow: "auto",
    [theme.breakpoints.down("sm")]: {
      padding: "20px 7px 53px 7px",
      borderRadius: "16px",
    },
  },
  tabsize: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#fff",
    [theme.breakpoints.down("xs")]: {
      fontSize: "14px",
    },
  },

  forminput: {
    "& div": {
      color: theme.palette.text.primary,
      // color: "#1D2D3F",
    },
  },

  spantext: {
    color: theme.palette.text.primary,
  },
  TextBox: {
    borderRadius: "10px",
    // background: theme.palette.background.taf,
  },
  MainBoxstyle: {
    background:
      "linear-gradient(180deg, rgba(0, 172, 235, 0.1) 0%, rgba(0, 176, 237, 0.1) 10.18%, rgba(16, 105, 194, 0.1) 70.35%, rgba(16, 105, 194, 0.1) 100%)",
    borderRadius: "10px",
    border: "1px solid #6ECFF3",
    padding: "20px",
  },
  download: {
    fontSize: "17px",
    cursor: "pointer",
    "&:hover": {
      color: "red",
    },
  },
  clearButton: {
    color: theme.palette.text.primary,
    border: "1px solid #3B99DF",
    borderRadius: "8px",
    padding: "8px 40px ",
    marginTop: "5px",
  },
  arrowup: {
    backgroundColor: "#ff5722",

    color: "#000",
    width: "30px",
    height: "30px",
  },
  arrowup1: {
    backgroundColor: "yellow",
    color: "#000",
    width: "30px",
    height: "30px",
  },
  arrowup2: {
    backgroundColor: "green",
    color: "#000",
    width: "30px",
    height: "30px",
  },
  table: {
    minWidth: 1100,
    // border: "1px solid #3a96dd ",
  },
  bin: {
    padding: "9px 8px",
    border: "1px solid #6ECFF3 !important",
  },
  Subtilebox: {
    "& h6": {
      fontFamily: "'Inter'",
      fontStyle: "normal",
      fontWeight: "500",
      fontSize: "14px",
      lineHeight: "24px",
    },
  },
  TextBoxFiled: {
    "& h6": {
      fontFamily: "'Inter'",
      fontStyle: "normal",
      fontWeight: "400",
      fontSize: "14px",
      lineHeight: "22px",
    },
  },
  IconButtonBox: {
    fontSize: "14px",
    color: `${theme.palette.text.primary} !important`,
  },
}));

function TransactionMain({ advertisementList, pageCount, isLoading }) {
  const classes = useStyles();
  const [advertisementData, setAdvertisementData] = useState("");
  const [peerToPeerExchangeId, setpeerToPeerExchangeId] = useState("");
  const [amountInRange, setamountInRange] = useState("");
  const [isSubmit, setisSubmit] = useState(false);
  const [block, setBlock] = useState(false);
  const auth = useContext(AuthContext);
  const user = useContext(UserContext);
  const history = useHistory();
  const [page, setPage] = useState(1);
  const [pagesCount, setPagesCount] = useState(1);
  const [priceinUSD, setPriceinUSD] = useState(0);
  const [priceinINR, setPriceinINR] = useState(0);
  const [currencyPrice, setCurrencyPrice] = useState();
  const [dataId, setDataId] = useState({});
  const [avaliableBalnce, setAvaliableBalnce] = useState([]);
  const [bankIdParticular, setBankIdParticular] = useState("");
  useEffect(() => {
    if (amountInRange > 0) {
      // if (formData?.fiatCoin !== "NA") {
      if (advertisementData?.valueInCoinType == "INR") {
        setCurrencyPrice(amountInRange / priceinINR);
      } else {
        setCurrencyPrice(amountInRange / priceinUSD);
      }
      // }
    } else {
      setCurrencyPrice("");
    }
  }, [amountInRange, priceinINR, priceinUSD]);

  useEffect(() => {
    // if (formData?.assets != "NA") {
    if (auth.cmcResults.length > 0) {
      let cmcCoinPrice = auth.cmcResults.filter(
        (results) => results.symbol == dataId?.asset
      )[0]?.quote?.USD?.price;
      setPriceinUSD(cmcCoinPrice);
      setPriceinINR(cmcCoinPrice * auth.iNRPriceinUSD);
    }
    // }
  }, [advertisementData?.coinType, dataId]);

  const handleClose2 = () => {
    setisSubmit(false);
    setBlock(false);
    setamountInRange("");
  };
  const HandleClickSell = async (id) => {
    setpeerToPeerExchangeId(id.peerToPeerExchangeId);
    try {
      const res = await axios.get(ApiConfig.getDetailsAfterPressSellButton, {
        headers: {
          token: window.localStorage.getItem("token"),
        },
        params: {
          peerToPeerExchangeId: id.peerToPeerExchangeId,
        },
      });
      if (res.data.responseCode === 200) {
        setAdvertisementData(res.data.data);
        // var data = res.data.data;
        // var newRequest = [];
        // data.map((accountsD) => {
        //   newRequest.push(accountsD.bankName);
        // });
        // setBankD(newRequest);
        setBlock(true);
      } else if (res.data.status === 201) {
      }
    } catch (error) {
      console.log("err", error);
    }
  };
  const HandleClickBuy = async (id) => {
    setpeerToPeerExchangeId(id.peerToPeerExchangeId);
    try {
      const res = await axios.get(ApiConfig.getDetailsAfterPressBuyButton, {
        headers: {
          token: window.localStorage.getItem("token"),
        },
        params: {
          peerToPeerExchangeId: id.peerToPeerExchangeId,
        },
      });
      if (res.data.status === 200) {
        setAdvertisementData(res.data.data);
        // var data = res.data.data;
        // var newRequest = [];
        // data.map((accountsD) => {
        //   newRequest.push(accountsD.bankName);
        // });
        // setBankD(newRequest);
        setBlock(true);
      } else if (res.data.status === 201) {
      }
    } catch (error) {
      console.log("err", error);
    }
  };

  const HandleSendTradeRequest = async (id) => {
    try {
      setisSubmit(true);
      const res = await axios({
        method: "POST",
        url: ApiConfig.sendTradeRequest,
        headers: {
          token: window.localStorage.getItem("token"),
        },
        params: {
          peerToPeerExchangeId: Number(peerToPeerExchangeId),
          // restrictAmount: "restrictAmount",
          amountInRange: amountInRange,
        },
      });
      if (res.data.status === 200) {
        // setAdvertisementData(res.data.data);;
        toast.success(res.data.message);
        // console.log(
        //   res.data.data.peerToPeerExchangeId,
        //   "<<<<---peerToPeerExchangeId---log------tradeid ---->>",
        //   res.data.data.tradeId
        // );
        history.push({
          pathname: `/buy`,
          search: res.data.data.tradeId,
          hash: res.data.data.toUserId.toString(),
        });
        setBlock(true);
      } else if (res.data.status === 201) {
        toast.warn(res.data.message);
      } else if (res.data.status === 515) {
        toast.error(res.data.message);
        history.push(`/add-kyc`);
      } else {
        toast.warn(res.data.message);
        // history.push(`/add-kyc`);
      }
    } catch (error) {
      console.log("err", error);
    }
  };

  const setData = (data) => {
    setDataId(data);
    setBlock(true);
    setBankIdParticular(data?.bankId);
  };
  const showInterest = async () => {
    try {
      const res = await axios({
        method: "PATCH",
        url: ApiConfig.showInterestP2PAdvertisement,
        headers: {
          token: window.localStorage.getItem("token"),
        },
        params: {
          _id: dataId?._id,
          quantity: currencyPrice,
          // quantity: amountInRange,
          // price: currencyPrice,
          price: amountInRange,
        },
      });
      if (res.data.responseCode === 200) {
        toast.success(res.data.responseMessage);
        history.push({
          pathname: "/buy",
          search: res.data.result.userId?._id,
          hash: res.data.result._id.toString(),
          state: {
            chatId: res.data.result.chatId,
            bankID: bankIdParticular,
            timeOut: res.data.result.paymentWindowTime,
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (dataId?.asset) {
      const priceFilterData = user?.userBalanceData?.filter((data) => {
        return data?.coinName === dataId?.asset;
      });
      setAvaliableBalnce(priceFilterData);
    }
  }, [user?.userBalanceData, dataId?.asset]);

  return (
    <>
      <Box className={classes.headbox} pr={1}>
        <Box mt={2} width="100%">
          <>
            <TableContainer className="TableContainerBox">
              <Table aria-label="simple table" className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell align="left" style={{ width: "130px" }}>
                      Advertisers
                    </TableCell>
                    <TableCell align="left">Crypto Amount </TableCell>
                    <TableCell align="left">Limit/Available</TableCell>
                    <TableCell align="left">Payment</TableCell>

                    <TableCell align="left">Fiat Currency </TableCell>

                    <TableCell align="center">Trade </TableCell>
                  </TableRow>
                </TableHead>
                {advertisementList.length > 0 && (
                  <TableBody>
                    {advertisementList &&
                      advertisementList?.map((advertisement, i) => {
                        return (
                          <>
                            <TableRow className={classes.tables}>
                              <TableCell
                                padding="5px"
                                width="100"
                                component="th"
                                scope="row"
                                align="left"
                                style={{ textTransform: "capitalize" }}
                              >
                                {advertisement?.userId?.firstName
                                  ? advertisement?.userId?.firstName
                                  : "N/A"}
                              </TableCell>
                              <TableCell align="left">
                                {advertisement?.quantity}&nbsp;
                                {advertisement?.asset
                                  ? advertisement?.asset
                                  : "N/A"}
                                {/* {advertisement?.price}&nbsp;
                                {advertisement?.currency
                                  ? advertisement?.currency
                                  : "N/A"} */}
                              </TableCell>{" "}
                              <TableCell align="left">
                                {advertisement?.minOrderLimit} ~{" "}
                                {advertisement?.maxOrderLimit}
                              </TableCell>
                              <TableCell align="left">
                                {advertisement?.bankId?.bankType
                                  ? advertisement?.bankId?.bankType
                                  : "N/A"}
                              </TableCell>
                              <TableCell align="left">
                                {advertisement.currency
                                  ? advertisement.currency
                                  : "N/A"}
                              </TableCell>{" "}
                              <TableCell align="center">
                                <Box mt={-5}>
                                  {advertisement?.tradeType == "BUY" ? (
                                    <Button
                                      // variant="contained"
                                      fullWidth
                                      onClick={() => {
                                        // HandleClickBuy(advertisement);
                                        setData(advertisement);
                                        if (dataId?._id) {
                                          // showInterest()
                                          setBlock(true);
                                        }
                                      }}
                                      // color="secondary"
                                      style={{
                                        color: "#fff",

                                        backgroundColor: "#3ECB81",
                                        borderRadius: "8px",
                                        padding: "8px 20px ",
                                        marginTop: "35px",
                                        width: "100px",
                                      }}
                                    >
                                      BUY
                                    </Button>
                                  ) : (
                                    <Button
                                      // variant="contained"
                                      fullWidth
                                      onClick={() => {
                                        HandleClickSell(advertisement);
                                      }}
                                      // color="secondary"
                                      style={{
                                        color: "#fff",
                                        backgroundColor: "red",
                                        borderRadius: "8px",
                                        padding: "8px 20px ",
                                        marginTop: "35px",
                                        width: "100px",
                                      }}
                                    >
                                      SELL
                                    </Button>
                                  )}
                                </Box>
                              </TableCell>{" "}
                            </TableRow>
                          </>
                        );
                      })}
                  </TableBody>
                )}
              </Table>
            </TableContainer>{" "}
            {(advertisementList &&
              advertisementList.length === 0 &&
              advertisementList.length === undefined) ||
              advertisementList.length === null ||
              (advertisementList.length === 0 && <DataNotFoundIMG />)}
          </>
        </Box>
        {advertisementList && advertisementList.length > 6 && (
          <Pagination
            count={pagesCount}
            page={page}
            onChange={(e, v) => setPage(v)}
          />
        )}
      </Box>

      <Dialog
        fullWidth="lg"
        maxWidth="lg"
        open={block}
        keepMounted
        onClose={handleClose2}
      >
        <DialogContent>
          <Grid container spacing={2}>
            <Grid
              item
              lg={7}
              md={6}
              sm={12}
              xs={12}
              style={{ borderRight: "1px solid #848484" }}
            >
              <Box mt={2} mb={2}>
                <Typography>{advertisementData?.userName}</Typography>
              </Box>

              <Box style={{ display: "flex", justifyContent: "space-between" }}>
                <Box>
                  <Typography>
                    Price{" "}
                    <span style={{ color: "#3BC952" }}>
                      {dataId?.price} {dataId?.priceType}
                    </span>
                  </Typography>
                  <br />
                  <Typography>
                    Payment time limit{" "}
                    <span className={classes.spantext}>
                      {dataId?.paymentWindowTime} Minutes
                    </span>
                  </Typography>
                </Box>
                <Box>
                  <Typography>
                    Available{" "}
                    <span className={classes.spantext}>
                      {avaliableBalnce[0]?.balance}{" "}
                      {avaliableBalnce[0]?.coinName}
                    </span>
                  </Typography>
                  <br />
                  <Typography>
                    Seller's payment method{" "}
                    <span style={{ color: "#D83636" }}>
                      {dataId?.paymentGateway}
                    </span>
                  </Typography>
                </Box>
              </Box>
              <Box mt={2}>
                <Typography style={{ fontSize: "18px" }} variant="h6">
                  Terms & Conditions
                </Typography>
              </Box>
              <Box className={classes.Subtilebox}>
                <Typography variant="h6">
                  {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
                    consequat mattis non amet, sed tincidunt facilisis. Magna
                    mattis purus sem pharetra quis enim morbi accumsan. Sem
                    consequat scelerisque hendrerit posuere vivamus posuere
                    turpis phasellus. Amet pulvinar */}
                  {advertisementData?.termsOfTrade}
                </Typography>
              </Box>
            </Grid>
            <Grid item lg={5} md={6} sm={12} xs={12}>
              <Box mt={3} pl={2} className={classes.TextBoxFiled}>
                <Typography variant="h6">I want to pay</Typography>
                <Box>
                  <TextField
                    variant="outlined"
                    placeholder="Enter the Amount"
                    className="textFeilds"
                    type="number"
                    step="any"
                    // onChange={(e) => setamountInRange(e.target.value)}
                    onChange={(e) => {
                      if (e.target.value && e.target.value != "-") {
                        setamountInRange(Math.abs(Number(e.target.value)));
                      } else {
                        setamountInRange("");
                      }
                    }}
                    // onChange={(e) => setamountInRange(e.target.value)}
                    value={amountInRange}
                    InputProps={{
                      className: classes.TextBox,
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton className={classes.IconButtonBox}>
                            {advertisementData?.valueInCoinType}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />

                  <FormHelperText error style={{ paddingLeft: "0px" }}>
                    {
                      // (isSubmit &&
                      // amountInRange == "" &&
                      // " Enter max order limit ") ||
                      (isSubmit &&
                        Number(amountInRange) <
                          Number(advertisementData.minValue) &&
                        ` Your investment must be less than max investment amount : (${advertisementData.minValue})`) ||
                        (isSubmit &&
                          Number(advertisementData.maxValue) <
                            Number(amountInRange) &&
                          ` Your investment must be greater than min investment amount : (${advertisementData.maxValue}) `)
                    }
                  </FormHelperText>
                </Box>
              </Box>
              <Box mt={2} pl={2} className={classes.TextBoxFiled}>
                <Typography variant="h6">I will receive</Typography>
                <Box>
                  <TextField
                    variant="outlined"
                    placeholder="Enter the Amount"
                    className="textFeilds"
                    disabled
                    step="any"
                    value={
                      currencyPrice && parseFloat(currencyPrice).toFixed(20)
                    }
                    InputProps={{
                      className: classes.TextBox,
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            className={classes.IconButtonBox}
                            style={{
                              paddingRight: "18px",
                            }}
                          >
                            {advertisementData?.coinType}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>
                <Box
                  align="center"
                  mt={2}
                  mb={2}
                  className={classes.otherButton}
                >
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={handleClose2}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="BuyButton"
                    // onClick={() => HandleSendTradeRequest()}
                    onClick={showInterest}
                  >
                    Buy {advertisementData?.coinType}
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default TransactionMain;
