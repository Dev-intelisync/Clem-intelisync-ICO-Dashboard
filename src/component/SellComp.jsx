import {
  Box,
  Grid,
  Select,
  MenuItem,
  makeStyles,
  Button,
  TextField,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { KeyboardDatePicker } from "@material-ui/pickers";
import * as XLSX from "xlsx";
import axios from "axios";
import SellTable from "../views/pages/P2Psection/SellTable";

const useStyles = makeStyles((theme) => ({
  mainSection: {
    background: "#383858",
    marginTop: "4rem",
    paddingTop: "5rem",
    paddingBottom: "5rem",

    "& h3": {
      color: "#fff",
      paddingBottom: "1.8rem",
    },
  },
  gridSectio: {
    order: "1",
    "@media(max-width:952px)": {
      order: "3",
    },
  },
  gridSectio1: {
    color: "#000",
    order: "2",
    "@media(max-width:952px)": {
      order: "1",
    },
  },
  gridSectio2: {
    color: "#000",
    order: "3",
    "@media(max-width:952px)": {
      order: "2",
    },
  },
  gridSectio3: {
    color: "#000",
    order: "4",
    "@media(max-width:952px)": {
      order: "4",
    },
  },
  searchSection: {
    color: "#000",

    "@media(max-width:600px)": {
      marginTop: ".7rem",
    },
  },
  TextBox: {
    borderRadius: "10px",
    // background: theme.palette.background.taf,
  },
  field: {
    height: "40px",
    border: "1px solid #bcbcbc",
    padding: "10px 10px 10px 0px",
    marginTop: "6px",
    fontSize: "14px",
    borderRadius: "5px",
  },
  mainbox: {
    background:
      "linear-gradient(180deg, rgba(0, 172, 235, 0.1) 0%, rgba(0, 176, 237, 0.1) 10.18%, rgba(16, 105, 194, 0.1) 70.35%, rgba(16, 105, 194, 0.1) 100%)",
    borderRadius: "10px",
    border: "1px solid #6ECFF3",
    marginTop: "20px",
    padding: "25px",
  },
  btnSection: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    marginTop: "0rem",
    justifyContent: "space-between",
    "@media(max-width:959px)": {
      marginTop: "1.5rem",
    },
    "@media(max-width:599px)": {
      marginTop: "0rem",
    },

    "& button": {
      // height: "40px",
    },
  },
  date: {
    marginTop: "6px",
    "& .MuiOutlinedInput-root": {
      height: "40px",
    },
  },
  // selectitem: {
  //   "& .MuiPopover-paper": {
  //     marginTop: "50px",
  //   },
  // },
}));
const useStylesBootstrap = makeStyles((theme) => ({
  arrow: {
    color: theme.palette.common.black,
  },
  tooltip: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
}));

export default function Filter({
  setSearch,
  fromData,
  setFromData,
  toData,
  setToData,
  userlist,
  type,
  dataToExport,
  setCommponentcheck,
  componentCheck,
}) {
  const classes = useStyles();
  const [status, setStatus] = useState("Active");
  const respoT = "farmsuit";
  const [fromData1, setFromData1] = useState();
  const [fromData2, setFromData2] = useState();
  const [countries, setCountries] = useState([]);
  const [showStates, setShowStates] = useState([]);

  const [states, setStates] = useState([]);
  const [Countrylist, setCountrylist] = useState();
  const downloadExcel = () => {
    const workSheet = XLSX.utils.json_to_sheet(dataToExport);
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, "userList");
    let buf = XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
    XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
    XLSX.writeFile(workBook, "user_list.xlsx");
  };

  useEffect(() => {
    axios.get("/static/json/countries.json").then(function (response) {
      setCountries(response.data.countries);
      axios.get("/static/json/states.json").then(function (response) {
        setStates(response.data.states);
      });
    });
  }, []);

  const changeStateList = (name) => {
    const selectted = states.filter((cont) => {
      return cont.name === name;
    });
    if (selectted.length !== 0) {
      const contId = selectted[0].id;
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
  return (
    <>
      <Box className={classes.mainbox}>
        <Grid container spacing={1}>
          <Grid item lg={3} md={4} sm={6} xs={12}>
            <label className="amountlabel">Amount</label>
            <Box className={classes.searchSection}>
              <TextField
                placeholder="Enter Amount"
                type="number"
                variant="outlined"
                size="small"
                fullWidth
                name="num"
                className="textFeilds"
                InputProps={{
                  className: classes.TextBox,
                }}
              />
            </Box>
          </Grid>
          <Grid item lg={3} md={4} sm={6} xs={12}>
            <label>Fiat</label>
            <Box className={classes.selectitem} style={{ marginTop: "6px" }}>
              <Select
                style={{ borderRadius: "10px" }}
                variant="outlined"
                fullWidth
                InputProps={{
                  className: classes.TextBox,
                }}
                onChange={(e) => setStatus(e.target.value)}
                value={status}
              >
                <MenuItem value="Block">Currency</MenuItem>
                <MenuItem value="Active">INR</MenuItem>
                <MenuItem value="Active">USD</MenuItem>
              </Select>
            </Box>
          </Grid>{" "}
          <Grid item lg={3} md={4} sm={6} xs={12}>
            <label>Payments</label>
            <Box className={classes.selectitem} style={{ marginTop: "6px" }}>
              <Select
                style={{ borderRadius: "10px" }}
                variant="outlined"
                fullWidth
                onChange={(e) => setStatus(e.target.value)}
                value={status}
              >
                <MenuItem value="Block">All Payments</MenuItem>
                <MenuItem value="Active">National Bank Transfer</MenuItem>
                <MenuItem value="Active">IMPS</MenuItem>
                <MenuItem value="Active">Paypal</MenuItem>
                <MenuItem value="Active">Paytm</MenuItem>

                <MenuItem value="Active">UPI</MenuItem>
              </Select>
            </Box>
          </Grid>{" "}
          <Grid item lg={3} md={4} sm={6} xs={12}>
            <label>Country</label>
            <Box className={classes.selectitem} style={{ marginTop: "6px" }}>
              <Select
                style={{ borderRadius: "10px" }}
                variant="outlined"
                fullWidth
                // onChange={(e) => setStatus(e.target.value)}
                // value={status}
                value={countries}
                onChange={(e) => {
                  //   setCountry(e);
                  changeCountry(e);
                }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
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
            </Box>
          </Grid>
          <Grid item lg={3} md={4} sm={6} xs={12}>
            <label>From Date</label>

            <KeyboardDatePicker
              className={`${classes.date}textFeilds`}
              style={{ width: "100%", height: "40px" }}
              placeholder="DD/MM/YYYY"
              format="DD/MM/YYYY"
              inputVariant="outlined"
              disableFuture
              name="dateOfBirth"
              InputProps={{
                className: classes.TextBox,
              }}
              value={fromData1}
              onChange={(date) => setFromData1(date)}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </Grid>
          <Grid item lg={3} md={4} sm={6} xs={12}>
            <label>To Date</label>
            <KeyboardDatePicker
              className={`${classes.date}textFeilds`}
              style={{ width: "100%", height: "40px" }}
              placeholder="DD/MM/YYYY"
              format="DD/MM/YYYY"
              inputVariant="outlined"
              disableFuture
              name="dateOfBirth"
              InputProps={{
                className: classes.TextBox,
              }}
              value={fromData2}
              onChange={(date) => setFromData2(date)}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </Grid>
          {/* <Grid item lg={3} md={4} sm={4} xs={12}>
          <label>Status</label>
          <Box className={classes.selectitem} style={{ marginTop: "6px" }}>
            <Select
              style={{ height: "42px " }}
              variant="outlined"
              fullWidth
              onChange={(e) => setStatus(e.target.value)}
              value={status}
            >
              <MenuItem value="Block">Block</MenuItem>
              <MenuItem value="Active">Active</MenuItem>
            </Select>
          </Box>
        </Grid> */}
          <Grid item lg={3} md={4} sm={6} xs={12}>
            <Box className={classes.btnSection}>
              <Button
                // variant="contained"
                fullWidth
                // color="secondary"
                style={{
                  color: "#fff",
                  background:
                    "linear-gradient(180deg, #00ACEB 0%, #00B0ED 10.18%, #1069C2 70.35%, #1069C2 100%)",
                  borderRadius: "8px",
                  padding: "8px 40px ",
                  marginTop: "39px",
                  fontSize: "15px",
                  fontWeight: "400",
                }}
              >
                Reset
              </Button>
            </Box>
          </Grid>
          <Grid item lg={3} md={4} sm={6} xs={12}>
            <Box className={classes.btnSection}>
              <Button
                variant="contained"
                fullWidth
                // color="secondary"
                style={{
                  color: "#fff",
                  background:
                    "linear-gradient(180deg, #00ACEB 0%, #00B0ED 10.18%, #1069C2 70.35%, #1069C2 100%)",
                  borderRadius: "8px",
                  padding: "8px 40px ",
                  marginTop: "39px",
                  fontSize: "15px",
                  fontWeight: "400",
                }}
              >
                Search
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Box>
        <SellTable />
      </Box>
    </>
  );
}
