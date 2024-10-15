/* eslint-disable no-use-before-define */
import React, { useContext, useEffect, useState } from "react";
import { useLocation, matchPath, useHistory } from "react-router-dom";
import PerfectScrollbar from "react-perfect-scrollbar";
import ConfirmationDialog from "@component/ConfirmationDialog";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  Drawer,
  Hidden,
  List,
  ListSubheader,
  makeStyles,
  Typography,
} from "@material-ui/core";
import Logo from "@component/Logo";
import { FaWallet, FaSignOutAlt, FaPeopleArrows } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import { IoMdSwap, IoIosPaper } from "react-icons/io";
import { RiAccountCircleFill } from "react-icons/ri";
import { FaIdCard } from "react-icons/fa";
import { AiFillBank } from "react-icons/ai";
import { AiFillShop } from "react-icons/ai";
import { BiShuffle, BiEdit } from "react-icons/bi";
import { CgLogIn } from "react-icons/cg";
import { ImHome3 } from "react-icons/im";
import { GiToken } from "react-icons/gi";
import { MdSecurity } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdGroupAdd } from "react-icons/md";
import LanguageIcon from "@material-ui/icons/Language";
import { RiExchangeFill } from "react-icons/ri";
import NavItem from "./NavItem";
import { AuthContext } from "@context/Auth";
import { FaXTwitter } from "react-icons/fa6";
import { FaDiscord } from "react-icons/fa";
import { FaTelegramPlane } from "react-icons/fa";
import { Link } from "react-router-dom";

const sections = [
  {
    items: [
      {
        title: "Dashboard",
        icon: ImHome3,
        href: "/dashboard",
      },
      // {
      //   title: "My Wallet",
      //   icon: FaWallet,
      //   href: "/my-wallet",
      // },
      {
        title: "Transactions",
        icon: IoMdSwap,
        href: "/transaction-history",
      },
     
      {
        title: "White Paper",
        icon: IoIosPaper,
        href: "/white-paper",
      },
      // {
      //   title: "Crypto Exchange",
      //   icon: LanguageIcon,
      //   href: "/echangeCrypto",
      // },
      // {
      //   title: "Stake Crypto",
      //   icon: AiFillShop,
      //   href: "/stakeCrypto",
      // },
      {
        title: "Buy Token",
        icon: GiToken,
        href: "/token",
        // href: "/Buytoken",
      },
      {
        title: "KYC",
        icon: FaIdCard,
        href: "/kyc",
      },
      // {
      //   title: "Refferal",
      //   icon: FaPeopleArrows,
      //   href: "/referral",
      //   // href: "/Buytoken",
      // },
      // {
      //   title: "P2P",
      //   icon: RiExchangeFill,
      //   // href: "/",
      //   href: "/p2p",
      // },
     
      // {
      //   title: "Login History",
      //   icon: CgLogIn,
      //   href: "/login-history",
      // },
      // {
      //   title: "Refferal Points",
      //   icon: FaPeopleArrows,
      //   href: "/refferal-points",
      // },
      // {
      //   title: "Airdrop Module",
      //   icon: FaWallet,
      //   href: "/airdrop",
      // },
      // {
      //   title: "Terms & Condition",

      //   href: "/terms",
      // },
      // {
      //   title: "Privacy Policy",

      //   href: "/privacy-policy",
      // },
    ],
  },
];
const sectionsBelow = [
  {
    items: [
      {
        title: "Logout",
        href: "/",
        icon: IoLogOut,
      },
    ],
  },
];

function renderNavItems({ items, pathname, depth = 0 }) {
  return (
    <List disablePadding>
      {items.reduce(
        (acc, item) => reduceChildRoutes({ acc, item, pathname, depth }),
        []
      )}
    </List>
  );
}

function reduceChildRoutes({ acc, pathname, item, depth }) {
  const key = item.title + depth;

  if (item.items) {
    const open = matchPath(pathname, {
      path: item.href,
      exact: false,
    });

    acc.push(
      <NavItem
        depth={depth}
        icon={item.icon}
        info={item.info}
        key={key}
        open={Boolean(open)}
        title={item.title}
      >
        {renderNavItems({
          depth: depth + 1,
          pathname,
          items: item.items,
        })}
      </NavItem>
    );
  } else {
    acc.push(
      <NavItem
        depth={depth}
        href={item.href}
        icon={item.icon}
        info={item.info}
        key={key}
        title={item.title}
      />
    );
  }

  return acc;
}

const useStyles = makeStyles((theme) => ({
  mobileDrawer: {
    width: 256,
    background: "#00273C",
    boxShadow: " 0 0.1rem 0.7rem rgb(0 0 0 / 10%)",
  },
  desktopDrawer: {
    width: 256,
    top: 0,
    height: "100%",
    background: "#00273C",
    boxShadow: " 0 0.1rem 0.7rem rgb(0 0 0 / 10%)",
  },
  icon: {
    display: "flex",
    alignItems: "center",
    marginRight: theme.spacing(3),
    marginLeft: theme.spacing(1),
    color: "#fff",
  },

  Terms: {
    color: "#fff",
    justifyContent: "flex-start",
    textTransform: "none",
    letterSpacing: 0,
    width: "100%",
    borderLeft: "solid 8px transparent",
    borderRadius: 0,
    fontSize: "15px",
    "& .MuiButton-label": {
      // padding: "10px",
    },
    "&:hover": {
      "& .MuiButton-label": {
        color: "#fff !important",
        background: "#56CA00",
        marginTop: "12px",
        // padding: "10px",
        borderRadius: "9px",
        fontWeight: theme.typography.fontWeightRegular,
        "& $title": {
          fontWeight: theme.typography.fontWeightMedium,
          // color: `${theme.palette.text.primary} !important`,
        },
        "& $icon": {
          color: "#fff !important",
          // color: "00e0b0",
        },
      },
    },
    "&.depth-0": {
      "& $title": {
        fontWeight: theme.typography.fontWeightMedium,
        // color: `${theme.palette.text.primary} !important`,
      },
    },
  },

  avatar: {
    cursor: "pointer",
    width: 64,
    height: 64,
  },
  socialIcon: {
    cursor: "pointer",
    marginRight: 5,
  },
}));

const NavBar = ({ onMobileClose, openMobile }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const location = useLocation();
  const auth = useContext(AuthContext);

  const confirmationHandler = () => {
    history.push("/");
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("email");
  };
  const history = useHistory();
  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
  }, [location?.pathname]);

  const content = (
    <Box
      height="100%"
      display="flex"
      flexDirection="column"
      className="srollBoxNav"
      style={{ overflowY: "auto" }}
    >
      <Hidden mdDown>
        <Box
          mb={-1}
          display="flex"
          justifyContent="center"
          // alignItems="center"
        >
          <Logo
            onClick={() => history.push("/")}
            alt="Logo"
            style={{
              paddingTop: "25px",
              cursor: "pointer",
              width: "186px",
            }}
          />
        </Box>
      </Hidden>
      {open && (
        <ConfirmationDialog
          open={open}
          handleClose={() => setOpen(false)}
          title={"Logout"}
          desc={"Do you want to logout ?"}
          confirmationHandler={confirmationHandler}
          style={{ color: "#022E37" }}
        />
      )}
      <PerfectScrollbar options={{ suppressScrollX: true }}>
        <Box my={3}>
          {sections.map((section, i) => (
            <List 
              key={`menu${i}`}
              subheader={
                <ListSubheader disableGutters disableSticky>
                  {section.subheader}
                </ListSubheader>
              }
            >
              {renderNavItems({
                items: section.items,
                pathname: location?.pathname,
              })}
            </List>
          ))}
          <Box style={{ height: "100px !important" }}>
            {/* <ChartList height="38%" /> */}
          </Box>
        </Box>

        <Box className="side_nev_Bottom">
          {sectionsBelow.map((section, i) => (
            <List
              key={`menu${i}`}
              subheader={
                <ListSubheader disableGutters disableSticky>
                  {section.subheader}
                </ListSubheader>
              }
            >
              {section.items.map((itemList, i) => {
                return (
                  <Button
                    fullWidth
                    key={i}
                    className={classes.Terms}
                    style={{
                      justifyContent: "start",
                      marginTop: "-43px",
                      // paddingLeft: 36,
                      borderRadius: 0,
                      padding:"10px !important",
                      fontSize: "14px",
                      textTransform: "capitalize",
                    }}
                    // onClick={() => history.push(itemList.href)}
                    onClick={() => {
                      itemList.title === "Logout"
                        ? setOpen(true)
                        : history.push(itemList.href);
                    }}
                    
                  >
                    <FaSignOutAlt
                      style={{ fontSize: "15px",padding:"15px 10px",marginLeft:"10px",marginRight:"18px" }}
                      // className={classes.icon}
                    />
                    {itemList.title}
                  </Button>
                );
              })}

              {/* {renderNavItems({
                items: section.items,
                pathname: location.pathname,
              })} */}
            </List>
          ))}
        </Box>
      </PerfectScrollbar>
     
      
      <Typography
        style={{
          color: "#fff",
          fontSize: "15px",
          position: "absolute",
          bottom: "35px",
          left: "42px",
        }}
      >
         <div style={{display:"flex",justifyContent:"center",alignItems:"center",gap:"30px",marginBottom:"15px"}}>
       <Link to="https://x.com/Clementine93962" > <FaXTwitter style={{cursor:"pointer"}} /></Link>
      <FaDiscord style={{cursor:"pointer"}} />
      <FaTelegramPlane style={{cursor:"pointer"}}  />
      </div>
        © 2024 <span style={{ color: "#56CA00" }}>CLEMENTINE</span>
      </Typography>
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
          style={{ overflowY: "scroll" }}
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
          style={{ overflowY: "scroll" }}
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool,
};

export default NavBar;
