import React, { useContext, useEffect, useState } from "react";
import {
  Grid,
  Box,
  Container,
  Typography,
  Button,
  FormControl,
  makeStyles,
  FormHelperText,
  MenuItem,
  InputLabel,
  Select,
} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { useHistory } from "react-router-dom";
import { Form, Formik } from "formik";
import { DropzoneArea } from "material-ui-dropzone";
import * as yep from "yup";
import ApiConfig from "../../../config/APIConfig";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "@context/Auth";
import ButtonCircularProgress from "@component/ButtonCircularProgress";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import moment from "moment";
import Dropzone from "react-dropzone-uploader";
import "react-dropzone-uploader/dist/styles.css";
import { KeyboardDatePicker } from "@material-ui/pickers";
import Page from "@component/Page";

const useStyles = makeStyles((theme) => ({
  Box: {
    background: "#302F35",
    border: "1px solid #898989",
    height: "200px",
    width: "200px",
    borderRadius: "25px",
  },
  FAQ: {
    padding: "20px 0",
    [theme.breakpoints.down("xs")]: {
      padding: "35px 0",
    },
  },
  PageHeading: {
    paddingBottom: "20px",
  },
  TextBox: {
    borderRadius: "10px",
    // background: theme.palette.background.taf,
    height: "55px",
  },
  editsection: {
    background: "#FFFFFF",
    borderRadius: "10px",
    /* padding: 57px; */
    padding: "41px 62px 60px 62px !important",
    "& h2": {
      // color: "#1D2D3F",
      color: theme.palette.text.primary,

      fontStyle: "normal",
      fontWeight: "bold",
      fontSize: "40px",
      lineHeight: "130%",
    },

    "& h3": {
      fontStyle: "normal",
      fontWeight: "500",
      fontSize: "14px",
      lineHeight: "130%",
      // color: "#1D2D3F",
      color: theme.palette.text.primary,
    },
  },
  inputfield: {
    "& label": {
      fontFamily: "Inter",
      fontStyle: "normal",
      fontWeight: "500",
      fontSize: "16px",
      lineHeight: "24px",
      color: "#000000",
    },
  },
  imagefiled: {
    "& label": {
      color: theme.palette.secondary.main,
      // color: "#1D2D3F",
    },
    "& small": {},
  },
  inputsection: {
    color: "#848484",
    cursor: "text",
    position: "relative",
    fontSize: "1rem",
    boxSizing: "border-box",
    fontWeight: "400",
    lineHeight: "1.1876em",
    "& input": {
      // color: "#000000",
      width: "100%",
      border: "0",
      height: "1.1876em",
      margin: "0",
      display: "block",
      padding: "10px 8px",
      fontSize: "14px",
      minWidth: "0",
      background: "none",
      boxSizing: "content-box",
      animationName: "mui-auto-fill-cancel",
      letterSpacing: "inherit",
      animationDuration: "10ms",
      WebkitTapHighlightColor: "transparent",
    },
  },
  imagesBox: {
    display: "flex",
    justifyContent: "flex-start",
    maxWidth: "200px",
    width: "100%",
    height: "200px",
    margin: "0",
    [theme.breakpoints.down("xs")]: {
      width: "150px",
      height: "150px",
    },
  },
  message: { color: theme.palette.primary.main },
  colorbox: {
    // color: "#1D2D3F",
    color: theme.palette.text.primary,
    height: "auto",
    "& .MuiDropzoneArea-root": {
      width: "100% !important",
      maxWidth: "208px !important",
      borderRadius: "100% !important",
    },
    "& .MuiDropzoneArea-text": {
      display: "none",
    },
    "& .MuiDropzoneArea-textContainer ": {
      marginTop: "75px",
    },
    "& h2": {
      fontFamily: "Inter",
      fontStyle: "normal",
      fontWeight: "700",
      fontSize: "36px",
      lineHeight: "54px",
      color: "#FFFFFF",
    },
    "& h3": {
      fontFamily: "Inter",
      fontStyle: "normal",
      fontWeight: "400",
      fontSize: "16px",
      lineHeight: "24px",
      color: "#FFFFFF",
    },
    "& img": {
      width: "100%",
    },
  },

  updateButton: {
    width: "100%",
    background: "#56CA00",
    borderRadius: "10px",
    [theme.breakpoints.down("xs")]: {
      maxWidth: "150px",
      fontSize: "9px",
    },
  },
  Titlemain: {
    color: theme.palette.text.nofiction,
  },
  select: {
    "& .MuiInputBase-root": {
      // background: theme.palette.background.taf,
      height: "55px",
    },
    "& .MuiInputBase-input ": {
      color: "#000000 !important",
    },
  },
  remove: {
    height: "30px",
    fontFamily: "Inter",
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: "12.6px",
    lineHeight: "20px",
    textAlign: "center",
    letterSpacing: "0.18px",
    color: "#FFFFFF",
    background: "#56CA00",
    borderRadius: "10px",
  },
}));
export const getBase64 = (file, cb) => {
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function () {
    cb(reader.result);
  };
  reader.onerror = function (err) {};
};

export default function Editprofile() {
  const classes = useStyles();
  const user = useContext(AuthContext);
  const [countryCode1, setCountryCode] = useState();

  const [phone, setPhone] = useState();
  const [countries, setCountries] = useState([]);
  const [showStates, setShowStates] = useState([]);

  const [states, setStates] = useState([]);
  const auth = useContext(AuthContext);
  const userState = auth?.userData?.state;

  const [imageFront, setImageFront] = useState("");

  const getBase64 = (file, cb) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      cb(reader.result);
    };
    reader.onerror = function (err) {
      console.log("Error: ", err);
    };
  };

  // useEffect(() => {
  //   if (!window.localStorage.getItem("token")) {
  //     history.push("/login");
  //   }
  // }, [window.localStorage.getItem("token")]);
  useEffect(() => {
    if (user?.userData) {
      setImageFront(
        user?.userData?.profilePic ? user?.userData?.profilePic : ""
      );
    }
  }, [user?.userData]);

  const history = useHistory();
  const [loader1, setLoader1] = useState(false);
  const [isloading, setisloading] = useState(false);

  const formValidationSchema = yep.object().shape({
    firstName: yep
      .string("Enter First Name")
      .required("First name is a required  ")
      .min(3, "Your first should be atleast 5 characters long")
      .max(30, "Your first should not be more than 30 characters")
      .matches(/^^[a-zA-Z ]*$/, "Only alphabets are allowed for this field . "),

    lastName: yep
      .string("Enter Last  name")
      .required("Last name is a required  ")
      .min(5, "Your last should be atleast 5 characters long")
      .max(30, "Your last should not be more than 30 characters")
      .matches(/^^[a-zA-Z ]*$/, "Only alphabets are allowed for this field . "),

    email: yep
      .string()
      .email("You have entered an invalid email address. Please try again")
      .required("Email address is required")
      .matches("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$"),
    mobileNumber: yep
      .string()
      .required("Mobile number is required")
      .matches(
        /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,
        "Must be a valid mobilie"
      )
      .max(13, "Should not exceeds 13 digits")
      .min(9, "Must be only 9 digits"),

    country: yep.string().required("Country is required"),
    state: yep.string().required("State is required"),

    dateOfBirth: yep
      .string()
      .required("Date of birth is Required")
      .test(
        "DOB",
        "You must be atleast 13 years old or above",
        (date) => moment().diff(moment(date), "years") >= 13
      ),

    city: yep.string().required("City is required"),
    address: yep.string().required("Address is required"),
    // countryCode: yep
    //   .number()
    //   .required("Zip code is required")
    //   .typeError("That doesn't look like a zip code number")
    //   .positive("A Zip code number can't start with a minus")
    //   .integer("A Zip code number can't include a decimal point"),
  });

  useEffect(() => {
    axios.get("/static/json/countries.json").then(function (response) {
      setCountries(response.data.countries);
      axios.get("/static/json/states.json").then(function (response) {
        setStates(response.data.states);
        // axios.get("/static/json/cities.json").then(function (response) {
        //   setCities(response.data.cities);
        // });
      });
    });
  }, []);
  const changeStateList = (name) => {
    const selectted = states.filter((cont) => {
      return cont.name === name;
    });
    if (selectted.length !== 0) {
      const contId = selectted[0].id;
      // const allCity = cities.filter((city) => {
      //   return city.state_id === contId;
      // });
      // setShowCities(allCity);
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
  useEffect(() => {
    if (userState) {
      setShowStates([{ name: userState }]);
    }
  }, [userState]);

  return (
    <>
      <Page title="Edit-profile">
        <Box className={classes.FAQ}>
          <Box mb={2}>
            <Container maxWidth="lg">
              <Box className={classes.colorbox}>
                <Typography variant="h2">Edit Profile</Typography>
                <Typography variant="h3">
                  You can set preferred display name, create your branded
                  profile URL and manage other personal settings
                </Typography>
              </Box>
              <Box>
                <Typography>
                  {auth?.userData?.userType === "COMPANY"
                    ? "Company Name :"
                    : ""}
                  &nbsp;{" "}
                  <span style={{ fontWeight: "600" }}>
                    {auth?.userData?.userType === "COMPANY" ? (
                      <>{auth?.userData?.companyName}</>
                    ) : (
                      ""
                    )}
                  </span>
                </Typography>
              </Box>
              <Grid container spacing={3}>
                <Grid
                  item
                  xs={12}
                  sm={9}
                  md={7}
                  lg={7}
                  style={{ flexGrow: "unset" }}
                >
                  <Box mt={3}>
                    {imageFront !== "" ? (
                      <>
                        <Box className={classes.colorbox}>
                          <figure className={classes.imagesBox}>
                            <img
                              src={
                                imageFront
                                  ? imageFront
                                  : auth?.userData?.profilePic
                              }
                              width="100%"
                              height="100%"
                              style={{
                                // minHeight: "300px",
                                width: "100%",
                                height: "100%",

                                borderRadius: "50%",
                                objectFit: "cover",
                              }}
                            />
                          </figure>
                          <Box mt={2}>
                            <Button
                              variant="contained"
                              size="large"
                              color="secondary"
                              type="submit"
                              className={classes.remove}
                              onClick={() => {
                                setImageFront("");
                              }}
                            >
                              Remove
                            </Button>
                          </Box>
                        </Box>
                      </>
                    ) : (
                      <>
                        <Box
                          style={{
                            maxHeight: "200px",
                            minHeight: "200px",
                            // borderRadius: "20px",
                          }}
                          className={classes.colorbox}
                        >
                          <Box>
                            {" "}
                            <Box
                              style={{
                                position: "relative",
                                display: "flex",
                              }}
                            >
                              <DropzoneArea
                                maxFileSize="40000000"
                                filesLimit="1"
                                style={{
                                  marginTop: "-78px",
                                  marginLeft: "20px",
                                }}
                                default={auth?.userData?.profilePic}
                                acceptedFiles={["image/*"]}
                                onDrop={(files) =>
                                  getBase64(files[0], (result) => {
                                    setImageFront(result);
                                  })
                                }
                                // dropzoneText="Add Profile Image"
                              />
                              <Dropzone
                                maxFiles={1}
                                // onChangeStatus={handleChangeStatus}
                                accept="image/*,video/*"
                                initialFiles={[imageFront]}
                                inputContent={(files, extra, rejectedFiles) =>
                                  extra.files ? (
                                    "Image, Video files only"
                                  ) : (
                                    <Box
                                      textAlign="center"
                                      py={5}
                                      className="uploadbox"
                                    >
                                      <Typography
                                        color="primary"
                                        variant="h6"
                                        className={classes.Titlemain}
                                      >
                                        Upload your profile pic
                                      </Typography>
                                    </Box>
                                  )
                                }
                              />
                              {isloading && (
                                <Box
                                  style={{
                                    position: "absolute",

                                    zIndex: "1",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    width: "100%",
                                  }}
                                >
                                  <ButtonCircularProgress />
                                </Box>
                              )}
                            </Box>
                          </Box>
                        </Box>
                      </>
                    )}
                  </Box>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  lg={12}
                  className={classes.editsection}
                >
                  <Formik
                    initialValues={{
                      firstName: user?.userData?.firstName
                        ? user?.userData?.firstName
                        : "",
                      lastName: user?.userData?.lastName
                        ? user?.userData?.lastName
                        : "",
                      // userName: user?.userData?.userName
                      //   ? user?.userData?.userName
                      //   : "",
                      imageUrl: user?.userData?.imageUrl
                        ? user?.userData?.imageUrl
                        : "",
                      country: user?.userData?.country
                        ? user?.userData?.country
                        : "",
                      state: user?.userData?.state ? user?.userData?.state : "",
                      email: user?.userData?.email ? user?.userData?.email : "",
                      mobileNumber: user?.userData?.mobileNumber
                        ? user?.userData?.mobileNumber
                        : "",
                      address: user?.userData?.address
                        ? user?.userData?.address
                        : "",
                      city: user?.userData?.city ? user?.userData?.city : "",
                      countryCode: user?.userData?.countryCode
                        ? user?.userData?.countryCode
                        : "",
                      zipCode: user?.userData?.zipCode
                        ? user?.userData?.zipCode
                        : "",
                      dateOfBirth: user?.userData?.dateOfBirth
                        ? user?.userData?.dateOfBirth
                        : "",
                    }}
                    initialStatus={{
                      success: false,
                      successMsg: "",
                    }}
                    validationSchema={formValidationSchema}
                    onSubmit={async ({
                      firstName,
                      email,
                      lastName,
                      mobileNumber,
                      country,
                      address,
                      state,
                      city,
                      dateOfBirth,
                      countryCode,
                      zipCode,
                      // userName,
                      imageUrl,
                    }) => {
                      try {
                        setLoader1(true);

                        const response = await axios({
                          method: "PUT",
                          url: ApiConfig.editUserProfile,
                          headers: {
                            token: window.localStorage.getItem("token"),
                          },
                          data: {
                            country: country,
                            state: state,
                            email: email,
                            firstName: firstName,
                            profilePic: imageFront,
                            lastName: lastName,
                            address: address,
                            city: city,
                            countryCode: `+${countryCode1}`,
                            zipCode: zipCode.toString(),
                            // userName: userName,
                            dateOfBirth: moment(dateOfBirth).format(),
                            // moment(values.dateOfBirth).
                            mobileNumber: mobileNumber?.toString(),
                          },
                        });

                        if (response.data.responseCode === 200) {
                          toast.success(response.data.responseMessage);
                          // history.push("/dashboard");
                          user.getProfileHandler(
                            window.localStorage.getItem("token")
                          );
                        } else {
                          toast.success(response.data.responseMessage);
                        }
                        setLoader1(false);
                      } catch (err) {
                        toast.error(err.response.data.responseMessage);
                        console.error(err.response);
                        setLoader1(false);
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
                        <Box className={classes.colorbox}>
                          <Box mt={2} className={classes.inputfield}>
                            <Grid container spacing={2}>
                              <Grid item xs={12} sm={6} md={6} lg={6}>
                                <FormControl
                                  fullWidth
                                  className={classes.inputsection}
                                  style={{ marginTop: "-4px" }}
                                >
                                  <label>
                                    First Name{" "}
                                    <span style={{ color: "red" }}>*</span>
                                  </label>
                                  <TextField
                                    name="firstName"
                                    value={values.firstName}
                                    variant="outlined"
                                    className="textFeilds"
                                    step="any"
                                    InputProps={{
                                      className: classes.TextBox,
                                    }}
                                    placeholder="First name"
                                    error={Boolean(
                                      touched.firstName && errors.firstName
                                    )}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                  />
                                  <FormHelperText error>
                                    {touched.firstName && errors.firstName}
                                  </FormHelperText>
                                </FormControl>
                              </Grid>
                              <Grid item xs={12} sm={6} md={6} lg={6}>
                                <FormControl
                                  fullWidth
                                  className={classes.inputsection}
                                  style={{ marginTop: "-4px" }}
                                >
                                  <label>
                                    Last Name{" "}
                                    <span style={{ color: "red" }}>*</span>{" "}
                                  </label>
                                  <TextField
                                    placeholder="Last name"
                                    name="lastName"
                                    variant="outlined"
                                    step="any"
                                    value={values.lastName}
                                    className="textFeilds"
                                    InputProps={{
                                      className: classes.TextBox,
                                    }}
                                    error={Boolean(
                                      touched.lastName && errors.lastName
                                    )}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                  />
                                  <FormHelperText error>
                                    {touched.lastName && errors.lastName}
                                  </FormHelperText>
                                </FormControl>
                              </Grid>
                              <Grid item xs={12} sm={6} md={6} lg={6}>
                                <FormControl
                                  fullWidth
                                  className={classes.inputsection}
                                  style={{ marginTop: "-4px" }}
                                >
                                  <label>
                                    Your Email{" "}
                                    <span style={{ color: "red" }}>*</span>
                                  </label>
                                  <TextField
                                    placeholder="Email"
                                    name="email"
                                    variant="outlined"
                                    className="textFeilds"
                                    disabled
                                    step="any"
                                    InputProps={{
                                      className: classes.TextBox,
                                    }}
                                    value={values.email}
                                    error={Boolean(
                                      touched.email && errors.email
                                    )}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                  />
                                  <FormHelperText error>
                                    {touched.email && errors.email}
                                  </FormHelperText>
                                </FormControl>
                              </Grid>
                              <Grid item xs={12} sm={6} md={6} lg={6}>
                                <Box>
                                  <label>Date Of Birth </label>
                                  <FormControl
                                    className={`${classes.formboxes} textFeilds`}
                                    variant="outlined"
                                    fullWidth
                                    step="any"
                                    InputProps={{
                                      className: classes.TextBox,
                                    }}
                                    size="small"
                                    style={{
                                      marginTop: "-1px",
                                      marginBottom: "-14px",
                                    }}
                                  >
                                    <KeyboardDatePicker
                                      className={`${classes.date} textFeilds`}
                                      placeholder="DD/MM/YYYY"
                                      value={values.dateOfBirth}
                                      onChange={(date) => {
                                        setFieldValue(
                                          "dateOfBirth",
                                          new Date(date)
                                        );
                                      }}
                                      format="DD/MM/YYYY"
                                      InputLabelProps={{ shrink: true }}
                                      inputVariant="outlined"
                                      disableFuture
                                      InputProps={{
                                        className: classes.TextBox,
                                      }}
                                      margin="dense"
                                      name="dateOfBirth"
                                      maxDate={moment().subtract(18, "years")}
                                      error={Boolean(
                                        touched.dateOfBirth &&
                                          errors.dateOfBirth
                                      )}
                                      helperText={
                                        touched.dateOfBirth &&
                                        errors.dateOfBirth
                                      }
                                    />
                                  </FormControl>
                                </Box>
                              </Grid>
                              <Grid item xs={12} sm={6} md={6} lg={6}>
                                <FormControl style={{ marginTop: "1px" }}>
                                  <label style={{ marginBottom: "10px" }}>
                                    Your Phone{" "}
                                    <span style={{ color: "red" }}>*</span>
                                  </label>
                                  <PhoneInput
                                    country={"us"}
                                    name="phoneNo"
                                    step="any"
                                    disabled
                                    className="textFeilds"
                                    InputProps={{
                                      className: classes.TextBox,
                                    }}
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
                                    value={values.mobileNumber}
                                    error={Boolean(
                                      touched.mobileNumber &&
                                        errors.mobileNumber
                                    )}
                                    onBlur={handleBlur}
                                    onChange={(phone, e) => {
                                      setCountryCode(e.dialCode);
                                      setFieldValue("mobileNumber", phone);
                                    }}
                                  />
                                  <FormHelperText
                                    error
                                    style={{ margin: "0px", fontSize: "12px" }}
                                  >
                                    {touched.mobileNumber &&
                                      errors.mobileNumber}
                                  </FormHelperText>
                                </FormControl>
                              </Grid>
                              <Grid item xs={12} sm={6} md={6} lg={6}>
                                <Box style={{ marginTop: "5px" }}>
                                  <label>Your Country</label>
                                  <FormControl
                                    variant="outlined"
                                    // style={{ marginTop: "20px" }}
                                    fullWidth
                                    className={classes.select}
                                  >
                                    {/* <InputLabel margin="dense">
                                  Select Country
                                </InputLabel> */}
                                    <Select
                                      // value={age}
                                      // onChange={handleChange}

                                      margin="dense"
                                      name="country"
                                      error={Boolean(
                                        touched.country && errors.country
                                      )}
                                      onBlur={handleBlur}
                                      className="textFeilds"
                                      InputProps={{
                                        className: classes.TextBox,
                                      }}
                                      // onChange={handleChange}
                                      value={values?.country}
                                      onChange={(e) => {
                                        handleChange(e);
                                        changeCountry(e);
                                      }}
                                    >
                                      <MenuItem value="">
                                        <em>None</em>
                                      </MenuItem>
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
                                    <FormHelperText
                                      error
                                      style={{ paddingLeft: "0px" }}
                                    >
                                      {touched.country && errors.country}
                                    </FormHelperText>
                                  </FormControl>
                                </Box>
                              </Grid>
                              <Grid item xs={12} sm={6} md={6} lg={6}>
                                <Box style={{ marginTop: "5px" }}>
                                  <label>State</label>
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
                                      value={values?.state}
                                      error={Boolean(
                                        touched.state && errors.state
                                      )}
                                      onBlur={handleBlur}
                                      className="textFeilds"
                                      InputProps={{
                                        className: classes.TextBox,
                                      }}
                                      onChange={(e) => {
                                        changeState(e);
                                        handleChange(e);
                                      }}
                                    >
                                      <MenuItem value="">
                                        <em>None</em>
                                      </MenuItem>
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
                                    style={{ margin: "0px", fontSize: "12px" }}
                                  >
                                    {touched.state && errors.state}
                                  </FormHelperText>
                                </Box>
                              </Grid>
                              <Grid item xs={12} sm={6} md={6} lg={6}>
                                <Box>
                                  <label>
                                    Address Line 1{" "}
                                    {/* <span style={{ color: "red" }}>*</span> */}
                                  </label>
                                  <TextField
                                    placeholder="Enter Your Address Line 1"
                                    type="text"
                                    variant="outlined"
                                    fullWidth
                                    step="any"
                                    className="textFeilds"
                                    InputProps={{
                                      className: classes.TextBox,
                                    }}
                                    size="small"
                                    value={values.address}
                                    name="address"
                                    error={Boolean(
                                      touched.address && errors.address
                                    )}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                  />
                                  <FormHelperText
                                    error
                                    style={{ paddingLeft: "0px" }}
                                  >
                                    {touched.address && errors.address}
                                  </FormHelperText>
                                </Box>
                              </Grid>
                              <Grid item xs={12} sm={6} md={6} lg={6}>
                                <Box>
                                  <label>
                                    City 
                                  </label>
                                  <TextField
                                    placeholder="Enter Your City Name"
                                    type="text"
                                    variant="outlined"
                                    fullWidth
                                    step="any"
                                    size="small"
                                    value={values.city}
                                    className="textFeilds"
                                    InputProps={{
                                      className: classes.TextBox,
                                    }}
                                    name="city"
                                    error={Boolean(touched.city && errors.city)}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                  />
                                  <FormHelperText
                                    error
                                    style={{ paddingLeft: "0px" }}
                                  >
                                    {touched.city && errors.city}
                                  </FormHelperText>
                                </Box>
                              </Grid>
                              <Grid item xs={12} sm={6} md={6} lg={6}>
                                <Box>
                                  <label>
                                    Zip Code{" "}
                                    {/* <span style={{ color: "red" }}>*</span> */}
                                  </label>
                                  <TextField
                                    placeholder="Enter Your Zip Code"
                                    type="number"
                                    variant="outlined"
                                    fullWidth
                                    step="any"
                                    className="textFeilds"
                                    name="zipCode"
                                    InputProps={{
                                      className: classes.TextBox,
                                    }}
                                    size="small"
                                    // name="countryCode"
                                    value={values.zipCode}
                                    // error={Boolean(
                                    //   touched.countryCode && errors.countryCode
                                    // )}
                                    // onBlur={handleBlur}
                                    onChange={handleChange}
                                  />
                                  {/* <FormHelperText
                                error
                                style={{ paddingLeft: "0px" }}
                              >
                                {touched.countryCode && errors.countryCode}
                              </FormHelperText> */}
                                </Box>
                              </Grid>
                              {/* <Grid item xs={12} sm={6} md={6} lg={6}>
                                <Box align="left" mt={2}>
                                  <Button
                                    variant="contained"
                                    size="large"
                                    color="secondary"
                                    type="submit"
                                    // fullWidth
                                    disabled={loader1}
                                    className={classes.updateButton}
                                  >
                                    UPDATE PROFILE
                                    {loader1 && <ButtonCircularProgress />}
                                  </Button>
                                </Box>
                              </Grid> */}
                            </Grid>
                            <Box align="left" mt={2}>
                              <Button
                                variant="contained"
                                size="large"
                                color="secondary"
                                type="submit"
                                // fullWidth
                                disabled={loader1}
                                className={classes.updateButton}
                              >
                                UPDATE PROFILE
                                {loader1 && <ButtonCircularProgress />}
                              </Button>
                            </Box>
                          </Box>
                        </Box>
                      </Form>
                    )}
                  </Formik>
                </Grid>
              </Grid>
            </Container>
          </Box>
        </Box>
      </Page>
    </>
  );
}
