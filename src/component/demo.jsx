import React, { useState } from "react";
import {
  Container,
  Box,
  Typography,
  makeStyles,
  Button,
  // InputBase,
  TextField,
  FormControl,
  FormHelperText,
} from "@material-ui/core";

import axios from "axios";
import ApiConfig from "../config/APIConfig";
import { Formik } from "formik";
import * as yep from "yup";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import ButtonCircularProgress from "../component/ButtonCircularProgress";

const useStyles = makeStyles((theme) => ({
  password: {
    paddingLeft: "70px",
    paddingRight: "70px",

    [theme.breakpoints.down("md")]: {
      paddingLeft: "50px",
      paddingRight: "50px",
    },
    "@media(max-width:768px)": {
      paddingLeft: "10px",
      paddingRight: "10px",
    },
    "& .MuiOutlinedInput-input": {
      // border: "1px solid grey",
      // height: "35px",
      padding: "10px 17px",
      fontSize: "14px",
      // marginTop: "5px",
      borderRadius: "20px",
      // position: "relative",
      textDecoration: "none",
    },
    "& .MuiOutlinedInput-root": {
      borderRadius: "50px",
      backgroundColor: "#e8f0fe",
      height: "45px",
    },
  },
  field: {
    borderRadius: "50px",
    height: "45px !important",
    border: "1px solid grey",
    padding: "10px",
    backgroundColor: "#e8f0fe",
    marginTop: "5px",
    fontSize: "12px",
  },
  text: {
    textAlign: "center",
    fontSize: "14px",
    color: "grey",
    marginTop: "20px",
    fontWeight: "400",
  },
  otpInput: {
    border: "1px solid grey",
    width: "40px",
    marginRight: "10px",
    paddingLeft: "10px",
    "& input[type=number]": {
      "-moz-appearance": "textfield",
    },
    "& input[type=number]::-webkit-outer-spin-button": {
      "-webkit-appearance": "none",
      margin: 0,
    },
    "& input[type=number]::-webkit-inner-spin-button": {
      "-webkit-appearance": "none",
      margin: 0,
    },
  },
  fields: {
    display: "flex",
    marginTop: "40px",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "50px",
    height: "45px",
  },
  fieldsOTP: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "50px",
    // height: "45px",
  },
  button: {
    borderRadius: "25px",
    border: 0,
    backgroundColor: "#56CA00",
    color: "#fff",
    width: "auto",
    minWidth: "150px",
    height: "45px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "15px",
    marginBottom: "20px",
    paddingRight: "10px",
    paddingLeft: "10px",
  },

  otp: {
    width: 50,
    height: 35,
    textAlign: "center",
    marginLeft: 10,
    // marginBottom: 10,
    border: "0.8px solid #ccc",
    borderRadius: "3px",
    fontSize: 20,
    "@media(max-width:463px)": {
      width: "36px",
    },
  },
  padding: {
    paddingTop: "50px",
    paddingBottom: "50px",
  },

  hideShow: {
    display: "none",
  },

  hideShow1: {
    display: "block",
  },
}));
function ConfirmEmail() {
  const classes = useStyles();

  const [email, setEmail] = useState("");

  const [isUpdating, setIsUpdating] = useState(false);
  const [verify, setverify] = useState(false);
  const [resend, setresend] = useState(false);
  const [otpError, setOtpError] = useState(false);
  const [otp, setOtp] = useState(new Array(6).fill(""));

  const history = useHistory();

  const handleShow = (e) => {
    var get = document.getElementById("demo1");
    get.style.display = "block";
  };
  const handleShow2 = (e) => {
    var get = document.getElementById("demo2");
    get.style.display = "none";
  };

  const handleOtp = (element, index) => {
    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);
    //focus next element
    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };
  const _onBackSpace = (e) => {
    const keyCode = e.keyCode;
    const prev = e.target.previousSibling;
    if (keyCode === 8 && prev !== null) {
      setTimeout(() => {
        prev.focus();
      });
    }
  };
  //  OTP Verify

  const otpVerify = async () => {
    const vari = otp.toString();

    if (vari === ",,,,,") {
      setOtpError(true);
      return;
    }
    setverify(true);
    // eslint-disable-next-line
    const response = await axios
      .put(ApiConfig.otpVerify, {
        email: email,
        otp: parseInt(vari.replace(/,/g, "")),
      })
      .then(async (res) => {
        if (res.data.responseCode === 200) {
          setverify(false);
          toast.success(res.data.responseMessage);
          history.push({
            pathname: "/newPassword",
            state: {
              email: email,
              otp: parseInt(vari.replace(/,/g, "")),
            },
          });
          // history.push({
          //   pathname: "/login",
          // });
        } else if (res.data.responseCode === 403) {
          setverify(false);
          // responseMessage;
          toast.error(res.data.responseMessage);
        } else {
          setverify(false);
          // responseMessage;
          toast.error(res.data.responseMessage);
          // window.location.reload();
        }
      });
  };

  const resendOtp = async () => {
    setresend(true);
    // eslint-disable-next-line
    const response = await axios
      .put(ApiConfig.resendOtp, {
        email: email,
      })
      .then(async (res) => {
        if (res.data.responseCode === 200) {
          setresend(false);
          toast.success(res.data.responseMessage);
        } else if (res.data.responseCode === 403) {
          setresend(false);
          // responseMessage;
          toast.error(res.data.responseMessage);
        } else {
          setresend(false);
          // responseMessage;
          toast.error(res.data.responseMessage);
          // window.location.reload();
        }
      });
  };

  return (
    <Box>
      <Container>
        <Box className="login" style={{ minHeight: "407px" }}>
          <Box className="template">
            <Box className="left">
              <img ..="/images/image.png" alt="" className="img" />
            </Box>
            <Box
              className="right"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Box className={classes.padding}>
                <Formik
                  initialValues={{
                    email: "",
                  }}
                  initialStatus={{
                    success: false,
                    successMsg: "",
                  }}
                  validationSchema={yep.object().shape({
                    email: yep
                      .string()
                      .matches(
                        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        "Please enter a valid email address"
                      )
                      .required("Email address is required"),
                  })}
                  onSubmit={async ({ email, password }) => {
                    setIsUpdating(true);
                    setEmail(email);
                    try {
                      // eslint-disable-next-line
                      const response = await axios
                        .put(ApiConfig.forgotPassword, {
                          email: email,
                        })
                        .then(async (res) => {
                          if (res.data.responseCode === 200) {
                            toast.success(res.data.responseMessage);

                            handleShow();
                            handleShow2();
                            setIsUpdating(false);
                          } else if (res.data.responseCode === 404) {
                            toast.error(res.data.responseMessage);
                            setIsUpdating(false);
                            // history.push({
                            //   pathname: "/signup",
                            // });
                          } else {
                            toast.error(res.data.responseMessage);
                            setIsUpdating(false);
                          }
                        });
                    } catch (error) {
                      toast.error(error.message);
                      setIsUpdating(false);
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
                  }) => (
                    <form
                      noValidate
                      onSubmit={handleSubmit}
                      className={classes.hideShow1}
                      open={false}
                      id="demo2"
                    >
                      <Box>
                        <Typography
                          variant="h1"
                          style={{
                            textAlign: "center",
                            color: "#1b1d51",
                            marginBottom: "30px",
                          }}
                        >
                          Confirm Email
                        </Typography>
                      </Box>
                      <Box className={classes.password}>
                        <FormControl fullWidth>
                          <Typography
                            variant="body2"
                            style={{
                              // fontSize: "13px",
                              marginBottom: "5px",
                              // marginTop: "10px",
                            }}
                          >
                            Email address
                            <sup style={{ color: "#FF0000" }}>*</sup>
                          </Typography>
                          <TextField
                            // as={InputBase}
                            placeholder="Enter your email address"
                            fullWidth
                            style={{
                              padding: "0",
                              borderRadius: "20px",
                            }}
                            type="email"
                            variant="outlined"
                            name="email"
                            value={values.email}
                            error={Boolean(touched.email && errors.email)}
                            onBlur={handleBlur}
                            onChange={handleChange}
                          />
                          <FormHelperText error>
                            {touched.email && errors.email}
                          </FormHelperText>
                        </FormControl>
                      </Box>
                      <Box
                        style={{
                          textAlign: "center",
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <Box>
                          <Button
                            className={classes.button}
                            type="submit"
                            fullWidth
                            size="large"
                            variant="contained"
                            color="primary"
                            disabled={isUpdating}
                          >
                            Send OTP{isUpdating && <ButtonCircularProgress />}
                          </Button>
                        </Box>
                      </Box>
                      <Box>
                        <Typography
                          variant="h4"
                          style={{
                            textAlign: "center",
                            marginTop: "10px",
                            marginBottom: "10px",
                            color: "#1d1d4b",
                          }}
                        >
                          {/* or sign in with */}
                        </Typography>
                      </Box>
                    </form>
                  )}
                </Formik>

                <div className={classes.hideShow} open={false} id="demo1">
                  <Box>
                    <Typography
                      variant="h1"
                      style={{
                        textAlign: "center",
                        color: "#1b1d51",
                        marginBottom: "30px",
                      }}
                    >
                      Confirm OTP
                    </Typography>
                    <Typography className={classes.text}>
                      Please provide authorization PIN {email}
                    </Typography>
                  </Box>
                  <Box
                    className={classes.fields}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {otp &&
                      otp?.map((data, index) => {
                        return (
                          <input
                            type="text"
                            name="otp"
                            maxLength="1"
                            className={classes.otp}
                            style={{ border: "0.8px solid #ccc" }}
                            key={index}
                            value={data}
                            onChange={(e) => handleOtp(e.target, index)}
                            onKeyDown={_onBackSpace}
                            // error={isSubmit && otp === ''}
                            // helperText={isSubmit && otp === '' && 'Enter OTP'}
                            // onFocus={(e) => e.target.select()}
                          />
                        );
                      })}
                    {/* otpError */}
                  </Box>
                  <Box className={classes.fieldsOTP}>
                    <FormHelperText error>
                      {otpError && "OTP is required"}
                    </FormHelperText>
                  </Box>
                  <>
                    {/* <Box className={classes.fields}>
                    <Box>
                      <InputBase
                        type="number"
                        onInput={(e) => {
                          e.target.value = Math.max(0, parseInt(e.target.value))
                            .toString()
                            .slice(0, 1);
                        }}
                        className={classes.otpInput}
                        ref={ref0}
                        // maxLength="1"
                        value={otp.slice(0, 1)}
                        style={{
                          fontSize: 24,
                          width: 38,
                          height: 40,
                          display: "flex",
                          alignItems: "center",
                          justifySelf: "center",
                          textAlign: "center",
                          marginRight: 5,
                        }}
                        onChange={(event) => {
                          if (
                            event.target.value !== "" &&
                            event.target.value.length === 1 &&
                            isNumeric(event.target.value)
                          ) {
                            setOtp(otp + event.target.value);
                            ref1.current.focus();
                          } else {
                            if (event.target.value.length > 1) {
                              setOtp(
                                event.target.value.slice(1, 2) + otp.slice(1)
                              );
                              ref1.current.focus();
                            } else {
                              setOtp(otp.slice(1));
                            }
                          }
                        }}
                      />
                    </Box>
                    <Box>
                      <InputBase
                        type="number"
                        onInput={(e) => {
                          e.target.value = Math.max(0, parseInt(e.target.value))
                            .toString()
                            .slice(0, 1);
                        }}
                        className={classes.otpInput}
                        ref={ref1}
                        maxLength="1"
                        value={otp.slice(1, 2)}
                        style={{
                          fontSize: 24,
                          width: 38,
                          height: 40,
                          display: "flex",
                          alignItems: "center",
                          justifySelf: "center",
                          textAlign: "center",
                          marginRight: 5,
                        }}
                        onChange={(event) => {
                          if (
                            event.target.value !== "" &&
                            event.target.value.length === 1 &&
                            isNumeric(event.target.value)
                          ) {
                            setOtp(otp + event.target.value);
                            ref2.current.focus();
                          } else {
                            if (event.target.value.length > 1) {
                              setOtp(
                                otp.slice(0, 1) +
                                  event.target.value.slice(1, 2) +
                                  otp.slice(2)
                              );
                              ref2.current.focus();
                            } else {
                              setOtp(otp.slice(0, 1) + otp.slice(2));
                              ref0.current.focus();
                            }
                          }
                        }}
                      />
                    </Box>
                    <Box>
                      <InputBase
                        type="number"
                        onInput={(e) => {
                          e.target.value = Math.max(0, parseInt(e.target.value))
                            .toString()
                            .slice(0, 1);
                        }}
                        className={classes.otpInput}
                        ref={ref2}
                        maxLength="1"
                        value={otp.slice(2, 3)}
                        style={{
                          fontSize: 24,
                          width: 38,
                          height: 40,
                          display: "flex",
                          alignItems: "center",
                          justifySelf: "center",
                          textAlign: "center",
                          marginRight: 5,
                        }}
                        onChange={(event) => {
                          if (
                            event.target.value !== "" &&
                            event.target.value.length === 1 &&
                            isNumeric(event.target.value)
                          ) {
                            setOtp(otp + event.target.value);
                            ref3.current.focus();
                          } else {
                            if (event.target.value.length > 1) {
                              setOtp(
                                otp.slice(0, 2) +
                                  event.target.value.slice(1, 2) +
                                  otp.slice(3)
                              );
                              ref3.current.focus();
                            } else {
                              setOtp(otp.slice(0, 2) + otp.slice(3));
                              ref1.current.focus();
                            }
                          }
                        }}
                      />
                    </Box>
                    <Box>
                      <InputBase
                        type="number"
                        onInput={(e) => {
                          e.target.value = Math.max(0, parseInt(e.target.value))
                            .toString()
                            .slice(0, 1);
                        }}
                        className={classes.otpInput}
                        ref={ref3}
                        maxLength="1"
                        value={otp.slice(3, 4)}
                        style={{
                          fontSize: 24,
                          width: 38,
                          height: 40,
                          display: "flex",
                          alignItems: "center",
                          justifySelf: "center",
                          textAlign: "center",
                          marginRight: 5,
                        }}
                        onChange={(event) => {
                          if (
                            event.target.value !== "" &&
                            event.target.value.length === 1 &&
                            isNumeric(event.target.value)
                          ) {
                            setOtp(otp + event.target.value);
                            ref4.current.focus();
                          } else {
                            if (event.target.value.length > 1) {
                              setOtp(
                                otp.slice(0, 3) +
                                  event.target.value.slice(1, 2) +
                                  otp.slice(4)
                              );
                              ref4.current.focus();
                            } else {
                              setOtp(otp.slice(0, 3) + otp.slice(4));
                              ref2.current.focus();
                            }
                          }
                        }}
                      />
                    </Box>
                    <Box>
                      <InputBase
                        type="number"
                        onInput={(e) => {
                          e.target.value = Math.max(0, parseInt(e.target.value))
                            .toString()
                            .slice(0, 1);
                        }}
                        className={classes.otpInput}
                        ref={ref4}
                        maxLength="1"
                        value={otp.slice(4, 5)}
                        style={{
                          fontSize: 24,
                          width: 38,
                          height: 40,
                          display: "flex",
                          alignItems: "center",
                          justifySelf: "center",
                          textAlign: "center",
                          marginRight: 5,
                        }}
                        onChange={(event) => {
                          if (
                            event.target.value !== "" &&
                            event.target.value.length === 1 &&
                            isNumeric(event.target.value)
                          ) {
                            setOtp(otp + event.target.value);
                            ref5.current.focus();
                          } else {
                            if (event.target.value.length > 1) {
                              setOtp(
                                otp.slice(0, 4) +
                                  event.target.value.slice(1, 2) +
                                  otp.slice(5)
                              );
                              ref5.current.focus();
                            } else {
                              setOtp(otp.slice(0, 4) + otp.slice(5));
                              ref3.current.focus();
                            }
                          }
                        }}
                      />
                    </Box>
                    <Box>
                      <InputBase
                        type="number"
                        onInput={(e) => {
                          e.target.value = Math.max(0, parseInt(e.target.value))
                            .toString()
                            .slice(0, 1);
                        }}
                        // {...register("phonenum", {
                        //   required: {
                        //     value: true,
                        //     message: "Please fill this field",
                        //   },
                        //   pattern: {
                        //     value: /^[1-9]\d*(\d+)?$/i,
                        //     message: "Please enter an integer",
                        //   },
                        //   min: {
                        //     value: 1,
                        //     message: "Value should be atleast 1",
                        //   },
                        // })}
                        className={classes.otpInput}
                        ref={ref5}
                        maxLength="1"
                        value={otp.slice(5)}
                        style={{
                          fontSize: 24,
                          width: 38,
                          height: 40,
                          display: "flex",
                          alignItems: "center",
                          justifySelf: "center",
                          textAlign: "center",
                        }}
                        onChange={(event) => {
                          if (
                            event.target.value !== "" &&
                            event.target.value.length === 1 &&
                            isNumeric(event.target.value)
                          ) {
                            setOtp(otp + event.target.value);
                            ref5.current.blur();
                          } else {
                            if (event.target.value.length > 1) {
                              setOtp(
                                otp.slice(0, 5) + event.target.value.slice(1, 2)
                              );
                              ref5.current.blur();
                            } else {
                              setOtp(otp.slice(0, 5));
                              ref4.current.focus();
                            }
                          }
                        }}
                      />
                    </Box>
                  </Box> */}
                  </>
                  <Box
                    style={{
                      textAlign: "center",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Button
                      className={classes.button}
                      fullWidth
                      size="large"
                      variant="contained"
                      color="primary"
                      onClick={otpVerify}
                      // href="/dashboard"
                    >
                      Verify{verify && <ButtonCircularProgress />}
                    </Button>
                  </Box>
                  <Box>
                    <Typography
                      style={{
                        textAlign: "center",
                        textDecoration: "underline",
                        cursor: "pointer",
                        display: "flex",
                        justifyContent: "center",
                      }}
                      onClick={() => resendOtp()}
                      disabled={resend}
                    >
                      Resend OTP{resend && <ButtonCircularProgress />}
                    </Typography>
                  </Box>
                </div>
              </Box>
            </Box>
          </Box>
          <>
            {/* <Snackbar
            open={errpopup}
            autoHideDuration={6000}
            onClose={errhandleClose}
          >
            <Alert onClose={errhandleClose} severity="info">
              {errmsg}
            </Alert>
          </Snackbar> */}

            {/* <Snackbar
            open={errpopup1}
            autoHideDuration={6000}
            onClose={errhandleClose}
          >
            <Alert onClose={errhandleClose} severity="info">
              {errmsg1}
            </Alert>
          </Snackbar> */}
          </>
        </Box>
      </Container>
    </Box>
  );
}

export default ConfirmEmail;
