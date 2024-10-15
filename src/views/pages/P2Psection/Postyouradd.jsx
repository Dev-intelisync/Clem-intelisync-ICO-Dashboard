import React, { useContext, useEffect, useState } from "react";
import {
  Grid,
  Box,
  Typography,
  Button,
  FormControl,
  makeStyles,
  FormHelperText,
  MenuItem,
  Select,
} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { useHistory } from "react-router-dom";
import { Form, Formik } from "formik";
import * as yep from "yup";
import ApiConfig from "../../../config/APIConfig";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "@context/Auth";
import ButtonCircularProgress from "@component/ButtonCircularProgress";
import "react-phone-input-2/lib/style.css";
import moment from "moment";
import "react-dropzone-uploader/dist/styles.css";
import Checkbox from "@material-ui/core/Checkbox";
import Advertiment from "./Advertimentrequired";
const useStyles = makeStyles((theme) => ({
  Box: {
    background: "#302F35",
    border: "1px solid #898989",
    height: "200px",
    width: "200px",
    borderRadius: "25px",
  },
  FAQ: {
    padding: "30px 0",

    [theme.breakpoints.down("xs")]: {
      padding: "35px 0",
    },
    " & h2": {
      fontSize: "28px",

      [theme.breakpoints.down("sm")]: {
        fontSize: "20px",
      },
    },
  },
  PageHeading: {
    paddingBottom: "20px",
  },
  editsection: {
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
      // color: "#1D2D3F",
      color: theme.palette.text.primary,

      // color: "#fff",
      // marginTop: "22px",
      fontSize: "14px",
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

  TextBox: {
    borderRadius: "10px",
    background: theme.palette.background.taf,
  },
  secuirty: {
    background:
      "linear-gradient(180deg, rgba(0, 172, 235, 0.1) 0%, rgba(0, 176, 237, 0.1) 10.18%, rgba(16, 105, 194, 0.1) 70.35%, rgba(16, 105, 194, 0.1) 100%)",
    borderRadius: "10px",
    border: "1px solid #6ECFF3",
    marginTop: "40px",
    padding: "25px",
  },
  message: { color: theme.palette.primary.main },
  colorbox: {
    background:
      "linear-gradient(180deg, rgba(0, 172, 235, 0.1) 0%, rgba(0, 176, 237, 0.1) 10.18%, rgba(16, 105, 194, 0.1) 70.35%, rgba(16, 105, 194, 0.1) 100%)",
    borderRadius: "10px",
    border: "1px solid #6ECFF3",
    marginTop: "40px",
    padding: "40px",
    // color: "#1D2D3F",
    color: theme.palette.text.primary,
    height: "auto",
    "& img": {
      width: "100%",
    },
  },

  updateButton: {
    [theme.breakpoints.down("xs")]: {
      maxWidth: "150px",
      fontSize: "9px",
    },
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
  const [countryCode, setCountryCode] = useState("");
  const [phone, setPhone] = useState();
  const [countries, setCountries] = useState([]);
  const [showStates, setShowStates] = useState([]);
  const [status, setStatus] = useState("Active");

  const [states, setStates] = useState([]);
  const auth = useContext(AuthContext);
  const userState = auth?.userData?.state;

  const [imageFront, setImageFront] = useState("");
  // useEffect(() => {
  //   if (!window.localStorage.getItem("token")) {
  //     history.push("/login");
  //   }
  // }, [window.localStorage.getItem("token")]);
  useEffect(() => {
    if (user?.userData) {
      setImageFront(user?.userData?.imageUrl ? user?.userData?.imageUrl : "");
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
    phoneNo: yep
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

    dob: yep
      .string()
      .required("Date of birth is Required")
      .test(
        "DOB",
        "You must be atleast 18 years old or above",
        (date) => moment().diff(moment(date), "years") >= 18
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

  const handleChangeStatus = async ({ meta, file }, status) => {
    if (status !== "done") {
      return;
    }
    setisloading(true);

    const formDataImages = new FormData();
    formDataImages.append("file", file);
    const response = await axios({
      method: "POST",
      url: ApiConfig.uploadFile,
      data: formDataImages,
    });
    if (response.data.status === 200) {
      toast.success("Images submitted successfully");
      setImageFront(response.data.data);
      setisloading(false);
    } else {
      setisloading(false);
      toast.error("Image not uploaded");
    }
  };

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
      <Box className={classes.FAQ}>
        <Box>
          <Typography variant="h2">Create trade advertisement</Typography>
        </Box>
        <Box mb={2}>
          <Grid container spacing={2}>
            {/* <Grid item xs={12} sm={12} md={6} className={classes.editsection}> */}
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
                country: user?.userData?.country ? user?.userData?.country : "",
                state: user?.userData?.state ? user?.userData?.state : "",
                email: user?.userData?.email ? user?.userData?.email : "",
                phoneNo: user?.userData?.phoneNo ? user?.userData?.phoneNo : "",
                address: user?.userData?.address ? user?.userData?.address : "",
                city: user?.userData?.city ? user?.userData?.city : "",
                countryCode: user?.userData?.countryCode
                  ? user?.userData?.countryCode
                  : "",
                dob: user?.userData?.dob ? user?.userData?.dob : "",
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
                phoneNo,
                country,
                address,
                state,
                city,
                dob,
                countryCode,
                // userName,
                imageUrl,
              }) => {
                try {
                  setLoader1(true);

                  const response = await axios({
                    method: "POST",
                    url: ApiConfig.editUserProfile,

                    headers: {
                      token: window.localStorage.getItem("token"),
                    },
                    data: {
                      country: country,
                      state: state,
                      email: email,
                      firstName: firstName,
                      imageUrl: imageFront,
                      lastName: lastName,
                      address: address,
                      city: city,
                      countryCode: countryCode,
                      // userName: userName,
                      dob: moment(dob).format("DD-MM-YYYY"),
                      phoneNo: phoneNo?.toString(),
                    },
                  });

                  if (response.data.status === 200) {
                    toast.success(response.data.message);
                    history.push("/dashboard");
                    user.getProfileHandler(
                      window.localStorage.getItem("token")
                    );
                  } else {
                    toast.success(response.data.message);
                  }
                  setLoader1(false);
                } catch (err) {
                  toast.error(err.response.data.message);
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
                  <Box>
                    <Advertiment />
                  </Box>
                  <Box className={classes.colorbox}>
                    <Typography variant="h2">More information</Typography>
                    <Box mt={2} className={classes.inputfield}>
                      <Grid container spacing={2}>
                        <Grid item lg={4} md={4} sm={6} xs={12}>
                          <Box style={{ marginTop: "5px" }}>
                            <label>Assets</label>
                            <FormControl
                              variant="outlined"
                              // style={{ marginTop: "20px" }}
                              fullWidth
                            >
                              {/* <InputLabel margin="dense">
                                  Select Country
                                </InputLabel> */}
                              <Select
                                style={{}}
                                variant="outlined"
                                fullWidth
                                className="textFeilds"
                                InputProps={{
                                  className: classes.TextBox,
                                }}
                                onChange={(e) => setStatus(e.target.value)}
                                value={status}
                              >
                                <MenuItem value="Block">All Payments</MenuItem>
                                <MenuItem value="Active">
                                  National Bank Transfer
                                </MenuItem>
                                <MenuItem value="Active">IMPS</MenuItem>
                                <MenuItem value="Active">Paypal</MenuItem>
                                <MenuItem value="Active">Paytm</MenuItem>

                                <MenuItem value="Active">UPI</MenuItem>
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
                        <Grid item lg={4} md={4} sm={6} xs={12}>
                          <Box style={{ marginTop: "5px" }}>
                            <label>With cash</label>
                            <FormControl
                              variant="outlined"
                              // style={{ marginTop: "20px" }}
                              fullWidth
                            >
                              {/* <InputLabel margin="dense">
                                  Select Country
                                </InputLabel> */}
                              <Select
                                style={{ padding: "0px" }}
                                variant="outlined"
                                fullWidth
                                onChange={(e) => setStatus(e.target.value)}
                                value={status}
                              >
                                <MenuItem value="Block">All Payments</MenuItem>
                                <MenuItem value="Active">
                                  National Bank Transfer
                                </MenuItem>
                                <MenuItem value="Active">IMPS</MenuItem>
                                <MenuItem value="Active">Paypal</MenuItem>
                                <MenuItem value="Active">Paytm</MenuItem>

                                <MenuItem value="Active">UPI</MenuItem>
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
                        <Grid item lg={4} md={4} sm={6} xs={12}>
                          <Box>
                            <label>Margin</label>
                            <TextField
                              placeholder="0%"
                              type="text"
                              variant="outlined"
                              fullWidth
                              size="small"
                              className="textFeilds"
                              InputProps={{
                                className: classes.TextBox,
                              }}
                              value={values.address}
                              name="address"
                              error={Boolean(touched.address && errors.address)}
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
                        </Grid>{" "}
                        <Grid item lg={4} md={4} sm={6} xs={12}>
                          <Box>
                            <label>Min. order limit</label>
                            <TextField
                              placeholder="0"
                              type="text"
                              variant="outlined"
                              fullWidth
                              className="textFeilds"
                              InputProps={{
                                className: classes.TextBox,
                              }}
                              size="small"
                              value={values.address}
                              name="address"
                              error={Boolean(touched.address && errors.address)}
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
                        <Grid item lg={4} md={4} sm={6} xs={12}>
                          <Box>
                            <label>Max. order limit</label>
                            <TextField
                              placeholder="0"
                              type="text"
                              variant="outlined"
                              fullWidth
                              size="small"
                              className="textFeilds"
                              InputProps={{
                                className: classes.TextBox,
                              }}
                              value={values.address}
                              name="address"
                              error={Boolean(touched.address && errors.address)}
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
                        <Grid item lg={4} md={4} sm={6} xs={12}>
                          <Box>
                            <label>Terms of trade</label>
                            <TextField
                              placeholder="Terms of trade"
                              type="text"
                              variant="outlined"
                              fullWidth
                              size="small"
                              className="textFeilds"
                              InputProps={{
                                className: classes.TextBox,
                              }}
                              value={values.address}
                              name="address"
                              error={Boolean(touched.address && errors.address)}
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
                        <Grid item lg={4} md={4} sm={6} xs={12}>
                          <Box style={{ marginTop: "5px" }}>
                            <label>Payment method</label>
                            <FormControl
                              variant="outlined"
                              // style={{ marginTop: "20px" }}
                              fullWidth
                            >
                              {/* <InputLabel margin="dense">
                                  Select Country
                                </InputLabel> */}
                              <Select
                                style={{}}
                                variant="outlined"
                                fullWidth
                                className="textFeilds"
                                InputProps={{
                                  className: classes.TextBox,
                                }}
                                onChange={(e) => setStatus(e.target.value)}
                                value={status}
                              >
                                <MenuItem value="Block">All Payments</MenuItem>
                                <MenuItem value="Active">
                                  National Bank Transfer
                                </MenuItem>
                                <MenuItem value="Active">IMPS</MenuItem>
                                <MenuItem value="Active">Paypal</MenuItem>
                                <MenuItem value="Active">Paytm</MenuItem>

                                <MenuItem value="Active">UPI</MenuItem>
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
                        <Grid item lg={4} md={4} sm={6} xs={12}>
                          <Box>
                            <label>Set payment window</label>
                            <TextField
                              placeholder="15 min"
                              type="text"
                              variant="outlined"
                              fullWidth
                              size="small"
                              className="textFeilds"
                              InputProps={{
                                className: classes.TextBox,
                              }}
                              value={values.city}
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
                        <Grid item lg={4} md={4} sm={6} xs={12}>
                          <Box>
                            <label>Price equation</label>
                            <TextField
                              placeholder="Price Equation"
                              type="number"
                              variant="outlined"
                              fullWidth
                              size="small"
                              className="textFeilds"
                              InputProps={{
                                className: classes.TextBox,
                              }}
                              // name="countryCode"
                              value={values.countryCode}
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
                      </Grid>
                    </Box>
                  </Box>
                  <Box className={classes.secuirty}>
                    <Typography variant="h3">Security Options</Typography>
                    <Box style={{ display: "flex", marginTop: "5px" }}>
                      <Checkbox />
                      <Typography variant="h6" style={{ marginTop: "3px" }}>
                        Identified people only
                      </Typography>
                    </Box>
                    <Box style={{ display: "flex", marginTop: "5px" }}>
                      <Checkbox />
                      <Typography variant="h6" style={{ marginTop: "3px" }}>
                        SMS verification needed
                      </Typography>
                    </Box>
                  </Box>
                  <Box align="center" mt={4}>
                    <Button
                      variant="contained"
                      size="large"
                      color="secondary"
                      type="submit"
                      // fullWidth
                      disabled={loader1}
                      className={classes.updateButton}
                    >
                      Publish Advertisement
                      {loader1 && <ButtonCircularProgress />}
                    </Button>
                  </Box>
                </Form>
              )}
            </Formik>
            {/* </Grid> */}
          </Grid>
        </Box>
      </Box>
    </>
  );
}
