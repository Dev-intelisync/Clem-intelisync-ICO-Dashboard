import React, { useState, useEffect } from "react";
import { Typography, Box, Button, Dialog } from "@material-ui/core";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { FaRegCopy } from "react-icons/fa";
import Axios from "axios";
import ApiConfig from "../config/APIConfig";
import { values } from "lodash";
import { toast } from "react-toastify";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { BiCopy } from "react-icons/bi";
import NoDataFound from "../DataNotFound";
import ButtonCircularProgress from "../component/ButtonCircularProgress";

export default function ReceiveMoneyDialog({
  reciveOpen,
  handleClose,
  dataId,
}) {
  const [sendAddress, SetSendAddress] = useState([]);

  const [isLoading, setLoader] = useState(false);

  const getAddressHandler = async () => {
    setLoader(true);
    try {
      const res = await Axios.get(ApiConfig.myAddress, {
        headers: {
          token: window.sessionStorage.getItem("token"),
        },
        params: {
          coinName: dataId?.coinData?.coinShortName,
        },
      });
      if (res.data.status === 200) {
        SetSendAddress(res.data.data);
        setLoader(false);
      }
    } catch (error) {
      console.log("ERROR", error);
      setLoader(false);
    }
  };
  useEffect(() => {
    getAddressHandler();
  }, []);

  return (
    <Dialog
      open={reciveOpen}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">
        {dataId?.coinData?.coinShortName === "BTC" && <>Receive Bitcoin</>}
        {dataId?.coinData?.coinShortName === "ETH" && <>Receive ETH</>}
        {dataId?.coinData?.coinShortName === "Toga" && <>Receive Toga</>}
      </DialogTitle>
      <DialogContent>
        <Box textAlign="center">
          {dataId?.coinData?.coinShortName === "BTC" && (
            <>
              <img ..="/images/bitcoin-btc-logo.png" width="40px" alt="" />
            </>
          )}
          {dataId?.coinData?.coinShortName === "ETH" && (
            <>
              <img ..="/images/ethereum-eth-logo.png" width="40px" alt="" />
            </>
          )}
          {dataId?.coinData?.coinShortName === "Toga" && (
            <>
              <img
                ..="/images/ico.jpeg"
                width="40px"
                alt=""
                style={{ borderRadius: "50%" }}
              />
            </>
          )}
        </Box>
        <Box textAlign="left" className="customForm" mb={2} mt={2}>
          <Typography variant="subtitle2">My wallet address</Typography>
          <Box className="receiveBox">
            <Typography variant="body1" className="textcopy">
              {sendAddress?.walletAddress}
              {/* <FaRegCopy size={18} color="#00e0b0"  /> */}
              <CopyToClipboard text={sendAddress?.walletAddress}>
                <BiCopy
                  style={{
                    color: "#00e0b0",
                    fontSize: " 14px",
                    cursor: "pointer",
                    marginLeft: "5px",
                  }}
                  onClick={() => toast.success("Copied successfully")}
                />
              </CopyToClipboard>
            </Typography>
          </Box>
          {!isLoading && sendAddress && sendAddress.length === 0 && (
            <NoDataFound />
          )}
          {isLoading && <ButtonCircularProgress />}
        </Box>
      </DialogContent>
      {/* <DialogActions>
        <Button
          variant="contained"
          onClick={handleClose}
          style={{ padding: "6px 20px" }}
        >
          Close
        </Button>
        <Button
          variant="containedPrimary"
          style={{ padding: "6px 20px" }}
          onClick={handleClose}
        >
          Submit
        </Button>
      </DialogActions> */}
    </Dialog>
  );
}
