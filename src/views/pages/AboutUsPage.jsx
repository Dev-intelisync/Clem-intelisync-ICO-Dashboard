import Page from "@component/Page";
import { Box, Typography, ListItem, List, Container } from "@material-ui/core";
import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core";
import { AuthContext } from "@context/Auth";
import DataNotFoundIMG from "../../component/DataNotFoundIMG";
import parse from "html-react-parser";
import Axios from "axios";
import ApiConfig from "../../config/APIConfig";
import ButtonCircularProgress from "@component/ButtonCircularProgress";
// import NoDataFound from "src/DataNotFound";

const useStyles = makeStyles((theme) => ({
  textboxs: {
    position: "relative",
    zIndex: "1",
    "& li": {
      position: "relative",

      fontSize: "14px",
      color: "#fff",
      fontWeight: "400",
      fontFamily: "Roboto, sans-serif",
      "&::after": {
        content: "''",
        position: "absolute",
        height: "5px",
        width: "5px",
        backgroundColor: " #44edd6",
        borderRadius: "50%",
        left: "-10px",
        // top: "14px",
      },
    },
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      maxWidth: "100%",
    },
  },
  textbox: {
    position: "relative",
    zIndex: "1",
    "& li": {
      position: "relative",

      fontSize: "14px",
      fontFamily: "Roboto, sans-serif",
      color: "#FF2626",
      fontWeight: "400",
      "&::after": {
        content: "''",
        position: "absolute",
        height: "5px",
        width: "5px",
        backgroundColor: " #44edd6",
        borderRadius: "50%",
        left: "-10px",
        // top: "14px",
      },
    },
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      maxWidth: "100%",
    },
  },
  paragrahsec: {
    "& p": {
      color: theme.palette.text.primary,
    },
  },
  headbox: {
    marginTop: "70px",
    minHeight: "36vh",
    background: theme.palette.background.About,

    "& h4": {
      color: theme.palette.text.primary,
      paddingTop: "15px",
    },
    "& h6": {
      color: theme.palette.text.primary,
    },

    "& a": {
      // color: "#b26b23",
      color: theme.palette.text.primary,
    },
  },
}));

export default function AboutUsPage() {
  const classes = useStyles();
  const parse = require("html-react-parser");
  const [terms, setTerms] = useState([]);
  const [aboutusData, setAboutusData] = useState([]);
  const auth = useContext(AuthContext);
  const userdata = auth.userData ? auth.userData : "";
  const [isloading, setisloading] = useState(false);
  const getAboutusDataHandler = async () => {
    setisloading(true);
    try {
      const res = await Axios.get(ApiConfig.StaticData, {});

      if (res.data.responseCode === 200) {
        setAboutusData(res.data.result[3]);

        setisloading(false);
      }
    } catch (error) {
      console.log(error);
      setisloading(false);
    }
  };
  useEffect(() => {
    getAboutusDataHandler();
  }, []);

  return (
    <Page title="About Us">
      <Box className={classes.headbox}>
        <Container>
          <Box pb={1} pt={2} className="termcondition">
            <Box textAlign="left">
              <Typography variant="h4">{aboutusData?.title}</Typography>
            </Box>
            {isloading ? (
              <ButtonCircularProgress />
            ) : (
              <Box mt={1}>
                {/* {aboutusData.map((data, i) => {
                  return ( */}
                <>
                  <Typography variant="h6" className={classes.paragrahsec}>
                    {aboutusData?.description && (
                      <div
                        dangerouslySetInnerHTML={{
                          __html: aboutusData?.description,
                        }}
                      ></div>
                    )}
                  </Typography>
                </>
                {/* );
                })} */}

                {aboutusData && aboutusData.length === 0 && <DataNotFoundIMG />}
              </Box>
            )}
          </Box>
        </Container>
      </Box>
    </Page>
  );
}
