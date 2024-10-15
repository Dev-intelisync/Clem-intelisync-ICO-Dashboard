import React, { useState, useContext, useEffect } from "react";
import "@scss/main.css";
import {
  Box,
  Typography,
  TextField,
  Grid,
  Button,
  makeStyles,
  Link,
  FormHelperText,
  FormControl,
  InputAdornment,
  IconButton,
  Dialog,
  DialogContent,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import { BiLock, BiLockOpen } from "react-icons/bi";
import { AiOutlineMail } from "react-icons/ai";
import { useHistory, Link as RouterComponent } from "react-router-dom";
import { Form, Formik } from "formik";
import * as yep from "yup";
import Axios from "axios";
import Logo from "@component/Logo";
import ApiConfig from "../../../config/APIConfig";
import { toast, ToastContainer } from "react-toastify";
import ButtonCircularProgress from "@component/ButtonCircularProgress";
import { AuthContext } from "./../../../context/Auth";
// console.log("nhbwgdcefvsgchbjnkml;z,ksxjdnhbcg");
const useStyles = makeStyles((theme) => ({
  buttonbox: {
    fontFamily: "Inter",
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: "22px",

    /* identical to box height, or 100% */

    textAlign: "center",
    letterSpacing: "0.2px",

    color: "#FFFFFF",
    background: "#56CA00",
    borderRadius: "16px",
    width: "50%",
    [theme.breakpoints.only("sm")]: {
      maxWidth: "112px",
      fontSize: "20px",
    },
    [theme.breakpoints.only("xs")]: {
      maxWidth: "112px",
      fontSize: "16px",
    },
  },
  getButtonBox: {
    fontFamily: "Inter",
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: "15px",

    /* identical to box height, or 100% */

    textAlign: "center",
    letterSpacing: "0.2px",

    color: "#FFFFFF",
    background: "#56CA00",
    borderRadius: "16px",
    width: "100%",
    maxWidth: "129px",
    [theme.breakpoints.only("sm")]: {
      maxWidth: "112px",
      fontSize: "15px",
    },
    [theme.breakpoints.only("xs")]: {
      maxWidth: "112px",
      fontSize: "15px",
    },
  },
  logosec: {
    textAlign: "center",
    paddingTop: "26px",
    "@media(min-width:1280px)": {
      // display: "none",
    },
  },
  TextBox: {
    borderRadius: "10px",
    background: theme.palette.background.taf,
    height: "55px",
  },
  wrongPassword: {
    borderRadius: "10px",
    border: "1px solid red",
    background: theme.palette.background.taf,
    height: "55px",
  },
  TextBox1: {
    paddingRight: "0px !important",
  },

  BuutonBox: {
    borderRadius: "10px !important",
  },
  newbox: {
    "&:hover": { textDecoration: "underline" },
  },

  Title: {
    fontFamily: "Inter",
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: "28px",
    lineHeight: "60px",
    color: "#000000",
  },
  mainSubHeading: {
    fontFamily: "Inter",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "14px",
    lineHeight: "24px",
    /* identical to box height */

    color: "#000000",
  },
  TopText: {
    marginTop: "20px",
    marginBottom: "20px",
    textAlign: "center",
  },
  redText: {
    color: "#FF0000",
    marginLeft: "-4px",
  },
  linkText: {
    fontFamily: "Inter",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "16px",
    lineHeight: "24px",
    /* identical to box height */

    color: "#1E1E1E",
  },
  SubmitBtnBox: {
    textAlign: "center",
  },
  getButton: {
    textAlign: "start",
  },
  bottomText: {
    textAlign: "center",
    padding: "14px",
  },
  label: {
    fontFamily: "Inter",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: "16px",
    lineHeight: "24px",
    /* identical to box height */
    marginTop: "15px !important",
    marginBottom: "-5px !important",
    color: "#1E1E1E",
  },
  rememberMe: {
    "& .MuiTypography-body1": {
      fontFamily: "Inter !important",
      fontStyle: "normal",
      fontWeight: "500",
      fontSize: "16px",
      lineHeight: "24px",
      /* identical to box height */

      color: "#1E1E1E",
    },
  },
}));

function Login(props) {
  const auth = useContext(AuthContext);



  const classes = useStyles();
  const [isloading, setLoader] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [openVerifyOtp, setOpenVerifyOtp] = useState(false);
  const [tokendata, settokendata] = useState("");
  const [email, setEmail] = useState("");
  const [isVeriyLoading, setIsVeriyLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const [otp1, setOtp1] = useState("");
  const [otp2, setOtp2] = useState("");
  const [Ip, setIP] = useState("");
  const [deviceBrower, setDeviceBowser] = useState("");
  const [security, setSecurity] = useState();
  const [security1, setSecurity1] = useState();
  const [security2, setSecurity2] = useState();
  const [verificationType, setVerificationType] = useState({});
  const [isRememberMe, setIsRememberMe] = useState(false);
  const [wrongPass, setWrongPass] = useState(false);
  const history = useHistory();
  const [status, setStatus] = useState(false);
  const getData = async () => {
    const res = await Axios.get("https://geolocation-db.com/json/");
    setIP(res.data);
  };
  useEffect(() => {
    getData();
  }, []);

  const formInitialSchema = isRememberMe
    ? {
        email: "",
        password: "",
        otp: "",
      }
    : {
        email: window.sessionStorage.getItem("email")
          ? window.sessionStorage.getItem("email")
          : "",
        password: window.localStorage.getItem("password")
          ? window.localStorage.getItem("password")
          : "",
      };

  const handleFormSubmit = async (values) => {
    sessionStorage.setItem("email", values.email);
    setLoader(true);
    try {
      // console.log(values, "valuesHaii");
      const res = await Axios.post(ApiConfig.userLogin, {
        email: values.email,
        password: values.password,
      });
      if (res.data.responseCode === 200) {
        settokendata(res?.data?.result?.token);
        window.localStorage.setItem("token", res?.data?.result?.token);
        setSecurity(res?.data?.result?.mobileNumberAuthentication);
        setSecurity1(res?.data?.result?.emailAuthentication);
        setSecurity2(res?.data?.result?.speakeasy);
        auth.getProfileHandler();
        history.push("/dashboard");
      } else if (res.data.status === 500) {
        setLoader(false);

        toast.error(
          "Cannot reach internet. Please check your device internet connections."
        );
      } else {
        toast.warn(res.data.message);
      }
    } catch (error) {
      console.log("ERROR", error);
      setLoader(false);
    }
  };

  const verificationEmail = async (type) => {
    try {
      const res = await Axios({
        method: "POST",
        url: ApiConfig.verifygooglecode,
        headers: {
          token: window.localStorage.getItem("token"),
        },
        data: {
          authenticationType: type,
          otp: otp ? otp : otp1 ? otp1 : otp2,
        },
      });
      if (res.data.responseCode === 200) {
        toast.success(res.data.responseMessage);
        setOtp("");
        setOtp1("");
        setOtp2("");
        setVerificationType(res?.data?.result);
        history.push("/dashboard");
      } else if (res.data.responseCode === 405) {
        toast.warn(res.data.responseMessage);
      } else {
        toast.warn(res.data.responseMessage);
      }
    } catch (error) {
      if (error) {
        toast.warn(error.response.data.responseMessage);
      } else {
        console.log(error);
      }
      console.log(error);
      setOtp("");
      setOtp1("");
      setOtp2("");
    }
  };

  useEffect(() => {
    if (
      window.localStorage.getItem("password") ||
      window.sessionStorage.getItem("email")
    ) {
      setIsRememberMe(true);
    } else {
      setIsRememberMe(false);
    }
  }, [
    window.sessionStorage.getItem("email"),
    window.localStorage.getItem("password"),
  ]);

  function rememberMe() {
    if (!isRememberMe) {
      setIsRememberMe(true);
      const email = document.getElementById("email");
      const password = document.getElementById("password");
      window.sessionStorage.setItem("email", email?.value);
      window.localStorage.setItem("password", password?.value);
    } else {
      setIsRememberMe(false);
      window.sessionStorage.removeItem("email");
      window.localStorage.removeItem("password");
    }
  }
  return (
    <>
      <ToastContainer />
      <Grid className="d-flex height100">
        <Box className="loginForm">
          <Box className={`${classes.SignUp} signupbox`}>
            <Grid container direction={"column"}>
              <Grid item>
                <Box className={classes.logosec}>
                  <img
                    alt=""
                    style={{ cursor: "pointer", width: "300px" }}
                    onClick={() => history.push("/")}
                    src="images/ClimentineWhite.svg"
                  />

                  {/* <Logo width="180" style={{ cursor: "pointer" }} /> */}
                </Box>
              </Grid>
              <Grid item className={classes.TopText}>
                <Typography variant="h3" className={classes.Title}>
                  Login
                </Typography>
                <Typography
                  variant="body2"
                  className={classes.mainSubHeading}
                ></Typography>
              </Grid>
              <Formik
                onSubmit={(values) => handleFormSubmit(values)}
                initialValues={formInitialSchema}
                initialStatus={{
                  success: false,
                  successMsg: "",
                }}
                validationSchema={yep.object().shape({
                  email: yep
                    .string()
                    .email(
                      "You have entered an invalid email address. Please try again"
                    )
                    .required("Please enter your email address")
                    .matches("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$"),

                  password: yep
                    .string()
                    .max(16)
                    .min(8, "Password must be at least 8 characters")
                    .required("Please enter your password"),
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
                  <Form>
                    <Grid
                      item
                      style={{ marginBottom: "10px", marginTop: ".5rem" }}
                    >
                      <label className={classes.label}>
                        Email Address <span className={classes.redText}>*</span>
                      </label>
                      <TextField
                        placeholder="mail@website.com"
                        type="text"
                        variant="outlined"
                        fullWidth
                        id="email"
                        size="small"
                        inputProps={{ maxLength: 256 }}
                        // value="prince@mailinator.com"
                        value={values.email}
                        name="email"
                        className="textFeilds"
                        error={Boolean(touched.email && errors.email)}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        InputProps={{
                          className: classes.TextBox,

                          // endAdornment: (
                          //   <InputAdornment position="end">
                          //     <IconButton edge="end">
                          //       <AiOutlineMail
                          //         style={{
                          //           fontSize: "20px",
                          //           display: "flex",
                          //           justifyContent: "center",
                          //           color: "#1069C2",
                          //           alignItems: "center",
                          //         }}
                          //       />
                          //     </IconButton>
                          //   </InputAdornment>
                          // ),
                        }}
                      />
                      <FormHelperText
                        error
                        style={{ fontSize: "12px", fontFamily: "Inter" }}
                      >
                        {touched.email && errors.email}
                      </FormHelperText>
                    </Grid>
                    <Grid
                      item
                      style={{ marginBottom: "10px", marginTop: "-17px" }}
                    >
                      <FormControl fullWidth>
                        <Box
                          style={{ width: "100%" }}
                          className={classes.loginForm1}
                        >
                          <label className={classes.label}>
                            Password <span className={classes.redText}>*</span>
                          </label>
                          <TextField
                            className={`${classes.inputvalue} textFeilds`}
                            placeholder="Example@123"
                            size="small"
                            variant="outlined"
                            fullWidth
                            id="password"
                            type={showPassword ? "text" : "password"}
                            value={values.password}
                            // value="Mobiloitte@1"
                            inputProps={{ minLength: 8, maxLength: 16 }}
                            name="password"
                            error={Boolean(touched.password && errors.password)}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            InputProps={{
                              className:
                                wrongPass === true
                                  ? classes.wrongPassword
                                  : classes.TextBox,
                              endAdornment: (
                                <InputAdornment position="end">
                                  <IconButton
                                    onClick={() =>
                                      setShowPassword(!showPassword)
                                    }
                                    edge="end"
                                  >
                                    <Box className={classes.passsec}>
                                      {showPassword ? (
                                        <img
                                          src="/images/Eye.png"
                                          alt=""
                                          style={{
                                            fontSize: "20px",
                                            display: "flex",
                                            justifyContent: "center",
                                            // color: "#1069C2",
                                            alignItems: "center",
                                          }}
                                        />
                                      ) : (
                                        <img
                                          src="/images/Hide.png"
                                          alt=""
                                          style={{
                                            fontSize: "20px",
                                            display: "flex",
                                            justifyContent: "center",
                                            // color: "#1069C2",
                                            alignItems: "center",
                                          }}
                                        />
                                      )}
                                    </Box>
                                  </IconButton>
                                </InputAdornment>
                              ),
                            }}
                          />
                          <FormHelperText
                            error
                            style={{ fontSize: "12px", fontFamily: "Inter" }}
                          >
                            {touched.password && errors.password}
                          </FormHelperText>
                        </Box>
                      </FormControl>
                      {/* <Box className={classes.getButton} mt={2}>
                        {otpLoading == false ? (
                          <Button
                            className={classes.getButtonBox}
                            // disabled={isloading}
                            onClick={() => sendOtp(values.email)}
                          >
                            Get OTP
                          </Button>
                        ) : (
                          <Button
                            className={classes.getButtonBox}
                            // disabled={isloading}
                            onClick={() => sendOtp(values.email)}
                          >
                            <ButtonCircularProgress />
                          </Button>
                        )}
                      </Box> */}
                      {/* <FormControl fullWidth>
                        <Box >
                          <label className={classes.label}>
                            Please enter OTP
                          </label>
                          {status == true ? (
                            <TextField
                              placeholder="Enter Your OTP"
                              size="small"
                              variant="outlined"
                              fullWidth
                              type="number"
                              name="otp"
                              inputProps={{ maxLength: 4 }}
                              onInput={(e) => {
                                e.target.value = Math.max(
                                  0,
                                  parseInt(e.target.value)
                                )
                                  .toString()
                                  .slice(0, 4);
                              }}
                              error={Boolean(touched.otp && errors.otp)}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              InputProps={{
                                className: classes.TextBox,
                              }}
                              onKeyPress={(event) => {
                                if (event?.key === "-" || event?.key === "+") {
                                  event.preventDefault();
                                }
                              }}
                            />
                          ) : (
                            <TextField
                              placeholder="Enter Your OTP"
                              size="small"
                              variant="outlined"
                              disabled
                              fullWidth
                              type="number"
                              name="otp"
                              inputProps={{ maxLength: 4 }}
                              onInput={(e) => {
                                e.target.value = Math.max(
                                  0,
                                  parseInt(e.target.value)
                                )
                                  .toString()
                                  .slice(0, 4);
                              }}
                              error={Boolean(touched.otp && errors.otp)}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              InputProps={{
                                className: classes.TextBox,
                              }}
                              onKeyPress={(event) => {
                                if (event?.key === "-" || event?.key === "+") {
                                  event.preventDefault();
                                }
                              }}
                            />
                          )}

                          <FormHelperText
                            error
                            style={{ fontSize: "12px", fontFamily: "Inter" }}
                          >
                            {touched.otp && errors.otp}
                          </FormHelperText>
                        </Box>
                      </FormControl> */}
                      <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        style={{ marginTop: "5px" }}
                      >
                        <Box pl={1} mt={-1}>
                          <FormControlLabel
                            className={classes.rememberMe}
                            control={
                              <Checkbox
                                name="checkedC"
                                checked={isRememberMe}
                                onClick={rememberMe}
                              />
                            }
                            label="Remember me"
                          />
                        </Box>
                        <Typography variant="body2">
                          <Link
                            component={RouterComponent}
                            to="/forget-password"
                            style={{ color: "#FBCC5C" }}
                            className={classes.linkText}
                          >
                            Forgot Password?
                          </Link>
                        </Typography>
                      </Box>
                    </Grid>

                    <Grid>
                      <Box className={classes.SubmitBtnBox} mt={2}>
                        <Button
                          type="submit"
                          className={classes.buttonbox}
                          onClick={() => handleFormSubmit()}
                        >
                          Login
                        </Button>
                      </Box>
                    </Grid>
                  </Form>
                )}
              </Formik>

              {openVerifyOtp && (
                <Dialog open={openVerifyOtp} fullWidth maxWidth="xs">
                  <DialogContent>
                    <Typography>Please enter your OTP</Typography>

                    <Box mt={1} mb={2}>
                      {security && (
                        <>
                          <TextField
                            placeholder="Enter your sms otp "
                            onChange={(e) => setOtp(e.target.value)}
                            disabled={isVeriyLoading}
                            variant="outlined"
                            InputProps={{
                              className: classes.TextBox1,
                              // endAdornment: (
                              //   <InputAdornment position="end">
                              //     <Button
                              //       disabled={
                              //         verificationType?.authenticationType ===
                              //         "MOBILE"
                              //       }
                              //       className={classes.BuutonBox}
                              //       variant="contained"
                              //       color="primary"
                              //       onClick={() => verificationEmail("MOBILE")}
                              //     >
                              //       {verificationType?.authenticationType ===
                              //       "MOBILE" ? (
                              //         <span style={{ color: "#70e570" }}>
                              //           Otp Verified
                              //         </span>
                              //       ) : (
                              //         "Verify otp"
                              //       )}
                              //     </Button>
                              //   </InputAdornment>
                              // ),
                            }}
                          />
                        </>
                      )}

                      {security1 && (
                        <>
                          <TextField
                            placeholder="Enter your email otp"
                            onChange={(e) => setOtp1(e.target.value)}
                            disabled={
                              isVeriyLoading ||
                              otp !== "" ||
                              otp2 !== "" ||
                              verificationType?.authenticationType === "EMAIL"
                            }
                            variant="outlined"
                            InputProps={{
                              className: classes.TextBox1,
                            }}
                          />
                        </>
                      )}
                      {security2 && (
                        <>
                          <TextField
                            placeholder="Enter your google otp"
                            onChange={(e) => setOtp2(e.target.value)}
                            disabled={isVeriyLoading}
                            variant="outlined"
                            InputProps={{
                              className: classes.TextBox1,
                            }}
                          />
                        </>
                      )}
                    </Box>
                    <Box align="center">
                      <Button
                        variant="contained"
                        color="primary"
                        disabled={
                          verificationType?.authenticationType === "GOOGEL" ||
                          verificationType?.authenticationType === "EMAIL" ||
                          verificationType?.authenticationType === "MOBILE"
                        }
                        onClick={() => {
                          if (security1 === true) {
                            verificationEmail("EMAIL");
                          }
                          if (security2 === true) {
                            verificationEmail("GOOGEL");
                          }
                          if (security === true) {
                            verificationEmail("MOBILE");
                          }
                        }}
                        // onClick={() => verifySmsToLogin()}
                        // onClick={() => history.push("/dashboard")}
                      >
                        Submit {isVeriyLoading && <ButtonCircularProgress />}{" "}
                      </Button>
                    </Box>
                  </DialogContent>
                </Dialog>
              )}

              <Grid item className={classes.bottomText}>
                <Typography color="primary.main" className={classes.linkText}>
                  Haven’t registered yet?
                  <Link
                    component={RouterComponent}
                    to="/signup"
                    style={{ marginLeft: "4px", color: "#FBCC5C" }}
                  >
                    Create an Account{" "}
                  </Link>
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </>
  );
}

export default Login;
