import React, { useState } from "react";
import {
  Button,
  Box,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
// import ButtonCircularProgress from '@component/ButtonCircularProgress';
import Alert from "@material-ui/lab/Alert";
import { useHistory } from "react-router-dom";

export function GetStepContent({ stepIndex, handleBack, handleNext }) {
  const history = useHistory();
  const [isSubmit, setIsSubmit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [formData, setFormData] = React.useState({
    tokenAddress: "",
    tokenName: "",
    tokenSymbol: "",
    tokenDecimal: "",
    toToken: "",
    tokenValue: "",
    balance: "",
    pullRunningTime: "",
    maxLiquidityETH: "",
  });

  const _onInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const temp = { ...formData, [name]: value };
    setFormData(temp);
  };

  const clearFormData = () => {
    setFormData({
      tokenAddress: "",
      tokenName: "",
      tokenSymbol: "",
      tokenDecimal: "",
      toToken: "ETH",
      tokenValue: 0,
      balance: 0,
      pullRunningTime: new Date(),
      maxLiquidityETH: "",
    });
    setIsSubmit(false);
  };

  const nextHandler = async () => {
    setIsLoading(true);
    setIsError(false);
    setIsSubmit(true);
    handleNext();
    clearFormData();
    setIsLoading(false);
    // if (stepIndex === 0) {
    //   if (formData.tokenAddress !== '' && formData.toToken !== '') {
    //     setIsSubmit(false);
    //     handleNext();
    //     saveStepOneData(formData);
    //   }
    // }
    // if (stepIndex === 1) {
    //   if (formData.tokenValue !== '' && formData.balance !== '') {
    //     setIsSubmit(false);
    //     handleNext();
    //     saveStepTwoData(formData, selectedDate);
    //   }
    // }
    // if (stepIndex === 2) {
    //   if (formData.maxLiquidityETH !== '') {
    //     setIsSubmit(false);
    //     handleNext();
    //     saveStepThreeData(formData);
    //   }
    // }
    // if (stepIndex === steps.length - 1) {
    //   setIsLoading(true);
    //   await createPoolHandler(formData);
    //   clearFormData();
    //   setIsLoading(false);
    // }
  };

  switch (stepIndex) {
    case 0:
      return (
        <form
          className="customForm"
          Validate
          autoComplete="off"
          style={{ minwidth: "100% !important" }}
        >
          <Box style={{ minwidth: "100% !important" }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel
                    id="demo-simple-select-outlined-label"
                    margin="dense"
                  >
                    Select Coin
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    label="To Token"
                    defaultValue="ETH"
                    name="toToken"
                    value={formData.toToken}
                    onChange={_onInputChange}
                    margin="dense"
                    error={isSubmit && formData.toToken === ""}
                    // helperText={
                    //   isSubmit &&
                    //   formData.toToken === '' &&
                    //   'Please Select To Token'
                    // }
                  >
                    <MenuItem value="ETH">ETH</MenuItem>
                    <MenuItem value="DAI">DAI</MenuItem>
                    <MenuItem value="USDT">USDT</MenuItem>
                    <MenuItem value="GOD">GOD</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Enter Amount"
                  margin="normal"
                  size="small"
                  variant="outlined"
                  fullWidth
                  name="tokenName"
                  value={formData.tokenName}
                  onChange={_onInputChange}
                  readOnly
                  // disabled
                />
              </Grid>
            </Grid>
            <Box mt={5}>
              {/* // display="flex" justifyContent="space-around"> */}
              <Button
               style={{ padding: "6px 20px" }}
                variant="containedPrimary"
                className="leftButton"
                onClick={() => history.push("/trade")}
              >
                Cancel
              </Button>

              <Button
                variant="contained"
                className="rightButton"
                onClick={nextHandler}
              >
                Next
              </Button>
            </Box>
          </Box>
        </form>
      );
    case 1:
      return (
        <form className="customForm" Validate autoComplete="off">
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Amount BTC"
                  margin="normal"
                  size="small"
                  variant="outlined"
                  fullWidth
                  name="tokenSymbol"
                  value={formData.tokenSymbol}
                  onChange={_onInputChange}
                  readOnly
                  // disabled
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Amount USD"
                  placeholder="0"
                  margin="normal"
                  size="small"
                  variant="outlined"
                  fullWidth
                  name="tokenDecimal"
                  type="number"
                  value={formData.tokenDecimal}
                  onChange={_onInputChange}
                  readOnly
                  // disabled
                />
              </Grid>
              {isError && (
                <Box py={2}>
                  <Alert severity="error">{"Error In Transaction"}</Alert>
                </Box>
              )}
            </Grid>
            <Box mt={5}>
              <Button
                variant="containedPrimary"
                onClick={handleBack}
                disabled={isLoading}
                className="leftButton"
                style={{ padding: "6px 20px" }}
              >
                Back
              </Button>
              <Button
                variant="contained"
                className="rightButton"
                onClick={nextHandler}
              >
                Next
              </Button>
            </Box>
          </Box>
        </form>
      );
    case 2:
      return (
        <form className="customForm" Validate autoComplete="off">
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel id="demo-simple-select-outlined-label">
                    Select Payment Option
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    label="Select Payment Option"
                    defaultValue="ETH"
                    name="toToken"
                    value={formData.toToken}
                    onChange={_onInputChange}
                    error={isSubmit && formData.toToken === ""}
                    // helperText={
                    //   isSubmit &&
                    //   formData.toToken === '' &&
                    //   'Please Select To Token'
                    // }
                  >
                    <MenuItem value="ETH">ETH</MenuItem>
                    <MenuItem value="DAI">DAI</MenuItem>
                    <MenuItem value="USDT">USDT</MenuItem>
                    <MenuItem value="GOD">GOD</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            <Box mt={5}>
              <Button
                variant="containedPrimary"
                onClick={handleBack}
                disabled={isLoading}
                className="leftButton"
                style={{ padding: "6px 20px" }}
              >
                Back
              </Button>
              <Button
                variant="contained"
                className="rightButton"
                onClick={nextHandler}
              >
                Finish
              </Button>
            </Box>
          </Box>
        </form>
      );
    default:
      return "Unknown stepIndex";
  }
}
