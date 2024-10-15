import React, { useState } from "react";
import { Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { CheckCheck, Copy } from "lucide-react";

const useStyles = makeStyles((theme) => ({
  Div1: {
    width: "97%",
    borderRadius: "20px",
    padding: "25px",
    boxShadow:
      " rgba(0, 0, 0, 0.3) 0px 0px 5px 0px, rgba(0, 0, 0, 0.3) 0px 0px 1px 0px",
  },
  Div2: {
    width: "97%",
    height: "40%",
    borderRadius: "20px",
    padding: "32px 32px 0px 32px",
    boxShadow:
      " rgba(0, 0, 0, 0.3) 0px 0px 5px 0px, rgba(0, 0, 0, 0.3) 0px 0px 1px 0px",
  },

  Heading1: {
    fontSize: "24px",
    fontWeight: 700,
    paddingLeft: "10px",
    color: "rgba(2, 46, 55, 1)",
  },
  DivHeading: {
    borderLeft: "5px solid rgba(14, 173, 157, 1)",
    marginBottom: "16px",
  },
  Button: {
    marginTop: "20px",
    background: "rgba(14, 173, 157, 1)",
    borderRadius: "8px",
    textAlign: "center",
  },
  CopyInput: {
    display: "flex",
    border: "2px solid rgba(2, 46, 55, 0.25) ",
    borderRadius: "8px",

    "& input:focus-visible": {
      outline: "none" /* This removes the outline */,
    },
  },
  RemoveBorder: {
    "& input:focus-visible": {
      outline: "none" /* This removes the outline */,
    },
  },
  SocialMedia: {
    width: "90%",
    display: "flex",
    "@media (max-width: 1100px)": {
      display: "block",
    },
  },
  SocialMediaFrame: {
    display: "flex",
    "@media (max-width: 1100px)": {
      justifyContent: "space-evenly",
    },
  },
}));

export default function Airdrop() {
  const classes = useStyles();
  const tokenAdd = "0xbA11e536Ec577D5f42776D0324Ac97eaceFeCC40";
  const [copy, setCopy] = useState(true);
  return (
    <>
      <div className={classes.Div1} style={{ marginTop: "95px" }}>
        <div className={classes.DivHeading}>
          <Typography className={classes.Heading1}>
            Airdrop - Claim Tokens
          </Typography>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          paddingTop: "30px",
          gap: "20px",
        }}
      >
        <div className={classes.Div1}>
          <div className={classes.Other}>
            <div>
              <div className={classes.DivHeading}>
                <Typography
                  style={{
                    color: "rgba(6, 10, 37, 1)",
                    fontSize: "22px",
                    paddingLeft: "10px",
                    fontWeight: "700",
                  }}
                >
                  Airdrop Token
                </Typography>
              </div>
              <Typography
                style={{
                  fontSize: "18px",
                  color: "rgba(118, 130, 129, 0.889)",
                }}
              >
                Token Address :{" "}
                <span
                  style={{
                    color: "rgba(14, 173, 157, 1)",
                    fontWeight: 700,
                    fontSize: "15px",
                    display: "flex",
                    gap: "10px",
                  }}
                >
                  {tokenAdd}
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#56CA00"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="lucide lucide-copy"
                    >
                      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                    </svg>
                  </div>
                </span>
              </Typography>
              <div style={{ padding: "20px 0px" }}>
                <div>
                  <Typography
                    style={{
                      color: "#022E37",
                      fonFamily: "Inter",
                      fontSize: "18px",
                      fontWeight: 500,
                      lineHeight: "27px",
                      paddingBottom: "12px",
                    }}
                  ></Typography>
                </div>
                <div className={classes.RemoveBorder}>
                  <input
                    style={{
                      width: "94%",
                      padding: "20px",
                      borderRadius: "8px",
                      border: "2px solid rgba(2, 46, 55, 0.25)",
                      color: "#022E37", // Set text color to blue
                      textAlign: "center",
                    }}
                    placeholder="Enter Amount"
                    disabled
                    value="Coming Soon"
                  />
                </div>
              </div>
              <div>
                <div>
                  <Typography
                    style={{
                      color: "#022E37",
                      fonFamily: "Inter",
                      fontSize: "18px",
                      fontWeight: 500,
                      lineHeight: "27px",
                      paddingBottom: "12px",
                    }}
                  >
                    Enter Email Address :
                  </Typography>
                </div>
                <div className={classes.RemoveBorder}>
                  <input
                    style={{
                      width: "100%",
                      maxWidth: "94%",
                      padding: "20px",
                      borderRadius: "8px",
                      border: "2px solid rgba(2, 46, 55, 0.25) ",
                    }}
                    placeholder="Enter your Email address to subscribe for Airdrop"
                  ></input>
                </div>
              </div>
              <div className={classes.Button}>
                <Button
                  style={{ color: "#fff", fontSize: "22px", fontWeight: 600 }}
                >
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className={classes.Div2}>
          <div>
            <div style={{ borderLeft: "5px solid rgba(14, 173, 157, 1)" }}>
              <Typography
                style={{
                  color: "#060A25",
                  fontFamily: "Inter",
                  fontSize: "22px",
                  fontStyle: "normal",
                  fontWeight: 600,
                  lineHeight: "36px",
                  paddingLeft: "10px",
                  marginBottom: "20px",
                }}
              >
                CLEMENTINE Social Handles
              </Typography>
            </div>
            <div>
              <Typography
                style={{
                  color: "#022E37",
                  fonFamily: "Inter",
                  fontSize: "18px",
                  fontWeight: 500,
                  lineHeight: "27px",
                  paddingBottom: "12px",
                }}
              >
                Social Media Links:
              </Typography>
            </div>
          </div>
          <div>
            <Typography
              style={{
                color: "#022E37",
                fonFamily: "Inter",
                fontSize: "18px",
                fontWeight: 500,
                lineHeight: "27px",
                paddingBottom: "12px",
              }}
            ></Typography>
            <div className={classes.SocialMedia}>
              <div className={classes.SocialMediaFrame}>
                <div>
                  <img src="./images/whatsapp.png" alt="" width={"75%"} />
                </div>
                <div>
                  <img src="./images/ig.png" alt="" width={"75%"} />
                </div>
                <div>
                  <img src="./images/fb.png" alt="" width={"75%"} />
                </div>
              </div>
              <div className={classes.SocialMediaFrame}>
                <div>
                  <img src="./images/x.png" alt="" width={"75%"} />
                </div>
                <div>
                  <img src="./images/dcord.png" alt="" width={"75%"} />
                </div>
                <div>
                  <img src="./images/tele.png" alt="" width={"75%"} />
                </div>
              </div>
              {/* <div>
                <img src="./images/reddit.png" alt="" />
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}