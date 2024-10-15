import React, { useState, useContext, useEffect } from "react";
import ButtonCircularProgress from "@component/ButtonCircularProgress";
import { formatEther } from "viem";
import {
  Typography,
  Box,
  Grid,
  Button,
  TableContainer,
  Table,
  Select,
  TableRow,
  TableCell,
  MenuItem,
  TableBody,
  FormControl,
  TableHead,
  makeStyles,
} from "@material-ui/core";
import moment from "moment";
import { BiCopy } from "react-icons/bi";
import Axios from "axios";
// import ApiConfig from "src/config/APICongig";
// import DataNotFoundIMG from "src/component/DataNotFoundIMG";
import { AuthContext } from "../../../../src/context/Auth";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { Pagination } from "@material-ui/lab";
import { toast } from "react-toastify";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { BsDownload } from "react-icons/bs";
import * as XLSX from "xlsx";
import { useAccount } from "wagmi";
import linkImg from "./../../../../public/external-link.png"

const useStyles = makeStyles((theme) => ({
  headbox: {
    borderRadius: "20px",
    // marginTop: "80px",
    // overflow: "auto",
    [theme.breakpoints.down("sm")]: {
      padding: "20px 7px 53px 7px",
      borderRadius: "16px",
    },
    "& h4": {
      color: "#000",
      fontSize: "36px",
      fontStyle: "normal",
      fontFamily: "Inter",
      fontWeight: "700",
      lineHeight: "54px",
    },
  },
  Layout: {
    borderRadius: "20px",
    padding: "20px",
    boxShadow:
      " rgba(0, 0, 0, 0.3) 0px 0px 5px 0px, rgba(0, 0, 0, 0.3) 0px 0px 1px 0px",
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
      color: "#000 !important",
      border: "1.16355px solid #FFFFFF",
      borderRadius: "3.49065px !important",
    },
    "& .MuiSelect-icon": {
      color: "#000 !important",
    },
    "& .MuiFormControl-marginDense": {
      color: "#000 !important",
      border: "1.16355px solid #FFFFFF",
      borderRadius: "3.49065px !important",
    },
  },
  forminputDate: {
    "& .MuiFormControl-marginDense": {
      border: "2.16355px solid #FFFFFF",
      borderRadius: "3.49065px !important",
    },
    "& .MuiInputBase-input": {
      color: "#000 !important",
    },
  },
  download: {
    fontSize: "17px",
    cursor: "pointer",
    "&:hover": {
      color: "red",
    },
  },

  FromTable: {
    [theme.breakpoints.only("md")]: {
      marginTop: "-22px",
    },
    [theme.breakpoints.only("sm")]: {
      marginTop: "-16px",
    },
    [theme.breakpoints.only("xs")]: {
      marginTop: "-18px",
    },
  },
  FromTable1: {
    [theme.breakpoints.only("xs")]: {
      marginTop: "-20px",
    },

    date: {
      color: "#FFFFFF",
      // background: `${theme.palette.background.taf} !important`,
    },
  },
  mainFilterBox: {
    marginTop: "20px",
    padding: "15px",
    "@media (max-width: 1600px)": {
      padding: "0",
    },
  },
  label: {
    fontFamily: "Inter",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "16.9024px",
    lineHeight: "20px",
    /* identical to box height */

    color: "#000",
  },
  tableButton: {
    border: "none",
    background: "#56CA00",
    borderRadius: "10px",
    fontFamily: "Inter",
    fontStyle: "normal",
    fontWeight: "700 !important",
    fontSize: "20px",
    lineHeight: "21px",
    border: "none",
    height: "40px",
    padding: "25px 40px",
    color: "#FFFFFF",
  },
  headCell: {
    background: "transparent",
    color: "#000",
  },
}));
const tableData = [
  {
    id: 1,
  },
  {
    id: 1,
  },
  {
    id: 1,
  },
  {
    id: 1,
  },
];
function TransactionMain() {


  const classes = useStyles();
  const [historyData, setHistoryData] = useState([]);

  const auth = useContext(AuthContext);


  const {address , isConnected} = useAccount();

  const userdata = auth?.userData ? auth?.userData : "";

  const [toData, setToData] = useState();
  const [fromData, setFromData] = useState();
  const [coinName, setCoinName] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [noOfPages, setnoOfPages] = useState(1);
  const [page, setPage] = useState(1);
  const [pagesCount, setPagesCount] = useState(1);

  const [details, setdetails] = useState([]);
  const [value, setValue] = useState(0);
  const [currentvalue, setCurrentValue] = useState("all");
  const [coin, setcoin] = useState("all");
  const [clear, setIsClear] = useState(false);
  const [coinaddressData, setcoinData] = useState([]);

  const [toaddressData, setToaddressData] = useState("");

  const [transaction, setTransaction] = useState([]);

  // useEffect(() => {
  //   const filteraddress = coinaddressData.map((data, i) => {
  //     setToaddressData(data?.WalletAddress);
  //   });
  // }, [coinaddressData]);

  // const handleChange = (event, newValue) => {
  //   setValue(newValue);
  // };

  const AllTransactionHistory = async () => {
    setIsLoading(true);
    setHistoryData("");

    try {
      const res = await Axios({
        method: "GET",
        url: `https://api.polygonscan.com/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=S3DF59HDVTU39HKI5CHEN2QR54ZQB46ZFU`,
      });

      if (res.data.status === "1") {
        setHistoryData(res.data.result);
        setIsLoading(false);
      } else {
        console.log("Error in API response");
        setIsLoading(false);
      }
    } catch (error) {
      console.log("Error:", error);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if(isConnected)
    {AllTransactionHistory();}
  }, [address]);

  const toaddresshistory = async () => {
    setIsLoading(true);
    try {
      const res = await Axios.get(ApiConfig.toaddress, {
        headers: {
          token: window.localStorage.getItem("token"),
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
  // useEffect(() => {
  //   // if (page && userdata?.userId) {
  //   // allHistoryHandler([]);

  //   AllTransactionHistory();
  //   // }
  // }, [page, currentvalue, fromData, toData, coin, clear]);
  // useEffect(() => {
  //   AllTransactionHistory();
  // }, []);

  // page, currentvalue, fromData, toData, coin, clear, userdata?.userId
  const downloadExcel = () => {
    const workSheet = XLSX.utils.json_to_sheet(historyData);
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, "userList");
    let buf = XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
    XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
    XLSX.writeFile(workBook, "Transaction_History.xlsx");
  };
  // useEffect(() => {
  //   if (userdata?.userId) {
  //     allHistoryHandler();
  //     setPage(1);
  //   }
  // }, [page, currentvalue, fromData, toData, coin, clear, userdata?.userId]);

  useEffect(() => {
    if (currentvalue === "BUYTOKEN") {
      const filterFun = historyData.filter((data, i) => {
        return data.status === "SUCCESS";
      });
      setHistoryData(filterFun);
    }
  }, [currentvalue]);


  function formatDate(timestamp) {
    // Convert seconds to milliseconds by multiplying by 1000
    const date = new Date(timestamp * 1000);
  
    // Get day, month, and year from the date object
    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are zero-based, so we add 1
    const year = date.getFullYear();
  
    // Format the date as DD/MM/YYYY
    const formattedDate = `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;
  
    return formattedDate;
  }
  

  return (
    <>
      <Box className={classes.headbox} style={{ marginTop: "95px" }}>


        <Box mt={2} width="100%">
          {isLoading ? (
            <ButtonCircularProgress />
          ) : (
            <>
             <div style={{ borderLeft: "5px solid #56CA00", marginBottom: "20px" }}>
          <div
            style={{
              color: "#060A25",
              fontFamily: "Inter",
              fontSize: "22px",
              fontStyle: "normal",
              fontWeight: 700,
              paddingLeft: "10px",
            }}
          >
            {" "}
            Transaction History
          </div>
        </div>
              <Box className={classes.Layout}>
                <TableContainer className="TableContainerBox">
                  <Table
                    aria-label="simple table"
                    style={{ minWidth: "900px" }}
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell align="right" className={classes.headCell}>
                          Sr. No.
                        </TableCell>
                        {/* <TableCell align="right" className={classes.headCell}>
                          LAX
                        </TableCell> */}
                        <TableCell align="right" className={classes.headCell}>
                          Amount
                        </TableCell>
                        <TableCell align="right" className={classes.headCell}>
                          From Address
                        </TableCell>
                        <TableCell align="right" className={classes.headCell}>
                          To Address
                        </TableCell>
                        <TableCell align="right" className={classes.headCell}>
                          Date & Time
                        </TableCell>
                        <TableCell align="right" className={classes.headCell}>
                          Status
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody style={{ background: "#ffffff" }}>
                      {historyData &&
                        historyData.map((values, index) => {

                          // if(values.to.toLowerCase() === address.toLowerCase )
                          return (


                            
                            <TableRow className={classes.tables}>
                              <TableCell align="right">
                                {" "}
                                {(page - 1) * 8 + index + 1}
                              </TableCell>
                              {/* <TableCell align="right"> {1}</TableCell> */}
                              <TableCell align="right">
                                <span style={{ color: "" }}>
                                  {formatEther(values?.value).toString()} Matic
                                </span>
                              </TableCell>
                              <TableCell align="right">
                                {values.from ? (
                                  <>
                                    {values.from}
                                    <CopyToClipboard text={values?.from}>
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
                                  "contract creation"
                                )}
                              </TableCell>
                              <TableCell align="right">
                                {values.to ? (
                                  <>
                                    {values.to}
                                    <CopyToClipboard text={values?.to}>
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
                                  "contract creation"
                                )}
                              </TableCell>
                              <TableCell align="right">
                                {
                                values?.timeStamp && formatDate(values?.timeStamp)
                                

                                }{" "}
                              </TableCell>
                              <TableCell align="right">
                                {values?.txreceipt_status === "1" ? (
                                  <span style={{ color: "green" }}>
                                    Success
                                  </span>
                                ) : 
                                <span style={{ color: "raed" }}>
                                    Success
                                  </span>}
                                

                              
                              </TableCell>

                              <TableCell align="right" >
                                <a href={`https://polygonscan.com/tx/${values.hash}`} target="_blank">    <img src={linkImg} alt="Link" style={{height: "12px" }}/> </a>
                              </TableCell>
                            </TableRow>
                          ); 
                        })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>

              {(historyData &&
                historyData.length === 0 &&
                historyData.length === undefined) ||
                historyData.length === null}
            </>
          )}

          {historyData && historyData.length > 0 && (
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
