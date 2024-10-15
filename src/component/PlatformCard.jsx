import {
  Container,
  Box,
  Typography,
  makeStyles,
  Button,
  Grid,
} from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  mainbox: {
    marginTop: "100px",
    "& .imagebox": {
      background: "#C1B29B",
      border: " 4px solid #352611",
      borderRadius: "10px",
      padding: "20px",
      boxSizing: "border-box",
    },
    "& .circle": {
      width: "60px",
      height: "60px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: "100%",
    },
    "& h6": {
      fontSize: "24px",
      fontWeight: "700",
      color: "#000",
      marginTop: "15px",
      marginBottom: "15px",
    },
    "& h5": {
      fontSize: "14px",
      fontWeight: "400",
      color: "#000",
      textAlign: "left",
    },
  },
}));

function Banner(props) {
  const classes = useStyles();
  const { data } = props;
  return (
    <Box className={classes.mainbox}>
      <Box className="imagebox">
        <Box display="flex" justifyContent="center" alignItems="center">
          <Box className="circle" style={{ backgroundColor: "#fff" }}>
            <Box>
              <img
                ..={data.img1}
                alt=""
                width="100%"
                style={{ width: "100%", maxWidth: "40px" }}
              />
            </Box>
          </Box>
        </Box>
        <Box textAlign="center">
          <Typography variant="h6">{data.text1}</Typography>
          <Typography variant="h5">{data.text2}</Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default Banner;
