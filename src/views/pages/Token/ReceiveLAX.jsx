import React, { useEffect } from 'react'
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
  import { useAccount, useContractRead } from 'wagmi';
  import { CONTRACT_ADDRESS , USDC , USDT} from "./../../../constants";
  import contractABI from "./../../../contract_abi.json"
  import { formatEther, parseEther, parseUnits } from 'viem';
  import ButtonCircularProgress from "@component/ButtonCircularProgress";



  const useStyles = makeStyles((theme) => ({
    mainDiv: {
      background: "rgba(255, 255, 255, 0.8)",
      boxShadow:
        " rgba(0, 0, 0, 0.3) 0px 0px 5px 0px, rgba(0, 0, 0, 0.3) 0px 0px 1px 0px",
      width: "50%",
      height: "500px",
      padding: "40px 32px",
      marginTop: "20px",
      borderRadius: "20px",
    },
    select: {
      "& .MuiInputBase-root": {
        background: theme.palette.background.taf,
        height: "55px",
        width: "100%",
      },
      "& .MuiInputBase-input ": {
        color: "#000000 !important",
      },
      " &  .MuiSelect-icon": {
        color: "aqua !important",
        fontSize: "50px !important",
        top: "10% !important",
      },
    },
    TextBox: {
      borderRadius: "10px",
      height: "55px",
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
      fontSize: "24px",
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
      height: "68px",
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
      fontSize: "32px",
      paddingLeft: "20px",
      textAlign: "justify",
      fontWeight: 700,
      color: "#060A25",
    },
  }));

const ReceiveLAX = ({buyAmount , token }) => {

    const {isConnected} = useAccount();
 

    const { data: maticAmount} = useContractRead({
        address: CONTRACT_ADDRESS,
        abi: contractABI,
        functionName: 'amountOfLAXTokenReceivedOfMatic',
        args: [parseEther(buyAmount)]
      })


    const { data: USDCAmount} = useContractRead({
        address: CONTRACT_ADDRESS,
        abi: contractABI,
        functionName: 'amountOfLAXTokenReceivedOfUSDC',
        args: [parseUnits(buyAmount , 6)]
      })


    const { data: USDTAmount } = useContractRead({
        address: CONTRACT_ADDRESS,
        abi: contractABI,
        functionName: 'amountOfLAXTokenReceivedOfUSDT',
        args: [parseUnits(buyAmount , 6)]
      })





    



      const displayAmount = ()=>{
           if(token === "MATIC"){
            return maticAmount
           }

           else if(token === "USDT"){
            return USDTAmount;

           }

           else if(token === "USDC"){
            return USDCAmount
           }
      }

  

    
  const classes = useStyles();
  return (
    <Box style={{ width: "100%", marginTop: "2px" }}>
    <label
      className={classes.label}
      style={{ marginBottom: "6px" }}
    >
      You will receive : 

      {
        (maticAmount || USDCAmount || USDTAmount ) ? ` ${formatEther(displayAmount())} LAX` :  " Loading..."
      }
    </label>
  </Box>

  )
}

export default ReceiveLAX