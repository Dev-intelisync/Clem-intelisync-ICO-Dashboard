import React, { useState, useEffect, useContext } from "react";
import "@scss/main.css";
import {
  Box,
  Typography,
  TextField,
  Grid,
  makeStyles,
  Button,
  Link,
  FormHelperText,
} from "@material-ui/core";
import Logo from "../../../component/Logo";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import { useHistory, Link as RouterComponent } from "react-router-dom";
import { Form, Formik } from "formik";
import * as yep from "yup";

import { toast } from "react-toastify";
import axios from "axios";
import ApiConfig from "../../../config/APIConfig";
import ButtonCircularProgress from "@component/ButtonCircularProgress";
import { AuthContext } from "../../../context/Auth";
import { calculateTimeLeft } from "../forget-password-link/timer";
import moment from "moment";

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
    height: "55px",
    background: theme.palette.background.taf,
  },
  Title: {
    fontFamily: "Inter",
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: "28px",
    lineHeight: "60px",
    /* identical to box height */

    color: "#000000",
  },
  TopText: {
    marginTop: "20px",
    marginBottom: "20px",
    textAlign: "center",
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
  buttonbox: {
    background: "#56CA00",
    borderRadius: "20px",
    width: "100%",
    height: "57px",
    fontFamily: "Montserrat",
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: "22px",
    fontFamily: "Inter",
    lineHeight: "22px",
    textAlign: "center",
    letterSpacing: "0.2px",
    color: "#FFFFFF",
    marginTop: "40px",

    [theme.breakpoints.only("sm")]: {
      maxWidth: "112px",
      fontSize: "20px",
    },
    [theme.breakpoints.only("xs")]: {
      maxWidth: "112px",
      fontSize: "18px",
    },
    "@media (max-width: 959px)": {
      maxWidth: "100%",
      // borderRadius: "10px",
    },
  },
  linkText: {
    textDecoration: "none",
    fontFamily: "Inter",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "16px",
    lineHeight: "24px",
    /* identical to box height */

    color: "#FBCC5C",
    cursor: "pointer",
    "& span": {
      color: "#000000",
    },
  },
  BottomGrid: {
    margin: "20px 6px",
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
  const history = useHistory();
  const auth = useContext(AuthContext);

  const [isSubmit, setIsSubmit] = useState(false);
  const classes = useStyles();

  const [isLoading, setLoader] = useState(false);

  const handleFormSubmit = async (values) => {
    try {
      setLoader(true);

      const res = await axios({
        method: "POST",
        url: ApiConfig.forgotPassword,
        data: {
          email: values.email,
        },
      });
      if (res.data.responseCode === 200) {
        toast.success(res.data.message);
        window.localStorage.setItem("email", values.email);
        setLoader(false);
        setIsSubmit(true);
        auth.setEndtime(moment().add(3, "m").unix());
        history.push({
          pathname: "/verify-otp",
          state: { email: values.userId },
        });
      } else {
        setLoader(false);
        toast.warn(res.data.message);
      }
    } catch (error) {
      setLoader(false);
      if (error.response) {
        toast.error("Entered email ID Does’t found in our database");

        // history.push("/reset-password");
        window.localStorage.setItem("email", values.email);
      } else {
        toast.error("Something went wrong please try again");
      }
    }
  };
  return (
    <Grid className="d-flex height100">
      <Box className="loginForm">
        <Box className="signupbox">
          <Grid container direction={"column"}>
            <Grid item style={{ display: "flex", justifyContent: "center" }}>
              {/* <Logo
                width="180"
                style={{ padding: "15px 0", cursor: "pointer" }}
              /> */}
            </Grid>
            <Grid item>
              <Box className={classes.logosec}>
              <img
                          style={{ cursor: "pointer", width: "300px" }}
                          onClick={() => history.push("/")}
                          src="images/ClimentineWhite.svg"
                        />
                {/* <Logo width="180" style={{ cursor: "pointer" }} /> */}
              </Box>
            </Grid>
            <Grid item className={classes.TopText}>
              <Typography variant="h3" className={classes.Title}>
                Forgot password
              </Typography>
              <Typography className={classes.subTitle}>
                Please enter your registred email here and we will send an OTP
                to reset your password.
              </Typography>
            </Grid>
            <Formik
              onSubmit={(values) => handleFormSubmit(values)}
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
                  .email("Please enter a valid email address.")
                  .required("Please enter an email address.")
                  .matches("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$"),
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
                    <Box mb={2}>
                      <label className={classes.label}>
                        Email Address&nbsp;
                        <span style={{ color: "red" }}>*</span>
                      </label>
                      <TextField
                        placeholder="mail@website.com"
                        type="text"
                        variant="outlined"
                        size="small"
                        fullWidth
                        name="email"
                        className="textFeilds"
                        inputProps={{ maxLength: 256 }}
                        error={Boolean(touched.email && errors.email)}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        InputProps={{
                          className: classes.TextBox,
                        }}
                      />
                      <FormHelperText
                        error
                        style={{ fontSize: "12px", fontFamily: "Inter" }}
                      >
                        {touched.email && errors.email}
                      </FormHelperText>
                    </Box>
                  </Grid>
                  <Button
                    variant="contained"
                    color="secondary"
                    // fullWidth
                    className={classes.buttonbox}
                    type="submit"
                    disabled={isLoading}
                  >
                    Send
                    {isLoading && <ButtonCircularProgress />}
                  </Button>
                </Form>
              )}
            </Formik>
            <Grid item>
              <Typography
                color="primary.main"
                variant="body2"
                className={classes.BottomGrid}
              >
                <Link
                  component={RouterComponent}
                  to="/login"
                  className={classes.linkText}
                >
                  <span>Back to</span> Log in
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Grid>
  );
}

export default Login;
