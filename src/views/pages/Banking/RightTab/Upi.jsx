import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  FormHelperText,
  Select,
  MenuItem,
} from "@material-ui/core";
import * as yep from "yup";

import { makeStyles } from "@material-ui/core";

import { Form, Formik } from "formik";

import ButtonCircularProgress from "@component/ButtonCircularProgress";

const useStyles = makeStyles((theme) => ({
  addresbox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "30%",
    "& img": {
      width: "30%",
    },
  },
  addBtn: {
    color: "white",
    borderRadius: "8px",
    padding: "10px 25px !important",
    margin: "5px",
    fontSize: "14px",
    background:
      "linear-gradient(180deg, #00ACEB 0%, #00B0ED 10.18%, #1069C2 70.35%, #1069C2 100%)",
    boxShadow: " 0px 13px 27px rgb(0 0 0 / 25%)",
  },
  field: {
    "& input": {
      backgroundColor: theme.palette.background.darkgrey,
      padding: "19px 12px 17px",
      fontSize: "13px",
      fontWeight: "400",
    },
    width: "100%",
    maxWidth: "100%",
    marginTop: "0px",
    marginBottom: "0px",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      maxWidth: "100%",
    },
  },
  headbox: {
    "& h6": {
      color: theme.palette.text.primary,
      marginTop: "10px",
      fontSize: "14px",
      fontWeight: "300",
    },
    "& h5": {
      fontSize: "16px",
      fontWeight: "500",
    },
  },
}));

const formValidationSchema = yep.object().shape({
  accountHolderName: yep
    .string()
    .required("Account holder name is required")
    .max(25, "Too long")
    .matches(
      /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/,
      "Only alphabets and whitespaces are allowed for this field number are not. "
    ),

  upiId: yep
    .string()
    .required("ID is required")
    .matches(
      /^[\w.-]+@[\w.-]+$/,
      "upiId must match the following: rishi21@pnb"
    ),
});

const formInitialSchema = {
  accountHolderName: "",
  upiId: "",
};
function Upi({ addUPIHAndler, isLoading, setupiStatus, roleupiStatus }) {
  const classes = useStyles();
  const [roleUpiStatus, setUpiStatus] = useState("google");

  return (
    <>
      <Formik
        initialValues={formInitialSchema}
        initialStatus={{
          success: false,
          successMsg: "",
        }}
        validationSchema={formValidationSchema}
        onSubmit={(values, { resetForm }) => {
          addUPIHAndler(values);
          resetForm();
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
          <Form>
            <Box className={classes.maincontainer}>
              <Box className={classes.headbox}>
                <Box pt={3} pb={1}>
                  <Typography variant="h5">Select</Typography>
                </Box>
                <Select
                  variant="outlined"
                  fullWidth
                  value={roleupiStatus}
                  onChange={(e) => setupiStatus(e.target.value)}
                >
                  <MenuItem value="GPAY">GOOGLE PAY</MenuItem>
                  <MenuItem value="APPLE">APPLE PAY</MenuItem>
                  <MenuItem value="UPI">UPI ID</MenuItem>
                </Select>

                <Box className={classes.box}>
                  <Box pt={3} pb={1}>
                    <Typography variant="h5">
                      {roleupiStatus === "GPAY" ? "Google Pay" : ""}
                      {roleupiStatus === "APPLE" ? "Apple Pay" : ""}{" "}
                      {roleupiStatus === "UPI" ? "UPI ID" : ""}
                    </Typography>
                  </Box>
                  <TextField
                    variant="outlined"
                    fullWidth
                    className={classes.field}
                    name="upiId"
                    type="text"
                    step="any"
                    error={Boolean(touched.upiId && errors.upiId)}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.upiId}
                    disabled={isLoading}
                  />
                  <FormHelperText error>
                    {touched.upiId && errors.upiId}
                  </FormHelperText>
                </Box>
                <Box className={classes.box}>
                  <Box pt={3} pb={1}>
                    <Typography variant="h5">Account Holder Name</Typography>
                  </Box>
                  <TextField
                    variant="outlined"
                    fullWidth
                    className={classes.field}
                    name="accountHolderName"
                    type="text"
                    error={Boolean(
                      touched.accountHolderName && errors.accountHolderName
                    )}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.accountHolderName}
                    disabled={isLoading}
                  />
                  <FormHelperText error>
                    {touched.accountHolderName && errors.accountHolderName}
                  </FormHelperText>
                </Box>

                <Box pt={1}>
                  <Typography variant="h6">
                    Third-party accounts will be rejected.
                  </Typography>
                </Box>
              </Box>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                mt={6}
              >
                <Button
                  disabled={isLoading}
                  className={classes.addBtn}
                  size="large"
                  type="submit"
                >
                  Add Account {isLoading && <ButtonCircularProgress />}
                </Button>
              </Box>
            </Box>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default Upi;
