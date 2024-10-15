import { Typography, Box, Grid } from "@material-ui/core";
import React, { useContext } from "react";
import moment from "moment";
import { AuthContext } from "../context/Auth";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  imageSection: {
    marginTop: "1rem",
    borderRadius: "10px",
    "& img": {
      minHeight: "149px",
      maxHeight: "200px",
      borderRadius: "10px",
      "@media(max-width: 600px)": {
        height: "100%",
        minHeight: "100%",
        maxHeight: "100%",
      },
    },
  },
}));

export default function KycCard({ data, index }) {
  const user = useContext(AuthContext);
  const classes = useStyles();

  return (
    <>
      <Box
        style={
          index % 2 === 0
            ? {
                background:
                  "radial-gradient(34% 57.15% at 92.64% 16%, rgba(254, 184, 90, 0.3) 0%, rgba(254, 184, 90, 0) 100%), rgba(27, 26, 31, 0.6)",
                borderRadius: 16,
                padding: 20,
                minHeight: 95,
              }
            : {
                background:
                  "radial-gradient(34% 57.15% at 92.64% 16%, rgba(32, 191, 169, 0.3) 0%, rgba(32, 191, 169, 0) 100%), rgba(27, 26, 31, 0.6)",
                borderRadius: 16,
                padding: 20,
                minHeight: 95,
              }
        }
      >
        <Box>
          <Typography variant="body2" className="extra-bold">
            Name : {user?.userData?.firstName} {user?.userData?.lastName}
          </Typography>
          {data?.documentStatus === "PENDING" && (
            <Typography variant="body2" style={{ color: "orange" }}>
              Status : {data?.documentStatus ? data?.documentStatus : ""}
            </Typography>
          )}
          {data?.documentStatus === "ACCEPTED" && (
            <Typography variant="body2" style={{ color: "green" }}>
              Status : {data?.documentStatus ? data?.documentStatus : ""}
            </Typography>
          )}

          {data.data?.documentStatus === "REJECTED" && (
            <Typography variant="body2" style={{ color: "red" }}>
              Rejected Reason : {data?.reason ? data?.reason : "N/A"}
            </Typography>
          )}
          <Box>
            <Typography variant="body2">
              Document Name : {data?.docName ? data?.docName : ""}
            </Typography>
            <Typography variant="body2">
              Country : {user?.userData?.country}
            </Typography>
            <Typography variant="body2">
              Email : {user?.userData?.email}
            </Typography>
            <Typography
              variant="caption"
              paragraph
              style={{ marginTop: ".3rem" }}
            >
              {/* {data?.updateTime ? data?.updateTime : ""} */}
              {data?.updateTime
                ? moment(data.updateTime).format("MMMM Do YYYY, h:mm:ss a ")
                : "0"}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box style={{ marginTop: ".8rem" }}>
        <Typography>Added Documents :</Typography>
      </Box>
      <Grid container spacing={3}>
        <Grid item lg={6} md={6} sm={6} xs={12}>
          <Box className={classes.imageSection}>
            <img
              ..={data?.frontIdUrl}
              alt=""
              width="100%"
              style={{ height: "150px" }}
            />
          </Box>
        </Grid>
        <Grid item lg={6} md={6} sm={6} xs={12}>
          <Box className={classes.imageSection}>
            <img
              ..={data?.backIdUrl}
              alt=""
              width="100%"
              style={{ height: "150px" }}
            />
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
