import React, { useState, useContext, useEffect } from "react";
import {
  Typography,
  Box,
  Grid,
  Button,
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableBody,
  FormControl,
  TextField,
  TableHead,
  makeStyles,
} from "@material-ui/core";
import moment from "moment";
import Axios from "axios";
import ApiConfig from "../config/APIConfig";
import { AuthContext } from "../context/Auth";
import { KeyboardDatePicker } from "@material-ui/pickers";

import { BsDownload } from "react-icons/bs";
import * as XLSX from "xlsx";

const useStyles = makeStyles((theme) => ({
  headbox: {
    borderRadius: "20px",
    // marginTop: "80px",
    "& h4": {
      fontFamily: "'Inter'",
      fontStyle: "normal",
      fontWeight: "600",
      fontSize: "24px",
      lineHeight: "29px",
      color: theme.palette.text.primary,
    },
    // overflow: "auto",
    [theme.breakpoints.down("sm")]: {
      padding: "20px 7px 53px 7px",
      borderRadius: "16px",
    },
  },
  tabsize: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#fff",
    [theme.breakpoints.down("xs")]: {
      fontSize: "14px",
    },
  },

  forminput: {
    "& div": {
      color: theme.palette.text.primary,
      // color: "#1D2D3F",
    },
  },
  MainBoxstyle: {
    background:
      "linear-gradient(180deg, rgba(0, 172, 235, 0.1) 0%, rgba(0, 176, 237, 0.1) 10.18%, rgba(16, 105, 194, 0.1) 70.35%, rgba(16, 105, 194, 0.1) 100%)",
    borderRadius: "10px",
    border: "1px solid #6ECFF3",
    padding: "20px",
  },
  download: {
    fontSize: "17px",
    cursor: "pointer",
    "&:hover": {
      color: "red",
    },
  },
  clearButton: {
    color: theme.palette.text.primary,
    border: "1px solid #3B99DF",
    borderRadius: "8px",
    padding: "10px 40px ",
    marginTop: "-5px",
  },

  table: {
    minWidth: 1100,
  },
  bin: {
    padding: "9px 8px",
    border: "1px solid #6ECFF3 !important",
  },
  alignBtn: {
    marginTop: "43px",
    "@media(max-width:1280px)": {
      marginTop: "60px",
    },
    "@media(max-width:960px)": {
      marginTop: "43px",
    },
    "@media(max-width:600px)": {
      marginTop: "60px",
    },
  },
}));

function TransactionMain() {
  const classes = useStyles();
  const [historyData, setHistoryData] = useState([]);

  const auth = useContext(AuthContext);

  const userdata = auth?.userData ? auth?.userData : "";

  const [toData, setToData] = useState();
  const [coinName, setCoinName] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const [noOfPages, setnoOfPages] = useState(1);
  const [page, setPage] = useState(1);
  const [pagesCount, setPagesCount] = useState(1);

  const [fromData, setFromData] = useState();
  const [details, setdetails] = useState([]);
  const [value, setValue] = useState(0);
  const [currentvalue, setCurrentValue] = useState("all");
  const [coin, setcoin] = useState("all");
  const [clear, setIsClear] = useState(false);
  const [coinaddressData, setcoinData] = useState([]);

  const [toaddressData, setToaddressData] = useState("");

  useEffect(() => {
    const filteraddress = coinaddressData.map((data, i) => {
      setToaddressData(data?.WalletAddress);
    });
  }, [coinaddressData]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // useEffect(() => {
  //   if (userdata?.userId) {
  //     allHistoryHandler();
  //   }
  // }, [userdata?.userId]);

  const allHistoryHandler = async () => {
    setIsLoading(true);
    let txnType;
    let coinName;
    if (currentvalue != "all") {
      txnType = currentvalue;
    }
    if (coin != "all") {
      coinName = coin;
    }
    try {
      const res = await Axios.get(ApiConfig.transactionHistoy, {
        headers: {
          token: window.sessionStorage.getItem("token"),
        },
        params: {
          fkUserId: userdata?.userId,
          page: page - 1,
          pageSize: 10,
          fromDate: fromData ? `${moment(fromData).unix()}000` : null,
          toDate: toData ? `${moment(toData).unix()}000` : null,
          coinName: coinName,
          txnType: txnType,
        },
      });
      if (res.data.status === 200) {
        if (currentvalue !== "BUYTOKEN") {
          setHistoryData(res.data.data.resultlist);
          setPagesCount(res.data.data.totalCount / 10);
          setIsLoading(false);
          setIsClear(false);
        }
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };
  const toaddresshistory = async () => {
    setIsLoading(true);
    try {
      const res = await Axios.get(ApiConfig.toaddress, {
        headers: {
          token: window.sessionStorage.getItem("token"),
        },
        params: {
          fkUserId: userdata?.userId,
          page: page - 1,
          pageSize: 10,
          fromDate: fromData ? `${moment(fromData).unix()}000` : null,
          toDate: toData ? `${moment(toData).unix()}000` : null,
          coinName: coin,
          txnType: currentvalue,
        },
      });
      if (res.data.status === 200) {
        if (currentvalue !== "BUYTOKEN") {
          setcoinData(res.data.data);

          // setPagesCount(res.data.data.totalCount / 10);
          setIsLoading(false);
          setIsClear(false);
        }
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    // toaddresshistory();
  }, [userdata?.userId]);
  const handlereset = () => {
    setcoin("all");
    setValue();
    setFromData();
    setCurrentValue("all");
    setToData();
    // allHistoryHandler();
    setIsClear(true);
  };
  useEffect(() => {
    if (page && userdata?.userId) {
      allHistoryHandler([]);
    }
  }, [page, userdata?.userId]);
  const downloadExcel = () => {
    const workSheet = XLSX.utils.json_to_sheet(historyData);
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, "userList");
    let buf = XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
    XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
    XLSX.writeFile(workBook, "Transaction_History.xlsx");
  };
  useEffect(() => {
    if (userdata?.userId) {
      allHistoryHandler();
      setPage(1);
    }
  }, [currentvalue, fromData, toData, coin, clear, userdata?.userId]);

  useEffect(() => {
    if (currentvalue === "BUYTOKEN") {
      const filterFun = historyData.filter((data, i) => {
        return data.status === "SUCCESS";
      });
      setHistoryData(filterFun);
    }
  }, [currentvalue]);

  const DataList = [
    {
      txnId: "XXXXXXXX645",
      token: "1.3548",
      tokenreceive: "2.0100",
      date: "22-07-2022 04:20 AM",
      status: "Completed",
    },
    {
      txnId: "XXXXXXXX645",
      token: "1.3548",
      tokenreceive: "2.0100",
      date: "22-07-2022 04:20 AM",
      status: "Completed",
    },
    {
      txnId: "XXXXXXXX645",
      token: "1.3548",
      tokenreceive: "2.0100",
      date: "22-07-2022 04:20 AM",
      status: "Completed",
    },
    {
      txnId: "XXXXXXXX645",
      token: "1.3548",
      tokenreceive: "2.0100",
      date: "22-07-2022 04:20 AM",
      status: "Completed",
    },
    {
      txnId: "XXXXXXXX645",
      token: "1.3548",
      tokenreceive: "2.0100",
      date: "22-07-2022 04:20 AM",
      status: "Completed",
    },
  ];

  return (
    <>
      <Box className={classes.headbox}>
        <Box mt={2} mb={3}>
          <Grid container spacing={2} style={{ alignItems: "center" }}>
            <Grid item lg={12}>
              <Box mb={3}>
                <Typography variant="h4">Transaction Details</Typography>
              </Box>
            </Grid>
          </Grid>

          <Box className={classes.MainBoxstyle}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4} lg={3} sm={6}>
                <Box>
                  <label style={{ marginBottom: "-7px" }}>
                    Search by Transaction Id
                  </label>
                  <FormControl
                    variant="outlined"
                    fullWidth
                    className={classes.forminput}
                  >
                    {/* <InputLabel margin="dense">All</InputLabel> */}
                    <TextField
                      placeholder="Search here"
                      variant="outlined"
                      type="text"
                      inputProps={{ maxLength: 256 }}
                      className="textFeilds"
                      InputProps={{
                        className: classes.TextBox,
                      }}
                    />
                  </FormControl>
                </Box>
              </Grid>
              <Grid item xs={12} md={4} lg={3} sm={6}>
                <label>From</label>

                <KeyboardDatePicker
                  className={`${classes.date} textFeilds`}
                  placeholder="DD/MM/YYYY"
                  format="DD/MM/YYYY"
                  inputVariant="outlined"
                  disableFuture
                  margin="dense"
                  InputProps={{
                    className: classes.TextBox,
                  }}
                  name="dateOfBirth"
                  value={fromData}
                  onChange={(date) => setFromData(date)}
                />
                {/* <Box mt={2}>
                  <Button
                    onClick={handlereset}
                    variant="outlined"
                    color="primary"
                    fullWidth
                  >
                    Reset all
                  </Button>
                </Box> */}
              </Grid>
              <Grid item xs={12} md={4} lg={3} sm={6}>
                <label>To</label>
                <KeyboardDatePicker
                  placeholder="DD/MM/YYYY"
                  format="DD/MM/YYYY"
                  inputVariant="outlined"
                  className={`${classes.date} textFeilds`}
                  InputProps={{
                    className: classes.TextBox,
                  }}
                  disableFuture
                  margin="dense"
                  name="dateOfBirth"
                  value={toData}
                  onChange={(date) => setToData(date)}
                />
                {/* <Box mt={2}>
                  <Button
                    variant="contained"
                    fullWidth
                    color="secondary"
                    onClick={downloadExcel}
                    style={{ padding: "8px 0px 8px 0px" }}
                  >
                    Download Xlsx&nbsp;&nbsp;
                    <BsDownload className={classes.download} />
                  </Button>
                </Box> */}
              </Grid>
              <Grid item xs={12} md={4} lg={3} sm={6}>
                <Box className={classes.alignBtn}>
                  <Button
                    // variant="outlined"
                    // color="primary"
                    fullWidth
                    className={classes.clearButton}
                  >
                    Clear
                  </Button>
                </Box>

                {/* <Box mt={2}>
                  <Button
                    variant="contained"
                    fullWidth
                    color="secondary"
                    onClick={downloadExcel}
                    style={{ padding: "8px 0px 8px 0px" }}
                  >
                    Download Xlsx&nbsp;&nbsp;
                    <BsDownload className={classes.download} />
                  </Button>
                </Box> */}
              </Grid>
              <Grid item xs={12} md={4} lg={3} sm={6}>
                <Box mt={3}>
                  <Button
                    // variant="contained"
                    fullWidth
                    // color="secondary"
                    style={{
                      color: "#fff",
                      background:
                        "linear-gradient(180deg, #00ACEB 0%, #00B0ED 10.18%, #1069C2 70.35%, #1069C2 100%)",
                      borderRadius: "8px",
                      padding: "10px 40px ",
                      marginTop: "-5px",
                    }}
                  >
                    Apply
                  </Button>
                </Box>
              </Grid>
              <Grid item xs={12} md={4} lg={3} sm={6}>
                <Box mt={2} align="right">
                  <Button
                    onClick={downloadExcel}
                    fullWidth
                    style={{
                      color: "#fff",
                      background:
                        "linear-gradient(180deg, #00ACEB 0%, #00B0ED 10.18%, #1069C2 70.35%, #1069C2 100%)",
                      borderRadius: "8px",
                      padding: "10px 40px ",
                    }}
                  >
                    Download Xlsx&nbsp;&nbsp;
                    <BsDownload className={classes.download} />
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>

        <Box mt={2} width="100%">
          <>
            <TableContainer className="TableContainerBox">
              <Table aria-label="simple table" className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell
                      align="right"
                      style={{ width: "150px" }}
                      className={classes.datatitle}
                    >
                      Transaction ID
                    </TableCell>
                    <TableCell align="left">Token Amount</TableCell>

                    <TableCell align="left">VD Token Recevied</TableCell>
                    <TableCell align="right">Transaction Date & Time</TableCell>

                    <TableCell align="right">Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {DataList.map((value) => {
                    return (
                      <>
                        <TableRow className={classes.tables}>
                          <TableCell
                            padding="5px"
                            width="30"
                            component="th"
                            scope="row"
                            align="left"
                          >
                            {value.txnId}
                          </TableCell>
                          <TableCell align="left">0.255</TableCell>

                          <TableCell align="right">2.0100</TableCell>
                          <TableCell align="right">
                            02-07-2022 04:20 AM
                          </TableCell>
                          <TableCell align="right" style={{ color: "#079D6C" }}>
                            Completed
                          </TableCell>
                        </TableRow>
                      </>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>{" "}
            {/* {historyData && historyData.length > 0 && (
              <Box mb={2} mt={2} style={{ width: "100%" }}>
                <Pagination
                  count={Math.ceil(pagesCount)}
                  page={page}
                  onChange={(e, value) => setPage(value)}
                />
              </Box>
            // )} */}
          </>
          {/* )} */}
        </Box>
      </Box>
    </>
  );
}

export default TransactionMain;
