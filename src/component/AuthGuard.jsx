import React, { useContext, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../context/Auth";
import { useHistory } from "react-router-dom";

export default function AuthGuard(props) {
  const { children } = props;
  const history = useHistory();
  const auth = useContext(AuthContext);
  useEffect(() => {
    // if (!window.localStorage.getItem("token")) {
    //   history.push("/login");
    // }
  }, [window.localStorage.getItem("token")]);
  if (!auth.userLoggedIn) {
    return <Redirect to="/login" />;
  }

  return <>{children}</>;
}
