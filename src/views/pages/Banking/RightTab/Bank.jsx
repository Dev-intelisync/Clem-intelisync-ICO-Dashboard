import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  FormHelperText,
  MenuItem,
  Select,
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core";
import Axios from "axios";
// import ApiConfig from "../../../config/APIConfig";
import { Form, Formik } from "formik";
import * as yep from "yup";
import { toast } from "react-toastify";
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
    .required("Account name is required")
    .min(2, "Please enter at least 2 characters")
    .max(35, "You can enter only 35 characters")
    .matches(
      /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/,
      "Only alphabets and whitespaces are allowed for this field number are not. "
    ),

  accountNo: yep
    .string()

    .required("Account number is required")
    .max(14, "You can enter only 14 digit")
    .matches(/^[0-9]{7,14}$/, "Account No must match the following: 0-9, 7,14"),

  // password: yep
  // .string()
  // .required("Password is required")
  // .matches(
  //   /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
  // ),

  bankName: yep
    .string()
    .required("Bank name is required")
    .max(25, "Too long")
    .matches(
      /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/,
      "Only alphabets and whitespaces are allowed for this field number are not. "
    ),
  ifscCode: yep.string().required(" Code is required."),
  // .matches(
  //   /^[A-Z]{4}0[A-Z0-9]{6}$/,
  //   "the first four characters should be upper case alphabets"
  // ),
  Address: yep.string().required(" Bank address is required."),

  // .max(12, "Too long"),
});

const formInitialSchema = {
  accountHolderName: "",
  accountNo: "",
  bankName: "",
  ifscCode: "",
  Swift: "",
  Address: "",
  bankCode: "",
};
function Bank({ addBankHandler, isLoading, roleBankStatus, setBankStatus }) {
  const classes = useStyles();

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
          addBankHandler(values);
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
            <Box className={classes.headbox}>
              <Box className={classes.box}>
                <Box pt={3} pb={1}>
                  <Typography variant="h5">Account Name</Typography>
                </Box>
                <TextField
                  //   placeholder="First Name"
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
                  disabled={isLoading}
                  value={values.accountHolderName}
                />
                <FormHelperText error>
                  {touched.accountHolderName && errors.accountHolderName}
                </FormHelperText>
              </Box>
              <Box>
                <Box pt={3} pb={1}>
                  <Typography variant="h5">Account Number</Typography>
                </Box>
                <TextField
                  //   placeholder="First Name"
                  variant="outlined"
                  fullWidth
                  className={classes.field}
                  name="accountNo"
                  type="number"
                  step="any"
                  error={Boolean(touched.accountNo && errors.accountNo)}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.accountNo}
                  disabled={isLoading}
                />
                <FormHelperText error>
                  {touched.accountNo && errors.accountNo}
                </FormHelperText>
              </Box>
              <Box className={classes.box}>
                <Box pt={3} pb={1}>
                  <Typography variant="h5">Select</Typography>
                </Box>
                <Select
                  variant="outlined"
                  fullWidth
                  value={roleBankStatus}
                  onChange={(e) => setBankStatus(e.target.value)}
                >
                  <MenuItem value="IFSC">IFSC</MenuItem>
                  <MenuItem value="MICR">MICR</MenuItem>
                  <MenuItem value="SHORTCODE">SORT CODE</MenuItem>
                </Select>
                <Box pt={3} pb={1}>
                  <Typography variant="h5">
                    {roleBankStatus === "IFSC" ? "IFSC" : ""}
                    {roleBankStatus === "MICR" ? "MICR" : ""}{" "}
                    {roleBankStatus === "SHORTCODE" ? "Sort" : ""} Code
                  </Typography>
                </Box>
                <TextField
                  //   placeholder="First Name"
                  variant="outlined"
                  fullWidth
                  className={classes.field}
                  name="ifscCode"
                  step="any"
                  type="text"
                  value={values.ifscCode}
                  error={Boolean(touched.ifscCode && errors.ifscCode)}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  disabled={isLoading}
                />
                <FormHelperText error>
                  {touched.ifscCode && errors.ifscCode}
                </FormHelperText>{" "}
                {/* <Box pt={3} pb={1}>
                  <Typography variant="h5">IFSC / MICR / Sort Code</Typography>
                </Box>
                <TextField
                  //   placeholder="First Name"
                  variant="outlined"
                  fullWidth
                  className={classes.field}
                  name="ifscCode"
                  step="any"
                  type="text"
                  value={values.ifscCode}
                  error={Boolean(touched.ifscCode && errors.ifscCode)}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  disabled={isLoading}
                />
                <FormHelperText error>
                  {touched.ifscCode && errors.ifscCode}
                </FormHelperText> */}
              </Box>
              <Box className={classes.box}>
                <Box pt={3} pb={1}>
                  <Typography variant="h5">Swift Code</Typography>
                </Box>
                <TextField
                  //   placeholder="First Name"
                  variant="outlined"
                  fullWidth
                  className={classes.field}
                  name="Swift"
                  type="text"
                  error={Boolean(touched.Swift && errors.Swift)}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  disabled={isLoading}
                  value={values.Swift}
                />
                <FormHelperText error>
                  {touched.Swift && errors.Swift}
                </FormHelperText>
              </Box>

              <Box className={classes.box}>
                <Box pt={3} pb={1}>
                  <Typography variant="h5">Bank Name</Typography>
                </Box>
                <TextField
                  //   placeholder="First Name"
                  variant="outlined"
                  fullWidth
                  className={classes.field}
                  name="bankName"
                  type="text"
                  error={Boolean(touched.bankName && errors.bankName)}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  disabled={isLoading}
                  value={values.bankName}
                />
                <FormHelperText error>
                  {touched.bankName && errors.bankName}
                </FormHelperText>
              </Box>

              <Box className={classes.box}>
                <Box pt={3} pb={1}>
                  <Typography variant="h5">Bank Address</Typography>
                </Box>
                <TextField
                  //   placeholder="First Name"
                  variant="outlined"
                  fullWidth
                  className={classes.field}
                  name="Address"
                  type="text"
                  error={Boolean(touched.Address && errors.Address)}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  disabled={isLoading}
                  value={values.Address}
                />
                <FormHelperText error>
                  {touched.Address && errors.Address}
                </FormHelperText>
              </Box>
              <Box>
                <Typography variant="h6">
                  Third-party accounts will be rejected.
                </Typography>
              </Box>

              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                mt={6}
              >
                <Button
                  disabled={isLoading}
                  type="submit"
                  className={classes.addBtn}
                  size="large"
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

export default Bank;
