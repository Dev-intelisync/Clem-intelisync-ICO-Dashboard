import React, { useState, useRef, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Typography, Box, Button, makeStyles } from "@material-ui/core";

import { MdCallReceived, MdCallMade } from "react-icons/md";
import SendMoneyDialog from "../component/SendMoneyDialog";
import ReceiveMoneyDialog from "../component/ReceiveMoneyDialog";
import Axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "../context/Auth";
import ApiConfig from "../config/APIConfig";
import { FcLock } from "react-icons/fc";
const useStyles = makeStyles((theme) => ({
  balance: {
    fontFamily: "Inter !important",
    fontStyle: "normal !important",
    fontWeight: "600 !important",
    fontSize: "16.9474px !important",
    lineHeight: "25px !important",
    color: "#000000 !important",
    textAlign: "left !important",
    marginBottom: "0px",
    marginTop: "0px",
  },
  perBalance: {
    fontFamily: "Inter !important",
    fontStyle: "normal !important",
    fontWeight: "600 !important",
    fontSize: "13.9224px !important",
    lineHeight: "21px !important",
    color: "#000000 !important",
    textAlign: "left !important",
    marginTop: "5px",
  },
}));

export default function BankDetail({ data, index, coinListData }) {
  const classes = useStyles();
  const auth = useContext(AuthContext);
  const user = useContext(AuthContext);

  // const togavalue = data.coinData.marketPriceInUsd;
  const [open, setOpen] = React.useState(false);
  const [reciveOpen, setReciveOpen] = useState(false);
  const [dataId, setDataId] = useState("");
  const [openMenu, setOpenMenu] = useState(false);
  const [solPrice, setsolPrice] = useState({});
  const [allToken, setallToken] = useState();
  const moreRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  const [bnb, setBNBpriceUSD] = useState([]);
  const [AVTpriceUSD, setAVTpriceUSD] = useState();
  const current_price = AVTpriceUSD?.market_data?.current_price?.usd;
  const history = useHistory();
  const coinbalance = data?.coinBalance?.totalBalance;
  const handleMenuClose = () => {
    setOpenMenu(false);
  };
  console.log(open, "open");
  const handleClose = () => {
    setOpen(false);
    setReciveOpen(false);
  };
  const submitHandler = () => {};
  const HandleRecieve = (id) => {
    setDataId(id);
    // setOpen(false);
    setReciveOpen(true);
  };
  const HandleWithdraw = (id) => {
    setDataId(id);
    // setOpen(false);
    setOpen(true);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  // const coin = data?.coinData?.coinShortName;

  // const myAVTpriceUSD = async () => {
  //   Axios({
  //     method: "GET",
  //     url: "https://api.coingecko.com/api/v3/coins/artverse-token",
  //   })
  //     .then(async (res) => {
  //       if (res.status === 200) {
  //         setAVTpriceUSD(res.data);

  //         // setState(1);
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err.message);
  //     });
  // };
  // useEffect(() => {
  //   myAVTpriceUSD();
  // }, []);

  useEffect(() => {
    let SOLTokenPrice;
    if (user.cmcResults && user.cmcResults.length > 0) {
      SOLTokenPrice =
        user.cmcResults &&
        user.cmcResults.filter((data) => data.symbol == "BUSD")[0];
      setsolPrice(SOLTokenPrice);
    }
  }, [user.cmcResults && user.cmcResults]);

  const receiveMoney = async (cointype) => {
    try {
      const res = await Axios({
        method: "POST",
        url: ApiConfig.receiveMoney,
        headers: {
          token: window.localStorage.getItem("token"),
        },
        data: {
          coinTypeName: cointype,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    receiveMoney(data?.coinName);
  }, [data?.coinName]);

  const getVirtualDineroValue = async () => {
    setIsLoading(true);

    try {
      const res = await Axios({
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
    <Box
      mt={2}
      style={
        index === 0
          ? {
              background: "url(images/wallet.png)",
              borderRadius: "25px",
              // width: "265.25px",
              // maxWidth: "280px",
              border: "2px solid white",
              cursor: "pointer",
              position: "relative",
              boxShadow: "rgb(0 0 0 / 16%) 0px 1px 4px",
              transition: "0.3s",
              paddingLeft: "7px",
              backgroundRepeat: "round",
              minHeight: "193px",
            }
          : {
              background: "url(images/wallet.png)",
              borderRadius: "25px",
              // width: "265.25px",
              // maxWidth: "280px",
              border: "2px solid white",
              cursor: "pointer",
              position: "relative",
              boxShadow: "rgb(0 0 0 / 16%) 0px 1px 4px",
              transition: "0.3s",
              paddingLeft: "7px",
              backgroundRepeat: "round",
              minHeight: "193px",
            }
      }
    >
      <Box>
        <Box>
          <Box p={2}>
            <Box display="flex" alignItems="center">
              <img
                src={data?.coinImage}
                width="40px"
                style={{
                  marginRight: "5px",
                  width: "40px",
                  height: "40px",
                  borderRadius: "100%",
                  objectFit: "cover",
                }}
                alt=""
              />
              <Box>
                <Typography variant="h5">
                  {data?.coinName === "VD" ? "VDT" : <>{data?.coinName}</>}
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box pt={1} pl={2}>
            <p className={classes.balance}>
              Total Balance : {parseFloat(data?.balance).toFixed(6)}
            </p>
            {/* <p className={classes.perBalance}>1 BTC : $29,888</p> */}

            <Typography variant="body1" pt={2} style={{ textAlign: "left" }}>
              {data?.coinName === "BTC" && (
                <>
                  {user.cmcResults &&
                    user.cmcResults?.map((data, i) => {
                      return (
                        <>
                          {data.symbol === "BTC" && (
                            <>{`1 BTC : $${parseFloat(
                              data.quote.USD.price
                            ).toFixed(2)}`}</>
                          )}
                        </>
                      );
                    })}
                </>
              )}
              {data?.coinName === "ETH" && (
                <>
                  {user.cmcResults &&
                    user.cmcResults?.map((data, i) => {
                      return (
                        <>
                          {data.symbol === "ETH" && (
                            <>{`1 ETH : $${parseFloat(
                              data.quote.USD.price
                            ).toFixed(2)}`}</>
                          )}
                        </>
                      );
                    })}
                </>
              )}

              {data?.coinName === "LTC" && (
                <>
                  {user.cmcResults &&
                    user.cmcResults?.map((data, i) => {
                      return (
                        <>
                          {data.symbol === "LTC" && (
                            <>{`1 USDC : $${parseFloat(
                              data.quote.USD.price
                            ).toFixed(2)}`}</>
                          )}
                        </>
                      );
                    })}
                </>
              )}
              {data?.coinName === "BNB" && (
                <>
                  {user.cmcResults &&
                    user.cmcResults?.map((data, i) => {
                      return (
                        <>
                          {data.symbol === "BNB" && (
                            <>{`1 BNB : $${parseFloat(
                              data.quote.USD.price
                            ).toFixed(2)}`}</>
                          )}
                        </>
                      );
                    })}
                </>
              )}
              {data?.coinName === "USDT" && (
                <>
                  {user.cmcResults &&
                    user.cmcResults?.map((data, i) => {
                      return (
                        <>
                          {data.symbol === "USDT" && (
                            <>{`1 USDT : $${parseFloat(
                              data.quote.USD.price
                            ).toFixed(2)}`}</>
                          )}
                        </>
                      );
                    })}
                </>
              )}
              {data?.coinName === "USDC" && (
                <>
                  {user.cmcResults &&
                    user.cmcResults?.map((data, i) => {
                      return (
                        <>
                          {data.symbol === "USDC" && (
                            <>{`1 USDC : $${parseFloat(
                              data.quote.USD.price
                            ).toFixed(2)}`}</>
                          )}
                        </>
                      );
                    })}
                </>
              )}
              {data?.coinName === "MATIC" && (
                <>
                  {user.cmcResults &&
                    user.cmcResults?.map((data, i) => {
                      return (
                        <>
                          {data.symbol === "MATIC" && (
                            <>{`1 MATIC : $${parseFloat(
                              data.quote.USD.price
                            ).toFixed(2)}`}</>
                          )}
                        </>
                      );
                    })}
                </>
              )}
              {data?.coinName === "AVAX" && (
                <>
                  {user.cmcResults &&
                    user.cmcResults?.map((data, i) => {
                      return (
                        <>
                          {data.symbol === "AVAX" && (
                            <>{`1 AVAX : $${parseFloat(
                              data.quote.USD.price
                            ).toFixed(2)}`}</>
                          )}
                        </>
                      );
                    })}
                </>
              )}
              {data?.coinName === "BUSD" && (
                <>
                  {user.cmcResults &&
                    user.cmcResults?.map((data, i) => {
                      return (
                        <>
                          {data.symbol === "BUSD" && (
                            <>
                              {`1 BUSD : $${parseFloat(
                                data?.quote?.USD?.price
                              ).toFixed(2)}`}
                            </>
                          )}
                        </>
                      );
                    })}
                  <></>
                </>
              )}
              {data?.coinName === "VD" && (
                <>
                  <Box
                    style={{
                      display: "flex",
                      justifyContent: "start",
                      alignItems: "center",
                    }}
                  >
                    {`1 VDT : US$ ${allToken}`}

                    <FcLock style={{ fontSize: "24px" }} />
                  </Box>
                </>
              )}
            </Typography>
          </Box>
          <Box
            p={2}
            style={{
              display: "flex",
              justifyContent: "end",
              alignItems: "center",
            }}
          >
            <Button
              variant="text"
              color="default"
              size="small"
              startIcon={<MdCallMade size="16" />}
              onClick={() => HandleWithdraw(data)}
              title="Send Money"
              style={{ maxWidth: "140px", color: "red" }}
            >
              Send
            </Button>

            <Button
              variant="text"
              color="default"
              size="small"
              startIcon={<MdCallReceived size="16" />}
              onClick={() => {
                HandleRecieve(data);
                receiveMoney(data?.coinName);
              }}
              title="Recieve Money"
              style={{
                maxWidth: "140px",
                marginLeft: "7px",
                color: "#56CA00",
              }}
            >
              Receive
            </Button>
          </Box>
        </Box>
      </Box>

      {/* {open && ( */}
      <SendMoneyDialog
        submitHandler={(data) => submitHandler(data)}
        open={open}
        data={data}
        dataId={dataId}
        handleClose={handleClose}
        setOpen={(data) => setOpen(data)}
      />
      {/* )} */}

      {reciveOpen && (
        <ReceiveMoneyDialog
          reciveOpen={reciveOpen}
          dataId={dataId}
          data={data}
          handleClose={handleClose}
        />
      )}
    </Box>
  );
}
