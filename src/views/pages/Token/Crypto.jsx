import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import {
  Button,
  Grid,
  Box,
  FormControl,
  Select,
  TextField,
  Typography,
  CircularProgress,
  MenuItem,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
// main crypto
import { useHistory } from "react-router-dom";
import "./style.css";
import { CONTRACT_ADDRESS, USDC, USDT , MATIC_CONVERSION_RATE , USDC_CONVERSION_RATE , USDT_CONVERSION_RATE} from "./../../../constants";
import {
  erc20ABI,
  useAccount,
  useContractRead,
  useContractWrite,
  useWaitForTransaction,
  useWalletClient,
  usePublicClient
} from "wagmi";
import contractABI from "./../../../contract_abi.json";
import { formatEther, formatUnits, parseEther, parseUnits } from "viem";
import { toast } from "react-toastify";
import ReceiveLAX from "./ReceiveLAX";
import ApiConfig from "./../../../config/APIConfig";
import axios, { Axios } from "axios";
import { ethers } from "ethers";

const useStyles = makeStyles((theme) => ({
  mainDiv: {
    background: "rgba(255, 255, 255, 0.8)",
    boxShadow:
      " rgba(0, 0, 0, 0.3) 0px 0px 5px 0px, rgba(0, 0, 0, 0.3) 0px 0px 1px 0px",
    width: "50%",
    
    padding: "40px 32px",
    marginTop: "20px",
    borderRadius: "20px",
  },
  select: {
    "& .MuiInputBase-root": {
      background: theme.palette.background.taf,
      height: "40px",
      width: "100%",
    },
    "& .MuiInputBase-input ": {
      color: "#000000 !important",
    },
    " &  .MuiSelect-icon": {
      color: "#56CA00 !important",
      fontSize: "50px !important",
      top: "10% !important",
    },
  },
  TextBox: {
    borderRadius: "10px",
    height: "40px",
    background: theme.palette.background.taf,
    "& .MuiInputBase-input ": {
      color: " rgba(9, 10, 26, 0.25)",
      fontFamily: "Inter",
      fontSize: "20px",
      fontWeight: 500,
    },
  },

  Bins: {
    display: "flex",
    alignItems: "center",
    background: "#ffff",
  },

  formSection: {
    "@media(max-width: 991px)": {
      padding: "10px 10px 10px 10px",
    },
  },

  TitleBox: {
    fontFamily: "Inter",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "18px",
    lineHeight: "54px",
    color: "#060A25",
    textAlign: "left",
  },

  label: {
    fontFamily: "Inter",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "18px",
    lineHeight: "27px",
    textAlign: "left",
    color: "#022E37",
  },

  submitButton: {
    width: "100%",
    // maxWidth: "129.19px",
    height: "40px",
    background: "#56CA00",
    borderRadius: "8px",
    fontFamily: "Inter",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "22px",
    lineHeight: "36px",
    color: "#FFFFFF !important",
    boxShadow: "0px 0px 1.489px 0px rgba(0, 0, 0, 0.20)",
  },
  subTitle: {
    fontFamily: "Inter",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "22px",
    lineHeight: "30px",
    color: "#060A25",
    marginTop: "17px",
  },
  priceBox: {
    width: "100%",
    maxWidth: "391px",
    background: "rgba(53, 110, 213, 0.5)",
    borderRadius: "5px",
    padding: "10px",
    marginTop: "38px",
  },
  price: {
    fontFamily: "Inter",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "16px",
    lineHeight: "24px",
    color: "#FFFFFF",
  },
  Heading1: {
    fontSize: "22px",
    paddingLeft: "20px",
    textAlign: "justify",
    fontWeight: 700,
    color: "#060A25",
  },
  // InstructionsRules: {
  //   position: "absolute",
  //   top: "100%",
  //   left: 0,
  //   backgroundColor: "#fff",
  //   padding: "10px",
  //   boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.5)",
  //   zIndex: 1,
  //   opacity: 0, // Initially hide the instructions
  //   pointerEvents: "none", // Disable pointer events when hidden
  // },
  hoverContainer: {
    position: "relative",
    cursor: "pointer",
  },
  instruction: {
    transition: "transform 0.3s ease",
  },
  instructionsRules: {
    display: "none",
    position: "absolute",
    width: "500px",
    top: "-170px",
    left: "-480px",
    backgroundColor: "#fff",
    padding: "10px",
    boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.5)",
    zIndex: 1,
  },
}));

function Crypto(size) {
  const handleHoverOut = (event) => {
    const instructionsRules = event.currentTarget.querySelector(
      `.${classes.instructionsRules}`
    );
    instructionsRules.style.display = "none";
  };

  const handleHover = (event) => {
    const instructionsRules = event.currentTarget.querySelector(
      `.${classes.instructionsRules}`
    );
    instructionsRules.style.display = "block";
  };

  let loader = React.useRef(null);

  const [showApprove, setShowApprove] = useState(false);

  const { isConnected, address } = useAccount();

  const client = usePublicClient()
  const result = useWalletClient()

  const { data: minBuyMatic } = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: contractABI,
    functionName: "MIN_BUY_MATIC",
  });

  const { data: minBuyUSDC } = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: contractABI,
    functionName: "MIN_BUY_USDC",
  });

  const { data: minBuyUSDT } = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: contractABI,
    functionName: "MIN_BUY_USDT",
  });

 


  

  const onReceiptBuy = async () => {
    // toast.dismiss(buyMaticLoader);

    // toast.dismiss(buyUSDCLoader);

    // toast.dismiss(buyUSDTLoader);



    /// Making API Request


    let amount;



    if(token === "MATIC"){
     amount = parseFloat(buyTokenAmount) * parseFloat(MATIC_CONVERSION_RATE)
    }

    else if(token === "USDT"){
      amount = parseFloat(buyTokenAmount) * parseFloat(USDT_CONVERSION_RATE)

     }

     else if(token === "USDC"){
        amount = parseFloat(buyTokenAmount) * parseFloat(USDC_CONVERSION_RATE)
     }


    


   


    try{


      const laxPoints = {
           "productAmount" : amount
      }

      const jwtToken = localStorage.getItem('token');

      


     const res = await axios.post(ApiConfig.writeUserReferralPoints ,  laxPoints , {
      headers : {
        'token' : jwtToken
      }
     })

    }catch(error){

      console.log(error)
    }



    /// END API CALL


    setBuyTokenAmount("");

    toast.dismiss();

    // toast.dismiss(loader.current)

    toast.success("CLEMENTINE tokens bought successfully...", {
      position: toast.POSITION.BOTTOM_LEFT,
      autoClose: 2000,
    });

    setToken("MATIC");

    return;
  };

  const onReceiptApprove = async () => {
    // toast.dismiss(approveUSDCLoader);
    // toast.dismiss(approveUSDTLoader);

    toast.dismiss();

    // toast.dismiss(loader.current)

    toast.success(
      `${token} token amount approved successfully. You can buy now.`,
      {
        position: toast.POSITION.BOTTOM_LEFT,
        autoClose: 2000,
      }
    );

    setShowApprove(false);

    return;
  };

  const {
    data: buyMaticData,
    isLoading: isBuyingWithMaticLoading,
    writeAsync: buyWithMatic,
  } = useContractWrite({
    address: CONTRACT_ADDRESS,
    abi: contractABI,
    functionName: "buyLAXTokensMatic",
  });

  const {
    data: buyUSDCData,
    isLoading: isBuyingWithUsdcLoading,
    writeAsync: buyWithUSDC,
  } = useContractWrite({
    address: CONTRACT_ADDRESS,
    abi: contractABI,
    functionName: "buyLAXTokensUSDC",
  });

  const {
    data: buyUSDTData,
    isLoading: isBuyingWithUsdtLoading,
    writeAsync: buyWithUSDT,
  } = useContractWrite({
    address: CONTRACT_ADDRESS,
    abi: contractABI,
    functionName: "buyLAXTokensUSDT",
  });

  const { isLoading: buyTxMaticLoading } = useWaitForTransaction({
    hash: buyMaticData?.hash,
    onSuccess: onReceiptBuy,
  });

  const { isLoading: buyTxUSDTLoading } = useWaitForTransaction({
    hash: buyUSDTData?.hash,
    onSuccess: onReceiptBuy,
  });

  const { isLoading: buyTxUSDCLoading } = useWaitForTransaction({
    hash: buyUSDCData?.hash,
    onSuccess: onReceiptBuy,
  });

  const {
    data: approveUSDCData,
    isLoading: isApprovingUSDC,
    writeAsync: approveUSDC,
  } = useContractWrite({
    address: USDC,
    abi: erc20ABI,
    functionName: "approve",
  });

  const {
    data: approveUSDTData,
    isLoading: isApprovingUSDT,
    writeAsync: approveUSDT,
  } = useContractWrite({
    address: USDT,
    abi: erc20ABI,
    functionName: "approve",
  });

  const { isLoading: approveTxUSDTLoading } = useWaitForTransaction({
    hash: approveUSDTData?.hash,
    onSuccess: onReceiptApprove,
  });

  const { isLoading: approveTxUSDCLoading } = useWaitForTransaction({
    hash: approveUSDCData?.hash,
    onSuccess: onReceiptApprove,
  });

  const classes = useStyles();

  const [isLoading, setIsLoading] = useState(false);
  const [buyTokenAmount, setBuyTokenAmount] = useState();
  const [token, setToken] = useState("MATIC");

  const handleChange = (e) => {
    if (e.target.value === "MATIC") {
      setShowApprove(false);
    } else if (e.target.value === "USDT") {
      setShowApprove(true);
    } else if (e.target.value === "USDC") {
      setShowApprove(true);
    }
    setToken(e.target.value);
  };

  const handleAmountChange = (e) => {
    setBuyTokenAmount(e.target.value);
  };

  const handleAprove = async () => {
  
    if(!isConnected){
      toast.error("Connect wallet first" , {
        position: toast.POSITION.BOTTOM_LEFT,
        autoClose: 1000
      })
      return;
    }

    try {
      if (token === "USDC") {
        const buyAmountInUSDC = parseUnits(buyTokenAmount, 6);

        if (buyAmountInUSDC < minBuyUSDC) {
          toast.error(
            `Amount cannot be less than ${formatUnits(minBuyUSDC, 6)} USDC`,
            {
              position: toast.POSITION.BOTTOM_LEFT,
              autoClose: 3000,
            }
          );
          return;
        }

        await approveUSDC({
          args: [CONTRACT_ADDRESS, parseUnits(buyTokenAmount, 6)],
        });
        // loader.current = toast.loading("Wait for tx to mine...." , {

        //   position: toast.POSITION.BOTTOM_LEFT
        // });
      } else if (token === "USDT") {
        const buyAmountInUSDT = parseUnits(buyTokenAmount, 6);

        if (buyAmountInUSDT < minBuyUSDT) {
          toast.error(
            `Amount cannot be less than ${formatUnits(minBuyUSDT, 6)} USDT`,
            {
              position: toast.POSITION.BOTTOM_LEFT,
              autoClose: 3000,
            }
          );
          return;
        }

        await approveUSDT({
          args: [CONTRACT_ADDRESS, parseUnits(buyTokenAmount, 6)],
        });

        // loader.current = toast.loading("Wait for tx to mine...." , {

        //   position: toast.POSITION.BOTTOM_LEFT
        // });
      }
    } catch (error) {
      toast.error("Something went wrong...", {
        position: toast.POSITION.BOTTOM_LEFT,
        autoClose: 1000,
      });
    }
  };

  const handleSubmit = async () => {


    if(!isConnected){
      toast.error("Connect wallet first" , {
        position: toast.POSITION.BOTTOM_LEFT,
        autoClose: 1000
      })
      return;
    }
    try {
      if (token === "MATIC") {
        const buyAmountInEther = parseEther(buyTokenAmount);

        if (buyAmountInEther < minBuyMatic) {
          toast.error(
            `Amount cannot be less than ${formatEther(minBuyMatic)} Matic`,
            {
              position: toast.POSITION.BOTTOM_LEFT,
              autoClose: 3000,
            }
          );
          return;
        }

        await buyWithMatic({ value: parseEther(buyTokenAmount) });

        // loader.current = toast.loading("Wait for tx to mine...." , {

        //   position: toast.POSITION.BOTTOM_LEFT
        // });
      } else if (token === "USDC") {
        const buyAmountInUSDC = parseUnits(buyTokenAmount, 6);

        if (buyAmountInUSDC < minBuyUSDC) {
          toast.error(
            `Amount cannot be less than ${formatUnits(minBuyUSDC, 6)} USDC`,
            {
              position: toast.POSITION.BOTTOM_LEFT,
              autoClose: 3000,
            }
          );
          return;
        }

        await buyWithUSDC({ args: [parseUnits(buyTokenAmount, 6)] });

        // loader.current = toast.loading("Wait for tx to mine...." , {

        //   position: toast.POSITION.BOTTOM_LEFT
        // });
      } else if (token === "USDT") {
        const buyAmountInUSDT = parseUnits(buyTokenAmount, 6);

        if (buyAmountInUSDT < minBuyUSDT) {
          toast.error(
            `Amount cannot be less than ${formatUnits(minBuyUSDT, 6)} USDT`,
            {
              position: toast.POSITION.BOTTOM_LEFT,
              autoClose: 3000,
            }
          );
          return;
        }

        await buyWithUSDT({ args: [parseUnits(buyTokenAmount, 6)] });

        // loader.current = toast.loading("Wait for tx to mine...." , {

        //   position: toast.POSITION.BOTTOM_LEFT
        // });
      }
    } catch (error) {
      toast.error("Something went wrong...", {
        position: toast.POSITION.BOTTOM_LEFT,
        autoClose: 1000,
      });
    } finally {
     
    }
  };

  return (
    <>
      <Box
        style={{
          boxShadow:
            " rgba(0, 0, 0, 0.3) 0px 0px 5px 0px, rgba(0, 0, 0, 0.3) 0px 0px 1px 0px",
          padding: "20px",
          borderRadius: "12px",
        }}
      >
        <Typography
          className={classes.Heading1}
          style={{
            borderLeft: "5px solid #56CA00",
          }}
        >
          Buy Token
        </Typography>
      </Box>
      <div style={{ display: "flex", gap: "40px"}}>
        <div className={classes.mainDiv} style={{ textAlign: "left" }}>
          <Typography className={classes.TitleBox}>
            Instructions To Buy - CLEMENTINE Token
          </Typography>
          {/* <ul style={{ fontSize: "20px", lineHeight: "40px" }}> */}
          <ul style={{ fontSize: "16px", lineHeight: "37px" }}>
          <li>
              Sign-up on Metamask and make sure that you're connected to GDCC Mainnet, and have min 1 GDCC in the wallet balance.
            </li>
            <li>
              Connect your Metamask wallet to the CLEMENTINE ICO dashboard and view your CLEMENTINE
              balance.
            </li>
            <li>Go to "Buy Tokens - Pay with Crypto" section.</li>
            <li>Choose USDT as payment.</li>
            <li>Enter desired amount (min. $10) in input space.</li>
            <li>Click "Pay Now".</li>
            <li>Approve Metamask popup.</li>
            <li>
              Upon successful transaction, receive notification at bottom left.
            </li>
            <li>Verify updated CLEMENTINE balance on dashboard.</li>
            <li>Congratulations! You've purchased CLEMENTINE tokens.</li>
          </ul>
        </div>
        <Box className={classes.mainDiv}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <Typography className={classes.TitleBox}>
                Buy Token - Pay with Crypto
              </Typography>
            </div>
            <div
              className={`${classes.hoverContainer} ${classes.hoverContainerHovered}`}
              onMouseEnter={handleHover}
              onMouseLeave={handleHoverOut}
            >
              <img
                src="/images/icons8-instruction-50.png"
                alt="instruction"
                className={classes.instruction}
              />
              <div className={classes.instructionsRules}>
                <Typography
                  style={{
                    fontSize: "17px",
                    fontWeight: 600,
                  }}
                >
                  Instruction to buy CLEMENTINE Tokens
                  <ul style={{ textAlign: "left", color: "grey" }}>
                    <li>Choose payment, enter amount ($10 min).</li>
                    <li> Pay, approve Metamask.</li>
                    <li>Confirm success</li>
                    <li>Check CLEMENTINE balance. Done!</li>
                  </ul>
                </Typography>
              </div>
            </div>
          </div>

          <Grid xs={12} md={12} lg={12} sm={12}>
            <FormControl
              variant="outlined"
              fullWidth
              className={classes.select}
            >
              <Box>
                <Box style={{ width: "100%", marginTop: "15px" }}>
                  <label
                    className={classes.label}
                    style={{ marginBottom: "6px" }}
                  >
                    Select coin to buy CLEMENTINE Token :
                  </label>
                </Box>
                <TextField
                  className={classes.TextField}
                  select
                  value={token}
                  onChange={handleChange}
                  variant="outlined"
                >
                  {/* <MenuItem value="MATIC">MATIC</MenuItem> */}
                  <MenuItem value="USDT">USDT</MenuItem>
                  {/* <MenuItem value="USDC">USDC</MenuItem> */}
                  {/* <MenuItem value="IND">CLEMENTINE token 4</MenuItem> */}
                </TextField>
              </Box>
            </FormControl>

            <FormControl fullWidth className={classes.forminput}>
              <Box style={{ width: "100%", marginTop: "15px" }}>
                <label className={classes.label}>Amount :</label>
                <TextField
                  className={`${classes.forminput} textFeilds`}
                  type="number"
                  fullWidth
                  variant="outlined"
                  placeholder=" Enter Equivalent Amount"
                  step="any"
                  InputProps={{
                    className: classes.TextBox,
                  }}
                  value={buyTokenAmount}
                  onChange={handleAmountChange}
                  style={{ color: "#000" }}
                />
              </Box>
              {buyTokenAmount ? (
                <ReceiveLAX buyAmount={buyTokenAmount} token={token}  />
              ) : null}
            </FormControl>
          </Grid>

          {/* <Grid xs={12} md={12} lg={12} sm={12}>
          <label className={classes.label}>CLEMENTINE Token quantity :</label>
          <TextField
            className="textFeilds"
            type="number"
            fullWidth
            variant="outlined"
            step="any"
            placeholder="Enter CLEMENTINE Token Quantity"
            name="icoAmount"
            InputProps={{
              className: classes.TextBox,
            }}
            value={Amountvalue}
            style={{ color: "#000" }}
            onChange={(e) => {
              setAmountvalue(e.target.value);
            }}
          />
        </Grid> */}

          <Box align="center" style={{ marginTop: "30px" }}>
            {showApprove ? (
              <Button
                type="submit"
                className={classes.submitButton}
                onClick={handleAprove}
                disabled={
                  isApprovingUSDC ||
                  isApprovingUSDT ||
                  approveTxUSDCLoading ||
                  approveTxUSDTLoading
                }
              >
                {isApprovingUSDC ||
                isApprovingUSDT ||
                approveTxUSDCLoading ||
                approveTxUSDTLoading ? (
                  <CircularProgress />
                ) : (
                  "Approve"
                )}

                {isLoading && (
                  <Box>
                    <CircularProgress
                      style={{
                        color: "white",
                        height: "25px",
                        width: "25px",
                        marginLeft: "15px",
                      }}
                    />
                  </Box>
                )}
              </Button>
            ) : null}

            <Button
              type="submit"
              className={classes.submitButton}
              style={{ marginTop: "10px" }}
              onClick={handleSubmit}
              disabled={
                isBuyingWithMaticLoading ||
                isBuyingWithUsdcLoading ||
                isBuyingWithUsdtLoading ||
                buyTxMaticLoading ||
                buyTxUSDCLoading ||
                buyTxUSDTLoading
              }
            >
              {isBuyingWithMaticLoading ||
              isBuyingWithUsdcLoading ||
              isBuyingWithUsdtLoading ||
              buyTxMaticLoading ||
              buyTxUSDCLoading ||
              buyTxUSDTLoading ? (
                <CircularProgress />
              ) : (
                "Pay now"
              )}
              {isLoading && (
                <Box>
                  <CircularProgress
                    style={{
                      color: "white",
                      height: "25px",
                      width: "25px",
                      marginLeft: "15px",
                    }}
                  />
                </Box>
              )}
            </Button>
          </Box>
        </Box>
      </div>
    </>
  );
}

export default Crypto;
