import {
  Box,
  Container,
  Typography,
  makeStyles,
  Grid,
  Slider,
  withStyles,
  TextField,
  InputAdornment,
  IconButton,
} from "@material-ui/core";
import React, { useState } from "react";

const PrettoSlider = withStyles({
  root: {
    color: "#69D2F8",

    height: 13,
  },
  thumb: {
    height: 29,
    width: 29,
    backgroundColor: "#FCD258",

    marginTop: -8,
    marginLeft: -12,
    "&:focus, &:hover, &$active": {
      boxShadow: "inherit",
    },
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 4px)",
  },
  track: {
    height: 13,
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    borderRadius: "46px",
  },
  rail: {
    height: 13,
    borderRadius: 4,
  },
})(Slider);

const useStyles = makeStyles((theme) => ({
  mainroot: {
    "& .topbox": {
      // background: theme.palette.background.back,
      background: "#0047AB",
      padding: "80px 0px 80px 0px",
    },
    "& h1": {
      fontFamily: "'Inter'",
      fontSize: "50px",
      fontWeight: "700",
      textAlign: "center",
      lineHeight: "30px",
    },
    "& h6": {
      textAlign: "center",
      fontFamily: "'Inter'",
      fontStyle: "normal",
      fontWeight: "400",
      fontSize: "18px",
      lineHeight: "20px",
      paddingTop: "20px",
    },
  },
  Circle: {
    padding: "13px",
    position: "relative",
    border: "2px solid #FFFFFF",
    borderRadius: "8px",
    zIndex: "1",
    "& h5": {
      fontSize: "16px",
      [theme.breakpoints.only("xs")]: {
        fontSize: "13px !important",
      },
    },
  },
  Circle1: {
    // marginRight: "15px",
    padding: "13px",
    position: "relative",
    border: "2px solid #FFFFFF",
    borderRadius: "8px",
    zIndex: "1",

    "& h5": {
      fontSize: "14px",
      marginLeft: "-14px",
    },
    "& h3": {
      fontSize: "20px !important",
      lineHeight: "0px !important",
      [theme.breakpoints.only("xs")]: {
        fontSize: "15px !important",
        paddingTop: "8px",
      },
    },
  },
  bin: {
    border: "2px solid #FFFFFF",
    padding: "2.5px 0px  !important",
  },

  textfilied: {
    "& input": {
      color: "#fff !important",
      fontSize: "14px",
    },
  },
  SubMainRoot: {
    border: "2px solid #FFFFFF",
    borderRadius: "8px",
    padding: "30px",
    paddingTop: "42px",
  },
  BoxAmount: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    [theme.breakpoints.only("xs")]: {
      flexWrap: "wrap",
    },
  },
  circle2: {
    position: "absolute",
    width: "60px",
    left: "280px",

    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
}));

export default function Invest() {
  const classes = useStyles();
  const [currentValue, setCurrentValue] = useState("");
  const [fieldValue, setFieldValue] = useState("1");
  const [valuedata, setvaluedata] = useState(false);
  const [newvalue, setnewvalue] = useState("");

  function valuetext(value) {
    setFieldValue(value);
    // setvaluedata(true);
    return `${value}°C`;
  }

  const rate = Number(24 / 100),
    time = 1;
  const currentValueData = valuedata ? currentValue : fieldValue;
  const A = fieldValue * Math.pow(1 + Number(rate) / 1, 1 * time);
  const CI = A - fieldValue;

  return (
    <Box className={classes.mainroot}>
      <Box className="topbox">
        <Box className={classes.circle2}>
          <img src="images/Elips.png" alt="" width="70%" className="moveTop" />
        </Box>
        <Typography variant="h1">Rewards</Typography>
        <Typography variant="h6">Earn Rewards by staking</Typography>
        <Box mt={3}>
          <Box pt={2} pb={1}></Box>
          <Container maxWidth="md">
            <Box className={classes.SubMainRoot}>
              <Box style={{ display: "flex", justifyContent: "center" }}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={12}>
                    <PrettoSlider
                      aria-label="pretto slider"
                      // min={1000}
                      max={100000}
                      getAriaValueText={valuetext}
                      aria-labelledby="discrete-slider"
                      valueLabelDisplay="auto"
                      value={fieldValue}
                      onChange={(e, v) => setFieldValue(v)}
                    />

                    <Box display="flex" justifyContent="space-between">
                      <Typography variant="body2">1 VDT</Typography>
                      <Typography variant="body2">
                        {" "}
                        {fieldValue >= 50000 && "50K"}
                      </Typography>
                      <Typography variant="body2">100000</Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
              <Box mt={2} mb={4}></Box>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={6} md={4} lg={4}>
                  <Box mt={-1}>
                    <TextField
                      type="number"
                      variant="outlined"
                      value={fieldValue}
                      className={classes.textfilied}
                      placeholder="Enter amount"
                      onChange={(e) => setFieldValue(e.target.value)}
                      // disabled
                      InputProps={{
                        className: classes.bin,
                        endAdornment: (
                          <InputAdornment position="end">
                            <span
                              style={{
                                paddingRight: "5px",
                                color: "#fff",
                                fontSize: "14px",
                              }}
                            >
                              VDT
                            </span>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={4}>
                  <Box mb={2}>
                    <Box className={classes.Circle}>
                      <Typography style={{ fontSize: "14px" }}>
                        24% compounded annualy
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={4}>
                  <Box mb={2}>
                    <Box className={classes.Circle1}>
                      <Box className={classes.BoxAmount}>
                        <Box>
                          <Typography variant="h5">
                            {" "}
                            Amount you will get
                          </Typography>
                        </Box>
                        <Box>
                          <Box>
                            <Typography variant="h3">
                              ${parseFloat(A).toFixed(2)}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Container>
        </Box>
      </Box>
    </Box>
  );
}
