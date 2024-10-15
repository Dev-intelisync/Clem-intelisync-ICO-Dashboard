import {
  Container,
  Box,
  Typography,
  makeStyles,
  Button,
  Grid,
  FormControl,
  TextField,
  IconButton,
  FormHelperText,
} from "@material-ui/core";
import React, { useState, useContext, useEffect } from "react";
import { DropzoneArea } from "material-ui-dropzone";
import { Form, Formik } from "formik";
import DoneIcon from "@material-ui/icons/Done";
import { Link as RouterLink, useLocation } from "react-router-dom";
import * as yep from "yup";
import ReportIcon from "@material-ui/icons/Report";
import { FaPassport } from "react-icons/fa";
import { HiOutlineIdentification } from "react-icons/hi";
import { AiFillCar } from "react-icons/ai";
import Checkbox from "@material-ui/core/Checkbox";
import CompanyDetails from "./CompanyDetails";
import ApiConfig from "../../../config/APIConfig";
import "react-dropzone-uploader/dist/styles.css";
import ReCAPTCHA from "react-google-recaptcha";
import moment from "moment";
import { useHistory } from "react-router-dom";
import Axios from "axios";
import { toast } from "react-toastify";
import "react-phone-input-2/lib/style.css";
import { AuthContext } from "@context/Auth";
import ButtonCircularProgress from "@component/ButtonCircularProgress";
import ShareHolders from "./ShareHolders";
import { BorderColor } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  mainbox: {
    padding: "70px 50px 50px 0px",
    "@media(max-width:1000px)": {
      padding: "70px 0px 50px 0px",
    },
    "& h4": {
      fontFamily: "Inter",
      fontStyle: "normal",
      fontWeight: "700",
      fontSize: "24px",
      lineHeight: "54px",
      textAlign: "left",
      /* identical to box height */

      color: " #FFFFFF",

      marginBottom: "15px",
    },
    "& h6": {
      fontFamily: "Inter",
      fontStyle: "normal",
      fontWeight: "600",
      fontSize: "16px",
      lineHeight: "24px",
      textAlign: "left",
      /* identical to box height */

      color: "#FFFFFF",
      [theme.breakpoints.down("sm")]: {
        fontSize: "14px",
      },
    },
    "& .formbox": {
      background: " transparent",
      borderRadius: "8px",
      // border: "1px solid rgba(128, 128, 128, 0.22)",
      "& h3": {
        fontFamily: "Inter",
        fontStyle: "normal",
        fontWeight: "700",
        fontSize: "22px",
        lineHeight: "36px",
        /* identical to box height */

        color: " #FFFFFF",
      },
      "& p": {
        fontFamily: "Inter",
        fontStyle: "normal",
        fontWeight: "400",
        fontSize: "16px",
        lineHeight: "24px",
        /* identical to box height */

        color: "#FFFFFF",
        "@media(max-width:694px)": {
          fontSize: "14px",
        },
      },
    },
    "& .flexbox": {
      display: "flex",
      width: "100%",

      // "@media(max-width:694px)": {
      //   maxWidth: "463px",
      // },
      // [theme.breakpoints.down("sm")]: {
      //   display: "block",
      //   width: "auto",
      // },
    },
    "& .headbox": {
      height: "28px",
      background: "#FFFFFF",
      "& h6": {
        fontSize: "16px",
        fontWeight: "600",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      },
    },
    "& .border": {
      // borderTop: "1px solid rgba(128, 128, 128, 0.22)",
    },
    "& .fieldbox": {
      paddingBottom: "30px",
      "& button": {
        // display: "flex",
        // justifyContent: "flex-start",
      },
      "& h2": {
        fontFamily: "Inter",
        fontStyle: "normal",
        fontWeight: "600",
        fontSize: "16px",
        lineHeight: "24px",
        /* identical to box height */

        color: "#FFFFFF",
      },
    },
  },
  iconbox: {
    display: "flex",
    alignItems: "center",
    "& .iconflex": {
      width: "15px !important",
      height: "15px !important",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#ffffff",
      color: "#000",
      "& svg": {
        color: "#000",
        fontSize: "15px",
      },
    },
    "& h5": {
      fontSize: "14px",
      fontWeight: "400",
    },
  },
  TextBox: {
    borderRadius: "10px !important",
    background: theme.palette.background.taf,
    height: "16px",
    BorderColor:"#022E3740",
  },

  subtextbox: {
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      display: "block",
    },
  },
  label: {
    fontFamily: "Inter",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "16px",
    lineHeight: "24px",
    /* identical to box height */

    color: "#FFFFFF",
  },
  docsButton: {
    border: "none",
    background: "#56CA00",
    borderRadius: "10px",
    fontFamily: "Inter",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "20px",
    lineHeight: "24px",
    height: "40px",
    color: "#FFFFFF",
  },
  active: {
    border: "none",
    background: "#56CA00",
    borderRadius: "10px",
    fontFamily: "Inter",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "20px",
    lineHeight: "24px",
    height: "40px",
    color: "#FFFFFF",
  },
  submitButton: {
    width: "467px",
    height: "40px",
    border: "none",
    background: "#56CA00",
    borderRadius: "10px",
    fontFamily: "Inter",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "24px",
    lineHeight: "36px",
    /* identical to box height */

    color: "#FFFFFF",
  },
  dropZone: {
    "& .MuiDropzoneArea-root": {
      border: "2px solid #0602A5",

      background: "#FFFFFF",
    },
  },
}));

function Banner() {
  const auth = useContext(AuthContext);
  const history = useHistory();
  const classes = useStyles();
  const [isSubmit, setIsSubmit] = useState(false);
  const [checked, setChecked] = React.useState(true);
  const [agree, setAgree] = useState(false);
  const [done, setDone] = useState(false);
  const [passport, setIdpass] = useState("");
  const [license, setIdLicense] = useState("");
  const [national, setIdnational] = useState("");
  const [isLoading, setLoader] = useState(false);
  const [imageFront, setImageFront] = useState("");
  const [imageFrontType, setImageFrontType] = useState("");
  const [imageBack, setBackImage] = useState("");
  const [imageBackType, setBackImageType] = useState("");
  const [passID, setPass] = useState("");
  const [nationalID, setNation] = useState("");
  const [lienseID, setLiense] = useState("");
  const [formDat, setFormDat] = useState([
    {
      designation: "",
      name: "",
    },
  ]);
  const [numPages, setNumPages] = useState(null);
  const recaptchaRef = React.createRef();
  const [valuedata, setValuedata] = useState([
    {
      designation: "",
      name: "",
    },
  ]);
  const [propetiesList, setPropetiesList] = useState("");
  const location = useLocation();
  const [lienseFrontImage, setLienseFrontImage] = useState("");
  const [liensebackImage, setLiensebackImage] = useState("");
  const [secondFrontImage, setSecondFrontImage] = useState("");
  const [secondBackImage, setSecondBackImage] = useState("");
  const [passportDetails, setPassportDetails] = useState("");
  const [licensetDetails, setlicenseDetails] = useState("");
  const [natiionalDetails, setNatiionalDetails] = useState("");
  const [secondBackImagedriving, setSecondBackImagedriving] = useState("");
  const [lastFrontImage, setlastFrontImage] = useState("");
  const [lastBackImage, setlastBackImage] = useState("");

  useEffect(() => {
    const locationdata = location.state;
    setNation(
      locationdata?.national?.idNumber ? locationdata?.national?.idNumber : ""
    );
    setLiense(
      locationdata?.driving?.idNumber ? locationdata?.driving?.idNumber : ""
    );
    setPass(
      locationdata?.passport?.idNumber ? locationdata?.passport?.idNumber : ""
    );
    setImageFront(
      locationdata?.passport?.frontImage
        ? locationdata?.passport?.frontImage
        : ""
    );
    setBackImage(
      locationdata?.passport?.backImage ? locationdata?.passport?.backImage : ""
    );
    setSecondFrontImage(
      locationdata?.national?.frontImage
        ? locationdata?.national?.frontImage
        : ""
    );
    setSecondBackImage(
      // locationdata?.driving?.idNumber ? :
      locationdata?.national?.backImage ? locationdata?.national?.backImage : ""
    );
    // if (locationdata?.driving?.documentName === "license") {
    //   setSecondBackImagedriving(
    //     locationdata?.driving?.backImage ? locationdata?.driving?.backImage : ""
    //   );
    // }
    // if (locationdata?.national?.documentName === "national") {
    //   setSecondBackImage(
    //     locationdata?.driving?.backImage ? locationdata?.driving?.backImage : ""
    //   );
    // }

    setlastFrontImage(
      locationdata?.driving?.frontImage ? locationdata?.driving?.frontImage : ""
    );

    setlastBackImage(
      locationdata?.driving?.backImage ? locationdata?.driving?.backImage : ""
    );
  }, [location.state]);

  useEffect(() => {
    if (
      auth?.kycData?.documentStatus === "ACCEPTED" ||
      auth?.kycData?.documentStatus === "PENDING"
    ) {
      history.push("/kyc");
    }
  }, [
    auth?.kycData?.documentStatus === "ACCEPTED",
    auth?.kycData?.documentStatus === "PENDING",
  ]);
  useEffect(() => {
    if (passport && imageFront && imageBack && passID) {
      setPassportDetails({
        idNumber: passID,
        documentName: passport,
        frontImage: imageFront ? imageFront : "",
        backImage: imageBack ? imageBack : "",
      });
    }
    if (national && secondFrontImage && secondBackImage && nationalID) {
      setNatiionalDetails({
        idNumber: nationalID,
        documentName: national,
        frontImage: secondFrontImage ? secondFrontImage : "",
        backImage: secondBackImage ? secondBackImage : "",
      });
    }
    if (license && lastFrontImage && lastBackImage && lienseID) {
      setlicenseDetails({
        idNumber: lienseID,
        documentName: license,
        frontImage: lastFrontImage ? lastFrontImage : "",
        backImage: lastBackImage ? lastBackImage : "",
      });
    }
  }, [
    passport,
    imageFront,
    imageBack,
    national,
    license,
    lastFrontImage,
    secondFrontImage,
    secondBackImage,
    passID,
    nationalID,
    lastBackImage,
    lienseID,
  ]);

  const handleFormSubmit1 = async (type, name) => {
    setIsSubmit(true);

    if (
      (passID === "" && nationalID === "") ||
      (lienseID === "" && passID === "") ||
      (nationalID === "" && lienseID === "")
    ) {
      toast.warn("please enter your id number");
    } else {
      if (
        (imageFront === "" && imageBack === "") ||
        (secondFrontImage === "" && secondBackImage === "") ||
        (lastFrontImage === "" && lastBackImage === "")
      ) {
        try {
          setLoader(true);

          let obj;

          const res = await Axios({
            method: "POST",
            url: ApiConfig.saveKycDetails,
            headers: {
              token: window.localStorage.getItem("token"),
            },

            data:
              auth.userData.userType === "USER"
                ? {
                  passport: passportDetails,
                  national: natiionalDetails,

                  driving: licensetDetails,

                  // frontImage: imageFront,
                  // backImage: imageBack,
                  frontIdUrlPdf: imageFrontType.type,
                  backIdUrlPdf: imageBackType.type,
                }
                : {
                  // documentName: idd,

                  passport: passportDetails,
                  national: natiionalDetails,

                  driving: licensetDetails,
                  // frontImage: imageFront,
                  // backImage: imageBack,
                  frontIdUrlPdf: imageFrontType.type,
                  backIdUrlPdf: imageBackType.type,
                  companyHolder: formDat,
                  selectHolder: valuedata,
                },
          });
          if (res.data.responseCode === 200) {
            toast.success("form submitted successfully");
            setLoader(false);
            auth.getProfileHandler();
            history.push({
              pathname: "/kyc",
            });
          } else {
            setLoader(false);
            toast.warn(res.data.responseMessage);
          }
        } catch (error) {
          setLoader(false);
          if (error.response) {
            toast.error(error.response.data.responseMessage);
          } else {
            toast.error(error.responseMessage);
          }
        }
      } else {
        toast.warn("please select image");
      }
    }
  };

  // Edit profile Api

  const Editprofilehandler = async () => {
    setIsSubmit(true);

    setLoader(true);
    if (
      (passID === "" && nationalID === "") ||
      (lienseID === "" && passID === "") ||
      (nationalID === "" && lienseID === "")
    ) {
      toast.warn("please enter your id number");
    } else {
      if (
        (imageFront === "" && imageBack === "") ||
        (secondFrontImage === "" && secondBackImage === "") ||
        (lastFrontImage === "" && lastBackImage === "")
      ) {
        try {
          const res = await Axios({
            method: "POST",
            url: ApiConfig.editKYC,
            headers: {
              token: window.localStorage.getItem("token"),
            },
            data:
              auth.userData.userType === "USER"
                ? {
                  passport: passportDetails,
                  national: natiionalDetails,
                  driving: licensetDetails,
                }
                : {
                  passport: passportDetails,
                  national: natiionalDetails,

                  driving: licensetDetails,

                  companyHolder: formDat,
                  selectHolder: valuedata,
                },
          });
          if (res.data.responseCode === 200) {
            toast.success(res.data.responseMessage);
            setLoader(false);

            history.push({
              pathname: "/kyc",
            });
          } else {
            setLoader(false);
            // toast.warn(res.data.responseMessage);
          }
        } catch (error) {
          setLoader(false);
          if (error.response) {
            // toast.error(error.response.data.responseMessage);
          } else {
            toast.error(error.responseMessage);
          }
        }
      } else {
        toast.warn("please select image");
      }
    }
  };

  // end

  useEffect(() => {
    setIdpass(location.state?.passport?.documentName);
    setIdLicense(location.state?.driving?.documentName);
    setIdnational(location.state?.national?.documentName);
  }, [location.state?.documentName]);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
  const handleChangeStatus = ({ meta }, status) => {
    console.log(status, meta);
  };
  const getBase64 = (file, cb) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      cb(reader.result);
    };
    reader.onerror = function (err) { };
  };

  const listPropertiesHandler = async (id) => {
    setPropetiesList(id);
    // setPropertyOpen(false);
  };

  return (
    <Box className={classes.mainbox}>
      <Container>
        <Box textAlign="center">

          <div style={{ borderLeft: "5px solid #56CA00", marginBottom: "20px",marginLeft:"20px", }}
          
          >
            <Typography
              variant="h6"
              style={{
                color: "#011014",
                fontFamily: "Inter",
                paddingLeft: "20px",
                fontWeight: "bold",
                fontSize: "24px",
              }}
            >
              {" "}
              Begin your ID-Verification
            </Typography>
          </div>
          {/* <Typography
            variant="h6"
            style={{
              color: "#060A25",
              fontFamily: "Inter",
            }}
          >
            To comply with regulation each participant will have to go through
            indentity verification (KYC/AML) to prevent fraud causes.
          </Typography> */}
        </Box>
        <Box className="formbox" mt={4}  style={{
          boxShadow:
            " rgba(0, 0, 0, 0.3) 0px 0px 5px 0px, rgba(0, 0, 0, 0.3) 0px 0px 1px 0px",
          padding: "20px",
          borderRadius: "12px",
          width:"100%",
        }}>
          <Box>
            <Box className="flexbox" >
              <Box className="headbox" ></Box>
              <Box >

                <div style={{ borderLeft: "5px solid #56CA00", marginBottom: "20px" }}>
                  <Typography
                    variant="h6"
                    style={{
                      color: "#060A25",
                      fontFamily: "Inter",
                      paddingLeft: "20px",
                      fontWeight: "bold",
                      fontSize: "18px",
                    }}
                  >
                    {" "}
                    Personal Details
                  </Typography>
                </div>
              </Box>
            </Box>
            <Typography
              variant="body2"
              style={{
                color: "#060A25",
                fontFamily: "Inter",
              }}
            >
              Your simple personal information required for identification
            </Typography>
          </Box>
          <Box className="border">
            <Box className="fieldbox">
              <Box>
                <Formik>
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
                        <Grid item lg={6} md={6} sm={6} xs={12}>
                          <label
                            className={classes.label}
                            style={{
                              color: "#060A25",
                              fontFamily: "Inter",
                            }}
                          >
                            First Name *
                          </label>
                          <TextField
                            placeholder="Enter Your First Name"
                            type="text"
                            variant="outlined"
                            fullWidth
                            className="textFeilds"
                            size="small"
                            value={auth?.userData?.firstName}
                            inputProps={{
                              readOnly: false,
                              className: classes.TextBox,
                            }}
                          />
                        </Grid>
                        <Grid item lg={6} md={6} sm={6} xs={12}>
                          <label
                            className={classes.label}
                            style={{
                              color: "#060A25",
                              fontFamily: "Inter",
                            }}
                          >
                            Last Name *
                          </label>
                          <TextField
                            placeholder="Enter Your Last Name"
                            type="text"
                            variant="outlined"
                            fullWidth
                            size="small"
                            className="textFeilds"
                            name="lastName"
                            value={auth?.userData?.lastName}
                            inputProps={{
                              readOnly: true,
                              className: classes.TextBox,
                            }}
                          />
                        </Grid>

                        <Grid item lg={6} md={6} sm={6} xs={12}>
                          <label
                            className={classes.label}
                            style={{
                              color: "#060A25",
                              fontFamily: "Inter",
                            }}
                          >
                            Email Address *
                          </label>
                          <TextField
                            placeholder="Enter Your Email Address"
                            type="text"
                            variant="outlined"
                            fullWidth
                            size="small"
                            className="textFeilds"
                            name="email"
                            value={auth?.userData?.email}
                            inputProps={{
                              readOnly: true,
                              className: classes.TextBox,
                            }}
                          />
                        </Grid>
                        <Grid item lg={6} md={6} sm={6} xs={12}>
                          <label
                            className={classes.label}
                            style={{
                              color: "#060A25",
                              fontFamily: "Inter",
                            }}
                          >
                            Mobile Number *
                          </label>

                          <TextField
                            placeholder="phoneNo"
                            type="text"
                            variant="outlined"
                            fullWidth
                            size="small"
                            className="textFeilds"
                            name="email"
                            value={auth?.userData?.mobileNumber}
                            inputProps={{
                              readOnly: true,
                              className: classes.TextBox,
                            }}
                          />
                        </Grid>

                        <Grid item lg={6} md={6} sm={6} xs={12}>
                          <label
                            className={classes.label}
                            style={{
                              color: "#060A25",
                              fontFamily: "Inter",
                            }}
                          >
                            Date of Birth *
                          </label>
                          <FormControl
                            className={classes.formboxes}
                            variant="outlined"
                            fullWidth
                            size="small"
                            style={{ marginTop: "0px" }}
                          >
                            {/* <TextField
                              variant="outlined"
                             
                              value={auth?.userData?.dob}
                              inputProps={{ readOnly: true }}
                            /> */}
                            <TextField
                              placeholder="dob"
                              type="text"
                              variant="outlined"
                              fullWidth
                              size="small"
                              className="textFeilds"
                              name="email"
                              value={moment(auth?.userData?.dateOfBirth).format(
                                "DD-MM-YYYY"
                              )}
                              inputProps={{
                                readOnly: true,
                                className: classes.TextBox,
                              }}
                            />
                          </FormControl>
                        </Grid>
                      </Grid>
                    </Form>
                  )}
                </Formik>
              </Box>
            </Box>
          </Box>
          <Box className="border">
            <Box>
              <Box className="flexbox">
                <Box className="headbox"></Box>
                <Box>
                  <Typography
                    variant="h3"
                    style={{
                      color: "#060A25",
                      fontFamily: "Inter",
                    }}
                  >
                    Your Address
                  </Typography>
                </Box>
              </Box>
              <Typography
                variant="body2"
                style={{
                  color: "#060A25",
                  fontFamily: "Inter",
                }}
              >
                Your simple personal information required for identification
              </Typography>
            </Box>
          </Box>
          <Box className="border">
            <Box className="fieldbox">
              <Box>
                <Formik>
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
                        <Grid item lg={6} md={6} sm={6} xs={12}>
                          <label
                            className={classes.label}
                            style={{
                              color: "#060A25",
                              fontFamily: "Inter",
                            }}
                          >
                            Address Line 1 *
                          </label>
                          <TextField
                            placeholder="Enter Your Address Line 1"
                            type="text"
                            variant="outlined"
                            fullWidth
                            size="small"
                            className="textFeilds"
                            value={auth?.userData?.address}
                            name="firstName"
                            inputProps={{
                              readOnly: true,
                              className: classes.TextBox,
                            }}
                          />
                        </Grid>

                        <Grid item lg={6} md={6} sm={6} xs={12}>
                          <label
                            className={classes.label}
                            style={{
                              color: "#060A25",
                              fontFamily: "Inter",
                            }}
                          >
                            City *
                          </label>
                          <TextField
                            placeholder="Enter Your City Name"
                            type="text"
                            variant="outlined"
                            fullWidth
                            size="small"
                            className="textFeilds"
                            value={auth?.userData?.city}
                            name="firstName"
                            inputProps={{
                              readOnly: false,
                              className: classes.TextBox,
                            }}
                          />
                        </Grid>
                        <Grid item lg={6} md={6} sm={6} xs={12}>
                          <label
                            className={classes.label}
                            style={{
                              color: "#060A25",
                              fontFamily: "Inter",
                            }}
                          >
                            Country *
                          </label>
                          <TextField
                            placeholder="Enter Your State Name"
                            type="text"
                            variant="outlined"
                            fullWidth
                            size="small"
                            className="textFeilds"
                            inputProps={{
                              readOnly: false,
                              className: classes.TextBox,
                            }}
                            name="country"
                            value={auth?.userData?.country}
                          />
                        </Grid>

                        <Grid item lg={6} md={6} sm={6} xs={12}>
                          <label
                            className={classes.label}
                            style={{
                              color: "#060A25",
                              fontFamily: "Inter",
                            }}
                          >
                            Zip Code{" "}
                          </label>
                          <TextField
                            placeholder="Enter Your Zip Code"
                            type="text"
                            variant="outlined"
                            fullWidth
                            className="textFeilds"
                            size="small"
                            inputProps={{
                              readOnly: true,
                              className: classes.TextBox,
                            }}
                            name="firstName"
                            value={auth?.userData?.zipCode}
                          />
                        </Grid>
                      </Grid>
                    </Form>
                  )}
                </Formik>
              </Box>
            </Box>
          </Box>
          {auth?.userData?.userType === "COMPANY" ? (
            <>
              <Box>
                <CompanyDetails
                  // propertyOpen={propertyOpen}
                  // setPropertyOpen={(item) => setPropertyOpen(item)}
                  setFormDat={setFormDat}
                  formDat={formDat}
                  listPropertiesHandler={listPropertiesHandler}
                />
              </Box>
            </>
          ) : (
            ""
          )}

          <Box className="border">
            <Box>
              <Box className="flexbox">
                <Box className="headbox"></Box>
                <Box>
                  <Typography
                    variant="h3"
                    style={{
                      color: "#060A25",
                      fontFamily: "Inter",
                    }}
                  >
                    Document Upload
                  </Typography>
                </Box>
              </Box>
              <Typography
                variant="body2"
                style={{
                  color: "#060A25",
                  fontFamily: "Inter",
                }}
              >
                To verify your identity, please upload any of your document.
              </Typography>
            </Box>
          </Box>
          <Box className="border">
            <Box className="fieldbox">
              {auth?.userData?.userType === "COMPANY" ? (
                <>
                  <Box mt={3} mb={3}>
                    <ShareHolders
                      formDat={formDat}
                      setValuedata={setValuedata}
                    // setValuedata1={setValuedata}
                    />
                  </Box>
                </>
              ) : (
                ""
              )}

              <Box mt={2} className={classes.mainIdSection}>
                <Grid container spacing={3}>
                  <Grid item lg={4} md={4} sm={12} xs={12}>
                    <Button
                      fullWidth
                      disabled={
                        (passport === "passport" && national === "national") ||
                        (passport === "passport" && license === "license") ||
                        (national === "national" && license === "license")
                      }
                      onClick={() => setIdpass("passport")}
                      className={
                        passport === "passport"
                          ? classes.active
                          : classes.docsButton
                      }
                    >
                      Passport
                    </Button>
                  </Grid>
                  <Grid item lg={4} md={4} sm={12} xs={12}>
                    <Button
                      disabled={
                        (passport === "passport" && national === "national") ||
                        (passport === "passport" && license === "license") ||
                        (national === "national" && license === "license")
                      }
                      onClick={() => setIdnational("national")}
                      className={
                        national === "national"
                          ? classes.active
                          : classes.docsButton
                      }
                      fullWidth
                    >
                      National ID
                    </Button>
                  </Grid>
                  <Grid item lg={4} md={4} sm={12} xs={12}>
                    <Button
                      disabled={
                        (passport === "passport" && national === "national") ||
                        (passport === "passport" && license === "license") ||
                        (national === "national" && license === "license")
                      }
                      onClick={() => setIdLicense("license")}
                      className={
                        license === "license"
                          ? classes.active
                          : classes.docsButton
                      }
                      fullWidth
                    >
                      Driving License
                    </Button>
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <label
                      className={classes.label}
                      style={{
                        textTransform: "capitalize",
                        color: "#060A25",
                        fontFamily: "Inter",
                      }}
                    >
                      {passport === "passport" ? (
                        "Passport Number"
                      ) : (
                        <>{passport} </>
                      )}
                    </label>
                    {passport === "passport" && (
                      <>
                        <TextField
                          placeholder="Enter Your Id Number"
                          type="text"
                          value={passID}
                          variant="outlined"
                          fullWidth
                          size="small"
                          name="docIdNumber"
                          inputProps={{
                            className: classes.TextBox,
                          }}
                          onChange={(e) => setPass(e.target.value)}
                          error={isSubmit && passID.docIdNumber === ""}
                        />
                        <FormHelperText error>
                          {isSubmit &&
                            passID === "" &&
                            "Please enter ID number"}
                        </FormHelperText>
                      </>
                    )}

                    <label
                      style={{ textTransform: "capitalize" }}
                      className={classes.label}
                    >
                      {national === "national" ? (
                        "National Number"
                      ) : (
                        <>{national} </>
                      )}
                    </label>
                    {national === "national" && (
                      <>
                        <TextField
                          placeholder="Enter Your Id Number"
                          type="text"
                          value={nationalID}
                          variant="outlined"
                          fullWidth
                          size="small"
                          name="docIdNumber"
                          inputProps={{
                            className: classes.TextBox,
                          }}
                          onChange={(e) => setNation(e.target.value)}
                          error={isSubmit && nationalID.docIdNumber === ""}
                        />
                        <FormHelperText error>
                          {isSubmit &&
                            nationalID === "" &&
                            "Please enter ID number"}
                        </FormHelperText>
                      </>
                    )}
                    <label
                      style={{ textTransform: "capitalize" }}
                      className={classes.label}
                    >
                      {license === "license" ? (
                        "License Number"
                      ) : (
                        <>{license} </>
                      )}
                    </label>
                    {license === "license" && (
                      <>
                        <TextField
                          placeholder="Enter Your Id Number"
                          type="text"
                          value={lienseID}
                          variant="outlined"
                          fullWidth
                          size="small"
                          name="docIdNumber"
                          inputProps={{
                            className: classes.TextBox,
                          }}
                          onChange={(e) => setLiense(e.target.value)}
                          error={isSubmit && lienseID.docIdNumber === ""}
                        />
                        <FormHelperText error>
                          {isSubmit &&
                            lienseID === "" &&
                            "Please enter ID number"}
                        </FormHelperText>
                      </>
                    )}
                  </Grid>
                </Grid>

                {passport === "passport" && (
                  <>
                    <Box mt={4}>
                      <Grid container spacing={3} alignItems="center">
                        <Grid item md={6} sm={12} xs={12}>
                          <Box mb={1}>
                            <Typography
                              variant="h2"
                              style={{ color: "#060A25", fontFamily: "Inter" }}
                            >
                              Front
                            </Typography>
                          </Box>

                          {imageFront !== "" ? (
                            <>
                              <Box className={classes.colorbox}>
                                <figure className={classes.imagesBox}>
                                  <img
                                    src={imageFront}
                                    width="100%"
                                    height="100%"
                                    style={{
                                      // minHeight: "300px",
                                      width: "100%",
                                      height: "50%",

                                      // borderRadius: "50%",
                                      objectFit: "cover",
                                    }}
                                  />
                                </figure>
                                <Box align="center" mt={2}>
                                  <Button
                                    style={{
                                      color: "#fff",
                                      fontFamily: "Inter",
                                      background: "#56CA00",
                                    }}
                                    variant="contained"
                                    size="large"
                                    color="secondary"
                                    type="submit"
                                    className={classes.updateButton}
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
                            <Box className={classes.dropZone}>
                              <DropzoneArea
                                maxFileSize="40000000"
                                filesLimit="1"
                                style={{
                                  border: "1px solid red",
                                  marginTop: "-78px",
                                  marginLeft: "20px",
                                  color: "#060A25",
                                  fontFamily: "Inter",
                                }}
                                acceptedFiles={["image/*"]}
                                onDrop={(files) =>
                                  getBase64(files[0], (result) => {
                                    setImageFront(result);
                                  })
                                }
                                dropzoneText="Add Thumbnail Here"
                              />
                            </Box>
                          )}
                        </Grid>
                        <Grid item md={6} sm={12} xs={12}>
                          <Box mb={1}>
                            <Typography
                              variant="h2"
                              style={{
                                color: "#060A25",
                                fontFamily: "Inter",
                              }}
                            >
                              Back
                            </Typography>
                          </Box>

                          {secondBackImagedriving !== "" || imageBack !== "" ? (
                            <>
                              <Box className={classes.colorbox}>
                                <figure className={classes.imagesBox}>
                                  <img
                                    src={
                                      secondBackImagedriving
                                        ? secondBackImagedriving
                                        : imageBack
                                    }
                                    width="100%"
                                    height="100%"
                                    style={{
                                      // minHeight: "300px",
                                      width: "100%",
                                      height: "50%",

                                      // borderRadius: "50%",
                                      objectFit: "cover",
                                    }}
                                  />
                                </figure>
                                <Box align="center" mt={2}>
                                  <Button
                                    style={{
                                      color: "#fff",
                                      fontFamily: "Inter",
                                      background: "#56CA00",
                                    }}
                                    variant="contained"
                                    size="large"
                                    color="secondary"
                                    type="submit"
                                    className={classes.updateButton}
                                    onClick={() => {
                                      setBackImage("");
                                    }}
                                  >
                                    Remove
                                  </Button>
                                </Box>
                              </Box>
                            </>
                          ) : (
                            <Box className={classes.dropZone}>
                              <DropzoneArea
                                maxFileSize="40000000"
                                filesLimit="1"
                                style={{
                                  marginTop: "-78px",
                                  marginLeft: "20px",
                                }}
                                acceptedFiles={["image/*"]}
                                onDrop={(files) =>
                                  getBase64(files[0], (result) => {
                                    setBackImage(result);
                                  })
                                }
                                dropzoneText="Add Thumbnail Here"
                              />
                            </Box>
                          )}
                        </Grid>
                      </Grid>
                    </Box>
                  </>
                )}

                {/* Second option document upload */}
                {national === "national" && (
                  <>
                    <Box mt={4}>
                      <Grid container spacing={3} alignItems="center">
                        <Grid item md={6} sm={12} xs={12}>
                          <Box mb={1}>
                            <Typography
                              variant="h2"
                              style={{
                                color: "#060A25",
                                fontFamily: "Inter",
                              }}
                            >
                              Front
                            </Typography>
                          </Box>

                          {secondFrontImage !== "" ? (
                            <>
                              <Box className={classes.colorbox}>
                                <figure className={classes.imagesBox}>
                                  <img
                                    src={secondFrontImage}
                                    width="100%"
                                    height="100%"
                                    style={{
                                      // minHeight: "300px",
                                      width: "100%",
                                      height: "50%",

                                      // borderRadius: "50%",
                                      objectFit: "cover",
                                    }}
                                  />
                                </figure>
                                <Box align="center" mt={2}>
                                  <Button
                                    style={{
                                      color: "#fff",
                                      fontFamily: "Inter",
                                      background: "#56CA00",
                                    }}
                                    variant="contained"
                                    size="large"
                                    color="secondary"
                                    type="submit"
                                    className={classes.updateButton}
                                    onClick={() => {
                                      setSecondFrontImage("");
                                    }}
                                  >
                                    Remove
                                  </Button>
                                </Box>
                              </Box>
                            </>
                          ) : (
                            <Box className={classes.dropZone}>
                              <DropzoneArea
                                maxFileSize="40000000"
                                filesLimit="1"
                                style={{
                                  marginTop: "-78px",
                                  marginLeft: "20px",
                                }}
                                acceptedFiles={["image/*"]}
                                onDrop={(files) =>
                                  getBase64(files[0], (result) => {
                                    setSecondFrontImage(result);

                                    // setSecondFrontImage(result);
                                  })
                                }
                                dropzoneText="Add Thumbnail Here"
                              />
                            </Box>
                          )}
                        </Grid>
                        <Grid item md={6} sm={12} xs={12}>
                          <Box mb={1}>
                            <Typography
                              variant="h2"
                              style={{
                                color: "#060A25",
                                fontFamily: "Inter",
                              }}
                            >
                              Back
                            </Typography>
                          </Box>

                          {secondBackImage !== "" ? (
                            <>
                              <Box className={classes.colorbox}>
                                <figure className={classes.imagesBox}>
                                  <img
                                    src={secondBackImage}
                                    width="100%"
                                    height="100%"
                                    style={{
                                      // minHeight: "300px",
                                      width: "100%",
                                      height: "50%",

                                      // borderRadius: "50%",
                                      objectFit: "cover",
                                    }}
                                  />
                                </figure>
                                <Box align="center" mt={2}>
                                  <Button
                                    style={{
                                      color: "#fff",
                                      fontFamily: "Inter",
                                      background: "#56CA00",
                                    }}
                                    variant="contained"
                                    size="large"
                                    color="secondary"
                                    type="submit"
                                    className={classes.updateButton}
                                    onClick={() => {
                                      setSecondBackImage("");
                                    }}
                                  >
                                    Remove
                                  </Button>
                                </Box>
                              </Box>
                            </>
                          ) : (
                            <Box className={classes.dropZone}>
                              <DropzoneArea
                                maxFileSize="40000000"
                                filesLimit="1"
                                style={{
                                  marginTop: "-78px",
                                  marginLeft: "20px",
                                }}
                                acceptedFiles={["image/*"]}
                                onDrop={(files) =>
                                  getBase64(files[0], (result) => {
                                    setSecondBackImage(result);
                                  })
                                }
                                dropzoneText="Add Thumbnail Here"
                              />
                            </Box>
                          )}
                        </Grid>
                      </Grid>
                    </Box>
                  </>
                )}

                {license === "license" && (
                  <>
                    <Box mt={4}>
                      <Grid container spacing={2}>
                        <Grid item md={6} sm={12} xs={12}>
                          <Box mb={1}>
                            <Typography
                              variant="h2"
                              style={{
                                color: "#060A25",
                                fontFamily: "Inter",
                              }}
                            >
                              Front
                            </Typography>
                          </Box>

                          {lastFrontImage !== "" ? (
                            <>
                              <Box className={classes.colorbox}>
                                <figure className={classes.imagesBox}>
                                  <img
                                    src={lastFrontImage}
                                    width="100%"
                                    height="100%"
                                    style={{
                                      // minHeight: "300px",
                                      width: "100%",
                                      height: "50%",

                                      // borderRadius: "50%",
                                      objectFit: "cover",
                                    }}
                                  />
                                </figure>
                                <Box align="center" mt={2}>
                                  <Button
                                    style={{
                                      color: "#fff",
                                      fontFamily: "Inter",
                                      background: "#56CA00",
                                    }}
                                    variant="contained"
                                    size="large"
                                    color="secondary"
                                    type="submit"
                                    className={classes.updateButton}
                                    onClick={() => {
                                      setlastFrontImage("");
                                    }}
                                  >
                                    Remove
                                  </Button>
                                </Box>
                              </Box>
                            </>
                          ) : (
                            <Box className={classes.dropZone}>
                              <DropzoneArea
                                maxFileSize="40000000"
                                filesLimit="1"
                                style={{
                                  marginTop: "-78px",
                                  marginLeft: "20px",
                                }}
                                acceptedFiles={["image/*"]}
                                onDrop={(files) =>
                                  getBase64(files[0], (result) => {
                                    setlastFrontImage(result);
                                  })
                                }
                                dropzoneText="Add Thumbnail Here"
                              />
                            </Box>
                          )}
                        </Grid>
                        <Grid item md={6} sm={12} xs={12}>
                          <Box mb={1}>
                            <Typography
                              variant="h2"
                              style={{
                                color: "#060A25",
                                fontFamily: "Inter",
                              }}
                            >
                              Back
                            </Typography>
                          </Box>

                          {lastBackImage !== "" ? (
                            <>
                              <Box className={classes.colorbox}>
                                <figure className={classes.imagesBox}>
                                  <img
                                    src={lastBackImage}
                                    width="100%"
                                    height="100%"
                                    style={{
                                      // minHeight: "300px",
                                      width: "100%",
                                      height: "50%",

                                      // borderRadius: "50%",
                                      objectFit: "cover",
                                    }}
                                  />
                                </figure>
                                <Box align="center" mt={2}>
                                  <Button
                                    style={{
                                      color: "#fff",
                                      fontFamily: "Inter",
                                      background: "#56CA00",
                                    }}
                                    variant="contained"
                                    size="large"
                                    color="secondary"
                                    type="submit"
                                    className={classes.updateButton}
                                    onClick={() => {
                                      setlastBackImage("");
                                    }}
                                  >
                                    Remove
                                  </Button>
                                </Box>
                              </Box>
                            </>
                          ) : (
                            <Box className={classes.dropZone}>
                              <DropzoneArea
                                maxFileSize="40000000"
                                filesLimit="1"
                                style={{
                                  marginTop: "-78px",
                                  marginLeft: "20px",
                                }}
                                acceptedFiles={["image/*"]}
                                onDrop={(files) =>
                                  getBase64(files[0], (result) => {
                                    setlastBackImage(result);
                                  })
                                }
                                dropzoneText="Add Thumbnail Here"
                              />
                            </Box>
                          )}
                        </Grid>
                      </Grid>
                    </Box>
                  </>
                )}

                <Box mt={2} mb={0} style={{ width: "100%" }}>
                  <Typography variant="body2" style={{ fontSize: "12px" }}>
                    <Checkbox
                      color="green"
                      type="checkbox"
                      id="acceptTerms"
                      size="small"
                      className={classes.link}
                      inputProps={{
                        "aria-label": "secondary checkbox",
                      }}
                      checked={agree}
                      onChange={(e) => setAgree(e.target.checked)}
                    />
                    <span
                      style={{
                        color: "#060A25",
                        fontFamily: "Inter",
                        fontSize: "15px",
                      }}
                    >
                      I have read the
                    </span>
                    &nbsp;
                    <a
                      href="/terms"
                      target="_blank"
                      style={{
                        marginLeft: "4px !important",

                        fontWeight: "700",
                        cursor: "pointer",
                        fontSize: "14px",
                      }}
                      className={classes.link}
                    >
                      Terms and Conditions
                    </a>
                    &nbsp;
                    <span>and</span>
                    &nbsp;
                    <a
                      href="/privacy-policy"
                      target="_blank"
                      style={{
                        marginLeft: "4px !important",
                        color: "#ffff",
                        fontWeight: "700",
                        fontSize: "14px",

                        cursor: "pointer",
                      }}
                      className={classes.link}
                    >
                      Privacy Policy
                    </a>
                  </Typography>
                </Box>

                {/* <Box mt={1} style={{ width: "100%" }}>
                  <form
                    onSubmit={() => {
                      recaptchaRef.current.execute();
                    }}
                  >
                    <ReCAPTCHA
                      // ref={recaptchaRef}
                      checked={done}
                      // size="invisible" //6Lc2nUIgAAAAAHhIawk-yJCvv4wIUcYZiE1gFlc3
                      Local
                      sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                      // sitekey="6Lfv2toiAAAAAJdn6r5LY29svYG9NyXelaoTThpQ"

                      // sitekey="6Le-udsiAAAAAO7ZwZNaOCclOD6Ef2ulCQxEyzj2" // live
                      // secretkey="6Le-udsiAAAAAMMUzQOPMtG6Kcd6Phm3VFR-fbk_" //live
                      onChange={() => setDone(true)}
                    />
                  </form>
                </Box> */}
                <Box
                  mt={3}
                  style={{ display: "flex", justifyContent: "start" }}
                >
                  {auth?.kycData?.documentStatus !== "PENDING" &&
                    auth?.kycData?.documentStatus !== "SUCCESS" && (
                      <Button
                        className={classes.submitButton}
                        onClick={() => {
                          // if (location.state === undefined) {
                            handleFormSubmit1();
                          // }
                          // if (location.state !== undefined) {
                          //   Editprofilehandler();
                          // }
                        }}
                      >
                        Submit
                        {isLoading && <ButtonCircularProgress />}
                      </Button>
                    )}
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default Banner;
