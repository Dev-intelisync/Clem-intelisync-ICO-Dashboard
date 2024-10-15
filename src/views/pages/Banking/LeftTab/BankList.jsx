import React, { useState, useContext, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
} from "@material-ui/core";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { makeStyles } from "@material-ui/core";
import { Link, useHistory, useLocation } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { BiCopy } from "react-icons/bi";
import { AuthContext } from "@context/Auth";
import Axios from "axios";
import ApiConfig from "../../../../config/APIConfig";
import { toast } from "react-toastify";
import { sortAccount } from "@utils/index";
import ButtonCircularProgress from "@component/ButtonCircularProgress";
const useStyles = makeStyles((theme) => ({
  addresbox: {
    marginTop: "30px",
  },
  verifieddetail: {
    background: theme.palette.background.darkgrey,
    padding: "10px",
    "& h5": {
      color: "#2EAE8B",
      fontWeight: "400",
      marginBottom: "10px",
    },
    "& p": {
      color: theme.palette.background.greyWhite,
      fontWeight: "300",
      fontSize: "14px",
      marginBottom: "14px",
    },
    "& h4": {
      color: theme.palette.background.main,
      fontWeight: "500",
      fontSize: "14px",

      [theme.breakpoints.down("sm")]: {
        fontSize: "16px",
      },
    },
    "& h6": {
      fontWeight: "500",
      fontSize: "16px",
      marginTop: "18px",
    },
    "& button": {
      backgroundColor: "#EF5656",
      fontSize: "14px",
      fontWeight: "500",
      color: theme.palette.primary.main,
    },
  },
  verifiedbutton: {
    color: "#02ffba",
    width: "110px",
    borderRadius: "0px",
  },
  flexcontrol: {
    display: "flex",
    justifyContent: "start",
    "@media(max-width:426px)": {
      display: "block",
    },
  },
  otherButton: {
    "& .buyBtn": {
      color: "#0df0b2 !important",
      borderRadius: "8px",
      padding: "9px 30px !important",
      fontSize: "14px",
      boxShadow: "0px 13px 27px rgb(0 0 0 / 25%)",
      background:
        "linear-gradient(180deg, #00ACEB 0%, #00B0ED 10.18%, #1069C2 70.35%, #1069C2 100%)",
      boxShadow: "0px 13px 27px rgb(0 0 0 / 25%)",
    },
    "& .Btn": {
      color: "#000",
      background: "#fff",
      borderRadius: "8px",
      padding: "8px 20px",
      marginRight: "10px",
      maxWidth: "100px",
    },

    "& .sellBtn": {
      color: "white",
      borderRadius: "8px",
      padding: "9px 30px !important",
      fontSize: "14px",
      boxShadow: "0px 13px 27px rgb(0 0 0 / 25%)",
      backgroundColor: "red",
    },
  },
}));
function BankList({ upiBankData, uPIAccountListDataUpi }) {
  const classes = useStyles();
  const [age, setAge] = React.useState("");
  const [dataBank, setDataBank] = useState("");
  const [DataBankALL, setDataBankALL] = useState([]);
  const location = useLocation();

  const [open, setOpen] = React.useState(true);
  const [view, setView] = useState(true);
  const history = useHistory();
  const auth = useContext(AuthContext);
  const bankDataList = auth?.bankData[0];

  const [isLoading, setIsLoading] = useState(false);
  const [block, setBlock] = useState(false);
  const [selectedBank, setSelectedBank] = useState({});

  const [selectedId, setSelectedId] = useState("");

  const viewBankHandler = async (id) => {
    try {
      const res = await Axios({
        method: "GET",
        url: ApiConfig.viewBank,
        headers: {
          token: window.localStorage.getItem("token"),
        },
        params: {
          bankId: id,
        },
      });

      if (res.data.responseCode === 200) {
        setSelectedBank(res.data.result);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const iddd = location.search.split("?")[1];
    setSelectedId(iddd);
    if (iddd) {
      viewBankHandler(iddd);
    }
  }, [location.search]);

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const handleClickOpen = () => {
    setOpen(true);
    setView(true);
  };
  const handleClickClose = () => {
    setOpen(true);
    setView(false);
  };

  const handleClose2 = () => {
    setBlock(false);
  };
  const handleClickOpen2 = () => {
    setBlock(true);
  };

  const deleteBankHandler = async () => {
    setIsLoading(true);

    try {
      const res = await Axios({
        method: "DELETE",
        url: ApiConfig.deleteBank,
        headers: {
          token: window.localStorage.getItem("token"),
        },
        params: {
          bankId: dataBank?._id ? dataBank?._id : selectedId,
        },
      });
      if (res.data.responseCode === 200) {
        toast.success("Bank details delete successfully");
        uPIAccountListDataUpi();
        setBlock(false);
        setIsLoading(false);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    const filterdata = upiBankData.filter((data, i) => {
      return data?.bankType === "BANK";
    });
    setDataBank(filterdata[0]);
    setDataBankALL(filterdata);
  }, [upiBankData]);
  return (
    <>
      <Box className={classes.maincontainer}>
        {(dataBank && dataBank.length === 0) || dataBank === undefined ? (
          <Box pt={2} className={classes.addresbox} pl={1}>
            <Typography> No Bank Added</Typography>
          </Box>
        ) : (
          <>
            <Box className={classes.addresbox}>
              {/* <img src="images/myaccount.png" /> */}
              {open && (
                <Box className={classes.accountdetails}>
                  <Box className={classes.flexcontrol}>
                    <Box display="flex" alignItems="center">
                      <Box>
                        <img
                          src="images/bank.png"
                          alt=""
                          width="100%"
                          style={{ width: "100%", maxWidth: "17px" }}
                        />
                      </Box>
                      &nbsp;&nbsp;
                      <Typography variant="h6">
                        BANK ACCOUNT - {sortAccount(dataBank?.accountNumber)}
                        <IoMdArrowDropdown
                          onClick={() => handleClickOpen()}
                          style={{ fontSize: "17px", cursor: "pointer" }}
                        />
                        &nbsp;
                        <IoMdArrowDropup
                          style={{ fontSize: "17px", cursor: "pointer" }}
                          onClick={() => handleClickClose()}
                        />
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              )}

              {location.search === "" ? (
                <>
                  {view && (
                    <Box className={classes.verifieddetail} mt={1}>
                      <Box>
                        <Typography variant="h5">Bank account </Typography>
                        <Typography variant="body1">
                          You can now make deposit, withdrawals,{" "}
                        </Typography>
                        <Typography variant="h4">
                          Your bank account details for IMPS payments
                        </Typography>
                        <Typography
                          variant="h6"
                          style={{ textTransform: "capitalize" }}
                        >
                          STATUS : {dataBank?.approveStatus}{" "}
                        </Typography>
                        <Typography variant="h6">ACCOUNT NUMBER</Typography>
                        <Typography variant="h4">
                          {dataBank?.accountNumber
                            ? dataBank?.accountNumber
                            : "N/A"}
                          <CopyToClipboard text={dataBank?.accountNumber}>
                            <BiCopy
                              style={{
                                color: "#848484",
                                fontSize: " 18px",
                                cursor: "pointer",
                                marginLeft: "5px",
                              }}
                              onClick={() =>
                                toast.success("Copied successfully")
                              }
                            />
                          </CopyToClipboard>
                        </Typography>
                        <Typography variant="h6">
                          {dataBank?.bankCode === "MICR" ? "MICR" : ""}{" "}
                          {dataBank?.bankCode === "SHORTCODE" ? "SORT" : ""}{" "}
                          {dataBank?.bankCode === "IFSC" ? "IFSC" : ""} CODE
                        </Typography>

                        <Typography variant="h4">
                          {dataBank?.ifscCode ? dataBank?.ifscCode : "N/A"}
                          <CopyToClipboard text={dataBank?.ifscCode}>
                            <BiCopy
                              style={{
                                color: "#848484",
                                fontSize: " 18px",
                                cursor: "pointer",
                                marginLeft: "5px",
                              }}
                              onClick={() =>
                                toast.success("Copied successfully")
                              }
                            />
                          </CopyToClipboard>
                        </Typography>
                        <Box display="flex" justifyContent="space-between">
                          <Box>
                            <Typography variant="h6">BANK NAME</Typography>
                            <Typography variant="h4">
                              {" "}
                              {dataBank?.bankName ? dataBank?.bankName : "N/A"}
                            </Typography>
                          </Box>
                          <Box className={classes.otherButton}>
                            <Button
                              // variant="contained"
                              // color="secondary"
                              size="large"
                              className="sellBtn"
                              // onClick={handleClickClose}
                              onClick={() => {
                                handleClickOpen2();
                              }}
                              disabled={isLoading}
                            >
                              Remove {isLoading && <ButtonCircularProgress />}
                            </Button>
                          </Box>
                        </Box>
                      </Box>
                      <Box align="right" className={classes.otherButton}>
                        <Button
                          variant="contained"
                          color="secondary"
                          size="large"
                          style={{ borderRadius: "8px" }}
                          onClick={() =>
                            history.push({
                              pathname: "/viewbank",
                              state: {
                                DataBankALL,
                              },
                            })
                          }
                        >
                          All View List
                        </Button>
                      </Box>
                    </Box>
                  )}
                </>
              ) : (
                <>
                  {view && (
                    <Box className={classes.verifieddetail} mt={1}>
                      <Box>
                        <Typography variant="h5">Bank account </Typography>
                        <Typography variant="body1">
                          You can now make deposit, withdrawals,{" "}
                        </Typography>
                        <Typography variant="h4">
                          Your bank account details for IMPS payments
                        </Typography>
                        <Typography
                          variant="h6"
                          style={{ textTransform: "capitalize" }}
                        >
                          STATUS : {dataBank?.approveStatus}{" "}
                        </Typography>
                        <Typography variant="h6">ACCOUNT NUMBER</Typography>
                        <Typography variant="h4">
                          {selectedBank?.accountNumber
                            ? selectedBank?.accountNumber
                            : "N/A"}
                          <CopyToClipboard text={selectedBank?.accountNumber}>
                            <BiCopy
                              style={{
                                color: "#848484",
                                fontSize: " 18px",
                                cursor: "pointer",
                                marginLeft: "5px",
                              }}
                              onClick={() =>
                                toast.success("Copied successfully")
                              }
                            />
                          </CopyToClipboard>
                        </Typography>
                        <Typography variant="h6">
                          {selectedBank?.bankCode === "MICR" ? "MICR" : ""}{" "}
                          {selectedBank?.bankCode === "SORTCODE" ? "SORT" : ""}{" "}
                          {selectedBank?.bankCode === "IFSC" ? "IFSC" : ""} CODE
                        </Typography>
                        <Typography variant="h4">
                          {selectedBank?.ifscCode
                            ? selectedBank?.ifscCode
                            : "N/A"}
                          <CopyToClipboard text={selectedBank?.ifscCode}>
                            <BiCopy
                              style={{
                                color: "#848484",
                                fontSize: " 18px",
                                cursor: "pointer",
                                marginLeft: "5px",
                              }}
                              onClick={() =>
                                toast.success("Copied successfully")
                              }
                            />
                          </CopyToClipboard>
                        </Typography>
                        <Box display="flex" justifyContent="space-between">
                          <Box>
                            <Typography variant="h6">BANK NAME</Typography>
                            <Typography variant="h4">
                              {" "}
                              {selectedBank?.bankName
                                ? selectedBank?.bankName
                                : "N/A"}
                            </Typography>
                          </Box>
                          <Box className={classes.otherButton}>
                            <Button
                              // variant="contained"
                              // color="secondary"
                              size="large"
                              className="sellBtn"
                              // onClick={handleClickClose}
                              onClick={() => {
                                handleClickOpen2();
                              }}
                              disabled={isLoading}
                            >
                              Remove {isLoading && <ButtonCircularProgress />}
                            </Button>
                          </Box>
                        </Box>
                      </Box>
                      <Box align="right" className={classes.otherButton}>
                        <Button
                          variant="contained"
                          color="secondary"
                          size="large"
                          style={{ borderRadius: "8px" }}
                          onClick={() =>
                            history.push({
                              pathname: "/viewbank",
                              state: {
                                DataBankALL,
                              },
                            })
                          }
                        >
                          All View List
                        </Button>
                      </Box>
                    </Box>
                  )}
                </>
              )}
            </Box>
          </>
        )}
      </Box>
      <Dialog
        fullWidth="xs"
        maxWidth="xs"
        open={block}
        keepMounted
        onClose={handleClose2}
      >
        <DialogContent>
          <Typography align="center" variant="h5">
            Are you sure want to delete this user ?
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
            onClick={() => deleteBankHandler()}
            color="primary"
            variant="contained"
            disabled={isLoading}
          >
            Yes {isLoading && <ButtonCircularProgress />}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default BankList;
