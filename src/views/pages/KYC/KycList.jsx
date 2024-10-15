import React, { useState, useEffect, useContext } from "react";
import { Button, Grid, Box } from "@material-ui/core";
import Page from "@component/Page";
import { FaPlus } from "react-icons/fa";
import { useHistory, Link as RouterLink } from "react-router-dom";

import { makeStyles } from "@material-ui/core";

import Axios from "axios";
import ApiConfig from "../../../config/APIConfig";
import { AuthContext } from "@context/Auth";
import KycView from "./KycView";
const useStyles = makeStyles((theme) => ({
  root: {
    paddingRight: 0,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
  inputAdornment: {
    backgroundColor: "#FDB95A",
    height: 40,
    maxHeight: 40,
    paddingRight: 10,
    paddingLeft: 10,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
  KycButton: {
    color: theme.palette.text.primary,
  },
  Div2: {
    width: "97%",
    height: "40%",
    borderRadius: "20px",
    padding: "32px 32px 20px 32px",
    boxShadow:
      " rgba(0, 0, 0, 0.3) 0px 0px 5px 0px, rgba(0, 0, 0, 0.3) 0px 0px 1px 0px",
  },
}));

export default function KycList() {
  const classes = useStyles();
  const history = useHistory();
  const [kycData, setKycData] = useState({});

  const [isLoading, setLoader] = useState(false);
  const auth = useContext(AuthContext);
  // useEffect(() => {
  //   if (!window.localStorage.getItem("token")) {
  //     history.push("/login");
  //   }
  // }, [window.localStorage.getItem("token")]);

  const getKycList = async () => {
    setLoader(true);
    try {
      const res = await Axios.get(ApiConfig.getKycList, {
        headers: {
          token: window.localStorage.getItem("token"),
        },
      });
      if (res.data.responseCode === 200) {
        setKycData(res.data.result);
        setLoader(false);
      }
    } catch (error) {
      setLoader(false);
    }
  };
  useEffect(() => {
    getKycList();
  }, []);

  return (
    <Page >
      <Box mb={3} className="bankbox" style={{ marginTop: "20px" }}>
        <Box>
          <Box mb={3}>
            <Grid container>
              <Grid item xs={12} md={2}>
                <Box mt={2}>
                  {kycData?.approveStatus === "PENDING" ||
                  kycData?.approveStatus === "REJECT" ||
                  kycData?.approveStatus === "APPROVE" ? (
                    ""
                  ) : (
                    <Button
                      className={classes.KycButton}
                      style={{
                        border: "1px dashed #56CA00",
                        // color: "#000",
                        borderRadius: 10,
                        paddingLeft: 15,
                        paddingRight: 15,
                        marginBottom: 10,
                        marginTop:"15px",
                      }}
                      onClick={() => window.open("/add-kyc")}
                    >
                      <FaPlus />
                      &nbsp;&nbsp;Add KYC
                    </Button>
                  )}
                </Box>
              </Grid>
            </Grid>
          </Box>
          <div className={classes.Div2}>
            <p>
              <strong>KYC (Know Your Customer) Quick Tour:</strong>
            </p>
            <p>
              Firstly KYC is important procedure which you have to complete .
              For completing it you can click on <strong>+ Add KYC</strong>{" "}
              button on left-top of the KYC dashboard screen & complete the extensive KYC form.
            </p>

            <p>
              <strong>Definition:- </strong>
              KYC is a process designed to verify the identity of customers to
              ensure they are who they claim to be. It is a crucial step in
              financial services, online platforms, and various industries.
            </p>

            <p>
              <strong>Key Components:</strong>-{" "}
              <strong>Identity Verification:</strong> Collecting official
              documents such as government IDs, passports, or utility bills. -{" "}
              <strong>Biometric Verification:</strong> Using fingerprints,
              facial recognition, or other biometric data for identity
              confirmation. - <strong>Customer Due Diligence (CDD):</strong>{" "}
              Evaluating the customer's risk profile, transaction patterns, and
              business relationships.
            </p>

            <p>
              <strong>Importance:</strong>- <strong>Fraud Prevention:</strong>{" "}
              KYC helps prevent identity theft, fraud, and financial crimes by
              ensuring that customers are legitimate. -{" "}
              <strong>Regulatory Compliance:</strong> Many industries are
              required by law to perform KYC to comply with anti-money
              laundering (AML) and counter-terrorist financing (CTF)
              regulations. - <strong>Customer Safety:</strong> Protects
              customers by safeguarding their personal information and financial
              transactions.
            </p>

            <p>
              <strong>Process:</strong>- <strong>Data Collection:</strong>{" "}
              Gather required information and documents from customers. -{" "}
              <strong>Verification:</strong> Cross-verify details using reliable
              sources and databases. - <strong>Risk Assessment:</strong>{" "}
              Evaluate the risk associated with the customer based on their
              profile. - <strong>Continuous Monitoring:</strong> Regularly
              update and monitor customer information for any changes.
            </p>

            <p>
              <strong>KYC in Various Sectors:</strong>-{" "}
              <strong>Financial Institutions:</strong> Banks and other financial
              entities use KYC to comply with regulations and reduce financial
              crime. - <strong>Online Platforms:</strong> E-commerce,
              cryptocurrency exchanges, and social media platforms implement KYC
              to enhance user security. - <strong>Telecommunications:</strong>{" "}
              Mobile service providers use KYC to activate SIM cards and prevent
              misuse.
            </p>

            <p>
              <strong>Challenges:</strong>- <strong>Data Security:</strong>{" "}
              Safeguarding customer data is a primary concern to prevent
              breaches. - <strong>User Experience:</strong> Balancing security
              measures with a seamless user experience is crucial for customer
              satisfaction.
            </p>

            <p>
              In summary, KYC is a vital process that not only ensures
              regulatory compliance but also protects businesses and customers
              from potential risks associated with identity fraud and financial
              crimes.
            </p>
          </div>
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            {kycData?.approveStatus === "PENDING" ||
            kycData?.approveStatus === "REJECT" ||
            kycData?.approveStatus === "APPROVE" ? (
              <KycView kycData={kycData} />
            ) : (
              ""
            )}
          </Grid>
        </Grid>
      </Box>
    </Page>
  );
}
