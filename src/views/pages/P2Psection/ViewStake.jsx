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
  Dialog,
  Avatar,
  DialogContent,
  DialogActions,
  FormControl,
  TextField,
  TableHead,
  makeStyles,
} from "@material-ui/core";
import { sortAddress } from "@utils";
import moment from "moment";
import { BiCopy } from "react-icons/bi";
import Axios from "axios";
import ApiConfig from "../../../config/APIConfig";
import DataNotFoundIMG from "@component/DataNotFoundIMG";
import { AuthContext } from "@context/Auth";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { Pagination } from "@material-ui/lab";
// import NoDataFound from "src/DataNotFound";
import ButtonCircularProgress from "@component/ButtonCircularProgress";
import { toast } from "react-toastify";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { BsArrowUpRight, BsArrowDownRight } from "react-icons/bs";
import { BsDownload } from "react-icons/bs";
import { FcDocument } from "react-icons/fc";
import * as XLSX from "xlsx";
import { FaLaptopHouse } from "react-icons/fa";

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
      fontFamily: "'Inter'",
      fontStyle: "normal",
      fontWeight: "600",
      fontSize: "24px",
      lineHeight: "29px",
    },
    "& h4": {
      fontFamily: "'Inter'",
      fontStyle: "normal",
      fontWeight: "600",
      fontSize: "18px",
      lineHeight: "22px",
    },
    "& h6": {
      fontFamily: "'Inter'",
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
    // [theme.breakpoints.only("sm")]: {
    //   marginTop: "-16px",
    // },
    [theme.breakpoints.only("xs")]: {
      marginTop: "-15px",
    },
  },

  filterBox: {
    background:
      "linear-gradient(180deg, rgba(0, 172, 235, 0.1) 0%, rgba(0, 176, 237, 0.1) 10.18%, rgba(16, 105, 194, 0.1) 70.35%, rgba(16, 105, 194, 0.1) 100%)",
    borderRadius: "10px",
    border: "1px solid #6ECFF3",
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
  date: {
    // background: `${theme.palette.background.taf} !important`,
  },

  TextBox: {
    borderRadius: "10px",
    // background: theme.palette.background.taf,
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
}));
export const getBase64 = (file, cb) => {
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function () {
    cb(reader.result);
  };
  reader.onerror = function (err) {
    console.log("Error: ", err);
  };
};

function CryptoStake() {
  const classes = useStyles();
  const [historyData, setHistoryData] = useState([]);
  const auth = useContext(AuthContext);
  const [block, setBlock] = useState(false);
  const [block1, setBlock1] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const view = auth?.view;
  const [unstakeData, setUnstakeData] = useState();
  const [isChangePage, setisChangePage] = useState(false);
  const [idNumber, setIdNumber] = useState("");
  const [imageUrl, setImgeUrl] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [profileImage64, setProfileImage64] = useState("");

  const [isloading, setisloading] = useState(false);

  const handleClose2 = () => {
    setBlock(false);
  };
  const handleClickOpen2 = (data) => {
    setBlock(true);
    setUnstakeData(data);
  };
  const handleClose3 = () => {
    setBlock1(false);
  };
  const handleClickOpen3 = (data) => {
    setBlock1(true);
    setUnstakeData(data);
  };

  const unstakeHandler = async (id) => {
    setIsLoading(true);

    const bodyFormData = new FormData();
    bodyFormData.append("documentUrl", imageUrl);
    bodyFormData.append("message", idNumber);
    bodyFormData.append("stakeId", id);
    bodyFormData.append("stakeType", "UNSTAKE");
    try {
      const res = await Axios({
        method: "POST",
        url: ApiConfig.emergencyWithdraw,
        headers: {
          token: window.localStorage.getItem("token"),
        },
        data: bodyFormData,
      });
      if (res.data.responseCode === 200) {
        toast.success("Unstake successfully");
        auth.ViewStakeHandler();
        handleClose3();
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const emergencyWithdrawHandler = async (id) => {
    setIsLoading(true);
    const bodyFormData = new FormData();
    bodyFormData.append("documentUrl", profileImage64);
    bodyFormData.append("message", idNumber);
    bodyFormData.append("stakeId", id);
    bodyFormData.append("stakeType", "EMERGENCY");
    try {
      const res = await Axios({
        method: "POST",
        url: ApiConfig.emergencyWithdraw,
        headers: {
          token: window.localStorage.getItem("token"),
        },

        data: bodyFormData,
      });
      if (res.data.responseCode === 200) {
        toast.success(res.data.responseMessage);
        setIsLoading(false);
        auth.ViewStakeHandler();
        handleClose2();
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <>
      <Box className={classes.headbox}>
        <Box style={{ marginTop: "20px" }} mb={3}>
          <Grid container spacing={2} style={{ alignItems: "center" }}>
            <Grid item lg={12}>
              <Typography variant="h4">Staking History</Typography>
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
                        APPROVE
                      </MenuItem>
                      <MenuItem value="INPROGRESS" style={{ fontSize: "12px" }}>
                        INPROGRESS
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Grid>

              <Grid item xs={12} md={6} lg={4} sm={6}>
                <Box className={classes.FromTable1}>
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
                    value={auth.fromData}
                    onChange={(date) => auth.setFromData(date)}
                  />
                </Box>
              </Grid>

              <Grid item xs={12} md={6} lg={4} sm={6}>
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
                    value={auth.toData}
                    onChange={(date) => auth.setToData(date)}
                  />
                </Box>
              </Grid>

              <Grid item xs={12} md={6} lg={4} sm={6}>
                <Box className={classes.ResetClasses}>
                  <Button
                    variant="contained"
                    fullWidth
                    color="secondary"
                    onClick={auth.handlereset}
                    style={{ borderRadius: "10px", height: "40px" }}
                  >
                    Reset
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>

        <Box mt={2} width="100%">
          {auth?.isLoading ? (
            <ButtonCircularProgress />
          ) : (
            <>
              <TableContainer className="TableContainerBox">
                <Table aria-label="simple table" className={classes.table}>
                  <TableHead>
                    <TableRow>
                      <TableCell align="right">Sr.No</TableCell>
                      <TableCell align="right">Coin</TableCell>

                      <TableCell align="right">Staked Amount</TableCell>
                      <TableCell align="right">Payout Amount </TableCell>
                      <TableCell align="right">Payout Date </TableCell>
                      <TableCell align="right">Status</TableCell>
                      <TableCell align="center"> Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {view &&
                      view.map((value, index) => {
                        return (
                          <TableRow className={classes.tables}>
                            <TableCell align="right">
                              {(auth.page - 1) * 8 + index + 1}
                            </TableCell>
                            <TableCell align="right">
                              {value?.coinId?.coinName === "VD" ? (
                                "VDT"
                              ) : (
                                <>
                                  {value?.coinId?.coinName
                                    ? value?.coinId?.coinName
                                    : "N/A"}
                                </>
                              )}
                            </TableCell>

                            <TableCell align="right">
                              {value.price ? value.price : "N/A"}
                            </TableCell>
                            <TableCell align="right">
                              {value.payoutAmount ? value.payoutAmount : " N/A"}
                            </TableCell>
                            <TableCell align="right">
                              {moment(value.updatedAt).format("lll")}{" "}
                            </TableCell>
                            <TableCell align="right">
                              {value.stakeStatus ? value.stakeStatus : "N/A"}
                            </TableCell>

                            <TableCell align="center">
                              <Box>
                                <Button
                                  variant="contained"
                                  color="primary"
                                  className={classes.unstake}
                                  style={
                                    value?.isStakeRequestStatus === true
                                      ? { color: "yellow" }
                                      : value?.documentStatus === "APPROVED" ||
                                        value?.fixedStatus === "COMPLETED"
                                      ? { color: "#00FF00" }
                                      : {}
                                  }
                                  onClick={() => {
                                    if (value?.isStakeRequestStatus === true) {
                                      toast.warn("Already requested");
                                    } else if (
                                      value?.documentStatus === "APPROVED" ||
                                      value?.fixedStatus === "COMPLETED"
                                    ) {
                                      toast.warn("Verification Approved");
                                    } else {
                                      handleClickOpen2(value);
                                    }
                                  }}
                                >
                                  {value?.isStakeRequestStatus === true
                                    ? "Already Requested"
                                    : "Emergency Withdraw"}
                                </Button>
                                &nbsp;&nbsp;
                                <Button
                                  onClick={() => {
                                    handleClickOpen3(value);
                                  }}
                                  disabled={
                                    value?.toDate ===
                                      "2023-09-26T14:17:37.934Z" ||
                                    value?.stakeStatus === "INPROGRESS" ||
                                    value?.stakeStatus === "APPROVE" ||
                                    value?.stakeStatus === "REJECT"
                                  }
                                  variant="contained"
                                  color="primary"
                                  className={classes.unstake}
                                >
                                  Unstake
                                </Button>
                              </Box>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>

                {/* {view && view.length === 0 && <NoDataFound />} */}
                {/* {(view && view.length === 0) ||
                (view === undefined && <NoDataFound />)} */}
              </TableContainer>
              {view && view.length === 0 && <DataNotFoundIMG />}
            </>
          )}

          {/* {view && view.length === 0 && <DataNotFoundIMG />} */}
          {view && view.length > 0 && (
            <Pagination
              count={auth.pagesCount}
              page={auth?.page}
              onChange={(e, v) => auth.setPage(v)}
            />
          )}
        </Box>
        <Dialog
          fullWidth="sm"
          maxWidth="sm"
          open={block}
          keepMounted
          onClose={() => {
            if (!isLoading) {
              handleClose2();
            }
          }}
        >
          <DialogContent>
            <Box className={classes.popupBox}>
              <Typography align="left" variant="h5">
                Confirmation Form
              </Typography>
              <Box mt={2}>
                <Box mt={2}>
                  <Typography>Please mention your reason :</Typography>

                  <TextField
                    placeholder="Enter reason"
                    variant="outlined"
                    multiline
                    rows={5}
                    InputProps={{
                      className: classes.textfileBOx,
                    }}
                    onChange={(e) => setIdNumber(e.target.value)}
                  />
                </Box>
              </Box>
              <Box align="right" mt={1}>
                <Typography variant="h6">
                  Withdrawal Amount :
                  <span className="Styleword">{unstakeData?.price}</span>{" "}
                </Typography>
              </Box>
              <Box
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box>
                  <Typography variant="h4">Upload document :</Typography>
                  <Typography>
                    Please attached the document for proof:
                  </Typography>
                  <Box className="flexCenter">
                    <Box className={classes.fileicon}>
                      <Box className={classes.uploadicon1}>
                        {isloading ? (
                          <ButtonCircularProgress />
                        ) : (
                          <>
                            <FcDocument
                              style={{ fontSize: "40px", color: "#8A8A8A" }}
                            />

                            {imageUrl?.name}

                            <input
                              className={classes.inputF}
                              accept="image/*, application/pdf,doc,.docx,.xls,.xlsx"
                              multiple
                              type="file"
                              name="imageUrl"
                              // onChange={(e) => {
                              //   setImgeUrl(e.target.files[0]);
                              // }}
                              onChange={(e) => {
                                setProfileImage(
                                  URL.createObjectURL(e.target.files[0])
                                );
                                getBase64(e.target.files[0], (result) => {
                                  setProfileImage64(result);
                                });
                              }}
                            />
                          </>
                        )}
                      </Box>
                    </Box>
                    <Box className={classes.profile}>
                      <figure className="figure">
                        <Avatar
                          className={classes.imgsection}
                          src={
                            profileImage64 ? profileImage64 : "images/Dume1.png"
                          }
                        />
                      </figure>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </DialogContent>

          <Box className="flexcenterButton" mb={3}>
            <Button
              disabled={
                isLoading ||
                isloading ||
                idNumber === "" ||
                profileImage64 === ""
              }
              onClick={() => emergencyWithdrawHandler(unstakeData?._id)}
              color="primary"
              variant="contained"
            >
              Submit {isLoading && <ButtonCircularProgress />}
            </Button>
          </Box>
        </Dialog>
        <Dialog
          fullWidth="xs"
          maxWidth="xs"
          open={block1}
          keepMounted
          onClose={() => {
            if (!isLoading) {
              handleClose3();
            }
          }}
        >
          <DialogContent>
            <Typography align="center" variant="h5">
              Are you sure you want to Unstake ?
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
            <Button
              disabled={isLoading}
              variant="outlined"
              color="primary"
              onClick={handleClose3}
            >
              No
            </Button>
            <Button
              disabled={isLoading}
              onClick={() => unstakeHandler(unstakeData?.fixedDepositId)}
              color="primary"
              variant="contained"
            >
              Yes {isLoading && <ButtonCircularProgress />}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
}

export default CryptoStake;
