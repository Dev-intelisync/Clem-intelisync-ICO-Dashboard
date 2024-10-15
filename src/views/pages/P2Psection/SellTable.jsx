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
  Slide,
  InputLabel,
  InputAdornment,
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
  Dialog,
  DialogContent,
  DialogActions,
} from "@material-ui/core";
import { sortAddress } from "@utils";
import moment from "moment";
import { BiCopy } from "react-icons/bi";
import Axios from "axios";
import ApiConfig from "../../../config/APIConfig";
import { AuthContext } from "@context/Auth";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { Pagination } from "@material-ui/lab";
// import NoDataFound from "src/DataNotFound";
import ButtonCircularProgress from "@component/ButtonCircularProgress";
import { toast } from "react-toastify";
import VisibilityIcon from "@material-ui/icons/Visibility";
import DeleteIcon from "@material-ui/icons/Delete";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { BsArrowUpRight, BsArrowDownRight } from "react-icons/bs";
import { BsDownload } from "react-icons/bs";
import * as XLSX from "xlsx";
import { Delete, Edit } from "@material-ui/icons";
import { BiBlock } from "react-icons/bi";
import BlockIcon from "@material-ui/icons/Block";
import { AiOutlineDelete } from "react-icons/ai";
import { useHistory } from "react-router-dom";
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

  TextBox: {
    borderRadius: "10px",
    // background: theme.palette.background.taf,
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
      // color: theme.palette.text.primary,
      color: "#fff",
    },
  },
  MainBoxstyle: {
    background:
      "linear-gradient(180deg, rgba(0, 172, 235, 0.1) 0%, rgba(0, 176, 237, 0.1) 10.18%, rgba(16, 105, 194, 0.1) 70.35%, rgba(16, 105, 194, 0.1) 100%)",
    borderRadius: "10px",
    border: "1px solid #6ECFF3",
    padding: "20px",
  },
  IconButtonBox: {
    fontSize: "14px",
    color: theme.palette.text.primary,
  },
  mainFiled: {
    "& h5": {
      fontSize: "13px",
    },
  },
  download: {
    fontSize: "17px",
    cursor: "pointer",
    "&:hover": {
      color: "red",
    },
  },
  TextBoxFiled: {
    "& h6": {
      fontFamily: "'Inter'",
      fontStyle: "normal",
      fontWeight: "400",
      fontSize: "14px",
      lineHeight: "22px",
    },
  },
  forminput: {
    "& div": {
      color: theme.palette.text.primary,
      // color: "#1D2D3F",
    },
  },

  table: {
    minWidth: 1100,
  },
  bin: {
    padding: "9px 8px",
    border: "1px solid #6ECFF3 !important",
  },
  spantext: {
    color: theme.palette.text.primary,
  },
  Subtilebox: {
    "& h6": {
      fontFamily: "'Inter'",
      fontStyle: "normal",
      fontWeight: "500",
      fontSize: "14px",
      lineHeight: "24px",
    },
  },
  IconButtonBox1: {
    color: theme.palette.text.primary,
  },
}));

function TransactionMain() {
  const classes = useStyles();
  const history = useHistory();
  const [historyData, setHistoryData] = useState([]);
  const [block, setBlock] = useState(false);
  const [coin, setcoin] = useState("all");
  const auth = useContext(AuthContext);
  const [currentvalue, setCurrentValue] = useState("all");

  const handleClose2 = () => {
    setBlock(false);
  };
  const handleClickOpen2 = () => {
    setBlock(true);
  };

  const DataList = [
    {
      txnId: "Arun Kumar",
      advertise: "O INR",
      trade: "Available 0 INR",
      payment: "Limit 500 - 100000 INR",
      type: "Deposit",
      fiat: "INR",
      total: "0.25451",
      coin: "BTC",
      Equation: "06615.35",
      partner: "BNB Coin",
      status: "Cancel",

      date: "22-07-2022 04:20 AM",
    },
    {
      txnId: "Arun Kumar",
      advertise: "O INR",
      trade: "Available 0 INR",
      payment: "Limit 500 - 100000 INR",
      type: "Deposit",
      fiat: "INR",
      total: "0.25451",
      coin: "BTC",
      Equation: "06615.35",
      partner: "BNB Coin",
      status: "Cancel",

      date: "22-07-2022 04:20 AM",
    },
    {
      txnId: "Arun Kumar",
      advertise: "O INR",
      trade: "Available 0 INR",
      payment: "Limit 500 - 100000 INR",
      type: "Deposit",
      fiat: "INR",
      total: "0.25451",
      coin: "BTC",
      Equation: "06615.35",
      partner: "BNB Coin",
      status: "Cancel",

      date: "22-07-2022 04:20 AM",
    },
    {
      txnId: "Arun Kumar",
      advertise: "O INR",
      trade: "Available 0 INR",
      payment: "Limit 500 - 100000 INR",
      type: "Deposit",
      fiat: "INR",
      total: "0.25451",
      coin: "BTC",
      Equation: "06615.35",
      partner: "BNB Coin",
      status: "Cancel",

      date: "22-07-2022 04:20 AM",
    },
    {
      txnId: "Arun Kumar",
      advertise: "O INR",
      trade: "Available 0 INR",
      payment: "Limit 500 - 100000 INR",
      type: "Deposit",
      fiat: "INR",
      total: "0.25451",
      coin: "BTC",
      Equation: "06615.35",
      partner: "BNB Coin",
      status: "Cancel",

      date: "22-07-2022 04:20 AM",
    },
    {
      txnId: "Arun Kumar",
      advertise: "O INR",
      trade: "Available 0 INR",
      payment: "Limit 500 - 100000 INR",
      type: "Deposit",
      fiat: "INR",
      total: "0.25451",
      coin: "BTC",
      Equation: "06615.35",
      partner: "BNB Coin",
      status: "Cancel",

      date: "22-07-2022 04:20 AM",
    },
  ];

  return (
    <>
      <Box className={classes.headbox} pr={1}>
        <Box mt={2} width="100%">
          <>
            <TableContainer className="TableContainerBox">
              <Table aria-label="simple table" className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell
                      align="right"
                      style={{ width: "130px" }}
                      className={classes.datatitle}
                    >
                      Advertisers
                    </TableCell>
                    <TableCell align="left">Crypto Amount </TableCell>
                    <TableCell align="left">Limit/Available</TableCell>
                    <TableCell align="right">Payment</TableCell>

                    <TableCell align="center"> Coin </TableCell>

                    <TableCell align="center">Trade </TableCell>
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
                          <TableCell align="left">{value.advertise}</TableCell>{" "}
                          <TableCell align="left">{value.trade}</TableCell>
                          <TableCell align="left">
                            <Box mt={-5}>
                              <Button
                                // variant="contained"
                                fullWidth
                                // color="secondary"
                                style={{
                                  color: "#000",
                                  background: "#F3F2F9",

                                  borderRadius: "8px",
                                  padding: "8px 20px ",
                                  marginTop: "35px",
                                  width: "100px",
                                }}
                              >
                                UPI
                              </Button>
                            </Box>
                          </TableCell>
                          <TableCell align="center">{value.coin}</TableCell>{" "}
                          <TableCell align="center">
                            <Box mt={-5}>
                              <Button
                                // variant="contained"
                                fullWidth
                                onClick={() => {
                                  handleClickOpen2();
                                }}
                                // color="secondary"
                                style={{
                                  color: "#fff",

                                  backgroundColor: "red",
                                  borderRadius: "8px",
                                  padding: "8px 20px ",
                                  marginTop: "35px",
                                  width: "100px",
                                }}
                              >
                                SELL
                              </Button>
                            </Box>
                          </TableCell>{" "}
                        </TableRow>
                      </>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>{" "}
          </>
        </Box>
      </Box>

      <Dialog
        fullWidth="lg"
        maxWidth="lg"
        open={block}
        keepMounted
        onClose={handleClose2}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent>
          <Grid container spacing={2}>
            <Grid
              item
              lg={7}
              md={6}
              sm={12}
              xs={12}
              style={{ borderRight: "1px solid #848484" }}
            >
              <Box mt={2} mb={2}>
                <Typography>Arun Kumar</Typography>
              </Box>

              <Box style={{ display: "flex", justifyContent: "space-between" }}>
                <Box>
                  <Typography>
                    Price <span style={{ color: "#D83636" }}>500.24 INR</span>
                  </Typography>
                  <br />
                  <Typography>
                    Payment time limit{" "}
                    <span className={classes.spantext}>15 Minutes</span>
                  </Typography>
                </Box>
                <Box>
                  <Typography>
                    Available{" "}
                    <span className={classes.spantext}>9,055.00 USDT</span>
                  </Typography>
                  <br />
                  <Typography>
                    Seller’s payment method{" "}
                    <span style={{ color: "#D83636" }}>IMPS</span>
                  </Typography>
                </Box>
              </Box>
              <Box mt={4}>
                <Box mt={2}>
                  <Typography style={{ fontSize: "18px" }} variant="h6">
                    Terms & Conditions
                  </Typography>
                </Box>
                <Box className={classes.Subtilebox}>
                  <Typography variant="h6">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
                    consequat mattis non amet, sed tincidunt facilisis. Magna
                    mattis purus sem pharetra quis enim morbi accumsan. Sem
                    consequat scelerisque hendrerit posuere vivamus posuere
                    turpis phasellus. Amet pulvinar
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid
              item
              lg={5}
              md={6}
              sm={12}
              xs={12}
              className={classes.TextBoxFiled}
            >
              <Box mt={3} pl={2}>
                <Box>
                  <Box mt={3}>
                    <Typography variant="h6">I want to sell</Typography>
                    <Box>
                      <TextField
                        variant="outlined"
                        placeholder="Enter the Amount"
                        className="textFeilds"
                        InputProps={{
                          className: classes.TextBox,
                          endAdornment: (
                            <InputAdornment position="end">
                              <Box
                                className={classes.IconButtonBox}
                                style={{
                                  paddingRight: "4px",
                                }}
                              >
                                <span style={{ color: "#D87036" }}>All</span>{" "}
                                &nbsp;BNB
                              </Box>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Box>
                  </Box>
                  <Box align="right" className={classes.mainFiled}>
                    <Typography variant="h5">
                      Balance : 0.07106831 BNB{" "}
                      <span style={{ color: "#D87036", fontWeight: "400" }}>
                        {" "}
                        &nbsp;transfer
                      </span>
                    </Typography>
                  </Box>
                  <Typography variant="h6">I will receive</Typography>
                  <TextField
                    variant="outlined"
                    placeholder="Enter the Amount"
                    className="textFeilds"
                    InputProps={{
                      className: classes.TextBox,
                      endAdornment: (
                        <InputAdornment position="end">
                          <Box
                            className={classes.IconButtonBox1}
                            style={{ fontSize: "16px", paddingRight: "4px" }}
                          >
                            INR
                          </Box>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>
              </Box>
              <Box mt={2} pl={2}>
                <Typography variant="h6">Payment Method</Typography>
                <Box>
                  <FormControl
                    variant="outlined"
                    fullWidth
                    className={classes.forminput}
                  >
                    {/* <InputLabel margin="dense">All</InputLabel> */}
                    <Select
                      margin="dense"
                      style={{ padding: "5px", color: "#fff" }}
                      // label="All "
                      name="token"
                      className={classes.forminput}
                      onChange={(e) => setcoin(e.target.value)}
                      value={coin}
                    >
                      <MenuItem value="all" style={{ fontSize: "12px" }}>
                        All
                      </MenuItem>
                      <MenuItem value="btc" style={{ fontSize: "12px" }}>
                        BTC
                      </MenuItem>
                      <MenuItem value="eth" style={{ fontSize: "12px" }}>
                        ETH
                      </MenuItem>
                      {/* <MenuItem value={"avt"} style={{ fontSize: "12px" }}>
                    Toga
                  </MenuItem> */}

                      <MenuItem value={"bnb"} style={{ fontSize: "12px" }}>
                        BNB
                      </MenuItem>
                      <MenuItem value={"usdterc"} style={{ fontSize: "12px" }}>
                        USDTERC
                      </MenuItem>
                      <MenuItem value={"usdttrx"} style={{ fontSize: "12px" }}>
                        USDTTRX
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                <Box
                  align="center"
                  mt={2}
                  mb={2}
                  className={classes.otherButton}
                >
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={handleClose2}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="SellButton"
                    onClick={() => history.push("/sell")}
                  >
                    Sell BNB
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        {/* <DialogActions
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          <Button
            // variant="contained"
            className={classes.CloseButton}
            onClick={handleClose2}
            color="primary"
          >
            No
          </Button>
          <Button
            className={classes.CloseButton}
            onClick={handleClose2}
            color="primary"
          >
            Yes
          </Button>
        </DialogActions> */}
      </Dialog>
    </>
  );
}

export default TransactionMain;
