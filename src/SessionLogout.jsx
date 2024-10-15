import React from "react";
// import { useIdleTimer } from "react-idle-timer";
import { Redirect, useHistory } from "react-router-dom";
import App from "./App";

export default function ({ children }) {
  const history = useHistory();
  // import { useIdleTimer } from "react-idle-timer";
  const handleOnIdle = (event) => {
    console.log("user is idle", event);
    // console.log("last active", getLastActiveTime());
    // history.push("/login");
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("creatturAccessToken");
    Redirect("/login");
  };

  // const handleOnActive = (event) => {
  //   // console.log("user is active", event);
  //   // console.log("time remaining", getRemainingTime());
  // };
  // const handleOnActive = (event) => {
  //   console.log("user is active", event);
  //   console.log("time remaining", getRemainingTime());
  // };

  // const handleOnAction = (event) => {};
  // const { getRemainingTime, getLastActiveTime } = useIdleTimer({
  //   timeout: 1000 * 60 * 30,
  //   onIdle: handleOnIdle,
  //   onActive: handleOnActive,
  //   onAction: handleOnAction,
  //   debounce: 500,
  // });

  return <div>{children}</div>;
}
