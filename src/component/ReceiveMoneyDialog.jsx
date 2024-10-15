import React, { useState, useEffect } from "react";
import { Typography, Box, Button, Dialog, makeStyles } from "@material-ui/core";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Axios from "axios";
import ApiConfig from "../config/APIConfig";
import { toast } from "react-toastify";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { BiCopy } from "react-icons/bi";
import NoDataFound from "../DataNotFound";
import ButtonCircularProgress from "../component/ButtonCircularProgress";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 329,
    height: 487,
    borderRadius: "24px",
    background: "#fff",
    // borderRadius: "24px",
    // "& .MuiDialogContent-root": {
    //   flex: "none !important",
    // },
    // "& .MuiDialogActions-root": {
    //   marginRight: "0px !important",
    // },
  },
  CloseButton: {
    width: "169px",
    height: "42px",
    color: "#fff",
    padding: "9px 20px !important",
    fontSize: "14px",
    background: "#56CA00",
    borderRadius: "7px",
    marginBottom: "15px",

    "&:hover": {
      backgroundColor:
        "linear-gradient(180deg, #00ACEB 0%, #00B0ED 10.18%, #1069C2 70.35%, #1069C2 100%)",
    },
  },
  dialogTitle: {
    paddingTop: "38px",
    "& .MuiTypography-h6": {
      fontFamily: "Inter !important",
      fontStyle: "normal !important",
      fontWeight: "700 !important",
      fontSize: "23.989px !important",
      lineHeight: "36px !important",
      color: "#FFFFFF !important",
    },
  },
  lablebox: {
    marginBottom: "-8px",
    fontFamily: "Inter",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "16px",
    lineHeight: "24px",
    color: "#FFFFFF",
  },
  addressBox: {
    display: "flex",
    width: "256px",
    height: "35px",
    background: "#FFFFFF",
    borderRadius: "10px",
    paddingTop: "10px",
    marginTop: "10px",
    paddingLeft: "5px",
  },
  address: {
    fontFamily: "Inter",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "16px",
    lineHeight: "24px",
    color: "#000000",
  },
  qrImage: {
    width: "100%",
    border: "1px solid #000000",
    borderRadius: "24px",
  },
}));

export default function ReceiveMoneyDialog({
  reciveOpen,
  handleClose,
  data,
  dataId,
}) {
  const [sendAddress, SetSendAddress] = useState({});
  const classes = useStyles();
  const [isLoading, setLoader] = useState(false);
  // const [data, setData] = React.useState("Not Found");

  const getAddressHandler = async () => {
    setLoader(true);
    try {
      const res = await Axios.get(ApiConfig.myAddress, {
        headers: {
          token: window.localStorage.getItem("token"),
        },
        params: {
          wallteId: data?._id,
        },
      });
      if (res.data.responseCode === 200) {
        SetSendAddress(res.data.result);
        setLoader(false);
      } else {
        setLoader(false);
      }
    } catch (error) {
      console.log("ERROR", error);
      setLoader(false);
    }
  };
  useEffect(() => {
    getAddressHandler();
    SetSendAddress([]);
  }, []);

  return (
    <Dialog
      open={reciveOpen}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      PaperProps={{
        classes: {
          root: classes.root,
        },
      }}
    >
      <DialogTitle id="form-dialog-title" className={classes.dialogTitle}>
        {data?.coinName === "BUSD" && <>Receive BUSD</>}
        {data?.coinName === "BTC" && <>Receive BTC</>}
        {data?.coinName === "ETH" && <>Receive ETH</>}
        {data?.coinName === "VD" && <>Receive VDT</>}
        {data?.coinName === "BNB" && <>Receive BNB</>}
        {data?.coinName === "USDT" && <>Receive USDT</>}
        {data?.coinName === "USDC" && <>Receive USDC</>}
        {data?.coinName === "AVAX" && <>Receive AVAX</>}
        {data?.coinName === "SOLANA" && <>Receive SOLANA</>}
        {data?.coinName === "LTC" && <>Receive LTC</>}
        {data?.coinName === "MATIC" && <>Receive MATIC</>}
      </DialogTitle>
      <DialogContent>
        <Box
          style={{ display: "flex", justifyContent: "center", width: "100%" }}
        >
          {isLoading ? (
            <Box
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
                marginTop: "-10px",
                marginBottom: "20px",
              }}
            >
              <ButtonCircularProgress />
            </Box>
          ) : (
            <Box
              textAlign="center"
              style={{
                display: "flex",
                justifyContent: "center",
                width: "170px",
              }}
            >
              {!isLoading && sendAddress && sendAddress.length === 0 ? (
                <Box
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                  }}
                >
                  <NoDataFound />
                </Box>
              ) : (
                <>
                  <img
                    src={`https://chart.googleapis.com/chart?chs=300x300&cht=qr&chl=${sendAddress?.walletAddress}&choe=UTF-8`}
                    alt=""
                    className={classes.qrImage}
                  />
                </>
              )}
            </Box>
          )}
        </Box>
        <Box
          textAlign="left"
          mt={2}
          mb={2}
          style={{
            maxWidth: "258px",
            borderRadius: "5px",
            padding: "11px",
            marginBottom: "-5px",
          }}
        >
          <Typography className={classes.lablebox}>
            My wallet address
          </Typography>
          <Box className={classes.addressBox}>
            <Typography
              variant="body1"
              className={classes.address}
              style={{
                textOverflow: "ellipsis",
                overflow: "hidden",
              }}
            >
              {sendAddress?.address} &nbsp;&nbsp;
            </Typography>
            <CopyToClipboard text={sendAddress?.address}>
              <BiCopy
                style={{
                  color: "#00000",
                  fontSize: " 24px",
                  cursor: "pointer",
                  marginLeft: "5px",
                }}
                onClick={() => toast.success("Copied successfully")}
              />
            </CopyToClipboard>
          </Box>

          {!isLoading && sendAddress && sendAddress.length === 0 && (
            <NoDataFound />
          )}
        </Box>

        {/* <Box style={{ maxWidth: "300px" }} mt={3}>
          <Box mt={1}>
            <Typography variant="body2">Disclaimer :</Typography>
            <Typography variant="body2">
              1. Lorem Ipsum is simply dummy text of the printing and
              typesetting
            </Typography>
            <Typography variant="body2">
              2. Lorem Ipsum is simply dummy text of the printing and
              typesetting
            </Typography>
          </Box>
        </Box> */}
      </DialogContent>

      <DialogActions style={{ justifyContent: "center" }}>
        <Box mb={2}>
          <Button onClick={handleClose} className={classes.CloseButton}>
            Close
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
}
