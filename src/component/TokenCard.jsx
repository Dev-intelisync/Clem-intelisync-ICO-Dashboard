import { Typography, Grid, Box, IconButton, Tooltip } from "@material-ui/core";
import React, { useState } from "react";
import { MdCallReceived, MdCallMade } from "react-icons/md";
import { BsClockHistory } from "react-icons/bs";
import SendMoneyDialog from "../component/SendMoneyDialog";
import ReceiveMoneyDialog from "../component/ReceiveMoneyDialog";
import { useHistory } from "react-router-dom";

export default function TokenCard({ data, index }) {
  const [open, setOpen] = React.useState(false);
  const [reciveOpen, setReciveOpen] = useState(false);
  const history = useHistory();
  const [dataId, setDataId] = useState("");

  const handleClose = () => {
    setOpen(false);
    setReciveOpen(false);
  };
  const submitHandler = () => {};
  const HandleWithdraw = (id) => {
    setDataId(id);
    // setOpen(false);
    setOpen(true);
  };
  const HandleRecieve = (id) => {
    setDataId(id);
    // setOpen(false);
    setReciveOpen(true);
  };
  return (
    <Box
      style={
        index % 2 === 0
          ? {
              background:
                "radial-gradient(34% 57.15% at 92.64% 16%, rgba(254, 184, 90, 0.3) 0%, rgba(254, 184, 90, 0) 100%), rgba(27, 26, 31, 0.6)",
              borderRadius: 16,
              padding: 20,
            }
          : {
              background:
                "radial-gradient(34% 57.15% at 92.64% 16%, rgba(32, 191, 169, 0.3) 0%, rgba(32, 191, 169, 0) 100%), rgba(27, 26, 31, 0.6)",
              borderRadius: 16,
              padding: 20,
            }
      }
    >
      {open && (
        <SendMoneyDialog
          submitHandler={(data) => submitHandler(data)}
          open={open}
          handleClose={handleClose}
          dataId={dataId}
        />
      )}

      {reciveOpen && (
        <ReceiveMoneyDialog
          reciveOpen={reciveOpen}
          dataId={dataId}
          handleClose={handleClose}
        />
      )}
      <Box>
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="center"
        >
          <Grid item xs={2} md={2}>
            <img
              ..={data?.coinData?.coinImage}
              width="40px"
              alt=""
              style={{ width: "40px", height: "40px", borderRadius: "100%" }}
            />
          </Grid>
          <Grid item xs={6} md={6}>
            <Typography>{data?.coinData?.coinShortName}</Typography>
          </Grid>
          <Grid item xs={4} md={4} style={{ textAlign: "right" }}>
            <Typography>{data?.coinBalance?.availableBalance}</Typography>
          </Grid>
        </Grid>
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="center"
        >
          <Grid item xs={12} md={12}>
            <Box
              display="flex"
              mt={3}
              width="100%"
              maxWidth="135px"
              justifyContent="space-between"
            >
              <Tooltip title="Deposit">
                <IconButton
                  style={{ backgroundColor: "#EE786C", marginRight: "5px" }}
                  // onClick={() => setReciveOpen(true)}
                  onClick={() => HandleRecieve(data)}
                >
                  <MdCallReceived size={12} color="white" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Withdraw">
                <IconButton
                  style={{ backgroundColor: "#20BFA9", marginRight: "5px" }}
                  // onClick={() => setOpen(true)}
                  onClick={() => HandleWithdraw(data)}
                >
                  <MdCallMade size={12} color="white" />
                </IconButton>
              </Tooltip>
              <Tooltip title="History">
                <IconButton
                  style={{ backgroundColor: "#EE786C", marginRight: "3px" }}
                  onClick={() => history.push("/transaction-history")}
                >
                  <BsClockHistory size={12} color="white" />
                </IconButton>
              </Tooltip>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
