import React, { useState, useEffect } from "react";
import "@scss/main.css";
import { VisibilityOff, Visibility } from "@material-ui/icons";
import Logo from "@component/Logo";

import {
  useHistory,
  Link as RouterComponent,
  useLocation,
} from "react-router-dom";

import * as yep from "yup";

import {
  Typography,
  Grid,
  Box,
  Button,
  Dialog,
  TextField,
  IconButton,
  DialogTitle,
  FormControl,
  makeStyles,
  DialogContent,
  InputAdornment,
  DialogContentText,
  DialogActions,
  FormHelperText,
} from "@material-ui/core";
import { Form, Formik } from "formik";
import ApiConfig from "../../../config/APIConfig";
import axios from "axios";
import { toast } from "react-toastify";
import ButtonCircularProgress from "@component/ButtonCircularProgress";

const useStyles = makeStyles((theme) => ({
  buttonbox: {
    background: "#56CA00",
    borderRadius: "16px",
    width: "100%",
    maxWidth: "210px",
    height: "57px",
    marginTop: "46px",
    marginBottom: "20px",
    fontFamily: "Inter",
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: "22px",
    lineHeight: "22px",
    letterSpacing: "0.2px",
    color: "#FFFFFF",

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

  TextBox: {
    fontFamily: "Inter",
    borderRadius: "10px",
    background: theme.palette.background.taf,
    height: "55px",
  },
  logosec: {
    textAlign: "center",
    paddingTop: "26px",
    "@media(min-width:1280px)": {
      // display: "none",
    },
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
  TopText: {
    fontFamily: "Inter",
    marginTop: "20px",
    marginBottom: "20px",
    textAlign: "center",
  },
  submitDiv: {
    textAlign: "center",
  },
  label: {
    marginTop: "40px",
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
  const location = useLocation();

  const otp = location.state?.otp;
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);

  const [open, setOpen] = React.useState(false);
  const [resetToken, setResetToken] = useState("");
  const [isLoading, setLoader] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const resetPaswordHandler = async (values) => {
    try {
      setLoader(true);

      const res = await axios({
        method: "POST",
        url: ApiConfig.resetPassword,
        headers: {
          token: localStorage.getItem("token"),
        },

        data: {
          // email: window.localStorage.getItem("email"),
          password: values.password,
          // token: otp,
          confirmPassword: values.confirmPassword,
        },
      });

      if (res.data.responseCode === 200) {
        toast.success(res.data.responseMessage);
        setLoader(false);
        setOpen(true);
        history.push("/login");
      } else if (res.responseCode === 500) {
        toast.error("Invalid user");
      }
    } catch (err) {
      // toast.error(err.message)
      toast.error("Invalid user");
      console.log(err);
      setLoader(false);
    }
  };

  return (
    <Grid className="d-flex height100">
      <Box className="loginForm">
        <Box className="signupbox">
          <Grid container direction={"column"}>
            <Grid item style={{ display: "flex", justifyContent: "center" }}>
              {/* <Logo
                width="110"
                style={{ padding: "15px 0", cursor: "pointer" }}
              />*/}
            </Grid>
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
                Reset Password
              </Typography>
              <Typography className={classes.subTitle}>
                Enter your new password and confirm password
              </Typography>
            </Grid>
            <Formik
              onSubmit={(values) => resetPaswordHandler(values)}
              initialValues={{
                password: "",
                confirmPassword: "",
              }}
              initialStatus={{
                success: false,
                successMsg: "",
              }}
              validationSchema={yep.object().shape({
                password: yep
                  .string()
                  .required("Please enter password")
                  .min(8, "Minimun 8 charactors are allowed.")
                  .max(16, "Maximum 16 charactors are allowed.")
                  // .matches(
                  //   /^(?=.*[A-Z][a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/,
                  //   "Password should be between 8 to 16 Characters one uppercase, one lowercase, one number and one special case character"
                  // )
                  .matches(
                    /^(?=.*[A-Z][a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/,
                    "Please enter valid password"
                  ),
                confirmPassword: yep
                  .string()
                  .required("Please enter password")
                  .min(8, "Minimun 8 charactors are allowed.")
                  .max(16, "Maximum 16 charactors are allowed.")
                  .oneOf(
                    [yep.ref("password"), null],
                    "New password and confirm password should be same"
                  ),
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
                    <Box>
                      <label className={classes.label}>
                        New Password&nbsp;
                        <span style={{ color: "red" }}>*</span>
                      </label>
                      <TextField
                        placeholder="Min. 8 Character"
                        size="small"
                        variant="outlined"
                        fullWidth
                        className="textFeilds"
                        disabled={isLoading}
                        inputProps={{ minLength: 8, maxLength: 16 }}
                        type={showPassword ? "text" : "password"}
                        value={values.password}
                        name="password"
                        // placeholder="Enter your password"
                        error={Boolean(touched.password && errors.password)}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        InputProps={{
                          className: classes.TextBox,
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={() => setShowPassword(!showPassword)}
                                edge="end"
                              >
                                <Box className={classes.passsec}>
                                  {showPassword ? (
                                    <img
                                      src="/images/Eye.png"
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
                        style={{ fontSize: "12px", marginTop: ".3px" }}
                      >
                        {
                          touched.password && errors.password
                          // && (
                          //   <FormHelperText
                          //     error
                          //     style={{ margin: "0px", fontSize: "12px" }}
                          //   >
                          //     <ul
                          //       style={{
                          //         padding: "0px 0px 0px 19px",
                          //         marginTop: "0px",
                          //       }}
                          //     >
                          //       <li>
                          //         Must contain 8 characters, one uppercase, one
                          //         lowercase, one number and one special case
                          //         character
                          //       </li>
                          //     </ul>
                          //   </FormHelperText>
                          // )
                        }
                      </FormHelperText>
                    </Box>
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
                          Confirm Password&nbsp;
                          <span style={{ color: "red" }}>*</span>
                        </label>
                        <TextField
                          placeholder="Min. 8 Character"
                          size="small"
                          variant="outlined"
                          fullWidth
                          disabled={isLoading}
                          inputProps={{ minLength: 8, maxLength: 16 }}
                          type={showPassword1 ? "text" : "password"}
                          value={values.confirmPassword}
                          name="confirmPassword"
                          // placeholder="Confirm your password"
                          error={Boolean(
                            touched.confirmPassword && errors.confirmPassword
                          )}
                          onBlur={handleBlur}
                          className="textFeilds"
                          onChange={handleChange}
                          InputProps={{
                            className: classes.TextBox,
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  onClick={() =>
                                    setShowPassword1(!showPassword1)
                                  }
                                  edge="end"
                                >
                                  <Box className={classes.passsec}>
                                    {showPassword1 ? (
                                      <img
                                        src="/images/Eye.png"
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
                        <FormHelperText error>
                          {touched.confirmPassword && errors.confirmPassword}
                        </FormHelperText>
                      </Box>
                    </FormControl>
                  </Grid>

                  <Box className={classes.submitDiv}>
                    <Button className={classes.buttonbox} type="submit">
                      Submit {isLoading && <ButtonCircularProgress />}
                    </Button>
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
