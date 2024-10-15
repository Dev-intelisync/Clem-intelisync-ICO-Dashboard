import {
  Box,
  Radio,
  makeStyles,
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
} from "@material-ui/core";
import React, { useState } from "react";
import Page from "@component/Page";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import { FaSearch } from "react-icons/fa";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 400,
  },
  customBox: {
    // marginBottom: 90,
    marginTop: 50,
    [theme.breakpoints.down("sm")]: {
      marginTop: 20,
    },
    [theme.breakpoints.down("xs")]: {
      marginTop: 20,
    },
  },
}));

const currencyListG = [
  {
    id: 1,
    countryName: "India",
    currency: "INR",
    img: "/images/ind.png",
  },
  {
    id: 2,
    countryName: "Ireland",
    currency: "EUR",
    img: "/images/can.png",
  },
  {
    id: 3,
    countryName: "Japan",
    currency: "JPY",
    img: "/images/ind.png",
  },
  {
    id: 4,
    countryName: "France",
    currency: "EUR",
    img: "/images/can.png",
  },
  {
    id: 5,
    countryName: "Egypt",
    currency: "EGP",
    img: "/images/ind.png",
  },
  {
    id: 6,
    countryName: "Bangladesh",
    currency: "BDT",
    img: "/images/can.png",
  },
  {
    id: 7,
    countryName: "Canada",
    currency: "CAD",
    img: "/images/can.png",
  },
];

export default function Currency() {
  const classes = useStyles();
  const [selectedRow, setselectedRow] = useState(1);
  const [currencyList, setCurrencyList] = useState(currencyListG);
  const searchHandler = (name) => {
    let res = currencyListG.filter((list, i) => {
      console.log(list.countryName.toLowerCase());
      return (
        list.countryName.toLowerCase().substr(0, name.length) ===
        name.toLowerCase()
      );
    });
    setCurrencyList(res);
  };

  return (
    <Page title="Currency">
      <Box mb={3} className="bankbox">
        <Box mt={3}>
          <Box textAlign="center">
            <FormControl variant="outlined">
              <InputLabel margin="dense" htmlFor="outlined-adornment-password">
                Search by Country Name
              </InputLabel>
              <OutlinedInput
                label="Search by Country Name"
                id="outlined-adornment-password"
                className={classes.root}
                margin="dense"
                onChange={(e) => {
                  searchHandler(e.target.value);
                }}
                endAdornment={
                  <InputAdornment
                    className={classes.inputAdornment}
                    position="end"
                  >
                    <span style={{ fontSize: "14px" }}></span>
                    &nbsp;&nbsp; <FaSearch size={14} />
                  </InputAdornment>
                }
              />
            </FormControl>
          </Box>
          <Box className={`customForm ${classes.customBox}`}>
            <TableContainer>
              <Table
                size="small"
                className={classes.table}
                aria-label="simple table"
              >
                <TableBody>
                  {currencyList &&
                    currencyList.map((row, i) => (
                      <TableRow key={i}>
                        <TableCell>
                          <img src={row.img} width="20px" alt="" />
                        </TableCell>
                        <TableCell style={{ fontWeight: "500" }}>
                          {row.countryName}
                        </TableCell>
                        <TableCell>{row.currency}</TableCell>
                        <TableCell align="center">
                          <Radio
                            value={row.id}
                            checked={
                              parseInt(row.id) !== parseInt(selectedRow)
                                ? false
                                : true
                            }
                            onChange={(e) => {
                              setselectedRow(e.target.value);
                            }}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Box mt={5}>
              <Button variant="contained" className="rightButton">
                Save Changes
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Page>
  );
}
