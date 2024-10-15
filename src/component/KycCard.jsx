import { Typography, Box, Grid, Button, TextField } from "@material-ui/core";
import React, { useContext, useState, useEffect } from "react";
import moment from "moment";
import { AuthContext } from "../context/Auth";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import { makeStyles } from "@material-ui/styles";
import Axios from "axios";
import ApiConfig from "../config/APIConfig";

const useStyles = makeStyles((theme) => ({
  lebelBox: {
    "& label": {
      fontSize: "11px",
      color: "#dcd0d0bf",
    },
  },
  imageSection: {
    marginTop: "38px",
    borderRadius: "20px",
    border: "1px solid #80808038",
    cursor: "pointer",
    padding: "20px",
    position: "relative",
    background: "#1d16169e",
    boxShadow: "rgb(0 0 0 / 16%) 0px 1px 4px",
    transition: "0.3s",
    "& figure": {
      height: "230px",
      overflow: "hidden",
      position: "relative",
      background: "rgba(0,0,0,0.7)",
      borderRadius: "20px",
      backgroundSize: "100% !important",
      backgroundRepeat: "no-repeat !important",
      backgroundPosition: "center !important",
      margin: "0",
    },
    "& img": {
      top: "50%",
      left: "50%",
      width: "auto",
      height: "auto",
      position: "absolute",
      minWidth: "100%",
      transform: "translate(-50%, -50%)",
      minHeight: "100%",
      transition: "0.5s",
    },
  },
  kycbutton: {
    marginLeft: "13px",
    height: "35px",
    // background: "#f59a23",
    border: "none",
    fontSize: "11px",
  },
  kycbutton1: {
    marginLeft: "13px",
    height: "35px",
    background: "#a30014",
    border: "none",
    fontSize: "11px",
    "&:hove": {
      background: "transparent",
    },
  },
  kycbutton2: {
    marginLeft: "13px",
    height: "35px",
    background: "#4b7902",
    border: "none",
    fontSize: "11px",
    "&:hove": {
      background: "transparent",
    },
  },
  kycbuttonReject: {
    marginLeft: "13px",
    height: "35px",
    background: "#a30014",
    border: "none",
    fontSize: "11px",
    "&:hove": {
      background: "transparent",
    },
  },
  boderSection: {
    borderTop: "1px solid gray",
    marginTop: "30px",
  },
}));

export default function KycCard() {
  const classes = useStyles();
  const auth = useContext(AuthContext);
  const [kycData, setKycData] = useState([]);
  const [isLoading, setLoader] = useState(false);
  const [kycDetails, setKycDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobileNumber: "",
    country: "",
  });

  useEffect(() => {
    if (auth?.userData) {
      setKycDetails({
        firstName: auth?.userData?.firstName ? auth?.userData?.firstName : "",
        lastName: auth?.userData?.lastName ? auth?.userData?.lastName : "",
        email: auth?.userData?.email ? auth?.userData?.email : "",
        mobileNumber: auth?.userData?.phoneNo ? auth?.userData?.phoneNo : "",
        country: auth?.userData?.country ? auth?.userData?.country : "",
      });
    }
  }, [auth?.userData]);
  const getKycList = async () => {
    setLoader(true);
    try {
      const res = await Axios.get(ApiConfig.getKycList, {
        headers: {
          token: window.localStorage.getItem("token"),
        },
      });
      if (res.data.responseCode === 200) {
        setKycData(res.data.data.document.reverse[0]);
        setLoader(false);
        auth.getProfileHandler();
      }
    } catch (error) {
      setLoader(false);
    }
  };
  useEffect(() => {
    getKycList();
  }, []);
  return (
    <>
      <Box
        style={{
          background:
            "radial-gradient(34% 57.15% at 92.64% 16%, rgba(254, 184, 90, 0.3) 0%, rgba(254, 184, 90, 0) 100%), rgba(27, 26, 31, 0.6)",
          borderRadius: 16,
          padding: 20,
          minHeight: 95,
        }}
      >
        <Grid container spacing={2}>
          <Grid item lg={6} sm={6} md={6}>
            <Box style={{ display: "flex", alignItems: "center" }}>
              <Typography variant="h6">Your KYC details</Typography>
              <img
                ..="images/kycdeatil.png"
                alt="iamge"
                style={{
                  width: "60px",
                  objectFit: "contain",
                  marginLeft: "13px",
                }}
              />
            </Box>
          </Grid>
          <Grid
            item
            lg={6}
            sm={6}
            md={6}
            xs={12}
            style={{ display: "flex", justifyContent: "flex-end" }}
          >
            <Box>
              <Box style={{ display: "flex", alignItems: "center" }}>
                <Typography variant="body2">
                  {moment(auth?.userData?.kyc?.createTime).format(
                    "MMMM Do YYYY, h:mm:ss a"
                  )}
                </Typography>
                {auth?.userData?.kyc?.document[0]?.documentStatus ===
                  "PENDING" && (
                  <Button
                    variant="contained"
                    color="primary"
                    href="#contained-buttons"
                    // className={classes.kycbutton}
                    style={{ color: "#fff !important" }}
                  >
                    <VerifiedUserIcon
                      style={{
                        marginRight: "2px",
                        fontSize: "17px",
                      }}
                    />
                    Under Review
                  </Button>
                )}
                {auth?.userData?.kyc?.document[0]?.documentStatus ===
                  "REJECTED" && (
                  <Button
                    variant="contained"
                    color="secondary"
                    href="#contained-buttons"
                    className={classes.kycbutton1}
                    style={{}}
                  >
                    Rejected
                  </Button>
                )}
                {auth?.userData?.kyc?.kycStatus === "ACCEPTED" && (
                  <Button
                    variant="contained"
                    color="secondary"
                    href="#contained-buttons"
                    className={classes.kycbutton2}
                    style={{}}
                  >
                    <VerifiedUserIcon
                      style={{
                        marginRight: "2px",
                        fontSize: "17px",
                      }}
                    />
                    Verified
                  </Button>
                )}
                {/* <Button
                  variant="contained"
                  color="secondary"
                  href="#contained-buttons"
                  className={classes.kycbutton}
                  style={{}}
                >
                  <VerifiedUserIcon
                    style={{ marginRight: "2px", fontSize: "17px" }}
                  />
                  KYC Verified
                </Button> */}
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Box>
          <Grid container spacing={2}>
            <Grid item lg={4} sm={6} md={6} xs={12}>
              <Box className={classes.lebelBox} mb={2}>
                <label>Name</label>
                <TextField
                  className={classes.forminput}
                  type="text"
                  fullWidth
                  variant="outlined"
                  disabled={true}
                  name="icoAmount"
                  value={`${auth?.userData?.firstName} ${auth?.userData?.lastName}`}
                  style={{ color: "#fff" }}

                  // onChange={handleChange}
                />
              </Box>
            </Grid>
            <Grid item lg={4} sm={6} md={6} xs={12}>
              <Box className={classes.lebelBox} mb={2}>
                <label>Email</label>
                <TextField
                  className={classes.forminput}
                  type="text"
                  fullWidth
                  variant="outlined"
                  name="icoAmount"
                  disabled={true}
                  inputProps={{ maxLength: 256 }}
                  value={auth?.userData?.email}
                  style={{ color: "#000" }}

                  // onChange={handleChange}
                />
              </Box>
            </Grid>
            <Grid item lg={4} sm={6} md={6} xs={12}>
              <Box className={classes.lebelBox} mb={2}>
                <label>Number</label>
                <TextField
                  className={classes.forminput}
                  type="text"
                  fullWidth
                  variant="outlined"
                  disabled={true}
                  name="icoAmount"
                  value={auth?.userData?.mobileNumber}
                  style={{ color: "#000" }}

                  // onChange={handleChange}
                />
              </Box>
            </Grid>

            <Grid item lg={4} sm={6} md={6} xs={12}>
              <Box className={classes.lebelBox}>
                <label>Country</label>
                <TextField
                  className={classes.forminput}
                  type="text"
                  fullWidth
                  variant="outlined"
                  disabled={true}
                  name="icoAmount"
                  value={auth?.userData?.country}
                  style={{ color: "#000" }}

                  // onChange={handleChange}
                />
              </Box>
            </Grid>
            <Grid item lg={4} sm={6} md={6} xs={12}>
              <Box className={classes.lebelBox}>
                <label>Document ID</label>
                <TextField
                  className={classes.forminput}
                  type="text"
                  fullWidth
                  variant="outlined"
                  name="icoAmount"
                  disabled={true}
                  value={auth?.userDataList?.docIdNumber}
                  style={{ color: "#000" }}

                  // onChange={handleChange}
                />
              </Box>
            </Grid>
            <Grid item lg={4} sm={6} md={6} xs={12}>
              <Box className={classes.lebelBox}>
                <label>Document Type </label>
                <TextField
                  className={classes.forminput}
                  type="text"
                  fullWidth
                  variant="outlined"
                  name="icoAmount"
                  disabled={true}
                  value={auth?.userDataList?.docName}
                  style={{ color: "#000" }}

                  // onChange={handleChange}
                />
              </Box>
            </Grid>
          </Grid>
        </Box>

        <Box className={classes.boderSection}>
          <Grid container spacing={3}>
            <Grid item lg={1} md={12} sm={12} xs={12}></Grid>
            <Grid item lg={5} md={6} sm={6} xs={12}>
              <Box className={classes.imageSection}>
                <figure>
                  <img
                    ..={auth?.userDataList?.frontIdUrl}
                    alt=""
                    width="100%"
                  />
                </figure>
              </Box>
            </Grid>
            <Grid item lg={5} md={6} sm={6} xs={12}>
              <Box className={classes.imageSection}>
                <figure>
                  <img
                    ..={auth?.userDataList?.backIdUrl}
                    alt=""
                    width="100%"
                  />
                </figure>
              </Box>
            </Grid>
            <Grid item lg={1} md={6} sm={6} xs={12}></Grid>
          </Grid>
        </Box>

        <Box align="center" mt={2}>
          {auth?.userData?.kyc?.document[0]?.documentStatus === "REJECTED" ? (
            <Button
              variant="contained"
              color="secondary"
              href="#contained-buttons"
              className={classes.kycbuttonReject}
              style={{}}
            >
              Re-submit Now
            </Button>
          ) : (
            <Button variant="contained" color="primary">
              Back
            </Button>
          )}
        </Box>
      </Box>

      {/* <Box style={{ marginTop: ".8rem" }}>
        <Typography>Added Documents :</Typography>
      </Box> */}
    </>
  );
}
