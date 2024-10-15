import React, { useState, useEffect, useContext } from "react";
import {
  Button,
  Box,
  Typography,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Link,
  FormControlLabel,
  Checkbox,
  FormHelperText,
  makeStyles,
} from "@material-ui/core";
import "react-dropzone-uploader/dist/styles.css";
import InformationDialog from "@component/InformationDialog";
import axios from "axios";
import Dropzone from "react-dropzone-uploader";
import Alert from "@material-ui/lab/Alert";
import { useHistory } from "react-router-dom";
import { FaRegCheckCircle } from "react-icons/fa";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import * as yep from "yup";
import { Form, Formik } from "formik";
import Axios from "axios";
import ApiConfig from "../../../config/APIConfig";
import { toast } from "react-toastify";
import ButtonCircularProgress from "@component/ButtonCircularProgress";
import { AuthContext } from "@context/Auth";

const useStyles = makeStyles((theme) => ({
  textSection: {
    "& input": {
      "& p": {
        marginLeft: "0px !important",
      },
    },
  },
  mainsec: {
    "@media(max-width:600px)": {
      marginTop: "-164px",
      zIndex: "1",
      paddingBottom: "85px",
    },
  },
}));

export function GetStepContent({ stepIndex, handleBack, handleNext }) {
  const classes = useStyles();
  const history = useHistory();
  const [isSubmit, setIsSubmit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [checked, setChecked] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [loader, setLoader] = useState(false);
  const [terms, setTerms] = useState();
  const [countryCode, setCountryCode] = useState("");
  const [phone, setPhone] = useState();
  const [btnText, setBtnText] = useState("NEXT");
  const [countries, setCountries] = useState();
  const [states, setStates] = useState([]);
  const [showStates, setShowStates] = useState([]);
  const auth = useContext(AuthContext);
  const data = auth?.userData ? auth?.userData : "";
  const [imageFront, setImageFront] = useState("");
  const [imageBack, setBackImage] = useState("");

  const confirmationHandler = () => {
    setConfirmOpen(false);
  };
  const [formData, setFormData] = React.useState({
    documentId: "",
    documentNumber: "",
    docName: "",
    tokenDecimal: "",
    toToken: "",
    tokenValue: "",
    balance: "",
    pullRunningTime: "",
    maxLiquidityETH: "",
    docIdNumber: "",
  });

  const _onInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const temp = { ...formData, [name]: value };
    setFormData(temp);
  };

  const clearFormData = () => {
    setFormData({
      documentId: "",
      docIdNumber: "",
      documentNumber: "",
      docName: "",
      tokenDecimal: "",
      toToken: "ETH",
      tokenValue: 0,
      balance: 0,
      pullRunningTime: new Date(),
      maxLiquidityETH: "",
    });
    setIsSubmit(false);
  };

  const nextHandler = async () => {
    setIsLoading(true);
    setIsError(false);
    setIsSubmit(true);
    handleNext();
    clearFormData();
    setIsLoading(false);
    // if (stepIndex === 0) {
    //   if (formData.tokenAddress !== '' && formData.toToken !== '') {
    //     setIsSubmit(false);
    //     handleNext();
    //     saveStepOneData(formData);
    //   }
    // }
    // if (stepIndex === 1) {
    //   if (formData.tokenValue !== '' && formData.balance !== '') {
    //     setIsSubmit(false);
    //     handleNext();
    //     saveStepTwoData(formData, selectedDate);
    //   }
    // }
    // if (stepIndex === 2) {
    //   if (formData.maxLiquidityETH !== '') {
    //     setIsSubmit(false);
    //     handleNext();
    //     saveStepThreeData(formData);
    //   }
    // }
    // if (stepIndex === steps.length - 1) {
    //   setIsLoading(true);
    //   await createPoolHandler(formData);
    //   clearFormData();
    //   setIsLoading(false);
    // }
  };

  // called every time a file's `status` changes
  const handleChangeStatus = async ({ meta, file }, status) => {
    if (status !== "done") {
      return;
    }

    const formDataImages = new FormData();
    formDataImages.append("file", file);
    const response = await Axios({
      method: "POST",
      url: ApiConfig.uploadFile,
      data: formDataImages,
    });
    if (response.data.status === 200) {
      toast.success("Images submitted successfully");
      setLoader(false);

      setImageFront(response.data.data);
    }
  };
  const handleChangeStatus1 = async ({ e, meta, file }, status) => {
    if (status !== "done") {
      return;
    }

    const formDataImages1 = new FormData();
    formDataImages1.append("file", file);

    const response = await Axios({
      method: "POST",
      url: ApiConfig.uploadFile,
      data: formDataImages1,
    });
    if (response.data.status === 200) {
      toast.success("Image submitted successfully");
      setLoader(false);
      setBackImage(response.data.data);
    }
  };

  const formInitialSchema = {
    email: "",
    firstName: "",
    mobileNumber: phone,
    countrydropDown: "",
    state: "",
    city: "",
  };

  const handleFormSubmit = async (values) => {};
  const handleFormSubmit1 = async (values) => {
    const documents = {
      document: [
        {
          docName: formData.docName,
          docIdNumber: formData.docIdNumber,
          frontIdUrl: imageFront,
          backIdUrl: imageBack,
        },
      ],
    };
    setIsSubmit(true);
    if (
      isSubmit &&
      formData.docName !== "" &&
      formData.docIdNumber !== "" &&
      imageFront !== "" &&
      imageBack !== ""
    ) {
      setLoader(true);
      try {
        const res = await Axios({
          method: "POST",
          url: ApiConfig.saveKycDetails,
          headers: {
            token: window.sessionStorage.getItem("token"),
          },
          data: documents,
        });
        if (res.data.status === 200) {
          toast.success("form submitted successfully");
          setLoader(false);
          history.push({
            pathname: "/kyc",
          });
        } else {
          setLoader(false);
          toast.warn(res.data.message);
        }
      } catch (error) {
        setLoader(false);
        if (error.response) {
          toast.error(error.response.data.message);
        } else {
          toast.error(error.message);
        }
      }
    }
  };
  useEffect(() => {
    axios.get("/static/json/countries.json").then(function (response) {
      setCountries(response.data.countries);
    });
  }, []);

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
  switch (stepIndex) {
    case 0:
      return (
        <Box className={classes.mainsec}>
          <form className="customForm" Validate autoComplete="off">
            <Box textAlign="center">
              <Typography variant="caption">
                We reserve our time to validate your document
              </Typography>
            </Box>
            <Box textAlign="center" mt={2} className="emailbox">
              <Link>Email Verification</Link>
            </Box>
            <Box mt={1} textAlign="center">
              <Typography variant="caption">
                Your email : {data?.email}
              </Typography>
            </Box>
            <Box mt={1} textAlign="center">
              <Typography variant="caption">
                To validate your account you have to validate your email address
              </Typography>
            </Box>
            <Box mt={1} textAlign="center">
              <Button style={{ border: "1px solid #00e0b0", borderRadius: 10 }}>
                {data.kycStatus && (
                  <>
                    <FaRegCheckCircle size={18} color="green" /> &nbsp; Not
                    Verified
                  </>
                )}
                {!data.kycStatus && (
                  <>
                    <FaRegCheckCircle size={18} color="green" /> &nbsp; Verified
                  </>
                )}
              </Button>
            </Box>
            <Box mt={1} textAlign="center">
              <Typography variant="caption">
                If you face any issue please contact at us-
              </Typography>
              <Typography variant="body2" style={{ color: "#20BFA9" }}>
                support@mobiloitte.com
              </Typography>
            </Box>
            <Box mt={5}>
              <Button
                variant="contained"
                onClick={() => history.push("/kyc")}
                disabled={isLoading}
                className="leftButton"
                style={{ padding: "6px 20px" }}
              >
                Cancel
              </Button>
              <Button
                variant="containedPrimary"
                className="rightButton"
                onClick={nextHandler}
                style={{ padding: "5px 20px", textTransform: "capitalize" }}
              >
                Next
              </Button>
            </Box>
          </form>
        </Box>
      );
    case 1:
      return (
        <Box className={classes.mainsec}>
          <form className="customForm" Validate autoComplete="off">
            <Formik
              initialValues={formInitialSchema}
              initialStatus={{
                success: false,
                successMsg: "",
              }}
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
                  <Box>
                    <Grid container>
                      <Grid item xs={12} md={12}>
                        <TextField
                          label="Enter your name"
                          margin="normal"
                          size="small"
                          variant="outlined"
                          fullWidth
                          name="firstName"
                          value={data?.firstName}
                          error={Boolean(touched.firstName && errors.firstName)}
                          onBlur={handleBlur}
                          // onChange={handleChange}
                        />
                        <FormHelperText error style={{ margin: "0px" }}>
                          {touched.firstName && errors.firstName}
                        </FormHelperText>
                      </Grid>
                      <Grid item xs={12} md={12} style={{ marginTop: ".8rem" }}>
                        <TextField
                          label="Enter your email"
                          margin="normal"
                          size="small"
                          variant="outlined"
                          fullWidth
                          name="email"
                          value={data?.email}
                          error={Boolean(touched.email && errors.email)}
                          onBlur={handleBlur}
                          // onChange={handleChange}
                        />
                        <FormHelperText error style={{ margin: "0px" }}>
                          {touched.email && errors.email}
                        </FormHelperText>
                      </Grid>
                      <Grid item xs={12} md={12} style={{ marginTop: "2rem" }}>
                        <PhoneInput
                          country={"us"}
                          name="mobileNumber"
                          value={data?.phoneNo}
                          error={Boolean(
                            touched.mobileNumber && errors.mobileNumber
                          )}
                          onBlur={handleBlur}
                          onChange={(phone, e) => {
                            setCountryCode(e.dialCode);
                            setFieldValue("mobileNumber", phone);
                          }}
                          inputStyle={{
                            background: "transparent",
                            width: "100%",
                            color: "#848484",
                            border: "1px solid #848484",
                            height: "37px",
                            marginTop: "5px",
                          }}
                        />
                        <FormHelperText error>
                          {touched.mobileNumber && errors.mobileNumber}
                        </FormHelperText>
                      </Grid>
                      <Grid item xs={12} md={12} style={{ marginTop: ".8rem" }}>
                        <FormControl
                          variant="outlined"
                          style={{ marginTop: 16 }}
                          fullWidth
                        >
                          <InputLabel margin="dense">Select Country</InputLabel>
                          <Select
                            // value={age}
                            // onChange={handleChange}
                            margin="dense"
                            label="Select Country"
                            name="countrydropDown"
                            value={data?.country}
                            error={Boolean(
                              touched.countrydropDown && errors.countrydropDown
                            )}
                            onBlur={handleBlur}
                            onChange={(e) => {
                              handleChange(e);
                              changeCountry(e);
                            }}
                            // onChange={handleChange}
                          >
                            <MenuItem value="">{/* <em>None</em> */}</MenuItem>
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
                          <FormHelperText error style={{ paddingLeft: "0px" }}>
                            {touched.countrydropDown && errors.countrydropDown}
                          </FormHelperText>
                        </FormControl>
                      </Grid>

                      <Grid item xs={12} md={12} style={{ marginTop: "-3px" }}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={checked}
                              onChange={(e) => setChecked(e.target.checked)}
                              color="primary"
                            />
                          }
                          label={
                            "I take full responsibility to provide correct information"
                          }
                        />
                      </Grid>

                      {isError && (
                        <Box py={2}>
                          <Alert severity="error">
                            {"Error In Transaction"}
                          </Alert>
                        </Box>
                      )}
                    </Grid>

                    <Box mt={5}>
                      <Button
                        variant="contained"
                        onClick={handleBack}
                        disabled={isLoading}
                        className="leftButton"
                        style={{ padding: "6px 20px" }}
                      >
                        Back
                      </Button>
                      <Button
                        variant="containedPrimary"
                        className="rightButton"
                        onClick={nextHandler}
                        type="submit"
                        disabled={!checked}
                        style={{
                          padding: "5px 20px",
                          textTransform: "capitalize",
                        }}
                      >
                        {btnText} {isLoading && <ButtonCircularProgress />}
                      </Button>
                    </Box>
                  </Box>
                </Form>
              )}
            </Formik>
          </form>
        </Box>
      );
    case 2:
      return (
        <Box className={classes.mainsec}>
          <Box
            // className="customForm"
            Validate
            autoComplete="off"
            style={{
              width: "100%",
              paddingBottom: "14px",
              borderRadius: "5px\npx",
              border: "1px solid #797979",
            }}
          >
            <Box style={{ padding: "20px" }}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={12} style={{ marginTop: ".8rem" }}>
                  <FormControl
                    variant="outlined"
                    style={{ marginTop: 16 }}
                    fullWidth
                  >
                    <InputLabel margin="dense">Select Id</InputLabel>
                    <Select
                      // value={age}
                      // onChange={handleChange}
                      margin="dense"
                      label="Doc name"
                      name="docName"
                      value={formData.docName}
                      onChange={_onInputChange}
                      error={isSubmit && formData.docName === ""}
                      helperText={
                        isSubmit &&
                        formData.docName === "" &&
                        "Please enter type of ID"
                      }
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={"Pan Card"}>Pan Card</MenuItem>
                      <MenuItem value={"Aadhar Card"}>Aadhar Card</MenuItem>
                      <MenuItem value={"Passport"}>Passport</MenuItem>
                    </Select>
                    <p
                      style={{
                        color: "#f44336",
                        fontSize: "12px",
                        marginTop: "5px",
                        textAlign: "left",
                      }}
                    >
                      {isSubmit &&
                        formData.docName === "" &&
                        "Please enter type of ID"}
                    </p>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={12} style={{ marginTop: "-30px" }}>
                  <TextField
                    className={classes.textSection}
                    label="ID Number"
                    margin="normal"
                    size="small"
                    variant="outlined"
                    fullWidth
                    name="docIdNumber"
                    value={formData.docIdNumber}
                    onChange={_onInputChange}
                    error={isSubmit && formData.docIdNumber === ""}
                    helperText={
                      isSubmit &&
                      formData.docIdNumber === "" &&
                      "Please enter ID number"
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Dropzone
                    maxFiles={1}
                    onChangeStatus={handleChangeStatus}
                    // onSubmit={handleSubmit1}
                    accept="image/*,video/*"
                    inputContent={(files, extra, rejectedFiles) =>
                      extra.files ? (
                        "Image, Video files only"
                      ) : (
                        <Box textAlign="center" py={5} className="uploadbox">
                          <Typography color="primary" variant="h6">
                            Upload first page of your ID
                          </Typography>
                        </Box>
                      )
                    }
                    styles={{
                      dropzoneReject: {
                        borderColor: "red",
                        backgroundColor: "#DAA",
                      },
                      inputLabel: (files, extra) =>
                        extra.files ? { color: "red" } : {},
                    }}
                    error={isSubmit && imageFront === ""}
                    helperText={
                      isSubmit &&
                      imageFront === "" &&
                      "Please select front image"
                    }
                  />
                  <p
                    style={{
                      color: "#f44336",
                      fontSize: "12px",
                      marginTop: "5px",
                      textAlign: "left",
                    }}
                  >
                    {isSubmit &&
                      imageFront === "" &&
                      "Please select front image"}
                  </p>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Dropzone
                    maxFiles={1}
                    onChangeStatus={handleChangeStatus1}
                    accept="image/*,video/*"
                    inputContent={(files, extra) =>
                      extra.files ? (
                        "Image, Video files only"
                      ) : (
                        <Box textAlign="center" py={5} className="uploadbox">
                          <Typography color="primary" variant="h6">
                            Upload last page of your ID
                          </Typography>
                        </Box>
                      )
                    }
                    styles={{
                      dropzoneReject: {
                        borderColor: "red",
                        backgroundColor: "#DAA",
                      },
                      inputLabel: (files, extra) =>
                        extra.files ? { color: "red" } : {},
                    }}
                    error={isSubmit && imageBack === ""}
                    helperText={
                      isSubmit &&
                      imageBack === "" &&
                      "Please select front image"
                    }
                  />
                  <p
                    style={{
                      color: "#f44336",
                      fontSize: "12px",
                      marginTop: "5px",
                      textAlign: "left",
                    }}
                  >
                    {isSubmit && imageBack === "" && "Please select back image"}
                  </p>
                </Grid>
              </Grid>
            </Box>
            <Box mt={5} style={{ padding: "0px 20px" }}>
              <Button
                variant="contained"
                onClick={handleBack}
                disabled={isLoading}
                className="leftButton"
                style={{ padding: "6px 20px" }}
              >
                Back
              </Button>
              <Button
                variant="containedPrimary"
                className="rightButton"
                // onClick={nextHandler}
                // onClick={() => handleFormSubmit1}
                onClick={handleFormSubmit1}
                // onClick={() => setConfirmOpen(true)}
                disabled={loader}
                style={{ padding: "5px 20px", textTransform: "capitalize" }}
              >
                Submit
                {loader && <ButtonCircularProgress />}
              </Button>
            </Box>
            {confirmOpen && (
              <InformationDialog
                open={confirmOpen}
                handleClose={() => setConfirmOpen(false)}
                title={"Thanks for submitting the information "}
                // desc={"desc"}
                confirmationHandler={confirmationHandler}
              />
            )}
          </Box>
        </Box>
      );
    default:
      return "Unknown stepIndex";
  }
}
