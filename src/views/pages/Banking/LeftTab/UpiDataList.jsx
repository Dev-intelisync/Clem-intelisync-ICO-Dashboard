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
import { sortAddress } from "@utils";
import moment from "moment";
import { BiCopy } from "react-icons/bi";
import Axios from "axios";
// import ApiConfig from "../../../config/APIConfig";
import { AuthContext } from "@context/Auth";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { Pagination } from "@material-ui/lab";
// import NoDataFound from "..";
import ButtonCircularProgress from "@component/ButtonCircularProgress";
import { toast } from "react-toastify";
import VisibilityIcon from "@material-ui/icons/Visibility";
import DeleteIcon from "@material-ui/icons/Delete";
import { CopyToClipboard } from "react-copy-to-clipboard";
import DataNotFoundIMG from "@component/DataNotFoundIMG";
import { BsArrowUpRight, BsArrowDownRight } from "react-icons/bs";
import { BsDownload } from "react-icons/bs";
import * as XLSX from "xlsx";
import { Delete, Edit } from "@material-ui/icons";
import { BiBlock } from "react-icons/bi";
import BlockIcon from "@material-ui/icons/Block";
import { AiOutlineDelete } from "react-icons/ai";
import { useHistory, useLocation } from "react-router-dom";
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
    minWidth: 1000,
  },
  bin: {
    padding: "9px 8px",
    border: "1px solid #6ECFF3 !important",
  },
}));

function UpiDataList() {
  const classes = useStyles();
  const [historyData, setHistoryData] = useState([]);
  const history = useHistory();
  const auth = useContext(AuthContext);
  const userdata = auth?.userData ? auth?.userData : "";
  const [isLoading, setIsLoading] = useState(false);
  const [noOfPages, setnoOfPages] = useState(1);
  const [page, setPage] = useState(1);
  const [pagesCount, setPagesCount] = useState(1);
  const [value, setValue] = useState(0);
  const bankDataList = auth?.bankData;
  const location = useLocation();

  const UpiData = location.state.upiBankData;
  const downloadExcel = () => {
    const workSheet = XLSX.utils.json_to_sheet(UpiData);
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, "UpiData");
    let buf = XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
    XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
    XLSX.writeFile(workBook, "Upi_Data.xlsx");
  };

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
                E Wallet Details
              </Typography>
            </Box>
            {/* <Button
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
            </Button> */}
          </Box>
        </Box>
        <Box pr={1}>
          <Box mt={2} width="100%">
            <>
              {isLoading ? (
                <ButtonCircularProgress />
              ) : (
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
                        <TableCell align="left">Account Holder Name</TableCell>

                        <TableCell align="left">Wallet ID</TableCell>

                        <TableCell align="left">Date and Time </TableCell>
                        <TableCell align="left">Status</TableCell>
                        <TableCell align="left">Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {UpiData &&
                        UpiData.map((value, index) => {
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
                                  {value.holderName ? value.holderName : "N/A"}
                                </TableCell>{" "}
                                <TableCell align="left">
                                  {value.upiId ? value.upiId : "N/A"}
                                </TableCell>
                                <TableCell align="left">
                                  {value.createdAt ? (
                                    <>
                                      {moment(value?.createdAt).format("lll")}
                                    </>
                                  ) : (
                                    "N/A"
                                  )}
                                </TableCell>{" "}
                                <TableCell align="left">
                                  {value.approveStatus
                                    ? value.approveStatus
                                    : "N/A"}
                                </TableCell>{" "}
                                <TableCell align="left">
                                  <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() =>
                                      history.push({
                                        search: value?._id,
                                        pathname: "/banking",
                                      })
                                    }
                                  >
                                    Select UPI
                                  </Button>
                                </TableCell>
                              </TableRow>
                            </>
                          );
                        })}
                    </TableBody>
                  </Table>

                  {(UpiData &&
                    UpiData.length === 0 &&
                    UpiData.length === undefined) ||
                    UpiData.length === null ||
                    (UpiData.length === 0 && <DataNotFoundIMG />)}
                </TableContainer>
              )}
              {/* {UpiData && UpiData.length > 0 && (
                <Box mb={2} mt={2} style={{ width: "100%" }}>
                  <Pagination
                    count={Math.ceil(pagesCount)}
                    page={page}
                    onChange={(e, value) => setPage(value)}
                  />
                </Box>
              )} */}
            </>
            {/* )} */}
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default UpiDataList;
