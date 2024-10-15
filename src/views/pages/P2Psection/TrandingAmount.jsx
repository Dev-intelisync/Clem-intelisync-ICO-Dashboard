import React, { useState } from "react";
import Page from "../../../component/Page";
import {
  Box,
  Typography,
  Grid,
  IconButton,
  InputAdornment,
  makeStyles,
  TextField,
  FormHelperText,
  Select,
  FormControl,
  MenuItem,
} from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";
import * as yep from "yup";
import AddIcon from "@material-ui/icons/Add";
import { Form, Formik } from "formik";
import { BiLock, BiLockOpen } from "react-icons/bi";
import AddBankModal from "./AddBankModal";

const useStyles = makeStyles((theme) => ({
  mainBox: {
    paddingBottom: "50px",
    "& h5": {
      fontSize: "18px",
    },
    "& h6": {
      fontSize: "15px",
    },

    "& .mainLine1": {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
      "& .setBox1": {
        display: "flex",
        alignItems: "center",
        "& .imageBox": {
          marginRight: "20px",
          maxWidth: "45px",
        },
      },
      "& .butonBox": {
        marginLeft: "25px",
      },
    },
  },
  template: {
    display: "flex",
    alignItems: "center",

    border: "1px solid #b8bcb7",
    width: "fit-content",
    padding: "2px 2px 0px",
    borderRadius: "10px",
    margin: " 10px 6px",
    marginTop: "20px",
  },
  template1: {
    display: "flex",
    alignItems: "center",
    // border: "1px solid #e7f0f9",

    padding: "2px 2px 0px",
    borderRadius: "10px",
    margin: " 10px 6px",
    marginTop: "20px",
  },
  googleBtn: {
    color: "#848484",
    border: "1px solid #3a96dd",
    filter: "drop-shadow(0px 13px 27px rgba(0, 0, 0, 0.25))",
    padding: " 9px 10px !important",
    fontSize: " 13px",
    fontWeight: 400,
    borderRadius: "30px",
  },
  contentBox: {
    background: theme.palette.background.taf,
    borderRadius: "10px",
    padding: "10px 15px",
  },
  containerBox: {
    // display: "flex",
    background:
      "linear-gradient(180deg, rgba(0, 172, 235, 0.1) 0%, rgba(0, 176, 237, 0.1) 10.18%, rgba(16, 105, 194, 0.1) 70.35%, rgba(16, 105, 194, 0.1) 100%)",
    borderRadius: "10px",
    border: "1px solid #6ECFF3",
    marginTop: "40px",
    padding: "40px",
    flexDirection: "column",
    alignItems: "center",
  },
  TextBox: {
    borderRadius: "10px",
    background: theme.palette.background.taf,
  },
}));

const ChangePassword = ({
  priceUSD,
  priceINR,
  CryptoCoin,
  formData,
  setFormData,
  isSubmit,
  bankDetails,
  banksType,
  setbanksType,
  setBankId,
  bankData,
  bankId,
}) => {
  const [formData1, setFormData1] = useState([]);
  const [addBankModal, setAddBankModal] = useState(false);

  const classes = useStyles();

  const _onInputChange = (name, value) => {
    const temp = { ...formData, [name]: value };
    setFormData(temp);
  };

  const removeLastItem = (ind) => {
    const values = [...banksType];
    for (var i = 0; i < values.length; i++) {
      if (i == ind) {
        var values1 = values.splice(ind, 1);
      }
    }

    setbanksType(values);
  };

  const listPropertiesHandler = async (id) => {};
  return (
    <>
      <Page title="ChangePassword">
        <Box className={classes.mainBox}>
          <Box>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={12} md={9} lg={8}>
                <Box mt={4}>
                  <Box className={classes.containerBox}>
                    <Grid container spacing={2}>
                      <Grid item lg={6} md={6} sm={6} xs={12}>
                        <Box mt={2} align="left" style={{ maxWidth: "350px" }}>
                          <label>Total Trading Amount</label>
                          <TextField
                            className={`${classes.inputvalue} textFeilds`}
                            placeholder="Enter total Amount"
                            size="small"
                            variant="outlined"
                            fullWidth
                            type="number"
                            // onChange={(e) => {
                            //   if (e.target.value && e.target.value != "-") {
                            //     _onInputChange(
                            //       "totalAmount",
                            //       Math.abs(Number(e.target.value))
                            //     );
                            //   } else {
                            //     _onInputChange("totalAmount", "");
                            //   }
                            // }}
                            // onKeyPress={(event) => {
                            //   if (event?.key === "-" || event?.key === "+") {
                            //     event.preventDefault();
                            //   }
                            // }}
                            value={
                              formData.price +
                              (formData.price * formData.margin) / 100
                            }
                            name="oldpassword"
                            InputProps={{
                              className: classes.TextBox,
                              endAdornment: (
                                <InputAdornment position="end">
                                  <Box style={{ color: "#848484" }}>
                                    {/* USDT */}
                                    {formData?.assets != "NA" &&
                                      formData?.assets}
                                  </Box>
                                </InputAdornment>
                              ),
                            }}
                            disabled
                          />
                          {/* <FormHelperText error style={{ paddingLeft: "0px" }}>
                            {isSubmit &&
                              formData?.totalAmount == "" &&
                              " Enter total trading amount"}
                          </FormHelperText> */}
                        </Box>
                      </Grid>

                      <Grid item lg={6} md={6} sm={6} xs={12}>
                        <Box mt={2} align="left" style={{ maxWidth: "350px" }}>
                          <label>Max Order Limit</label>
                          <TextField
                            className={`${classes.inputvalue} textFeilds`}
                            placeholder="Please enter"
                            size="small"
                            variant="outlined"
                            fullWidth
                            type="number"
                            // onChange={(e) =>
                            //   _onInputChange("maxValue", e.target.value)
                            // }

                            onChange={(e) => {
                              if (e.target.value && e.target.value != "-") {
                                _onInputChange(
                                  "maxValue",
                                  Math.abs(Number(e.target.value))
                                );
                              } else {
                                _onInputChange("maxValue", "");
                              }
                            }}
                            onKeyPress={(event) => {
                              if (event?.key === "-" || event?.key === "+") {
                                event.preventDefault();
                              }
                            }}
                            value={formData.maxValue}
                            InputProps={{
                              className: classes.TextBox,
                              endAdornment: (
                                <InputAdornment position="end">
                                  <Box style={{ color: "#848484" }}>
                                    {formData?.assets != "NA" &&
                                      formData?.assets}
                                  </Box>
                                </InputAdornment>
                              ),
                            }}
                          />
                          <FormHelperText error style={{ paddingLeft: "0px" }}>
                            {(isSubmit &&
                              formData?.maxValue == "" &&
                              " Enter max order limit ") ||
                              (isSubmit &&
                                formData?.maxValue > formData.price &&
                                "Max order limit must be less or equal to price ") ||
                              (isSubmit &&
                                Number(formData?.maxValue) >
                                  Number(formData?.price) &&
                                "  Max value must be less than total trading amount")}
                          </FormHelperText>
                        </Box>
                      </Grid>
                      <Grid item lg={6} md={6} sm={6} xs={12}>
                        <Box mt={2} align="left" style={{ maxWidth: "350px" }}>
                          <label>Min Order Limit</label>
                          <TextField
                            className={`${classes.inputvalue} textFeilds`}
                            placeholder="Please enter"
                            size="small"
                            variant="outlined"
                            fullWidth
                            type="number"
                            onChange={(e) => {
                              if (e.target.value && e.target.value != "-") {
                                _onInputChange(
                                  "minValue",
                                  Math.abs(Number(e.target.value))
                                );
                              } else {
                                _onInputChange("minValue", "");
                              }
                            }}
                            onKeyPress={(event) => {
                              if (event?.key === "-" || event?.key === "+") {
                                event.preventDefault();
                              }
                            }}
                            value={formData.minValue}
                            InputProps={{
                              className: classes.TextBox,
                              endAdornment: (
                                <InputAdornment position="end">
                                  <Box style={{ color: "#848484" }}>
                                    {formData?.assets != "NA" &&
                                      formData?.assets}
                                  </Box>
                                </InputAdornment>
                              ),
                            }}
                          />
                          <FormHelperText error style={{ paddingLeft: "0px" }}>
                            {(isSubmit &&
                              formData?.minValue == "" &&
                              " Enter min order limit") ||
                              (isSubmit &&
                                Number(formData?.minValue) >
                                  Number(formData?.maxValue) &&
                                " Min value must be less than max value")}
                          </FormHelperText>
                        </Box>
                      </Grid>
                    </Grid>
                    <Box mt={3}>
                      {/* {banksType.length > 0 && ( */}
                      <Box style={{ display: "flex", flexWrap: "wrap" }}>
                        {bankDetails &&
                          bankDetails?.map((temp, I) => {
                            if (!banksType.includes(temp)) {
                              return;
                            }
                            return (
                              <Box className={classes.template}>
                                {/* <img
                                  src="/images/paytm.png"
                                  style={{
                                    marginRight: "12px",
                                    marginLeft: "5px",
                                    width: "50px",
                                  }}
                                /> */}
                                <Typography
                                  variant="h5"
                                  style={{ padding: "0 10px" }}
                                >
                                  {temp}
                                </Typography>

                                <IconButton>
                                  <CancelIcon
                                    onClick={(e) => removeLastItem(I)}
                                  />
                                </IconButton>
                              </Box>
                            );
                          })}
                        {/* <Box className={classes.template}>
                          <img
                            src="/images/paytm.png"
                            style={{
                              marginRight: "12px",
                              marginLeft: "5px",
                              width: "50px",
                            }}
                          />

                          <IconButton>
                            <CancelIcon />
                          </IconButton>
                        </Box> */}
                        {/* <Box className={classes.template}>
                          <img
                            src="/images/paytm.png"
                            style={{
                              marginRight: "12px",
                              marginLeft: "5px",
                              width: "50px",
                            }}
                          />

                          <IconButton>
                            <CancelIcon />
                          </IconButton>
                        </Box> */}

                        <Box style={{ maxWidth: "200px" }}>
                          <label>Select Bank</label>
                          <FormControl
                            variant="outlined"
                            fullWidth
                            className={classes.forminput}
                          >
                            <Select
                              variant="outlined"
                              fullWidth
                              onChange={(e) => setBankId(e.target.value)}
                              style={{ width: "192px" }}
                            >
                              {bankData &&
                                bankData.map((data, i) => (
                                  <MenuItem value={data?._id}>
                                    {data?.bankType === "BANK" && (
                                      <>{data?.bankName}</>
                                    )}
                                    {data?.bankType === "UPI" && (
                                      <> {data?.upiId}</>
                                    )}
                                  </MenuItem>
                                ))}
                            </Select>
                            <FormHelperText
                              error
                              style={{ paddingLeft: "0px" }}
                            >
                              {isSubmit && bankId == "" && "Select banks"}
                            </FormHelperText>
                          </FormControl>
                        </Box>
                      </Box>
                      {/* )} */}
                      <Box style={{ maxWidth: "200px" }}>
                        <label>Payment Time Limit</label>
                        <FormControl
                          variant="outlined"
                          fullWidth
                          className={classes.forminput}
                        >
                          <Select
                            margin="dense"
                            name="token"
                            className={classes.forminput}
                            // onChange={(e) => setcoin(e.target.value)}
                            // value={coin}
                            onChange={(e) =>
                              _onInputChange("paymentWindow", e.target.value)
                            }
                            value={formData.paymentWindow}
                          >
                            <MenuItem value="0" style={{ fontSize: "12px" }}>
                              Select Window Time
                            </MenuItem>
                            <MenuItem value="10" style={{ fontSize: "12px" }}>
                              10 Min
                            </MenuItem>
                            <MenuItem value="20" style={{ fontSize: "12px" }}>
                              20 Min
                            </MenuItem>

                            <MenuItem value={"30"} style={{ fontSize: "12px" }}>
                              30 Min
                            </MenuItem>
                          </Select>

                          <FormHelperText error style={{ paddingLeft: "0px" }}>
                            {isSubmit &&
                              formData.paymentWindow == 0 &&
                              "Select payment window time"}
                          </FormHelperText>
                        </FormControl>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
        {addBankModal && (
          <AddBankModal
            propertyOpen={addBankModal}
            setPropertyOpen={setAddBankModal}
            listPropertiesHandler={listPropertiesHandler}
            formData={formData1}
            setFormData={setFormData1}
            bankDetails={bankDetails}
            banksType={banksType}
            setbanksType={setbanksType}
            setBankId={setBankId}
            bankData={bankData}
          />
        )}
      </Page>
    </>
  );
};

export default ChangePassword;
