import React, { useState } from "react";
import {
  Button,
  Box,
  TextField,
  Grid,
  Typography,
  makeStyles,
  Container,
  FormHelperText,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
// import Page from "@component/Page";
import { Form, Formik } from "formik";
import axios from "axios";
// import ApiConfig from "../../../config/APIConfig";
import { useHistory, Link as RouterComponent } from "react-router-dom";
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
      .min(2, "Please enter atleast 2 characters")
      .max(35, "You can enter only 35 characters")
      .matches(
        /^\w+/,
        "only alphabets are allowed, whitespaces are not allowed. "
      ),
    description: yep
      .string()
      .required(" Message is required")
      .min(10, "Please enter atleast 10 characters")
      .max(350, "You can enter only 350 characters"),
  });

  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [btnText, setBtnText] = useState("SUBSCRIBE");

  const history = useHistory();

  const formInitialSchema = { email: "", firstName: "", description: "" };

  const handleFormSubmit = async (values) => {
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
        },
      });
      if (res.data.status === 200) {
        setIsLoading(false);
        setBtnText("SUBMIT");
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
      <Container>
        <Box mb={3} className="bankbox">
          <Box className={classes.customBox}>
            <Box mb={2}></Box>
            <form className="customForm" Validate autoComplete="off">
              <Box className="contactbox">
                <Typography variant="h6">News Letter</Typography>
              </Box>
              <Box>
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
                      <Grid container>
                        <Grid item xs={12} md={12}>
                          <TextField
                            label="Enter your email"
                            margin="normal"
                            size="small"
                            variant="outlined"
                            fullWidth
                            name="email"
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
                          <TextField
                            label="Enter message"
                            margin="normal"
                            size="small"
                            multiline
                            rows={8}
                            variant="outlined"
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

                        {isError && (
                          <Box py={2}>
                            <Alert severity="error">
                              {"Please fill all fields correctly."}
                            </Alert>
                          </Box>
                        )}
                      </Grid>
                      <Box mt={5}>
                        <Button
                          variant="contained"
                          className="rightButton"
                          type="submit"
                          disabled={isLoading}
                        >
                          {btnText} {isLoading && <ButtonCircularProgress />}
                        </Button>
                      </Box>
                    </Form>
                  )}
                </Formik>
              </Box>
            </form>
          </Box>
        </Box>
      </Container>
    </Page>
  );
}
