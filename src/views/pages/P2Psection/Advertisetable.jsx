import React, { useState, useContext, useEffect } from "react";
import {
  Typography,
  Box,
  Button,
  TableContainer,
  DialogActions,
  IconButton,
  Table,
  DialogContent,
  TableRow,
  TableCell,
  TableBody,
  TableHead,
  makeStyles,
  Dialog,
} from "@material-ui/core";
import { sortAddress } from "@utils";
import moment from "moment";
import { BiCopy } from "react-icons/bi";
import Axios from "axios";
// import ApiConfig from "../../../config/APIConfig";
import { AuthContext } from "@context/Auth";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { Pagination } from "@material-ui/lab";
// import NoDataFound from "src/DataNotFound";
import DeleteModal from "@component/DeleteModal";
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
import EditIcon from "@material-ui/icons/Edit";
import ApiConfig from "../../../config/APIConfig";
import axios from "axios";
import { useHistory, useLocation } from "react-router-dom";
import DataNotFoundIMG from "@component/DataNotFoundIMG";
import { values } from "lodash";

const useStyles = makeStyles((theme) => ({
  headbox: {
    borderRadius: "20px",
    marginTop: "20px",
    "& h4": {
      fontSize: "23px",
    },
    // overflow: "auto",
    [theme.breakpoints.down("sm")]: {
      // padding: "20px 7px 53px 7px",
      borderRadius: "16px",
    },
  },

  table: {
    minWidth: 1100,
  },
}));

function TransactionMain(data) {
  const classes = useStyles();
  const history = useHistory();
  const [historyData, setHistoryData] = useState([]);

  const auth = useContext(AuthContext);

  const userdata = auth?.userData ? auth?.userData : "";

  const [toData, setToData] = useState();
  const [dataList, setDataList] = useState([]);
  const [isLoader, setIsLoader] = useState(false);
  const [block1, setBlock1] = useState(false);

  const [noOfPages, setnoOfPages] = useState(1);
  const [page, setPage] = useState(1);
  const [pagesCount, setPagesCount] = useState(1);
  const [isLaoding, setIsLaoding] = useState(false);
  const [fromData, setFromData] = useState();
  const [details, setdetails] = useState([]);
  const [value, setValue] = useState(0);
  const [currentvalue, setCurrentValue] = useState("all");
  const [coin, setcoin] = useState("all");
  const [idd1, setidd1] = useState([]);
  const [open, setOpen] = useState(false);
  const [block, setBlock] = useState(false);
  const [blockId, setBlockId] = useState({});
  const [deleteId, setDeleteId] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const OpenModal = (id) => {
    setidd1(id);
    setOpen(true);
  };

  const handleClose3 = () => {
    setBlock1(false);
  };
  const handleClickOpen3 = (id1) => {
    setBlock1(true);
    setDeleteId(id1);
  };
  const handleClose2 = () => {
    setBlock(false);
  };
  const handleClickOpen2 = (id) => {
    setBlock(true);
    setBlockId(id);
  };
  const location = useLocation();
  const BlcokData = data._id;
  const downloadExcel = () => {
    const workSheet = XLSX.utils.json_to_sheet(dataList);
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, "dataList");
    let buf = XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
    XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
    XLSX.writeFile(workBook, "Advertise_List.xlsx");
  };

  const AdvertisementTableHander = async () => {
    try {
      const res = await Axios({
        method: "GET",
        url: ApiConfig.p2pAdvertisementList,

        headers: {
          token: window.localStorage.getItem("token"),
        },
        params: {
          listType: "self",
          tradeType: values.orderType,
        },
      });
      if (res.data.responseCode === 200) {
        // setIsLoader(false);
        setDataList(res?.data?.result.docs);
        setPagesCount(res?.data?.result?.total);
      } else {
        setIsLoader(false);
      }
    } catch (err) {
      console.log("err", err);
    }
  };
  useEffect(() => {
    AdvertisementTableHander();
  }, []);

  const blockunblockedHandler = async (id) => {
    setIsLoading(true);
    try {
      const res = await Axios({
        method: "PATCH",
        url: ApiConfig.p2pBlockunblock,
        headers: {
          token: window.localStorage.getItem("token"),
        },
        params: {
          _id: id,
        },
      });
      if (res.data.responseCode === 200) {
        toast.success(res.data.responseMessage);
        AdvertisementTableHander();
        setBlock(false);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    } catch (err) {
      console.log("err", err);
      setIsLoading(false);
    }
  };

  const deleteuserHandler = async (id1) => {
    setIsLoading(true);
    try {
      const res = await Axios({
        method: "DELETE",
        url: ApiConfig.p2pAdvertisementList,
        headers: {
          token: window.localStorage.getItem("token"),
        },
        params: {
          _id: id1,
        },
      });
      if (res.data.responseCode === 200) {
        toast.success(res.data.responseMessage);
        AdvertisementTableHander();
        setIsLoading(false);
        setBlock1(false);
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
            <Box pl={-2} mb={3}>
              <Typography style={{ fontSize: "23px", fontWeight: "500" }}>
                Your Open Trades
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
                      <TableCell align="right">Payment Type</TableCell>

                      <TableCell align="right">Fiat </TableCell>
                      <TableCell align="right">Coin </TableCell>

                      <TableCell align="right">Created At </TableCell>
                      <TableCell align="right" style={{ width: "150px" }}>
                        Advertisement Status{" "}
                      </TableCell>
                      <TableCell align="center">Action </TableCell>
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
                                {value?.tradeType ? value?.tradeType : "N/A"}
                              </TableCell>
                              <TableCell align="left">
                                {value?.bankId?.bankType}
                              </TableCell>
                              <TableCell align="left">
                                {" "}
                                {value.currency ? value?.currency : "N/A"}
                              </TableCell>{" "}
                              <TableCell align="left">
                                {value.asset === "VD" ? (
                                  "VDT"
                                ) : (
                                  <>{value.asset ? value.asset : "N/A"}</>
                                )}
                              </TableCell>
                              <TableCell align="left">
                                {/* {value.Equation} */}
                                {moment(value.createdAt).format("lll")}
                              </TableCell>
                              <TableCell align="left">
                                {value.status === "BLOCK" ? (
                                  <>
                                    <span style={{ color: "red" }}>
                                      {value?.status ? value?.status : "N/A"}
                                    </span>
                                  </>
                                ) : (
                                  <>
                                    <span style={{ color: "green" }}>
                                      {value?.status ? value?.status : "N/A"}
                                    </span>
                                  </>
                                )}
                              </TableCell>{" "}
                              {/* <TableCell align="left">
                                {" "}
                                {value.payment} 
                              </TableCell>{" "}*/}
                              <TableCell align="left">
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
                                          state: {
                                            data: value,
                                          },
                                        });
                                      }}
                                    />
                                  </IconButton>
                                  <IconButton
                                    style={{ padding: "6px 12px" }}
                                    onClick={() => {
                                      handleClickOpen2(value);
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
                                  <IconButton
                                    style={{ padding: "6px 12px" }}
                                    onClick={() => {
                                      handleClickOpen3(value);
                                    }}
                                  >
                                    <DeleteIcon
                                      style={{
                                        fontSize: "18px",
                                        cursor: "pointer",
                                        marginRight: "5px",
                                      }}
                                    />
                                  </IconButton>
                                </Box>
                              </TableCell>{" "}
                            </TableRow>
                          </>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
              {dataList && dataList.length === 0 && <DataNotFoundIMG />}

              {pagesCount > 10 && (
                <Box mb={2} mt={2} style={{ width: "100%" }}>
                  <Pagination
                    count={Math.ceil(pagesCount / 10)}
                    page={page}
                    onChange={(e, value) => setPage(value)}
                  />
                </Box>
              )}
            </>
          </Box>
        </Box>

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
              Are you sure want to{" "}
              {blockId.status === "ACTIVE" ? "block" : "active"} this user ?
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
              onClick={() => blockunblockedHandler(blockId?._id)}
              color="primary"
              variant="contained"
            >
              Yes {isLoading && <ButtonCircularProgress />}
            </Button>
          </DialogActions>
        </Dialog>

        {/* Delete modal  */}

        <Dialog
          fullWidth="xs"
          maxWidth="xs"
          open={block1}
          keepMounted
          onClose={handleClose3}
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
            <Button variant="outlined" color="primary" onClick={handleClose3}>
              No
            </Button>
            <Button
              onClick={() => deleteuserHandler(deleteId?._id)}
              color="primary"
              variant="contained"
            >
              Yes {isLaoding && <ButtonCircularProgress />}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
}

export default TransactionMain;
