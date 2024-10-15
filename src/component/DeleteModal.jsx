import { blockHandler } from "../component/CallApi";
import {
  Button,
  Dialog,
  DialogContent,
  MenuItem,
  Select,
  Typography,
  Box,
  makeStyles,
} from "@material-ui/core";
import React, { useState } from "react";
import { toast } from "react-toastify";
import ButtonCircularProgress from "./ButtonCircularProgress";

const useStyles = makeStyles((theme) => ({
  dailogOpen: {
    borderRadius: "25px",
    padding: "20px",
    "& h5": {
      color: "black",
      fontSize: "17px",
      paddingBottom: "1rem",
    },
    "& .MuiDialog-paperWidthSm": {
      padding: "20px",
    },
  },
}));

export default function DeleteModal({
  open,
  setOpen,
  idd1,
  DeleteAdvertisement,
  loading,
}) {
  const classes = useStyles();
  // const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  // const deleteParticularHandler = async (id) => {
  //   const dataObj = {
  //     _id: id,
  //     status: status,
  //   };
  //   try {
  //     setLoading(true);
  //     const response = await blockHandler("blockUnblockUser", dataObj);
  //     if (response) {
  //       toast.success(response.responseMessage);
  //       // getUserDataList();
  //       setOpen(false);
  //       setLoading(false);
  //     }
  //     setLoading(false);
  //   } catch (error) {
  //     console.log(error);
  //     setLoading(false);
  //   }
  // };
  return (
    <Dialog
      className={classes.dailogOpen}
      open={open}
      maxWidth="xs"
      fullWidth="xs"
      onClose={() => setOpen(false)}
    >
      <DialogContent>
        <Typography align="center" variant="h5" style={{ color: "#00000080" }}>
          Are you sure want to delete ?
        </Typography>
        <br />
      </DialogContent>
      <Box
        align="center"
        style={{
          marginLeft: "10px",
          padding: "5px 20px",
          paddingBottom: "12px",
        }}
      >
        <Button
          variant="outlined"
          color="primary"
          onClick={() => {
            if (!loading) {
              setOpen(false);
            }
          }}
          disabled={loading}
        >
          No
        </Button>
        <Button
          style={{ marginLeft: "10px" }}
          variant="contained"
          color="primary"
          disabled={loading}
          onClick={() => DeleteAdvertisement(idd1?._id)}
        >
          Yes
          {loading && <ButtonCircularProgress />}
        </Button>
      </Box>
    </Dialog>
  );
}
