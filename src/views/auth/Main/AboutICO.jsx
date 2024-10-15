import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Container,
  makeStyles,
  Grid,
  Button,
} from "@material-ui/core";
import Axios from "axios";
import ApiConfig from "../../../config/APIConfig";
import { Link } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  mainbox: {
    padding: "60px 10px 0px 10px !important",
    background: "#fff",

    [theme.breakpoints.down("sm")]: {
      padding: "50px 10px 0px 10px !important",
    },

    "& h1": {
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
    "& h4": {
      fontFamily: "Inter",
      fontStyle: "normal",
      fontWeight: "400",
      fontSize: "16.0486px",
      lineHeight: "27px",
      letterSpacing: "0.180486px",
      color: "#000000",
      width: "100%",
      maxWidth: "1123px",
      textAlign: "justify",
    },
    "& .imagebox": {
      width: "100%",
      maxWidth: "670px",
      paddingTop: "78px",
      [theme.breakpoints.down("md")]: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      },
    },
    "& .leftside": {
      fontFamily: "Inter",
      backgroundColor: "#E9C856",
      padding: "15px",
      borderRadius: "5px",
      "& h3": {
        fontFamily: "Inter",
        color: "#000",
        fontSize: "30px",
        fontWeight: "700",
        lineHeight: "42px",
        [theme.breakpoints.down("md")]: {
          fontSize: "23px",
        },
        [theme.breakpoints.down("sm")]: {
          fontSize: "23px",
        },
      },
    },
    "& h2": {
      fontFamily: "Inter",
      fontSize: "18px",
      fontWeight: "300",
      marginBottom: "20px",
      lineHeight: "26px",
    },
  },
  gridflex: {
    [theme.breakpoints.down("md")]: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  },
  buyButton: {
    fontFamily: "Inter",
    border: "none",
    background: "#56CA00",
    borderRadius: "10px",
    width: "148.9px",
    height: "47px",
  },
}));

function AboutICO() {
  const classes = useStyles();
  const [aboutusData, setAboutusData] = useState([]);
  const getAboutusDataHandler = async () => {
    // setisloading(true);
    try {
      const res = await Axios.get(ApiConfig.StaticData, {});

      if (res.data.responseCode === 200) {
        setAboutusData(
          res.data.result.filter((data) => data?.type === "AboutUs")
        );

        // setisloading(false);
      }
    } catch (error) {
      console.log(error);
      // setisloading(false);
    }
  };
  useEffect(() => {
    getAboutusDataHandler();
  }, []);
  return (
    <Box className={classes.mainbox}>
      <Container>
        <Grid container spacing={3}>
          <Grid item md={6} sm={12} xs={12}>
            <Grid container>
              <Grid item xs={12}>
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
                  {/* <Typography variant="h1">About Us</Typography> */}
                  <img src="images/about.svg" />

                  <Box>
                    <br />{" "}
                    <Typography variant="h4">
                      {aboutusData[0]?.description && (
                        <div
                          className={classes.paragrahsec}
                          dangerouslySetInnerHTML={{
                            __html: aboutusData[0]?.description.substring(
                              0,
                              202
                            ),
                          }}
                        ></div>
                      )}
                    </Typography>
                  </Box>
                  <br />
                  <Link to="/About-Us">
                    {" "}
                    <Button className={classes.buyButton}>Learn More</Button>
                  </Link>
                </Box>
              </Grid>
            </Grid>
          </Grid>

          {/* <Grid lg={2} md={2}></Grid> */}
          <Grid item md={6} sm={12} xs={12} className={classes.gridflex}>
            <Box className="imagebox">
              <img src="images/toga1.png" alt="" width="100%" />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default AboutICO;
