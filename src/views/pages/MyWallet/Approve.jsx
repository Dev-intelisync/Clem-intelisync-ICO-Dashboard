import { Box, makeStyles, Typography, Button, Grid } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import axios from "axios";
import apiConfig from "../../../config/APIConfig";
import { toast } from "react-toastify";
import { useHistory, useLocation } from "react-router-dom";
import ButtonCircularProgress from "@component/ButtonCircularProgress";

const useStyles = makeStyles((theme) => ({
  bannerBox1: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    height: "90vh",
    width: "100%",

    "& .subtext": {
      borderTop: "1px solid rgba(128, 128, 128, 0.22)",
    },
  },
  newbox: {
    border: "1px solid rgba(128, 128, 128, 0.22)",
    background: "transparent",
    borderRadius: "8px",
    margin: "0px 20px 0px 20px",
  },
  buttonright: {
    borderRadius: "5px",
    border: 0,
    backgroundColor: "#E9C856",
    paddingLeft: "18px",
    paddingRight: "18px",
    fontSize: "12px",
    color: "#000",
    width: "auto",
    minWidth: "100px",
    height: "32px",
    "&:hover": {
      backgroundColor: "#EE1D23",
      border: "none",
      color: "#ffffff",
    },
  },

  BinClass: {
    color: theme.palette.text.primary,
  },
}));

export default function Approve() {
  const classes = useStyles();
  const location = useLocation();
  const history = useHistory();
  const [subscribeLoader, setsubscribeLoader] = useState(false);
  const [subscribeLoaderFalse, setsubscribeLoaderFalse] = useState(false);
  const [ids, setId] = useState({});

  useEffect(() => {
    const searchLink = location.search.substring(0);

    if (location.search) {
      const userId = location.search.split("userId=")[1].split("&")[0];
      const coinTypeName = location.search
        .split("coinTypeName=")[1]
        .split("&")[0];
      const walletAddress = location.search
        .split("walletAddress=")[1]
        .split("&")[0];
      const coinAmount = location.search.split("coinAmount=")[1];
      let obj = {
        userId: userId,
        coinTypeName: coinTypeName,
        walletAddress: walletAddress,
        coinAmount: coinAmount,
      };
      setId(obj);
    }
  }, [location.search]);

  const CancelSubscribtion = async (id) => {
    setsubscribeLoaderFalse(true);

    try {
      const response = await axios({
        method: "GET",
        url: apiConfig.cancelMoney,

        params: ids,
      }).then(async (response) => {
        if (response.data.responseCode === 200) {
          toast.success(response.data.responseMessage);
          history.push("/dashboard");
          setsubscribeLoader(false);
          setsubscribeLoaderFalse(false);
        } else if (response.data.responseCode === 403) {
          toast.error(response.data.responseMessage);
          setsubscribeLoader(false);
          setsubscribeLoaderFalse(false);
        } else {
          setsubscribeLoader(false);
          setsubscribeLoaderFalse(false);
          toast.error(response.data.responseMessage);
        }
      });
    } catch (error) {
      toast.error(error.response.data.responseMessage);
      setsubscribeLoader(false);
      setsubscribeLoaderFalse(false);
    }
  };

  const AddSubscribtion = async (id) => {
    if (id) {
      setsubscribeLoader(true);
    } else {
      setsubscribeLoaderFalse(true);
    }
    try {
      setsubscribeLoaderFalse(true);
      const response = await axios({
        method: "GET",
        url: apiConfig.approveWithdraw,

        params: ids,
      }).then(async (response) => {
        if (response.data.responseCode === 200) {
          toast.success(response.data.responseMessage);
          setsubscribeLoader(false);
          setsubscribeLoaderFalse(false);
        }
        if (response.data.responseCode === 405) {
          toast.error(response.data.responseMessage);
          setsubscribeLoader(false);
          setsubscribeLoaderFalse(false);
        } else {
          setsubscribeLoader(false);
          setsubscribeLoaderFalse(false);
          toast.error(response.data.message);
        }
      });
    } catch (error) {
      toast.error(error.response.data.message);
      setsubscribeLoader(false);
      setsubscribeLoaderFalse(false);
    }
  };

  return (
    <Box className={classes.bannerBox1}>
      <Box className={classes.newbox}>
        <Box
          style={{ padding: "20px", display: "flex", justifyContent: "center" }}
        >
          <Typography
            variant="h4"
            className={classes.BinClass}
            style={{ fontSize: "35px" }}
          >
            Withdraw Approval !
          </Typography>
        </Box>
        <Box className="subtext">
          <Box style={{ padding: "20px" }}>
            <Grid container spacing={2}>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => AddSubscribtion()}
                  fullWidth
                  disabled={subscribeLoader || subscribeLoaderFalse}
                  style={{ cursor: "pointer" }}
                >
                  Approve{subscribeLoader && <ButtonCircularProgress />}
                </Button>
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={() => CancelSubscribtion()}
                  disabled={subscribeLoaderFalse || subscribeLoader}
                  style={{ cursor: "pointer" }}
                >
                  Reject{subscribeLoaderFalse && <ButtonCircularProgress />}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
