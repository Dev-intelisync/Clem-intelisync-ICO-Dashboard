import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import ApiConfig, { baseUrl } from "../config/APIConfig";
import { AuthContext } from "./Auth";

export const UserContext = createContext();
const setSession = (userAddress) => {
  if (userAddress) {
    sessionStorage.setItem("userAddress", userAddress);
  } else {
    sessionStorage.removeItem("userAddress");
  }
};

const setTokenSession = (token) => {
  if (token) {
    sessionStorage.setItem("token", token);
  } else {
    sessionStorage.removeItem("token");
  }
};

export default function AuthProvider(props) {
  // const socket = window?.io(baseUrl, {
  //   transports: ["websocket", "polling", "flashsocket"],
  // });

  const [isLogin, setIsLogin] = useState(false);
  const auth = useContext(AuthContext);
  const [yourWalletBalance, setYourWalletBalance] = useState(0);
  const [userBalanceData, setUserBalanceData] = useState([]);
  // console.log("useeeerbalance=----", userBalanceData);
  const [notificationList, setNotificationList] = useState([]);
  const [unReadNotification, setUnReadNotification] = useState(0);
  const [StatusData, setStatusData] = useState({});
  const [loader, setLoader] = useState(false);

  const accessToken = localStorage.getItem("token");
  // useEffect(() => {
  //   socket.on("connection", function () {
  //     console.log("---connected---");
  //   });
  //   return () => {
  //     socket.close();
  //   };
  // }, []);

  const getWalletHandler = async (accessToken) => {
    try {
      // const res = await axios({
      //   method: "GET",
      //   url: ApiConfig.myWallet,
      //   headers: {
      //     token: accessToken,
      //   },
      // });

      // if (res.data.responseCode === 200) {
      //   window.localStorage.getItem("coinName");
      //   setUserBalanceData(res.data.result);
      // }
    } catch (error) {
      console.log(error);
    }
  };

  const NotificationDataList = async () => {
    try {
      const res = await axios({
        method: "GET",
        url: ApiConfig.listNotificationAll,
        headers: {
          token: window.localStorage.getItem("token"),
        },
      });

      if (res.data.responseCode === 200) {
        setNotificationList(res.data.result.data);
        setUnReadNotification(res?.data?.result?.unReadCount);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    NotificationDataList();
  }, []);

  const getKycList = async () => {
    setLoader(true);
    try {
      const res = await axios.get(ApiConfig.getKycList, {
        headers: {
          token: window.localStorage.getItem("token"),
        },
      });
      if (res.data.responseCode === 200) {
        setStatusData(res.data.result);
        setLoader(false);
        auth.getProfileHandler();
      }
    } catch (error) {
      setLoader(false);
    }
  };
  useEffect(() => {
    getKycList();
  }, []);

  // notification
  // const getNotification = (id) => {
  //   if (id) {
  //     socket.emit("getNotificationList", { userId: id });
  //     socket.on("getNotificationList", (event) => {
  //       setNotificationList(event?.responseResult?.data);
  //       setUnReadNotification(event?.responseResult?.unReadCount);
  //     });
  //   }
  // };

  // useEffect(() => {
  //   getNotification(auth?.userData?._id);
  // }, [auth?.userData, accessToken]);

  useEffect(() => {
    if (accessToken) {
      getWalletHandler(accessToken);
    }
  }, [accessToken]);

  let data = {
    isLogin,
    yourWalletBalance,
    userBalanceData,
    NotificationDataList: () => NotificationDataList(),
    notificationList,
    unReadNotification,

    setStatusData,
    StatusData,
  };

  return (
    <UserContext.Provider value={data}>{props.children}</UserContext.Provider>
  );
}
