import React, { useState, useContext, useEffect, useRef } from "react";
import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";

import { AuthContext } from "@context/Auth";

import Page from "@component/Page";

import TransactionMain from "./loginHistory";
const useStyles = makeStyles((theme) => ({
  tabs_transaction: {
    borderRadius: "20px 20px 0 0",
    // border: "1px solid #797979",
    borderBottom: "none",
    marginBottom: "10px",
  },
}));

function Index() {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const csvLink = useRef();
  const auth = useContext(AuthContext);

  const history = useHistory();

  const data = auth?.userData ? auth?.userData : "";
  // useEffect(() => {
  //   if (!window.localStorage.getItem("token")) {
  //     history.push("/login");
  //   }
  // }, [window.localStorage.getItem("token")]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Page title="Transaction History" className="removescroll">
      <Box className={classes.bannerbox}>
        <Box>
          <TransactionMain />
        </Box>
      </Box>
    </Page>
  );
}

export default Index;