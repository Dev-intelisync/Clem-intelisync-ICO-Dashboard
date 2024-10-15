import React, { useState, useEffect } from "react";
import {
  Grid,
  Box,
  Container,
  Typography,
  makeStyles,
  Button,
} from "@material-ui/core";
import Axios from "axios";
import FaqData from "@component/FaqData";
import ApiConfig from "../../../config/APIConfig";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  FAQ: {
    fontFamily: "Inter",
    padding: "60px 10px 0px 10px !important",
    background: "#fff",
    [theme.breakpoints.down("sm")]: {
      padding: "50px 10px 0px 10px !important",
    },

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
  },
  viewMore: {
    fontFamily: "Inter",
    width: "127px",
    height: "47px",
    border: "none",
    background: "#56CA00",
    borderRadius: "10px",
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: "12.6px",
    lineHeight: "20px",
    /* identical to box height, or 157% */

    textAlign: "center",
    letterSpacing: "0.18px",
  },
}));

export default function FAQ() {
  const classes = useStyles();
  const [faqData, setFaqData] = useState([]);
  const getFaqDataHandler = async () => {
    // setFaqDataLoader(true);

    try {
      const res = await Axios.get(ApiConfig.faqList, {
        params: {
          page: 0,
          limit: 4,
        },
      });
      console.log("ressadfdata", res);
      if (res.status === 200) {
        setFaqData(res?.data?.result);

        // setFaqDataLoader(false);
      }
    } catch (error) {
      // setFaqDataLoader(false);
      console.log("error", error);
    }
  };
  useEffect(() => {
    getFaqDataHandler();
  }, []);
  console.log(faqData.docs, "faqDataaa");
  return (
    <>
      <Box className={classes.FAQ}>
        <Box></Box>
        {/* featured */}
        <Box mb={2}>
          <Container maxWidth="lg">
            <Grid container spacing={3}>
              <Grid item lg={7} xs={12} md={12}>
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
                  {/* <Typography variant="h2">FAQ’s</Typography> */}
                  <img src="images/faq.svg" />
                </Box>
                <br />
                <Grid container spacing={1}>
                  {faqData?.docs &&
                    faqData?.docs.map((data, i) => {
                      return (
                        <Grid item lg={12} xs={12} sm={12} md={12} key={i}>
                          <FaqData data={data} index={i} />
                        </Grid>
                      );
                    })}
                </Grid>
                <Box align="start" mt={3}>
                  {faqData?.docs && faqData?.docs?.length > 4 && (
                    <Link to="faqs">
                      <Button className={classes.viewMore}>View All</Button>
                    </Link>
                  )}
                </Box>
              </Grid>
              <Grid
                item
                lg={5}
                xs={12}
                md={12}
                style={{
                  display: "flex",
                  paddingTop: "82px",
                }}
              >
                <Box>
                  <img src="./images/FaqImage.png" width="100%" alt="FAQ" />
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </>
  );
}
