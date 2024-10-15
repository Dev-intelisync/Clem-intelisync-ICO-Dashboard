import React, { useState, useContext, useEffect } from "react";
import {
  Typography,
  Box,
  Grid,
  InputBase,
  Paper,
  Button,
  Link,
  TableContainer,
  IconButton,
  Table,
  InputLabel,
  Select,
  TableRow,
  TableCell,
  Menu,
  MenuItem,
  TableBody,
  Avatar,
  FormControl,
  TextField,
  TableHead,
  makeStyles,
} from "@material-ui/core";
import { sortAddress } from "../utils";
import moment from "moment";
import { BiCopy } from "react-icons/bi";
import Axios from "axios";
import ApiConfig from "../config/APIConfig";
import { AuthContext } from "../context/Auth";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { Pagination } from "@material-ui/lab";
import NoDataFound from "../DataNotFound";
import ButtonCircularProgress from "../component/ButtonCircularProgress";
import { toast } from "react-toastify";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { BsArrowUpRight, BsArrowDownRight } from "react-icons/bs";
import { BsDownload } from "react-icons/bs";
import * as XLSX from "xlsx";

const useStyles = makeStyles((theme) => ({
  headbox: {
    borderRadius: "20px",
    marginTop: "80px",
    "& h4": {
      fontFamily: "'Inter'",
      fontStyle: "normal",
      fontWeight: "600",
      fontSize: "24px",
      lineHeight: "29px",
      color: "#44484E",
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
    // "&:active": {
    //   backgroundColor: "#FF2626",
    // },
    // "&:hover": {
    //   backgroundColor: "#000",
    // },
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
  arrowup: {
    backgroundColor: "#ff5722",

    color: "#000",
    width: "30px",
    height: "30px",
  },
  arrowup1: {
    backgroundColor: "yellow",
    color: "#000",
    width: "30px",
    height: "30px",
  },
  arrowup2: {
    backgroundColor: "green",
    color: "#000",
    width: "30px",
    height: "30px",
  },
  table: {
    minWidth: 1100,
  },
  bin: {
    padding: "10px 8px",
    border: "1px solid #6ECFF3 !important",
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
              <Grid item xs={12} md={6} lg={3} sm={12}>
                <Box mt={-1}>
                  <label>Search by Transaction Id</label>
                  <FormControl
                    variant="outlined"
                    fullWidth
                    className={classes.forminput}
                  >
                    {/* <InputLabel margin="dense">All</InputLabel> */}
                    <TextField
                      placeholder="Search here"
                      variant="outlined"
                      inputProps={{
                        className: classes.bin,
                      }}
                    />
                  </FormControl>
                </Box>
              </Grid>

              <Grid item xs={12} md={6} lg={2} sm={12}>
                <label>From</label>

                <KeyboardDatePicker
                  className={classes.date}
                  placeholder="DD/MM/YYYY"
                  format="DD/MM/YYYY"
                  inputVariant="outlined"
                  disableFuture
                  margin="dense"
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

              <Grid item xs={12} md={6} lg={2} sm={12}>
                <label>To</label>
                <KeyboardDatePicker
                  className={classes.date}
                  placeholder="DD/MM/YYYY"
                  format="DD/MM/YYYY"
                  inputVariant="outlined"
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
              <Grid item xs={12} md={6} lg={2} sm={12}>
                <Box mt={4}>
                  <Button
                    // variant="outlined"
                    // color="primary"
                    style={{
                      color: "#fff",
                      border: "1px solid #3B99DF",
                      borderRadius: "8px",
                      padding: "10px 40px ",
                      color: "#000",
                    }}
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
              <Grid item xs={12} md={6} lg={2} sm={12}>
                <Box mt={4}>
                  <Button
                    // variant="contained"
                    // fullWidth
                    // color="secondary"
                    style={{
                      color: "#fff",
                      background:
                        "linear-gradient(180deg, #00ACEB 0%, #00B0ED 10.18%, #1069C2 70.35%, #1069C2 100%)",
                      borderRadius: "8px",
                      padding: "10px 40px ",
                    }}
                  >
                    Apply
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
            </Grid>
          </Box>
        </Box>

        <Box mt={2} width="100%">
          {/* {historyData && historyData.length === 0 ? (
            <Typography variant="h3" style={{ fontSize: "17px" }}>
              No Data Found
            </Typography>
          ) : ( */}
          <>
            <TableContainer>
              <Table aria-label="simple table" className={classes.table}>
                <TableHead>
                  <TableRow>
                    {/* <TableCell align="right">&nbsp;</TableCell> */}
                    {/* <TableCell align="right">Type</TableCell> */}
                    <TableCell align="right">Transaction ID</TableCell>
                    <TableCell align="right">Token Amount</TableCell>

                    <TableCell align="right">VD Token Recevied</TableCell>
                    <TableCell align="right">Transaction Date & Time</TableCell>

                    <TableCell align="right">Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {historyData &&
                    historyData.map((data, i) => (
                      <TableRow className={classes.tables}>
                        <TableCell
                          padding="5px"
                          width="30"
                          component="th"
                          scope="row"
                          align="left"
                        >
                          {data.status === "SUCCESS" && (
                            <Avatar className={classes.arrowup2}>
                              <BsArrowDownRight color="primary" size="15" />
                            </Avatar>
                          )}
                          {data.status === "PENDING" && (
                            <Avatar className={classes.arrowup1}>
                              <BsArrowUpRight color="primary" size="15" />
                            </Avatar>
                          )}
                          {data.status === "CONFIRM" &&
                            data.txnType === "WITHDRAW" && (
                              <Avatar className={classes.arrowup}>
                                <BsArrowUpRight color="secondary" size="15" />
                              </Avatar>
                            )}
                          {data.status === "CONFIRM" &&
                            data.txnType === "DEPOSIT" && (
                              <Avatar className={classes.arrowup}>
                                <BsArrowDownRight color="secondary" size="15" />
                              </Avatar>
                            )}
                        </TableCell>
                        <TableCell align="right">
                          {data?.txnType ? data?.txnType : "N/A"}
                        </TableCell>

                        <TableCell align="right">{data?.txnId}</TableCell>
                        <TableCell align="right">
                          <Box
                            className={classes.text}
                            style={{ display: "flex" }}
                          >
                            <Box>
                              {data?.txnHash === null
                                ? "N/A"
                                : sortAddress(data?.txnHash)}
                              {/* {data?.txnHash ? sortAddress(data?.txnHash) : ""} */}
                            </Box>
                            <Box>
                              {data?.txnHash ? (
                                <CopyToClipboard text={data?.txnHash}>
                                  <BiCopy
                                    style={{
                                      color: "#fff",
                                      fontSize: " 14px",
                                      cursor: "pointer",
                                      marginLeft: "5px",
                                    }}
                                    onClick={() =>
                                      toast.success("Copied successfully")
                                    }
                                  />
                                </CopyToClipboard>
                              ) : (
                                <></>
                              )}
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell align="right">
                          <Box
                            className={classes.text}
                            style={{ display: "flex" }}
                          >
                            <Box>
                              {data?.address === null
                                ? "N/A"
                                : sortAddress(data?.address)}
                              {/* {data?.txnHash ? sortAddress(data?.txnHash) : ""} */}
                            </Box>
                            <Box>
                              {data?.address ? (
                                <CopyToClipboard text={data?.address}>
                                  <BiCopy
                                    style={{
                                      color: "#fff",
                                      fontSize: " 14px",
                                      cursor: "pointer",
                                      marginLeft: "5px",
                                    }}
                                    onClick={() =>
                                      toast.success("Copied successfully")
                                    }
                                  />
                                </CopyToClipboard>
                              ) : (
                                <></>
                              )}
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell align="right">
                          {data?.coinType === "BTC" ? (
                            <>
                              {" "}
                              {coinaddressData.map((data, i) => {
                                return (
                                  <>
                                    {data?.CoinName === "BTC" ? (
                                      <Box
                                        className={classes.text}
                                        style={{ display: "flex" }}
                                      >
                                        <Box>
                                          {data?.WalletAddress === null
                                            ? ""
                                            : sortAddress(data?.WalletAddress)}
                                        </Box>
                                        <Box>
                                          {data?.WalletAddress ? (
                                            <CopyToClipboard
                                              text={data?.WalletAddress}
                                            >
                                              <BiCopy
                                                style={{
                                                  color: "#fff",
                                                  fontSize: " 14px",
                                                  cursor: "pointer",
                                                  marginLeft: "5px",
                                                }}
                                                onClick={() =>
                                                  toast.success(
                                                    "Copied successfully"
                                                  )
                                                }
                                              />
                                            </CopyToClipboard>
                                          ) : (
                                            <></>
                                          )}
                                        </Box>
                                      </Box>
                                    ) : (
                                      ""
                                    )}
                                  </>
                                );
                              })}
                            </>
                          ) : (
                            ""
                          )}{" "}
                          {data?.coinType === "BNB" ? (
                            <>
                              {" "}
                              {coinaddressData.map((data, i) => {
                                return (
                                  <>
                                    {data?.CoinName === "BNB" ? (
                                      <Box
                                        className={classes.text}
                                        style={{ display: "flex" }}
                                      >
                                        <Box>
                                          {data?.WalletAddress === null
                                            ? ""
                                            : sortAddress(data?.WalletAddress)}
                                        </Box>
                                        <Box>
                                          {data?.WalletAddress ? (
                                            <CopyToClipboard
                                              text={data?.WalletAddress}
                                            >
                                              <BiCopy
                                                style={{
                                                  color: "#fff",
                                                  fontSize: " 14px",
                                                  cursor: "pointer",
                                                  marginLeft: "5px",
                                                }}
                                                onClick={() =>
                                                  toast.success(
                                                    "Copied successfully"
                                                  )
                                                }
                                              />
                                            </CopyToClipboard>
                                          ) : (
                                            <></>
                                          )}
                                        </Box>
                                      </Box>
                                    ) : (
                                      ""
                                    )}
                                  </>
                                );
                              })}
                            </>
                          ) : (
                            ""
                          )}
                          {data?.coinType === "AVT" ? (
                            <>
                              {" "}
                              {coinaddressData.map((data, i) => {
                                return (
                                  <>
                                    {data?.CoinName === "AVT" ? (
                                      <Box
                                        className={classes.text}
                                        style={{ display: "flex" }}
                                      >
                                        <Box>
                                          {data?.WalletAddress === null
                                            ? ""
                                            : sortAddress(data?.WalletAddress)}
                                          {/* {sortAddress(data?.WalletAddress)} */}
                                        </Box>

                                        <Box>
                                          {data?.WalletAddress ? (
                                            <CopyToClipboard
                                              text={data?.WalletAddress}
                                            >
                                              <BiCopy
                                                style={{
                                                  color: "#fff",
                                                  fontSize: " 14px",
                                                  cursor: "pointer",
                                                  marginLeft: "5px",
                                                }}
                                                onClick={() =>
                                                  toast.success(
                                                    "Copied successfully"
                                                  )
                                                }
                                              />
                                            </CopyToClipboard>
                                          ) : (
                                            <></>
                                          )}
                                        </Box>
                                      </Box>
                                    ) : (
                                      ""
                                    )}
                                  </>
                                );
                              })}
                            </>
                          ) : (
                            ""
                          )}
                          {/* {data?.status === "SUCCESS" &&
                            data?.txnType === "DEPOSIT"
                              ? "N/A"
                              : ""} */}
                          {data?.coinType === "USDTERC" ? (
                            <>
                              {" "}
                              {coinaddressData.map((data, i) => {
                                return (
                                  <>
                                    {data?.CoinName === "USDTERC" ? (
                                      <Box
                                        className={classes.text}
                                        style={{ display: "flex" }}
                                      >
                                        <Box>
                                          {data?.WalletAddress === null
                                            ? ""
                                            : sortAddress(data?.WalletAddress)}
                                        </Box>
                                        <Box>
                                          {data?.WalletAddress ? (
                                            <CopyToClipboard
                                              text={data?.WalletAddress}
                                            >
                                              <BiCopy
                                                style={{
                                                  color: "#fff",
                                                  fontSize: " 14px",
                                                  cursor: "pointer",
                                                  marginLeft: "5px",
                                                }}
                                                onClick={() =>
                                                  toast.success(
                                                    "Copied successfully"
                                                  )
                                                }
                                              />
                                            </CopyToClipboard>
                                          ) : (
                                            <></>
                                          )}
                                        </Box>
                                      </Box>
                                    ) : (
                                      ""
                                    )}
                                  </>
                                );
                              })}
                            </>
                          ) : (
                            ""
                          )}
                          {data?.coinType === "USDTTRX" ? (
                            <>
                              {" "}
                              {coinaddressData.map((data, i) => {
                                return (
                                  <>
                                    {data?.CoinName === "USDTTRX" ? (
                                      <Box
                                        className={classes.text}
                                        style={{ display: "flex" }}
                                      >
                                        <Box>
                                          {data?.WalletAddress === null
                                            ? ""
                                            : sortAddress(data?.WalletAddress)}
                                        </Box>
                                        <Box>
                                          {data?.WalletAddress ? (
                                            <CopyToClipboard
                                              text={data?.WalletAddress}
                                            >
                                              <BiCopy
                                                style={{
                                                  color: "#fff",
                                                  fontSize: " 14px",
                                                  cursor: "pointer",
                                                  marginLeft: "5px",
                                                }}
                                                onClick={() =>
                                                  toast.success(
                                                    "Copied successfully"
                                                  )
                                                }
                                              />
                                            </CopyToClipboard>
                                          ) : (
                                            <></>
                                          )}
                                        </Box>
                                      </Box>
                                    ) : (
                                      ""
                                    )}
                                  </>
                                );
                              })}
                            </>
                          ) : (
                            ""
                          )}
                          {data?.coinType === "ETH" ? (
                            <>
                              {" "}
                              {coinaddressData.map((data, i) => {
                                return (
                                  <>
                                    {data?.CoinName === "ETH" ? (
                                      <Box
                                        className={classes.text}
                                        style={{ display: "flex" }}
                                      >
                                        <Box>
                                          {data?.WalletAddress === null
                                            ? ""
                                            : sortAddress(data?.WalletAddress)}
                                        </Box>

                                        <Box>
                                          {data?.WalletAddress ? (
                                            <CopyToClipboard
                                              text={data?.WalletAddress}
                                            >
                                              <BiCopy
                                                style={{
                                                  color: "#fff",
                                                  fontSize: " 14px",
                                                  cursor: "pointer",
                                                  marginLeft: "5px",
                                                }}
                                                onClick={() =>
                                                  toast.success(
                                                    "Copied successfully"
                                                  )
                                                }
                                              />
                                            </CopyToClipboard>
                                          ) : (
                                            <></>
                                          )}
                                        </Box>
                                      </Box>
                                    ) : (
                                      ""
                                    )}
                                  </>
                                );
                              })}
                            </>
                          ) : (
                            ""
                          )}
                        </TableCell>
                        <TableCell align="right">
                          {data?.fees === null ? "N/A" : <>{data?.fees}</>}
                        </TableCell>
                        <TableCell align="right">{data?.amount}</TableCell>
                        <TableCell
                          align="right"
                          // style={{ textTransform: "uppercase" }}
                        >
                          {/* {data?.coinType} */}
                          {data?.coinType === "AVT" ? (
                            "Toga"
                          ) : (
                            <>
                              {data?.coinType === null ? (
                                "Toga"
                              ) : (
                                <Box style={{ textTransform: "uppercase" }}>
                                  {data?.coinType}
                                </Box>
                              )}
                            </>
                          )}
                        </TableCell>
                        <TableCell align="right">
                          {data?.status === "CONFIRM" ? (
                            "CONFIRMED"
                          ) : (
                            <>
                              {data?.status === "SUCCESS" ? (
                                "SUCCESSFUL"
                              ) : (
                                <>
                                  {data?.status === "PENDING" ? "PENDING" : ""}
                                </>
                              )}
                            </>
                          )}
                        </TableCell>
                        <TableCell align="right">
                          {data?.txnTime
                            ? moment(data.txnTime).format("lll")
                            : "0"}
                        </TableCell>
                      </TableRow>
                    ))}
                  {isLoading && (
                    <Box style={{ display: "flex", justifyContent: "start" }}>
                      <ButtonCircularProgress />
                    </Box>
                  )}
                  {!isLoading && historyData && historyData.length === 0 && (
                    <NoDataFound />
                  )}
                </TableBody>
              </Table>
            </TableContainer>{" "}
            {historyData && historyData.length > 0 && (
              <Box mb={2} mt={2} style={{ width: "100%" }}>
                <Pagination
                  count={Math.ceil(pagesCount)}
                  page={page}
                  onChange={(e, value) => setPage(value)}
                />
              </Box>
            )}
          </>
          {/* )} */}
        </Box>
      </Box>
    </>
  );
}

export default TransactionMain;
