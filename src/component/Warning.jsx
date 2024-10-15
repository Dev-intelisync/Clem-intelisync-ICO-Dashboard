import {
  Box,
  Container,
  DialogActions,
  TextField,
  Dialog,
  DialogContent,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  Button,
  Input,
  Hidden,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
const useStyles = makeStyles((theme) => ({
  imgbox: {
    "& figure": {
      overflow: "hidden",
      "& img": {
        maxHeight: "100%",
        maxWidth: "100%",
        height: "auto",
        width: "auto",
        display: "block",
        borderRadius: "25px",
      },
    },
  },
  grid: {
    padding: "10px",
  },
  logintext: {
    "& h5": {
      color: theme.palette.secondary.main,
      fontStyle: "normal",
      fontWeight: "bold",
      fontSize: "20px",
      lineHeight: "27px",
    },
  },
  namefiled: {
    display: "flex",

    "& button": {
      marginRight: "10px",
      padding: "20px",
      borderRadius: "14px",
      height: "52px",
    },
  },
  textfield: {
    background: "#F4F4F4",
    background: "#F4F4F4",
    borderRadius: "14px",
    padding: "20px",
  },
}));
const Warning = ({ onClose }) => {
  const classes = useStyles();

  return (
    <Grid container spacing={2} className={classes.grid} alignItems="center">
      <Hidden xsDown>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <Box
            className={classes.imgbox}
            style={{ maxHeight: "100%", minHeight: "100%" }}
          >
            <figure>
              <img ..="/images/onlycamimg.png" alt="" />
            </figure>
          </Box>
        </Grid>
      </Hidden>
      <Grid item lg={6} md={6} sm={12} xs={12}>
        <Box mt={3}>
          <figure>
            <img ..="/images/settingicon.png" alt="" />
          </figure>
        </Box>
        <Box className={classes.logintext} mt={4}>
          <Typography variant="h5">
            ARE YOU OVER THE AGE OF 18, AND THE LEGAL AGE OF MAJORITY FOR YOUR
            JURISDICTION?
          </Typography>
        </Box>
        <Box className={classes.namefiled} mt={4}>
          <Button
            onClick={() => {
              localStorage.setItem("isAdult", false);
              onClose();
            }}
            variant="contained"
            size="large"
            color="primary"
          >
            No
          </Button>
          <Button
            onClick={() => {
              localStorage.setItem("isAdult", true);
              onClose();
            }}
            variant="contained"
            size="large"
            color="secondary"
          >
            Yes
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Warning;
