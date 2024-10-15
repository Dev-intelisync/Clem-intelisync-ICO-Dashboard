import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  Fragment,
} from "react";
import moment from "moment";

const SessionTimeout = () => {
  const [events, setEvents] = useState(["click", "load", "scroll"]);
  const [second, setSecond] = useState(0);
  let resetTimer = useCallback(() => {
    if (isAuthenticated) {
      timeStamp = moment();
      sessionStorage.setItem("lastTimeStamp", timeStamp);
    } else {
      sessionStorage.removeItem("lastTimeStamp");
    }
  }, [isAuthenticated]);

  // Life cycle hook
  useEffect(() => {
    events.forEach((event) => {
      window.addEventListener(event, resetTimer);
    });
  }, [resetTimer]);

  let timeStamp;
  let warningInactiveInterval = useRef();
  let startTimerInterval = useRef();

  // start inactive check
  let timeChecker = () => {
    startTimerInterval.current = setTimeout(() => {
      let storedTimeStamp = sessionStorage.getItem("lastTimeStamp");
      warningInactive(storedTimeStamp);
    }, 60000);
  };

  return <Fragment />;
};

export default SessionTimeout;
