import React, { useState, useContext, useEffect } from "react";
import {
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
import { sortAddress } from "../utils";
import moment from "moment";
import { BiCopy } from "react-icons/bi";
import Axios from "axios";
import ApiConfig from "../config/APIConfig";
import DataNotFoundIMG from "../component/DataNotFoundIMG";
import { AuthContext } from "../context/Auth";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { Pagination } from "@material-ui/lab";
import ButtonCircularProgress from "../component/ButtonCircularProgress";
import { toast } from "react-toastify";

import * as XLSX from "xlsx";

const useStyles = makeStyles((theme) => ({
  headbox: {
    borderRadius: "20px",

    [theme.breakpoints.down("sm")]: {
      padding: "20px 7px 53px 7px",
      borderRadius: "16px",
    },
    "& h4": {
      fontSize: "24px",
      fontWeight: "600",
      color: theme.palette.text.primary,
    },
  },
  popupBox: {
    "& span": {
      // color: "Red",
    },
    "& h5": {
      fontFamily: "Inter",
      fontStyle: "normal",
      fontWeight: "600",
      fontSize: "24px",
      lineHeight: "29px",
    },
    "& h4": {
      fontFamily: "Inter",
      fontStyle: "normal",
      fontWeight: "600",
      fontSize: "18px",
      lineHeight: "22px",
    },
    "& h6": {
      fontFamily: "Inter",
      fontStyle: "normal",
      fontWeight: "600",
      fontSize: "12px",
      lineHeight: "15px",
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
      color: "#FFFFFF !important",
      border: "1.16355px solid #FFFFFF",
      borderRadius: "3.49065px !important",
    },
    "& .MuiSelect-icon": {
      color: "#FFFFFF !important",
    },
    "& .MuiFormControl-marginDense": {
      color: "#FFFFFF !important",
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
      color: "#FFFFFF !important",
    },
  },
  download: {
    fontSize: "17px",
    cursor: "pointer",
    "&:hover": {
      color: "red",
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
      marginTop: "-15px",
    },
  },
  FromTable1: {
    [theme.breakpoints.only("md")]: {
      marginTop: "0px",
    },
    [theme.breakpoints.only("xs")]: {
      marginTop: "-15px",
    },
  },

  filterBox: {
    marginTop: "20px",
    padding: "15px 15px 15px",
  },

  alignBtn: {
    marginTop: "40px",
    "@media(max-width:1280px)": {
      marginTop: "20px",
    },
    "@media(max-width:960px)": {
      marginTop: "60px",
    },
    "@media(max-width:600px)": {
      marginTop: "0px",
    },
  },

  TextBox: {
    borderRadius: "10px",
  },
  table: {
    minWidth: 1100,
  },
  Emergency: {
    padding: "6px 13px !important",
    fontSize: "13px",
    "&:hover": {
      border: "1px solid #1069C2",
    },
  },
  unstake: {
    padding: "6px 13px !important",
    fontSize: "13px",
  },
  fileicon: {
    marginTop: "15px",
    marginBottom: "40px",

    width: "90px",
  },

  textfileBOx: {
    padding: "0px",
  },
  uploadicon1: {
    cursor: "pointer",
    padding: "6px",

    border: "1px solid #107be5",
    position: "relative",
    background: theme.palette.background.taf,
    boxSizing: "border-box",
    borderRadius: "10px",
    textAlign: "center",
  },
  inputF: {
    top: "0",
    left: "0",
    width: "100%",
    cursor: "pointer",
    height: "100%",
    opacity: "0",
    position: "absolute",
  },
  ResetClasses: {
    border: "none",
    background: "#56CA00",
    borderRadius: "10px",
    fontFamily: "Inter",
    fontStyle: "normal",
    fontWeight: "700 !important",
    fontSize: "14px",
    lineHeight: "21px",

    /* identical to box height */

    color: "#FFFFFF",
    [theme.breakpoints.down("md")]: {
      marginTop: "20px",
    },
    [theme.breakpoints.only("xs")]: {
      marginTop: "0px",
    },
  },
  imgsection: {
    height: "70px",
    width: "110px",
    borderRadius: "14px",
  },
  headCell: {
    background: "transparent",
    color: "#6A36FF",
    fontFamily: "Inter",
  },
  label: {
    fontFamily: "Inter",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "16.9024px",
    lineHeight: "20px",
    /* identical to box height */

    color: "#FFFFFF",
  },
}));

function PayandCryptoTable() {
  const classes = useStyles();
  const [historyData, setHistoryData] = useState([]);
  const auth = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const view = auth?.view;
  const [pagesCount, setPagesCount] = useState(1);
  const [page, setPage] = useState(1);

  const dataCOinList = [
    {
      coin: "USDT",
      amount: "0.0002",
      transaction: "XXXX2555555412",
      date: "Nov 17, 2022 1:54 PM	",
      status: "Pending",
    },
  ];

  const PayandCryptoTableHander = async () => {
    setIsLoading(true);
    try {
      const res = await Axios({
        method: "GET",
        url: ApiConfig.SettlementStatusListTable,
        headers: {
          token: window.localStorage.getItem("token"),
        },
        data: {
          page: page,
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

  useEffect(() => {
    PayandCryptoTableHander();
  }, []);

  return (
    <>
      <Box className={classes.headbox}>
        <Box style={{ marginTop: "20px" }} mb={3}>
          <Grid container spacing={2} style={{ alignItems: "center" }}>
            <Grid item lg={12}>
              {/* <Typography variant="h4"> History</Typography> */}
            </Grid>
          </Grid>

          <Box className={classes.filterBox}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6} lg={4} sm={6}>
                <Box>
                  <label> Status</label>
                  <FormControl
                    variant="outlined"
                    fullWidth
                    className={classes.forminput}
                  >
                    <Select
                      margin="dense"
                      name="token"
                      className={classes.forminput}
                      onChange={(e) => auth.setCoinName(e.target.value)}
                      value={auth.coinName}
                    >
                      <MenuItem value="all" style={{ fontSize: "12px" }}>
                        All
                      </MenuItem>
                      <MenuItem value="APPROVE" style={{ fontSize: "12px" }}>
                        Success
                      </MenuItem>
                      <MenuItem value="INPROGRESS" style={{ fontSize: "12px" }}>
                        Pending
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Grid>

              <Grid item xs={12} md={6} lg={4} sm={6}>
                <Box className={classes.FromTable1}>
                  <label className={classes.label}>From</label>
                  <div className={classes.forminputDate}>
                    <KeyboardDatePicker
                      className={`${classes.date} textFeilds`}
                      InputProps={{
                        className: classes.TextBox,
                      }}
                      placeholder="DD/MM/YYYY"
                      format="DD/MM/YYYY"
                      inputVariant="outlined"
                      disableFuture
                      margin="dense"
                      name="dateOfBirth"
                      value={auth.fromData}
                      onChange={(date) => auth.setFromData(date)}
                    />
                  </div>
                </Box>
              </Grid>

              <Grid item xs={12} md={6} lg={4} sm={6}>
                <Box className={classes.FromTable}>
                  <label className={classes.label}>To</label>
                  <div className={classes.forminputDate}>
                    <KeyboardDatePicker
                      className={`${classes.date} textFeilds`}
                      InputProps={{
                        className: classes.TextBox,
                      }}
                      placeholder="DD/MM/YYYY"
                      format="DD/MM/YYYY"
                      inputVariant="outlined"
                      disableFuture
                      margin="dense"
                      name="dateOfBirth"
                      value={auth.toData}
                      onChange={(date) => auth.setToData(date)}
                    />
                  </div>
                </Box>
              </Grid>

              <Grid item xs={12} md={6} lg={4} sm={6}>
                <Box>
                  <Button
                    fullWidth
                    className={classes.ResetClasses}
                    onClick={auth.handlereset}
                  >
                    Reset
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>

        <Box mt={2} width="100%">
          {isLoading ? (
            <ButtonCircularProgress />
          ) : (
            <>
              <TableContainer className="TableContainerBox">
                <Table aria-label="simple table" className={classes.table}>
                  <TableHead
                    style={{
                      minWidth: "900px",
                      background:
                        "linear-gradient(180deg, #FFFFFF 0%, #F4F4F4 100%)",
                      borderBottom: "1.02122pxsolid #000000",
                    }}
                  >
                    <TableRow>
                      <TableCell align="right" className={classes.headCell}>
                        Sr.No
                      </TableCell>
                      <TableCell align="right" className={classes.headCell}>
                        Coin
                      </TableCell>
                      <TableCell align="right" className={classes.headCell}>
                        {" "}
                        Amount
                      </TableCell>
                      <TableCell align="right" className={classes.headCell}>
                        Transaction ID{" "}
                      </TableCell>
                      <TableCell align="right" className={classes.headCell}>
                        {" "}
                        Date & Time{" "}
                      </TableCell>
                      <TableCell align="right" className={classes.headCell}>
                        Status
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {historyData &&
                      historyData?.map((value, index) => {
                        return (
                          <TableRow className={classes.tables}>
                            <TableCell align="right">
                              {(auth.page - 1) * 8 + index + 1}
                            </TableCell>
                            <TableCell align="right">{value.coin}</TableCell>

                            <TableCell align="right">{value.amount}</TableCell>
                            <TableCell align="right">
                              {value.transaction}
                            </TableCell>
                            <TableCell align="right">
                              {moment(value.date).format("lll")}{" "}
                            </TableCell>
                            <TableCell align="right">{value.status}</TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
              {historyData && historyData.length === 0 && <DataNotFoundIMG />}
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

export default PayandCryptoTable;
