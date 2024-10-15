import React, { useState, useEffect, useContext } from "react";
import NotificationsList from "@component/notifications";
import {
  Grid,
  Box,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  makeStyles,
} from "@material-ui/core";
import Page from "@component/Page";
import Axios from "axios";
import ApiConfig from "../../../config/APIConfig";
import { toast } from "react-toastify";
import ButtonCircularProgress from "@component/ButtonCircularProgress";
import { AuthContext } from "@context/Auth";
import { useHistory, Link } from "react-router-dom";
import { UserContext } from "@context/User";

const useStyles = makeStyles((theme) => ({
  Titlemain: {
    color: theme.palette.text.nofiction,
  },
  heading: {
    fontFamily: "Inter",
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: "36px",
    lineHeight: "54px",
    /* identical to box height */

    color: "#FFFFFF",
    [theme.breakpoints.down("sm")]: {
      padding: "20px 16px 20px 16px",
      marginTop: "30px",
      fontSize: "25px",
      borderRadius: "16px",
    },
  },
}));

export default function Notifications({ popUp }) {
  const auth = useContext(AuthContext);
  const user = useContext(UserContext);
  const userdata = auth.userData ? auth.userData : "";
  const [open, setopen] = useState(false);
  const classes = useStyles();
  const [count, setCount] = useState([]);
  const [idd, setIdd] = useState("");
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const idd1 = user?.notificationList[0]?._id;
  const clearNotifictionList = async (idd1) => {
    try {
      setIsLoading(true);
      const res = await Axios({
        method: "DELETE",
        url: ApiConfig.deleteNotificationList,
        headers: {
          token: window.localStorage.getItem("token"),
        },
        params: {
          // _id: ,
        },
      });
      if (res.data.responseCode === 200) {
        toast.success(res.data.responseMessage);
      } else {
        toast.warn(res.data.responseMessage);
      }
      setIsLoading(false);
    } catch (error) {
      console.log("ERROR", error);
      toast.error("something went wrong");
      setIsLoading(false);
    }
  };

  return (
    <Page title="Notifications">
      <Box className="classes.notificationHeading">
        <Box mb={3}>
          <Box
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {popUp ? (
              ""
            ) : (
              <>
                <Box display="flex" className="notificationbox">
                  <Typography
                    className={classes.heading}
                    pt={2}
                    style={{
                      marginTop: "20px",
                      fontSize: "30px",
                      // color: "#1D2D3F",
                    }}
                  >
                    Notifications
                  </Typography>
                </Box>
              </>
            )}
            {popUp
              ? ""
              : user?.notificationList &&
                user?.notificationList.length !== 0 && (
                  <Box
                    style={{
                      display: "flex",
                      justifyContent: "end",
                      marginBottom: "-24px",
                    }}
                  >
                    {/* <Button
                      style={{ color: "#848484" }}
                      onClick={() => setopen(true)}
                    >
                      clear all
                    </Button> */}
                  </Box>
                )}
          </Box>
          <Box
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {popUp ? (
              <Box display="flex" className="notificationbox">
                <Typography
                  variant="h3"
                  style={{ color: "#000000", fontFamily: "Inter" }}
                  pt={2}
                >
                  Notifications
                </Typography>
              </Box>
            ) : (
              ""
            )}

            {popUp &&
              user?.notificationList &&
              user?.notificationList.length !== 0 && (
                <Box
                  pt={1}
                  style={{
                    display: "flex",
                    justifyContent: "end",
                  }}
                  textAlign="right"
                >
                  {/* <Button onClick={() => setopen(true)}>clear all</Button> */}
                  &nbsp;
                  <Button
                    onClick={() => {
                      history.push({
                        pathname: "/notifications",
                      });
                    }}
                  >
                    View all
                  </Button>
                </Box>
              )}
          </Box>
        </Box>
        {isLoading ? (
          <ButtonCircularProgress />
        ) : (
          <Grid
            container
            spacing={4}
            sm={12}
            style={
              popUp
                ? {
                    margin: "0",
                  }
                : {
                    margin: "0",
                    background: "#ffffff",
                    borderRadius: "15px",
                  }
            }
          >
            {popUp
              ? user?.notificationList &&
                user?.notificationList?.slice(0, 4).map((data, i) => {
                  return (
                    <Grid
                      item
                      xs={12}
                      sm={12}
                      md={12}
                      key={i}
                      style={{ padding: "15px 0" }}
                    >
                      <NotificationsList popUp={popUp} data={data} index={i} />
                    </Grid>
                  );
                })
              : user?.notificationList &&
                user?.notificationList?.map((data, i) => {
                  return (
                    <Grid item xs={12} sm={12} md={12} key={i}>
                      <NotificationsList popUp={popUp} data={data} index={i} />
                    </Grid>
                  );
                })}
          </Grid>
        )}
        {popUp ? (
          <>
            {" "}
            {!isLoading &&
              user?.notificationList &&
              user?.notificationList.length === 0 && (
                <Box style={{}}>
                  <Typography variant="h3" style={{ fontSize: "15px" }}>
                    No Data Found
                  </Typography>
                </Box>
              )}
          </>
        ) : (
          ""
        )}
      </Box>
      <div>
        <Dialog
          open={open}
          onClose={() => setopen(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          fullWidth
          maxWidth="xs"
        >
          <DialogTitle id="alert-dialog-title">
            <Typography
              align="center"
              variant="h5"
              className={classes.Titlemain}
            >
              Clear All Notification
            </Typography>
          </DialogTitle>
          <DialogContent>
            <DialogContentText
              className={classes.colorBox}
              id="alert-dialog-description"
            >
              <Typography
                align="center"
                variant="h5"
                className={classes.Titlemain}
              >
                Are you want to sure clear notification
              </Typography>
            </DialogContentText>
          </DialogContent>
          <DialogActions style={{ display: "flex", justifyContent: "center" }}>
            <Box>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => setopen(false)}
                autoFocus
                style={{ padding: "1px 20px" }}
              >
                No
              </Button>
              &nbsp;&nbsp;&nbsp;
              <Button
                variant="contained"
                color="primary"
                style={{ padding: "5px 20px", textTransform: "capitalize" }}
                onClick={() => clearNotifictionList()}
              >
                Yes
              </Button>
            </Box>
          </DialogActions>
        </Dialog>
      </div>
      {popUp ? (
        ""
      ) : (
        <>
          {!isLoading &&
            user?.notificationList &&
            user?.notificationList.length === 0 && (
              <Box
                style={{
                  display: "flex",
                  justifyContent: "center",
                  width: "center",
                  marginTop: "20px",
                }}
              >
                <Typography variant="h3" style={{ fontSize: "18px" }}>
                  No Data Found
                </Typography>
              </Box>
            )}
        </>
      )}
    </Page>
  );
}
