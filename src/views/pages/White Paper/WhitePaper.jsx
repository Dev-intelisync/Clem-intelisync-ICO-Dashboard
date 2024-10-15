import React from "react";
import { makeStyles } from "@material-ui/core";
import { Typography, Button } from "@material-ui/core";
// import Poster from "images/GDCCLogo1.svg";
import Copy from "../AirDropModule/images/copy.png";
import Ig from "../AirDropModule/images/ig.png";
import X from "../AirDropModule/images/x.png";
import FB from "../AirDropModule/images/fb.png";
import Discord from "../AirDropModule/images/dcord.png";
import Tele from "../AirDropModule/images/tele.png";
import Reddit from "../AirDropModule/images/reddit.png";
import whitepaper from "./white_pappers.pdf";

const useStyles = makeStyles(() => ({
  Typography: {
    padding: "20px 22px",
    borderRadius: "20px",
    boxShadow:
      " rgba(0, 0, 0, 0.3) 0px 0px 5px 0px, rgba(0, 0, 0, 0.3) 0px 0px 1px 0px",
  },
  Heading2: {
    color: " #060A25",
    fontFamily: "Inter",
    fontSize: "22px",
    fontStyle: "normal",
    fontWeight: 600,
    lineHeight: "36px",
    textTransform: "capitalize",
  },
  ImageCage: {
    display: "flex",
    gap: "25px",
  },
}));

function Index() {
  const classes = useStyles();
  const downloadWhitepaper = function () {
    const link = document.createElement("a");
    link.href = whitepaper;
    link.download = "Whitpaper.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <div style={{ display: "flex", gap: "20px", paddingTop: "95px"  }}>
        <div style={{ width: "60%", }}>
          <div style={{backgroundColor:"#050503", display:"flex",justifyContent:"center",borderRadius:"15px",padding:"50px 0px"}}>
            <img
              src="images/CLEMENTINESITEBARLOGO.svg"
              alt="poster"
              style={{ width: "200px",}}
            />
          </div>
          <div
            style={{
              marginTop: "20px",
              padding: "20px 10px  0px 22px",
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
                  fontWeight: 600,
                  lineHeight: "33px",
                  paddingLeft: "10px",
                }}
              >
              Clementine: Whitepaper
              </Typography>
            </div>

            <Typography
              style={{
                fontFamily: "Inter",
                fontSize: "16px",
                fontWeight: 500,
                lineHeight: "36px",
                padding: "20px 0px",
                color: "#060A2580",
              }}
            >
           Clementine is a blockchain-based platform designed to revolutionize the carbon credit trading market.Clementine aims to create a more efficient, accessible, and trustworthy marketplace for individuals and businesses to buy, sell, and trade carbon credits.

<br></br>To learn more about Clementine and its innovative features, download our whitepaper today.
            </Typography>
          </div>
        </div>
        <div style={{ width: "60%" }}>
          <div className={classes.Typography} style={{ height: "55%" }}>
            <div
              style={{ borderLeft: "5px solid #56CA00", marginBottom: "15px" }}
            >
              <Typography
                style={{ paddingLeft: "10px" }}
                className={classes.Heading2}
              >
                Download Whitepaper
              </Typography>
            </div>
            <div style={{ textAlign: "center", padding: "10px" }}>
              <img src={Copy} alt="copy" width={"150px"} height={"150px"} />
            </div>

            <div>
              <div
                onClick={downloadWhitepaper}
                style={{
                  background: "#56CA00",
                  width: "100%",
                  borderRadius: "15px",
                  display:"flex",
                    gap:"10px",
                    justifyContent:"center",
                    alignItems:"center",
                }}
              >
                <div
                  style={{
                    color: "#FFF",
                    fontFamily: "Inter",
                    fontSize: "18px",
                    fontStyle: "normal",
                    fontWeight: 600,
                    lineHeight: "33px",
                    textTransform: "capitalize",
                    
                  }}
                >
                  Download{"     "}
                </div>
                <div>
                  <svg
                    style={{ padding: "5px 10px" }}
                    xmlns="http://www.w3.org/2000/svg"
                    width="31"
                    height="30"
                    viewBox="0 0 31 30"
                    fill="none"
                  >
                    <path
                      d="M21.2375 14.25H19.25V8C19.25 7.3125 18.6875 6.75 18 6.75H13C12.3125 6.75 11.75 7.3125 11.75 8V14.25H9.7625C8.65 14.25 8.0875 15.6 8.875 16.3875L14.6125 22.125C15.1 22.6125 15.8875 22.6125 16.375 22.125L22.1125 16.3875C22.9 15.6 22.35 14.25 21.2375 14.25ZM6.75 26.75C6.75 27.4375 7.3125 28 8 28H23C23.6875 28 24.25 27.4375 24.25 26.75C24.25 26.0625 23.6875 25.5 23 25.5H8C7.3125 25.5 6.75 26.0625 6.75 26.75Z"
                      fill="white"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className={classes.Typography} style={{ marginTop: "32px" }}>
            <div style={{ borderLeft: "5px solid #56CA00" }}>
              <Typography
                style={{
                  paddingLeft: "10px",
                  color: "#060A25",
                  fontFamily: "Inter",
                  fontSize: "22px",
                  fontStyle: "normal",
                  fontWeight: 600,
                  lineHeight: " 36px",
                  marginBottom: "20px",
                }}
              >
                CLEMENTINE Socials
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
                {/* Social Media Links: */}
              </Typography>
            </div>
            <div className={classes.ImageCage}>
              <div>
                <a
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={Ig} alt="Instagram"  width={"80%"} />
                </a>
              </div>
              <div>
                <a
                  href="https://www.linkedin.com/company/laxcecrypto/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={FB} alt="Facebook"  width={"80%"} />
                </a>
              </div>
              <div>
                <a
                  href="https://twitter.com/LAXCECRYPTO"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={X} alt="X"  width={"80%"} />
                </a>
              </div>
              <div>
                <a
                  href="https://www.discord.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={Discord} alt="Discord"  width={"80%"} />
                </a>
              </div>
              <div>
                <a
                  href="https://t.me/LAXCECRYPTO"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={Tele} alt="Telegram"  width={"80%"} />
                </a>
              </div>
              <div>
                <a
                  href="https://www.reddit.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={Reddit} alt="Reddit"  width={"80%"} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Index;
