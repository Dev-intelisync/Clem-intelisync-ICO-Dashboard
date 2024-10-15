import React, { useContext, useEffect, useState } from "react";
import {
  Grid,
  Box,
  Typography,
  Button,
  FormControl,
  makeStyles,
  InputAdornment,
  FormHelperText,
  MenuItem,
  FormControlLabel,
  Radio,
  Select,
} from "@material-ui/core";
import { BiLockOpen } from "react-icons/bi";
import TextField from "@material-ui/core/TextField";
import { useHistory } from "react-router-dom";
import { Form, Formik } from "formik";
import * as yep from "yup";
import ApiConfig from "../../../config/APIConfig";
import axios from "axios";
import RemoveIcon from "@material-ui/icons/Remove";
import { toast } from "react-toastify";
import { AuthContext } from "@context/Auth";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import moment from "moment";
import AddIcon from "@material-ui/icons/Add";
import Dropzone from "react-dropzone-uploader";
import "react-dropzone-uploader/dist/styles.css";
import { KeyboardDatePicker } from "@material-ui/pickers";
import Checkbox from "@material-ui/core/Checkbox";
import Advertiment from "./Advertimentrequired";
import { UserContext } from "@context/User";
const useStyles = makeStyles((theme) => ({
  Box: {
    background: "#302F35",
    border: "1px solid #898989",
    height: "200px",
    width: "200px",
    borderRadius: "25px",
  },
  FAQ: {
    padding: "25px 0",

    [theme.breakpoints.down("xs")]: {
      padding: "35px 0",
    },
    " & h2": {
      fontSize: "24px !important",
      fontWeight: "500",
      background:
        "linear-gradient(180deg, #00ACEB 0%, #00B0ED 10.18%, #1069C2 70.35%, #1069C2 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
      textFillColor: "transparent",

      [theme.breakpoints.down("sm")]: {
        fontSize: "20px",
      },
    },
  },
  PageHeading: {
    paddingBottom: "20px",
  },
  editsection: {
    "& h2": {
      color: theme.palette.text.primary,

      fontStyle: "normal",
      fontWeight: "bold",
      fontSize: "40px",
      lineHeight: "130%",
    },
    "& h3": {
      fontStyle: "normal",
      fontWeight: "500",
      fontSize: "14px",
      lineHeight: "130%",

      color: theme.palette.text.primary,
    },
  },
  inputfield: {
    "& label": {
      color: theme.palette.text.primary,

      fontSize: "14px",
    },
  },
  imagefiled: {
    "& label": {
      color: theme.palette.secondary.main,
    },
    "& small": {},
  },

  BtnBOx: {
    padding: "12px 10px ",
    background: "linear-gradient(180deg, #67d9ef 0%, #467ddb 100%)",
  },
  inputsection: {
    color: "#848484",
    cursor: "text",
    position: "relative",
    fontSize: "1rem",
    boxSizing: "border-box",
    fontWeight: "400",
    lineHeight: "1.1876em",
    "& input": {
      width: "100%",
      border: "0",
      height: "1.1876em",
      margin: "0",
      display: "block",
      padding: "10px 8px",
      fontSize: "14px",
      minWidth: "0",
      background: "none",
      boxSizing: "content-box",
      animationName: "mui-auto-fill-cancel",
      letterSpacing: "inherit",
      animationDuration: "10ms",
      WebkitTapHighlightColor: "transparent",
    },
  },

  TextBox: {
    borderRadius: "10px",
  },
  secuirty: {
    background:
      "linear-gradient(180deg, rgba(0, 172, 235, 0.1) 0%, rgba(0, 176, 237, 0.1) 10.18%, rgba(16, 105, 194, 0.1) 70.35%, rgba(16, 105, 194, 0.1) 100%)",
    borderRadius: "10px",
    border: "1px solid #6ECFF3",
    marginTop: "40px",
    padding: "25px",
  },

  CenterButn: {
    background:
      "linear-gradient(180deg, #00ACEB 0%, #00B0ED 10.18%, #1069C2 70.35%, #1069C2 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    textFillColor: "transparent",
    fontSize: "17px",
  },
  message: { color: theme.palette.primary.main },
  colorbox: {
    background:
      "linear-gradient(180deg, rgba(0, 172, 235, 0.1) 0%, rgba(0, 176, 237, 0.1) 10.18%, rgba(16, 105, 194, 0.1) 70.35%, rgba(16, 105, 194, 0.1) 100%)",
    borderRadius: "10px",
    border: "1px solid #6ECFF3",
    marginTop: "25px",
    padding: "10px 40px 40px",
    // color: "#1D2D3F",
    color: theme.palette.text.primary,
    height: "auto",
    "& img": {
      width: "100%",
    },
  },

  updateButton: {
    [theme.breakpoints.down("xs")]: {
      maxWidth: "150px",
      fontSize: "9px",
    },
  },
}));
export const getBase64 = (file, cb) => {
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function () {
    cb(reader.result);
  };
  reader.onerror = function (err) {};
};

export default function Editprofile({
  priceUSD,
  priceINR,
  CryptoCoin,
  formData,
  setFormData,
  isSubmit,
  setQuanityPrice,
}) {
  const classes = useStyles();
  const user = useContext(AuthContext);
  const userData = useContext(UserContext);
  const [countryCode, setCountryCode] = useState("");
  const [phone, setPhone] = useState();
  const [countries, setCountries] = useState([]);
  const [showStates, setShowStates] = useState([]);
  const [status, setStatus] = useState("Payment");
  let count = 1;
  const [states, setStates] = useState([]);
  const auth = useContext(AuthContext);
  const userState = auth?.userData?.state;
  const [feildValue, setFeildValue] = useState(1);
  const [availableBalance, setavailableBalance] = useState(0);

  const [imageFront, setImageFront] = useState("");
  // useEffect(() => {
  //   if (!window.localStorage.getItem("token")) {
  //     history.push("/login");
  //   }
  // }, [window.localStorage.getItem("token")]);
  useEffect(() => {
    if (user?.userData) {
      setImageFront(user?.userData?.imageUrl ? user?.userData?.imageUrl : "");
    }
  }, [user?.userData]);

  const history = useHistory();
  const [loader1, setLoader1] = useState(false);
  const [priceinUSD, setPriceinUSD] = useState(0);
  const [priceinINR, setPriceinINR] = useState(0);
  const [walletBalance, setWalletBalance] = useState([]);

  const [currencyPrice, setCurrencyPrice] = useState();
  useEffect(() => {
    if (formData?.quanitity > 0) {
      if (formData?.fiatCoin !== "NA") {
        if (formData?.fiatCoin == "INR") {
          setCurrencyPrice(formData?.quanitity * formData.price);
          setQuanityPrice(formData?.quanitity * formData.price);
        } else {
          setCurrencyPrice(formData?.quanitity * formData.price);
          setQuanityPrice(formData?.quanitity * formData.price);
        }
      }
    } else {
      setCurrencyPrice("");
      setQuanityPrice("");
    }
  }, [
    formData?.price,
    formData?.quanitity,
    formData?.fiatCoin,
    priceinINR,
    priceinUSD,
  ]);

  useEffect(() => {
    axios.get("/static/json/countries.json").then(function (response) {
      setCountries(response.data.countries);
      axios.get("/static/json/states.json").then(function (response) {
        setStates(response.data.states);
        // axios.get("/static/json/cities.json").then(function (response) {
        //   setCities(response.data.cities);
        // });
      });
    });
  }, []);

  const [selectedValue, setSelectedValue] = useState("a");
  const handleChange5 = (event) => {
    setSelectedValue(event.target.value);
  };
  const changeStateList = (name) => {
    const selectted = states.filter((cont) => {
      return cont.name === name;
    });
    if (selectted.length !== 0) {
      const contId = selectted[0].id;
      // const allCity = cities.filter((city) => {
      //   return city.state_id === contId;
      // });
      // setShowCities(allCity);
    }
  };
  const changeState = (e) => {
    const name = e.target.value;
    changeStateList(name);
  };

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
  useEffect(() => {
    if (userState) {
      setShowStates([{ name: userState }]);
    }
  }, [userState]);

  const _onInputChange = (name, value) => {
    const temp = { ...formData, [name]: value };
    setFormData(temp);
  };

  useEffect(() => {
    if (formData?.assets != "NA") {
      let Assets;
      if (formData?.assets == "BUSD") {
        Assets = "BUSD";
      } else {
        Assets = formData?.assets;
      }
      if (auth.cmcResults.length > 0) {
        let cmcCoinPrice = auth.cmcResults.filter(
          (results) => results.symbol == Assets
        )[0].quote.USD.price;
        setPriceinUSD(cmcCoinPrice);
        setPriceinINR(cmcCoinPrice * auth.iNRPriceinUSD);
        let WallwtBalanceList = walletBalance;

        if (userData?.userBalanceData?.length > 0) {
          let balance = userData?.userBalanceData.filter(
            (results) => results?.coinName == formData?.assets
          )[0];
          setavailableBalance(balance?.balance);
          _onInputChange("availableBalance", balance?.balance);
        }
      } else {
        if (userData?.userBalanceData?.length > 0) {
          let balance = userData?.userBalanceData.filter(
            (results) => results?.coinName == formData?.assets
          )[0];

          setavailableBalance(balance?.balance);
          _onInputChange("availableBalance", balance?.balance);
        }
      }
    }
  }, [auth.cmcResults, auth.iNRPriceinUSD, formData?.assets]);
  const SFeildValue = (values) => {
    try {
      if (values > 0) {
        // setFeildValue(values);
        const temp = { ...formData, ["margin"]: values };
        setFormData(temp);
      } else {
        const temp = { ...formData, ["margin"]: 1 };
        setFormData(temp);
      }
    } catch (err) {
      console.log("err----", err);
    }
  };

  const walletBalanceHandler = async () => {
    try {
      const res = await axios({
        method: "GET",
        url: ApiConfig.walletBalance,

        headers: {
          token: window.localStorage.getItem("token"),
        },
      });
      if (res.data.status === 200) {
        window.localStorage.getItem("coinName");
        // const finalData = res.data.data.coinList.map((item) => {
        //   const coinBalance = res.data.data.userBalance.filter((data) => {
        //     return item.coinShortName === data.instrument;
        //   });
        //   return { coinData: item, coinBalance: coinBalance[0] };
        // });

        setWalletBalance(res?.data?.data?.userBalance);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    walletBalanceHandler();
  }, []);

  return (
    <>
      <Box className={classes.FAQ}>
        <Box>
          <Typography variant="h2">Post New Advertisement</Typography>
        </Box>
        <Box mb={2}>
          <Box>
            <Advertiment
              setFormData={setFormData}
              formData={formData}
              isSubmit={isSubmit}
            />
          </Box>
          <Box className={classes.colorbox}>
            <Box mt={2} className={classes.inputfield}>
              <Grid container spacing={2}>
                <Grid item lg={4} md={4} sm={6} xs={12}>
                  <Box style={{ marginTop: "5px" }}>
                    <label>Assets</label>
                    <FormControl
                      variant="outlined"
                      // style={{ marginTop: "20px" }}
                      fullWidth
                    >
                      <Select
                        variant="outlined"
                        fullWidth
                        className="textFeilds"
                        InputProps={{
                          className: classes.TextBox,
                        }}
                        name="assets"
                        // onChange={(e) => setStatus(e.target.value)}
                        value={formData?.assets}
                        onChange={(e) =>
                          _onInputChange("assets", e.target.value)
                        }
                        // value={status}
                      >
                        <MenuItem value="NA">Select Assets</MenuItem>
                        <MenuItem value="BTC">BTC</MenuItem>
                        <MenuItem value="BNB">BNB</MenuItem>
                        {/* <MenuItem value="LTC">LTC</MenuItem> */}
                        <MenuItem value="ETH">ETH</MenuItem>
                        <MenuItem value="AVAX">AVAX</MenuItem>
                        {/* <MenuItem value="INR">INR</MenuItem> */}
                        <MenuItem value="USDT">USDT</MenuItem>
                        <MenuItem value="USDC">USDC</MenuItem>
                        <MenuItem value="MATIC">MATIC</MenuItem>
                        <MenuItem value="BUSD">BUSD</MenuItem>
                      </Select>
                      <FormHelperText error style={{ paddingLeft: "0px" }}>
                        {isSubmit &&
                          formData?.assets == "NA" &&
                          "Select assets"}
                      </FormHelperText>
                    </FormControl>
                  </Box>
                </Grid>

                <Grid item lg={4} md={4} sm={6} xs={12}>
                  <Box style={{ marginTop: "5px" }}>
                    <label>With cash</label>
                    <FormControl
                      variant="outlined"
                      // style={{ marginTop: "20px" }}
                      fullWidth
                    >
                      <Select
                        style={{ padding: "0px" }}
                        variant="outlined"
                        fullWidth
                        value={formData?.fiatCoin}
                        onChange={(e) =>
                          _onInputChange("fiatCoin", e.target.value)
                        }
                      >
                        <MenuItem value="NA">Select Currency </MenuItem>
                        <MenuItem value="INR">INR</MenuItem>
                        <MenuItem value="USD">USD</MenuItem>
                      </Select>
                      <FormHelperText error style={{ paddingLeft: "0px" }}>
                        {isSubmit &&
                          formData?.fiatCoin == "NA" &&
                          "Select currency"}
                      </FormHelperText>
                    </FormControl>
                  </Box>
                </Grid>
                <Grid item lg={4} md={4} sm={6} xs={12}>
                  <Box>
                    <label>Your Quantity</label>
                    <TextField
                      placeholder="108.11 INR"
                      type="number"
                      variant="outlined"
                      fullWidth
                      step="any"
                      size="small"
                      className="textFeilds"
                      // InputProps={{
                      //   className: classes.TextBox,
                      // }}
                      value={formData?.quanitity}
                      onChange={(e) => {
                        if (e.target.value && e.target.value != "-") {
                          _onInputChange(
                            "quanitity",
                            Math.abs(Number(e.target.value))
                          );
                        } else {
                          _onInputChange("quanitity", "");
                        }
                      }}
                      onKeyPress={(event) => {
                        if (event?.key === "-" || event?.key === "+") {
                          event.preventDefault();
                        }
                      }}
                      InputProps={{
                        className: classes.TextBox,
                        endAdornment: (
                          <InputAdornment position="end">
                            <Typography
                              variant="body1"
                              style={{ fontSize: "13px", color: "#7e8488" }}
                            >
                              {formData?.assets != "NA" && formData?.assets}
                            </Typography>
                          </InputAdornment>
                        ),
                      }}
                    />

                    <FormHelperText error style={{ paddingLeft: "0px" }}>
                      {isSubmit &&
                        formData?.quanitity == "" &&
                        "Enter your price "}
                    </FormHelperText>
                    <span>
                      Available Balance : {availableBalance}{" "}
                      {formData?.assets != "NA" && formData?.assets}
                    </span>
                  </Box>
                </Grid>
                <Grid item lg={4} md={4} sm={6} xs={12}>
                  <Box>
                    <label>Total Your Price </label>
                    <TextField
                      placeholder="108.11 INR"
                      type="number"
                      variant="outlined"
                      fullWidth
                      step="any"
                      size="small"
                      value={formData.price}
                      className="textFeilds"
                      // InputProps={{
                      //   className: classes.TextBox,
                      // }}
                      // value={formData?.price}
                      onChange={(e) => {
                        if (e.target.value && e.target.value != "-") {
                          _onInputChange(
                            "price",
                            Math.abs(Number(e.target.value))
                          );
                        } else {
                          _onInputChange("price", "");
                        }
                      }}
                      onKeyPress={(event) => {
                        if (event?.key === "-" || event?.key === "+") {
                          event.preventDefault();
                        }
                      }}
                      InputProps={{
                        className: classes.TextBox,
                        endAdornment: (
                          <InputAdornment position="end">
                            <Typography
                              variant="body1"
                              style={{ fontSize: "13px", color: "#7e8488" }}
                            >
                              {formData?.assets != "NA" && formData?.assets}
                            </Typography>
                          </InputAdornment>
                        ),
                      }}
                    />

                    <FormHelperText error style={{ paddingLeft: "0px" }}>
                      {isSubmit && formData?.price == "" && "Enter your price "}
                      {isSubmit &&
                        formData.availableBalance < formData.price &&
                        "Price must be less than available balance"}
                    </FormHelperText>

                    <Box>
                      <span>Market Price : {priceinINR}</span>
                    </Box>
                  </Box>
                </Grid>
                <Grid item lg={4} md={4} sm={6} xs={12}>
                  <Box>
                    <label>Total Order Price</label>
                    <TextField
                      placeholder="208.11 INR"
                      type="number"
                      variant="outlined"
                      fullWidth
                      className="textFeilds"
                      size="small"
                      name="address"
                      step="any"
                      disabled
                      value={parseFloat(currencyPrice).toFixed(20)}
                      InputProps={{
                        className: classes.TextBox,
                        endAdornment: (
                          <InputAdornment position="end">
                            <Typography
                              variant="body1"
                              style={{ fontSize: "13px", color: "#7e8488" }}
                            >
                              {formData?.fiatCoin != "NA" && formData?.fiatCoin}
                            </Typography>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Box>
                </Grid>
              </Grid>
              <Box mt={1}>
                <label>Price Type</label>
                <Box mt={-3}>
                  <FormControlLabel
                    control={
                      <Radio
                        color="primary"
                        checked={formData.priceType === "FLOATING"}
                        // onChange={handleChange5}
                        value={formData.priceType}
                        onChange={(e) =>
                          _onInputChange("priceType", "FLOATING")
                        }
                        // value="b"
                      />
                    }
                    label="Floating"
                  />
                  <FormControlLabel
                    control={
                      <Radio
                        color="primary"
                        // checked={selectedValue === "a"}
                        checked={formData.priceType === "FIXED"}
                        // onChange={handleChange5}
                        value={formData.priceType}
                        onChange={(e) => _onInputChange("priceType", "FIXED")}
                        // value="a"
                      />
                    }
                    label="Fixed"
                  />
                </Box>
                <FormHelperText error style={{ paddingLeft: "0px" }}>
                  {isSubmit &&
                    formData?.priceType == "" &&
                    "Select price type "}
                </FormHelperText>
              </Box>
              {formData.priceType == "FLOATING" && (
                <div>
                  <Box mb={1}>
                    <label>Floating Price Margin</label>
                  </Box>

                  <Box
                    style={{
                      display: "flex",
                      border: "1px solid #B1BCC2",
                      maxWidth: "500px",
                      justifyContent: "space-between",

                      borderRadius: "4px",
                    }}
                  >
                    <Box>
                      <Box>
                        <Button
                          onClick={() => {
                            // setFeildValue(feildValue - 1);
                            SFeildValue(formData.margin - 1);
                          }}
                          className={classes.BtnBOx}
                        >
                          <RemoveIcon style={{ color: "#fff" }} />
                        </Button>
                      </Box>
                    </Box>
                    <Box>
                      <Button
                        className={classes.CenterButn}
                        style={{ color: "#000" }}
                      >
                        {formData.margin}
                      </Button>
                    </Box>
                    <Box>
                      <Button
                        onClick={() => {
                          SFeildValue(formData.margin + 1);
                        }}
                        className={classes.BtnBOx}
                      >
                        <AddIcon style={{ color: "#fff" }} />
                      </Button>
                    </Box>
                  </Box>
                  <label>
                    Total Price :{" "}
                    {formData.price + (formData.price * formData.margin) / 100}{" "}
                    {formData?.assets != "NA" && formData?.assets}
                  </label>
                </div>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
