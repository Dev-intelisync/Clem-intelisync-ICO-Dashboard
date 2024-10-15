import React, { useState, useEffect, useContext } from "react";
import Page from "@component/Page";
import {
  Box,
  Typography,
  Grid,
  Button,
  makeStyles,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
} from "@material-ui/core";
import ButtonCircularProgress from "@component/ButtonCircularProgress";
import Axios from "axios";
import { toast } from "react-toastify";
import ApiConfig from "../../../config/APIConfig";
import { AuthContext } from "@context/Auth";

const useStyles = makeStyles((theme) => ({
  mainBox: {
    "& h2": {
      fontSize: "24px",
      fontWeight: "600",
    },
    "& h5": {
      fontSize: "16px",
    },
    "& h6": {
      fontSize: "15px",
    },

    "& .mainLine1": {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
      "& .setBox1": {
        display: "flex",
        alignItems: "center",
        "& .imageBox": {
          marginRight: "20px",
          maxWidth: "45px",
        },
      },
      "& .butonBox": {
        marginLeft: "25px",
        "@media(max-width:730px)": {
          marginLeft: "60px",
          marginTop: "10px",
        },
      },
    },
  },
  googleBtn: {
    color: "#848484",
    border: "1px solid #3a96dd",
    filter: "drop-shadow(0px 13px 27px rgba(0, 0, 0, 0.25))",
    padding: " 9px 10px !important",
    fontSize: " 13px",
    fontWeight: 400,
    borderRadius: "30px",
  },
  contentBox: {
    background: theme.palette.background.taf,
    borderRadius: "10px",
    padding: "10px 15px",
  },
  buttongrid: {
    display: "flex",
    [theme.breakpoints.down("xs")]: {
      display: "block",
    },
    "& .rightbutton": {
      fontSize: "14px",
      margin: "0px 10px",
      width: "100%",
      [theme.breakpoints.down("xs")]: {
        margin: "10px 0px",
      },
    },
  },
}));
const data = [
  {
    securityImage: "./images/security1.png",
    title: "Google Authentication",
    subTitle: "Used for withdraw & security modification",
    diffAuth: "Google Auth",
  },
  {
    securityImage: "./images/security2.png",
    title: "SMS Authentication",
    subTitle: "Used for withdraw & security modification",
    diffAuth: "SMS Auth",
  },
  {
    securityImage: "./images/security3.png",
    title: "Email Authentication",
    subTitle: "Used for withdraw & security modification",
    diffAuth: "Mail Auth",
  },
];
const Security = () => {
  const classes = useStyles();
  const auth = useContext(AuthContext);
  const statusverify = auth.userData;
  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);

  const [google, setGoogle] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [secretKey, setSecretKey] = useState("");
  const [googleData, setGoogleData] = useState();
  const [isSubmit, setIsSubmit] = useState(false);

  const [open, setOpen] = React.useState(false);
  const [smsData, setSmsData] = useState("");
  const [sms, setSms] = useState("");
  const [emailData, setEmailData] = useState("");

  const [msg, setMsg] = useState();

  const handleClose = () => {
    setOpen1(false);
  };
  const handleOpen = () => {
    setOpen1(true);
  };
  const handleClose3 = () => {
    setOpen3(false);
  };

  const googleAuth = async (values) => {
    handleOpen();
    try {
      setIsLoading("googlesend");
      const res = await Axios({
        method: "POST",
        url: ApiConfig.googleauth,
        headers: {
          token: window.localStorage.getItem("token"),
        },
        data: {
          speakeasy: "true",
        },
      });
      if (res.data.responseCode === 200) {
        toast.success(res.data.responseMessage);
        setSecretKey(res.data.result);
        setOpen1(true);
        setIsLoading(false);
      } else {
        setOpen1(true);
        setIsLoading(false);
        toast.warn(res.data.message);
      }
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      toast.error("Internal server error");
    }
  };
  const VerifyGoogleHandler = async (values) => {
    try {
      setIsLoading("googlesend");
      const res = await Axios({
        method: "POST",
        url: ApiConfig.verifygooglecode,
        headers: {
          token: window.localStorage.getItem("token"),
        },
        data: {
          otp: Number(googleData),
          authenticationType: "GOOGEL",
        },
      });

      if (res.data.responseCode === 200) {
        toast.success(res.data.responseMessage);
        setSecretKey(res.data.result);
        setOpen1(false);
        setIsLoading(false);
        secretKey("");

        handleClose();

        auth.getProfileHandler();
      } else {
        setOpen1(true);
        setIsLoading(false);
        toast.warn(res.data.responseMessage);
      }
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  const DisableGoogleHandlerApi = async (value) => {
    setIsSubmit(true);
    if (googleData !== "") {
      try {
        setIsLoading("googledisable");
        const res = await Axios({
          method: "GET",
          url: ApiConfig.twoFadisbaled,
          headers: {
            token: window.localStorage.getItem("token"),
          },
          // data: {
          //   otp: Number(googleData),
          // },
        });
        if (res.data.responseCode === 200) {
          setOpen(false);
          // toast.success(res.data.message);
          toast.success(res.data.responseMessage);
          handleClose();
          setIsLoading(false);
          auth.getProfileHandler();
        } else if (res.data.status === 205) {
          toast.warn(res.data.message);
          setIsLoading(false);
          setGoogle(res.data.message);
        } else {
          setIsLoading(false);
          toast.warn(res.data.message);
        }
      } catch (err) {
        console.log(err);
        setIsLoading(false);
        toast.error("Internal server error");
      }
    } else {
      toast.warn("Please enter your valid OTP");
    }
  };
  setTimeout(() => {
    setGoogle();
  }, 20000);

  //  SMS section

  const EmailSendHander = () => {
    setOpen3(true);
  };

  const emailEnableHandler = async (id) => {
    try {
      setIsLoading("emaildisable");
      const res = await Axios({
        method: "GET",
        url: ApiConfig.enableDisableEmailMobileNumberAuth,
        headers: {
          token: window.localStorage.getItem("token"),
        },
        params: {
          emailAuthentication: id,
        },
      });
      if (res.data.responseCode === 200) {
        toast.success(res.data.responseMessage);
        setIsLoading("");
        setOpen3(false);
        auth.getProfileHandler();
      }
    } catch (error) {
      setIsLoading("");
    }
  };
  const smsEnableHandler = async (id) => {
    try {
      setIsLoading("emaildisable");
      const res = await Axios({
        method: "GET",
        url: ApiConfig.enableDisableEmailMobileNumberAuth,
        headers: {
          token: window.localStorage.getItem("token"),
        },
        params: {
          mobileNumberAuthentication: id,
        },
      });
      if (res.data.responseCode === 200) {
        toast.success(res.data.responseMessage);
        setIsLoading("");
        setOpen2(false);
        auth.getProfileHandler();
      }
    } catch (error) {
      setIsLoading("");
    }
  };

  return (
    <>
      <Page title="Security">
        <Box style={{ marginTop: "20px" }} className={classes.mainBox}>
          <Box>
            <Box>
              <Typography variant="h2">Security</Typography>
              {/* <Typography variant="body1">
                Lorem ipsum dolor sit amet, consectetur adipiscing
              </Typography> */}
            </Box>
            <Box mt={3} className={classes.contentBox}>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <Box className="mainLine1" mt={2}>
                    <Box className="setBox1">
                      <Box className="imageBox">
                        <img
                          src="./images/security1.png"
                          alt="Google Authentication"
                        />
                      </Box>
                      <Box className="textBox">
                        <Typography variant="h5">
                          Google Authentication
                        </Typography>
                        <Typography variant="h6">
                          Used for withdraw & security modification
                        </Typography>
                      </Box>
                    </Box>
                    <Box className="butonBox" align="end">
                      <Typography variant="h6">
                        Google Auth :{" "}
                        <span
                          style={
                            auth.userData.speakeasy === true
                              ? { color: "green" }
                              : { color: "red" }
                          }
                        >
                          {auth.userData.speakeasy === true
                            ? "Enable"
                            : "Disable"}
                        </span>
                      </Typography>
                      <Button
                        className={classes.googleBtn}
                        onClick={() => {
                          if (auth.userData.speakeasy != true) {
                            googleAuth();
                          } else {
                            DisableGoogleHandlerApi();
                          }
                        }}
                        disabled={
                          statusverify.emailAuthentication === true ||
                          statusverify.mobileNumberAuthentication === true
                        }
                      >
                        {auth.userData.speakeasy === true
                          ? "Disable"
                          : "Enable"}{" "}
                        google Authentication
                      </Button>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <Box className="mainLine1" mt={2}>
                    <Box className="setBox1">
                      <Box className="imageBox">
                        <img
                          src="./images/security2.png"
                          alt="Google Authentication"
                        />
                      </Box>
                      <Box className="textBox">
                        <Typography variant="h5">SMS Authentication</Typography>
                        <Typography variant="h6">
                          Used for withdraw & security modification
                        </Typography>
                      </Box>
                    </Box>
                    <Box className="butonBox" align="end">
                      <Typography variant="h6">
                        SMS Auth :{" "}
                        <span
                          style={
                            auth.userData.mobileNumberAuthentication
                              ? { color: "green" }
                              : { color: "red" }
                          }
                        >
                          {auth.userData.mobileNumberAuthentication
                            ? "Enable"
                            : "Disable"}
                        </span>
                      </Typography>
                      <Button
                        className={classes.googleBtn}
                        onClick={() => {
                          setOpen2(true);
                        }}
                        disabled={
                          statusverify.speakeasy === true ||
                          statusverify.emailAuthentication === true
                        }
                      >
                        {auth.userData.mobileNumberAuthentication
                          ? "Disable"
                          : "Enable"}{" "}
                        Sms Authentication
                      </Button>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <Box className="mainLine1" mt={3} mb={2}>
                    <Box className="setBox1">
                      <Box className="imageBox">
                        <img
                          src="./images/security3.png"
                          alt="Google Authentication"
                        />
                      </Box>
                      <Box className="textBox">
                        <Typography variant="h5">
                          Email Authentication
                        </Typography>
                        <Typography variant="h6">
                          Used for withdraw & security modification
                        </Typography>
                      </Box>
                    </Box>
                    <Box className="butonBox" align="end">
                      <Typography variant="h6">
                        Mail Auth :{" "}
                        <span
                          style={
                            auth.userData.emailAuthentication
                              ? { color: "green" }
                              : { color: "red" }
                          }
                        >
                          {auth.userData.emailAuthentication
                            ? "Enable"
                            : "Disable"}
                        </span>
                      </Typography>
                      <Button
                        className={classes.googleBtn}
                        disabled={
                          statusverify.speakeasy === true ||
                          statusverify.mobileNumberAuthentication === true
                        }
                        onClick={() => {
                          EmailSendHander();
                        }}
                      >
                        {auth.userData.emailAuthentication
                          ? "Disable"
                          : "Enable"}{" "}
                        Mail Authentication
                      </Button>

                      <Typography style={{ color: "red" }}>{msg}</Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box>
        <Dialog
          disableScrollLock
          open={open1}
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          maxWidth="xs"
        >
          <DialogContent>
            <Box className={classes.modalbox}>
              {auth.userData.twoFaType === "GOOGLE" ? (
                <TextField
                  variant="outlined"
                  placeholder="Enter your code"
                  onChange={(e) => setGoogleData(e.target.value)}
                />
              ) : (
                <>
                  <Box>
                    <Typography variant="h4">Google Auth :</Typography>
                  </Box>
                  <Box mt={1}>
                    {/* <img src="images/chartimg.png" alt="" width="100%" /> */}
                    <img
                      src={
                        secretKey?.url ? secretKey?.url : "images/chartimg.png"
                      }
                      // src={`https://chart.googleapis.com/chart?chs=300x300&cht=qr&chl=&choe=UTF-8`}
                      alt=""
                      width="100%"
                    />
                  </Box>

                  <Box mt={1}>
                    <label>OTP</label>
                    <TextField
                      variant="outlined"
                      fullWidth
                      className="webkitcss"
                      placeholder="Enter your otp"
                      type="number"
                      onInput={(e) => {
                        e.target.value = Math.max(0, parseInt(e.target.value))
                          .toString()
                          .slice(0, 6);
                      }}
                      onKeyPress={(event) => {
                        if (event?.key === "-" || event?.key === "+") {
                          event.preventDefault();
                        }
                      }}
                      value={googleData}
                      onChange={(e) => setGoogleData(e.target.value)}
                      error={isSubmit && googleData === ""}
                      helperText={
                        isSubmit && googleData === "" && "Please enter your Otp"
                      }
                    />
                    <Typography
                      variant="h6"
                      style={{
                        color: " #e34813",
                        fontSize: "12px",
                        marginTop: " 2px",
                      }}
                    >
                      {google}
                    </Typography>
                  </Box>
                </>
              )}

              <Box
                mt={2}
                pb={2}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <Box className={classes.buttongrid}>
                  <Button
                    style={{ fontSize: "14px", width: "100%" }}
                    variant="contained"
                    color="primary"
                    size="large"
                    type="submit"
                    fullWidth
                    onClick={() => {
                      if (auth.userData.twoFaType != "GOOGLE") {
                        VerifyGoogleHandler();
                      } else {
                        DisableGoogleHandlerApi();
                      }
                    }}
                    disabled={isLoading || googleData === ""}
                  >
                    {auth.userData.twoFaType === "GOOGLE"
                      ? "Disable"
                      : "Enable"}{" "}
                    {isLoading && <ButtonCircularProgress />}
                  </Button>
                  <Button
                    className="rightbutton"
                    variant="contained"
                    color="primary"
                    size="large"
                    type="submit"
                    fullWidth
                    onClick={handleClose}
                  >
                    Cancel
                  </Button>
                </Box>
              </Box>
            </Box>
          </DialogContent>
        </Dialog>

        {/* Dialog Box SMS Auth */}
        <Box>
          <Dialog
            disableScrollLock
            open={open2}
            onClose={() => setOpen2(false)}
            aria-labelledby="customized-dialog-title"
            maxWidth="xs"
          >
            <DialogContent>
              <Box className={classes.modalbox}>
                <Box>
                  <Typography variant="h4">SMS Auth :</Typography>
                </Box>
                <Box mt={1}>
                  <Typography>
                    Are you sure want to{" "}
                    {auth.userData.mobileNumberAuthentication
                      ? "Disable"
                      : "Enable"}{" "}
                    ?
                  </Typography>

                  <Typography
                    variant="h6"
                    style={{
                      color: " #e34813",
                      fontSize: "12px",
                      marginTop: " 2px",
                    }}
                  >
                    {sms}
                  </Typography>
                </Box>
                <Box
                  mt={2}
                  pb={2}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Box className={classes.buttongrid}>
                    <Button
                      className="rightbutton"
                      variant="contained"
                      color="primary"
                      size="large"
                      type="submit"
                      onClick={() => setOpen2(false)}
                      disabled={isLoading}
                    >
                      Cancel
                    </Button>

                    <Button
                      style={{ fontSize: "14px", width: "100%" }}
                      variant="contained"
                      color="primary"
                      size="large"
                      type="submit"
                      disabled={isLoading}
                      onClick={() => {
                        if (!auth.userData.mobileNumberAuthentication) {
                          smsEnableHandler("true");
                        } else {
                          smsEnableHandler("false");
                        }
                      }}
                    >
                      {auth.userData.mobileNumberAuthentication
                        ? "Disable"
                        : "Enable"}{" "}
                      {isLoading && <ButtonCircularProgress />}
                    </Button>
                  </Box>
                </Box>
              </Box>
            </DialogContent>
          </Dialog>

          {/* Email Auth Dialog Box */}

          <Box>
            <Dialog
              disableScrollLock
              open={open3}
              onClose={handleClose3}
              aria-labelledby="customized-dialog-title"
              maxWidth="xs"
            >
              <DialogContent>
                <Box className={classes.modalbox}>
                  <Box>
                    <Typography variant="h4">Email Auth : </Typography>
                  </Box>

                  <Typography>
                    Are you sure want to{" "}
                    {auth.userData.emailAuthentication ? "Disable" : "Enable"} ?
                  </Typography>
                  <Box
                    mt={2}
                    pb={2}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    {" "}
                    <Box className={classes.buttongrid}>
                      <Button
                        style={{ fontSize: "14px", width: "100%" }}
                        variant="contained"
                        color="primary"
                        size="large"
                        type="submit"
                        disable={isLoading || emailData === ""}
                        onClick={() => {
                          if (!auth.userData.emailAuthentication) {
                            emailEnableHandler("true");
                          } else {
                            emailEnableHandler("false");
                          }
                        }}
                        // onClick={() => {
                        //   if (auth.userData.twoFaType != "EMAIL") {
                        //     VerifyEmailSmsHandle();
                        //   } else {
                        //     EmailSmsDiasableHandler();
                        //   }
                        // }}
                      >
                        {auth.userData.emailAuthentication
                          ? "Disable"
                          : "Enable"}{" "}
                        {isLoading === "emaildisable" && (
                          <ButtonCircularProgress />
                        )}
                      </Button>
                      <Button
                        className="rightbutton"
                        variant="contained"
                        color="primary"
                        size="large"
                        type="submit"
                        disabled={isLoading}
                        onClick={handleClose3}
                      >
                        Cancel
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </DialogContent>
            </Dialog>
          </Box>
        </Box>
      </Page>
    </>
  );
};

export default Security;
