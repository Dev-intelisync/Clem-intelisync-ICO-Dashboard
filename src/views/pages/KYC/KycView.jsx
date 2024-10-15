import {
  Avatar,
  Box,
  Grid,
  Typography,
  makeStyles,
  Button,
  Dialog,
  DialogContent,
} from "@material-ui/core";
import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "@context/Auth";
import "react-image-lightbox/style.css";
import moment from "moment";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import { Cancel } from "@material-ui/icons";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  applicationHeader: {
    background: "transparent",

    border: "2px solid #FFFFFF",
    borderRadius: "10px",
    "& h5": {
      fontFamily: "Inter",
      fontStyle: "normal",
      fontWeight: "500",
      fontSize: "16px",
      lineHeight: "24px",

      color: "#000",
      "@media(max-width:441px)": {
        fontSize: "12px",
      },
    },

    "& h6": {
      fontFamily: "Inter",
      fontStyle: "normal",
      fontWeight: "500",
      fontSize: "16px",
      lineHeight: "24px",

      color: " #000",
      "@media(max-width:441px)": {
        fontSize: "12px",
      },
    },
  },
  applictionSection: {
    display: "flex",

    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "2px solid rgba(255, 255, 255, 0.6)",
    padding: "10px",
  },
  applictionbox: {
    display: "flex",

    justifyContent: "space-between",
    alignItems: "center",

    padding: "10px",
  },
  applicationInfo: {
    paddingTop: "1.5rem",
    "& h5": {
      paddingBottom: ".5rem",
    },
    "& p": {
      paddingBottom: "1.2rem",
    },
  },
  infoSection: {
    display: "flex",
    "& p": {
      fontSize: "14px",
    },
  },
  kycbutton2: {
    marginLeft: "13px",
    height: "35px",
    background: "#4b7902",
    border: "none",
    fontSize: "11px",
    "&:hover": {
      background: "transparent",
    },
  },
  kycbutton: {
    marginLeft: "13px",
    height: "35px",
    background: "#f59a23",
    border: "none",
    fontSize: "11px",
    "&:hover": {
      background: "transparent",
    },
  },
  kycbutton1: {
    marginLeft: "13px",
    height: "35px",
    background: "#a30014",
    border: "none",
    fontSize: "11px",
    "&:hover": {
      background: "transparent",
    },
  },
  btnSection: {
    marginTop: "1rem",
    display: "flex",
    justifyContent: "end",
    alignItems: "center",
    "& button": {
      background: "red",
      color: "#000",
    },
  },
  statusSection: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
  },
  heading: {
    fontFamily: "Inter",
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: "36px",
    lineHeight: "54px",
    color: "#000",
  },
  infoId: {
    fontFamily: "Inter",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "16px",
    lineHeight: "24px",
    /* identical to box height */

    color: "#000 !important",
  },
  tableHeading: {
    fontFamily: "Inter",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "20px",
    lineHeight: "30px",
    /* identical to box height */

    color: "#000",
  },
}));
export default function KycView({ kycData }) {
  const classes = useStyles();
  const auth = useContext(AuthContext);
  const history = useHistory();
  const [openImageBackview, setOpenImageBackView] = useState(false);
  const [openImageBack, setOpenImageBack] = useState(false);
  const [openImageBox, setOpenImageBox] = useState(false);
  const [openImageView, setImageview] = useState(false);
  const [openImage, setOpenImage] = useState(false);
  const [openImageBox1, setOpenImageBox1] = useState(false);
  const [frontImageOpen, setFrontImage] = useState();
  const [imageBackOpen, setFrontBackImage] = useState();
  const [imageBackOpen11, setFrontBackImage22] = useState();
  const [imageSelfieOpen, setFrontSelfieImage] = useState();
  const [openImageSelfie, setOpenImageSelfie] = useState(false);
  const [lienceFront, setliecnseFront] = useState(false);
  const [frontImagesec, setFontimage] = useState();
  const [backImagsec, setBackimgae] = useState(false);
  const [lineceBackfont, setlieneceBack] = useState(false);
  const [imagelinceBack, setlinecbacimage] = useState();
  const frontimage = (item) => {
    setOpenImageBox(true);
    setFrontImage(item);
  };
  const frontimage22 = (item) => {
    setImageview(true);
    setFrontImage(item);
  };
  const backimage = (item) => {
    setOpenImageBack(true);
    setFrontBackImage(item);
  };

  const backimage22 = (item) => {
    setOpenImageBackView(true);
    setFrontBackImage22(item);
  };

  const selfieimage = (item) => {
    setOpenImageSelfie(true);
    setFrontSelfieImage(item);
  };

  const licenseFront11 = (item) => {
    setliecnseFront(true);
    setFrontImage(item);
  };

  const licenseBack11 = (item) => {
    setlieneceBack(true);
    setlinecbacimage(item);
  };

  const [kycDetails, setKycDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobileNumber: "",
    country: "",
    address: "",
  });

  useEffect(() => {
    if (auth?.userData) {
      setKycDetails({
        firstName: auth?.userData?.firstName ? auth?.userData?.firstName : "",
        lastName: auth?.userData?.lastName ? auth?.userData?.lastName : "",
        email: auth?.userData?.email ? auth?.userData?.email : "",
        mobileNumber: auth?.userData?.mobileNumber
          ? auth?.userData?.mobileNumber
          : "",
        country: auth?.userData?.country ? auth?.userData?.country : "",
        backIdUrl: auth?.kycData?.frontIdUrl ? auth?.kycData?.frontIdUrl : "",
        address: auth?.kycData?.address ? auth?.kycData?.address : "",
      });
    }
  }, [auth?.userData]);

  return (
    <Box mt={5}>
      <Grid container>
        <Grid lg={12} md={12} sm={12} xs={12}>
          <Box className={classes.statusSection}>
            <Box>
              <Typography className={classes.heading}>
                KYCs /
                <span style={{ textTransform: "capitalize" }}>
                  {auth?.userData?.firstName}
                  &nbsp;
                  {auth?.userData?.lastName}
                </span>
              </Typography>
            </Box>
            <Box style={{ paddingTop: "17px", paddingBottom: "8px" }}>
              {kycData?.approveStatus === "ACCEPTED" && (
                <Button
                  variant="contained"
                  // color="primary"
                  style={{ backgroundColor: "green", borderRadius: "10px" }}
                >
                  <Box
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <VerifiedUserIcon
                      style={{
                        color: "#000",
                        fontSize: "15px",
                      }}
                    />
                    &nbsp;
                    <span
                      style={{
                        display: "flex",
                        fontSize: "13px",
                        color: "#000",
                        alignItems: "center",
                      }}
                    >
                      Verified
                    </span>
                  </Box>
                </Button>
              )}

              {kycData?.approveStatus === "REJECT" && (
                <Button
                  variant="contained"
                  // color="primary"
                  style={{ backgroundColor: "red", borderRadius: "10px" }}
                >
                  <span style={{ color: "#FFA500", fontSize: "16px" }}></span>
                  <Box
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <VerifiedUserIcon
                      style={{
                        color: "#000",
                        fontSize: "15px",
                      }}
                    />
                    &nbsp;
                    <span
                      style={{
                        display: "flex",
                        fontSize: "13px",
                        color: "#000",
                        alignItems: "center",
                      }}
                    >
                      Revise
                    </span>
                  </Box>{" "}
                </Button>
              )}

              {kycData?.approveStatus === "PENDING" && (
                <Button
                  variant="contained"
                  // color="primary"
                  style={{
                    backgroundColor: "rgb(245, 154, 35)",
                    borderRadius: "10px",
                  }}
                >
                  <Box
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <VerifiedUserIcon
                      style={{
                        fontSize: "15px",
                        color: "#fff",
                      }}
                    />
                    &nbsp;
                    <span
                      style={{
                        display: "flex",
                        fontSize: "13px",
                        color: "#fff",
                        alignItems: "center",
                      }}
                    >
                      Under Review
                    </span>{" "}
                  </Box>
                </Button>
              )}
            </Box>
          </Box>
        </Grid>
        <Grid lg={6} md={6} sm={6} xs={12}>
          <Box>
            <Typography>
              {auth?.userData?.userType === "COMPANY" ? "Company Name :" : ""}
              &nbsp;{" "}
              <span style={{ fontWeight: "600" }}>
                {auth?.userData?.userType === "COMPANY" ? (
                  <>{auth?.userData?.companyName}</>
                ) : (
                  ""
                )}
              </span>
            </Typography>
          </Box>
          <Box className={classes.infoSection}>
            <Typography className={classes.infoId}>
              Application ID:{" "}
              <span style={{}}>
                {/* {kycData?.national?.documentName === "national" ? (
                  <>{kycData?.national?.idNumber}</>
                ) : (
                  ""
                )} */}

                {kycData?.national?.documentName === "national" &&
                kycData?.passport?.documentName === "passport" ? (
                  <>{kycData?.national?.idNumber}</>
                ) : (
                  ""
                )}
                {kycData?.driving?.documentName === "license" &&
                kycData?.passport?.documentName === "passport" ? (
                  <>{kycData?.driving?.idNumber}</>
                ) : (
                  ""
                )}

                {/* (passID === "" && nationalID === "") ||
      (lienseID === "" && passID === "") ||
      (nationalID === "" && lienseID === "") */}
              </span>
            </Typography>
            &nbsp;&nbsp;
            <Typography className={classes.infoId}>
              {kycData?.createdAt
                ? moment(kycData?.createdAt).format("lll")
                : ""}
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <Grid container spacing={4}>
        <Grid item lg={5} md={5} sm={12} xs={12}>
          <Box
            className={classes.applicationInfo}
            style={{ marginBottom: "5px" }}
          >
            <Typography className={classes.tableHeading}>
              Application Info
            </Typography>
          </Box>
          <Box>
            <Grid container>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <Box className={classes.applicationHeader}>
                  <Box className={classes.applictionSection}>
                    <Typography variant="h5">Submitted By</Typography>
                    <Typography variant="h6">
                      {kycDetails?.firstName}
                    </Typography>
                  </Box>
                  <Box className={classes.applictionSection}>
                    <Typography variant="h5">Submitted At</Typography>
                    <Typography variant="h6">
                      {" "}
                      {/* {moment(auth?.userData?.kyc?.createTime).format(
                          "MMMM Do YYYY, h:mm:ss a"
                        )} */}
                      {kycData?.createdAt
                        ? moment(kycData?.createdAt).format("lll")
                        : ""}
                    </Typography>
                  </Box>
                  <Box className={classes.applictionSection}>
                    <Typography variant="h5">Status</Typography>
                    {kycData?.approveStatus === "APPROVE" && (
                      <span
                        style={{
                          display: "flex",
                          fontSize: "13px",
                          color: "#4b7902",
                        }}
                      >
                        <VerifiedUserIcon
                          style={{
                            color: "#4b7902",

                            fontSize: "15px",
                          }}
                        />
                        Verified
                      </span>
                    )}
                    {kycData?.approveStatus === "REJECT" && (
                      <span style={{ color: "#FFA500", fontSize: "16px" }}>
                        Revise
                      </span>
                    )}
                    {kycData?.approveStatus === "PENDING" && (
                      <span
                        style={{
                          display: "flex",
                          fontSize: "13px",
                          color: "#f59a23",
                        }}
                      >
                        <VerifiedUserIcon
                          style={{
                            fontSize: "15px",
                            color: "#f59a23",
                          }}
                        />
                        Under Review
                      </span>
                    )}
                  </Box>

                  <Box className={classes.applictionbox}>
                    <Typography variant="h5">Accepted Time</Typography>
                    <Typography variant="h6">
                      {/* {moment(auth?.userData?.kyc?.createTime).format(
                          "MMMM Do YYYY, h:mm:ss a"
                        )} */}
                      {kycData?.updatedAt
                        ? moment(kycData?.updatedAt).format("lll")
                        : ""}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              {auth?.userData?.userType === "COMPANY" && (
                <>
                  <Box
                    className={classes.applicationInfo}
                    style={{ marginBottom: "5px" }}
                  >
                    <Typography variant="h4">
                      Company Share holder Info
                    </Typography>
                  </Box>
                  <Grid item lg={12} md={12} sm={12} xs={12}>
                    <Box className={classes.applicationHeader}>
                      <Box className={classes.applictionSection}>
                        <Typography variant="h5">Name</Typography>
                        <Typography variant="h6">
                          {kycData?.selectHolder?.designation}
                        </Typography>
                      </Box>
                      <Box className={classes.applictionSection}>
                        <Typography variant="h5">Designation</Typography>
                        <Typography variant="h6">
                          {kycData?.selectHolder?.name}
                        </Typography>
                      </Box>

                      <Box className={classes.applictionbox}>
                        <Typography variant="h5">Accepted Time</Typography>
                        <Typography variant="h6">
                          {/* {moment(auth?.userData?.kyc?.createTime).format(
                          "MMMM Do YYYY, h:mm:ss a"
                        )} */}
                          {kycData?.updatedAt
                            ? moment(kycData?.updatedAt).format("lll")
                            : ""}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                </>
              )}

              <Grid item lg={12} md={12} sm={12} xs={12}>
                <Box
                  className={classes.applicationInfo}
                  style={{ marginBottom: "5px" }}
                >
                  <Typography className={classes.tableHeading}>
                    Uploaded Documents
                  </Typography>
                </Box>
                <Box className={classes.applicationHeader}>
                  {kycData?.national?.documentName === "national" ? (
                    <>
                      <Box className={classes.applictionSection}>
                        <Typography variant="h5">Document Type</Typography>
                        <Typography variant="h6">
                          {kycData?.national?.documentName === "national"
                            ? "National "
                            : ""}
                        </Typography>
                      </Box>
                      {kycData?.national?.documentName === "national" ? (
                        <>
                          <Box className={classes.applictionSection}>
                            <Typography variant="h5">Front Side</Typography>
                            <Avatar
                              src={kycData?.national?.frontImage}
                              onClick={() =>
                                frontimage(kycData?.national?.frontImage)
                              }
                            />
                          </Box>
                        </>
                      ) : (
                        ""
                      )}

                      {openImageBox && (
                        <>
                          <Dialog
                            open={openImageBox}
                            onClose={() => setOpenImageBox(false)}
                            maxWidth="sm"
                            // fullWidth
                          >
                            <DialogContent>
                              <img
                                src={kycData?.national?.frontImage}
                                style={{ width: "100%" }}
                              />

                              <Cancel
                                onClick={() => setOpenImageBox(false)}
                                style={{
                                  position: "absolute",
                                  zIndex: "111111111",
                                  top: "0",
                                  right: "0",
                                  cursor: "pointer",
                                }}
                              />
                            </DialogContent>
                          </Dialog>
                        </>
                      )}
                      {kycData?.national?.documentName === "national" ? (
                        <>
                          <Box className={classes.applictionbox}>
                            <Typography variant="h5">Back Side</Typography>

                            <Avatar
                              src={kycData?.national?.backImage}
                              onClick={() =>
                                backimage(kycData?.national?.backImage)
                              }
                            />
                          </Box>
                        </>
                      ) : (
                        ""
                      )}
                      {openImageBack && (
                        <>
                          <Dialog
                            open={imageBackOpen}
                            maxWidth="sm"
                            onClose={() => setOpenImageBack(false)}
                          >
                            <Cancel
                              onClick={() => setOpenImageBack(false)}
                              style={{
                                position: "absolute",
                                zIndex: "11111111",
                                top: "0",
                                right: "0",
                                cursor: "pointer",
                              }}
                            />
                            <DialogContent fullWidth>
                              <img
                                src={kycData?.national?.backImage}
                                onCloseRequest={() => setOpenImageBack(false)}
                                style={{ width: "100%" }}
                              />
                            </DialogContent>
                          </Dialog>
                        </>
                      )}
                    </>
                  ) : (
                    ""
                  )}

                  {kycData?.passport?.documentName === "passport" ? (
                    <>
                      <Box className={classes.applictionSection}>
                        <Typography variant="h5">Document Type</Typography>
                        <Typography variant="h6">
                          {kycData?.passport?.documentName === "passport"
                            ? "Passport"
                            : ""}
                        </Typography>
                      </Box>
                      {kycData?.passport?.documentName === "passport" ? (
                        <>
                          <Box className={classes.applictionSection}>
                            <Typography variant="h5">Front Side</Typography>
                            <Avatar
                              src={kycData?.passport?.frontImage}
                              onClick={() =>
                                frontimage22(kycData?.passport?.frontImage)
                              }
                            />
                          </Box>
                        </>
                      ) : (
                        ""
                      )}

                      {openImageView && (
                        <>
                          <Dialog
                            open={openImageView}
                            onClose={() => setImageview(false)}
                            maxWidth="sm"
                            // fullWidth
                          >
                            <DialogContent>
                              <img
                                src={kycData?.passport?.frontImage}
                                style={{ width: "100%" }}
                              />

                              <Cancel
                                onClick={() => setImageview(false)}
                                style={{
                                  position: "absolute",
                                  zIndex: "111111111",
                                  top: "0",
                                  right: "0",
                                  cursor: "pointer",
                                }}
                              />
                            </DialogContent>
                          </Dialog>
                        </>
                      )}

                      {kycData?.passport?.documentName === "passport" ? (
                        <>
                          <Box className={classes.applictionbox}>
                            <Typography variant="h5">Back Side</Typography>

                            <Avatar
                              src={kycData?.passport?.backImage}
                              onClick={() =>
                                backimage22(kycData?.passport?.backImage)
                              }
                            />
                          </Box>
                        </>
                      ) : (
                        ""
                      )}

                      {openImageBackview && (
                        <>
                          <Dialog
                            open={imageBackOpen11}
                            maxWidth="sm"
                            onClose={() => setOpenImageBackView(false)}
                          >
                            <Cancel
                              onClick={() => setOpenImageBackView(false)}
                              style={{
                                position: "absolute",
                                zIndex: "11111111",
                                top: "0",
                                right: "0",
                                cursor: "pointer",
                              }}
                            />
                            <DialogContent fullWidth>
                              <img
                                src={kycData?.passport?.backImage}
                                onCloseRequest={() => setOpenImage(false)}
                                style={{ width: "100%" }}
                              />
                            </DialogContent>
                          </Dialog>
                        </>
                      )}
                    </>
                  ) : (
                    ""
                  )}

                  {/* license */}

                  {kycData?.driving?.documentName === "license" ? (
                    <>
                      <Box className={classes.applictionSection}>
                        <Typography variant="h5">Document Type</Typography>
                        <Typography variant="h6">
                          {kycData?.driving?.documentName === "license"
                            ? "License"
                            : ""}
                        </Typography>
                      </Box>

                      {kycData?.driving?.documentName === "license" ? (
                        <>
                          <Box className={classes.applictionSection}>
                            <Typography variant="h5">Front Side</Typography>

                            <Avatar
                              src={kycData?.driving?.frontImage}
                              onClick={() =>
                                licenseFront11(kycData?.driving?.frontImage)
                              }
                            />
                          </Box>
                        </>
                      ) : (
                        ""
                      )}

                      {lienceFront && (
                        <>
                          <Dialog
                            open={lienceFront}
                            onClose={() => setliecnseFront(false)}
                            maxWidth="sm"
                            // fullWidth
                          >
                            <DialogContent>
                              <img
                                src={kycData?.driving?.frontImage}
                                style={{ width: "100%" }}
                              />

                              <Cancel
                                onClick={() => setliecnseFront(false)}
                                style={{
                                  position: "absolute",
                                  zIndex: "111111111",
                                  top: "0",
                                  right: "0",
                                  cursor: "pointer",
                                }}
                              />
                            </DialogContent>
                          </Dialog>
                        </>
                      )}

                      {kycData?.driving?.documentName === "license" ? (
                        <>
                          <Box className={classes.applictionbox}>
                            <Typography variant="h5">Back Side</Typography>

                            <Avatar
                              src={kycData?.driving?.backImage}
                              onClick={() =>
                                licenseBack11(kycData?.driving?.backImage)
                              }
                            />
                          </Box>
                        </>
                      ) : (
                        ""
                      )}

                      {lineceBackfont && (
                        <>
                          <Dialog
                            open={imagelinceBack}
                            maxWidth="sm"
                            onClose={() => setlieneceBack(false)}
                          >
                            <Cancel
                              onClick={() => setlieneceBack(false)}
                              style={{
                                position: "absolute",
                                zIndex: "11111111",
                                top: "0",
                                right: "0",
                                cursor: "pointer",
                              }}
                            />
                            <DialogContent fullWidth>
                              <img
                                src={kycData?.driving?.backImage}
                                onCloseRequest={() => setlieneceBack(false)}
                                style={{ width: "100%" }}
                              />
                            </DialogContent>
                          </Dialog>
                        </>
                      )}
                    </>
                  ) : (
                    ""
                  )}
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid item lg={7} md={7} sm={12} xs={12}>
          <Box
            className={classes.applicationInfo}
            style={{ marginBottom: "5px" }}
          >
            <Typography className={classes.tableHeading}>
              Applicant Information
            </Typography>
          </Box>
          <Box className={classes.applicationHeader}>
            <Box className={classes.applictionSection}>
              <Typography variant="h5">First Name</Typography>
              <Typography variant="h6">{kycDetails?.firstName} </Typography>
            </Box>
            <Box className={classes.applictionSection}>
              <Typography variant="h5">Last Name</Typography>
              <Typography variant="h6">{kycDetails?.lastName}</Typography>
            </Box>
            <Box className={classes.applictionSection}>
              <Typography variant="h5">Email Address</Typography>
              <Typography variant="h6">{kycDetails?.email}</Typography>
            </Box>
            <Box className={classes.applictionSection}>
              <Typography variant="h5">Phone Number</Typography>
              <Typography variant="h6">{kycDetails?.mobileNumber}</Typography>
            </Box>
            <Box className={classes.applictionSection}>
              <Typography variant="h5">Full Address</Typography>
              <Typography variant="h6">{auth?.userData?.address}</Typography>
            </Box>
            <Box className={classes.applictionbox}>
              <Typography variant="h5">Country of Residence</Typography>
              <Typography variant="h6">{kycDetails?.country}</Typography>
            </Box>
          </Box>
          <Grid lg={12} md={12} sm={12} xs={12}>
            {kycData?.approveStatus === "REJECT" && (
              <Box className={classes.btnSection}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() =>
                    history.push({
                      pathname: "/add-kyc",
                      state: kycData,
                    })
                  }
                >
                  RE-SUBMIT
                </Button>
              </Box>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
