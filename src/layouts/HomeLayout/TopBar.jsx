import React, { useState, useContext, useEffect } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import axios from 'axios';


import {
  AppBar,
  Box,
  Toolbar,
  makeStyles,
  IconButton,
  Dialog,
  Tooltip,
  TextField,
} from "@material-ui/core";
import NotificationsIcon from "@material-ui/icons/Notifications";
import SwipeableTemporaryDrawer from "./RightDrawer";
import Logo from "@component/Logo";
import DialogContent from "@material-ui/core/DialogContent";
import NotificationList from "@views/pages/notifications/index";
import { useHistory, useLocation } from "react-router-dom";
import SettingsContext from "@context/SettingsContext";
import Badge from "@material-ui/core/Badge";
import Axios from "axios";
import ApiConfig from "../../config/APIConfig";

import { AuthContext } from "@context/Auth";
import { FiSun } from "react-icons/fi";
import { FaRegMoon } from "react-icons/fa";
import { UserContext } from "@context/User";
import { TextFields } from "@material-ui/icons";
import { erc20ABI, useAccount, useContractRead, useToken } from "wagmi";
import { LAX_TOKEN } from "./../../constants";
import { formatEther } from "viem";
import { capitalize, upperCase } from "lodash";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#fff",
  },
  toolbar: {
    height: 70,
  },
  logo: {
    marginRight: theme.spacing(2),
  },
  link: {
    fontWeight: theme.typography.fontWeightMedium,
    "& + &": {
      marginLeft: theme.spacing(2),
    },
  },
  divider: {
    width: 1,
    height: 32,
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  desktopDrawer: {
    position: "absolute",
    right: 80,
    top: 30,
    width: "100%",
    borderRadius: "25px",
    // background:
    //   "linear-gradient(144deg, #00ACEB 0%, #00B0ED -0.82%, #1069C2 70.35%, #1069C2 100%)",
    height: 266,
    background: "#ffffff",
    [theme.breakpoints.down("sm")]: {
      width: 600,
      right: 0,
    },
    [theme.breakpoints.down("xs")]: {
      width: 300,
      right: 0,
    },
  },
  iconbutton: {
    color: theme.palette.secondary.main,
  },
  search: {
    height: "50px",
    width: "100%",
    maxWidth: "376px",
    color: "#ABABAB",
    borderRadius: "100px",
    display: "flex",
    backgroundColor: "#302F35",
    alignItems: "center",
    justifyContent: "left",
    margin: "0px 5px",
    marginTop: "5px",
    marginLeft: "8px",
    "& input": {
      color: "#fff",
    },
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  searchInput: {
    color: "#ABABAB",
    cursor: "text",
    display: "inline-flex",
    position: "relative",
    fontSize: "14px",
    boxSizing: "border-box",
    alignItems: "center",
    fontWeight: 400,
    lineHeight: "1.1976em",
    width: "71%",
  },
  searchIcon: {
    fontSize: "16px",
    paddingLeft: "10px",
    color: "#fff",
    height: "100%",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  NotificationListStyle: {
    background: theme.palette.background.Notification,
    color: theme.palette.text.NotificationColor,
  },
  New11: {
    padding: "0px 0px 0px 270px ",
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    textAlign: "center",
    alignItems: "center",
    "@media (max-width: 1280px)": {
      padding: "0px 0px 0px 0px !important",
    },
  },
}));

const TopBar = ({ className, onMobileNavOpen, ...rest }) => {
  const classes = useStyles();

  return (
    <AppBar className={clsx(classes.root, className)} color="default" {...rest}>
      <Toolbar className={classes.toolbar}>
        <TopBarData />
      </Toolbar>
    </AppBar>
  );
};

TopBar.propTypes = {
  className: PropTypes.string,
};
TopBar.defaultProps = {
  onMobileNavOpen: () => {},
};

export default TopBar;

export function TopBarData() {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const [themeChange, seThemeChange] = useState("DARK");
  const auth = useContext(AuthContext);
  const user = useContext(UserContext);
  const [unReadNotification, setUnReadNotification] = useState(0);
  const [referralData , setReferralData] = useState();

  const [open, setOpen] = useState(false);
  const themeSeeting = useContext(SettingsContext);

  const { isConnected, address } = useAccount();
  const { data: userLAXBal } = useContractRead({
    address: LAX_TOKEN,
    abi: erc20ABI,
    functionName: "balanceOf",
    watch: true,
    enabled: isConnected,
    args: [address],
  });


  const fetchReferralData = async ()=>{

  try{  const jwtToken = localStorage.getItem('token');

    
    
    
    const res = await axios.get(ApiConfig.userRefferalData , {
      headers : {
        'token' : jwtToken
      }
 }) 


 if(res?.data?.responseCode == 200){
       setReferralData(res?.data?.result);
 }
  
  
  
  }catch(error){
      console.log("Something went wrong...");
    }



   
  }

  useEffect(()=>{
    fetchReferralData();

     
   
} , [])

  // const { data: tokenDetails } = useToken({
  //   address: LAX_TOKEN,
  // })

  //  console.log(tokenDetails);

  // console.log(isConnected , address)

  const readNotificationList = async () => {
    try {
      const res = await Axios({
        method: "GET",
        url: ApiConfig.readNotification,
        headers: {
          token: window.localStorage.getItem("token"),
        },
      });

      if (res.data.responseCode === 200) {
        setUnReadNotification(res?.data?.result?.unReadCount);
        user.NotificationDataList();
      }
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   readNotificationList();
  // }, []);

  const changeTheme = (type) => {
    themeSeeting.saveSettings({
      theme: type,
    });
  };

  const userdata = auth.userData ? auth.userData : "";

  const [count, setCount] = useState([]);
  const [loader, setLoader] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = () => {
    setOpen(true);

    setCount([]);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location?.pathname]);

  return (
    <>
      {/* <Logo
        style={{
          paddingTop: "0px",
          // paddingLeft: "15px",
          cursor: "pointer",
          width: "65px",
        }}
      /> */}
      {/* <Box flexGrow={1} /> */}
      {/* <IconButton
          variant="contained"
          color="primary"
          style={
            themeChange === "DARK"
              ? { backgroundColor: "aliceblue" }
              : { backgroundColor: "transparent" }
          }
          onClick={() => {
            if (themeChange === "DARK") {
              changeTheme("LIGHT");
              seThemeChange("LIGHT");
            } else {
              changeTheme("DARK");
              seThemeChange("DARK");
            }
          }}
        >
          {themeChange === "DARK" ? (
            <Tooltip title="Light">
              <FiSun style={{ color: "orange", fontSize: "40px" }} />
            </Tooltip>
          ) : (
            <Tooltip title="Light">
              <FaRegMoon style={{ color: "#000" }} />
            </Tooltip>
          )}
        </IconButton> */}
      {/* &nbsp;&nbsp;
        <IconButton
          className={classes.NotificationListStyle}
          style={{
            marginRight: 5,
            // border: "1px solid #fff",
            // backgroundColor: "#fff",
          }}
          // onClick={() => setOpen(true)}
          onClick={handleChange}
        >
          <Badge
            badgeContent={user?.unReadNotification}
            color="error"
            onClick={() => readNotificationList()}
          >
             <img src="images/notification.svg" />
          </Badge>
        </IconButton> */}
      {/* do not remove these codes */}
      {/* <Button variant='contained' color='primary' onClick={()=>{changeTheme("LIGHT")}}>Light</Button> */}
      {/* <Button variant='contained' color='primary' onClick={()=>{changeTheme("DARK")}}>Dark</Button> */}
      {/* upto here */}
      {/* <IconButton
          style={{
            marginRight: 10,
            border: "1px solid #302F35",
            backgroundColor: "#302F35",
          }}
          onClick={() => history.push("/faq")}
        >
          <FaQuestion size={18} className={classes.iconbutton} />
        </IconButton> */}

      {/* <Dialog
        classes={{ paper: classes.desktopDrawer }}
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="form-dialog-title"
        fullWidth
        maxWidth="sm"
      >
        <DialogContent>
          <NotificationList
            isLoading={isLoading}
            count={user?.unReadNotification}
            notificationList={user?.notificationList}
            popUp={open}
          />
        </DialogContent>
      </Dialog> */}
      <div className={classes.New11}>
        <div
          style={{
            display: "flex",
            textAlign: "center",
            alignItems: "center",
            width: "360px",
          }}
        >
          <div>
            {/* <img
              src="./images/logo101.png"
              alt="logo101"
              width={60}
              height={20}
            /> */}
          </div>
          <div
            style={{
              color: "#00273C",
              fontSize: "20px",
              fontWeight: "600",
              width: "300px",
            }}
          >
            Total Balance:{" "}
          </div>



          
          <div
            style={{
              width: "300px",
              fontFamily: "Inter",
              background: "#0EAD9D26",
              padding: "10px",
              borderRadius: "20px",
              color:"#56CA00",
              "& .MuiInputBase-input": {
                height: "30px",
                color: "#56CA00",
              },
            }}
            InputLabelProps={{
              style: {
                color: "#56CA00",
                height: "20px",
                
              },
            }}
          >
            {userLAXBal
              ? `${parseFloat(formatEther(userLAXBal.toString())).toFixed(
                  2
                )} CLEMENTINE `
              : "0 CLEMENTINE"}
          </div>

          {/** Start */}

          
      {/** End */}
        </div>
        <div style={{ display: "flex", gap: "20px" }}>
          <div
            style={{
              height: "50px !important",
              backgroundColor: "#56CA00 !important",
              borderRadius: "40px 20px 15px 15px",
            }}
          >
            <ConnectButton chainStatus="name" style={{ backgroundColor:"#56CA00 !important",}}/>
          </div>
          {/* <div>
            <SwipeableTemporaryDrawer />
          </div> */}
        </div>
      </div>
    </>
  );
}
