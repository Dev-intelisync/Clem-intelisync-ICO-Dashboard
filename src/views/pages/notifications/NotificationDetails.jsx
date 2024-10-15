import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Container, Box, Typography, Grid, Button } from "@material-ui/core";
import Page from "@component/Page";
function NotificationDetail(props) {
  const history = useHistory();

  // useEffect(() => {
  //   if (!window.localStorage.getItem("token")) {
  //     history.push("/login");
  //   }
  // }, [window.localStorage.getItem("token")]);
  const notificationData = props.location && props.location.state?.data;

  return (
    <Page title="Tutorial">
      <Box mb={3} className="bankbox">
        <Box m={4}>
          <Container maxWidth="lg">
            <Box mb={3} className="notificationbox">
              <Typography variant="h5">Notification Detail</Typography>
            </Box>
            <Grid container>
              <Grid item sm={6}>
                <img
                  src="/images/login.png"
                  style={{ width: "100%", maxWidth: 380 }}
                  alt=""
                />
              </Grid>
              <Grid item sm={12}>
                <Typography variant="subtitle2" className="extra-bold">
                  {notificationData && notificationData.date}
                </Typography>

                <Typography variant="body2" className="extra-bold">
                  {notificationData && notificationData.title}
                </Typography>
                <Typography variant="subtitle2" className="">
                  {notificationData && notificationData.Message}
                </Typography>
              </Grid>
            </Grid>
            <Box textAlign="right">
              <Button
                variant="outlined"
                onClick={() => history.push("/notifications")}
              >
                Back
              </Button>
            </Box>
          </Container>
        </Box>
      </Box>
    </Page>
  );
}

export default NotificationDetail;
