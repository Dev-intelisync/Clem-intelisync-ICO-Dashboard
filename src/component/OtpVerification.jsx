import React, { useState } from "react";
import {
  Typography,
  Box,
  Button,
  TextField,
  Dialog,
  FormHelperText,
} from "@material-ui/core";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Form, Formik } from "formik";
import { toast } from "react-toastify";
import axios from "axios";
import ApiConfig from "../config/APIConfig";
import * as yep from "yup";
import { useHistory, Link as RouterComponent } from "react-router-dom";
import ButtonCircularProgress from "./ButtonCircularProgress";

export default function SendMoneyDialog({
  open,
  handleClose,
  submitHandler,
  dataId,
  dataList,
}) {
  const [isSubmit, setIsSubmit] = useState(false);
  const [isLoading, setLoader] = useState(false);
  const history = useHistory();

  const webUrl = window.location.href;

  const [formData, setFormData] = useState({
    amount: "",
    address: "",
  });

  const handleFormSubmit = async (values) => {
    try {
      setLoader(true);

      const res = await axios({
        method: "POST",
        url: ApiConfig.withdraw,
        headers: {
          token: window.sessionStorage.getItem("token"),
        },
        data: {
          amount: values.amount,
          toAddress: values.address,
          coinName: dataId?.coinData?.coinShortName,
          isExternal: true,
          isKycAccepted: true,
          isWithdraw: false,
          tag: "string",
          url: `${webUrl}/approve`,
        },
      });
      if (res.data.status === 200) {
        toast.success(
          "Amount send successfully, please check your email for approve"
        );
        // window.localStorage.setItem("email", values.email);
        setLoader(false);
        setIsSubmit(true);
        // history.push({
        //   pathname: "/my-wallet/approve",
        //   // state: { email: values.userId },
        // });
      } else {
        setLoader(false);
        toast.warn(res.data.message);
      }
    } catch (error) {
      console.log("ERROR", error);
      setLoader(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle id="form-dialog-title">
        {dataId?.coinData?.coinShortName === "BTC" && <>Send Bitcoin</>}
        {dataId?.coinData?.coinShortName === "ETH" && <>Send ETH</>}
        {/* {dataId?.coinData?.coinShortName === "Toga" && <>Send Toga</>} */}
        {dataId?.coinData?.coinShortName === "USDT" && <>Send USDT</>}
        {dataId?.coinData?.coinShortName === "BNB" && <>Send BNB</>}
      </DialogTitle>
      <Formik
        onSubmit={(values) => handleFormSubmit(values)}
        initialValues={{
          amount: "",
          address: "",
        }}
        initialStatus={{
          success: false,
          successMsg: "",
        }}
        validationSchema={yep.object().shape({
          amount: yep.string().required("Amount is required"),

          address: yep.string().required("Address is required"),
        })}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          touched,
          values,
          setFieldValue,
        }) => (
          <Form style={{ marginTop: "-30px" }}>
            <DialogContent>
              <TextField
                label="Coin Amount"
                type="number"
                margin="normal"
                size="small"
                variant="outlined"
                fullWidth
                name="amount"
                value={values.amount}
                onChange={handleChange}
                error={Boolean(touched.amount && errors.amount)}
                onBlur={handleBlur}
              />
              <FormHelperText error style={{ marginTop: "-6px" }}>
                {touched.amount && errors.amount}
              </FormHelperText>
              <label>Wallet Address</label>
              <TextField
                // label="Wallet Address"
                placeholder="wallet address"
                margin="normal"
                size="small"
                variant="outlined"
                fullWidth
                name="address"
                value={values.address}
                onChange={handleChange}
                error={Boolean(touched.address && errors.address)}
                onBlur={handleBlur}
              />
              <FormHelperText error style={{ marginTop: "-6px" }}>
                {touched.address && errors.address}
              </FormHelperText>
              <Box mt={2}>
                <Typography variant="subtitle2">Fee : 0.0242</Typography>
                <Typography variant="subtitle2">
                  Available Balance : {dataList?.coinBalance?.availableBalance}{" "}
                  &nbsp;
                  {dataList?.coinData?.coinShortName}
                </Typography>
                <Typography variant="subtitle2">
                  Minimum Balance : 0.1
                </Typography>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button
                variant="outlined"
                color="primary"
                onClick={handleClose}
                style={{ padding: "6px 20px" }}
                disabled={isLoading}
              >
                Close
              </Button>
              <Button
                variant="containedPrimary"
                type="submit"
                style={{ padding: "5px 20px", textTransform: "capitalize" }}
                disabled={isLoading}
              >
                Send
                {isLoading && <ButtonCircularProgress />}
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
}
