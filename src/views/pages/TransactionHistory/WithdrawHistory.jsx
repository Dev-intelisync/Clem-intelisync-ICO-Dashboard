import React, { useContext, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Box } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";

import Axios from "axios";
import ApiConfig from "../../../config/APIConfig";
import { toast } from "react-toastify";
import { AuthContext } from "@context/Auth";
import moment from "moment";
import NoDataFound from "../../../component/DataNotFound";
import ButtonCircularProgress from "@component/ButtonCircularProgress";
import { BiCopy } from "react-icons/bi";

import { CopyToClipboard } from "react-copy-to-clipboard";
import { sortAddress } from "@utils";

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },

});

function createData(username, name, cointype, calories, fat, carbs, protein) {
  return { username, name, cointype, calories, fat, carbs, protein };
}

const rows = [
  createData("Prakash", "12-03-2022", "ETH", 159, 6.0, 24, 4.0),
  createData("Prakash", "12-03-2022", "ETH", 237, 9.0, 37, 4.3),
  createData("Prakash", "12-03-2022", "ETH", 262, 16.0, 24, 6.0),
  createData("Prakash", "12-03-2022", "ETH", 305, 3.7, 67, 4.3),
  createData("Prakash", "12-03-2022", "ETH", 356, 16.0, 49, 3.9),
];

export default function WithdrawHistory({ data, historyData, isLoading }) {
  const classes = useStyles();

  const [page, setPage] = useState(1);
  const [noOfPages, setNoOfPages] = useState([]);

  return (
    <>
     
        
     <Box>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <TableCell>Asset Type</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Date</TableCell>

              {/* <TableCell align="center">Amount</TableCell>
              <TableCell align="center">Trx. Hash</TableCell>
              <TableCell align="center">Transaction Type</TableCell> */}
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {historyData &&
              historyData.map((row, id) => (
                <TableRow key={id}>
                  <TableCell scope="row" className={classes.tables}>
                    {row?.userName}
                  </TableCell>
                  <TableCell align="center" className={classes.tables}>
                    {row?.txnType ? row?.txnType : "Deployed Contract"}
                  </TableCell>

                  <TableCell scope="row" className={classes.tables}>
                    {row?.txnTime ? moment(data.txnTime).format("lll") : "0"}
                  </TableCell>
                  {/* <TableCell scope="row" className={classes.tables}>
                    {row?.coinType}
                  </TableCell>
                  <TableCell align="center" className={classes.tables}>
                    {row?.amount}
                  </TableCell> */}

                  <TableCell align="center" className={classes.tables}>
                    {row?.status}
                  </TableCell>
                </TableRow>
              ))}
            {!isLoading && historyData && historyData.length === 0 && (
              <Box
                style={{
                  marginTop: "1rem",
                }}
              >
                <NoDataFound />
              </Box>
            )}
            {isLoading && (
              <Box style={{ marginTop: "1rem" }}>
                <ButtonCircularProgress />
              </Box>
            )}
          </TableBody>
        </Table>
        <Box mt={2} mb={2} display="flex" justifyContent="end">
          {/* <Pagination
            count={noOfPages}
            page={page}
            onChange={(e, v) => setPage(v)}
          /> */}
        </Box>
      </TableContainer>
    </Box>
    </>
   
  );
}
