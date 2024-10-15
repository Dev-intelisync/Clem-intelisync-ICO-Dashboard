import React, { useState, useEffect } from "react";
import {
  makeStyles,
  Box,
  Typography,
  Grid,
  IconButton,
  Button,
  Dialog,
} from "@material-ui/core";
import UpdateReplySupportTicket from "./UpdateReplySupportTicket";
import ButtonCircularProgress from "../component/ButtonCircularProgress";
import { FaEdit } from "react-icons/fa";
import Axios from "axios";
import moment from "moment";
import ApiConfig from "../config/APIConfig";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .topBox": {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-start",
      "& h6": {
        color: "#244273",
      },
    },
  },
  ChatTextBox: {
    width: "fit-content",
    "& .textBox": {
      position: "relative",
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
      "& .edittoshow": {
        width: "fix-content",
        position: "absolute",
        bottom: "-20px",
        right: "0px",
      },
    },
    "& svg": {
      display: "none",
    },
    "&:hover": {
      "& svg": {
        display: "block",
      },
    },
  },
}));

function AdminSupportReplyData(props) {
  const classes = useStyles();
  const {
    ticket_ID,
    setSelectedMessage,
    handleapiclick,
    sethandleapiclick,
    data12,
  } = props;
  const [isLoader, setIsLoader] = useState(false);
  const [ticketReplyData, setTicketReplyData] = useState([]);
  const [openReplyEdit, setOpenReplyEdit] = useState(false);
  const [replyTicketIdd, setReplyTicketIdd] = useState();
  const handleOpenEditText = (data) => {
    setOpenReplyEdit(true);
    setReplyTicketIdd(data);
  };
  const handleCloseEditText = (data) => {
    setOpenReplyEdit(false);
  };
  const getTicketReplyData = async () => {
    setIsLoader(true);
    try {
      const res = await Axios({
        method: "GET",
        url: ApiConfig.getReplySupportTicketData,
        params: {
          ticketId: ticket_ID,
        },
        headers: {
          token: window.sessionStorage.getItem("token"),
        },
      });
      if (res.data.status === 200) {
        setIsLoader(false);
        setTicketReplyData(res.data?.data);
        sethandleapiclick(false);
      } else {
        setIsLoader(false);
      }
    } catch {
      setIsLoader(false);
    }
  };

  useEffect(() => {
    if (ticket_ID || handleapiclick) {
      getTicketReplyData();
    }
  }, [ticket_ID, handleapiclick]);

  const download = (data) => {
    var element = document.createElement("a");
    var file = new Blob([`${data?.imageUrl}`], { type: "image/*" });
    element.href = URL.createObjectURL(file);
    element.download = `${data?.imageUrl}`;
    element.click();
  };
  function checkMessgaeState(message) {
    try {
      const isMessageImage = message.includes("https://");
      if (isMessageImage) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <Box className={classes.root}>
        <Grid item xs={12} align="right">
          {" "}
          {data12?.role === "USER" && data12?.description !== "" ? (
            <>
              <Box className={classes.ChatTextBox}>
                <label align="left">You</label>
                <Box className="textBox">
                  <Typography variant="h6" align="left">
                    {data12?.message ? data12?.message : data12?.description}
                  </Typography>{" "}
                  <Box>
                    {data12?.imageUrl || data12?.image ? (
                      <>
                        <img
                          ..={
                            data12?.imageUrl ? data12?.imageUrl : data12?.image
                          }
                          style={{ height: "113px" }}
                        ></img>
                      </>
                    ) : (
                      ""
                    )}
                  </Box>
                  <Box
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    {data12?.imageUrl || data12?.image ? (
                      <Button
                        style={{ marginRight: "25px" }}
                        href={
                          data12?.imageUrl ? data12?.imageUrl : data12?.image
                        }
                        download
                        onClick={(data) => download(data)}
                      >
                        Download Image
                      </Button>
                    ) : (
                      ""
                    )}
                    <Typography variant="body1" align="right">
                      {data12?.create_at
                        ? moment(data12.create_at).format("lll")
                        : ""}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </>
          ) : (
            " "
          )}
        </Grid>
        {isLoader ? (
          <ButtonCircularProgress />
        ) : (
          <>
            {ticketReplyData &&
              ticketReplyData?.map((data, index) => {
                return (
                  <Grid container spacing={0} key={index}>
                    <Grid item xs={12} align="left">
                      {" "}
                      {data?.role === "ADMIN" && data?.message !== "" ? (
                        <>
                          <Box className={classes.ChatTextBox}>
                            <label>Admin</label>
                            <Box className="textBox">
                              {data?.message &&
                              checkMessgaeState(data?.message) ? (
                                <>
                                  <img
                                    ..={data?.message}
                                    alt=""
                                    style={{ height: "113px" }}
                                  />
                                </>
                              ) : (
                                <Typography variant="h6" align="left">
                                  {data?.message}
                                </Typography>
                              )}
                              <Box
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "space-between",
                                }}
                              >
                                {data?.message &&
                                checkMessgaeState(data?.message) ? (
                                  <>
                                    <Button
                                      style={{ marginRight: "25px" }}
                                      href={
                                        data?.imageUrl
                                          ? data?.imageUrl
                                          : data?.message
                                      }
                                      download
                                      onClick={(data) => download(data)}
                                    >
                                      Download Image
                                    </Button>
                                  </>
                                ) : (
                                  ""
                                )}
                                <Typography variant="body1" align="right">
                                  {" "}
                                  {data?.createdAt
                                    ? moment(data.createdAt).format("lll")
                                    : ""}
                                </Typography>
                              </Box>
                            </Box>
                          </Box>
                        </>
                      ) : (
                        " "
                      )}
                    </Grid>
                    <Grid item xs={12} align="right">
                      {" "}
                      {data?.role === "USER" && data?.message !== "" ? (
                        <>
                          <Box className={classes.ChatTextBox}>
                            <label align="left">You</label>
                            <Box className="textBox">
                              <Typography variant="h6" align="left">
                                {data?.message
                                  ? data?.message
                                  : data?.description}
                                <IconButton
                                  onClick={() =>
                                    handleOpenEditText(
                                      data?.ticketReplyId
                                        ? data?.ticketReplyId
                                        : data?.ticket_Id
                                    )
                                  }
                                >
                                  <FaEdit style={{ fontSize: "10px" }} />
                                </IconButton>
                              </Typography>{" "}
                              <Box>
                                {data?.imageUrl || data?.image ? (
                                  <>
                                    <img
                                      ..={
                                        data?.imageUrl
                                          ? data?.imageUrl
                                          : data?.image
                                      }
                                      style={{ height: "113px" }}
                                    ></img>
                                  </>
                                ) : (
                                  ""
                                )}
                              </Box>
                              <Box
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "space-between",
                                }}
                              >
                                {data?.imageUrl || data?.image ? (
                                  <>
                                    <Button
                                      style={{ marginRight: "25px" }}
                                      href={
                                        data?.imageUrl
                                          ? data?.imageUrl
                                          : data?.image
                                      }
                                      download
                                      onClick={(data) => download(data)}
                                    >
                                      Download Image
                                    </Button>
                                  </>
                                ) : (
                                  ""
                                )}
                                <Typography variant="body1" align="right">
                                  {data?.createdAt
                                    ? moment(data.createdAt).format("lll")
                                    : ""}
                                </Typography>
                              </Box>
                              <Box className="edittoshow">
                                {data?.isEdited === true ? (
                                  <>
                                    <Typography variant="body1">
                                      Edited
                                    </Typography>
                                  </>
                                ) : (
                                  " "
                                )}
                              </Box>
                            </Box>
                            {openReplyEdit &&
                              replyTicketIdd === data?.ticketReplyId && (
                                <>
                                  <Dialog
                                    open={openReplyEdit}
                                    onClose={() => setOpenReplyEdit(false)}
                                    id={replyTicketIdd}
                                    maxWidth="sm"
                                    fullWidth
                                  >
                                    <UpdateReplySupportTicket
                                      ticketReply_Idd={replyTicketIdd}
                                      getTicketReplyData={getTicketReplyData}
                                      handleCloseEditText={handleCloseEditText}
                                    />
                                  </Dialog>
                                </>
                              )}
                          </Box>
                        </>
                      ) : (
                        " "
                      )}
                    </Grid>
                  </Grid>
                );
              })}
          </>
        )}
      </Box>
    </>
  );
}

export default AdminSupportReplyData;
