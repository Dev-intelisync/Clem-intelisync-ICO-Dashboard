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
import { sortAddress } from "@utils";
import moment from "moment";
import { BiCopy } from "react-icons/bi";
import Axios from "axios";
import ApiConfig from "../../../config/APIConfig";
import { AuthContext } from "@context/Auth";
import { Pagination } from "@material-ui/lab";
import { toast } from "react-toastify";
import DataNotFoundIMG from "@component/DataNotFoundIMG";
import { CopyToClipboard } from "react-copy-to-clipboard";
import * as XLSX from "xlsx";

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

function AllOrderData() {
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
  const [orderList, setOrderList] = useState([]);

  const [toaddressData, setToaddressData] = useState("");

  const downloadExcel = () => {
    const workSheet = XLSX.utils.json_to_sheet(orderList);
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, "orderList");
    let buf = XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
    XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
    XLSX.writeFile(workBook, "Ordert_List.xlsx");
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
    {
      txnId: "2",
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
    {
      txnId: "3",
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

  const p2pAdvertisementOrdersList = async () => {
    try {
      const res = await Axios({
        method: "GET",
        url: ApiConfig.p2pAdvertisementOrders,
        headers: {
          token: window.localStorage.getItem("token"),
        },
      });

      if (res.data.responseCode === 200) {
        setOrderList(res.data.result.docs);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    p2pAdvertisementOrdersList();
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
                All orders List
              </Typography>
            </Box>
            <Button
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

                      <TableCell align="left" style={{ width: "120px" }}>
                        Trade Type
                      </TableCell>
                      <TableCell align="left">From Address </TableCell>
                      <TableCell align="left">To Address</TableCell>

                      <TableCell align="left">Coin </TableCell>
                      <TableCell align="left">Trade Amount </TableCell>

                      <TableCell align="left">Created At </TableCell>

                      <TableCell align="left" style={{ width: "142px" }}>
                        Transaction Status
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {orderList &&
                      orderList.map((value, index) => {
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
                                {index + 1}
                              </TableCell>
                              <TableCell align="left">
                                {value?.p2pAdvertisementId?.tradeType
                                  ? value?.p2pAdvertisementId?.tradeType
                                  : "N/A"}
                              </TableCell>
                              <TableCell align="left">
                                {value.fromAddress ? (
                                  <>
                                    {sortAddress(value.fromAddress)}
                                    <CopyToClipboard text={value?.fromAddress}>
                                      <BiCopy
                                        style={{
                                          color: "#848484",
                                          fontSize: " 20px",
                                          cursor: "pointer",
                                          marginLeft: "5px",
                                        }}
                                        onClick={() =>
                                          toast.success("Copied successfully")
                                        }
                                      />
                                    </CopyToClipboard>
                                  </>
                                ) : (
                                  "N/A"
                                )}
                              </TableCell>
                              <TableCell align="left">
                                {value.toAddress ? (
                                  <>
                                    {sortAddress(value.toAddress)}
                                    <CopyToClipboard text={value?.toAddress}>
                                      <BiCopy
                                        style={{
                                          color: "#848484",
                                          fontSize: " 20px",
                                          cursor: "pointer",
                                          marginLeft: "5px",
                                        }}
                                        onClick={() =>
                                          toast.success("Copied successfully")
                                        }
                                      />
                                    </CopyToClipboard>
                                  </>
                                ) : (
                                  "N/A"
                                )}
                              </TableCell>
                              <TableCell align="left">
                                {" "}
                                {value?.p2pAdvertisementId?.asset === "VD" ? (
                                  "VDT"
                                ) : (
                                  <>
                                    {value?.p2pAdvertisementId?.asset
                                      ? value?.p2pAdvertisementId?.asset
                                      : "N/A"}
                                  </>
                                )}
                              </TableCell>
                              <TableCell align="left">
                                {value.amount ? value?.amount : "N/A"}
                              </TableCell>
                              <TableCell align="left">
                                {moment(
                                  value.createdAt ? value.createdAt : "N/A"
                                ).format("lll")}{" "}
                              </TableCell>{" "}
                              <TableCell align="left">
                                {value.transStatusType
                                  ? value?.transStatusType
                                  : "N/A"}
                              </TableCell>{" "}
                            </TableRow>
                          </>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>{" "}
              {(orderList &&
                orderList.length === 0 &&
                orderList.length === undefined) ||
                orderList.length === null ||
                (orderList.length === 0 && <DataNotFoundIMG />)}
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
      </Box>
    </>
  );
}

export default AllOrderData;
