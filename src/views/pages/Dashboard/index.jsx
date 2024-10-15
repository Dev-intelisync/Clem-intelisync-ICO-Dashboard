import React, { useState, useRef, useContext } from "react";
import {
  Typography,
  Button,
  TableContainer,
  Table,
  Select,
  TableRow,
  TableCell,
  MenuItem,
  TableBody,
  TableHead,
  Grid,
} from "@material-ui/core";
// import { AuthContext } from "src/context/Auth";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory, Link as RouterLink } from "react-router-dom";
import Axios from "axios";
// import ApiConfig from "src/config/APICongig";
import { toast } from "react-toastify";
// import ButtonCircularProgress from "src/component/ButtonCircularProgress";
// import { UserContext } from "src/context/User";
// import {  Clementine_Dashboard } from "/public/images/ Clementine-dashboard.svg";

const useStyles = makeStyles((theme) => ({
  textWrapper2: {
    color: "#060A25",
    fontWeight: 700,
    fontSize: "18px",
    fontFamily: "Inter",
  },
  textWrapper2N2: {
    color: "#060A2580",
    fontWeight: 700,
    fontSize: "20px",
    fontFamily: "Inter",
  },
  Frame: {
    paddingTOp: "40px",
    display: "flex",
    justifyContent: "space-between",
  },
  div: {
    textAlign: "center",
  },
}));
export default function (props) {
  // const auth = useContext(AuthContext);
  // const user = useContext(UserContext);
  const classes = useStyles();
  const data = [
    {
      stage: "1. Seed",
      period: "20 Jan, 2025",
      USDC: "1 CLEM ",
      USDT: "1 CLEM ",
      matic: "$0.05 per CLEM",
    },
    {
      stage: "2. Pre-Sale",
      period: "20 Jan, 2025",
      USDC: "1 CLEM ",
      USDT: "1 CLEM ",
      matic: "$0.05 per CLEM",
    },
    {
      stage: "3. Pre-Sale",
      period: "20 Jan, 2025",
      USDC: "1 CLEM ",
      USDT: "1 CLEM ",
      matic: "$0.05 per CLEM",
    },

    {
      stage: "4. Pre-Sale",
      period: "20 Jan, 2025",
      USDC: "1 CLEM ",
      USDT: "1 CLEM ",
      matic: "$0.05 per CLEM",
    },
  ];

  return (
    <div>
      <div
        style={{
          padding: "20px 20px 0px 20px",
          borderRadius: "20px",
          boxShadow:
            " rgba(0, 0, 0, 0.3) 0px 0px 5px 0px, rgba(0, 0, 0, 0.3) 0px 0px 1px 0px",
          marginTop: "95px",
        }}
      >
        <div style={{ borderLeft: "5px solid #56CA00", marginBottom: "20px" }}>
          <Typography
            style={{
              color: "#060A25",
              fontFamily: "Inter",
              fontSize: "22px",
              fontStyle: "normal",
              fontWeight: 700,
              paddingLeft: "10px",
            }}
          >
            {" "}
            ICO Roadmap
          </Typography>
        </div>
        <div className={classes.Frame}>
          <Grid className={classes.div} xs={2} md={2} lg={2} xl={2}>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                paddingBottom: "15px",
              }}
            >
             <div className="circle-wrapper">
  <div
    style={{
      borderRadius: "200px",
      padding: "10px 17px",
      color: "#56CA00",
      fontWeight: "700",
      fontFamily: "Inter",
      border: "4px solid #56CA00",
      position: "relative",
    }}
  >
    1
  </div>
</div>
       
            </div>

            <div className="div-2">
              <div className={classes.textWrapper2}>Seed</div>
              <p
                style={{
                  color: "rgba(2, 46, 55, 1)",
                  fontFamily: "Inter",
                  fontWeight: 500,
                  fontSize: "14px",
                  lineHeight: "25px",
                }}
              >
                Enter the Token address and approve
              </p>
            </div>
          </Grid>
          <Grid className={classes.div} xs={2} md={2} lg={2} xl={2}>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                paddingBottom: "15px",
              }}
            >
             <div className="circle-wrapper1">

              <div
                className="text-wrapper1"
                style={{
                  borderRadius: "200px",
                  padding:"10px 15px",
                  
                  fontWeight: "700",
                  fontFamily: "Inter",
                  color: "#B6C1C6",

                  backgroundColor: "#022E370D",
                  border: "4px solid #B6C1C6",
                }}
              >
               
                2
              </div>
            </div>
            </div>
            <div className="div-3">
              <div className={classes.textWrapper2}>Pre-Sale</div>
              <div
                className="text-wrapper-3"
                style={{
                  paddingTop: "20px",
                  color: "rgba(2, 46, 55, 1)",
                  fontFamily: "Inter",
                  fontWeight: 500,
                  fontSize: "14px",
                  lineHeight: "27px",
                }}
              >
                Release of token information  Clementine.
              </div>
            </div>
          </Grid>
          <Grid className={classes.div} xs={2} md={2} lg={2} xl={2}>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                paddingBottom: "15px",
              }}
            >
             <div className="circle-wrapper1">

              <div
                className="text-wrapper1"
                style={{
                  borderRadius: "200px",
                  padding:"10px 15px",
                  fontWeight: "700",
                  fontFamily: "Inter",
                  color: "#B6C1C6",

                  backgroundColor: "#022E370D",
                  border: "4px solid #B6C1C6",
                }}
              >
                3
              </div>
              </div>
            </div>
            <div className="div-3">
              <div className={classes.textWrapper2}>ICO Phase-1</div>
              <p
                style={{
                  color: "rgba(2, 46, 55, 1)",
                  fontFamily: "Inter",
                  fontWeight: 500,
                  fontSize: "14px",
                  lineHeight: "27px",
                }}
              >
                  Clementine on ICO Dashboard.
              </p>
            </div>
          </Grid>
          <Grid className={classes.div} xs={2} md={2} lg={2} xl={2}>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                paddingBottom: "15px",
              }}
            >
             {/* <div className="circle-wrapper"> */}

              <div
                style={{
                  borderRadius: "200px",
                  padding:"10px 15px",
                  color: "#B6C1C6",
                  fontWeight: "700",
                  fontFamily: "Inter",
                  backgroundColor: "#022E370D",
                  border: "4px solid #B6C1C6",
                }}
              >
                4
                </div>
              {/* </div> */}
            </div>
            <div className="div-3">
              <div className={classes.textWrapper2N2}>ICO Phase-2</div>
              <div
                className="text-wrapper-6"
                style={{
                  color: "#022E3740",
                  paddingTop: "20px",
                  fontFamily: "Inter",
                  fontWeight: 500,
                  fontSize: "14px",
                  lineHeight: "27px",
                }}
              >
                Submit your presale
              </div>
            </div>
          </Grid>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          gap: "32px",
          paddingTop: "32px",
        }}
      >
        <div style={{ width: "50%" }}>
          <div
            style={{
              padding: "28px 32px",
              borderRadius: "20px",
              boxShadow:
                " rgba(0, 0, 0, 0.3) 0px 0px 5px 0px, rgba(0, 0, 0, 0.3) 0px 0px 1px 0px",
            }}
          >
            <div style={{ borderLeft: "5px solid #56CA00" }}>
              <Typography
                style={{
                  color: "#060A25",
                  fontFamily: "Inter",
                  fontSize: "22px",
                  fontStyle: "normal",
                  fontWeight: 700,
                  paddingLeft: "10px",
                }}
              >
                Coin Information
              </Typography>
            </div>
            <div
              style={{
                borderBottom: "2px solid rgba(2, 46, 55, 0.2)",
                display: "flex",
                justifyContent: "space-between",
                paddingTop: "40px",
              }}
            >
              <div>
                <Typography
                  style={{
                    fontFamily: "Inter",
                    fontSize: "15px",
                    fontWeight: "500",
                    color: "rgba(2, 46, 55, 1)",
                    padding:"5px 0px",
                  }}
                >
                  Issuer
                </Typography>
              </div>
              <div>
                <Typography
                  style={{
                    fontFamily: "Inter",
                    fontSize: "15px",
                    fontWeight: "600",
                    color: "rgba(6, 10, 37, 1)",
                  }}
                >
                   Clementine Blockchain
                </Typography>
              </div>
            </div>
            <div
              style={{
                borderBottom: "2px solid rgba(2, 46, 55, 0.2)",
                display: "flex",
                justifyContent: "space-between",
                padding:"5px 0px",
              }}
            >
              <div>
                <Typography
                  style={{
                    fontFamily: "Inter",
                    fontSize: "15px",
                    fontWeight: "500",
                    color: "rgba(2, 46, 55, 1)",
                  }}
                >
                  Token Symbol
                </Typography>
              </div>
              <div>
                <Typography
                  style={{
                    fontFamily: "Inter",
                    fontSize: "15px",
                    fontWeight: "600",
                    color: "rgba(6, 10, 37, 1)",
                  }}
                >
                  CLEM (Clementine)
                </Typography>
              </div>
            </div>
            <div
              style={{
                borderBottom: "2px solid rgba(2, 46, 55, 0.2)",
                display: "flex",
                justifyContent: "space-between",
                padding:"5px 0px",
              }}
            >
              <div>
                <Typography
                  style={{
                    fontFamily: "Inter",
                    fontSize: "15px",
                    fontWeight: "500",
                    color: "rgba(2, 46, 55, 1)",
                  }}
                >
                  Circulating ICO Supply
                </Typography>
              </div>
              <div>
                <Typography
                  style={{
                    fontFamily: "Inter",
                    fontSize: "15px",
                    fontWeight: "600",
                    color: "rgba(6, 10, 37, 1)",
                  }}
                >
                  $ 1 Billion
                </Typography>
              </div>
            </div>
            <div
              style={{
                borderBottom: "2px solid rgba(2, 46, 55, 0.2)",
                display: "flex",
                justifyContent: "space-between",
                padding:"5px 0px",
              }}
            >
              <div>
                <Typography
                  style={{
                    fontFamily: "Inter",
                    fontSize: "15px",
                    fontWeight: "500",
                    color: "rgba(2, 46, 55, 1)",
                  }}
                >
                  Hard Cap
                </Typography>
              </div>
              <div>
                <Typography
                  style={{
                    fontFamily: "Inter",
                    fontSize: "15px",
                    fontWeight: "600",
                    color: "rgba(6, 10, 37, 1)",
                  }}
                >
                  $ 10 Million
                </Typography>
              </div>
            </div>
            <div
              style={{
                borderBottom: "2px solid rgba(2, 46, 55, 0.2)",
                display: "flex",
                justifyContent: "space-between",
                padding:"5px 0px",
              }}
            >
              <div>
                <Typography
                  style={{
                    fontFamily: "Inter",
                    fontSize: "15px",
                    fontWeight: "500",
                    color: "rgba(2, 46, 55, 1)",
                  }}
                >
                  Total Supply
                </Typography>
              </div>
              <div>
                <Typography
                  style={{
                    fontFamily: "Inter",
                    fontSize: "15px",
                    fontWeight: "600",
                    color: "rgba(6, 10, 37, 1)",
                  }}
                >
                  3,000,000,000 CLEM
                </Typography>
              </div>
            </div>
            <div
              style={{
                borderBottom: "2px solid rgba(2, 46, 55, 0.2)",
                display: "flex",
                justifyContent: "space-between",
                padding:"5px 0px",
              }}
            >
              <div>
                <Typography
                  style={{
                    fontFamily: "Inter",
                    fontSize: "15px",
                    fontWeight: "500",
                    color: "rgba(2, 46, 55, 1)",
                  }}
                >
                  Accepted Currencies
                </Typography>
              </div>
              <div>
                <Typography
                  style={{
                    fontFamily: "Inter",
                    fontSize: "15px",
                    fontWeight: "600",
                    color: "rgba(6, 10, 37, 1)",
                  }}
                >
                  USDT
                </Typography>
              </div>
            </div>
            <div
              style={{
                borderBottom: "2px solid rgba(2, 46, 55, 0.2)",
                display: "flex",
                justifyContent: "space-between",
                 padding:"5px 0px",
              }}
            >
              <div>
                <Typography
                  style={{
                    fontFamily: "Inter",
                    fontSize: "15px",
                    fontWeight: "500",
                    color: "rgba(2, 46, 55, 1)",
                  }}
                >
                  Eligiblity
                </Typography>
              </div>
              <div>
                <Typography
                  style={{
                    fontFamily: "Inter",
                    fontSize: "15px",
                    fontWeight: "600",
                    color: "rgba(6, 10, 37, 1)",
                  }}
                >
                  Minimum Buy: 10 USDT
                </Typography>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div>
            <TableContainer style={{ borderRadius: "20px" }}>
              <Table aria-label="simple table" style={{ minWidth: "600px" }}>
                <TableHead style={{ background: "#4957b6" }}>
                  <TableRow>
                    <TableCell
                      align="center"
                      style={{
                        background: "#56CA00",
                      }}
                    >
                      Stage:{" "}
                    </TableCell>
                    <TableCell
                      align="center"
                      style={{ background: "#56CA00" }}
                    >
                       Token ICO:{" "}
                    </TableCell>
                    <TableCell
                      align="center"
                      style={{ background: "#56CA00",width:"100px" }}
                    >
                      Token Alloc:
                    </TableCell>
                    {/* <TableCell
                      align="center"
                      style={{ background: "#56CA00" }}
                    >
                      USDT:
                    </TableCell> */}
                    <TableCell
                      align="center"
                      style={{ background: "#56CA00" }}
                    >
                      Price per MATIC:
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody style={{ background: "#ffffff" }}>
                  {data.map((item, index) => (
                    <TableRow key={index} className={classes.tables}>
                      <TableCell align="center" style={{ fontSize: "14px",textAlign:"center",borderBottom: "2px solid rgba(2, 46, 55, 0.2)",

                       }}>
                        {item.stage}
                      </TableCell>
                      <TableCell align="center" style={{ fontSize: "14px",
                borderBottom: "2px solid rgba(2, 46, 55, 0.2)",

                       }}>
                        {item.period}
                      </TableCell>
                      <TableCell align="center" style={{ fontSize: "14px",textAlign:"center",
                borderBottom: "2px solid rgba(2, 46, 55, 0.2)",

                      }}>
                        {item.USDC}
                      </TableCell>
                   
                      <TableCell align="center" style={{ fontSize: "14px",
                borderBottom: "2px solid rgba(2, 46, 55, 0.2)",

                       }}>
                        {item.matic}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <div
              style={{
                background: "#00273C",
                padding: "20px 32px",
                display: "flex",
                justifyContent: "space-between",
                borderRadius: "10px",
                gap:"20px",
                alignItems: "center",
                marginTop:"40px",
              }}
            >
              <div>
                <img src="/images/Clementine.svg" alt=" Clementine" />
              </div>
              <div>
                <Button
                  style={{
                    background: "#56CA00",
                    fontSize:"16px",
                    borderRadius:"20px",
                  }}
                >
                  <img src="/images/Icon_Buy.svg" alt="dollar" style={{ marginRight:"10px",}}/>
                  Buy Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
