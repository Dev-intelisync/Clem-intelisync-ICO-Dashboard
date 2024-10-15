import React, { useState, useContext } from "react";
import "@scss/main.css";
import {
  Box,
  Typography,
  TextField,
  Grid,
  Button,
  FormHelperText,
  makeStyles,
} from "@material-ui/core";
import Logo from "@component/Logo";
import { useHistory, Link } from "react-router-dom";
import { Form, Formik } from "formik";
import * as yep from "yup";
import moment from "moment";
import { AuthContext } from "@context/Auth";
import { toast } from "react-toastify";
import axios from "axios";
import ApiConfig from "../../../config/APIConfig";
import ButtonCircularProgress from "@component/ButtonCircularProgress";
const useStyles = makeStyles((theme) => ({
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
    fontFamily: "Inter",
  },
  TopText: {
    marginTop: "20px",
    marginBottom: "20px",
    textAlign: "center",
  },
  Title: {
    fontFamily: "Inter",
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: "40px",
    lineHeight: "60px",
    /* identical to box height */

    color: "#000000",
  },
  subTitle: {
    fontFamily: "Inter",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "14px",
    lineHeight: "24px",
    /* identical to box height */

    color: "#000000",
  },
  verify: {
    width: "100%",
    height: 57,
    fontFamily: "Montserrat",
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: "22px",
    fontFamily: "Inter",
    lineHeight: "22px",
    textAlign: "center",
    letterSpacing: "0.2px",
    color: "#FFFFFF",

    background: "#56CA00",
    borderRadius: "20px",
  },
  TopText: {
    marginTop: "20px",
    marginBottom: "20px",
    textAlign: "center",
  },
  label: {
    fontFamily: "Inter",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "16px",
    lineHeight: "24px",
    /* identical to box height */

    color: "#1E1E1E",
  },
}));
function Login(props) {
  const classes = useStyles();

  const history = useHistory();
  const [isSubmit, setIsSubmit] = useState(false);
  const auth = useContext(AuthContext);
  const [isLoading, setLoader] = useState(false);
  const [isloading, setloader] = useState(false);
  const resetotphandle = async (values) => {
    try {
      setloader(true);

      const res = await axios({
        method: "PUT",
        url: ApiConfig.resendOTP,
        data: {
          email: window.localStorage.getItem("email"),
        },
      });
      if (res.data.responseCode === 200) {
        toast.success(res.data.message);
        setloader(false);
        setIsSubmit(true);
        auth.setEndtime(moment().add(3, "m").unix());
      } else {
        setloader(false);
        toast.warn(res.data.message);
      }
    } catch (error) {
      setloader(false);
      if (error.response) {
        toast.error("Please enter the correct Email");
      } else {
        toast.error(error.message);
      }
    }
  };

  const handleFormSubmit = async (values) => {
    try {
      setLoader(true);


      
      console.log(values.otp)
      console.log(window.localStorage.getItem("email"));

      const res = await axios({
        method: "PATCH",
        url: ApiConfig.verifyOTP,

        data: {
          email: window.localStorage.getItem("email"),
          otp: values.otp,
          // authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      });

      
      if (res.data.responseCode === 200) {
        toast.success("OTP Verified Successfully");
        setLoader(false);
        setIsSubmit(true);

        history.push({
          pathname: "/",
          state: { email: values.email, otp: values.otp },
        });
      } else if (res.data.responseCode === 205) {
        setLoader(false);
        toast.warn(res.data.message);
      } else {
        setLoader(false);
        toast.warn(res.data.message);
      }
    } catch (error) {
      console.log(error.response.data.responseMessage, "error");
      setLoader(false);
      if (error.response) {
        toast.error(error.response.data.responseMessage);
      } else {
        toast.error(error.responseMessage);
      }
    }
  };
  const email = window.localStorage.getItem("email");
  return (
    <Grid className="d-flex height100">
      <Box className="loginForm">
        <Box className="signupbox">
          <Grid container direction={"column"}>
            <Grid item>
              <Box className={classes.logosec}>
                <img
                  style={{ cursor: "pointer", width: "103px" }}
                  onClick={() => history.push("/")}
                  src="images/CLEMENTINESITEBARLOGO.svg"
                />
                {/* <Logo width="180" style={{ cursor: "pointer" }} /> */}
              </Box>
            </Grid>
            <Grid item className={classes.TopText}>
              <Typography variant="h3" className={classes.Title}>
                OTP verification
              </Typography>
              <Typography className={classes.subTitle}>
                {` We have sent a 4-digit confirmation code to ${email}`}
                <br />
                Make sure you enter correct code.
              </Typography>
            </Grid>
            <Grid item></Grid>
            <Formik
              onSubmit={(values) => handleFormSubmit(values)}
              initialValues={{
                otp: "",
              }}
              initialStatus={{
                success: false,
                successMsg: "",
              }}
              validationSchema={yep.object().shape({
                otp: yep
                  .string()
                  .required("OTP is required")
                  .matches(/^[0-9]*$/, "Must be a valid OTP")
                  .max(4, "Should not exceeds 4 digits")
                  .min(4, "Must be only 4 digits"),
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
                  <Grid item className="fullwidth">
                    <Box mt={2}>
                      <label className={classes.label}>Please enter OTP</label>
                      <TextField
                        placeholder="Enter Your OTP"
                        size="small"
                        variant="outlined"
                        fullWidth
                        type="number"
                        name="otp"
                        inputProps={{ maxLength: 4 }}
                        onInput={(e) => {
                          e.target.value = Math.max(0, parseInt(e.target.value))
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
                      <FormHelperText
                        error
                        style={{ fontSize: "12px", fontFamily: "Inter" }}
                      >
                        {touched.otp && errors.otp}
                      </FormHelperText>
                    </Box>
                  </Grid>
                  <Box style={{ display: "flex", justifyContent: "end" }}>
                    {auth.timeLeft && auth.timeLeft.seconds > 0 ? (
                      <>
                        <Box>
                          <Typography
                            variant="body1"
                            style={{
                              color: "red",
                              fontSize: "12px",
                              fontWeight: "800",
                              fontFamily: "Inter",
                            }}
                          >
                            OTP will expire in {auth.timeLeft?.minutes} m :{" "}
                            {auth.timeLeft?.seconds} s
                          </Typography>{" "}
                        </Box>
                      </>
                    ) : (
                      <>
                        <Button
                          style={{
                            color: "red",
                            fontFamily: "Inter",
                            fontWeight: "800",
                          }}
                          // fullWidth
                          onClick={() => {
                            resetotphandle();
                          }}
                          disabled={auth.timeLeft && auth.timeLeft.seconds > 0}
                        >
                          {" "}
                          Resend OTP{" "}
                        </Button>{" "}
                        &nbsp;
                      </>
                    )}{" "}
                  </Box>
                  <Box>
                    <Button
                      className={classes.verify}
                      // fullWidth
                      style={{ marginTop: "10px", padding: "10px" }}
                      type="submit"
                      disabled={isLoading}
                    >
                      Verify
                      {isLoading && <ButtonCircularProgress />}
                    </Button>
                    &nbsp;&nbsp;
                  </Box>
                </Form>
              )}
            </Formik>
          </Grid>
        </Box>
      </Box>
    </Grid>
  );
}

export default Login;
