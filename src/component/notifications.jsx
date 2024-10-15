import {
  Typography,
  Box,
  IconButton,
  Link,
  makeStyles,
} from "@material-ui/core";
import React, { useState, useContext } from "react";
import { BsArrowReturnRight, BsArrowReturnLeft } from "react-icons/bs";
import { GoUnverified } from "react-icons/go";

import { AuthContext } from "../context/Auth";
import LocalMallIcon from "@material-ui/icons/LocalMall";

import { Link as RouterLink, useHistory } from "react-router-dom";
import ConfirmationDialog from "../component/ConfirmationDialog";
import moment from "moment";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { SiGooglemessages } from "react-icons/si";
const useStyles = makeStyles((theme) => ({
  mainBox: {
    color: theme.palette.text.primary,
  },
}));
export default function NotificationsList({ data, popUp }) {
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const notificationsLinks = window.location.pathname;

  const auth = useContext(AuthContext);

  const confirmationHandler = () => {
    setOpen(false);
  };
  const classes = useStyles();
  return (
    <Box
      className={`${classes.mainBox} notication-list`}
      style={
        popUp
          ? {
              borderBottom: "1px solid #ccc",
              padding: "0px 5px 7px",
              position: "relative",
              color: "#000",
            }
          : {
              // borderBottom: "1px solid #ccc",
              padding: "0px 10px 0px",
              position: "relative",
              color: "#000",
              borderBottom: "1px solid #aca7a7",
            }
      }
    >
      {open && (
        <ConfirmationDialog
          open={open}
          handleClose={() => setOpen(false)}
          title={"title"}
          desc={"desc"}
          confirmationHandler={confirmationHandler}
        />
      )}
      <Box display="flex">
        <Box>
          <IconButton
            style={
              popUp
                ? data?.notificationType === "P2P Advertisement"
                  ? {
                      backgroundColor: "#fff",
                      marginRight: "12px",
                    }
                  : {
                      backgroundColor: "#fff",
                      marginRight: "12px",
                      color: "#3a96dd",
                    }
                : data?.notificationType === "P2P Advertisement"
                ? {
                    backgroundColor: "#8b7a7a",
                    marginRight: "12px",
                  }
                : {
                    backgroundColor: "rgb(80 94 105)",
                    marginRight: "12px",
                    color: "#fff",
                  }
            }
          >
            {data?.notificationType === "P2P Advertisement" && (
              <>
                <LocalMallIcon />
              </>
            )}
            {data?.transactionType === "TRANSFER" && (
              <>
                <BsArrowReturnLeft />
              </>
            )}
            {data?.transactionType === "DEPOSIT" && (
              <>
                <BsArrowReturnRight />
              </>
            )}
          </IconButton>
        </Box>
        <Link style={{ textDecoration: "none", width: "100%" }}>
          <Box style={{ width: "calc(100% - 50px)" }}>
            <Box className="rightPosition d-flex" style={{ marginTop: "6px" }}>
              <Typography
                variant="subtitle2"
                style={
                  popUp
                    ? { color: "#000000", fontFamily: "Inter" }
                    : { color: "" }
                }
                pt={2}
              >
                {data?.createdAt
                  ? moment(data.createdAt).format("MMMM Do YYYY, h:mm:ss a ")
                  : "0"}
              </Typography>
            </Box>
            <Box className="width120">
              {popUp ? (
                <>
                  <Box
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      if (data?.notificationType === "P2P Advertisement") {
                        history.push({
                          pathname: "/buy",
                          // state: data?.chatId?._id,
                          state: {
                            chatId: data?.chatId?._id,
                            userId: data?.userId?._id,
                            timeOut:
                              data?.p2pAdvertisementId?.paymentWindowTime,
                          },
                          search: data?.chatId?.receiverId,
                          hash: data?.p2pAdvertisementId?._id,
                        });
                      }
                    }}
                  >
                    <Typography
                      variant="subtitle2"
                      pt={2}
                      style={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        maxWidth: "400px",
                        color: "#000000",
                        fontFamily: "Inter",
                      }}
                    >
                      {data?.title}
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      style={{
                        color: "#000000",
                        fontFamily: "Inter",
                        textOverflow: "ellipsis",

                        maxWidth: "300px",
                      }}
                      pt={2}
                    >
                      {data?.description}
                    </Typography>
                  </Box>
                </>
              ) : (
                <>
                  <Box
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      if (data?.notificationType === "P2P Advertisement") {
                        history.push({
                          pathname: "/buy",
                          state: {
                            chatId: data?.chatId?._id,
                            userId: data?.userId?._id,
                            timeOut:
                              data?.p2pAdvertisementId?.paymentWindowTime,
                          },
                          search: data?.chatId?.receiverId,
                          hash: data?.p2pAdvertisementId?._id,
                        });
                      }
                    }}
                  >
                    <Typography
                      variant="subtitle2"
                      style={{
                        color: "#000000",
                        fontFamily: "Inter",
                      }}
                      pt={2}
                    >
                      {data?.title}
                    </Typography>

                    <Typography
                      variant="subtitle2"
                      style={{
                        color: "#000000",
                        fontFamily: "Inter",
                        textOverflow: "ellipsis",
                      }}
                      pt={2}
                    >
                      {data?.description}
                    </Typography>
                  </Box>
                  <br />
                </>
              )}
            </Box>
          </Box>
        </Link>
      </Box>
    </Box>
  );
}
