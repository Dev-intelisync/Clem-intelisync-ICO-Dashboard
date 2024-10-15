import {
  Container,
  Box,
  Typography,
  makeStyles,
  Grid,
} from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  mainbox: {
    padding: "60px 10px 60px 10px !important",
    background: "#fff",
    "& h2": {
      fontFamily: "Inter",
      fontWeight: "700",
      fontSize: "36.0972px",
      lineHeight: "45px",
      /* identical to box height, or 125% */
      letterSpacing: "0.180486px",
      color: "#A63F9F",
      [theme.breakpoints.down("sm")]: {
        fontSize: "40px",
        lineHeight: "48px",
      },
      [theme.breakpoints.down("xs")]: {
        fontSize: "28px",
        lineHeight: "40px",
      },
    },
    "& .boxitem1": {
      padding: "20px",
      background: "#000000",
      border: "2px solid #E9C856",
      borderRadius: "27px",
    },
    "& .textbox": {
      "& h3": {
        fontFamily: "Inter",
        fontSize: "16px",
        fontWeight: "600",
        marginBottom: "20px",
        marginTop: "20px",
        color: "#E9C856",
      },
      "& h4": {
        fontFamily: "Inter",
        fontSize: "14px",
        fontWeight: "400",
      },
    },
  },
  imagesec: {
    "@media(min-width:920px)": {
      height: "75px",
      width: "6px",

      background:
        "linear-gradient(90deg, #ADADAD 9.84%, #B1B1B1 11.92%, #D9D9D9 32.7%, #F1F1F1 49.25%, #FAFAFA 59.4%, #F1F1F1 69.55%, #D9D9D9 86.1%, #B1B1B1 106.87%, #ADADAD 108.96%)",
      transform: "rotate(89.64deg)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      position: "absolute",
      top: "40px",
      marginLeft: "122px",
    },
  },
  imagesec1: {
    "@media(min-width:920px)": {
      height: "75px",
      width: "6px",
      background:
        "linear-gradient(90deg, #ADADAD 9.84%, #B1B1B1 11.92%, #D9D9D9 32.7%, #F1F1F1 49.25%, #FAFAFA 59.4%, #F1F1F1 69.55%, #D9D9D9 86.1%, #B1B1B1 106.87%, #ADADAD 108.96%)",
      transform: "rotate(89.64deg)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      position: "absolute",
      top: "122px",
      marginRight: "123px",
    },
  },
  imagesec2: {
    "@media(min-width:920px)": {
      height: "75px",
      width: "6px",

      background:
        "linear-gradient(90deg, #ADADAD 9.84%, #B1B1B1 11.92%, #D9D9D9 32.7%, #F1F1F1 49.25%, #FAFAFA 59.4%, #F1F1F1 69.55%, #D9D9D9 86.1%, #B1B1B1 106.87%, #ADADAD 108.96%)",
      transform: "rotate(89.64deg)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      position: "absolute",
      top: "415px",
      marginLeft: "122px",
    },
  },
  imagesec3: {
    "@media(min-width:920px)": {
      height: "75px",
      width: "6px",
      background:
        "linear-gradient(90deg, #ADADAD 9.84%, #B1B1B1 11.92%, #D9D9D9 32.7%, #F1F1F1 49.25%, #FAFAFA 59.4%, #F1F1F1 69.55%, #D9D9D9 86.1%, #B1B1B1 106.87%, #ADADAD 108.96%)",
      transform: "rotate(89.64deg)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      position: "absolute",
      top: "490px",
      marginRight: "123px",
    },
  },
}));

function Banner() {
  const classes = useStyles();
  return (
    <Box className={classes.mainbox}>
      <Container maxWidth="lg">
        <Box style={{ paddingBottom: "12px" }}>
          <Box
            style={{
              borderTop: "8px solid #000000",
              width: "82.12px",

              borderRadius: "8.12187px",
            }}
          ></Box>
        </Box>
        <Box>
          {/* <Typography variant="h2">Roadmap</Typography> */}
          <img src="images/roadmap.svg" />
        </Box>
        <br />
        <Grid container spacing={0}>
          <Grid item lg={9} xs={12} md={12}>
            {" "}
            <img src="./images/roadmap.png" width="100%" alt="FAQ" />
          </Grid>
          <Grid
            item
            lg={3}
            xs={12}
            md={12}
            style={{
              display: "flex",
            }}
          >
            {" "}
            <img src="./images/path.png" width="100%" alt="FAQ" />
          </Grid>{" "}
        </Grid>
      </Container>
    </Box>
  );
}

export default Banner;
