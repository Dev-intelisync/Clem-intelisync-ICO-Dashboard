import React, { useState, useRef } from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  Button,
  IconButton,
  Menu,
  MenuItem,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { BsArrowUpRight } from "react-icons/bs";

import { MdArrowUpward, MdAdd } from "react-icons/md";

import SendCoinDialog from "../component/SendCoinDialog";
import RecieveCoinDialog from "../component/RecieveCoinDialog";
import NoDataFound from "../DataNotFound";
import ReceiveMoneyDialog from "../component/ReceiveMoneyDialog";

import { useHistory } from "react-router-dom";
import { BsClockHistory } from "react-icons/bs";

const useStyles = makeStyles((theme) => ({
  //   mainbox: {
  //     backgroundColor: '#120720',

  //     paddingTop: '100px',
  //     paddingBottom: '100px',
  //   },
  headtext: {
    cursor: "pointer",
    "& h3": {
      fontSize: "24px",
      fontWeight: "700",
      color: "#ffffff",
      [theme.breakpoints.down("xs")]: {
        fontSize: "18px",
      },
    },
    "& h5": {
      fontSize: "18px",
      fontWeight: "500",
      color: "#fff",
      [theme.breakpoints.down("xs")]: {
        fontSize: "15px",
      },
    },
    "& span": {
      color: "#20BFA9",
    },
  },
  boxbg: {
    background:
      "radial-gradient(34% 57.15% at 92.64% 16%, rgba(32, 191, 169, 0.3) 0%, rgba(32, 191, 169, 0) 100%), rgba(27, 26, 31, 0.6)",
    boxShadow: "0px 30px 30px rgba(0, 0, 0, 0.3)",
    backdropFilter: "blur(42px)",
    borderRadius: "16px",
    padding: "20px",
  },
  sendDropdown: {
    backgroundColor: "#302F35",
    padding: "10px !important",
  },
}));
function Backers(props) {
  const classes = useStyles();
  const { data } = props;
  const moreRef = useRef(null);
  const history = useHistory();
  const [openMenu, setOpenMenu] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [dataId, setDataId] = useState("");

  const [reciveOpen, setReciveOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
    setReciveOpen(false);
  };

  const submitHandler = () => {};
  const handleMenuOpen = () => {
    setOpenMenu(true);
  };

  const handleMenuClose = () => {
    setOpenMenu(false);
  };
  const HandleWithdraw = (id) => {
    setDataId(id);
    // setOpen(false);
    setOpen(true);
  };
  const HandleRecieve = (id) => {
    setDataId(id);
    // setOpen(false);
    setReciveOpen(true);
  };
  return (
    <Box className={classes.headtext} mt={3}>
      <Box
        // onClick={() => history.push("/my-wallet")}
        style={{ backgroundColor: data.background }}
        className={classes.boxbg}
      >
        <Box display="flex" justifyContent="space-between">
          <Box>
            <img
              style={{ width: "30px", height: "30px", borderRadius: "100%" }}
              ..={
                data?.coinData?.coinImage
                  ? data?.coinData?.coinImage
                  : "/images/btc.png"
              }
              alt=""
              width="30px"
            />
          </Box>
          <IconButton
            size="small"
            className="m-l-10"
            onClick={() => setOpenMenu(!openMenu)}
            ref={moreRef}
          >
            <MoreVertIcon className=" shareIcon" style={{ color: "#fff" }} />
          </IconButton>
        </Box>
        {openMenu && (
          <Menu
            anchorEl={moreRef.current}
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            onClose={handleMenuClose}
            open={openMenu}
            PaperProps={{ className: classes.menu }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            elevation={3}
          >
            <Box mt={0} className={classes.sendDropdown}>
              <MenuItem>
                <Button
                  variant="outlined"
                  color="default"
                  size="small"
                  startIcon={<BsArrowUpRight size="20" />}
                  // onClick={() => setOpen(true)}
                  // onClick={() => setOpen(true)}
                  // title="Send Money"
                  onClick={() => HandleWithdraw(data)}
                  title="Send Money"
                >
                  Send Coin
                </Button>
              </MenuItem>
              <MenuItem>
                <Button
                  variant="outlined"
                  color="default"
                  size="small"
                  startIcon={<MdAdd size="20" />}
                  // onClick={() => setReciveOpen(true)}
                  // onClick={() => setReciveOpen(true)}
                  onClick={() => HandleRecieve(data)}
                  title="Recieve Money"
                >
                  Recieve Coin
                </Button>
              </MenuItem>
              <MenuItem>
                <Button
                  variant="outlined"
                  color="default"
                  size="small"
                  startIcon={<BsClockHistory size="20" />}
                  onClick={() => history.push("/transaction-history")}
                  title="Recieve Money"
                >
                  Transaction History
                </Button>
              </MenuItem>
            </Box>
          </Menu>
        )}
        <Box
          display="flex"
          mt={3}
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h5">{data?.coinData?.coinFullName}</Typography>
          <Box>
            <Typography variant="h6" style={{ fontSize: "15px" }}>
              <span>{data?.coinBalance?.availableBalance}</span>&nbsp;
              {data?.coinData?.coinShortName}
            </Typography>
          </Box>
        </Box>

        {/* <Box mt={3}>
          <Typography variant="body1">
            <span>
              {" "}
              <CgArrowLongUp className={classes.iconbox} />
            </span>
            &nbsp; {data.text3}: <span>{data.text4}</span>
          </Typography>
        </Box> */}
      </Box>
      {open && (
        <SendCoinDialog
          submitHandler={(data) => submitHandler(data)}
          open={open}
          handleClose={handleClose}
          dataId={dataId}
          dataList={data}
        />
      )}

      {reciveOpen && (
        <ReceiveMoneyDialog
          reciveOpen={reciveOpen}
          handleClose={handleClose}
          dataId={dataId}
        />
      )}
    </Box>
  );
}

export default Backers;
