import React, { useState, useEffect } from "react";
import BankDetail from "@component/BankDetail";
import {
  Button,
  Grid,
  Box,
  TextField,
  FormHelperText,
} from "@material-ui/core";
import Page from "@component/Page";
import { useHistory, Link as RouterLink } from "react-router-dom";

import { FaPlus, FaSearch } from "react-icons/fa";
import { makeStyles, Dialog } from "@material-ui/core";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Form, Formik } from "formik";
import * as yep from "yup";
import ButtonCircularProgress from "@component/ButtonCircularProgress";
import Axios from "axios";
import ApiConfig from "../../../config/APIConfig";
import { toast } from "react-toastify";
import NoDataFound from "../../../component/DataNotFound";
import moment from "moment";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingRight: 0,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
  inputAdornment: {
    background: "#FDB95A",
    height: 40,
    maxHeight: 40,
    paddingRight: 10,
    paddingLeft: 10,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
}));

export default function BankDetails() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoader, setIsLoader] = useState(false);
  const [phone, setPhone] = useState();
  const [Countrylist, setCountrylist] = useState();
  const [countryCode, setCountryCode] = useState("");

  const [bankData, setBnakData] = useState([]);
  const [bankDataList, setBnakDataList] = useState([]);
  const [filterData, setFilterData] = useState({
    toDate: "",
    fromDate: "",
    search: "",
  });
  const [fireSearch, setFireSearch] = useState(false);
  const _onInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const temp = { ...filterData, [name]: value };

    setFilterData(temp);
  };
  const history = useHistory();

  // useEffect(() => {
  //   if (!window.localStorage.getItem("token")) {
  //     history.push("/login");
  //   }
  // }, [window.localStorage.getItem("token")]);
  const handleClose = () => {
    setOpen(false);
  };

  const submitHandler = () => {
    setIsSubmit(true);
  };
  const formInitialSchema = {
    name: "",
    accountNumber: "",
    contactNo: phone,
    swiftNumber: "",
    ibanNumber: "",
    bankName: "",
  };
  const formValidationSchema = yep.object().shape({
    name: yep
      .string()

      .required("Please enter account holder name")
      .min(5, "Please enter atleast 5 characters")
      .max(35, "You can enter only 35 characters")
      .matches(/^^[a-zA-Z ]*$/, "Only alphabets are allowed for this field . "),
    accountNumber: yep
      .string()
      .required("Account number is required")
      .matches(/^[0-9]*$/, "Must be a valid number")
      .min(10, "Must be 10 digits"),
    bankName: yep.string().required("Bank name is required"),

    contactNo: yep
      .string()
      .required("Mobile number is required")
      .matches(
        /^(?:(?:\+|0{0,2})91(\s*|[\-])?|[0]?)?([6789]\d{2}([ -]?)\d{3}([ -]?)\d{4})$/,
        "Must be a valid mobilie"
      ),
    swiftNumber: yep
      .string()
      .required("Swift number is required")
      .matches(/^[0-9a-zA-Z]+$/, "Must be a valid valid number")
      .min(10, "Must be 10 digits"),
    ibanNumber: yep
      .string()
      .required("IBAN number is required")
      .matches(/^[0-9a-zA-Z]+$/, "Must be a valid valid number")
      .min(10, "Must be 10 digits"),
  });
  const handleFormSubmit = async (values) => {
    setIsLoading(true);
    try {
      const res = await Axios({
        method: "POST",
        url: ApiConfig.userBankAccount,
        headers: {
          token: window.sessionStorage.getItem("token"),
        },
        data: {
          accountHolderName: values.name,
          accountNo: values.accountNumber,
          contactNo: values?.contactNo?.toString(),
          ibanNo: values.ibanNumber,
          swiftNo: values.swiftNumber,
          bankName: values.bankName,
        },
      });
      if (res.data.status === 200) {
        getUserBankList();
        toast.success("Bank Details Added Successfully");
        setIsLoading(false);
        setOpen(false);
      }
    } catch (error) {
      setIsLoading(false);
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
      }
    }
  };

  const getUserBankList = async (filter) => {
    setBnakDataList([]);
    setIsLoader(true);

    try {
      const res = await Axios.get(ApiConfig.userAccountList, {
        headers: {
          token: window.sessionStorage.getItem("token"),
        },
        data: {
          fromDate: filter?.fromDate ? moment(filter?.fromDate).format() : null,
          search: filter?.search ? filter?.search : null,
          toDate: filter?.toDate ? moment(filter?.toDate).format() : null,
        },
      });
      if (res.data.status === 200) {
        setBnakDataList(res.data.data);

        setIsLoader(false);
        setFireSearch(false);
      } else if (res.data.status === 201) {
        setIsLoader(false);
      }
    } catch (error) {
      setIsLoader(false);
    }
  };
  useEffect(() => {
    getUserBankList();
  }, []);
  const clearSearchFilter = () => {
    setFilterData({
      toDate: "",
      fromDate: "",
      search: "",
    });
    setFireSearch(false);
  };

  useEffect(() => {
    if (
      filterData.fromDate !== "" ||
      filterData.toDate !== "" ||
      filterData.search !== ""
    ) {
      // if (fireSearch) {
      getUserBankList(filterData);
      // }
    }
  }, [filterData, fireSearch]);

  return (
    <Page title="Bank Details">
      <Box mb={3} className="bankbox">
        <Box mt={5}>
          <Grid container>
            <Grid item xs={12} md={2}>
              <Button
                style={{
                  border: "1px dashed #fff",
                  borderRadius: 10,
                  paddingLeft: 15,
                  paddingRight: 15,
                  marginBottom: 10,
                }}
                onClick={() => setOpen(true)}
              >
                <FaPlus color="#00e0b0" />
                &nbsp;&nbsp;Add Bank
              </Button>
            </Grid>
          </Grid>
        </Box>
        <Box mt={7}>
          <Grid container spacing={4}>
            {bankDataList?.map((data, i) => {
              return (
                <Grid item xs={12} sm={6} md={4} key={i}>
                  <BankDetail
                    data={data}
                    getUserBankList={() => getUserBankList()}
                    index={i}
                  />
                </Grid>
              );
            })}
            {!isLoader && bankDataList && bankDataList.length === 0 && (
              <NoDataFound />
            )}
            {isLoader && <ButtonCircularProgress />}
          </Grid>
        </Box>
      </Box>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle id="form-dialog-title">Add Bank</DialogTitle>
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
              <DialogContent>
                <TextField
                  label="Account Holder Name"
                  margin="normal"
                  size="small"
                  variant="outlined"
                  fullWidth
                  name="name"
                  value={values.accountHolderName}
                  error={Boolean(touched.name && errors.name)}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                <FormHelperText error style={{ marginTop: "-6px" }}>
                  {touched.name && errors.name}
                </FormHelperText>
                <TextField
                  label="Account Number"
                  margin="normal"
                  size="small"
                  variant="outlined"
                  fullWidth
                  type="number"
                  name="accountNumber"
                  value={values.accountNumber}
                  error={Boolean(touched.accountNumber && errors.accountNumber)}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  onKeyPress={(event) => {
                    if (event?.key === "-" || event?.key === "+") {
                      event.preventDefault();
                    }
                  }}
                />
                <FormHelperText error style={{ marginTop: "-6px" }}>
                  {touched.accountNumber && errors.accountNumber}
                </FormHelperText>
                {/* <TextField
                  label="Contact Number"
                  margin="normal"
                  size="small"
                  variant="outlined"
                  fullWidth
                  type="number"
                  name="contactNumber"
                  value={values.contactNumber}
                  error={Boolean(touched.contactNumber && errors.contactNumber)}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  onKeyPress={(event) => {
                    if (event?.key === "-" || event?.key === "+") {
                      event.preventDefault();
                    }
                  }}
                />
                <FormHelperText error style={{ marginTop: "-6px" }}>
                  {touched.contactNumber && errors.contactNumber}
                </FormHelperText> */}

                <Box style={{ marginTop: "1rem" }}>
                  <PhoneInput
                    country={"us"}
                    name="contactNo"
                    inputStyle={{
                      background: "transparent",
                      width: "100%",
                      color: "#848484",
                      border: "1px solid #848484",
                      height: "37px",
                      marginTop: "5px",
                    }}
                    value={values.contactNo}
                    error={Boolean(touched.contactNo && errors.contactNo)}
                    onBlur={handleBlur}
                    onChange={(phone, e) => {
                      setCountryCode(e.dialCode);
                      setFieldValue("contactNo", phone);
                    }}
                  />
                  <FormHelperText
                    error
                    style={{ margin: "0px", fontSize: "12px" }}
                  >
                    {touched.contactNo && errors.contactNo}
                  </FormHelperText>
                </Box>

                <TextField
                  label="SWIFT Number"
                  margin="normal"
                  size="small"
                  variant="outlined"
                  fullWidth
                  name="swiftNumber"
                  value={values.swiftNumber}
                  error={Boolean(touched.swiftNumber && errors.swiftNumber)}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  onKeyPress={(event) => {
                    if (event?.key === "-" || event?.key === "+") {
                      event.preventDefault();
                    }
                  }}
                />
                <FormHelperText error style={{ marginTop: "-6px" }}>
                  {touched.swiftNumber && errors.swiftNumber}
                </FormHelperText>
                <TextField
                  label="IBAN Number"
                  margin="normal"
                  size="small"
                  variant="outlined"
                  fullWidth
                  name="ibanNumber"
                  value={values.ibanNumber}
                  error={Boolean(touched.ibanNumber && errors.ibanNumber)}
                  onBlur={handleBlur}
                  onKeyPress={(event) => {
                    if (event?.key === "-" || event?.key === "+") {
                      event.preventDefault();
                    }
                  }}
                  onChange={handleChange}
                />
                <FormHelperText error style={{ marginTop: "-6px" }}>
                  {touched.ibanNumber && errors.ibanNumber}
                </FormHelperText>
                <TextField
                  label="Bank Name"
                  margin="normal"
                  size="small"
                  variant="outlined"
                  fullWidth
                  name="bankName"
                  value={values.bankName}
                  error={Boolean(touched.bankName && errors.bankName)}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                <FormHelperText error style={{ marginTop: "-6px" }}>
                  {touched.bankName && errors.bankName}
                </FormHelperText>
              </DialogContent>
              <DialogActions>
                <Button
                  variant="contained"
                  onClick={handleClose}
                  style={{ padding: "6px 20px" }}
                >
                  Close
                </Button>

                <Button
                  variant="containedPrimary"
                  style={{ padding: "5px 20px", textTransform: "capitalize" }}
                  type="submit"
                  disabled={isLoading}
                >
                  Save
                  {isLoading && <ButtonCircularProgress />}
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </Dialog>
    </Page>
  );
}
