import React, { useState, useEffect } from "react";
import BankDetail from "@component/myWallet";
import { Grid, Box, Typography, Button } from "@material-ui/core";
import Page from "@component/Page";
import Axios from "axios";
import ApiConfig from "../../../config/APIConfig";
import { toast } from "react-toastify";
import NoDataFound from "../../../component/DataNotFound";
import { BsClockHistory } from "react-icons/bs";
import ButtonCircularProgress from "@component/ButtonCircularProgress";
import { useHistory, Link as RouterLink } from "react-router-dom";

export default function MyWallet() {
  const [data, setData] = useState([]);
  const [isLoading, setLoader] = useState(false);
  const [coinListData, setCoinListData] = useState([]);
  const [userBalanceData, setUserBalanceData] = useState([]);

  const history = useHistory();

  useEffect(() => {
    if (!window.localStorage.getItem("token")) {
      history.push("/login");
    }
  }, [window.localStorage.getItem("token")]);
  const getBTCDepositsHandler = async () => {
    try {
      const res = await Axios.get(ApiConfig.deposits, {
        headers: {
          token: window.sessionStorage.getItem("token"),
          userName: "",
        },

        params: {
          page: "1",
          pageSize: "10",
          coinName: "BTC",
        },
      });
      if (res.data.status === 200) {
        window.localStorage.getItem("coinName");
        getWalletHandler();
      }
    } catch (error) {
      setLoader(false);
      console.log(error);
    }
  };
  const getETHDepositsHandler = async () => {
    try {
      const res = await Axios.get(ApiConfig.deposits, {
        headers: {
          token: window.localStorage.getItem("token"),
          userName: "",
        },
        params: {
          page: "1",
          pageSize: "10",
          coinName: "ETH",
        },
      });
      if (res.data.status === 200) {
        window.localStorage.getItem("coinName");
        getWalletHandler();
      }
    } catch (error) {
      setLoader(false);
      console.log(error);
    }
  };
  const getICODepositsHandler = async () => {
    try {
      const res = await Axios.get(ApiConfig.deposits, {
        headers: {
          token: window.localStorage.getItem("token"),
          userName: "",
        },
        params: {
          page: "1",
          pageSize: "10",
          coinName: "Toga",
        },
      });
      if (res.data.status === 200) {
        window.localStorage.getItem("coinName");
        getWalletHandler();
      }
    } catch (error) {
      setLoader(false);
      console.log(error);
    }
  };
  const getBNBDepositsHandler = async () => {
    try {
      const res = await Axios.get(ApiConfig.deposits, {
        headers: {
          token: window.localStorage.getItem("token"),
          userName: "",
        },
        params: {
          page: "1",
          pageSize: "10",
          coinName: "BNB",
        },
      });
      if (res.data.status === 200) {
        window.localStorage.getItem("coinName");
        getWalletHandler();
      }
    } catch (error) {
      setLoader(false);
      console.log(error);
    }
  };
  const getUSDTDepositsHandler = async () => {
    try {
      const res = await Axios.get(ApiConfig.deposits, {
        headers: {
          token: window.localStorage.getItem("token"),
          userName: "",
        },
        params: {
          page: "1",
          pageSize: "10",
          coinName: "USDT",
        },
      });
      if (res.data.status === 200) {
        window.localStorage.getItem("coinName");
        getWalletHandler();
      }
    } catch (error) {
      setLoader(false);
      console.log(error);
    }
  };
  const getWalletHandler = async () => {
    setLoader(true);
    try {
      const res = await Axios({
        method: "POST",
        url: ApiConfig.myWallet,

        headers: {
          token: window.localStorage.getItem("token"),
        },
      });
      if (res.data.responseCode === 200) {
        window.localStorage.getItem("coinName");
        setLoader(false);

        setUserBalanceData();
      }
    } catch (error) {
      setLoader(false);
      console.log(error);
    }
  };
  useEffect(() => {
    getBTCDepositsHandler();
    getBNBDepositsHandler();
    getETHDepositsHandler();
    getUSDTDepositsHandler();
    getWalletHandler();
    getICODepositsHandler();
  }, []);

  return (
    <Page title="My Wallet">
      <Box className="bannerBox">
        <Box mb={3} className="bankbox">
          <Box>
            <Grid container spacing={2} style={{ alignItems: "center" }}>
              <Grid item lg={6}>
                <Typography variant="h4" style={{ fontSize: "25px" }}>
                  My Wallet
                </Typography>
              </Grid>
              <Grid item lg={6} align="right">
                <Button
                  variant="outlined"
                  color="default"
                  size="small"
                  startIcon={<BsClockHistory size="20" />}
                  onClick={() => history.push("/transaction-history")}
                  title="Recieve Money"
                >
                  Transaction History
                </Button>
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              {userBalanceData &&
                userBalanceData?.map((data, i) => {
                  return (
                    <Grid item xs={12} sm={6} md={4} key={i} lg={4}>
                      <BankDetail data={data} index={i} />
                    </Grid>
                  );
                })}
              {!isLoading &&
                userBalanceData &&
                userBalanceData.length === 0 && <NoDataFound />}
              {isLoading && <ButtonCircularProgress />}
            </Grid>
          </Box>
        </Box>
      </Box>
    </Page>
  );
}
