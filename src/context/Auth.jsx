import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import apiConfig from "../config/APIConfig";
import { calculateTimeLeft } from "../views/auth/forget-password-link/timer";
import moment from "moment";
// import ApiConfig from "src/config/APICongig";

export const AuthContext = createContext();

const setSession = (accessToken) => {
  if (accessToken) {
    localStorage.setItem("creatturAccessToken", accessToken);
    // axios.defaults.headers.common.Authorization = `Creattur ${accessToken}`;
  } else {
    localStorage.removeItem("creatturAccessToken");
    delete axios.defaults.headers.common.Authorization;
  }
};

function checkLogin() {
  const accessToken = window.localStorage.getItem("creatturAccessToken");
  return accessToken ? true : false;
}

export default function AuthProvider(props) {
  const [isLogin, setIsLogin] = useState(checkLogin());

  //   const [userData, setUserBalanceData] = useState({});
  const [userData, setUserData] = useState({});

  const [loader, setLoader] = useState(false);
  const [kycData, setKycData] = useState([]);
  const [endTime, setEndtime] = useState();
  const [wallet, setWallet] = useState([]);
  const [view, setView] = useState([]);

  const [fromData, setFromData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [toData, setToData] = useState();

  const [coinName, setCoinName] = useState("all");

  const [currentvalue, setCurrentValue] = useState("all");
  const [page, setPage] = useState(1);

  const [value, setValue] = useState(0);

  const [timeLeft, setTimeLeft] = useState();
  const [pagesCount, setPagesCount] = useState(1);
  const [bankData, setBankDataList] = useState([]);
  const [cmcResults, setCMCResults] = useState([]);
  const [iNRPriceinUSD, setINRPriceinUSD] = useState(1);
  const [chatMessageData, setChatMessageData] = useState();

  useEffect(() => {
    if (endTime) {
      const timer = setTimeout(() => {
        setTimeLeft(calculateTimeLeft(endTime));
      }, 1000);
      return () => clearTimeout(timer);
    }
  });

  let data = {
    userLoggedIn: isLogin,
    userData,
    iNRPriceinUSD,
    kycData,
    cmcResults,
    setEndtime,
    setTimeLeft,
    setToData,
    setFromData,
    setCoinName,
    setBankDataList,
    isLoading,
    bankData,
    coinName,
    wallet,
    timeLeft,
    endTime,
    fromData,
    pagesCount,
    toData,
    view,
    page,
    setPage,
    handlereset: () => handlereset(),
    getProfileHandler: () => getProfileHandler(),
    userAccountListData: () => userAccountListData(),
    ViewStakeHandler: (data) => ViewStakeHandler(data),

    // handleTransactions: () => handleTransactions(),
    CmcAPIHandler: () => CmcAPIHandler(),
    userLogIn: (type, data) => {
      setSession(data);
      setIsLogin(type);
    },
  };

  const handlereset = () => {
    setCoinName("");
    setFromData();
    setToData();
  };

  const INRAPIHandler = async () => {
    try {
      const res = await axios.get(
        "https://api.exchangerate-api.com/v4/latest/USD"
      );
      if (res.status === 200) {
        const cmcString = res.data.rates.INR;

        setINRPriceinUSD(cmcString);
      }
    } catch (error) {
      console.log("ERROR", error);
      setLoader(false);
    }
  };
  const CmcAPIHandler = async () => {
    try {
      const res = await axios({
        method: "GET",
        url: apiConfig.cmcData,
      });
      if (res) {
        setCMCResults(res?.data?.result?.data);
      }
    } catch (error) {
      console.log("ERROR", error);
      setLoader(false);
    }
  };
  const getProfileHandler = async (token) => {
    try {
      const res = await axios.get(apiConfig.myAccount, {
        headers: {
          token: window.localStorage.getItem("token")
            ? window.localStorage.getItem("token")
            : token,
        },
      });

      if (res.data.responseCode === 200) {
        setKycData(res?.data?.data?.kyc?.document?.reverse()[0]);
        setUserData(res?.data?.result);
      }
    } catch (error) {
      console.log("ERROR-----", error);
      window.localStorage.removeItem("token");
      setLoader(false);
    }
  };
  // <<<<<<< HEAD
  //   // console.log("userData--", userData);
  // =======

  // >>>>>>> 6f1122ea02dfdde0e0d6a39c0b0308bf068743c6
  useEffect(() => {
    // ViewStakeHandler();
    // userAccountListData();
    // CmcAPIHandler();
    // INRAPIHandler();
  }, []);

  useEffect(() => {
    if (window.localStorage.getItem("token")) {
      getProfileHandler(window.localStorage.getItem("token"));
    }
  }, [window.localStorage.getItem("token")]);

  const ViewStakeHandler = async () => {
    setIsLoading(true);
    setView([]);
    let txnType;
    let coinNames;
    if (currentvalue != "all") {
      txnType = currentvalue;
    }
    if (coinName != "all") {
      coinNames = coinName;
    }

    try {
      const res = await axios({
        method: "GET",
        url: apiConfig.viewfixedDeposit,
        headers: {
          token: window.localStorage.getItem("token"),
        },
        params: {
          page: page - 1,
          // pageSize: 8,
          fromDate: fromData ? `${moment(fromData).unix()}000` : null,
          toDate: toData ? `${moment(toData).unix()}000` : null,
          stakeStatus: coinNames,
          txnType: txnType,
          limit: 15,
        },
      });
      if (res.data.responseCode === 200) {
        setIsLoading(false);
        setView(res.data.result.docs);
        setPagesCount(res?.data.result.pages);
        // }if else(){
        //   setView([])
        //   setIsLoading(false);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    if (currentvalue || fromData || toData || coinName) {
      ViewStakeHandler();
      // setPage(1);
    }
  }, [currentvalue, fromData, toData, page, coinName]);
  useEffect(() => {
    if (page) {
      ViewStakeHandler();
    }
  }, [page]);
  const userAccountListData = async () => {
    try {
      const res = await axios({
        method: "GET",
        url: apiConfig.userAccountList,
        headers: {
          token: window.localStorage.getItem("token"),
        },
      });
      if (res.data.status === 200) {
        setBankDataList(res.data.data.reverse());
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider value={data}>{props.children}</AuthContext.Provider>
  );
}
