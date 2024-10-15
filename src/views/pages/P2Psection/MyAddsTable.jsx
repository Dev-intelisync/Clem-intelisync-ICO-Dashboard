import React, { useState, useContext, useEffect } from "react";
import {
  Typography,
  Box,
  Grid,
  TableContainer,
  DialogActions,
  IconButton,
  Table,
  Select,
  DialogContent,
  TableRow,
  TableCell,
  MenuItem,
  TableBody,
  FormControl,
  TableHead,
  makeStyles,
  Dialog,
  Button,
} from "@material-ui/core";
import ButtonCircularProgress from "@component/ButtonCircularProgress";
import moment from "moment";
import Axios from "axios";
import ApiConfig from "../../../config/APIConfig";
import { AuthContext } from "@context/Auth";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { Pagination } from "@material-ui/lab";
import DeleteModal from "@component/DeleteModal";

import DeleteIcon from "@material-ui/icons/Delete";

import { BsDownload } from "react-icons/bs";
import * as XLSX from "xlsx";

import { useHistory } from "react-router-dom";
import DataNotFoundIMG from "@component/DataNotFoundIMG";
import { toast } from "react-toastify";
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

    [theme.breakpoints.down("sm")]: {
      borderRadius: "16px",
    },
  },

  forminput: {
    "& div": {
      color: theme.palette.text.primary,
      // color: "#1D2D3F",
    },
  },

  download: {
    fontSize: "17px",
    cursor: "pointer",
    "&:hover": {
      color: "red",
    },
  },

  table: {
    minWidth: 1140,
  },
  bin: {
    padding: "9px 8px",
    border: "1px solid #6ECFF3 !important",
  },

  filterBox: {
    background:
      "linear-gradient(180deg, rgba(0, 172, 235, 0.1) 0%, rgba(0, 176, 237, 0.1) 10.18%, rgba(16, 105, 194, 0.1) 70.35%, rgba(16, 105, 194, 0.1) 100%)",
    borderRadius: "10px",
    border: "1px solid #6ECFF3",
    marginTop: "20px",
    padding: "15px 15px 15px",
  },
}));

function MyAdds(data) {
  const classes = useStyles();
  const [historyData, setHistoryData] = useState([]);
  const auth = useContext(AuthContext);
  const userdata = auth?.userData ? auth?.userData : "";
  const [toData, setToData] = useState();
  const [coinName, setCoinName] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pagesCount, setPagesCount] = useState(1);
  const [fromData, setFromData] = useState();
  const [dataList, setDataList] = useState([]);
  const [currentvalue, setCurrentValue] = useState("All");
  const [tokenData, setToken] = useState("all");
  const [isLoader, setIsLoader] = useState(false);
  const [loading, setloading] = useState(false);
  const [peerToPeerExchangeId, setidd1] = useState([]);
  const [open, setOpen] = useState(false);
  const [block, setBlock] = useState(false);
  const history = useHistory();
  const [tableData, setTableData] = useState(0);

  const OpenModal = (id) => {
    setidd1(id);
    setOpen(true);
  };
  const handleClose2 = () => {
    setBlock(false);
  };
  const handleClickOpen2 = () => {
    setBlock(true);
  };
  const downloadExcel = () => {
    const workSheet = XLSX.utils.json_to_sheet(dataList);
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, "dataList");
    let buf = XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
    XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
    XLSX.writeFile(workBook, "Advertise_History.xlsx");
  };

  const AdvertisementTableHander = async () => {
    let Alltrade;
    if (currentvalue != "All") {
      Alltrade = currentvalue;
    }

    let AllToken;
    if (tokenData != "all") {
      AllToken = tokenData;
    }

    try {
      const res = await Axios({
        method: "GET",
        url: ApiConfig.p2pAdvertisementList,

        headers: {
          token: window.localStorage.getItem("token"),
        },
        params: {
          listType: "self",
          tradeType: Alltrade,
          fromDate: fromData ? `${moment(fromData).unix()}000` : null,
          toDate: toData ? `${moment(toData).unix()}000` : null,
          search: AllToken,
          limit: 12,
          page: page - 1,
        },
      });
      if (res.data.responseCode === 200) {
        // setIsLoader(false);
        setDataList(res?.data?.result.docs);
        setPagesCount(res?.data?.result?.total);
        setIsLoader(false);
      } else {
        setIsLoader(false);
      }
    } catch (err) {
      console.log("err", err);
    }
  };

  const handleResetHandler = () => {
    setToken("all");
    setFromData();
    setToData();
    setCurrentValue("All");
  };

  useEffect(() => {
    // if (userdata?.userId) {
    AdvertisementTableHander();
    // setPage(1);
    // }
  }, [currentvalue, fromData, toData, tokenData, page, userdata?.userId]);

  const DeleteAdvertisement = async () => {
    try {
      const res = await Axios({
        method: "DELETE",
        url: ApiConfig.DeleteAdvertisement,
        headers: {
          token: window.localStorage.getItem("token"),
        },
        params: {
          _id: peerToPeerExchangeId._id,
        },
      });

      if (res.data.responseCode === 200) {
        toast.success(res.data.responseMessage);
        AdvertisementTableHander();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const ListTableSearchFilter = async () => {
    setIsLoading(true);
    let cryptoCoin;
    let coinName;
    if (currentvalue != "All") {
      cryptoCoin = currentvalue;
    }

    try {
      const res = await Axios.get(ApiConfig.searchAdvertiseFilter, {
        headers: {
          token: window.localStorage.getItem("token"),
        },
        params: {
          userId2: auth.userData.userId,
          page: page - 1,
          pageSize: 10,
          fromDate: fromData ? `${moment(fromData).unix()}000` : null,
          toDate: toData ? `${moment(toData).unix()}000` : null,
          cryptoCoin: coinName,
          orderType: cryptoCoin,
        },
      });

      if (res.data.status === 200) {
        setTableData(res.data.data.list);
        // toast.success(res.data.message);
        setPagesCount(res.data.data.totalCount / 10);
      } else if (res.data.status === 201) {
        setTableData([]);
      }
    } catch (err) {
      console.log("err", err);
    }
  };

  // useEffect(() => {
  //   if (userdata?.userId) {
  //     ListTableSearchFilter();
  //     setPage(1);
  //   }
  // }, [page, currentvalue, fromData, toData, userdata?.userId]);

  return (
    <>
      <Box className={classes.headbox}>
        <Box className={classes.filterBox}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={3} sm={6}>
              <Box>
                <label>Asset Type</label>
                <FormControl
                  variant="outlined"
                  fullWidth
                  className={classes.forminput}
                >
                  <Select
                    margin="dense"
                    // label="All "
                    name="token"
                    className={classes.forminput}
                    onChange={(e) => setToken(e.target.value)}
                    value={tokenData}
                  >
                    <MenuItem value="all" style={{ fontSize: "12px" }}>
                      All
                    </MenuItem>
                    <MenuItem value="BTC" style={{ fontSize: "12px" }}>
                      BTC
                    </MenuItem>
                    <MenuItem value="BUSD" style={{ fontSize: "12px" }}>
                      BUSD
                    </MenuItem>
                    <MenuItem value="ETH" style={{ fontSize: "12px" }}>
                      ETH
                    </MenuItem>

                    <MenuItem value="BNB" style={{ fontSize: "12px" }}>
                      BNB
                    </MenuItem>
                    <MenuItem value="USDT" style={{ fontSize: "12px" }}>
                      USDT
                    </MenuItem>
                    <MenuItem value="USDC" style={{ fontSize: "12px" }}>
                      USDC
                    </MenuItem>
                    <MenuItem value="AVAX" style={{ fontSize: "12px" }}>
                      AVAX
                    </MenuItem>
                    <MenuItem value="MATIC" style={{ fontSize: "12px" }}>
                      MATIC
                    </MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Grid>
            <Grid item xs={12} md={6} lg={3} sm={6}>
              <Box className={classes.FromTable1}>
                <label>Type</label>
                <FormControl
                  variant="outlined"
                  fullWidth
                  className={classes.forminput}
                >
                  <Select
                    margin="dense"
                    style={{}}
                    // label="All "
                    name="token"
                    className={`${classes.date} textFeilds`}
                    InputProps={{
                      className: classes.TextBox,
                    }}
                    onChange={(e) => setCurrentValue(e.target.value)}
                    value={currentvalue}
                  >
                    <MenuItem value="All" style={{ fontSize: "12px" }}>
                      All
                    </MenuItem>
                    <MenuItem value="BUY" style={{ fontSize: "12px" }}>
                      Buy
                    </MenuItem>
                    <MenuItem value="SELL" style={{ fontSize: "12px" }}>
                      Sell
                    </MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Grid>

            <Grid item xs={12} md={6} lg={3} sm={6}>
              <Box className={classes.FromTable}>
                <label>From</label>

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
                  value={fromData}
                  onChange={(date) => setFromData(date)}
                />
              </Box>
            </Grid>

            <Grid item xs={12} md={6} lg={3} sm={6}>
              <Box className={classes.FromTable}>
                <label>To</label>
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
                  value={toData}
                  onChange={(date) => setToData(date)}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={6} lg={3} sm={6}>
              <Box>
                <Button
                  onClick={() => handleResetHandler()}
                  variant="contained"
                  fullWidth
                  color="secondary"
                  style={{ borderRadius: "10px", height: "40px" }}
                >
                  Reset
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6} lg={3} sm={6}>
              <Box>
                <Button
                  variant="contained"
                  fullWidth
                  color="secondary"
                  onClick={downloadExcel}
                  style={{ borderRadius: "10px", height: "40px" }}
                >
                  Download Xlsx&nbsp;&nbsp;
                  <BsDownload className={classes.download} />
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>

        <Box pr={1}>
          <Box mt={2} width="100%">
            {isLoading ? (
              <ButtonCircularProgress />
            ) : (
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
                        <TableCell align="left">
                          Asset / Currency / Type{" "}
                        </TableCell>

                        <TableCell align="left">
                          Trade QTY.(Completed/Total)
                        </TableCell>
                        <TableCell align="left">
                          Price/Exchange Rate/Limit
                        </TableCell>

                        <TableCell align="left">Payment Method </TableCell>
                        <TableCell align="left">Status </TableCell>

                        {/* <TableCell align="left" style={{ paddingLeft: "40px" }}>
                        Action{" "}
                      </TableCell> */}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {dataList &&
                        dataList.map((value, index) => {
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
                                  {(page - 1) * 8 + index + 1}
                                </TableCell>
                                <TableCell align="left">
                                  {/* {value.exchangeStatusType} */}
                                  {value.asset === "VD" ? (
                                    "VDT"
                                  ) : (
                                    <>{value.asset ? value.asset : "N/A"}</>
                                  )}{" "}
                                  / {value.currency} / {value.tradeType}
                                </TableCell>{" "}
                                <TableCell align="left">
                                  {value.quantity ? value?.quantity : "N/A"}
                                </TableCell>
                                <TableCell align="left">
                                  {" "}
                                  {value.price} ({value.margin}%){" "}
                                  {`${value.minOrderLimit} ~ ${value.maxOrderLimit} `}
                                </TableCell>{" "}
                                <TableCell align="left">
                                  {value.bankId?.bankName
                                    ? value.bankId?.bankName
                                    : value?.bankId?.upiId}
                                </TableCell>
                                <TableCell align="left">
                                  {value.status ? value?.status : "N/A"}
                                </TableCell>{" "}
                                {/* <TableCell align="center">
                                <Box>
                                  <IconButton style={{ padding: "6px 12px" }}>
                                    <EditIcon
                                      style={{
                                        fontSize: "20px",
                                        cursor: "pointer",
                                        marginRight: "2px",
                                      }}
                                      onClick={() => {
                                        history.push({
                                          pathname: "/editAdds",
                                          search:
                                            value.peerToPeerExchangeId.toString(),
                                          // hash: value.peerToPeerExchangeId.toString(),
                                        });
                                      }}
                                    />
                                  </IconButton>
                                  <IconButton
                                    style={{ padding: "6px 12px" }}
                                    onClick={() => {
                                      handleClickOpen2();
                                    }}
                                  >
                                    <BlockIcon
                                      style={{
                                        fontSize: "18px",
                                        cursor: "pointer",
                                        marginRight: "2px",
                                      }}
                                    />
                                  </IconButton>
                                  {value.orderStatus == "DISABLED" ? (
                                    <IconButton
                                      style={{ padding: "6px 12px" }}
                                      // onClick={() => {
                                      //   OpenModal(value);
                                      // }}
                                    >
                                      <DeleteIcon
                                        style={{
                                          fontSize: "18px",
                                          // cursor: "pointer",
                                          marginRight: "5px",
                                          backGround: "red",
                                        }}
                                      />
                                    </IconButton>
                                  ) : (
                                    <IconButton
                                      style={{ padding: "6px 12px" }}
                                      onClick={() => {
                                        OpenModal(value);
                                      }}
                                    >
                                      <DeleteIcon
                                        style={{
                                          fontSize: "18px",
                                          cursor: "pointer",
                                          marginRight: "5px",
                                          // color: "red",
                                        }}
                                      />
                                    </IconButton>
                                  )}
                                </Box>
                              </TableCell> */}
                              </TableRow>
                            </>
                          );
                        })}
                    </TableBody>
                  </Table>
                </TableContainer>{" "}
                {pagesCount > 5 && (
                  <Box mb={2} mt={2} style={{ width: "100%" }}>
                    <Pagination
                      count={pagesCount}
                      page={page}
                      onChange={(e, value) => setPage(value)}
                    />
                  </Box>
                )}
                {(dataList &&
                  dataList.length === 0 &&
                  dataList.length === undefined) ||
                  dataList.length === null ||
                  (dataList.length === 0 && <DataNotFoundIMG />)}
              </>
            )}
          </Box>
        </Box>

        {open && (
          <DeleteModal
            open={open}
            setOpen={(data) => setOpen(data)}
            idd1={peerToPeerExchangeId}
            DeleteAdvertisement={DeleteAdvertisement}
            loading={loading}
          />
        )}
        <Dialog
          fullWidth="xs"
          maxWidth="xs"
          open={block}
          keepMounted
          onClose={handleClose2}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogContent>
            <Typography align="center" variant="h5">
              Are you sure want to Disabled this user ?
            </Typography>
            <Box mt={2}></Box>
          </DialogContent>
          <DialogActions
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "20px",
            }}
          >
            <Button variant="outlined" color="primary" onClick={handleClose2}>
              No
            </Button>
            <Button variant="contained" color="primary" onClick={handleClose2}>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
}

export default MyAdds;
