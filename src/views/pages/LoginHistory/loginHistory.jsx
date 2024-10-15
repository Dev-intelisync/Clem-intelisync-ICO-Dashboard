// import React, { useState, useContext, useEffect } from "react";
// import {
//   Typography,
//   Box,
//   Grid,
//   Button,
//   TableContainer,
//   Table,
//   Select,
//   TableRow,
//   TableCell,
//   MenuItem,
//   TableBody,
//   FormControl,
//   TableHead,
//   makeStyles,
// } from "@material-ui/core";
// import { sortAddress } from "@utils";
// import moment from "moment";
// import { BiCopy } from "react-icons/bi";
// import Axios from "axios";
// import ApiConfig from "../../../config/APIConfig";
// import DataNotFoundIMG from "@component/DataNotFoundIMG";
// import { AuthContext } from "@context/Auth";
// import { KeyboardDatePicker } from "@material-ui/pickers";
// import { Pagination } from "@material-ui/lab";
// import ButtonCircularProgress from "@component/ButtonCircularProgress";
// import { toast } from "react-toastify";
// import { CopyToClipboard } from "react-copy-to-clipboard";
// import { BsDownload } from "react-icons/bs";
// import * as XLSX from "xlsx";

// const useStyles = makeStyles((theme) => ({
//   headbox: {
//     borderRadius: "20px",
//     // marginTop: "80px",
//     // overflow: "auto",
//     [theme.breakpoints.down("sm")]: {
//       padding: "20px 7px 53px 7px",
//       borderRadius: "16px",
//     },
//     "& h4": {
//       color: "#FFFFFF",
//       fontSize: "36px",
//       fontStyle: "normal",
//       fontFamily: "Inter",
//       fontWeight: "700",
//       lineHeight: "54px",
//     },
//   },
//   tabsize: {
//     fontSize: "16px",
//     fontWeight: "600",
//     color: "#fff",
//     [theme.breakpoints.down("xs")]: {
//       fontSize: "14px",
//     },
//   },

//   forminput: {
//     "& div": {
//       color: "#FFFFFF !important",
//       border: "1.16355px solid #FFFFFF",
//       borderRadius: "3.49065px !important",
//     },
//     "& .MuiSelect-icon": {
//       color: "#FFFFFF !important",
//     },
//     "& .MuiFormControl-marginDense": {
//       color: "#FFFFFF !important",
//       border: "1.16355px solid #FFFFFF",
//       borderRadius: "3.49065px !important",
//     },
//   },
//   forminputDate: {
//     "& .MuiFormControl-marginDense": {
//       border: "2.16355px solid #FFFFFF",
//       borderRadius: "3.49065px !important",
//     },
//     "& .MuiInputBase-input": {
//       color: "#FFFFFF !important",
//     },
//   },
//   download: {
//     fontSize: "17px",
//     cursor: "pointer",
//     "&:hover": {
//       color: "red",
//     },
//   },

//   FromTable: {
//     [theme.breakpoints.only("md")]: {
//       marginTop: "-22px",
//     },
//     [theme.breakpoints.only("sm")]: {
//       marginTop: "-16px",
//     },
//     [theme.breakpoints.only("xs")]: {
//       marginTop: "-18px",
//     },
//   },
//   FromTable1: {
//     [theme.breakpoints.only("xs")]: {
//       marginTop: "-20px",
//     },

//     date: {
//       color: "#FFFFFF",
//       // background: `${theme.palette.background.taf} !important`,
//     },
//   },
//   mainFilterBox: {
//     marginTop: "20px",
//     padding: "15px",
//     "@media (max-width: 1600px)": {
//       padding: "0",
//     },
//   },
//   label: {
//     fontFamily: "Inter",
//     fontStyle: "normal",
//     fontWeight: "400",
//     fontSize: "16.9024px",
//     lineHeight: "20px",
//     /* identical to box height */

//     color: "#FFFFFF",
//   },
//   tableButton: {
//     border: "none",
//     background: "#56CA00",
//     borderRadius: "10px",
//     fontFamily: "Inter",
//     fontStyle: "normal",
//     fontWeight: "700 !important",
//     fontSize: "14px",
//     lineHeight: "21px",
//     border: "none",
//     height: "36px",
//     /* identical to box height */

//     color: "#FFFFFF",
//   },
//   headCell: {
//     background: "transparent",
//     color: "#6A36FF",
//   },
// }));
// const tableData = [
//   {
//     id: 1,
//   },
//   {
//     id: 1,
//   },
//   {
//     id: 1,
//   },
//   {
//     id: 1,
//   },
// ];
// function TransactionMain() {
//   const classes = useStyles();
//   const [historyData, setHistoryData] = useState([]);

//   const auth = useContext(AuthContext);

//   const userdata = auth?.userData ? auth?.userData : "";

//   const [toData, setToData] = useState();
//   const [fromData, setFromData] = useState();
//   const [coinName, setCoinName] = useState();
//   const [isLoading, setIsLoading] = useState(false);
//   const [noOfPages, setnoOfPages] = useState(1);
//   const [page, setPage] = useState(1);
//   const [pagesCount, setPagesCount] = useState(1);

//   const [details, setdetails] = useState([]);
//   const [value, setValue] = useState(0);
//   const [currentvalue, setCurrentValue] = useState("all");
//   const [coin, setcoin] = useState("all");
//   const [clear, setIsClear] = useState(false);
//   const [coinaddressData, setcoinData] = useState([]);

//   const [toaddressData, setToaddressData] = useState("");

//   const [transaction, setTransaction] = useState([]);

//   useEffect(() => {
//     const filteraddress = coinaddressData.map((data, i) => {
//       setToaddressData(data?.WalletAddress);
//     });
//   }, [coinaddressData]);

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };

//   const AllTransactionHistory = async () => {
//     setIsLoading(true);
//     let txnType;
//     let coinName;
//     if (currentvalue != "all") {
//       txnType = currentvalue;
//     }
//     if (coin != "all") {
//       coinName = coin;
//     }
//     setHistoryData("");
//     try {
//       const res = await Axios({
//         method: "POST",
//         url: ApiConfig.loginHistory,
//         headers: {
//           token: window.localStorage.getItem("token"),
//         },
//         data: {
//           page: page - 1,
//           // fromDate: fromData ? `${moment(fromData).unix()}000` : null,
//           // toDate: toData ? `${moment(toData).unix()}000` : null,
//           limit: 10,
//           coinName: coinName,
//           transactionType: txnType,
//         },
//       });
//       console.log(res, "res");
//       if (res.data.responseCode === 200) {
//         setHistoryData(res.data.result.docs);
//         setPagesCount(res?.data.result.pages);

//         setIsLoading(false);
//       }
//     } catch (error) {
//       console.log(error);
//       setIsLoading(false);
//     }
//   };
//   useEffect(() => {
//     AllTransactionHistory();
//   }, []);

//   return (
//     <>
//       <Box className={classes.headbox}>
//         <Box style={{ marginTop: "20px" }} mb={3}>
//           <Grid container spacing={2} style={{ alignItems: "center" }}>
//             <Grid item lg={12}>
//               <Typography variant="h4">Login History</Typography>
//             </Grid>
//           </Grid>
//         </Box>

//         <Box mt={2} width="100%">
//           {isLoading ? (
//             <ButtonCircularProgress />
//           ) : (
//             <>
//               <TableContainer className="TableContainerBox">
//                 <Table aria-label="simple table" style={{ minWidth: "900px" }}>
//                   <TableHead
//                     style={{
//                       minWidth: "900px",
//                       background:
//                         "linear-gradient(180deg, #FFFFFF 0%, #F4F4F4 100%)",
//                       borderBottom: "1.02122pxsolid #000000",
//                     }}
//                   >
//                     <TableRow>
//                       <TableCell
//                         align="right"
//                         className={classes.headCell}
//                         style={{
//                           width: "54px",
//                           borderBottom: "1.02122px solid #000000",
//                         }}
//                       >
//                         Sr. No.
//                       </TableCell>

//                       <TableCell
//                         align="right"
//                         className={classes.headCell}
//                         style={{
//                           width: "245px",
//                           borderBottom: "1.02122px solid #000000",
//                         }}
//                       >
//                         Email
//                       </TableCell>
//                       <TableCell
//                         align="right"
//                         className={classes.headCell}
//                         style={{
//                           width: "171px",
//                           borderBottom: "1.02122px solid #000000",
//                         }}
//                       >
//                         Date & Time
//                       </TableCell>

//                       <TableCell
//                         align="right"
//                         className={classes.headCell}
//                         style={{
//                           width: "113px",
//                           borderBottom: "1.02122px solid #000000",
//                         }}
//                       >
//                         IP Address
//                       </TableCell>
//                       <TableCell
//                         align="right"
//                         className={classes.headCell}
//                         style={{ borderBottom: "1.02122px solid #000000" }}
//                       >
//                         Browser Agent
//                       </TableCell>
//                     </TableRow>
//                   </TableHead>
//                   <TableBody style={{ background: "#ffffff" }}>
//                     {historyData &&
//                       historyData.map((values, index) => {
//                         return (
//                           <TableRow className={classes.tables}>
//                             <TableCell align="right">{index + 1}</TableCell>

//                             <TableCell align="right">{values.email}</TableCell>

//                             <TableCell align="right">
//                               {moment(
//                                 values.createdAt ? values.createdAt : "N/A"
//                               ).format("lll")}{" "}
//                             </TableCell>
//                             <TableCell align="right">
//                               {values.ip_Address}
//                             </TableCell>
//                             <TableCell align="right">
//                               {values.browser}
//                             </TableCell>
//                           </TableRow>
//                         );
//                       })}
//                   </TableBody>
//                 </Table>
//               </TableContainer>

//               {(historyData &&
//                 historyData.length === 0 &&
//                 historyData.length === undefined) ||
//                 historyData.length === null ||
//                 (historyData.length === 0 && <DataNotFoundIMG />)}
//             </>
//           )}

//           {historyData && historyData.length > 0 && (
//             <Pagination
//               count={pagesCount}
//               page={page}
//               onChange={(e, v) => setPage(v)}
//             />
//           )}
//         </Box>
//       </Box>
//     </>
//   );
// }

// export default TransactionMain;

import React, { useState, useContext, useEffect } from "react";
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
// import { sortAddress } from "src/utils";
import moment from "moment";
import { BiCopy } from "react-icons/bi";
import Axios from "axios";
// import ApiConfig from "src/config/APICongig";
// import DataNotFoundIMG from "src/component/DataNotFoundIMG";
import { AuthContext } from "../../../../src/context/Auth";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { Pagination } from "@material-ui/lab";
// import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import { toast } from "react-toastify";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { BsDownload } from "react-icons/bs";
import * as XLSX from "xlsx";

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
function Index() {
  const classes = useStyles();
  const [historyData, setHistoryData] = useState([]);

  const auth = useContext(AuthContext);

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

  const AllTransactionHistory = async () => {
    setIsLoading(true);
    let txnType;
    let coinName;
    if (currentvalue != "all") {
      txnType = currentvalue;
    }
    if (coin != "all") {
      coinName = coin;
    }
    setHistoryData("");
    try {
      const res = await Axios({
        method: "POST",
        url: ApiConfig.transactionHistoyList,
        headers: {
          token: window.localStorage.getItem("token"),
        },
        data: {
          page: page - 1,
          // fromDate: fromData ? `${moment(fromData).unix()}000` : null,
          // toDate: toData ? `${moment(toData).unix()}000` : null,
          limit: 10,
          coinName: coinName,
          transactionType: txnType,
        },
      });
      if (res.data.responseCode === 200) {
        setHistoryData(res.data.result.docs);
        setPagesCount(res?.data.result.pages);

        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

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
  useEffect(() => {
    // if (page && userdata?.userId) {
    // allHistoryHandler([]);

    AllTransactionHistory();
    // }
  }, [page, currentvalue, fromData, toData, coin, clear]);
  useEffect(() => {
    AllTransactionHistory();
  }, []);

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

  return (
    <>
      <Box className={classes.headbox} style={{ marginTop: "95px" }}>
        <Box className={classes.Layout} style={{ marginTop: "20px" }} mb={3}>
          <Grid
            container
            spacing={2}
            style={{
              alignItems: "center",
              borderLeft: "5px solid  #56CA00",
              margin: "0px 0px 0px 2px",
            }}
          >
            <Grid item lg={12}>
              <Typography variant="h1" style={{ fontWeight: 600 }}>
                Login History
              </Typography>
            </Grid>
          </Grid>
        </Box>

        <Box mt={2} width="100%">
          {isLoading ? (
            <ButtonCircularProgress />
          ) : (
            <>
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

                        <TableCell align="right" className={classes.headCell}>
                          Email
                        </TableCell>
                        <TableCell align="right" className={classes.headCell}>
                          Date & Time
                        </TableCell>

                        <TableCell align="right" className={classes.headCell}>
                          IP Addresses
                        </TableCell>
                        <TableCell align="right" className={classes.headCell}>
                          Browser Agent
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody style={{ background: "#ffffff" }}>
                      {historyData &&
                        historyData.map((values, index) => {
                          return (
                            <TableRow className={classes.tables}>
                              <TableCell align="right">
                                {" "}
                                {(page - 1) * 8 + index + 1}
                              </TableCell>

                              <TableCell align="right">
                                {values.coinName === "VD" ? (
                                  "VDT"
                                ) : (
                                  <>
                                    {values.coinName ? values.coinName : "N/A"}
                                  </>
                                )}
                              </TableCell>
                              <TableCell align="right">
                                {values?.quantity ? values?.quantity : ""}
                                {!values?.transactionType && (
                                  <>
                                    {values?.transStatusType && (
                                      <span style={{ color: "" }}>
                                        {" "}
                                        {values?.amount}
                                      </span>
                                    )}
                                  </>
                                )}
                              </TableCell>

                              <TableCell align="right">
                                {values.fromAddress ? (
                                  <>
                                    {sortAddress(values.fromAddress)}
                                    <CopyToClipboard text={values?.fromAddress}>
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
                              <TableCell align="right">
                                {values.toAddress ? (
                                  <>
                                    {sortAddress(values.toAddress)}
                                    <CopyToClipboard text={values?.toAddress}>
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

export default Index;
