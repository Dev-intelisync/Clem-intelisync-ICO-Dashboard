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
      <Box>
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="center"
        >
          <Grid item xs={2} md={2}>
            <img ..={data?.coinData?.coinImage} width="40px" alt="" />
          </Grid>
          <Grid item xs={6} md={6}>
            <Typography>BTC</Typography>
          </Grid>
          <Grid item xs={4} md={4}>
            <Typography>10$</Typography>
          </Grid>
        </Grid>
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="center"
        >
          <Grid item xs={12} md={12}>
            <Box display="flex" mt={3}></Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
