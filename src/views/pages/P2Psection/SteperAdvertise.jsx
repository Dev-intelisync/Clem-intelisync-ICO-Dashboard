import React, { useState, useEffect, useContext } from "react";
import {
  makeStyles,
  DialogContent,
  Dialog,
  Box,
  DialogActions,
  Divider,
  Grid,
} from "@material-ui/core";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import PostStep from "./PostStep1";
import TrandingAmount from "./TrandingAmount";
import AutomaticResponse from "./AutomaticResponse";
import { useHistory } from "react-router-dom";
import ApiConfig from "../../../config/APIConfig";
import axios from "axios";
import { AuthContext } from "@context/Auth";
import { toast } from "react-toastify";
// import TradeAnyTime from "@component/TradeAnyTime";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: "40px",

    "& h2": {
      color: theme.palette.text.Steper,
      fontSize: "14px",
    },
  },

  backButton: {
    marginRight: theme.spacing(1),
  },
  CloseButton: {
    color: "#fff",
    padding: "9px 30px !important",
    fontSize: "14px",
    background:
      "linear-gradient(180deg, #00ACEB 0%, #00B0ED 10.18%, #1069C2 70.35%, #1069C2 100%)",
    borderRadius: "4px",
    backgroundColor: "#fff",
    boxShadow: "0px 13px 27px rgb(0 0 0 / 25%)",

    "&:hover": {
      backgroundColor: "red",
    },
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  mainSteperRoot: {
    "& h6": {
      color: theme.palette.text.stperContent,
    },
    "& h5": {
      color: theme.palette.text.stperContent,
    },
  },
}));

function getSteps() {
  return [
    "Set Type & Price",
    "Set Trading Amount & Payment Method",
    "Set Remarks & Automatic Response",
  ];
}

export default function HorizontalLabelPositionBelowStepper() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [priceUSD, setPriceUSD] = React.useState(0);
  const [priceINR, setPriceINR] = React.useState(0);
  const [bankId, setBankId] = useState("");
  const [quanityPrice, setQuanityPrice] = useState();
  const history = useHistory();
  const auth = useContext(AuthContext);

  const [formData, setFormData] = useState({
    assets: "NA",
    orderType: "BUY",
    country: "NA",
    fiatCoin: "NA",
    margin: 1,
    paymentType: "ALL",
    restrictAmount: "",
    walletMethod: "withEscrow",
    isKYC: false,
    termsOfTrade: "",
    paymentWindow: 0,
    availableBalance: 0,
    maxValue: "",
    minValue: "",
    quanitity: "",
    price: "",
    priceType: "",
    totalAmount: "",
    autoReplyMessage: "",
  });
  const CryptoCoin = window.location.search.split("?")[1];

  useEffect(() => {
    //iNRPriceinUSD
    if (auth.cmcResults.length > 0) {
      let cmcCoinPrice = auth.cmcResults.filter(
        (results) => results.symbol == CryptoCoin
      )[0]?.quote.USD.price;
      setPriceUSD(cmcCoinPrice);
      setPriceINR(cmcCoinPrice * auth.iNRPriceinUSD);
    }
  }, [auth.cmcResults, auth.iNRPriceinUSD]);
  const [bankDetails, setBankD] = useState([]);
  const [bankData, setBankData] = useState([]);
  const [banksType, setbanksType] = useState([]);

  const getUserBankList = async () => {
    try {
      const res = await axios.get(ApiConfig.listBank, {
        headers: {
          token: window.localStorage.getItem("token"),
        },
      });
      if (res.data.responseCode === 200) {
        setBankData(res.data.result);
        var data = res.data.result;
        var newRequest = [];
        data.map((accountsD) => {
          newRequest.push(accountsD.bankName);
        });
        setBankD(newRequest);
      } else if (res.data.responseCode === 201) {
      }
    } catch (error) {
      console.log("err", error);
    }
  };
  useEffect(() => {
    getUserBankList();
  }, []);
  const steps = getSteps();
  const [isSubmit, setIsSubmit] = useState(false);
  const [block, setBlock] = useState(false);
  const [isLoader, setIsLoader] = useState(false);
  const handleClose2 = () => {
    setBlock(false);
  };
  const handleClickOpen2 = () => {
    setBlock(true);
  };

  const handleNext = () => {
    setIsSubmit(true);
    console.log(
      "-------formData.country formData.country--------",
      formData.country
    );
    if (
      activeStep == 0 &&
      formData.country != "NA" &&
      formData.fiatCoin != "NA" &&
      formData.price != "" &&
      formData.priceType != "" &&
      formData.assets != "NA" &&
      formData.margin > 0 &&
      formData.availableBalance > formData.price
    ) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setIsSubmit(false);
    }
    if (
      activeStep == 1 &&
      formData.minValue != "" &&
      bankId != "" &&
      formData.paymentWindow != 0 &&
      formData.maxValue != "" &&
      Number(formData?.maxValue) <= Number(formData.price) &&
      Number(formData.maxValue) > Number(formData.minValue)
      // formData.totalAmount != ""
    ) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setIsSubmit(false);
    }
    if (
      activeStep == 2 &&
      formData.minValue != "" &&
      formData.maxValue != ""
      // formData.totalAmount != ""
    ) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setIsSubmit(false);
    }
  };

  // useEffect(() => {
  //   // console.log("slkdjflksdjf", steps.length);
  //   if (activeStep === steps.length - 0) {
  //     setBlock(true);
  //   }
  // }, [activeStep]);

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const AddPostAd = async () => {
    try {
      let greetingMessage;
      let remark;
      if (formData.autoReplyMessage) {
        greetingMessage = formData.autoReplyMessage;
      }
      if (formData.termsOfTrade) {
        remark = formData.termsOfTrade;
      }
      const res = await axios({
        method: "POST",
        url: ApiConfig.addAdvertisment,
        // params: {
        //   ticketId: ticket_ID,
        // },
        headers: {
          token: window.localStorage.getItem("token"),
        },
        data: {
          tradeType: formData.orderType,
          paymentWindowTime: formData.paymentWindow,
          country: formData.country,
          asset: formData.assets,

          currency: formData.fiatCoin,
          price: Number(quanityPrice),

          priceType: formData.priceType,
          maxOrderLimit: formData.maxValue,
          minOrderLimit: formData.minValue,
          bankId: bankId,
          margin: formData.margin,
          quantity: formData.quanitity.toString(),

          remark,
          greetingMessage,
        },
      });
      if (res.data.responseCode === 200) {
        setIsLoader(false);
        // setTicketReplyData(res.data?.data);
        // sethandleapiclick(false);
        handleClose2();
        toast.success(res.data.responseMessage);
        history.push("/Allorderdata");
      } else {
        setIsLoader(false);
      }
    } catch (err) {
      console.log("err", err);
    }
  };

  const myBNBpriceUSD = async () => {
    axios({
      method: "GET",
      url: "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest",
    })
      .then(async (res) => {
        if (res.status === 200) {
          // setBNBpriceUSD(res.data);
          // setState(1);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  useEffect(() => {
    myBNBpriceUSD();
  }, []);
  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>
              <Typography variant="h2">{label}</Typography>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {/* {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>
              All steps completed
            </Typography>
            
          </div>
        ) : ( */}
        <div>
          <Typography className={classes.instructions}>
            {getStepContent(
              activeStep,
              setFormData,
              formData,
              isSubmit,
              bankDetails,
              banksType,
              setbanksType,
              CryptoCoin,
              priceUSD,
              priceINR,
              setBankId,
              bankId,
              bankData,
              setQuanityPrice
            )}
          </Typography>
          <div>
            <Button
              variant="contained"
              size="small"
              color="secondary"
              disabled={activeStep === 0}
              onClick={handleBack}
              className={classes.backButton}
            >
              Back
            </Button>
            {activeStep === steps.length - 1 ? (
              <Button
                variant="contained"
                size="small"
                color="secondary"
                onClick={handleClickOpen2}
              >
                Post
              </Button>
            ) : (
              <Button
                variant="contained"
                size="small"
                color="secondary"
                onClick={handleNext}
              >
                {activeStep === steps.length - 1 ? "Post" : "Next"}
              </Button>
            )}
          </div>
        </div>
        {/* )} */}
      </div>
      {/* <Box mt={2} mb={2}>
        <TradeAnyTime />
      </Box> */}

      <Dialog
        fullWidth="md"
        maxWidth="md"
        open={block}
        keepMounted
        onClose={handleClose2}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent>
          <Typography align="center" variant="h5">
            Confirm to Post
          </Typography>
          <Divider />

          <Box mt={2} className={classes.mainSteperRoot}>
            <Grid container spacing={2}>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <Grid container spacing={2}>
                  <Grid item lg={3} md={3} sm={4} xs={6}>
                    <Box>
                      <Typography variant="h6">Type</Typography>
                      <Typography>{formData.orderType}</Typography>
                    </Box>
                  </Grid>
                  <Grid item lg={3} md={3} sm={4} xs={6}>
                    <Box>
                      <Typography variant="h6">Payment Method</Typography>
                      {/* <Typography>{formData.orderType}</Typography>
                      <Typography>{formData.orderType}</Typography> */}
                      <Typography>{formData.paymentType}</Typography>
                    </Box>
                  </Grid>
                  <Grid item lg={3} md={3} sm={4} xs={6}>
                    <Box>
                      <Typography variant="h6"> Order Limit</Typography>
                      <Typography>
                        {formData.minValue} {formData.fiatCoin}
                      </Typography>
                      <Typography>
                        {formData.maxValue} {formData.fiatCoin}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item lg={3} md={3} sm={4} xs={6}>
                    <Box>
                      <Typography variant="h6">Asset</Typography>
                      <Typography>{CryptoCoin}</Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <Grid container spacing={2}>
                  <Grid item lg={3} md={3} sm={4} xs={6}>
                    <Box>
                      <Typography variant="h6">Currency</Typography>
                      <Typography>{formData.fiatCoin}</Typography>
                    </Box>
                  </Grid>
                  <Grid item lg={3} md={3} sm={4} xs={6}>
                    <Box>
                      <Typography variant="h6">
                        Counterparty Conditions
                      </Typography>
                      <Typography>
                        {auth.userData?.kyc?.kycStatus == "ACCEPTED"
                          ? "Completed KYC"
                          : "Pending KYC"}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item lg={3} md={3} sm={4} xs={6}>
                    <Box>
                      <Typography variant="h6">Total Trading Amount</Typography>
                      <Typography>
                        {formData.totalAmount} {CryptoCoin}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item lg={3} md={3} sm={4} xs={6}>
                    <Box>
                      <Typography variant="h6">Floating</Typography>
                      <Typography>
                        {formData.price} {formData.fiatCoin}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <Grid container spacing={2}>
                  <Grid item lg={3} md={3} sm={4} xs={6}>
                    <Box>
                      <Typography variant="h6">Price Type</Typography>
                      <Typography>{formData.fiatCoin}</Typography>
                    </Box>
                  </Grid>
                  <Grid item lg={3} md={3} sm={4} xs={6}>
                    <Box>
                      <Typography variant="h6">
                        Floating Price Margin
                      </Typography>
                      <Typography>{formData.margin} %</Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
          {/* <Box mt={2}>
            <Typography align="center" variant="h6">
              Are you sure you want to post.
            </Typography>
          </Box> */}
        </DialogContent>
        <DialogActions
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "20px",
            flexWrap: "wrap",
          }}
        >
          <Box mt={1}>
            <Button
              variant="outlined"
              color="primary"
              // className="outlinedButton"
              onClick={handleClose2}
              style={{ padding: "7px 20px !important" }}
            >
              Cancel
            </Button>
          </Box>
          <Box mt={1}>
            <Button
              variant="contained"
              color="primary"
              // onClick={() => history.push("/Allorderdata")}
              onClick={AddPostAd}
            >
              Confirm
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
    </div>
  );
}

//stepper
function getStepContent(
  stepIndex,
  setFormData,
  formData,
  isSubmit,
  bankDetails,
  banksType,
  setbanksType,
  CryptoCoin,
  priceUSD,
  priceINR,
  setBankId,
  bankId,
  bankData,
  setQuanityPrice
) {
  switch (stepIndex) {
    case 0:
      return (
        <>
          <PostStep
            priceUSD={priceUSD}
            priceINR={priceINR}
            CryptoCoin={CryptoCoin}
            setFormData={setFormData}
            formData={formData}
            isSubmit={isSubmit}
            setQuanityPrice={setQuanityPrice}
            // bankDetails={bankDetails}
            // banksType={banksType}
            // setbanksType={setbanksType}
          />
        </>
      );
    case 1:
      return (
        <>
          <TrandingAmount
            priceUSD={priceUSD}
            priceINR={priceINR}
            CryptoCoin={CryptoCoin}
            setFormData={setFormData}
            formData={formData}
            isSubmit={isSubmit}
            bankDetails={bankDetails}
            banksType={banksType}
            setbanksType={setbanksType}
            setBankId={setBankId}
            bankData={bankData}
            bankId={bankId}
          />
        </>
      );
    case 2:
      return (
        <>
          <AutomaticResponse
            priceUSD={priceUSD}
            priceINR={priceINR}
            CryptoCoin={CryptoCoin}
            setFormData={setFormData}
            formData={formData}
            isSubmit={isSubmit}
            // bankDetails={bankDetails}
            // banksType={banksType}
            // setbanksType={setbanksType}
          />
        </>
      );
    default:
      return "Unknown stepIndex";
  }
}
