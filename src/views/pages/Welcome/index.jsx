import React, { useState, useEffect, useContext } from "react";
import {
  Button,
  Grid,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Typography,
  Container,
  ListItem,
  List,
  CircularProgress,
  ListItemIcon,
} from "@material-ui/core";
import Page from "@component/Page";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import {
  MdCheckCircleOutline,
  MdDataUsage,
  MdDonutLarge,
  MdOutlinePending,
} from "react-icons/md";
import { AiOutlineForm } from "react-icons/ai";
import { AuthContext } from "@context/Auth";
import { Icon } from "@iconify/react";
import { useHistory } from "react-router-dom";
import ButtonCircularProgress from "@component/ButtonCircularProgress";
import PageLoading from "../../../component/PageLoading";
const useStyles = makeStyles((theme) => ({
  WelcomeBox: {
    marginTop: "80px",

    [theme.breakpoints.down("md")]: {
      marginTop: "20px",
    },
    "& p": {
      fontSize: "14px !important",
      [theme.breakpoints.down("xs")]: {
        fontSize: "13px !important",
      },
    },
    "& .subbox": {
      padding: "24px",
    },
  },
  CloseButton: {
    color: "#fff",
    padding: "9px 20px !important",
    fontSize: "14px",

    width: "144.45px",
    height: "33.26px",

    border: "none",
    background: "#56CA00",
    borderRadius: "5px",
    // "&:hover": {
    //   backgroundColor:
    //     "linear-gradient(180deg, #00ACEB 0%, #00B0ED 10.18%, #1069C2 70.35%, #1069C2 100%)",
    // },
  },
  border: {
    padding: "24px",
    borderBottom: "3px solid #FFFFFF",
    "& h4": {
      fontSize: "20px !important",
      [theme.breakpoints.down("xs")]: {
        fontSize: "18px !important",
      },
    },
    "& p": {
      fontSize: "14px !important",
      [theme.breakpoints.down("xs")]: {
        fontSize: "13px !important",
      },
    },
  },
  borderTop: {
    borderTop: "1px solid #80808038",
    borderRight: "1px solid #80808038",
    padding: "24px",
    [theme.breakpoints.down("sm")]: {
      padding: "24px 24px 0px 24px",
    },
  },
  kycbox: {
    padding: "24px",
    [theme.breakpoints.down("sm")]: {
      padding: "0px 24px 24px 24px",
    },
    "& h3": {
      fontSize: "25px !important",
      [theme.breakpoints.down("xs")]: {
        fontSize: "18px !important",
      },
    },
    "& p": {
      fontSize: "14px !important",
      [theme.breakpoints.down("xs")]: {
        fontSize: "13px !important",
      },
    },
  },
  Name: {
    fontFamily: "Inter",
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: "36px",
    lineHeight: "54px",
    color: "#FFFFFF",
  },
  instruction: {
    fontFamily: "Inter",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "16px",
    lineHeight: "24px",
    color: "#FFFFFF",
  },
  title: {
    fontFamily: "Inter",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "16px",
    lineHeight: "24px",
    color: "#FFFFFF",
  },
}));

export default function Token({ size }) {
  const classes = useStyles();

  const auth = useContext(AuthContext);
  const history = useHistory();
  useEffect(() => {
    if (auth?.kycData?.documentStatus === "ACCEPTED") {
      history.push("/dashboard");
    }
  }, [auth?.kycData?.documentStatus === "ACCEPTED"]);
  return (
    <Page title="Token">
      {auth?.kycData?.length === 0 ? (
        <PageLoading />
      ) : (
        <Box mb={3}>
          <Container maxWidth="lg">
            <Box mt={4} mb={3}>
              <Typography className={classes.Name}>
                {auth?.userData?.firstName}&nbsp;{auth?.userData?.lastName}
              </Typography>
              <Typography className={classes.instruction}>
                Welcome to our VD Crypto Dashboard. You are few steps away to
                complete your profile. These are required to buy and sell on our
                platform! Let’s start!
              </Typography>
            </Box>
            <Box className={classes.WelcomeBox}>
              <Grid
                container
                spacing={3}
                style={{ border: "3px solid #FFFFFF", borderRadius: "10px" }}
              >
                <Grid
                  item
                  xs={12}
                  md={4}
                  sm={12}
                  lg={4}
                  style={{ borderRight: "3px solid #FFFFFF", padding: "0px" }}
                >
                  <Box className={classes.border}>
                    <Typography className={classes.title}>
                      Let’s Finish Registration
                    </Typography>
                    <Typography className={classes.instruction}>
                      Only few minutes required to complete your registration
                      and set up your account.
                    </Typography>
                  </Box>
                  <Box className={classes.borderTop}>
                    <List>
                      {auth?.userData?.email ? (
                        <ListItem className={classes.instruction}>
                          Email verified
                        </ListItem>
                      ) : (
                        <ListItem className={classes.instruction}>
                          Verify email address
                        </ListItem>
                      )}

                      {auth?.kycData?.documentStatus === "ACCEPTED" ? (
                        <ListItem className={classes.instruction}>
                          Verified
                        </ListItem>
                      ) : (
                        <>
                          {" "}
                          {auth?.kycData?.documentStatus === "PENDING" ? (
                            <ListItem className={classes.instruction}>
                              Under Review
                            </ListItem>
                          ) : (
                            <>
                              {" "}
                              {auth?.kycData?.documentStatus === "REJECTED" ? (
                                <ListItem className={classes.instruction}>
                                  Revise
                                </ListItem>
                              ) : (
                                <>
                                  <ListItem className={classes.instruction}>
                                    Not Applied
                                  </ListItem>
                                </>
                              )}
                            </>
                          )}
                        </>
                      )}
                    </List>
                  </Box>
                </Grid>
                <Grid item xs={12} md={8} sm={10} lg={8}>
                  <Box className={classes.kycbox}>
                    <Typography className={classes.title}>
                      Complete Your KYC
                    </Typography>
                    <Typography className={classes.instruction}>
                      Looks like your have not verified your indentity yet.
                      Please verify yourself to get full access to digital
                      wallet.
                    </Typography>
                    <Box mt={3} mb={2}>
                      <List>
                        <ListItem className={classes.instruction}>
                          <ListItemIcon></ListItemIcon>
                          Fiat Currency Wallet (BTC, ETH, BNB, USDT)
                        </ListItem>
                        <ListItem className={classes.instruction}>
                          <ListItemIcon></ListItemIcon>
                          10+ Digital Crypto Wallet (BTC, ETH, BNB, USDT etc)
                        </ListItem>
                        <ListItem className={classes.instruction}>
                          <ListItemIcon></ListItemIcon>
                          Receive and send payment with NioWallet
                        </ListItem>
                      </List>
                    </Box>
                    {auth?.userData?.kyc?.kycStatus === "ACCEPTED" ? (
                      ""
                    ) : (
                      <Button
                        className={classes.CloseButton}
                        // color="primary"
                        // variant="contained"
                        // size="small"
                        // style={{
                        //   padding: "8px 12px",
                        //   background: "#56CA00",
                        //   color: "#fff",
                        // }}
                        component={Link}
                        to="/add-kyc"
                      >
                        Get started
                      </Button>
                    )}
                  </Box>
                </Grid>
              </Grid>
            </Box>
            <Box
              className={classes.WelcomeBox}
              style={{ border: "3px solid #FFFFFF", borderRadius: "10px" }}
            >
              <Box className="subbox">
                <Grid container spacing={3} alignItems="center">
                  <Grid item xs={12} md={10} sm={12} lg={10}>
                    <Typography className={classes.title}>
                      We’re here to help you!
                    </Typography>
                    <Typography className={classes.instruction}>
                      Ask a question or file a support ticket, manage request,
                      report an issues. Our team support team will get back to
                      you by email.
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={2} sm={12} lg={2}>
                    <Button
                      className={classes.CloseButton}
                      // color="primary"
                      // variant="contained"
                      // size="small"
                      // style={{
                      //   padding: "8px 12px",
                      //   background: "#56CA00",
                      //   color: "#fff",
                      // }}
                      component={Link}
                      to="/contact-us"
                    >
                      {" "}
                      Contact Us
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Container>
        </Box>
      )}
    </Page>
  );
}
