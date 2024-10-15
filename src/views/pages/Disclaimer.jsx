import Page from "@component/Page";
import { Box, Typography, ListItem, List, Container } from "@material-ui/core";
import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core";
import Axios from "axios";
import ApiConfig from "../../config/APIConfig";
import { toast } from "react-toastify";
import { AuthContext } from "@context/Auth";
import ButtonCircularProgress from "@component/ButtonCircularProgress";
import DataNotFoundIMG from "@component/DataNotFoundIMG";
const useStyles = makeStyles((theme) => ({
  textboxs: {
    position: "relative",
    zIndex: "1",
    "& li": {
      position: "relative",

      fontSize: "14px",
      color: "#ffffff",
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
  headbox: {
    marginTop: "70px",
    minHeight: "calc(100vh - 200px)",
    background: theme.palette.background.About,

    "& h4": {
      color: theme.palette.text.primary,
      paddingTop: "50px",
    },
    "& a": {
      color: "#b26b23",
    },
    "& p": {
      color: theme.palette.text.primary,
    },
  },
}));

export default function PrivacyPolicy() {
  const classes = useStyles();

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
        // setAboutusData(res?.data?.result[1]);
        setAboutusData(
          res.data.result.filter((data) => data?.type === "Declaimer")
        );

        setisloading(false);
      }
    } catch (error) {
      setisloading(false);
    }
  };
  useEffect(() => {
    getAboutusDataHandler();
  }, []);

  return (
    <Page title="Disclaimer">
      <Box className={classes.headbox}>
        <Container maxWidth="md">
          <Box className="termcondition">
            <Box textAlign="left" mt={2}>
              <Typography variant="h4">{aboutusData[0]?.title}</Typography>
            </Box>

            {isloading ? (
              <ButtonCircularProgress />
            ) : (
              <Box style={{ height: "100%" }}>
                {/* {aboutusData.map((data, i) => {
                  return ( */}
                <>
                  <Typography variant="body1" className={classes.paragrahsec}>
                    {aboutusData[0]?.description && (
                      <div
                        className={classes.paragrahsec}
                        dangerouslySetInnerHTML={{
                          __html: aboutusData[0]?.description,
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
