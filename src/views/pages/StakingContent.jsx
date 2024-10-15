import Page from "@component/Page";
import { Box, Typography, ListItem, List, Container } from "@material-ui/core";
import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core";
import Axios from "axios";
import ApiConfig from "../../config/APIConfig";
import { toast } from "react-toastify";
import { AuthContext } from "@context/Auth";
// import DataNotFoundIMG from "@component/DataNotFoundIMG";
import ButtonCircularProgress from "@component/ButtonCircularProgress";
// import NoDataFound from "src/DataNotFound";
import StakingCrypto from "@views/auth/Main/StakingCrypto";
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
      },
    },
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      maxWidth: "100%",
    },
  },
  headbox: {
    marginTop: "70px",
    minHeight: "36vh",
    background: theme.palette.background.stakeing,

    "& h4": {
      color: theme.palette.text.primary,
      paddingTop: "24px",
    },
    "& a": {
      color: "#b26b23",
    },
  },
  paragrahsec: {
    color: theme.palette.text.primary,
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
        setAboutusData(res.data.result[2]);

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
    <Page title="Privacy Policy">
      <Box className={classes.headbox}>
        <Container>
          <Box className="termcondition">
            <StakingCrypto />
          </Box>
        </Container>
      </Box>
    </Page>
  );
}
