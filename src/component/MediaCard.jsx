import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import moment from "moment";

import {
  makeStyles,
  Paper,
  Typography,
  Box,
  Button,
  IconButton,
  Grid,
} from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import GradeIcon from "@material-ui/icons/Grade";
import ShareIcon from "@material-ui/icons/Share";
import { Link } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  root: {
    border: "1px solid #80808038",
    cursor: "pointer",
    position: "relative",
    background: "#1d16169e",
    boxShadow: "rgb(0 0 0 / 16%) 0px 1px 4px",
    transition: "0.3s",
    borderRadius: "20px",

    paddingBottom: "30px",
    position: "relative",
    margin: "0 5px",
    overflow: "hidden",
    "&:hover": {
      // boxShadow: " rgba(149, 157, 165, 0.2) 0px 8px 24px",
      boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
      filter: "drop-shadow(0px 0px 40px rgba(0, 0, 0, 0.25))",
      // background: "#fff",
    },
    "& a": {
      position: "absolute",
      bottom: "10px",
      right: "15px",
      color: "#ff1919c9",
      fontSize: "14px",
    },
    "& p": {
      fontSize: "12px",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
    "& h2": {
      // fontSize: "12px",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
    "& .basecontent": {
      padding: "15px",
    },
  },
  text: {
    whiteSpace: "pre",
    textOverflow: "ellipsis",
    overflow: "hidden",
    width: "calc(100% - 5px)",
    color: "#fff",
  },
  mainimg: {
    width: "100%",
    height: "190px ",
    overflow: "hidden",
    backgroundPosition: "center !important",
    backgroundSize: "cover !important",
    backgroundRepeat: " no-repeat !important",
    borderRadius: "5px 5px 0px 0px",
    backgroundColor: "#ccc !important",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
}));

function ExploreCard(props) {
  const classes = useStyles();
  const history = useHistory();
  const { data, type, index } = props;
  const updateDimensions = () => {
    var offsetWidth = document.getElementById("imagecard" + index).offsetWidth;
    var newoofsetWidth = offsetWidth - 80;
    document.getElementById("imagecard" + index).style.height =
      newoofsetWidth + "px";
  };
  useEffect(() => {
    updateDimensions();
  }, [data, index]);
  useEffect(() => {
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);
  return (
    <>
      <Paper className={classes.root} elevation={0}>
        <Box
          id={`imagecard${index}`}
          className={classes.mainimg}
          style={
            data?.imageUrl
              ? { background: "url(" + data?.imageUrl + ")" }
              : { background: "url(" + "images/market_detail.png" + ")" }
          }
          // onClick={() => {
          //   history.push("/author");
          // }}
        ></Box>

        <Box className="basecontent" pb={2}>
          <Grid container spacing={1}>
            <Grid item xs={7} sm={8} align="left">
              <Typography variant="h6" className={classes.text}>
                {data?.title}
              </Typography>
            </Grid>
            <Grid item xs={5} sm={4} align="right">
              <Typography variant="body1">
                {" "}
                {moment(data?.publishedTime).format("DD-MM-YYYY")}
                {/* {data.updateTime} */}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} align="right">
              <Box
                style={{
                  height: "40px",
                  overflow: "hidden",
                  marginTop: "-13px",
                }}
              >
                <Typography
                  variant="body2"
                  align="left"
                  style={{
                    textOverflow: "ellipsis",
                    minHeight: " 20px",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    lineHeight: "12px",
                  }}
                >
                  {/* {data?.description} */}
                  {data?.description && (
                    <div
                      dangerouslySetInnerHTML={{ __html: data?.description }}
                    ></div>
                  )}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <a
          href={data?.url}
          target="_blank"
          style={{ textDecoration: "none", cursor: "pointer" }}
        >
          Read More
        </a>
      </Paper>
    </>
  );
}

export default ExploreCard;
