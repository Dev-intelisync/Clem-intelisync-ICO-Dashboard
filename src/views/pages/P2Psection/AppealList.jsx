import React, { useState, useContext, useEffect } from "react";
import {
  Typography,
  Box,
  Grid,
  Button,
  TableContainer,
  IconButton,
  Table,
  TableRow,
  TableCell,
  TableBody,
  TableHead,
  makeStyles,
  Dialog,
  DialogContent,
  DialogActions,
} from "@material-ui/core";
import moment from "moment";
import Axios from "axios";
import ApiConfig from "../../../config/APIConfig";
import { AuthContext } from "@context/Auth";
import ButtonCircularProgress from "@component/ButtonCircularProgress";
import { toast } from "react-toastify";
import VisibilityIcon from "@material-ui/icons/Visibility";
import DeleteIcon from "@material-ui/icons/Delete";

import * as XLSX from "xlsx";

import DataNotFoundIMG from "@component/DataNotFoundIMG";

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
  imagesBox: {
    display: "flex",
    justifyContent: "center",
    maxWidth: "200px",
    maxHeight: "200px",
    width: "180px",
    height: "180px",
    margin: "auto",
    [theme.breakpoints.down("xs")]: {
      width: "150px",
      height: "150px",
    },
  },
}));

function AppealList() {
  const classes = useStyles();
  const history = useHistory();
  const auth = useContext(AuthContext);

  const [appealList, setAppealList] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [block, setBlock] = useState(false);
  const [popData, setPopData] = useState({});
  const [deletePop, setPopDelete] = useState({});
  const [type, setType] = useState();
  const [block1, setBlock1] = useState(false);

  const downloadExcel = () => {
    const workSheet = XLSX.utils.json_to_sheet(appealList);
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, "appealList");
    let buf = XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
    XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
    XLSX.writeFile(workBook, "Appeal_List.xlsx");
  };

  const handleClickOpen2 = (id) => {
    setBlock(true);
    setPopData(id);
    setType("View");
  };
  const handleClickOpen3 = (id1) => {
    setBlock(true);
    setPopDelete(id1);
    setType("Delete");
  };

  const handleClose2 = () => {
    setBlock(false);
  };

  const handleClose4 = (id1) => {
    setBlock1(true);
    setPopDelete(id1);
  };

  const AppealListHandler = async () => {
    setIsLoading(true);
    try {
      const res = await Axios({
        method: "GET",
        url: ApiConfig.appelList,

        headers: {
          token: window.localStorage.getItem("token"),
        },
      });
      if (res.data.responseCode === 200) {
        setAppealList(res?.data?.result.docs);
        setIsLoading(false);
      }
    } catch (err) {
      console.log("err", err);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    AppealListHandler();
  }, []);

  const DeleteAppealHandler = async (id1) => {
    setIsLoading(true);
    try {
      const res = await Axios({
        method: "DELETE",
        url: ApiConfig.appelDelete,
        headers: {
          token: window.localStorage.getItem("token"),
        },
        params: {
          _id: id1,
        },
      });
      if (res.data.responseCode === 200) {
        toast.success(res.data.responseMessage);
        AppealListHandler();
        setBlock1(false);

        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    } catch (err) {
      console.log("err", err);
      setIsLoading(false);
    }
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
                Your Appeal List
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
                      <TableCell align="left">Chat ID</TableCell>

                      <TableCell align="left">Mobile Number</TableCell>

                      <TableCell align="left">Appeal Status</TableCell>

                      <TableCell align="left">Created At </TableCell>
                      <TableCell align="left">Action </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {appealList &&
                      appealList.map((value, i) => {
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
                                {value?.chatId?._id
                                  ? value?.chatId?._id
                                  : "N/A"}
                              </TableCell>
                              <TableCell align="left">
                                {value.mobileNumber
                                  ? value.mobileNumber
                                  : "N/A"}
                              </TableCell>
                              <TableCell align="left">
                                {value.appealStatus}
                              </TableCell>{" "}
                              <TableCell align="left">
                                {moment(value.createdAt).format("lll")}
                              </TableCell>
                              <TableCell align="left">
                                <Box>
                                  <IconButton style={{ padding: "6px 12px" }}>
                                    <VisibilityIcon
                                      style={{
                                        fontSize: "20px",
                                        cursor: "pointer",
                                        marginRight: "2px",
                                      }}
                                      onClick={() => {
                                        handleClickOpen2(value);
                                      }}
                                    />
                                  </IconButton>

                                  <IconButton
                                    style={{ padding: "6px 12px" }}
                                    // onClick={() => {
                                    //   handleClickOpen3(value);
                                    // }}
                                  >
                                    <DeleteIcon
                                      onClick={() => {
                                        handleClickOpen3(value);
                                      }}
                                      style={{
                                        fontSize: "18px",
                                        cursor: "pointer",
                                        marginRight: "5px",
                                      }}
                                    />
                                  </IconButton>
                                </Box>
                              </TableCell>
                            </TableRow>
                          </>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>{" "}
              {(appealList &&
                appealList.length === 0 &&
                appealList.length === undefined) ||
                appealList.length === null ||
                (appealList.length === 0 && <DataNotFoundIMG />)}
            </>
          </Box>
        </Box>

        <Dialog
          fullWidth="md"
          maxWidth="md"
          open={block}
          keepMounted
          onClose={handleClose2}
        >
          <DialogContent>
            <Box mt={2} className={classes.mainSteperRoot}>
              <Grid container spacing={2}>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <Grid container spacing={2}>
                    <Grid item lg={3} md={3} sm={4} xs={6}>
                      <Box>
                        <Typography variant="h6"></Typography>
                        <figure className={classes.imagesBox}>
                          <img
                            src={popData?.image}
                            alt="Not Found"
                            style={{
                              // minHeight: "300px",
                              width: "60%",
                              height: "60%",

                              borderRadius: "5px",
                              objectFit: "cover",
                            }}
                          />
                        </figure>
                      </Box>
                    </Grid>
                    <Grid item lg={3} md={3} sm={4} xs={6}>
                      <Box>
                        <Typography variant="h6">Reason</Typography>
                        {/* <Typography>{formData.orderType}</Typography>
                      <Typography>{formData.orderType}</Typography> */}
                        <Typography>{popData?.reason}</Typography>
                      </Box>
                    </Grid>
                    <Grid item lg={3} md={3} sm={4} xs={6}>
                      <Box>
                        <Typography variant="h6">Appeal Status</Typography>
                        <Typography>
                          {popData?.appealStatus
                            ? popData?.appealStatus
                            : "N/A"}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item lg={3} md={3} sm={4} xs={6}>
                      <Box>
                        <Typography variant="h6">Date & time</Typography>
                        <Typography>
                          {moment(
                            popData.createdAt ? popData.createdAt : "N/A"
                          ).format("lll")}{" "}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <Grid container spacing={2}>
                    <Grid item lg={3} md={3} sm={4} xs={6}>
                      <Box>
                        <Typography variant="h6">Mobile Number</Typography>
                        <Typography>
                          {popData?.mobileNumber
                            ? popData?.mobileNumber
                            : "N/A"}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item lg={3} md={3} sm={4} xs={6}>
                      <Box>
                        <Typography variant="h6">Country</Typography>
                        <Typography>
                          {popData?.p2pAdvertisementId?.country
                            ? popData?.p2pAdvertisementId?.country
                            : "N/A"}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item lg={3} md={3} sm={4} xs={6}>
                      <Box>
                        <Typography variant="h6">Coin</Typography>
                        <Typography>
                          {popData?.p2pAdvertisementId?.asset === "VD" ? (
                            "VDT"
                          ) : (
                            <>
                              {popData?.p2pAdvertisementId?.asset
                                ? popData?.p2pAdvertisementId?.asset
                                : "N/A"}
                            </>
                          )}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item lg={3} md={3} sm={4} xs={6}>
                      <Box>
                        <Typography variant="h6">Quantity</Typography>
                        <Typography>
                          {popData?.p2pAdvertisementId?.quantity
                            ? popData?.p2pAdvertisementId?.quantity
                            : "N/A"}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <Grid container spacing={2}>
                    <Grid item lg={3} md={3} sm={4} xs={6}>
                      <Box>
                        <Typography variant="h6">Trade Type</Typography>
                        {popData?.p2pAdvertisementId?.tradeType
                          ? popData?.p2pAdvertisementId?.tradeType
                          : "N/A"}
                      </Box>
                    </Grid>
                    <Grid item lg={3} md={3} sm={4} xs={6}>
                      <Box>
                        <Typography variant="h6">Description</Typography>
                        <Typography>
                          {popData?.description ? popData?.description : "N/A"}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </DialogContent>
          <DialogActions
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "20px",
              flexWrap: "wrap",
            }}
          >
            <Box mt={1}>
              <Button
                variant="outlined"
                color="primary"
                onClick={handleClose2}
                style={{ padding: "7px 20px !important" }}
              >
                Cancel
              </Button>
            </Box>
            {type === "Delete" && (
              <Box mt={1}>
                <Button
                  variant="outlined"
                  color="primary"
                  style={{ padding: "7px 20px !important" }}
                  onClick={() => {
                    handleClose4(popData);
                  }}
                >
                  Delete
                </Button>
              </Box>
            )}
          </DialogActions>
        </Dialog>

        <Dialog
          fullWidth="xs"
          maxWidth="xs"
          open={block1}
          keepMounted
          onClose={handleClose4}
        >
          <DialogContent>
            <Typography align="center" variant="h5">
              Are you sure want to Delete this user ?
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
            <Button
              onClick={() => DeleteAppealHandler(deletePop?._id)}
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

export default AppealList;
