import React, { useState, useEffect, useContext } from "react";
import { Box, Typography, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";

import LeftTab from "@views/pages/Banking/LeftTab/index";
import RightTab from "@views/pages/Banking/RightTab/index";
import { toast } from "react-toastify";
import Axios from "axios";
import ApiConfig from "../../../config/APIConfig";
import { AuthContext } from "@context/Auth";
import Page from "@component/Page";

const useStyles = makeStyles((theme) => ({
  withdrawbox: {
    background:
      "linear-gradient(180deg, rgba(0, 172, 235, 0.1) 0%, rgba(0, 176, 237, 0.1) 10.18%, rgba(16, 105, 194, 0.1) 70.35%, rgba(16, 105, 194, 0.1) 100%)",
    border: "1px solid #6ECFF3",
    padding: "40px",
    borderRadius: "5px",

    [theme.breakpoints.down("xs")]: {
      padding: "15px",
    },

    "& .subtextbox": {
      position: "relative",
      "& h4": {
        fontWeight: "500",
        color: theme.palette.background.yellow,
        position: "absolute",
        left: 0,
        top: 0,
        "@media(max-width:768px)": {
          position: "relative",
          textAlign: "center",
          marginBottom: "10px",
        },
      },
    },
  },
  maincontainer: {
    marginBottom: "20px",

    "& h3": {
      fontSize: "24px",
      fontWeight: "600",
      color: theme.palette.text.primary,
      marginBottom: "15px",
      marginTop: "20px",
    },
    "& h6": {
      color: theme.palette.text.primary,
      // width: "100%",
      // maxWidth: "987px",
      // width: "100%",
      fontSize: "18px",
      fontWeight: "400",
    },
  },
  borderright: {
    position: "relative",
    "&::after": {
      content: " '' ",
      height: "350px",
      width: "37px",
      position: "absolute",
      right: "0px",
      top: "93px",
      borderRight: "1px solid #1069C2",
      [theme.breakpoints.down("sm")]: {
        height: "0px",
      },
    },
  },
}));
function Banking() {
  const classes = useStyles();
  const auth = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [upiBankData, setBankUPIDataList] = useState([]);
  const [roleBankStatus, setBankStatus] = useState("IFSC");
  const [roleupiStatus, setupiStatus] = useState("UPI");

  const addUPIHAndler = async (values) => {
    setIsLoading(true);

    try {
      const res = await Axios({
        method: "POST",
        url: ApiConfig.addBank,
        headers: {
          token: window.localStorage.getItem("token"),
        },
        data: {
          holderName: values.accountHolderName,
          upiId: values.upiId,
          bankType: "UPI",
          idType: roleupiStatus,
        },
      });
      if (res.data.responseCode === 200) {
        toast.success("UPI details added successfully ");
        setIsLoading(false);
        uPIAccountListDataUpi();
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const addBankHandler = async (values) => {
    try {
      setIsLoading(true);

      const res = await Axios({
        method: "POST",
        url: ApiConfig.addBank,
        headers: {
          token: window.localStorage.getItem("token"),
        },
        data: {
          holderName: values.accountHolderName,
          accountNumber: values.accountNo.toString(),
          bankName: values.bankName,
          ifscCode: values.ifscCode,
          bankType: "BANK",
          swiftCode: values.Swift ? values.Swift : "string",
          shortCode: values.Short ? values.Short : "string",
          bankAddress: values.Address,
          bankCode: roleBankStatus,
          // upiId: "string",
        },
      });
      if (res.data.responseCode === 200) {
        toast.success(res.data.responseMessage);
        setIsLoading(false);
        auth.userAccountListData();
        uPIAccountListDataUpi();
      } else if (res.data.status === 201) {
        toast.warn(res.data.message);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const uPIAccountListDataUpi = async () => {
    try {
      const res = await Axios({
        method: "GET",

        url: ApiConfig.listBank,
        headers: {
          token: window.localStorage.getItem("token"),
        },
      });
      if (res.data.responseCode === 200) {
        setBankUPIDataList(res.data.result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    uPIAccountListDataUpi();
  }, []);

  const [tabview, setTabView] = useState("Bank");
  return (
    <>
      <Page title="Banking">
        <Box className={classes.maincontainer}>
          <Typography variant="h3">Banking</Typography>
        </Box>
        <Box pb={5}>
          <Box className={classes.withdrawbox}>
            <Grid container spacing={1}>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <Box className={classes.borderright}>
                  <LeftTab
                    upiBankData={upiBankData}
                    uPIAccountListDataUpi={uPIAccountListDataUpi}
                  />{" "}
                </Box>
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                {" "}
                <Box>
                  <RightTab
                    addUPIHAndler={addUPIHAndler}
                    isLoading={isLoading}
                    addBankHandler={addBankHandler}
                    upiBankData={upiBankData}
                    roleBankStatus={roleBankStatus}
                    setBankStatus={setBankStatus}
                    roleupiStatus={roleupiStatus}
                    setupiStatus={setupiStatus}
                  />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Page>
    </>
  );
}

export default Banking;
