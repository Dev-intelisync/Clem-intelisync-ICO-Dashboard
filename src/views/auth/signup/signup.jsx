import React, { useEffect, useState, useContext } from "react";
import "@scss/main.css";

import {
  Box,
  Typography,
  TextField,
  Grid,
  Button,
  Link,
  FormControl,
  Select,
  FormHelperText,
  InputAdornment,
  IconButton,
  makeStyles,
  MenuItem,
} from "@material-ui/core";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Logo from "@component/Logo";
import { Form, Formik, Field } from "formik";
import * as yep from "yup";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { KeyboardDatePicker } from "@material-ui/pickers";
import moment from "moment";
import axios from "axios";
import ApiConfig from "../../../config/APIConfig";
import ReCAPTCHA from "react-google-recaptcha";
import { AuthContext } from "@context/Auth";

// import DateFnsUtils from "@date-io/date-fns";
// import { MuiPickersUtilsProvider } from "@material-ui/pickers";

import { values } from "lodash";
import {
  useHistory,
  Link as RouterComponent,
  useLocation,
} from "react-router-dom";
import ButtonCircularProgress from "@component/ButtonCircularProgress";
import { toast } from "react-toastify";

const useStyles = makeStyles((theme) => ({
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

    [theme.breakpoints.only("xs")]: {
      fontSize: "20px",
    },
  },
  date: {
    "& p": {
      marginLeft: "0px !important",
      fontSize: "12px !important",
      fontFamily: "Inter",
    },
  },
  mainHeading: {
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
    marginBottom: "23px",
    color: "#000000",
  },
  TextBox: {
    borderRadius: "10px",
    height: "55px",
    background: theme.palette.background.taf,
    "& .MuiInputBase-input ": {
      color: "#000000 !important",
    },
  },
  logosec: {
    textAlign: "center",
    paddingTop: "26px",
    "@media(min-width:1280px)": {
      // display: "none",
    },
  },
  formboxes: {
    marginTop: "0px",
  },
  newbox: {
    fontFamily: "Inter",
    fontStyle: "normal",
    fontWeight: 600,
    fontSize: "16px",
    lineHeight: "24px",
    /* identical to box height */

    textDecoration: "none !important",
    color: "#FBCC5C",
  },
  select: {
    "& .MuiInputBase-root": {
      background: theme.palette.background.taf,
      height: "55px",
    },
    "& .MuiInputBase-input ": {
      color: "#000000 !important",
    },
  },
  checkBoxDiv: {
    display: "flex",
    paddingTop: "9px",
  },
  label: {
    fontFamily: "Inter",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "16px",
    lineHeight: "24px",
    /* identical to box height */
    marginTop: "0px !important",
    // marginTop: "15px !important",
    marginBottom: "-5px ",
    color: "#1E1E1E",
  },
}));
function Signup(props) {
  const classes = useStyles();

  const formValidationSchema = yep.object().shape({
    email: yep
      .string()
      .email("You have entered an invalid email address. Please try again")
      .required("Please enter your email address")
      .matches("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$"),
    phoneNo: yep
      .string()
      .required("Please enter your phone number")
      // .matches(
      //   /^(?:(?:\+|0{0,2})91(\s*|[\-])?|[0]?)?([6789]\d{2}([ -]?)\d{3}([ -]?)\d{4})$/,
      //   "Must be a valid mobile"
      // )
      .max(13, "Should not exceeds 13 digits")
      .min(9, "Must be only 9 digits"),
    password: yep
      .string()
      .required("Please enter yoour password")
      .max(16, "16 charactors are allowed.")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
      ),
    confirmPassword: yep
      .string()
      .required("Please enter password")
      .max(16, "16 charactors are allowed.")
      .oneOf(
        [yep.ref("password"), null],
        "Confirm password must match to password."
      ),
    firstName: yep
      .string()
      .required("Please enter your first name")
      .min(2, "Please enter at least 2 characters")
      .max(256, "You can enter only 35 characters")
      .matches(
        /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/,
        "Only alphabets and whitespaces are allowed for this field number are not. "
      ),

    lastName: yep
      .string()
      .required("Please enter your last name")
      // .trim('The last name cannot include leading and trailing spaces')
      .min(2, "Please enter at least 2 characters")
      .max(256, "You can enter only 35 characters")
      .matches(
        /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/,
        "Only alphabets and whitespaces are allowed for this field number are not. "
      ),

    country: yep.string().required("Please enter your country"),
    state: yep.string().required("Please enter your state"),
    city: yep
      .string()
      .required("Please enter your city")

      .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
    countryCode: yep
      .string()
      .required("Please enter zipcode")
      .max(6, "Max 6 charactors"),
    check: yep
      .bool()
      .oneOf([true], "Please accept terms and conditions and privacy policy."),
  });
  const [countryCode, setCountryCode] = useState("");

  const location = useLocation();



  const auth = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const [phone, setPhone] = useState();
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [showStates, setShowStates] = useState([]);
  const [checked, setChecked] = useState(false);
  const [codeReferal, setCodeReferal] = useState("");
  const [btnText, setBtnText] = useState("CREATE AN ACCOUNT");
  // console.log(countryCode, "countryCode");
  const formInitialSchema = {
    email: "",
    firstName: "",
    lastName: "",
    phoneNo: phone,
    password: "",
    confirmPassword: "",
    country: "",
    state: "",
    city: "",
    countryCode: "",
    // referalCode: "",
    check: false,
  };

  /// Getting the referral code
  useEffect(() => {
    const queryParam = location.search;

    const queryEach = queryParam.split('?');
    setCodeReferal(queryEach[1]);
    formInitialSchema.referalCode = queryEach[1];
    
 }, [location.search]);


  // console.log(formInitialSchema, "formInitialSchema");
  const handleFormSubmit = async (values) => {
    console.log(codeReferal, "code");
    window.localStorage.setItem("email", values.email);
    setIsLoading(true);
    setBtnText("Creating....");
    try {
      // });
      const res = await axios({
        method: "POST",
        url: ApiConfig.userSignUp,
        data: {
          email: values.email,
          password: values.password,
          firstName: values.firstName,
          lastName: values.lastName,
          mobileNumber: values?.phoneNo?.toString(),
          countryCode: "+91",
          country: values.country,
          city: values.city,
          state: values.state,
          zipCode: values.countryCode.toString(),
          // refereeCode: codeReferal ? codeReferal : values.referalCode,
        },
        // headers: {
        //   authorization: `Bearer ${window.sessionStorage.getItem("token")}`,
        // },
      });

      if (res.data.responseCode === 200) {
        setIsLoading(false);
        setBtnText("CREATE AN ACCOUNT");
        toast.success("OTP sent successfully, Please check your email.");
        auth.setEndtime(moment().add(3, "m").unix());
        history.push("/verify-email-otp");
      } else if (res.data.status === 205) {
        toast.warn(res.data.message);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      if (error) {
        toast.error(error.response.data.responseMessage);
      } else {
        toast.error(error.message);
      }

      setBtnText("CREATE AN ACCOUNT");
    }
  };

  useEffect(() => {
    axios.get("/static/json/countries.json").then(function (response) {
      setCountries(response.data.countries);
      axios.get("/static/json/states.json").then(function (response) {
        setStates(response.data.states);
      });
    });
  }, []);

  const changeStateList = (name) => {
    const selectted = states.filter((cont) => {
      return cont.name === name;
    });
    if (selectted.length !== 0) {
      const contId = selectted[0].id;
    }
  };

  const changeState = (e) => {
    const name = e.target.value;
    changeStateList(name);
  };

  const changeCountryList = (name) => {
    const selectted = countries?.filter((cont) => {
      return cont.name === name;
    });
    const contId = selectted[0]?.id;

    const allState = states?.filter((state) => {
      return state.country_id === contId;
    });
    setShowStates(allState);
  };

  const changeCountry = (e) => {
    const name = e.target.value;
    changeCountryList(name);
  };
  // for showing message if user not selecting the terms and cindition checkbox
  const showPopup = (e) => {
    toast.error("Please accept Terms & Condition and Privacy Policy");
  };
  return (
    <Grid className="d-flex height100">
      <Box className="loginForm">
        <Box className={`${classes.SignIn} signupbox`}>
          <Box className="signupbox">
            <Formik
              initialValues={formInitialSchema}
              initialStatus={{
                success: false,
                successMsg: "",
              }}
              validationSchema={formValidationSchema}
              onSubmit={(values) => handleFormSubmit(values)}
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
                  <Grid container direction={"column"}>
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
                    <Grid
                      item
                      style={{
                        marginTop: "20px",
                        marginBottom: "10px",
                        textAlign: "center",
                      }}
                    >
                      <Typography className={classes.mainHeading} variant="h3">
                        Register
                      </Typography>
                      <Typography
                        className={classes.mainSubHeading}
                        variant="body2"
                      >
                       
                      </Typography>
                    </Grid>
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={6}>
                        <label className={classes.label}>
                          First Name <span style={{ color: "red" }}>*</span>
                        </label>
                        <TextField
                          placeholder="Enter Your First Name"
                          type="text"
                          variant="outlined"
                          fullWidth
                          size="small"
                          name="firstName"
                          inputProps={{ maxLength: 256 }}
                          value={values.firstName}
                          error={Boolean(touched.firstName && errors.firstName)}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          className="textFeilds"
                          InputProps={{
                            className: classes.TextBox,
                          }}
                        />
                        <FormHelperText
                          error
                          style={{
                            fontSize: "12px",
                            paddingBottom: "0px !important",
                            fontFamily: "Inter",
                          }}
                        >
                          {touched.firstName && errors.firstName}
                        </FormHelperText>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <label className={classes.label}>
                          Last Name <span style={{ color: "red" }}>*</span>
                        </label>
                        <TextField
                          placeholder="Enter Your Last Name"
                          type="text"
                          variant="outlined"
                          fullWidth
                          size="small"
                          name="lastName"
                          inputProps={{ maxLength: 256 }}
                          value={values.lastName}
                          error={Boolean(touched.lastName && errors.lastName)}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          className="textFeilds"
                          InputProps={{
                            className: classes.TextBox,
                          }}
                        />
                        <FormHelperText
                          error
                          style={{ fontSize: "12px", fontFamily: "Inter" }}
                        >
                          {touched.lastName && errors.lastName}
                        </FormHelperText>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <FormControl fullWidth>
                          <Box
                            style={{
                              width: "100%",
                              marginTop: "-9px",
                              // marginBottom: "17px",
                            }}
                          >
                            <label className={classes.label}>
                              Password <span style={{ color: "red" }}>*</span>
                            </label>
                            <TextField
                              className={`${classes.inputvalue} textFeilds`}
                              placeholder="Enter Your Password"
                              size="small"
                              variant="outlined"
                              autoComplete="new-password"
                              fullWidth
                              inputProps={{ maxLength: 16 }}
                              type={showPassword ? "text" : "password"}
                              value={values.password}
                              name="password"
                              error={Boolean(
                                touched.password && errors.password
                              )}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              InputProps={{
                                className: classes.TextBox,
                                autocomplete: "new-password",
                                form: {
                                  autocomplete: "off",
                                },
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
                            {touched.password && errors.password && (
                              <FormHelperText
                                error
                                style={{
                                  fontSize: "12px",
                                  fontFamily: "Inter",
                                }}
                              >
                                Must contain 8 characters, one uppercase, one
                                lowercase, one number and one special character
                              </FormHelperText>
                            )}
                          </Box>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <FormControl fullWidth>
                          <Box
                            style={{
                              width: "100%",
                              marginTop: "-9px",
                              // marginBottom: "17px",
                            }}
                          >
                            <label className={classes.label}>
                              Confirm Password{" "}
                              <span style={{ color: "red" }}>*</span>
                            </label>
                            <TextField
                              className={`${classes.inputvalue} textFeilds`}
                              placeholder="Confirm Your Password"
                              size="small"
                              variant="outlined"
                              autoComplete="new-password"
                              fullWidth
                              inputProps={{ maxLength: 16 }}
                              type={showConfirmPassword ? "text" : "password"}
                              value={values.confirmPassword}
                              name="confirmPassword"
                              error={Boolean(
                                touched.confirmPassword &&
                                  errors.confirmPassword
                              )}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              InputProps={{
                                className: classes.TextBox,
                                autocomplete: "new-password",
                                form: {
                                  autocomplete: "off",
                                },
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <IconButton
                                      onClick={() =>
                                        setShowConfirmPassword(
                                          !showConfirmPassword
                                        )
                                      }
                                      edge="end"
                                    >
                                      <Box className={classes.passsec}>
                                        {showConfirmPassword ? (
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
                            {touched.confirmPassword &&
                              errors.confirmPassword && (
                                <FormHelperText
                                  error
                                  style={{
                                    fontSize: "12px",
                                    fontFamily: "Inter",
                                  }}
                                >
                                  Confirm password must match to password.
                                </FormHelperText>
                              )}
                          </Box>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <label className={classes.label}>
                          Email <span style={{ color: "red" }}>*</span>
                        </label>
                        <TextField
                          placeholder="Enter Your Email"
                          type="text"
                          variant="outlined"
                          fullWidth
                          size="small"
                          name="email"
                          inputProps={{ maxLength: 256 }}
                          value={values.email}
                          error={Boolean(touched.email && errors.email)}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          // autocomplete="none"
                          autoComplete="off"
                          className="textFeilds"
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
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <FormControl fullWidth>
                          <Box
                            style={{
                              width: "100%",
                              marginTop: "-9px",
                              // marginBottom: "17px",
                            }}
                          >
                            <label
                              className={classes.label}
                              style={{ marginBottom: "4px" }}
                            >
                              Mobile Number{" "}
                              <span style={{ color: "red" }}>*</span>
                            </label>
                            <PhoneInput
                              country={"us"}
                              name="phoneNo"
                              inputStyle={{
                                background: " #FFFFFF",
                                width: "100%",
                                color: "#848484",
                                border: "1px solid rgba(0, 0, 0, 0.1)",
                                height: "55px",
                                paddingLeft: "48px !important",
                                marginTop: "5px",
                                marginTop: "-3px !important",
                                marginBottom: "-4px !important",
                                borderRadius: "10px",
                              }}
                              value={values.phoneNo}
                              error={Boolean(touched.phoneNo && errors.phoneNo)}
                              onBlur={handleBlur}
                              onChange={(phone, e) => {
                                setCountryCode(e.dialCode);
                                setFieldValue("phoneNo", phone);
                              }}
                              className="textFeilds textHeight"
                              InputProps={{
                                className: classes.TextBox,
                              }}
                            />
                            <FormHelperText
                              error
                              style={{
                                fontSize: "12px",
                                fontFamily: "Inter",
                              }}
                            >
                              {touched.phoneNo && errors.phoneNo}
                            </FormHelperText>
                          </Box>
                        </FormControl>
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <label className={classes.label}>
                          Country <span style={{ color: "red" }}>*</span>
                        </label>
                        <FormControl
                          variant="outlined"
                          style={{ marginTop: "8px" }}
                          fullWidth
                          className={classes.select}
                        >
                          <Select
                            // placeholder="Enter your country"
                            margin="dense"
                            name="country"
                            default="Select country"
                            value={values.country}
                            error={Boolean(touched.country && errors.country)}
                            onBlur={handleBlur}
                            onChange={(e) => {
                              handleChange(e);
                              changeCountry(e);
                            }}
                            displayEmpty
                            renderValue={
                              values.country !== ""
                                ? undefined
                                : () => (
                                    <p style={{ color: "rgb(118, 118, 118)" }}>
                                      Select country
                                    </p>
                                  )
                            }
                          >
                            {/* <MenuItem value="none" >
                              None
                            </MenuItem> */}

                            {countries.map((countries) => {
                              return (
                                <MenuItem
                                  key={countries.name + countries.id}
                                  value={countries.name}
                                >
                                  {countries.name}
                                </MenuItem>
                              );
                            })}
                          </Select>
                          <FormHelperText error className={classes.date}>
                            {touched.country && errors.country}
                          </FormHelperText>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <label className={classes.label}>
                          State <span style={{ color: "red" }}>*</span>
                        </label>
                        <FormControl
                          variant="outlined"
                          style={{ marginTop: "8px" }}
                          fullWidth
                          className={classes.select}
                        >
                          <Select
                            fullWidth
                            name="state"
                            margin="dense"
                            placeholder="Enter your state"
                            value={values.state}
                            error={Boolean(touched.state && errors.state)}
                            onBlur={handleBlur}
                            onChange={(e) => {
                              changeState(e);
                              handleChange(e);
                            }}
                            displayEmpty
                            renderValue={
                              values.state !== ""
                                ? undefined
                                : () => (
                                    <p style={{ color: "rgb(118, 118, 118)" }}>
                                      Select state
                                    </p>
                                  )
                            }
                          >
                            {/* <MenuItem value="">
                              <em>None</em>
                            </MenuItem> */}
                            {showStates.lenght !== 0 &&
                              showStates.map((state) => {
                                return (
                                  <MenuItem
                                    key={state.name + state.id}
                                    value={state.name}
                                  >
                                    {state.name}
                                  </MenuItem>
                                );
                              })}
                          </Select>
                        </FormControl>
                        <FormHelperText
                          error
                          style={{ fontSize: "12px", fontFamily: "Inter" }}
                        >
                          {touched.state && errors.state}
                        </FormHelperText>
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <label className={classes.label}>
                          City <span style={{ color: "red" }}>*</span>
                        </label>
                        <TextField
                          placeholder="Enter Your City"
                          type="text"
                          variant="outlined"
                          fullWidth
                          size="small"
                          name="city"
                          inputProps={{ maxLength: 256 }}
                          value={values.city}
                          error={Boolean(touched.city && errors.city)}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          className="textFeilds"
                          InputProps={{
                            className: classes.TextBox,
                          }}
                        />
                        <FormHelperText
                          error
                          style={{ fontSize: "12px", fontFamily: "Inter" }}
                        >
                          {touched.city && errors.city}
                        </FormHelperText>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <label className={classes.label}>
                          Zip Code <span style={{ color: "red" }}>*</span>
                        </label>
                        <TextField
                          placeholder="Enter Your Zip Code"
                          type="number"
                          variant="outlined"
                          fullWidth
                          name="countryCode"
                          size="small"
                          value={values.countryCode}
                          onInput={(e) => {
                            e.target.value = Math.max(
                              0,
                              parseInt(e.target.value)
                            )
                              .toString()
                              .slice(0, 6);
                          }}
                          onBlur={handleBlur}
                          error={Boolean(
                            touched.countryCode && errors.countryCode
                          )}
                          onChange={handleChange}
                          className="textFeilds"
                          InputProps={{
                            className: classes.TextBox,
                          }}
                        />
                        <FormHelperText
                          error
                          style={{ fontSize: "12px", fontFamily: "Inter" }}
                        >
                          {touched.countryCode && errors.countryCode}
                        </FormHelperText>
                      </Grid>
                  
                    </Grid>

                    <Box style={{ width: "100%" }}>
                      {" "}
                      <Grid item className={classes.checkBoxDiv}>
                        {/* <input
                          onChange={handleChange}
                          type="checkbox"
                          name="checkBox"
                          value={values.checkBox}
                          style={{ width: "20px", height: "20px" }}
                        /> */}
                        <Field
                          type="checkbox"
                          name="check"
                          style={{ width: "20px", height: "20px" }}
                        />
                        <Typography color="primary.main" variant="body1">
                          I have read and accepted the{" "}
                          <a
                            href="/terms"
                            target="_blank"
                            style={{ fontWeight: "600", fontSize: "15px" }}
                            className={classes.newbox}
                          >
                            Terms and Conditions
                          </a>{" "}
                          and{" "}
                          <a
                            href="/privacy-policy"
                            target="_blank"
                            style={{ fontWeight: "600", fontSize: "15px" }}
                            className={classes.newbox}
                          >
                            Privacy Policy.
                          </a>
                        </Typography>
                      </Grid>
                      <FormHelperText
                        error
                        style={{ fontSize: "12px", fontFamily: "Inter" }}
                      >
                        {touched.check && errors.check}
                      </FormHelperText>
                    </Box>
                    <Grid item mt={1} style={{ marginTop: "14px" }}>
                      <Button
                        variant="contained"
                        type="submit"
                        className={classes.buttonbox}
                        // disabled={!done || isLoading}
                      >
                        Sign Up
                        {isLoading && <ButtonCircularProgress />}
                      </Button>
                    </Grid>

                    <Grid item>
                      <Typography
                        color="primary.main"
                        variant="body1"
                        style={{
                          marginTop: "20px",
                          textAlign: "center",
                          marginBottom: "20px",
                        }}
                      >
                        Already have an account?&nbsp;
                        <Link
                          component={RouterComponent}
                          to="/"
                          className={classes.newbox}
                        >
                          Log In
                        </Link>
                      </Typography>
                    </Grid>
                  </Grid>
                </Form>
              )}
            </Formik>
          </Box>
        </Box>
      </Box>
    </Grid>
  );
}

export default Signup;
