import React from "react";
import {
  Box,
  makeStyles,
  withStyles,
  TableHead,
  TableRow,
  Table,
  TableBody,
  TableCell,
  Container,
} from "@material-ui/core";
const StyledTableCell = withStyles((theme) => ({
  body: {
    fontSize: 14,
    fontFamily: "arial",
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    marginTop: "3px",
    height: "30px",
    color: "#B1B1B1 !important",
    backgroundColor: theme.palette.background.virtual,
    borderRadius: "6px",
  },
}))(TableRow);

const useStyles = makeStyles((theme) => ({
  mainContentBox: {
    // background: "rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
    "& .textField": {
      width: "100%",
    },
    "& .btn": {
      background: "rgba(255, 255, 255, 0.1)",
      textAlign: "center",
      padding: "6px",
      borderRadius: "8px",
      height: "36px",
      minWidth: "30px",
      cursor: "pointer",
      "& p": {
        color: "#fff",
        opacity: "0.5",
        fontSize: "9px",
        lineHeight: "0px",
      },
    },
  },
  paper: {
    border: "none",
    overflowX: "auto",
    overflowY: "hidden",
    overflow: "scroll",
    backgroundColor: theme.palette.background.virtual,
  },
  table: {
    minWidth: 950,
    background: "transparent",
    "& .tableHeadRow": {
      background:
        " linear-gradient(260.62deg, #7C162E -41.31%, #9C162E 107.21%)",
      borderRadius: "6px",
    },
  },
  iconhover: {
    color: "#000",
  },
  hoverSection: {
    marginTop: "5px !important",
    "& .hoverColor": {
      // color: "#B1B1B1 !important",
    },
    "&:hover": {
      background: "rgba(56, 3, 39, 0.1)",
    },
  },
  filterIcons: {
    color: "#fff",
  },
  filterBtn: {
    background: "#422966",
    borderRadius: "8px",
  },
  first: {
    borderRadius: "4px 0px 0px 4px",
  },
  last: {
    borderRadius: "0px 4px 4px 0px",
  },
}));

function TradeTable() {
  const classes = useStyles();
  const exploreList = [
    {
      name: "BTC",
      price: "$19,173.98",
      change: "-3.0964847%",
      volume: "32,8356899725M",
      cap: "$36,978632656,467",
    },
    {
      name: "BNB",
      price: "$49,173.98",
      change: "-3.0964847%",
      volume: "32,8356899725M",
      cap: "$36,978632656,467",
    },
    {
      name: "LTC",
      price: "$89,173.98",
      change: "-3.0964847%",
      volume: "32,8356899725M",
      cap: "$31,978632656,467",
    },
    {
      name: "MATIC",
      price: "$19,173.98",
      change: "-3.0964847%",
      volume: "32,8356899725M",
      cap: "$36,978632656,467",
    },
    {
      name: "SOLANA",
      price: "$16,173.98",
      change: "-3.0964847%",
      volume: "12,8356899725M",
      cap: "$56,978632656,467",
    },
  ];

  return (
    <>
      <Box className={classes.root}>
        <Box className={classes.paper}>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow className="tableHeadRow">
                <StyledTableCell align="left" className={classes.first}>
                  Name
                </StyledTableCell>
                <StyledTableCell align="left">Price</StyledTableCell>
                <StyledTableCell align="left">24H Change</StyledTableCell>
                <StyledTableCell align="left">24H volume</StyledTableCell>
                <StyledTableCell align="left">Market Cap</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {exploreList?.map((row, index) => (
                <StyledTableRow className={classes.hoverSection}>
                  <StyledTableCell align="left" className="hoverColor">
                    {row?.name}
                  </StyledTableCell>
                  <StyledTableCell align="left" className="hoverColor">
                    <Box display="flex">{row.price}</Box>
                  </StyledTableCell>
                  <StyledTableCell align="left" className="hoverColor">
                    {row.change}
                  </StyledTableCell>

                  <StyledTableCell align="left" className="hoverColor">
                    {row.volume}
                  </StyledTableCell>
                  <StyledTableCell align="left" className="hoverColor">
                    {row.cap}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </Box>
    </>
  );
}

export default TradeTable;
