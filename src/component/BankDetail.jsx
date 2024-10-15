import { Typography, Grid, Box, IconButton } from "@material-ui/core";
import React, { useState } from "react";
import ConfirmationDialog from "../component/ConfirmationDialog";
import { FaPhoneAlt, FaRegTrashAlt } from "react-icons/fa";
import Axios from "axios";
import ApiConfig from "../config/APIConfig";
import { toast } from "react-toastify";

export default function BankDetail({ data, index, getUserBankList }) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [idd, setIdd] = useState();
  const [isLoading, setIsLoading] = useState();

  const confirmationHandler = async () => {
    try {
      setIsLoading(true);
      await Axios.delete(ApiConfig.userAccountDelete, {
        headers: {
          token: window.sessionStorage.getItem("token"),
        },
        params: {
          bankDetailId: idd.bankDetailId,
        },
      }).then(async (response) => {
        if (response.data.status === 200) {
          toast.success("Bank account deleted successfully");
          setIsLoading(false);
          getUserBankList();
        } else if (response.data.status === 403) {
          toast.warn(response.data.responseCode);
          setIsLoading(false);
        } else {
          toast.warn(response.data.responseCode);
          setIsLoading(false);
        }
      });
    } catch (error) {
      toast.error(error);
      setIsLoading(false);
    }

    // setConfirmOpen(false)
  };

  const deleteBAnk = (id) => {
    setIdd(id);
    setConfirmOpen(true);
  };

  return (
    <Box
      style={
        index % 2 === 0
          ? {
              background:
                "radial-gradient(34% 57.15% at 92.64% 16%, rgba(254, 184, 90, 0.3) 0%, rgba(254, 184, 90, 0) 100%), rgba(27, 26, 31, 0.6)",
              borderRadius: 16,
              padding: 25,
            }
          : {
              background:
                "radial-gradient(34% 57.15% at 92.64% 16%, rgba(32, 191, 169, 0.3) 0%, rgba(32, 191, 169, 0) 100%), rgba(27, 26, 31, 0.6)",
              borderRadius: 16,
              padding: 25,
            }
      }
    >
      {confirmOpen && (
        <ConfirmationDialog
          open={confirmOpen}
          handleClose={() => setConfirmOpen(false)}
          title={"Are You sure want to delete this Bank"}
          // desc={"desc"}
          // onClick={() => setDeleteBank(true)}
          confirmationHandler={confirmationHandler}
        />
      )}
      <Box display="flex">
        <Box width="100%">
          <Typography
            variant="body2"
            className="extra-bold d-flex justify-start"
          >
            {data?.accountHolderName ? data?.accountHolderName : "N/A"}
          </Typography>
          <Typography
            variant="body2"
            pt={2}
            className="extra-bold d-flex justify-start"
          >
            Bank :&nbsp;{data?.bankName ? data?.bankName : "N/A"}
          </Typography>
        </Box>
        <Box style={{ width: "100%", textAlign: "right" }}>
          <IconButton
            style={{ backgroundColor: "#EE786C", color: "#fff" }}
            onClick={() => deleteBAnk(data)}
          >
            <FaRegTrashAlt size={14} />
          </IconButton>
        </Box>
      </Box>
      <Box pt={2} display="flex" textAlign="center" width="100%">
        <FaPhoneAlt />
        &nbsp; &nbsp;
        <Typography variant="body2">
          {data?.contactNo ? data?.contactNo : "87644563564"}
        </Typography>
      </Box>
      <Grid container>
        <Typography variant="body2">
          Swift Number : {data?.swiftNo ? data?.swiftNo : "swift number"}
        </Typography>
      </Grid>
      <Grid container>
        <Typography variant="body2">
          IBAN Number : {data?.ibanNo ? data?.ibanNo : "iban number"}
        </Typography>
      </Grid>
      <Grid container>
        <Typography variant="body2">
          Account Number :{" "}
          {data?.accountNo ? data?.accountNo : "account number"}
        </Typography>
      </Grid>
    </Box>
  );
}
