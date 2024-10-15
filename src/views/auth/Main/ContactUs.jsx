import React, { useState, useRef } from "react";
import {
  Button,
  Box,
  TextField,
  Grid,
  Typography,
  makeStyles,
  FormHelperText,
  Container,
  IconButton,
} from "@material-ui/core";
import Page from "@component/Page";
import { Form, Formik } from "formik";
import axios from "axios";
import ApiConfig from "../../../config/APIConfig";
import { useHistory, Link } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import ReCAPTCHA from "react-google-recaptcha";
import Nav from "./nav";
import Footer from "./footer";
import ButtonCircularProgress from "@component/ButtonCircularProgress";
import { toast } from "react-toastify";
import * as yep from "yup";

const useStyles = makeStyles((theme) => ({
  customBox: {
    "& label": {
      color: theme.palette.text.primary,
    },
    "& h3": {
      fontFamily: "Inter",
      fontStyle: "normal",
      fontWeight: "700",
      fontSize: "36px",
      lineHeight: "54px",
      color: "#6A36FF",
    },
    [theme.breakpoints.down("sm")]: {
      margin: 0,
    },
    [theme.breakpoints.down("xs")]: {
      margin: 0,
    },
    "& .formbox": {
      background: "rgba(255, 255, 255, 0.8)",
      borderRadius: "33px",
      border: "1px solid rgba(255, 255, 255, 0.8)",
      padding: "43px",
    },
  },
  contactbox: {
    display: "flex",
    alignItems: "center",
  },

  subTitle: {
    fontFamily: "Inter",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "24px",
    lineHeight: "36px",
    color: "#1E1E1E",
  },

  binsc: {
    padding: "0px",
  },
  contactMain: {
    background: "#fff",
    paddingTop: "136px",
    paddingBottom: "50px",
  },
  inputField: {
    background: "#FFFFFF",
    borderRadius: "10px",
    "& div": {
      height: "55px",
    },
  },
  inputFieldDes: {
    background: "#FFFFFF",
    borderRadius: "10px",
  },
  submitBtn: {
    padding: "8px 30px",
    background: "#56CA00",
    borderRadius: "10px",
    fontFamily: "Inter",
    fontWeight: "700 !important",
    fontSize: "24px",
    lineHeight: "36px",
    color: "#FFFFFF",
    "@media (max-width: 916px)": {
      margin: "0 3.2rem",
      fontSize: "20px",
    },
  },

  submitBtnBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "& .MuiBox-root-72": {
      textAlign: "center !important",
    },
  },
  imageDiv: {
    paddingTop: "93px",
  },
}));

export default function ContactUsForm() {
  const classes = useStyles();
  const formValidationSchema = yep.object().shape({
    email: yep
      .string()
      .email("You have entered an invalid email address. Please try again")
      .required("Email address is required")
      .matches("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$"),

    firstName: yep
      .string()
      .required(" First name is required")
      .min(2, "Please enter at least 2 characters")
      .max(35, "You can enter only 35 characters")
      .matches(
        /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/,
        "Only alphabets and white spaces are allowed for this field number are not. "
      ),
    last: yep
      .string()
      .required(" Last name is required")
      .min(2, "Please enter at least 2 characters")
      .max(35, "You can enter only 35 characters")
      .matches(
        /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/,
        "Only alphabets and white spaces are allowed for this field number are not. "
      ),
    description: yep
      .string()
      .required(" Message is required")
      .min(10, "Please enter at least 10 characters")
      .max(260, "You can enter only 350 characters"),
    phoneNo: yep
      .string()
      .required("Mobile number is required")
      .matches(
        /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,
        "Must be a valid mobile"
      )
      .max(13, "Should not exceeds 13 digits")
      .min(9, "Must be only 9 digits"),
  });

  const [isLoading, setIsLoading] = useState(false);
  const [phone, setPhone] = useState();
  const [btnText, setBtnText] = useState("Submit");
  const [countryCode, setCountryCode] = useState("");
  const history = useHistory();
  const recaptchaRef = React.createRef();
  const [done, setDone] = useState(false);

  const formInitialValue = {
    email: "",
    firstName: "",
    description: "",
    phoneNo: phone,
    last: "",
  };

  const handleFormSubmit = async (values) => {
    setIsLoading(true);

    setBtnText("Sending...");
    try {
      const res = await axios({
        method: "POST",
        url: ApiConfig.contactUS,
        data: {
          email: values.email,
          message: values.description,
          firstName: values.firstName,
          lastName: values.last,
          mobileNumber: values.phoneNo.slice(countryCode?.length),
        },
      });
      if (res.data.responseCode === 200) {
        setIsLoading(false);
        setBtnText("Submit");
        // resetForm({ values: "" });
        toast.success(
          "Your request has been sent successfully. We will get back to you soon."
        );
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      toast.error(error.message);
      setBtnText("Submit");
    }
  };
  const refs = {
    home: useRef(null),
    about: useRef(null),
    features: useRef(null),
    faq: useRef(null),
    roadmap: useRef(null),
    contact: useRef(null),
  };
  const onButtonClick = (abc) => {
    history.push("/");
    // console.log(abc);
    // const data = refs[abc].current;
    // console.log(data);
    window.scrollTo({
      top: refs[abc].current?.offsetTop,
      left: 0,
      behavior: "smooth",
    });
  };
  return (
    <Page title="Contact Us">
      <Nav buttonClick={onButtonClick} />
      <Box className={classes.contactMain}>
        <Container>
          <Grid container spacing={2}>
            <Grid
              item
              xs={12}
              sm={12}
              md={6}
              lg={6}
              className={classes.gridImageBox}
            >
              <Box className={classes.imageDiv}>
                <img src="images/getInTouchBg.svg" alt="getInTouchBg" />
              </Box>
              {/* <Box style={{ maxWidth: "500px" }}>
                <img src="/images/contactside1.png" alt="" width="100%" />
              </Box> */}
            </Grid>

            <Grid item xs={12} sm={12} md={6} lg={6}>
              <Box className="bankbox">
                <Box className={classes.customBox}>
                  <Box className="formbox">
                    <Box className="contactbox">
                      <Typography variant="h3" className={classes.title}>
                        Get In Touch
                      </Typography>
                    </Box>
                    <Box mb={2}>
                      <Typography variant="body2" className={classes.subTitle}>
                        We are here for you. How can we help?
                      </Typography>
                    </Box>
                    <Box>
                      <Formik
                        initialValues={formInitialValue}
                        initialStatus={{
                          success: false,
                          successMsg: "",
                        }}
                        validationSchema={formValidationSchema}
                        onSubmit={(values, { resetForm }) => {
                          handleFormSubmit(values);
                          resetForm();
                        }}
                        // onSubmit={(values, { resetForm }) => {
                        //   resetPaswordHandler(values);
                        //   resetForm();
                        // }}
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
                            <Grid container spacing={2}>
                              <Grid item xs={12} md={6}>
                                <TextField
                                  placeholder="Enter your first name"
                                  type="text"
                                  size="small"
                                  variant="outlined"
                                  fullWidth
                                  name="firstName"
                                  value={values.firstName}
                                  error={Boolean(
                                    touched.firstName && errors.firstName
                                  )}
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  className={classes.inputField}
                                  inputProps={{ maxLength: 35 }}
                                />
                                <FormHelperText
                                  error
                                  style={{ margin: "0px", fontSize: "12px" }}
                                >
                                  {touched.firstName && errors.firstName}
                                </FormHelperText>
                              </Grid>
                              <Grid item xs={12} md={6}>
                                <TextField
                                  placeholder="Enter your last name"
                                  type="text"
                                  variant="outlined"
                                  fullWidth
                                  name="last"
                                  size="small"
                                  value={values.last}
                                  error={Boolean(touched.last && errors.last)}
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  className={classes.inputField}
                                  inputProps={{ maxLength: 35 }}
                                />
                                <FormHelperText
                                  error
                                  style={{ margin: "0px", fontSize: "12px" }}
                                >
                                  {touched.last && errors.last}
                                </FormHelperText>
                              </Grid>

                              <Grid item xs={12}>
                                <TextField
                                  placeholder="Enter mobile number"
                                  type="number"
                                  variant="outlined"
                                  fullWidth
                                  name="phoneNo"
                                  size="small"
                                  value={values.phoneNo}
                                  error={Boolean(
                                    touched.phoneNo && errors.phoneNo
                                  )}
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  className={classes.inputField}
                                  inputProps={{ maxLength: 13 }}
                                />
                                <FormHelperText
                                  error
                                  style={{ margin: "0px", fontSize: "12px" }}
                                >
                                  {touched.phoneNo && errors.phoneNo}
                                </FormHelperText>
                              </Grid>
                              <Grid item xs={12}>
                                <TextField
                                  placeholder="Enter your email"
                                  type="text"
                                  variant="outlined"
                                  fullWidth
                                  name="email"
                                  size="small"
                                  value={values.email}
                                  error={Boolean(touched.email && errors.email)}
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  className={classes.inputField}
                                  inputProps={{ maxLength: 35 }}
                                />
                                <FormHelperText
                                  error
                                  style={{ margin: "0px", fontSize: "12px" }}
                                >
                                  {touched.email && errors.email}
                                </FormHelperText>
                              </Grid>

                              <Grid item xs={12} md={12}>
                                <TextField
                                  placeholder="Enter your message"
                                  type="text"
                                  size="small"
                                  variant="outlined"
                                  rows={5}
                                  multiline
                                  fullWidth
                                  name="description"
                                  value={values.message}
                                  error={Boolean(
                                    touched.description && errors.description
                                  )}
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  className={classes.inputFieldDes}
                                  InputProps={{
                                    className: classes.binsc,
                                  }}
                                />
                                <FormHelperText
                                  error
                                  style={{ margin: "0px", fontSize: "12px" }}
                                >
                                  {touched.description && errors.description}
                                </FormHelperText>
                              </Grid>
                            </Grid>

                            <Box mt={2} className={classes.submitBtnBox}>
                              <Button
                                className={classes.submitBtn}
                                variant="contained"
                                type="submit"
                              >
                                {btnText}{" "}
                                {isLoading && <ButtonCircularProgress />}
                              </Button>
                            </Box>
                          </Form>
                        )}
                      </Formik>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Footer />
    </Page>
  );
}
