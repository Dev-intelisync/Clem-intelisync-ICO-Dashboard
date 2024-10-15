import React, { useState, useContext, useEffect } from "react";
import Page from "@component/Page";
import {
  Box,
  Typography,
  Grid,
  InputAdornment,
  Button,
  makeStyles,
  TextField,
  FormHelperText,
  Select,
  FormControl,
  MenuItem,
} from "@material-ui/core";
import * as yep from "yup";
import { Form, Formik } from "formik";
import { useHistory, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import ApiConfig from "../../../config/APIConfig";
import axios from "axios";
import { AuthContext } from "@context/Auth";
import { values } from "lodash";

const useStyles = makeStyles((theme) => ({
  mainBox: {
    "& h5": {
      fontSize: "18px",
    },

    "& h3": {
      background:
        "linear-gradient(180deg, #00ACEB 0%, #00B0ED 10.18%, #1069C2 70.35%, #1069C2 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
      textFillColor: "transparent",
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

  Footersectionmain: {
    marginTop: "40px",
    "& h4": {
      fontSize: "16px",
      // color: "#1D2D3F",
    },
    "& h6": {
      fontSize: "14px",
      color: "#848484",
    },
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
  otherButton: {
    "& .buyBtn": {
      color: "white",
      borderRadius: "8px",
      padding: "9px 30px !important",
      fontSize: "14px",
      background:
        "linear-gradient(180deg, #00ACEB 0%, #00B0ED 10.18%, #1069C2 70.35%, #1069C2 100%)",
      boxShadow: " 0px 13px 27px rgb(0 0 0 / 25%)",
    },
    "& .Btn": {
      color: "#000",
      background: "#fff",
      borderRadius: "8px",
      padding: "8px 40px",
      marginRight: "10px",
      maxWidth: "100px",
    },

    "& .sellBtn": {
      color: "white",
      borderRadius: "8px",
      padding: "9px 30px !important",
      fontSize: "14px",
      background:
        "linear-gradient(180deg, #00ACEB 0%, #00B0ED 10.18%, #1069C2 70.35%, #1069C2 100%)",
      boxShadow: " 0px 13px 27px rgb(0 0 0 / 25%)",
    },
  },
  TextBox: {
    borderRadius: "10px",
    background: theme.palette.background.taf,
  },
}));

const EditAdds = () => {
  const [coin, setcoin] = useState("all");
  const [bankData, setBankId] = useState();
  const location = useLocation();
  const [data, setData] = useState({});

  const viewData = location?.state?.data;
  const bankDataAll = location?.state?.data;

  useEffect(() => {
    const bankDataAll = location?.state?.data;
    if (location?.state) {
      setData();
    }
  }, [location?.state]);

  const classes = useStyles();
  const history = useHistory();
  const auth = useContext(AuthContext);

  return (
    <>
      <Page title="Edit Adds">
        <Box className={classes.mainBox}>
          <Box>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={12} md={9} lg={7}>
                <Formik
                  initialValues={{
                    Trading: viewData?.tradeType ? viewData?.tradeType : "",
                    Max: viewData?.maxOrderLimit ? viewData?.maxOrderLimit : "",
                    Min: viewData?.minOrderLimit ? viewData?.minOrderLimit : "",
                    Price: viewData?.price ? viewData?.price : "",
                    Quantity: viewData?.quantity ? viewData?.quantity : "",
                  }}
                  initialStatus={{
                    success: false,
                    successMsg: "",
                  }}
                  onSubmit={async ({ Trading, Max, Min, Price, Quantity }) => {
                    try {
                      const res = await axios({
                        method: "PUT",
                        url: ApiConfig.p2pAdvertisementList,
                        headers: {
                          token: window.localStorage.getItem("token"),
                        },

                        data: {
                          tradeType: Trading,
                          paymentWindowTime: coin,
                          price: Price,
                          minOrderLimit: Min,
                          maxOrderLimit: Max,
                          bankId: bankData,
                          _id: viewData._id,
                          quantity: Quantity.toString(),
                        },
                      });

                      if (res.data.responseCode === 200) {
                        toast.success(res.data.responseMessage);
                      }
                    } catch (error) {
                      console.log(error);
                    }
                  }}
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
                    <Form onSubmit={handleSubmit}>
                      {" "}
                      <Box mt={4}>
                        <Box>
                          <Typography variant="h3">Edit Adds</Typography>
                        </Box>
                        <Box className={classes.containerBox}>
                          <Grid container spacing={2}>
                            <Grid item lg={6} md={6} sm={12} xs={12}>
                              <Box
                                mt={2}
                                align="left"
                                style={{ maxWidth: "350px" }}
                              >
                                <label> Trade Type</label>
                                <TextField
                                  className={`${classes.inputvalue} textFeilds`}
                                  placeholder="Enter total Amount"
                                  size="small"
                                  variant="outlined"
                                  fullWidth
                                  value={values.Trading}
                                  name="Trading"
                                  onChange={handleChange}
                                  InputProps={{
                                    className: classes.TextBox,
                                    // endAdornment: (
                                    //   <InputAdornment position="end">
                                    //     <Box style={{ color: "#848484" }}>
                                    //       USDT
                                    //     </Box>
                                    //   </InputAdornment>
                                    // ),
                                  }}
                                />
                                <FormHelperText error>
                                  {touched.Trading && errors.Trading}
                                </FormHelperText>
                              </Box>
                            </Grid>

                            <Grid item lg={6} md={6} sm={12} xs={12}>
                              <Box
                                mt={2}
                                align="left"
                                style={{ maxWidth: "350px" }}
                              >
                                <label>Max Order Limit</label>
                                <TextField
                                  className={`${classes.inputvalue} textFeilds`}
                                  placeholder="Please enter"
                                  size="small"
                                  value={values.Max}
                                  onChange={handleChange}
                                  variant="outlined"
                                  fullWidth
                                  name="Max"
                                  // placeholder="Enter your password"

                                  InputProps={{
                                    className: classes.TextBox,
                                    endAdornment: (
                                      <InputAdornment position="end">
                                        <Box style={{ color: "#848484" }}>
                                          INR
                                        </Box>
                                      </InputAdornment>
                                    ),
                                  }}
                                />
                              </Box>
                            </Grid>
                            <Grid item lg={6} md={6} sm={12} xs={12}>
                              <Box
                                mt={2}
                                align="left"
                                style={{ maxWidth: "350px" }}
                              >
                                <label>Min Order Limit</label>
                                <TextField
                                  className={`${classes.inputvalue} textFeilds`}
                                  placeholder="Please enter"
                                  size="small"
                                  variant="outlined"
                                  fullWidth
                                  value={values.Min}
                                  onChange={handleChange}
                                  name="Min"
                                  // placeholder="Enter your password"

                                  InputProps={{
                                    className: classes.TextBox,
                                    endAdornment: (
                                      <InputAdornment position="end">
                                        <Box style={{ color: "#848484" }}>
                                          INR
                                        </Box>
                                      </InputAdornment>
                                    ),
                                  }}
                                />
                              </Box>
                            </Grid>
                            <Grid item lg={6} md={6} sm={12} xs={12}>
                              <Box
                                mt={2}
                                align="left"
                                style={{ maxWidth: "350px" }}
                              >
                                <label>Quantity </label>
                                <TextField
                                  className={`${classes.inputvalue} textFeilds`}
                                  placeholder="Please enter"
                                  size="small"
                                  variant="outlined"
                                  fullWidth
                                  value={values.Quantity}
                                  onChange={handleChange}
                                  name="Quantity"
                                  InputProps={{
                                    className: classes.TextBox,
                                  }}
                                />
                              </Box>
                            </Grid>
                            <Grid item lg={6} md={6} sm={12} xs={12}>
                              <Box
                                mt={2}
                                align="left"
                                style={{ maxWidth: "350px" }}
                              >
                                <label>Price </label>
                                <TextField
                                  className={`${classes.inputvalue} textFeilds`}
                                  placeholder="Please enter"
                                  size="small"
                                  variant="outlined"
                                  fullWidth
                                  value={values.Price}
                                  onChange={handleChange}
                                  name="Price"
                                  disabled
                                  InputProps={{
                                    className: classes.TextBox,
                                    endAdornment: (
                                      <InputAdornment position="end">
                                        <Box style={{ color: "#848484" }}>
                                          INR
                                        </Box>
                                      </InputAdornment>
                                    ),
                                  }}
                                />
                              </Box>
                            </Grid>
                          </Grid>
                          <Box mt={3}>
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
                                  value={values?.bankData}
                                  onChange={handleChange}
                                  style={{ width: "192px" }}
                                >
                                  {/* {bankDataAll?.bankId &&
                                    bankDataAll?.bankId?.map(() => ( */}
                                  <MenuItem value={bankDataAll?.bankId?._id}>
                                    {bankDataAll?.bankId?.bankType ===
                                      "UPI" && (
                                      <> {bankDataAll?.bankId?.upiId}</>
                                    )}

                                    {bankDataAll?.bankId?.bankType ===
                                      "BANK" && (
                                      <> {bankDataAll?.bankId?.bankName}</>
                                    )}
                                  </MenuItem>
                                  {/* ))} */}
                                </Select>
                              </FormControl>
                            </Box>

                            <Box style={{ maxWidth: "200px" }}>
                              <label>Payment Time Limit</label>
                              <FormControl
                                variant="outlined"
                                fullWidth
                                className={classes.forminput}
                              >
                                {/* <InputLabel margin="dense">All</InputLabel> */}
                                <Select
                                  margin="dense"
                                  // label="All "
                                  name="token"
                                  className={classes.forminput}
                                  onChange={(e) => setcoin(e.target.value)}
                                  value={coin}
                                >
                                  <MenuItem
                                    value="10"
                                    style={{ fontSize: "12px" }}
                                  >
                                    10 Min
                                  </MenuItem>
                                  <MenuItem
                                    value="20"
                                    style={{ fontSize: "12px" }}
                                  >
                                    20 Min
                                  </MenuItem>

                                  <MenuItem
                                    value={"30"}
                                    style={{ fontSize: "12px" }}
                                  >
                                    30 Min
                                  </MenuItem>
                                </Select>
                              </FormControl>
                            </Box>
                            <Box
                              mt={6}
                              mb={2}
                              style={{ display: "flex" }}
                              className={classes.otherButton}
                            >
                              <Button
                                // variant="contained"
                                className="buyBtn"
                                onClick={() => history.push("/Allorderdata")}
                              >
                                Cancel
                              </Button>
                              &nbsp;&nbsp;&nbsp;
                              <Box>
                                {" "}
                                <Button className="sellBtn" type="submit">
                                  Update
                                </Button>
                              </Box>
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                    </Form>
                  )}
                </Formik>
              </Grid>
            </Grid>
          </Box>
        </Box>

        <Box className={classes.Footersectionmain}>
          {/* <Box>
            <Typography variant="h4">Remarks(Optional)</Typography>
          </Box> */}
          {/* <Box>
            <Typography variant="h6" style={{ maxWidth: "1000px" }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet
              laoreet pulvinar fringilla nisi feugiat convallis. Quam eros, sit
              massa tellus ornare. Quam et, diam lectus velit sapien, proin
              scelerisque vitae tincidunt. Varius velit id urna proin. Mi mi
              augue id vel nibh leo. Ut.
            </Typography>
          </Box> */}
        </Box>
      </Page>
    </>
  );
};

export default EditAdds;
