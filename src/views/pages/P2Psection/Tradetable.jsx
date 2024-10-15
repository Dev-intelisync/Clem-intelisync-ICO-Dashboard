import React, { useState, useContext, useEffect } from "react";
import {
  Typography,
  Box,
  Button,
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableBody,
  TableHead,
  makeStyles,
} from "@material-ui/core";
import moment from "moment";
import ApiConfig from "../../../config/APIConfig";
import { AuthContext } from "@context/Auth";
import { Pagination } from "@material-ui/lab";

import * as XLSX from "xlsx";
import DataNotFoundIMG from "@component/DataNotFoundIMG";

import axios from "axios";

const useStyles = makeStyles((theme) => ({
  headbox: {
    borderRadius: "20px",
    marginTop: "20px",
    "& h4": {
      fontFamily: "'Inter'",
      fontStyle: "normal",
      fontWeight: "600",
      fontSize: "30px",
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
    padding: "8px 40px ",
    marginTop: "5px",
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
    padding: "9px 8px",
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

  const [dataList, setDataList] = useState([]);

  const downloadExcel = () => {
    const workSheet = XLSX.utils.json_to_sheet(historyData);
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, "userList");
    let buf = XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
    XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
    XLSX.writeFile(workBook, "Transaction_History.xlsx");
  };

  const DataList = [
    {
      txnId: "1",
      advertise: "ENABLED",
      trade: "Buy",
      payment: "0.25",
      type: "Deposit",
      fiat: "INR",
      total: "0.25451",
      coin: "BTC",
      Equation: "06615.35",
      partner: "BNB Coin",
      status: "Success",

      date: "22-07-2022 04:20 AM",
    },
  ];

  const CompletedAdv = async () => {
    try {
      const res = await axios({
        method: "GET",
        url: ApiConfig.TradeAdvertisement,

        params: {
          // userId: auth.userData.userId,
          page: page - 1,
          limit: "15",
          tradeStatus: "Success",
        },
        headers: {
          token: window.localStorage.getItem("token"),
        },
      });
      if (res.data.responseCode === 200) {
        // setIsLoader(false);

        setDataList(res?.data?.result?.docs);
        setPagesCount(res?.data.result.pages);

        // sethandleapiclick(false);
        // handleClose2();
        // toast.success(res.data.message);
      } else {
        // setIsLoader(false);
      }
    } catch (err) {
      console.log("err", err);
    }
  };
  useEffect(() => {
    CompletedAdv();
  }, []);

  return (
    <>
      <Box className={classes.headbox}>
        <Box mt={2} mb={3}>
          <Box
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
            }}
          >
            <Box mb={3}>
              <Typography style={{ fontSize: "23px", fontWeight: "500" }}>
                Your Complete Trades
              </Typography>
            </Box>
            <Button
              // variant="contained"
              // color="secondary"
              onClick={downloadExcel}
              style={{
                color: "#fff",
                background:
                  "linear-gradient(180deg, #00ACEB 0%, #00B0ED 10.18%, #1069C2 70.35%, #1069C2 100%)",
                borderRadius: "8px",
                padding: "8px 34px ",
                fontSize: "15px",
                height: "40px",
              }}
            >
              Download CSV
            </Button>
          </Box>
        </Box>
        <Box pr={1}>
          <Box mt={2} width="100%">
            <>
              <TableContainer className="TableContainerBox">
                <Table aria-label="simple table" className={classes.table}>
                  <TableHead>
                    <TableRow>
                      <TableCell
                        align="right"
                        style={{ width: "50px" }}
                        className={classes.datatitle}
                      >
                        S. No.
                      </TableCell>
                      <TableCell align="left">Trade Type</TableCell>
                      <TableCell align="left">Quantity</TableCell>

                      <TableCell align="left">Coin </TableCell>

                      <TableCell align="left">Trade Amount </TableCell>

                      <TableCell align="left">Created At </TableCell>
                      <TableCell align="left">Trade Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {dataList &&
                      dataList.map((value, i) => {
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
                                {i + 1}
                              </TableCell>
                              <TableCell align="left">
                                {value?.p2pAdvertisementId?.tradeType
                                  ? value?.p2pAdvertisementId?.tradeType
                                  : "N/A"}
                              </TableCell>
                              <TableCell align="left">
                                {value.quantity ? value?.quantity : "N/A"}
                              </TableCell>
                              <TableCell align="left">
                                {value.p2pAdvertisementId?.asset === "VD" ? (
                                  "VDT"
                                ) : (
                                  <>
                                    {value.p2pAdvertisementId?.asset
                                      ? value.p2pAdvertisementId?.asset
                                      : "N/A"}
                                  </>
                                )}
                              </TableCell>{" "}
                              <TableCell align="left">
                                {value.price ? value?.price : "N/A"}
                              </TableCell>{" "}
                              <TableCell align="left">
                                {moment(value.createdAt).format("ll")}
                              </TableCell>
                              <TableCell align="left">
                                {value.tradeStatus ? value?.tradeStatus : "N/A"}
                              </TableCell>{" "}
                            </TableRow>
                          </>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>{" "}
              {(dataList &&
                dataList.length === 0 &&
                dataList.length === undefined) ||
                dataList.length === null ||
                (dataList.length === 0 && <DataNotFoundIMG />)}
            </>
          </Box>
          {dataList && dataList.length > 0 && (
            <Pagination
              count={pagesCount}
              page={page}
              onChange={(e, v) => setPage(v)}
            />
          )}
        </Box>
      </Box>
    </>
  );
}

export default TransactionMain;
