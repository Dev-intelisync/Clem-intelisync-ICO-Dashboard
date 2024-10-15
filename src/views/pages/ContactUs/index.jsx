import React, { useState } from "react";
import {
  Button,
  Box,
  TextField,
  Grid,
  Typography,
  makeStyles,
  FormControl,
  FormHelperText,
  Container,
} from "@material-ui/core";
import Page from "@component/Page";
import { Form, Formik } from "formik";
import axios from "axios";
import ApiConfig from "../../../config/APIConfig";
import { useHistory, Link } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import ReCAPTCHA from "react-google-recaptcha";

import ButtonCircularProgress from "@component/ButtonCircularProgress";
import { toast } from "react-toastify";
import * as yep from "yup";

const useStyles = makeStyles((theme) => ({
  customBox: {
    margin: 100,
    [theme.breakpoints.down("sm")]: {
      margin: 0,
    },
    [theme.breakpoints.down("xs")]: {
      margin: 0,
    },
    "& .formbox": {
      background: "transparent",
      borderRadius: "8px",
      border: "1px solid rgba(128, 128, 128, 0.22)",
      padding: "20px",
      marginTop: "100px",
    },
  },
}));

export default function AddFaq() {
  const classes = useStyles();
  const formValidationSchema = yep.object().shape({
    email: yep
      .string()
      .email("You have entered an invalid email address. Please try again")
      .required("Email address is required")
      .matches("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$"),

    firstName: yep
      .string()
      .required(" Name is required")
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
      .max(350, "You can enter only 350 characters"),
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

  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [phone, setPhone] = useState();
  const [btnText, setBtnText] = useState("SUBMIT");
  const [countryCode, setCountryCode] = useState("");
  const history = useHistory();
  const recaptchaRef = React.createRef();
  const [done, setDone] = useState(false);

  const formInitialValue = {
    email: "",
    firstName: "",
    description: "",
    phoneNo: phone,
  };

  const handleFormSubmit = async (values, resetForm) => {
    setIsLoading(true);

    setBtnText("Sending...");
    try {
      const res = await axios({
        method: "POST",
        url: ApiConfig.contactUS,
        data: {
          email: values.email,
          description: values.description,
          firstName: values.firstName,
          phoneNo: values.phoneNo.slice(countryCode?.length),
        },
      });
      if (res.data.status === 200) {
        setIsLoading(false);
        setBtnText("SUBMIT");
        resetForm({ values: "" });
        toast.success("Your request has been sent successfully");
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      toast.error(error.message);
      setBtnText("SUBMIT");
    }
  };
  return (
    <Page title="Contact Us">
      <Container maxWidth="md">
        <Box mb={3} className="bankbox">
          <Box className={classes.customBox}>
            <Box mb={2}></Box>
            <Box className="formbox">
              <Box className="contactbox">
                <Typography variant="h3">Contact Us</Typography>
              </Box>
              <Box>
                <Formik
                  initialValues={formInitialValue}
                  initialStatus={{
                    success: false,
                    successMsg: "",
                  }}
                  validationSchema={formValidationSchema}
                  onSubmit={(values, { resetForm }) =>
                    handleFormSubmit(values, resetForm)
                  }
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
                      <Grid container>
                        <Grid item xs={12} md={12}>
                          <label>Name*</label>
                          <TextField
                            placeholder="Enter your name"
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
                          />
                          <FormHelperText
                            error
                            style={{ margin: "0px", fontSize: "12px" }}
                          >
                            {touched.firstName && errors.firstName}
                          </FormHelperText>
                        </Grid>
                        <Grid item xs={12} md={12}>
                          <label>Email*</label>
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
                          />
                          <FormHelperText
                            error
                            style={{ margin: "0px", fontSize: "12px" }}
                          >
                            {touched.email && errors.email}
                          </FormHelperText>
                        </Grid>
                        <Grid item xs={12} md={12}>
                          <FormControl style={{ marginTop: "3px" }}>
                            <label style={{ marginBottom: "10px" }}>
                              Mobile Number*
                            </label>
                            <PhoneInput
                              country={"us"}
                              name="phoneNo"
                              inputStyle={{
                                background: "transparent",
                                width: "100%",
                                color: "#848484",
                                border: "1px solid #848484",
                                height: "37px",
                                marginTop: "5px",
                              }}
                              value={values.phoneNo}
                              error={Boolean(touched.phoneNo && errors.phoneNo)}
                              onBlur={handleBlur}
                              onChange={(phone, e) => {
                                setCountryCode(e.dialCode);
                                setFieldValue("phoneNo", phone);
                              }}
                            />
                            <FormHelperText
                              error
                              style={{ margin: "0px", fontSize: "12px" }}
                            >
                              {touched.phoneNo && errors.phoneNo}
                            </FormHelperText>
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} md={12}>
                          <label>Message*</label>
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
                          />
                          <FormHelperText
                            error
                            style={{ margin: "0px", fontSize: "12px" }}
                          >
                            {touched.description && errors.description}
                          </FormHelperText>
                        </Grid>
                      </Grid>
                      <Box mt={2} style={{ width: "100%" }}>
                        <form
                          onSubmit={() => {
                            recaptchaRef.current.execute();
                          }}
                        >
                          <ReCAPTCHA
                            // ref={recaptchaRef}
                            checked={done}
                            // size="invisible"
                            // size="invisible"
                            // originsitekey 6Lc2nUIgAAAAAHhIawk-yJCvv4wIUcYZiE1gFlc3
                            // sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                            // sitekey="6Lfv2toiAAAAAJdn6r5LY29svYG9NyXelaoTThpQ"
                            sitekey="6Le-udsiAAAAAO7ZwZNaOCclOD6Ef2ulCQxEyzj2"
                            secretkey="6Le-udsiAAAAAMMUzQOPMtG6Kcd6Phm3VFR-fbk_"
                            onChange={() => setDone(true)}
                          />
                        </form>
                      </Box>
                      <Box mt={2}>
                        <Button
                          variant="contained"
                          style={{ padding: "13px 30px" }}
                          color="secondary"
                          type="submit"
                          disabled={!done || isLoading}
                        >
                          {btnText} {isLoading && <ButtonCircularProgress />}
                        </Button>
                      </Box>
                    </Form>
                  )}
                </Formik>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </Page>
  );
}
