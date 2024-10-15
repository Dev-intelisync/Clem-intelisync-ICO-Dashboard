import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
} from "@material-ui/core";
import { Link, useHistory, useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { BiCopy } from "react-icons/bi";
import { toast } from "react-toastify";
import Axios from "axios";
import ApiConfig from "../../../../config/APIConfig";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";

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
      marginBottom: "8px",
    },
    "& p": {
      color: theme.palette.background.greyWhite,
      fontWeight: "300",
      fontSize: "14px",
      marginBottom: "14px",
    },
    "& h4": {
      color: theme.palette.text.primary,
      fontWeight: "500",
      fontSize: "14px",
      width: "100%",
      maxWidth: "402px",
      marginBottom: "8px",
      [theme.breakpoints.down("sm")]: {
        fontSize: "16px",
      },
    },
    "& h6": {
      color: theme.palette.text.primary,
      fontWeight: "500",
      fontSize: "16px",
      marginTop: "10px",
    },
    "& button": {
      backgroundColor: "#EF5656",
      fontSize: "14px",
      fontWeight: "500",
      color: theme.palette.primary.main,
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
  flexcontrol: {
    display: "flex",
    justifyContent: "space-between",
    "@media(max-width:426px)": {
      display: "block",
    },
  },
  verifiedbutton: {
    color: "#02ffba",
    width: "110px",
    borderRadius: "0px",
  },
}));
function UpiList({ upiBankData, uPIAccountListDataUpi }) {
  const classes = useStyles();
  const location = useLocation();
  const [age, setAge] = React.useState("");
  const [open1, setOpen1] = React.useState(true);
  const [view1, setView1] = useState(true);
  const [filterdatas, setfilterdata] = useState("");
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [block, setBlock] = useState(false);
  const [selectedBank, setSelectedBank] = useState({});
  const [selectedId, setSelectedId] = useState("");
  const [view, setView] = useState(true);
  const [open, setOpen] = React.useState(true);

  const handleClickOpen = () => {
    setOpen(true);
    setView(true);
  };
  const handleClickClose = () => {
    setOpen(true);
    setView(false);
  };

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

  useEffect(() => {
    const filterdata = upiBankData.filter((data, i) => {
      setfilterdata(data);
    });
  }, [upiBankData]);

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const handleClickOpen1 = () => {
    setOpen1(true);
    setView1(true);
  };
  const handleClickClose1 = () => {
    setOpen1(true);
    setView1(false);
  };

  const handleClose2 = () => {
    setBlock(false);
  };
  const handleClickOpen2 = () => {
    setBlock(true);
  };

  const deleteUPIHandler = async () => {
    setIsLoading(true);

    try {
      const res = await Axios({
        method: "DELETE",
        url: ApiConfig.deleteBank,
        headers: {
          token: window.localStorage.getItem("token"),
        },
        params: {
          bankId: filterdatas?._id ? filterdatas?._id : selectedId,
        },
      });
      if (res.data.responseCode === 200) {
        toast.success("UPI details delete successfully");
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

  return (
    <>
      <Box className={classes.maincontainer}>
        {(upiBankData && upiBankData.length === 0) ||
        upiBankData === undefined ? (
          <Box pt={2} pl={1} className={classes.addresbox}>
            <Typography>No E Wallet added</Typography>
          </Box>
        ) : (
          <>
            <Box className={classes.addresbox}>
              {/* <img src="images/myaccount.png" /> */}
              {open1 && (
                <>
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
                          E WALLET ACCOUNT
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
                </>
              )}
              {location.search === "" ? (
                <>
                  {view1 && (
                    <>
                      {view && (
                        <Box className={classes.verifieddetail} mt={1}>
                          <Box>
                            {/* <Typography variant="h5">UPI account verified</Typography> */}
                            <Typography variant="body1">
                              You can now make deposit, withdrawals,
                            </Typography>
                            <Typography variant="h4">
                              Your E wallet account details for E wallet
                              payments
                            </Typography>
                            <Typography variant="h6">
                              STATUS : {filterdatas?.approveStatus}
                            </Typography>
                            <Typography variant="h6">
                              {" "}
                              {filterdatas?.bankCode === "GPAY"
                                ? "GOOGLE"
                                : ""}{" "}
                              {filterdatas?.bankCode === "APPLE" ? "APPLE" : ""}{" "}
                              {filterdatas?.bankCode === "UPI" ? "UPI" : ""} ID
                            </Typography>
                            <Typography variant="h4">
                              {filterdatas?.upiId ? filterdatas?.upiId : "N/A"}
                              <CopyToClipboard text={filterdatas?.upiId}>
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
                            </Typography>
                            <Box display="flex" justifyContent="space-between">
                              <Box>
                                <Typography variant="h6">
                                  ACCOUNT HOLDER NAME
                                </Typography>
                                <Typography variant="h4">
                                  {filterdatas.holderName
                                    ? filterdatas.holderName
                                    : "N/A"}

                                  {/* <CopyToClipboard text={"PUNB0187500"}>
                        <BiCopy
                          style={{
                            color: "#848484",
                            fontSize: " 20px",
                            cursor: "pointer",
                            marginLeft: "5px",
                          }}
                          onClick={() => toast.success("Copied successfully")}
                        />
                      </CopyToClipboard> */}
                                </Typography>
                              </Box>
                              <Box className={classes.otherButton}>
                                <Button
                                  // variant="contained"
                                  // color="primary"
                                  size="large"
                                  className="sellBtn"
                                  onClick={() => {
                                    handleClickOpen2();
                                  }}
                                >
                                  Remove
                                </Button>
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
                                    pathname: "/upiList",
                                    state: { upiBankData },
                                  })
                                }
                              >
                                All View List
                              </Button>
                            </Box>
                          </Box>
                        </Box>
                      )}
                    </>
                  )}
                </>
              ) : (
                <>
                  {view && (
                    <Box className={classes.verifieddetail} mt={1}>
                      <Box>
                        {/* <Typography variant="h5">UPI account verified</Typography> */}
                        <Typography variant="body1">
                          You can now make deposit, withdrawals,
                        </Typography>
                        <Typography variant="h4">
                          Your E wallet account details for E wallet payments
                        </Typography>
                        <Typography variant="h6">
                          STATUS : {filterdatas?.approveStatus}
                        </Typography>
                        <Typography variant="h6">
                          {" "}
                          {selectedBank?.bankCode === "GPAY"
                            ? "GOOGLE"
                            : ""}{" "}
                          {selectedBank?.bankCode === "APPLE" ? "APPLE" : ""}{" "}
                          {selectedBank?.bankCode === "UPI" ? "UPI" : ""} ID
                        </Typography>
                        <Typography variant="h4">
                          {selectedBank?.upiId ? selectedBank?.upiId : "N/A"}
                          <CopyToClipboard text={selectedBank?.upiId}>
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
                        </Typography>
                        <Box display="flex" justifyContent="space-between">
                          <Box>
                            <Typography variant="h6">
                              ACCOUNT HOLDER NAME
                            </Typography>
                            <Typography variant="h4">
                              {selectedBank.holderName
                                ? selectedBank.holderName
                                : "N/A"}
                            </Typography>
                          </Box>
                          <Box className={classes.otherButton}>
                            <Button
                              // variant="contained"
                              // color="primary"
                              size="large"
                              className="sellBtn"
                              onClick={() => {
                                handleClickOpen2();
                              }}
                            >
                              Remove
                            </Button>
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
                                pathname: "/upiList",
                                state: { upiBankData },
                              })
                            }
                          >
                            All View List
                          </Button>
                        </Box>
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
            onClick={() => deleteUPIHandler()}
            color="primary"
            variant="contained"
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default UpiList;
