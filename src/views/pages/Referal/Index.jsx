import React, { useContext, useState, useEffect } from "react";
// import { makeStyles } from "@material-ui/core/styles";
import { CheckCheck, Copy } from "lucide-react";
import { AuthContext } from "../../../context/Auth";
import Axios from "axios";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaTelegramPlane } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import {
  FacebookShareButton,
  TelegramShareButton,
  EmailShareButton,
  TwitterShareButton,
} from "react-share";
import {
  Box,
  Typography,
  Button,
  TextField,
  makeStyles,
  Dialog,
  DialogContent,
} from "@material-ui/core";

import ApiConfig from "./../../../config/APIConfig";
import { toast } from "react-toastify";

const useStyles = makeStyles((theme) => ({
  Div1: {
    width: "97%",
    borderRadius: "20px",
    padding: "32px",
    boxShadow:
      " rgba(0, 0, 0, 0.3) 0px 0px 5px 0px, rgba(0, 0, 0, 0.3) 0px 0px 1px 0px",
  },
  Div2: {
    width: "120%",
    height: "50%",
    borderRadius: "20px",
    padding: "32px 32px 0px 32px",
    boxShadow:
      " rgba(0, 0, 0, 0.3) 0px 0px 5px 0px, rgba(0, 0, 0, 0.3) 0px 0px 1px 0px",
  },

  Heading1: {
    fontSize: "22px",
    fontWeight: 700,
    paddingLeft: "10px",
    color: "rgba(2, 46, 55, 1)",
  },
  DivHeading: {
    display: "flex",
    flexDirection: "space-between",
    borderLeft: "5px solid rgba(14, 173, 157, 1)",
    marginBottom: "16px",
  },
  Button: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    marginTop: "20px",
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
  HollowBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "10px",
    justifyContent: "center",
    padding: "10px",
    height: "110px",
    width: "25%",
    gap: "10px",
    border: "2px solid #56CA00",
    borderRadius: "10px",
  },
  BlueBox: {
    display: "flex",
    flexDirection: "column",
    background: "#56CA00",
    alignItems: "center",
    justifyContent: "center",
    padding: "10px",
    height: "110px",
    width: "25%",
    gap: "10px",
    borderRadius: "10px",
  },
  BoxFrame: {
    display: "flex",
    gap: "10px",
  },
  DialogBoxBack: {
    color: theme.palette.text.primary,
  },
}));

export default function Referal() {
  const classes = useStyles();
  const auth = useContext(AuthContext);
  const [refreralCode, setReferalCode] = useState();
  const [isloading, setisloading] = useState(false);
  const [referralData, setReferralData] = useState();
  const [totalReferaal, setTotalreferaal] = useState("");
  const [openModal, setOpenModal] = useState(false);


  const fetchReferralData = async ()=>{

    try{  
      
      const jwtToken = localStorage.getItem('token');
      console.log(jwtToken);
  
      
      
      
      const res = await Axios.get(ApiConfig.userRefferalData , {
        headers : {
          'token' : jwtToken
        }
   }) 


       console.log(res);
  
  
   if(res?.data?.responseCode == 200){
         setReferralData(res?.data?.result);

        //  console.log(res?.data.result)
   }
    
    
    
    }catch(error){
        console.log("Something went wrong...");
      }
  
  
  
     
    }
  
    useEffect(()=>{
      fetchReferralData();  
  } , [])

  const handleClose = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    if (auth?.userData?.referralCode) {
      setReferalCode(auth?.userData?.referralCode);
    }
  }, [auth?.userData?.myRefferalCode]);





   const copyUrl =  ()=>{


  
  let textField = document.createElement('textarea')
  textField.innerText =  window.location.origin + `${"/signup?"}`?.concat(refreralCode)
  document.body.appendChild(textField)
  textField.select()
  document.execCommand('copy')
  textField.remove()


    toast.success("Referral code copied successfully." , {
        position: toast.POSITION.BOTTOM_LEFT,
        autoClose: 1000
    })
   }


  return (
    <>
      <div className={classes.Div1} style={{ marginTop: "95px" }}>
        <div>
          <div className={classes.DivHeading}>
            <Typography className={classes.Heading1}>
              Invite Your Referrals to CLEMENTINE ICO
            </Typography>
          </div>
          <div></div>
        </div>

        <div className={classes.BoxFrame}>
          <div className={classes.BlueBox}>
            <div style={{ color: "#fff", fontSize: "30px", fontWeight: 600 }}>
              {referralData ? referralData.noOfReferral : "0"}
            </div>
            <div style={{ color: "#fff", fontSize: "20px", fontWeight: 600 }}>
              Total Referred Users
            </div>
          </div>
          <div className={classes.HollowBox}>
            <div
              style={{ color: "#56CA00", fontSize: "20px", fontWeight: 600 }}
            >
              {
                referralData ? referralData.totalReferralPoints : 0
              }
            </div>
            <div
              style={{ color: "#56CA00", fontSize: "15px", fontWeight: 600 }}
            >
              LAX Token Points
            </div>
            <div
              style={{
                color: "rgba(6, 10, 37, 0.75);",
                fontSize: "15px",
                fontWeight: 600,
              }}
            >
              Total Commission Earned
            </div>
          </div>
          <div>
            <div>
              <ul style={{ lineHeight: "25px" }}>
                <li>
                  LAX Token points are LAX  and convertible to actual LAX
                  tokens.
                </li>
                <li>
                  {" "}
                  Withdrawal details and conversion rates will be provided post
                  ICO launch.{" "}
                </li>
                <li>Stay tuned for updates!</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          width: "90%",
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
                  Generate Referral Link
                </Typography>
              </div>
              <Typography
                style={{
                  fontSize: "18px",
                  color: "rgba(118, 130, 129, 0.889)",
                }}
              >
                Please use the link given below for referral !
                <span
                  style={{
                    color: "rgba(14, 173, 157, 1)",
                    fontWeight: 700,
                    fontSize: "16px",
                    display: "flex",
                    gap: "10px",
                  }}
                ></span>
              </Typography>

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
                    Generated Referral Link :
                  </Typography>
                </div>
                <div className={classes.RemoveBorder}>
                  <TextField
                    type="text"
                    fullWidth
                    step="any"
                    variant="outlined"
                    value={
                      window.location.origin + `${"/signup?"}`?.concat(refreralCode)
                    }
                    placeholder="Enter your friends address and send them invite"
                  ></TextField>
                </div>
              </div>
              <div className={classes.Button}>
                <div>
                  <Button
                    onClick={copyUrl}
                    style={{
                      width: "100%",
                      color: "#fff",
                      fontSize: "22px",
                      fontWeight: 600,
                      background: "rgba(14, 173, 157, 1)",
                      borderRadius: "13px",
                    }}
                  >
                    Copy
                  </Button>
                </div>
                <div>
                  <Button
                    onClick={() => setOpenModal(true)}
                    style={{
                      width: "100%",
                      color: "#fff",
                      fontSize: "22px",
                      background: "rgba(14, 173, 157, 1)",
                      fontWeight: 600,
                      borderRadius: "13px",
                    }}
                  >
                    Send
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {openModal && (
          <Dialog open={openModal} onClose={handleClose}>
            <DialogContent>
              <Button>
                <Box>
                  <FacebookShareButton
                    url={`${window.location.origin}/signup?${refreralCode}`}
                    target="_blank"
                  >
                    <FaFacebookF
                      style={{ fontSize: "30px", color: "black" }}
                      className={classes.DialogBoxBack}
                    />{" "}
                    <br />
                    <Typography
                      className={classes.DialogBoxBack}
                      style={{ color: "black" }}
                    >
                      Facebook
                    </Typography>
                  </FacebookShareButton>
                </Box>
              </Button>
              <Button>
                <Box>
                  <EmailShareButton
                    target="_blank"
                    url={`${window.location.origin}/signup?${refreralCode}`}
                    subject="Refer and earn LAX"
                    body="Refer and earn LAX"
                    className="Demo_some-network__share-button"
                  >
                    <MdEmail
                      style={{ fontSize: "30px" }}
                      className={classes.DialogBoxBack}
                    />{" "}
                    <br />
                    <Typography className={classes.DialogBoxBack}>
                      E-mail
                    </Typography>
                  </EmailShareButton>
                </Box>
              </Button>
              <Button>
                <Box>
                  <TelegramShareButton
                    target="_blank"
                    url={`${window.location.origin}/signup?${refreralCode}`}
                    title={"Refer and earn LAX"}
                  >
                    <FaTelegramPlane
                      style={{ fontSize: "30px" }}
                      className={classes.DialogBoxBack}
                    />{" "}
                    <br />
                    <Typography className={classes.DialogBoxBack}>
                      Telegram
                    </Typography>
                  </TelegramShareButton>
                </Box>
              </Button>
              <Button>
                <Box>
                  <TwitterShareButton
                    target="_blank"
                    url={`${window.location.origin}/signup?${refreralCode}`}
                    title={`Refer and earn LAX`}
                    hashtag="#camperstribe"
                  >
                    <FaTwitter
                      style={{ fontSize: "30px" }}
                      className={classes.DialogBoxBack}
                    />{" "}
                    <br />
                    <Typography className={classes.DialogBoxBack}>
                      Twitter
                    </Typography>
                  </TwitterShareButton>{" "}
                </Box>
              </Button>
            </DialogContent>
          </Dialog>
        )}
        <div>
          <div className={classes.Div2}>
            <div>
              <div style={{ borderLeft: "5px solid rgba(14, 173, 157, 1)" }}>
                <Typography
                  style={{
                    color: "#060A25",
                    fontFamily: "Inter",
                    fontSize: "24px",
                    fontStyle: "normal",
                    fontWeight: 700,
                    lineHeight: "36px",
                    paddingLeft: "10px",
                    marginBottom: "20px",
                    lineHeight: "36px",
                  }}
                >
                  CLEMENTINE Social Handles
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
              >
                Social Media Links:
              </Typography>
              <div className={classes.SocialMedia}>
                <div className={classes.SocialMediaFrame}>
                  <div>
                    <a
                      href="https://web.whatsapp.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img src="./images/whatsapp.png" alt="" width={"80%"} />
                    </a>
                  </div>
                  <div>
                    {" "}
                    <a
                      href="https://www.instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img src="./images/ig.png" alt=""  width={"80%"}/>
                    </a>
                  </div>
                  <div>
                    <a
                      href="https://www.linkedin.com/company/laxcecrypto/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img src="./images/fb.png" alt=""  width={"80%"}/>
                    </a>
                  </div>
                </div>
                <div className={classes.SocialMediaFrame}>
                  <div>
                    <a
                      href="https://twitter.com/LAXCECRYPTO"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img src="./images/x.png" alt=""  width={"80%"}/>{" "}
                    </a>
                  </div>
                  <div>
                    <a
                      href="https://www.discord.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img src="./images/dcord.png" alt="" width={"80%"} />
                    </a>
                  </div>
                  <div>
                    <a
                      href="https://t.me/LAXCECRYPTO"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img src="./images/tele.png" alt=""  width={"80%"}/>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <ul style={{ lineHeight: "25px" }}>
              <li>
                Referrer receives 2X LAX token points from referred buyer's
                purchase.
              </li>
              <li>
                {" "}
                Referred user gets 1X LAX tokens points from their purchase.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
