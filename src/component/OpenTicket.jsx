import React, { useState, useEffect, useContext } from "react";
import {
  makeStyles,
  Box,
  Grid,
  Accordion,
  Typography,
  AccordionSummary,
  AccordionDetails,
} from "@material-ui/core";
import { AuthContext } from "../context/Auth";
import AdminSupportReplyData from "../component/AdminSupportReplyData";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import SupportReplyCard from "../component/SupportReplyCard";
import Axios from "axios";
import UpdateReplySupportTicket from "../component/UpdateReplySupportTicket";

import ApiConfig from "../config/APIConfig";
import ButtonCircularProgress from "../component/ButtonCircularProgress";
import DataNotFound from "../component/DataNotFound";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "60vh",
    padding: "15px",
    background: theme.palette.background.taf,
    overflowY: "scroll",
    "@media(max-width:493px)": {
      padding: "0px",
    },
  },
  ticketDetailsdata1: {
    color: "#000000",
    fontSize: "13px",
  },
  ticketDetailsdata2: {
    color: "#244273",
    fontSize: "13px",
  },
  DescriptionBox: {
    "& .internalChatBox": {
      overflowY: "scroll",
      height: "450px",
    },
    "& .userDescriptionData": {
      width: "fit-content",
      margin: "5px 0px",
      backgroundColor: "#b6d1f5",
      padding: "5px 8px",
      borderRadius: "8px 8px 0px 8px",
      "& h6": {
        color: "#707070",
        fontSize: "13px",
        wordBreak: "break-all",
      },
      "& p": {
        fontSize: "10px",
      },
    },
    "& p": {
      fontSize: "12px",
    },
    "& .titleBox": {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-start",
      marginBottom: "15px",
      "& h4": {
        color: "#244273",
      },
      "& h6": {
        marginLeft: "8px",
        color: "#244273",
      },
    },
  },
  adminReplyBox: {
    "& .topBox": {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-start",
      "& h6": {
        color: "#244273",
      },
    },
  },
  userReplyBox: {
    "& .topBox": {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-start",
      "& h6": {
        color: "#244273",
      },
    },
  },
  timespan: {
    color: "#244273",
    fontSize: "10px",
  },
  ticketHeadingData: {
    "& .ticketDetaildata": {
      display: "flex",
      alignItems: "center",
      "& h6": {
        color: "#707070",
        fontSize: "12px",
      },
      "& p": {
        width: "110px",
        color: "#244273",
        fontSize: "12px",
        fontWeight: "bold",
      },
    },
  },
  typoelipsis: {
    textOverflow: "ellipsis",
    width: "auto",
    overflow: "hidden",
    whiteSpace: "nowrap",
    maxWidth: "196px",
    "@media(max-width:460px)": {
      width: "100px",
    },
  },
}));

function OpenTicket({ setopenticketdialog, openticketdialog }) {
  const classes = useStyles();
  const [isLoader, setIsLoader] = useState(false);
  const [ticketDetail, setTicketDetail] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState();
  const auth = useContext(AuthContext);
  const userIdd = auth?.userData?.userId;
  const [handleapiclick, sethandleapiclick] = useState(false);
  const [statusofprogress, setstatusofprogress] = useState();
  const getUserSupportTicketHandler = async () => {
    setIsLoader(true);
    try {
      const res = await Axios({
        method: "GET",
        url: ApiConfig.getUserSupportTicket,
        params: {
          fkUserId: userIdd,
        },
        headers: {
          token: window.sessionStorage.getItem("token"),
        },
      });
      if (res.data.status === 200) {
        setIsLoader(false);
        setTicketDetail(res.data?.data);
        setopenticketdialog(false);
      }
      if (res.data.status === 205) {
        setIsLoader(false);
        setTicketDetail([]);
      } else {
        setIsLoader(false);
      }
    } catch {
      setIsLoader(false);
    }
  };
  useEffect(() => {
    if (openticketdialog) {
      getUserSupportTicketHandler();
    }
  }, [openticketdialog]);
  useEffect(() => {
    if (userIdd) {
      getUserSupportTicketHandler();
    }
  }, [userIdd]);
  useEffect(() => {
    const statusdata = ticketDetail?.map((data12, i) => {
      setstatusofprogress(data12.ticket_status);
    });
  }, [ticketDetail]);

  return (
    <>
      <Box className={classes.root}>
        {/* {isLoader ? ( */}
        <ButtonCircularProgress />
        {/* ) : ( */}
        <Grid container spacing={2}>
          {ticketDetail &&
            ticketDetail?.map((data12, i) => {
              return (
                <>
                  {data12.ticket_status === "INPROGRESS" ? (
                    <>
                      <Grid item xs={12}>
                        <Accordion>
                          <AccordionSummary
                            aria-controls="panel1d-content"
                            expandIcon={<ExpandMoreIcon />}
                            id="panel1d-header"
                          >
                            <Box className={classes.ticketHeadingData}>
                              <Box className="ticketDetaildata">
                                <Typography variant="body2" pt={2}>
                                  Ticket Status :-
                                </Typography>{" "}
                                &nbsp;
                                <Typography
                                  variant="h6"
                                  className={classes.typoelipsis}
                                >
                                  {data12?.ticket_status}
                                </Typography>
                              </Box>
                              <Box className="ticketDetaildata">
                                <Typography
                                  variant="body2"
                                  pt={2}
                                  className={classes.typoelipsis}
                                >
                                  Issue Type :-
                                </Typography>{" "}
                                &nbsp;
                                <Typography
                                  variant="h6"
                                  className={classes.typoelipsis}
                                >
                                  {data12?.support_Type}
                                </Typography>
                              </Box>
                              <Box className="ticketDetaildata">
                                <Typography variant="body2" pt={2}>
                                  Title :-
                                </Typography>{" "}
                                &nbsp;
                                <Typography
                                  variant="h6"
                                  className={classes.typoelipsis}
                                >
                                  {data12?.subject}
                                </Typography>
                              </Box>
                            </Box>
                          </AccordionSummary>
                          <AccordionDetails>
                            <Box style={{ width: "100%" }}>
                              <Grid container spacing={2}>
                                <Grid item xs={12}>
                                  <Box className={classes.DescriptionBox}>
                                    <Box className="internalChatBox">
                                      <AdminSupportReplyData
                                        ticket_ID={data12?.ticket_Id}
                                        data12={data12}
                                        setSelectedMessage={setSelectedMessage}
                                        handleapiclick={handleapiclick}
                                        sethandleapiclick={(data) =>
                                          sethandleapiclick(data)
                                        }
                                      />
                                    </Box>
                                    <Box>
                                      {" "}
                                      <SupportReplyCard
                                        ticket_ID={data12?.ticket_Id}
                                        selectedMessage={selectedMessage}
                                        sethandleapiclick={(data) =>
                                          sethandleapiclick(data)
                                        }
                                        data12={data12}
                                      />
                                    </Box>
                                  </Box>
                                </Grid>
                              </Grid>
                            </Box>
                          </AccordionDetails>
                        </Accordion>
                      </Grid>
                    </>
                  ) : (
                    ""
                  )}
                </>
              );
            })}
          {!isLoader && ticketDetail && ticketDetail.length === 0 ? (
            <DataNotFound />
          ) : (
            <>{!statusofprogress === "INPROGRESS" ? <DataNotFound /> : ""}</>
          )}
        </Grid>
        {/* )} */}
      </Box>
    </>
  );
}

export default OpenTicket;
